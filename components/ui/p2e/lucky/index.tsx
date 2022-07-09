import React, { useState } from 'react'
import ButtonOpenBox from './button/buttonOpen'
import HistoryTable from './history'
import s from './LuckyChest.module.sass'
import PopUpOpenBox from './popup'
import {useClaimChestPrize, useGetChestDetail, useGetUserHistory} from "../../../../hooks/p2e/luckyChest/useLuckyChest";
import {BuyRaffleTicketErrorCode, LuckyChestTier, LuckyChestType} from "../../../../src/generated/graphql_p2e";
import SpinLoading from "../../common/Spin";
import {isEmpty} from "lodash";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import {handleGraphqlErrors} from "../../../../utils/apollo_client";
import {message as antMessage} from "antd";

export default function LuckyChest() {
    const [showPopupOpenBox, setShowPopupOpenBox] = useState(false);
    const [claimingChestPrize, setClaimingChestPrize] = useState(false);
    const {getChestDetailLoading, getChestDetailError, getChestDetailData} = useGetChestDetail({
        type: LuckyChestType.Csgo,
        tier: LuckyChestTier.Standard,
    })
    const {getUserHistoryLoading, getUserHistoryError, refetchUserHistory, getUserHistoryData} = useGetUserHistory({
        type: LuckyChestType.Csgo,
        tier: LuckyChestTier.Standard,
    })
    const {claimChestPrize} = useClaimChestPrize()
    const chestDetail = getChestDetailData?.getChestDetail
    const userHistory = getUserHistoryData?.getLuckyChestUserInfo?.history

    const handleClaimChestPrize = (user_prize_history_uid: string) => {
      if (!user_prize_history_uid) return null
      console.log('[handleClaimChestPrize] user_prize_history_uid: ', user_prize_history_uid);
      setClaimingChestPrize(true)
      claimChestPrize({
        user_prize_history_uid: user_prize_history_uid,
        onError: (error) => handleGraphqlErrors(error, (code, message) => {
          if (code !== 'UnAuth') {
            switch (code) {
              case BuyRaffleTicketErrorCode.RaffleNotFound:
                antMessage.error('Invalid raffle. Please go back and choose another raffle.')
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
              case BuyRaffleTicketErrorCode.BuyPhaseEnded:
                antMessage.error('Buy phase had ended.')
                break
              case BuyRaffleTicketErrorCode.TotalLimitExceeded:
                // chaupa todo new message
                antMessage.error('An unknown error has occurred. Please try again later.')
                break
              case BuyRaffleTicketErrorCode.TicketQuantityCannotBeZero:
                // chaupa todo new message
                antMessage.error('An unknown error has occurred. Please try again later.')
                break
              case 'UNAUTHENTICATED':
                antMessage.error('Please sign in first.')
                break
              default:
                antMessage.error('An unknown error has occurred. Please try again later.')
                break
            }
          }
        }),
        onCompleted: (data) => {
          if (data?.data?.buyRaffleTicket && data?.data?.buyRaffleTicket !== null) {
            refetchUserHistory()
            antMessage.success('Success!')
          }
        }
      }).finally(() => setClaimingChestPrize(false))
    }
    console.log('[LuckyChest] userHistory: ', userHistory);

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
                <h1>LUCKY CHEST</h1>
                <p>Try your luck to receive many attractive valuable gifts!</p>
              </div>
              <div>
                <h3>Your ticket</h3>
                <div className={`${s.group_btn} ${s.group_btn_pc}`}>
                  <div onClick={() => setShowPopupOpenBox(true)}><ButtonOpenBox>Open</ ButtonOpenBox></div>
                  <div className={s.number_coin}>
                    <div className={s.n}>5.000</div>
                    <img src="/assets/P2E/lucky-chest/ic_lucis_coin.png" alt="icon" />
                  </div>
                </div>
                {chestDetail?.desc && (
                  <p>{chestDetail?.desc}</p>
                )}
              </div>
            </div>
            <div className={s.box}>
              <img onClick={() => setShowPopupOpenBox(true)} src="/assets/P2E/lucky-chest/im_box.png" alt="" />
              <div className={`${s.group_btn} ${s.group_btn_mobile}`}>
                <div onClick={() => setShowPopupOpenBox(true)}>
                  <ButtonOpenBox>Open</ButtonOpenBox>
                </div>
                <div className={s.number_coin}>
                  <div className={s.n}>5.000</div>
                  <img src="/assets/P2E/lucky-chest/ic_lucis_coin.png" alt="icon" />
                </div>
              </div>

            </div>
          </div>
          <div style={{paddingTop: 40}}>
            <HistoryTable userHistoryData={userHistory} claimChestPrize={handleClaimChestPrize}/>
          </div>
          <PopUpOpenBox status={showPopupOpenBox} closePopupOpenBox={() => setShowPopupOpenBox(false)} chestDetail={getChestDetailData?.getChestDetail}/>
        </div>
      </>
    )
}