import s from './Raffles.module.sass'
import {Image, Input, Empty, Space, Spin, InputNumber} from "antd";
import Link from "next/link";
import {
  useGetFeaturedRaffle,
  useGetRecentWinners,
  useGetSponsorRaffle,
  useSearchRaffles,
} from "../../../../hooks/p2e/raffles/useRafflesList";
import React, {useCallback, useEffect, useState} from "react";
import SpinLoading from "../../common/Spin";
import {Raffle} from "../../../../src/generated/graphql_p2e";
import {debounce, isEmpty} from "lodash";
import {useGetAllTicket, useGetMyTicket, useGetRaffleDetail} from "../../../../hooks/p2e/raffles/useRaffleDetail";
import {useRouter} from "next/router";

const RafflesDetail = () => {
  const router = useRouter()
  const raffleUID = router.query.id
  const {searchRafflesLoading, searchRafflesError, searchRafflesData} = useSearchRaffles('')
  const {getRaffleDetailLoading, getRaffleDetailError, getRaffleDetailData} = useGetRaffleDetail(`${raffleUID}`)
  const {getMyTicketsLoading, getMyTicketslError, refetchMyTickets, getMyTicketsData} = useGetMyTicket(`${raffleUID}`)
  const {getAllTicketsLoading, getAllTicketslError, refetchAllTickets, getAllTicketsData} = useGetAllTicket(`${raffleUID}`)

  useEffect(() => {
    console.log('[] getRaffleDetailData?.getRaffleDetail: ', getRaffleDetailData?.getRaffleDetail);
  }, [getRaffleDetailData?.getRaffleDetail])
  useEffect(() => {
    console.log('[] getMyTicketsData?.getMyTickets: ', getMyTicketsData?.getMyTickets);
  }, [getMyTicketsData?.getMyTickets])
  useEffect(() => {
    console.log('[] getAllTicketsData?.getAllTickets: ', getAllTicketsData?.getAllTickets);
  }, [getAllTicketsData?.getAllTickets])
  
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
              <Image src="/assets/P2E/raffles/featuredRaffle.jpg" preview={false} alt="" />
            </div>
            <div className={s.featuredRaffleInfo}>
              <div className={s.featuredRaffleTitleWrap}>
                <h3>Steam gift card</h3>
                <p>Valued at {}</p>
              </div>
              <div className={s.featuredRafflePriceWrap}>
                <div className={s.featuredRaffleTagWrap}>
                  <div className={`${s.raffleTag}`}>NFT</div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.featuredRaffleDesc}>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
          </div>
        </section>
        <div className={s.rafflesDetailSidebar}>
          <div className={s.stickySidebar}>
            <section className={`${s.buyTicketSection} ${s.sidebarSection}`}>
              <div className={s.raffleCountdown}>
                <Image src="/assets/P2E/raffles/iconCalendar.svg" preview={false} alt="" fallback="" />
                <span className={s.raffleCountdownText}>Rolling at <span className={s.countdownTextColored}>00:00 Jun 26th</span></span>
              </div>
              <h2 className={s.sectionTitle}>Buy tickets</h2>
              <div className={s.buyTicketInfo}>
                <div className={s.buyTicketInfoItem}>
                  <div className={s.buyTicketInfoLabel}>All ticket</div>
                  <div className={s.buyTicketInfoValue}>3450 <Image src="/assets/P2E/raffles/iconTicket.svg" preview={false} alt="" /></div>
                </div>
                <div className={s.buyTicketInfoItem}>
                  <div className={s.buyTicketInfoLabel}>My ticket</div>
                  <div className={s.buyTicketInfoValue}>0 <Image src="/assets/P2E/raffles/iconTicket.svg" preview={false} alt="" /></div>
                </div>
                <div className={s.buyTicketInfoItem}>
                  <div className={s.buyTicketInfoLabel}>Cost</div>
                  <div className={s.buyTicketInfoValue}>
                    <div className={s.rafflePrice}>
                      <div className={s.rafflePriceText}>1000</div>
                      <Image src="/assets/P2E/raffles/iconLucisPoint.svg" preview={false} alt="" />
                    </div>
                  </div>
                </div>
                <div className={s.buyTicketInfoItem}>
                  <div className={s.buyTicketInfoLabel}>My ticket</div>
                  <div className={s.buyTicketInfoValue}>
                    <InputNumber controls={false}/>
                  </div>
                </div>
              </div>
              <div className={s.buyTicket}>
                <button className={s.btnBuyTicket}>Buy</button>
                <div className={s.buyTicketTotal}>
                  Total
                  <div className={s.rafflePrice}>
                    <div className={s.rafflePriceText}>2000</div>
                    <Image src="/assets/P2E/raffles/iconLucisPoint.svg" preview={false} alt="" />
                  </div>
                </div>
              </div>
              <div className={s.buyTicketDesc}>
                <h2>How you get tickets</h2>
                <p>You can get a lot of Lucis point while you completed Lucis mission. Let’s get it!</p>
                <button>Earn more</button>
              </div>
            </section>
            <section className={`${s.rafflesRollingSection} ${s.sidebarSection}`}>

            </section>
          </div>
        </div>
        <section className={s.myTicketsSection}>
          <h2 className={s.sectionTitle}>My tickets {getMyTicketsData?.getMyTickets.length >= 0 ? `[${getMyTicketsData?.getMyTickets.length}]` : [0]}</h2>
          {(getMyTicketslError || getMyTicketsData?.getMyTickets.length <= 0) ? <Empty /> :
            (getMyTicketsLoading ? (
              <Space size="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" />
              </Space>
            ) : (
              <div className={s.myTicketsList}>
                {getMyTicketsData?.getMyTickets.map((ticket, index) => (
                  <div className={s.ticketItem} key={ticket?.ticket_uid}>#{ticket?.ticket_number}</div>
                ))}
              </div>
            ))
          }
        </section>
        <section className={s.allTicketsSection}>
          <div className={s.sectionTitleFlex}>
            <h2 className={s.sectionTitle}>All tickets [21]</h2>
            <div className={s.raffleSearch}>
              <Input placeholder="ID of raffle" />
              <Image src="/assets/P2E/raffles/iconSearch.svg" preview={false} alt="" />
            </div>
          </div>
          {(getAllTicketslError || getAllTicketsData?.getAllTickets?.length <= 0) ? <Empty /> :
            (getAllTicketsLoading ? (
              <Space size="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" />
              </Space>
            ) : (
              <div className={s.allTicketsList}>
                <div className={s.tableResponsive}>
                  <table>
                    <tbody>
                    {getAllTicketsData?.getAllTickets?.map((ticket, index) => (
                      <tr className={`${s.allTicketItem} crown`} key={ticket?.ticket_uid}>
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
                    <tr className={`${s.allTicketItem} crown`}>
                      <td className={s.ownerReward}>1,000,000</td>
                      <td className={s.ownerAvatar}>
                        <Image src="/assets/P2E/raffles/defaultAvatar.jpg" preview={false} alt="" fallback="/assets/P2E/raffles/defaultAvatar.jpg" />
                      </td>
                      <td className={s.ownerName}>Shippou Chan</td>
                      <td className={s.ticketID}>#123456</td>
                      <td className={s.ticketCrown}>
                        <Image src="/assets/P2E/raffles/iconCrown.svg" preview={false} alt="" />
                      </td>
                    </tr>
                    <tr className={s.allTicketItem}>
                      <td className={s.ownerReward}>1,000,000</td>
                      <td className={s.ownerAvatar}>
                        <Image src="/assets/P2E/raffles/defaultAvatar.jpg" preview={false} alt="" fallback="/assets/P2E/raffles/defaultAvatar.jpg" />
                      </td>
                      <td className={s.ownerName}>Shippou Chan</td>
                      <td className={s.ticketID}>#123456</td>
                      <td className={s.ticketCrown}></td>
                    </tr>
                    <tr className={s.allTicketItem}>
                      <td className={s.ownerReward}>1,000,000</td>
                      <td className={s.ownerAvatar}>
                        <Image src="/assets/P2E/raffles/defaultAvatar.jpg" preview={false} alt="" fallback="/assets/P2E/raffles/defaultAvatar.jpg" />
                      </td>
                      <td className={s.ownerName}>Shippou Chan</td>
                      <td className={s.ticketID}>#123456</td>
                      <td className={s.ticketCrown}></td>
                    </tr>
                    <tr className={s.allTicketItem}>
                      <td className={s.ownerReward}>1,000,000</td>
                      <td className={s.ownerAvatar}>
                        <Image src="/assets/P2E/raffles/defaultAvatar.jpg" preview={false} alt="" fallback="/assets/P2E/raffles/defaultAvatar.jpg" />
                      </td>
                      <td className={s.ownerName}>Shippou Chan</td>
                      <td className={s.ticketID}>#123456</td>
                      <td className={s.ticketCrown}></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          }
        </section>
        <section className={s.sectionRafflesSponsor}>
          <h2 className={s.sectionTitle}>Sponsor</h2>
          <div className={s.rafflesSponsorList}>
            <div className={s.raffleSponsorItem}>
              <Image src="/assets/P2E/raffles/logoLOL.png" preview={false} alt="" />
            </div>
            <div className={s.raffleSponsorItem}>
              <Image src="/assets/P2E/raffles/logoLOL.png" preview={false} alt="" />
            </div>
            <div className={s.raffleSponsorItem}>
              <Image src="/assets/P2E/raffles/logoLOL.png" preview={false} alt="" />
            </div>
            <div className={s.raffleSponsorItem}>
              <Image src="/assets/P2E/raffles/logoLOL.png" preview={false} alt="" />
            </div>
          </div>
        </section>
        <section className={s.sectionRaffles}>
        <div className={s.raffleTitleWrap}>
          <h2 className={s.sectionTitle}>Other Raffles</h2>
        </div>
        {searchRafflesLoading ? (
          <Space size="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" />
          </Space>
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