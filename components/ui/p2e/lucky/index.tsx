import React, { useEffect, useState } from "react";
import ButtonOpenBox from "./button/buttonOpen";
import HistoryTable from "./history";
import s from "./LuckyChest.module.sass";
import {
  OPEN_CHEST,
  useGetChestDetail,
} from "../../../../hooks/p2e/luckyChest/useLuckyChest";
import {
  ChestDetail,
  LuckyChestPrize,
  LuckyChestPrizeGql,
  LuckyChestTier,
  OpenChestErrorCode,
} from "../../../../src/generated/graphql_p2e";
import SpinLoading from "../../common/Spin";
import { isEmpty } from "lodash";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import { handleGraphqlErrors } from "../../../../utils/apollo_client";
import { Image, message } from "antd";
import ChestPrize from "./prize";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { isClient } from "../../../../utils/Env";
import { useMutation, useQuery } from "@apollo/client";
import PopupRollingChest from "./popup/popupRollingChest";
import { GET_STATISTICS } from "../../../../hooks/p2e/useP2E";
import AuthStore from "../../../Auth/AuthStore";
import LoginBoxStore from "../../../Auth/Login/LoginBoxStore";
import AuthGameStore from "../../../Auth/AuthGameStore";
import { useRouter } from "next/router";
import { Game, OverviewSection } from "../../../../utils/Enum";
import { AppEmitter } from "../../../../services/emitter";
import { fromBinary } from "../../../Auth/AuthLocal";
import LuckyChestSevice from "../../../service/p2e/LuckyChestSevice";
import { CurrencyType } from "src/generated/graphql";

export default function LuckyChest(props: any) {
  const [currentLuckyChestTab, setCurrentLuckyChestTab] = useState<
    LuckyChestTier | undefined
  >(undefined);
  const [disabledTab, setDisabledTab] = useState(false);
  const [rollingChestPopupVisible, setRollingChestPopupVisible] =
    useState(false);
  const [chestUnlocking, setChestUnlocking] = useState(false);
  const [chestPrize, setChestPrize] = useState<LuckyChestPrize>(
    {} as LuckyChestPrize
  );
  const [gameType, setGameType] = useState<Game>(Game.NONE);
  const [chestDetail, setChestDetail] = useState<ChestDetail | undefined>(
    undefined
  );
  const [chestDetailLoading, setChestDetailLoading] = useState(false);
  const [chestDetailError, setChestDetailError] = useState(false);

  const getChestDetail = async (
    type: Game | undefined,
    tier: LuckyChestTier
  ) => {
    setChestDetailLoading(true);
    setChestDetailError(false);
    try {
      const res = await LuckyChestSevice.getChestDetail(type, tier);
      setChestDetailLoading(false);
      setChestDetail(res.data?.getChestDetail);
    } catch (e) {
      setChestDetailLoading(false);
      setChestDetailError(true);
    }
  };
  const [openLuckyChest] = useMutation(OPEN_CHEST, {
    context: {
      endpoint: "p2e",
    },
  });

  const { data: getBalanceData, refetch: refetchBalanceData } = useQuery(
    GET_STATISTICS,
    {
      context: {
        endpoint: "p2e",
      },
      skip: !AuthStore.isLoggedIn,
    }
  );
  const router = useRouter();
  // const chestDetail = getChestDetailData?.getChestDetail
  // console.log(chestDetail)
  const ticketCost = chestDetail?.ticket_cost;
  const ticketCostType = chestDetail?.ticket_cost_type;
  const luckyChestSponsor = chestDetail?.sponsors;
  const chestPrizes = chestDetail?.prizes;
  const preventDefault = (ev: any) => {
    if (ev.preventDefault) {
      ev.preventDefault();
    }
    ev.returnValue = false;
  };

  const enableBodyScroll = () => {
    document && document.removeEventListener("wheel", preventDefault, false);
  };

  const disableBodyScroll = () => {
    document &&
      document.addEventListener("wheel", preventDefault, {
        passive: false,
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
  };

  useEffect(() => {
    if (!AuthStore.isLoggedIn) {
      setCurrentLuckyChestTab(LuckyChestTier.Standard);
      // setDisabledTab(true);
      setGameType(Game.LOL);
      getChestDetail(Game.LOL, LuckyChestTier.Standard);
      return;
    }
    if (props.currentGame !== null) {
      if (props.currentGame === 0) {
        setCurrentLuckyChestTab(LuckyChestTier.Free);
        if (!AuthStore.isLoggedIn) {
          setDisabledTab(false);
        } else {
          setDisabledTab(true);
        }
        getChestDetail(undefined, LuckyChestTier.Free);
      } else {
        setGameType(props.currentGame ? props.currentGame : Game.LOL);
        getChestDetail(
          props.currentGame ? props.currentGame : Game.LOL,
          LuckyChestTier.Standard
        );
        setDisabledTab(false);
        setCurrentLuckyChestTab(LuckyChestTier.Standard);
      }
    }
  }, [AuthStore.isLoggedIn, props.currentGame]);
  const openRollingLuckyChest = async () => {
    try {
      await openLuckyChest({
        variables: {
          game_platform_id:
            currentLuckyChestTab === LuckyChestTier.Free ? undefined : gameType,
          tier: currentLuckyChestTab,
        },
        onCompleted: (data) => {
          // const decodedData: LuckyChestPrize = JSON.parse(b64DecodeUnicode(data?.openChest?.prize))
          // console.log(fromBinary(data?.openChest))
          console.log(
            "JSON.parse(fromBinary(data?.openChest)): ",
            JSON.parse(fromBinary(data?.openChest))
          );
          setChestPrize(JSON.parse(fromBinary(data?.openChest)));
          setRollingChestPopupVisible(true);
          AppEmitter.emit("updateBalance");
        },
      });
    } catch (error: any) {
      handleGraphqlErrors(error, (code) => {
        switch (code) {
          case OpenChestErrorCode.ChestNotFound:
            message.error("Invalid chest. Please try again later.");
            break;
          case OpenChestErrorCode.ServerError:
            message.error("Connection failed. Please try again later.");
            break;
          case OpenChestErrorCode.BalanceNotInitiated:
            message.error("You don't have enough balance to open.");
            break;
          case OpenChestErrorCode.NotEnoughLucisPoint:
            message.error("You don't have enough Lucis point to open.");
            break;
          case OpenChestErrorCode.NotEnoughLucisToken:
            message.error("You don't have enough LUCIS token to open.");
            break;
          case OpenChestErrorCode.PrizeNotFound:
            message.error("Invalid prize. Please try again later.");
            break;
          case OpenChestErrorCode.GameNotConnected:
            message.error("Please connect game first.");
            break;
          default:
            message.error(
              "An unknown error has occurred. Please try again later."
            );
            break;
        }
      });
    }
  };

  const handleOpenBox = async () => {
    if (isClient) {
      if (!AuthStore.isLoggedIn) {
        LoginBoxStore.connectModalVisible = true;
        return;
      }
      // switch (gameType) {
      //   case GAMES.FACEITCSGO:
      //     if (!AuthGameStore.isLoggedInFaceit) {
      //       message.warning("Please connect game first.");
      //       router.push("/"); sessionStorage.setItem("overviewSection", OverviewSection.CONNECT_GAME.toString());
      //       return
      //     }
      //     break
      //   case GAMES.GARENALOL:
      //     if (!AuthGameStore.isLoggedInLMSS) {
      //       message.warning("Please connect game first.")
      //       router.push("/"); sessionStorage.setItem("overviewSection", OverviewSection.CONNECT_GAME.toString());
      //       return
      //     }
      //     break
      //   default:
      //     break
      // }
      setChestUnlocking(true);
      try {
        let canOpen = true;
        const getBalance = await refetchBalanceData();
        switch (ticketCostType) {
          case CurrencyType.LucisToken:
            if (ticketCost > getBalance?.data?.getBalance?.lucis_token) {
              canOpen = false;
              message.error("You don't have enough LUCIS token to open.");
            }
            break;
          case CurrencyType.LucisPoint:
            if (ticketCost > getBalance?.data?.getBalance?.lucis_point) {
              canOpen = false;
              message.error("You don't have enough Lucis point to open.");
            }
            break;
          default:
            break;
        }
        if (canOpen) {
          const box = document.querySelector(".boxTarget");
          const boxOpeningAnimation = (event: AnimationEvent) => {
            if (isClient && box && event) {
              if (event.animationName.indexOf("slide-out-fwd-center") > -1) {
                box.classList.remove("opening");
                if (typeof boxOpeningAnimation === "function") {
                  // @ts-ignore
                  box.removeEventListener("animationend", boxOpeningAnimation);
                }
              }
            }
            setChestUnlocking(false);
          };

          if (box) {
            // @ts-ignore
            box.addEventListener("animationend", boxOpeningAnimation);
            box.classList.add("opening");
          }
          setTimeout(() => {
            openRollingLuckyChest();
          }, 700);
        } else {
          setChestUnlocking(false);
        }
      } catch (e) {
        message.error("An unknown error has occurred. Please try again later.");
        console.log("[handleOpenBox] error: ", e);
        setChestUnlocking(false);
      }
    }
  };

  // if (chestDetailLoading) return (
  //   <div className={`${s.wrapper} lucis-container-2`}>
  //     <SpinLoading/>
  //   </div>
  // )

  function getPrizeTitle(item: LuckyChestPrizeGql) {
    if (!item) {
      return "";
    }
    let isShowNumberOfPrize =
      item.number_of_prize != null && item.number_of_prize > 1;
    return `${
      item.amount_of_currency != null && item.amount_of_currency > 0
        ? item.amount_of_currency
        : isShowNumberOfPrize
        ? item.number_of_prize
        : ""
    } ${item.title}${isShowNumberOfPrize ? "s" : ""}`;
  }

  if (chestDetailError)
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <title>404 | This page could not be found.</title>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  const switchLuckyChestTab = (tab: LuckyChestTier) => {
    if (tab === currentLuckyChestTab) {
      return;
    }
    if (
      !props.currentGame &&
      tab !== LuckyChestTier.Free &&
      AuthStore.isLoggedIn
    ) {
      setDisabledTab(true);
      return;
    }
    setCurrentLuckyChestTab(tab);
    getChestDetail(tab === LuckyChestTier.Free ? undefined : gameType, tab);
  };
  return (
    <>
      <div className={s.luckyChestTabsSection}>
        <div className="lucis-container-2">
          <div className={s.luckyChestTabs}>
            <div
              onClick={() => switchLuckyChestTab(LuckyChestTier.Standard)}
              className={`${s.luckyChestTabsItem} ${
                currentLuckyChestTab === LuckyChestTier.Standard ? "active" : ""
              } ${disabledTab && "disabled"}`}
            >
              Standard
            </div>
            <div
              onClick={() => switchLuckyChestTab(LuckyChestTier.Free)}
              className={`${s.luckyChestTabsItem} ${
                currentLuckyChestTab === LuckyChestTier.Free ? "active" : ""
              }`}
            >
              Trial
            </div>
            <div className={`${s.luckyChestTabsItem} disabled`}>Premium</div>
            <div className={`${s.luckyChestTabsItem} disabled`}>NFTs</div>
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
                <ButtonOpenBox
                  disabled={chestUnlocking}
                  onClick={handleOpenBox}
                >
                  Open
                </ButtonOpenBox>
                <div className={s.number_coin}>
                  <div className={s.n}>{ticketCost}</div>
                  <img
                    src={
                      ticketCostType === CurrencyType.LucisToken
                        ? "/assets/P2E/lucky-chest/ic_lucis_coin.png"
                        : "/assets/P2E/lucky-chest/iconLucisPoint.svg"
                    }
                    alt="icon"
                  />
                </div>
              </div>
              {chestDetail?.desc && (
                <p dangerouslySetInnerHTML={{ __html: chestDetail?.desc }} />
              )}
            </div>
          </div>
          <div className={s.box}>
            <div className={s.boxWrap}>
              <img
                src="/assets/P2E/lucky-chest/im_box.png"
                alt=""
                className={`${s.boxImg} boxTarget`}
              />
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
              <ButtonOpenBox disabled={chestUnlocking} onClick={handleOpenBox}>
                Open
              </ButtonOpenBox>
              <div className={s.number_coin}>
                <div className={s.n}>{ticketCost}</div>
                <img
                  src={
                    ticketCostType === CurrencyType.LucisToken
                      ? "/assets/P2E/lucky-chest/ic_lucis_coin.png"
                      : "/assets/P2E/lucky-chest/iconLucisPoint.svg"
                  }
                  alt="icon"
                />
              </div>
            </div>
          </div>
        </div>
        {chestPrizes && (
          <div className={s.chestPrizesWrap}>
            <h2>Items that might be in this box:</h2>
            <div
              className={s.chestPrizesList}
              onMouseEnter={disableBodyScroll}
              onMouseLeave={enableBodyScroll}
            >
              <ScrollMenu onWheel={onWheel}>
                {chestPrizes.map((prize) => (
                  <>
                    <ChestPrize
                      key={prize?.id}
                      description={prize?.desc}
                      image={prize?.img ?? ""}
                      title={getPrizeTitle(prize)}
                      rarity={prize?.rarity ?? ""}
                    />
                  </>
                ))}
              </ScrollMenu>
            </div>
          </div>
        )}
        {AuthStore.isLoggedIn && (
          <HistoryTable
            currentGame={props.currentGame}
            tier={currentLuckyChestTab}
          />
        )}
        {luckyChestSponsor && luckyChestSponsor.length > 0 && (
          <div className={s.luckyChestSponsor}>
            <div className="lucis-container-2">
              <h2>Sponsor</h2>
              <div className={s.luckyChestSponsorList}>
                {luckyChestSponsor.map((sponsor, index) => (
                  <div className={s.luckyChestSponsorItem} key={sponsor?.uid}>
                    <Image
                      src={sponsor?.img as string}
                      preview={false}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {rollingChestPopupVisible && (
          <PopupRollingChest
            visible={rollingChestPopupVisible}
            closePopupRollingChest={() => setRollingChestPopupVisible(false)}
            chestDetail={chestDetail as ChestDetail}
            chestPrize={chestPrize}
          />
        )}
      </div>
    </>
  );
}
