import s from './Raffles.module.sass'
import {Image, Input, Empty, Space, Spin, InputNumber, message as antMessage} from "antd";
import Link from "next/link";
import {
  useSearchRaffles,
} from "../../../../hooks/p2e/raffles/useRafflesList";
import React, {useCallback, useEffect, useState} from "react";
import {
  useBuyRaffleTicket,
  useGetAllTicket,
  useGetMyTicket,
  useGetRaffleDetail
} from "../../../../hooks/p2e/raffles/useRaffleDetail";
import {useRouter} from "next/router";
import {debounce, isEmpty} from "lodash";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import SpinLoading from "../../common/Spin";
import {BuyRaffleTicketErrorCode, UserTicketGql} from "../../../../src/generated/graphql_p2e";
import moment from "moment";
import {handleGraphqlErrors} from "../../../../utils/apollo_client";

const RafflesDetail = () => {
  const router = useRouter()
  const raffleUID = router.query.id as string | undefined
  const [allTickets, setAllTickets] = useState<UserTicketGql[]>([])
  const [ticketBuyAmount, setTicketBuyAmount] = useState<number>(0)
  const [totalCost, setTotalCost] = useState<number>(0)
  const [ticketBuying, setTicketBuying] = useState<boolean>(false)
  const {searchRafflesLoading, searchRafflesError, searchRafflesData} = useSearchRaffles('', `${raffleUID}`)
  const {getRaffleDetailLoading, getRaffleDetailError, getRaffleDetailData} = useGetRaffleDetail(`${raffleUID}`)
  const {getMyTicketsLoading, getMyTicketslError, refetchMyTickets, getMyTicketsData} = useGetMyTicket(`${raffleUID}`)
  const {getAllTicketsLoading, getAllTicketslError, refetchAllTickets, getAllTicketsData} = useGetAllTicket(`${raffleUID}`)
  const {buyRaffleTicket} = useBuyRaffleTicket()

  useEffect(() => {
    if (getAllTicketsData?.getAllTickets?.user_tickets) {
      setAllTickets(getAllTicketsData?.getAllTickets?.user_tickets)
    }
  }, [getAllTicketsData?.getAllTickets?.user_tickets])

  const raffleDetailData = getRaffleDetailData?.getRaffleDetail
  const raffleEndAt = moment(raffleDetailData?.end_at).format('hh:mm MMM Do')
  const allTicketsCount = getAllTicketsData?.getAllTickets?.count ? getAllTicketsData?.getAllTickets?.count : 0
  const myTicketsCount = getMyTicketsData?.getMyTickets?.count ? getMyTicketsData?.getMyTickets?.count : 0
  const ticketLimitationPerUser = getRaffleDetailData?.getRaffleDetail?.ticket?.user_limit
  const cannotBuy = ticketBuying
    || (ticketBuyAmount < 1)
    || (ticketLimitationPerUser ? (ticketBuyAmount > ticketLimitationPerUser) : false)

  const debouncedInputTyping = useCallback(
    debounce((value: string) => {
      console.log('[debouncedInputTyping] value: ', value);
    }, 500),
    []
  )

  const handleTicketSearch = (event: React.FormEvent<HTMLInputElement>) => {
    debouncedInputTyping(event.currentTarget.value)
  }

  const handleAmountChange = (amount: number) => {
    if (amount === null) {
      setTicketBuyAmount(0)
      setTotalCost(0)
    } else {
      amount = parseInt(amount.toString())
      setTicketBuyAmount(amount)
      setTotalCost(amount * raffleDetailData?.ticket?.cost)
    }
  }

  const handleBuyRaffleTicket = () => {
    setTicketBuying(true)
    buyRaffleTicket({
      raffle_ticket_uid: raffleDetailData?.ticket?.uid,
      quantity: ticketBuyAmount,
      onError: (error) => handleGraphqlErrors(error, (code, message) => {
        switch (code) {
          case BuyRaffleTicketErrorCode.RaffleNotFound:
            antMessage.error('Invalid raffle. Please go back and choose another raffle.')
            break
          case BuyRaffleTicketErrorCode.AmountExceeded:
            antMessage.error(`You can buy up to ${ticketLimitationPerUser} tickets only.`)
            break
          case BuyRaffleTicketErrorCode.BalanceNotInitiated:
            antMessage.error(`You don't have enough balance to buy.`)
            break
          case BuyRaffleTicketErrorCode.NotEnoughLucisPoint:
            antMessage.error(`You don't have enough Lucis point to buy.`)
            break
          case BuyRaffleTicketErrorCode.NotEnoughLucisToken:
            antMessage.error(`You don't have enough LUCIS token to buy.`)
            break
          case BuyRaffleTicketErrorCode.BadRequest:
            // chaupa todo new message
            antMessage.error('An unknown error has occurred. Please try again later.' )
            break
          default:
            antMessage.error('An unknown error has occurred. Please try again later.' )
            break
        }
      }),
      onCompleted: (data) => {
        if (data?.data?.buyRaffleTicket && data?.data?.buyRaffleTicket !== null) {
          refetchMyTickets()
          refetchAllTickets()
          antMessage.success('Success!')
        }
      }
    }).finally(() => setTicketBuying(false))
  }

  if (getRaffleDetailLoading) return (
    <div className={s.rafflesDetailWrapper}>
      <div className="lucis-container-2">
        <SpinLoading />
      </div>
    </div>
  )

  if (getRaffleDetailError || isEmpty(getRaffleDetailData?.getRaffleDetail)) return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <title>404 | This page could not be found.</title>
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  )

  return (
    <div className={s.rafflesDetailWrapper}>
      <div className={`lucis-container-2 ${s.rafflesDetailContainer}`}>
        <section className={s.breadcrumbSection}>
          <button>
            <Image src="/assets/P2E/raffles/iconArrow.svg" preview={false} alt="" />
          </button>
          <h2 className={s.sectionTitle}>Raffles</h2>
        </section>
        <section className={s.sectionFeaturedRaffle}>
          <div className={s.featuredRaffle}>
            <div className={s.featuredRaffleThumbnail}>
              <Image src={raffleDetailData?.img ? raffleDetailData?.img : '' } preview={false} alt="" fallback="/assets/P2E/raffles/defaultImage.jpg" />
            </div>
            <div className={s.featuredRaffleInfo}>
              <div className={s.featuredRaffleTitleWrap}>
                <h3>{raffleDetailData?.name}</h3>
                {raffleDetailData?.valued_at && (
                  <p>Valued at {raffleDetailData?.valued_at}</p>
                )}
              </div>
              {raffleDetailData?.type && (
                <div className={s.featuredRafflePriceWrap}>
                  <div className={s.featuredRaffleTagWrap}>
                    {(Array.isArray(raffleDetailData?.type) && raffleDetailData?.type.length > 0) && raffleDetailData?.type.map((type, index) => (
                      <div className={`${s.raffleTag}`} key={type}>{type}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {raffleDetailData?.desc && (
            <div className={s.featuredRaffleDesc}>
              <p>{raffleDetailData?.desc}</p>
            </div>
          )}
        </section>
        <div className={s.rafflesDetailSidebar}>
          <div className={s.stickySidebar}>
            <section className={`${s.buyTicketSection} ${s.sidebarSection}`}>
              <div className={s.raffleCountdown}>
                <Image src="/assets/P2E/raffles/iconCalendar.svg" preview={false} alt="" fallback="" />
                <span className={s.raffleCountdownText}>Rolling at <span className={s.countdownTextColored}>{raffleEndAt}</span></span>
              </div>
              <h2 className={s.sectionTitle}>Buy tickets</h2>
              <div className={s.buyTicketInfo}>
                <div className={s.buyTicketInfoItem}>
                  <div className={s.buyTicketInfoLabel}>Sold tickets</div>
                  <div className={s.buyTicketInfoValue}>{allTicketsCount} <Image src="/assets/P2E/raffles/iconTicket.svg" preview={false} alt="" /></div>
                </div>
                <div className={s.buyTicketInfoItem}>
                  <div className={s.buyTicketInfoLabel}>My tickets</div>
                  <div className={s.buyTicketInfoValue}>{myTicketsCount} <Image src="/assets/P2E/raffles/iconTicket.svg" preview={false} alt="" /></div>
                </div>
                <div className={s.buyTicketInfoItem}>
                  <div className={s.buyTicketInfoLabel}>Cost</div>
                  <div className={s.buyTicketInfoValue}>
                    <div className={s.rafflePrice}>
                      <div className={s.rafflePriceText}>{raffleDetailData?.ticket?.cost}</div>
                      <Image src={raffleDetailData?.ticket?.cost_type === 'LUCIS_POINT' ? '/assets/P2E/raffles/iconLucisPoint.svg' : '/assets/P2E/raffles/iconLucisToken.svg'} preview={false} alt="" />
                    </div>
                  </div>
                </div>
                <div className={s.buyTicketInfoItem}>
                  <div className={s.buyTicketInfoLabel}>Amount</div>
                  {
                    // chaupa todo user limit validation
                  }
                  <div className={s.buyTicketInfoValue}>
                    <InputNumber controls={false} onChange={handleAmountChange} min={0} precision={0} />
                  </div>
                </div>
              </div>
              <div className={s.buyTicket}>
                <button className={s.sidebarBtn} onClick={handleBuyRaffleTicket} disabled={cannotBuy}>
                  <span>Buy</span>
                </button>
                <div className={s.buyTicketTotal}>
                  Total
                  <div className={s.rafflePrice}>
                    <div className={s.rafflePriceText}>{totalCost}</div>
                    <Image src={raffleDetailData?.ticket?.cost_type === 'LUCIS_POINT' ? '/assets/P2E/raffles/iconLucisPoint.svg' : '/assets/P2E/raffles/iconLucisToken.svg'} preview={false} alt="" />
                  </div>
                </div>
              </div>
              <div className={s.buyTicketDesc}>
                <h2>How you get tickets</h2>
                <p>You can get a lot of Lucis points after completing the Lucis mission. {`Let's`} get it!</p>
                <Link href="/p2e/missions" passHref>
                  <a className={s.sidebarBtn}>
                    <span>Earn more</span>
                  </a>
                </Link>
              </div>
            </section>
            <section className={`${s.rafflesRollingSection} ${s.sidebarSection}`}>

            </section>
          </div>
        </div>
        <section className={s.myTicketsSection}>
          <h2 className={s.sectionTitle}>My tickets [{myTicketsCount}]</h2>
          {(getMyTicketslError || (getMyTicketsData?.getMyTickets?.user_tickets && (getMyTicketsData?.getMyTickets?.user_tickets.length <= 0))) ? <Empty /> :
            (getMyTicketsLoading ? (
              <SpinLoading />
            ) : (
              <div className={s.myTicketsList}>
                {getMyTicketsData?.getMyTickets?.user_tickets && getMyTicketsData?.getMyTickets?.user_tickets.map((ticket, index) => (
                  <div className={s.ticketItem} key={ticket?.uid}>#{ticket?.ticket_number}</div>
                ))}
              </div>
            ))
          }
        </section>
        <section className={s.allTicketsSection}>
          <div className={s.sectionTitleFlex}>
            <h2 className={s.sectionTitle}>Sold tickets [{allTicketsCount}]</h2>
            <div className={s.raffleSearch}>
              <Input placeholder="ID of raffle" onChange={handleTicketSearch} />
              <Image src="/assets/P2E/raffles/iconSearch.svg" preview={false} alt="" />
            </div>
          </div>
          {(getAllTicketslError || (getAllTicketsData?.getAllTickets?.user_tickets && (getAllTicketsData?.getAllTickets?.user_tickets.length <= 0))) ? <Empty /> :
            (getAllTicketsLoading ? (
              <SpinLoading />
            ) : (
              <div className={s.allTicketsList}>
                <div className={s.tableResponsive}>
                  <table>
                    <tbody>
                      {allTickets.map((ticket, index) => (
                        <tr className={`${s.allTicketItem} crown`} key={ticket?.uid}>
                          <td className={s.ownerReward}>{index + 1}</td>
                          <td className={s.ownerAvatar}>
                            <Image src={ticket?.user?.profile?.avatar as string} preview={false} alt="" fallback="/assets/P2E/raffles/defaultAvatar.jpg" />
                          </td>
                          <td className={s.ownerName}>{ticket?.user?.profile?.display_name}</td>
                          <td className={s.ticketID}>#{ticket?.ticket_number}</td>
                          <td className={s.ticketCrown}>
                            <Image src="/assets/P2E/raffles/iconCrown.svg" preview={false} alt="" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          }
        </section>
        <section className={s.sectionRafflesSponsor}>
          <h2 className={s.sectionTitle}>Sponsor</h2>
          {(Array.isArray(raffleDetailData?.raffle_sponsors) && raffleDetailData?.raffle_sponsors.length > 0) ? (
            <div className={s.rafflesSponsorList}>
              {raffleDetailData?.raffle_sponsors.map((sponsor, index) => (
                <div className={s.raffleSponsorItem} key={sponsor?.uid}>
                  <Image src={sponsor?.img ? sponsor?.img : ''} preview={false} alt="" />
                </div>
              ))}
            </div>
          ) : <Empty />}
        </section>
        <section className={s.sectionRaffles}>
          <div className={s.raffleTitleWrap}>
            <h2 className={s.sectionTitle}>Other Raffles</h2>
          </div>
          {searchRafflesLoading ? (
            <SpinLoading />
          ) : (((searchRafflesData?.searchRaffle.length <= 0) || searchRafflesError) ? <Empty /> : (
          <div className={s.rafflesList}>
            {searchRafflesData?.searchRaffle.length > 0 && searchRafflesData?.searchRaffle.map((raffle, index) => (
              <Link href={`/p2e/raffles/${raffle?.uid}`} passHref key={`${raffle?.uid}${index}`}>
                <a className={s.rafflesItem}>
                  <div className={s.raffleThumbnail}>
                    <Image src={raffle?.img as string} preview={false} alt="" />
                  </div>
                  <div className={s.raffleInfo}>
                    {raffle?.type && (
                      <div className={s.raffleTagWrap}>
                        {
                          // @ts-ignore
                          raffle?.type.map((type: string, index: number) => (
                            <div className={s.raffleTag} key={`${type}${index}`}>{type}</div>
                          ))}
                      </div>
                    )}
                    <h3 className={s.raffleTitle}>{raffle?.name}</h3>
                    <div className={s.rafflePriceWrap}>
                      <div className={s.raffleValued}>Valued at {raffle?.valued_at}</div>
                      <div className={s.rafflePrice}>
                        <div className={s.rafflePriceText}>{raffle?.lucis_point_reward}</div>
                        <Image src="/assets/P2E/raffles/iconLucisPoint.svg" preview={false} alt="" />
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
            <div className={`${s.rafflesItem} comingSoon`}>
              NEW RAFFLES<br />COMING SOON
            </div>
          </div>
        ))}
      </section>
      </div>
    </div>
  )
}
export default RafflesDetail