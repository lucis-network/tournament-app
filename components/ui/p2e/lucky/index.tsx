import React, {useEffect, useState} from 'react'
import ButtonOpenBox from './button/buttonOpen'
import HistoryTable from './history'
import s from './LuckyChest.module.sass'
import {
  OPEN_CHEST,
  useClaimChestPrize,
  useGetChestDetail,
  useGetLuckyChestUserInfo
} from "../../../../hooks/p2e/luckyChest/useLuckyChest";
import {
  CostType,
  LuckyChestTier,
  OpenChestErrorCode,
  OpenChestResponse
} from "../../../../src/generated/graphql_p2e";
import SpinLoading from "../../common/Spin";
import {isEmpty} from "lodash";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import {handleGraphqlErrors} from "../../../../utils/apollo_client";
import {Empty, Image, message, message as antMessage} from "antd";
import ChestPrize from "./prize";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {isClient} from "../../../../utils/Env";
import {b64DecodeUnicode} from "../../../../utils/String";
import {useMutation, useQuery} from "@apollo/client";
import PopupRollingChest from "./popup/popupRollingChest";
import {GET_STATISTICS} from "../../../../hooks/p2e/useP2E";

export enum GAMES {
  FACEITCSGO = 1,
  GARENALOL = 2,
}

const games: number[] = [
  GAMES.FACEITCSGO,
  GAMES.GARENALOL,
]

export default function LuckyChest(props: any) {
    const [rollingChestPopupVisible, setRollingChestPopupVisible] = useState(false);
    const [chestUnlocking, setChestUnlocking] = useState(false);
    const [chestResponse, setChestResponse] = useState<OpenChestResponse>({} as OpenChestResponse);
    const gameType = props.currentGame ? games[props.currentGame - 1] : GAMES.GARENALOL
    const {getChestDetailLoading, getChestDetailError, getChestDetailData} = useGetChestDetail({
        game_platform_id: gameType,
        tier: LuckyChestTier.Standard,
    })
    const [openLuckyChest] = useMutation(OPEN_CHEST, {
      context: {
        endpoint: 'p2e'
      }
    })
    const {data: getBalanceData, refetch: refetchBalanceData} = useQuery(GET_STATISTICS, {
      context: {
        endpoint: 'p2e'
      },
    })

    const chestDetail = getChestDetailData?.getChestDetail
    const ticketCost = chestDetail?.ticket_cost
    const ticketCostType = chestDetail?.ticket_cost_type
    const luckyChestSponsor = chestDetail?.sponsors
    const chestPrizes = chestDetail?.prizes
    const preventDefault = (ev: any) => {
      if (ev.preventDefault) {
        ev.preventDefault();
      }
      ev.returnValue = false;
    }

    const enableBodyScroll = () => {
      document && document.removeEventListener("wheel", preventDefault, false);
    };

    const disableBodyScroll = () => {
      document &&
      document.addEventListener("wheel", preventDefault, {
        passive: false
      });
    };

    const onWheel = (apiObj: any, ev: any) => {
      const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

      if (isThouchpad) {
        ev.stopPropagation();
        return;
      }

      if (ev.deltaY > 0) {
        apiObj.scrollNext();
      } else if (ev.deltaY < 0) {
        apiObj.scrollPrev();
      }
    }

  const openRollingLuckyChest = async () => {
    try {
      await openLuckyChest({
        variables: {
          game_platform_id: gameType,
          tier: LuckyChestTier.Standard,
        },
        onCompleted: (data) => {
          const decodedData = JSON.parse(b64DecodeUnicode(data?.openChest?.prize))
          const newOpenChestResponse = {
            prize: decodedData
          }
          setChestResponse(newOpenChestResponse);
          setRollingChestPopupVisible(true);
        }
      })
    } catch (error: any) {
      handleGraphqlErrors(error, (code) => {
        switch (code) {
          case OpenChestErrorCode.ChestNotFound:
            message.error('Invalid chest. Please try again later.');
            return;
          case OpenChestErrorCode.ServerError:
            message.error('Connection failed. Please try again later.');
            return;
          case OpenChestErrorCode.BalanceNotInitiated:
            message.error("You don't have enough balance to open.");
            return;
          case OpenChestErrorCode.NotEnoughLucisPoint:
            message.error("You don't have enough Lucis point to open.");
            return;
          case OpenChestErrorCode.NotEnoughLucisToken:
            message.error("You don't have enough LUCIS token to open.");
            return;
          case OpenChestErrorCode.PrizeNotFound:
            message.error('Invalid prize. Please try again later.');
            return;
          case OpenChestErrorCode.GameNotConnected:
            message.error("Please connect game first.");
            return;
          default:
            message.error('An unknown error has occurred. Please try again later.');
            return;
        }
      })
    } finally {
      setChestUnlocking(false)
    }
  }

  const handleOpenBox = async () => {
    if (isClient) {
      setChestUnlocking(true)
      try {
        let canOpen = true
        const getBalance = await refetchBalanceData()
        switch (ticketCostType) {
          case CostType.LucisToken:
            if (ticketCost > getBalance?.data?.getBalance?.lucis_token) {
              canOpen = false
              message.error("You don't have enough LUCIS token to open.")
            }
            break
          case CostType.LucisPoint:
            if (ticketCost > getBalance?.data?.getBalance?.lucis_point) {
              canOpen = false
              message.error("You don't have enough Lucis point to open.")
            }
            break
          default:
            break
        }
        if (canOpen) {
          const box = document.querySelector('.boxTarget')
          const boxOpeningAnimation = (event: AnimationEvent) => {
            if (isClient && box && event) {
              if (event.animationName.indexOf('slide-out-fwd-center') > -1) {
                box.classList.remove('opening')
                if (typeof boxOpeningAnimation === 'function') {
                  // @ts-ignore
                  box.removeEventListener('animationend', boxOpeningAnimation)
                }
              }
            }
          }

          if (box) {
            // @ts-ignore
            box.addEventListener('animationend', boxOpeningAnimation)
            box.classList.add('opening')
          }
          setTimeout(() => {
            openRollingLuckyChest()
          }, 700)
        }
      } catch (e) {
        message.error('An unknown error has occurred. Please try again later.')
        console.log('[handleOpenBox] error: ', e);
      }
    }
  }

    if (getChestDetailLoading) return (
      <div className={`${s.wrapper} lucis-container-2`}>
        <SpinLoading/>
      </div>
    )

    if (getChestDetailError || isEmpty(chestDetail)) return (
      <>
          <Head>
              <meta name="robots" content="noindex"/>
              <title>404 | This page could not be found.</title>
          </Head>
          <DefaultErrorPage statusCode={404}/>
      </>
    )

    return (
      <>
        <div className={s.luckyChestTabsSection}>
          <div className="lucis-container-2">
            <div className={s.luckyChestTabs}>
              <div className={`${s.luckyChestTabsItem} active`}>Standard</div>
              <div className={s.luckyChestTabsItem}>Premium</div>
              <div className={s.luckyChestTabsItem}>NFTs</div>
            </div>
          </div>
        </div>
        <div className={`${s.wrapper} lucis-container-2`}>
          <div className={s.content_lucky_chest_top}>
            <div className={s.heading}>
              <div className={s.content_top}>
                <h1>{chestDetail?.title}</h1>
                <p>Try your luck to receive many attractive valuable gifts!</p>
              </div>
              <div>
                <div className={`${s.group_btn} ${s.group_btn_pc}`}>
                  <ButtonOpenBox disabled={chestUnlocking} onClick={handleOpenBox}>Open</ ButtonOpenBox>
                  <div className={s.number_coin}>
                    <div className={s.n}>
                      {ticketCost}
                    </div>
                    <img src={ticketCostType === CostType.LucisToken ? '/assets/P2E/lucky-chest/ic_lucis_coin.png' : '/assets/P2E/lucky-chest/iconLucisPoint.svg'} alt="icon" />
                  </div>
                </div>
                {chestDetail?.desc && (
                  <p>{chestDetail?.desc}</p>
                )}
              </div>
            </div>
            <div className={s.box}>
              <div className={s.boxWrap}>
                <img src="/assets/P2E/lucky-chest/im_box.png" alt="" className={`${s.boxImg} boxTarget`} />
                {/*{chestPrizes && (*/}
                {/*  <div className={s.content_right}>*/}
                {/*    <img src="/assets/P2E/lucky-chest/ic_line.svg" alt=""/>*/}
                {/*    <div className={s.block_item}>*/}
                {/*      {chestPrizes.map((item, index) => {*/}
                {/*        return (*/}
                {/*          <div className={s.item} key={'k' + index + item?.id}>*/}
                {/*            <img src={item?.img ? item?.img : "/assets/P2E/lucky-chest/im_box.png"} alt=""/>*/}
                {/*          </div>*/}
                {/*        )*/}
                {/*      })}*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*)}*/}
              </div>
              <div className={`${s.group_btn} ${s.group_btn_mobile}`}>
                <ButtonOpenBox disabled={chestUnlocking} onClick={handleOpenBox}>Open</ButtonOpenBox>
                <div className={s.number_coin}>
                  <div className={s.n}>{ticketCost}</div>
                  <img src={ticketCostType === CostType.LucisToken ? '/assets/P2E/lucky-chest/ic_lucis_coin.png' : '/assets/P2E/lucky-chest/iconLucisPoint.svg'} alt="icon" />
                </div>
              </div>
            </div>
          </div>
          {chestPrizes && (
            <div className={s.chestPrizesWrap}>
              <h2>Items that might be in this Box:</h2>
              <div className={s.chestPrizesList} onMouseEnter={disableBodyScroll} onMouseLeave={enableBodyScroll}>
                <ScrollMenu
                  onWheel={onWheel}
                >
                  {chestPrizes.map(prize => (
                    <>
                      <ChestPrize
                        key={prize?.id}
                        description={prize?.desc}
                        image={prize?.img ?? ''}
                        title={prize?.title}
                        rarity={prize?.rarity}
                      />
                    </>
                  ))}
                </ScrollMenu>
                </div>
            </div>
          )}
          <HistoryTable currentGame={games[props.currentGame]}/>
          {(luckyChestSponsor && (luckyChestSponsor.length > 0)) && (
            <div className={s.luckyChestSponsor}>
              <div className="lucis-container-2">
                <h2>Sponsor</h2>
                <div className={s.luckyChestSponsorList}>
                  {luckyChestSponsor.map((sponsor, index) => (
                    <div className={s.luckyChestSponsorItem} key={sponsor?.uid}>
                      <Image src={sponsor?.img as string} preview={false} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {rollingChestPopupVisible && <PopupRollingChest
              visible={rollingChestPopupVisible}
              closePopupRollingChest={() => setRollingChestPopupVisible(false)}
              chestDetail={chestDetail}
              chestResponse={chestResponse}
          />}
        </div>
      </>
    )
}