import React, {useState} from 'react'
import ButtonOpenBox from './button/buttonOpen'
import HistoryTable from './history'
import s from './LuckyChest.module.sass'
import PopUpOpenBox from './popup'
import {
  useClaimChestPrize,
  useGetChestDetail,
  useGetLuckyChestUserInfo
} from "../../../../hooks/p2e/luckyChest/useLuckyChest";
import {CostType, LuckyChestTier, LuckyChestType} from "../../../../src/generated/graphql_p2e";
import SpinLoading from "../../common/Spin";
import {isEmpty} from "lodash";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import {handleGraphqlErrors} from "../../../../utils/apollo_client";
import {Empty, Image, message as antMessage} from "antd";

export default function LuckyChest() {
    const [showPopupOpenBox, setShowPopupOpenBox] = useState(false);
    const {getChestDetailLoading, getChestDetailError, getChestDetailData} = useGetChestDetail({
        type: LuckyChestType.Csgo,
        tier: LuckyChestTier.Standard,
    })
    const chestDetail = getChestDetailData?.getChestDetail
    const ticketCost = chestDetail?.ticket_cost
    const ticketCostType = chestDetail?.ticket_cost_type
    const luckyChestSponsor = chestDetail?.sponsors
    const chestPrizes = chestDetail?.prizes

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
                <img onClick={() => setShowPopupOpenBox(true)} src="/assets/P2E/lucky-chest/im_box.png" alt="" className={s.boxImg} />
                {chestPrizes && (
                  <div className={s.content_right}>
                    <img src="/assets/P2E/lucky-chest/ic_line.svg" alt=""/>
                    <div className={s.block_item}>
                      {chestPrizes.map((item, index) => {
                        return (
                          <div className={s.item} key={'k' + index + item?.id}>
                            <img src={item?.img ? item?.img : "/assets/P2E/lucky-chest/im_box.png"} alt=""/>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
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
          {/*<div className={s.chestPrizesWrap}>*/}
          {/*  <h2>Items that might be in this Box:</h2>*/}
          {/*  <div className={s.chestPrizesList}>*/}

          {/*  </div>*/}
          {/*</div>*/}
          <HistoryTable/>
          {luckyChestSponsor && (
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
          <PopUpOpenBox
            status={showPopupOpenBox}
            closePopupOpenBox={() => setShowPopupOpenBox(false)}
            chestDetail={getChestDetailData?.getChestDetail}
          />
        </div>
      </>
    )
}