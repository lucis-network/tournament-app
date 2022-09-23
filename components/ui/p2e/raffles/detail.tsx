import s from "./Raffles.module.sass";
import {
  Divider,
  Empty,
  Image,
  Input,
  InputNumber,
  message as antMessage,
  message,
} from "antd";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useSearchRaffles } from "../../../../hooks/p2e/raffles/useRafflesList";
import React, { useCallback, useEffect, useState } from "react";
import {
  useBuyRaffleTicket,
  useGetAllTicket,
  useGetMyTicket,
  useGetRaffleDetail,
} from "../../../../hooks/p2e/raffles/useRaffleDetail";
import { useRouter } from "next/router";
import { debounce, isEmpty } from "lodash";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import SpinLoading from "../../common/Spin";
import {
  BuyRaffleTicketErrorCode,
  RaffleStatusType,
  UserTicketGql,
  RaffleStatus,
} from "../../../../src/generated/graphql_p2e";
import { handleGraphqlErrors } from "../../../../utils/apollo_client";
import RollingRaffles from "./rolling";
import RafflesStore from "../../../../src/store/RafflesStore";
import moment from "moment";
import { mapToDict } from "../../../../utils/Array";
import { useGetWonTickets } from "../../../../hooks/p2e/useRaffleDetail";
import { AppEmitter } from "../../../../services/emitter";
import { isClientDevMode } from "../../../../utils/Env";
import DocHeadPlaycore from "../../../DocHeadPlaycore";
import { CurrencyType, UserInventoryCoupon } from "src/generated/graphql";
import { useInput } from "hooks/common/use_input";
import { CouponInput } from "./components/coupon_input";
import { KMath } from "utils/math.helper";
import { useMyCoupon } from "hooks/myProfile/useCoupon";

const RafflesDetail = observer((props: { raffleUID: string }) => {
  const { raffleUID } = props;
  const router = useRouter();

  const [allTickets, setAllTickets] = useState<UserTicketGql[]>([]);
  const [ticketBuyAmount, setTicketBuyAmount] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [ticketBuying, setTicketBuying] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<UserInventoryCoupon>();
  const [ticketSearchKeyword, setTicketSearchKeyword] = useState<string>("");
  const [checkDisplayEndAt, setCheckDisplayEndAt] = useState(false);
  const [isCheckRefetchDataWonTickets, setIsCheckRefetchDataWonTickets] =
    useState(false);

  const { dataWonTickets, refetchDataWonTickets, errorGetWonTickets } =
    useGetWonTickets({
      raffle_uid: raffleUID,
      skip: !isCheckRefetchDataWonTickets,
    });

  if (errorGetWonTickets) {
    console.log("errorGetWonTickets", errorGetWonTickets);
  }

  const { searchRafflesLoading, searchRafflesError, searchRafflesData } =
    useSearchRaffles({
      name: "",
      skipRaflleUid: raffleUID,
      status: RaffleStatusType.Enabled,
    });
  const {
    getRaffleDetailLoading,
    getRaffleDetailError,
    getRaffleDetailData,
    refetchRaffleDetail,
  } = useGetRaffleDetail(`${raffleUID}`);
  const {
    getMyTicketsLoading,
    getMyTicketsError,
    refetchMyTickets,
    getMyTicketsData,
  } = useGetMyTicket({
    raffle_uid: raffleUID,
    limit: 9999,
    page: 1,
  });
  const {
    getAllTicketsLoading,
    getAllTicketsError,
    refetchAllTickets,
    getAllTicketsData,
  } = useGetAllTicket({
    raffle_uid: raffleUID,
    limit: 9999,
    page: 1,
    display_name: ticketSearchKeyword,
  });

  const { buyRaffleTicket } = useBuyRaffleTicket();
  const { dataWinTicket } = RafflesStore;
  const txtCoupon = useInput();

  useEffect(() => {
    if (
      getAllTicketsData?.getAllTickets?.user_tickets &&
      getAllTicketsData?.getAllTickets?.user_tickets.length > 0
    ) {
      setAllTickets(getAllTicketsData?.getAllTickets?.user_tickets);
    }
  }, [getAllTicketsData?.getAllTickets?.user_tickets]);

  const dataWinTicketDict = mapToDict(
    dataWinTicket,
    (item) => true,
    (item) => item?.uid ?? ""
  );

  useEffect(() => {
    let isSubscribed = true;
    if (raffleDetailData?.status !== RaffleStatus.Closed) {
      let winTickets: number[] = [];
      const checkWinners = allTickets.some((item, index) => {
        const isWinner = dataWinTicketDict[item.uid];
        if (isWinner) {
          winTickets.push(index);
        }
      });
      const sortedTickets = [
        ...allTickets.filter((ticket, index) => {
          return winTickets.includes(index);
        }),
        ...allTickets.filter((ticket, index) => {
          return !winTickets.includes(index);
        }),
      ];
      if (isSubscribed) {
        setAllTickets(sortedTickets);
      }
    }
    return () => {
      isSubscribed = false;
    };
  }, [RafflesStore.dataWinTicketLastUpdated]);

  useEffect(() => {
    const checkDateInterval = setInterval(() => {
      const dateNow = moment(new Date()).valueOf();
      const endAtBefore = moment(
        getRaffleDetailData?.getRaffleDetail?.end_at
      ).valueOf();
      const timeBefore = (endAtBefore - dateNow) / (1000 * 60);
      if (timeBefore <= 5 && !checkDisplayEndAt) {
        setCheckDisplayEndAt(true);
        if (getRaffleDetailData?.getRaffleDetail?.status !== "CLOSED") {
          refetchRaffleDetail();
        }
      }
      if (timeBefore <= 0.5) {
        if (!isCheckRefetchDataWonTickets) {
          refetchDataWonTickets();
          setIsCheckRefetchDataWonTickets(true);
        }
      }
    }, 1000);
    if (checkDisplayEndAt && isCheckRefetchDataWonTickets)
      clearInterval(checkDateInterval);
    return () => {
      clearInterval(checkDateInterval);
    };
  }, [
    getRaffleDetailData?.getRaffleDetail?.end_at,
    checkDisplayEndAt,
    isCheckRefetchDataWonTickets,
  ]);

  const raffleDetailData = getRaffleDetailData?.getRaffleDetail;
  const { dataMyInventoryCoupons, loading, refetchMyInventoryCoupon } =
    useMyCoupon({
      type: "Raffle",
      currency_type: raffleDetailData?.ticket?.cost_type ?? undefined,
    });

  const raffleEndAt = moment(raffleDetailData?.end_at).format("HH:mm MMM Do");
  const allTicketsCount = getAllTicketsData?.getAllTickets?.count
    ? getAllTicketsData?.getAllTickets?.count
    : 0;
  const myTicketsCount = getMyTicketsData?.getMyTickets?.count
    ? getMyTicketsData?.getMyTickets?.count
    : 0;
  const ticketLimitationPerUser =
    getRaffleDetailData?.getRaffleDetail?.ticket?.user_limit;
  const cannotBuy =
    ticketBuying ||
    ticketBuyAmount < 1 ||
    (ticketLimitationPerUser
      ? ticketBuyAmount + myTicketsCount > ticketLimitationPerUser
      : false) ||
    (ticketLimitationPerUser
      ? ticketBuyAmount > ticketLimitationPerUser
      : false);
  const isRaffleClosed = raffleDetailData?.status === RaffleStatus.Closed;

  const debouncedInputTyping = useCallback(
    debounce((value: string) => {
      setTicketSearchKeyword(value);
    }, 500),
    []
  );

  useEffect(() => {
    const handleRouteChange = () => {
      setCheckDisplayEndAt(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  if (getRaffleDetailLoading)
    return (
      <div className={s.rafflesDetailWrapper}>
        <div className="lucis-container-2">
          <SpinLoading />
        </div>
      </div>
    );

  if (getRaffleDetailError || isEmpty(getRaffleDetailData?.getRaffleDetail))
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <title>404 | This page could not be found.</title>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );

  const handleTicketSearch = (event: React.FormEvent<HTMLInputElement>) => {
    debouncedInputTyping(event.currentTarget.value);
  };
  const handleBuyRaffleTicket = () => {
    setTicketBuying(true);
    buyRaffleTicket({
      raffle_ticket_uid: raffleDetailData?.ticket?.uid,
      quantity: ticketBuyAmount,
      user_coupon_uid: coupon?.uid,
      onError: (error) =>
        handleGraphqlErrors(error, (code, message) => {
          if (code !== "UnAuth") {
            switch (code) {
              case BuyRaffleTicketErrorCode.RaffleNotFound:
                antMessage.error(
                  "Invalid raffle. Please go back and choose another raffle."
                );
                break;
              case BuyRaffleTicketErrorCode.UserLimitExceeded:
                antMessage.error(
                  `You can buy up to ${ticketLimitationPerUser} tickets only.`
                );
                break;
              case BuyRaffleTicketErrorCode.BalanceNotInitiated:
                antMessage.error(`You don't have enough balance to buy.`);
                break;
              case BuyRaffleTicketErrorCode.NotEnoughLucisPoint:
                antMessage.error(`You don't have enough Lucis point to buy.`);
                break;
              case BuyRaffleTicketErrorCode.NotEnoughLucisToken:
                antMessage.error(`You don't have enough LUCIS token to buy.`);
                break;
              case BuyRaffleTicketErrorCode.BuyPhaseEnded:
                antMessage.error("Buy phase had ended.");
                break;
              case BuyRaffleTicketErrorCode.TotalLimitExceeded:
                // chaupa todo new message
                antMessage.error(
                  "An unknown error has occurred. Please try again later."
                );
                break;
              case BuyRaffleTicketErrorCode.TicketQuantityCannotBeZero:
                // chaupa todo new message
                antMessage.error(
                  "An unknown error has occurred. Please try again later."
                );
                break;
              case "UNAUTHENTICATED":
                antMessage.error("Please sign in first.");
                break;
              case "UserRegionInvalid":
                antMessage.error(
                  "This raffle is not available in your country."
                );
                break;
              default:
                antMessage.error(
                  "An unknown error has occurred. Please try again later."
                );
                break;
            }
          }
        }),
      onCompleted: (data) => {
        if (
          data?.data?.buyRaffleTicket &&
          data?.data?.buyRaffleTicket !== null
        ) {
          refetchMyTickets();
          refetchAllTickets();
          refetchMyInventoryCoupon();

          antMessage.success("Success!");
          AppEmitter.emit("updateBalance");
        }
      },
    }).finally(() => setTicketBuying(false));
  };

  const handleAmountChange = (amount: number) => {
    if (amount === null) {
      setTicketBuyAmount(0);
      setTotalCost(0);
      setTotalPayment(0);
      estimateDiscount(0, coupon);
    } else {
      amount = parseInt(amount.toString());
      setTicketBuyAmount(amount);
      let _totalCost = amount * raffleDetailData?.ticket?.cost;
      setTotalCost(_totalCost);
      setTotalPayment(_totalCost);
      estimateDiscount(amount, coupon);
    }
  };

  function onChangeCoupon(coupon: UserInventoryCoupon) {
    txtCoupon.onChange(coupon.code);
    estimateDiscount(ticketBuyAmount, coupon);
  }
  function estimateDiscount(amount: number, coupon?: UserInventoryCoupon) {
    if (!coupon?.prize?.coupon) {
      console.log("coupon: ", coupon);
      return;
    }
    setCoupon(coupon);
    if (!raffleDetailData?.ticket?.cost) {
      return;
    }

    let totalAmount = KMath.mul(
      amount,
      raffleDetailData.ticket.cost
    ).toNumber();
    let totalAmountCanDiscount = KMath.mul(
      Math.min(1, amount),
      raffleDetailData.ticket.cost
    ).toNumber();
    let totalPayment = totalAmount;
    let discount = 0;

    if (coupon != null) {
      discount = KMath.mul(
        coupon.prize.coupon.discount ?? "0",
        totalAmountCanDiscount
      )
        .div(100)
        .toNumber();
      if (coupon.prize.coupon.max_value_off != null) {
        discount = Math.min(discount, coupon.prize.coupon.max_value_off);
      }
      totalPayment -= discount;
    }

    setDiscount(discount);
    setTotalCost(totalAmount);
    setTotalPayment(totalPayment);
  }

  return (
    <>
      <div className={s.rafflesDetailWrapper}>
        <div className={`lucis-container-2 ${s.rafflesDetailContainer}`}>
          <section className={s.breadcrumbSection}>
            <Link href="/playcore/raffles" passHref>
              <button>
                <Image
                  src="/assets/P2E/raffles/iconArrow.svg"
                  preview={false}
                  alt=""
                />
              </button>
            </Link>
            <h2 className={s.sectionTitle}>Raffles</h2>
          </section>
          <section className={s.sectionFeaturedRaffle}>
            <div className={s.featuredRaffle}>
              <div className={s.featuredRaffleThumbnail}>
                <Image
                  src={raffleDetailData?.img ? raffleDetailData?.img : ""}
                  preview={false}
                  alt=""
                  fallback="/assets/P2E/raffles/defaultImage.jpg"
                />
              </div>
              <div className={s.featuredRaffleInfo}>
                <div
                  className={`${s.featuredRaffleTitleWrap} ${s.featuredRaffleTitleWrapDetail}`}
                >
                  <h3>{raffleDetailData?.name}</h3>
                  {raffleDetailData?.valued_at && (
                    <p>
                      {raffleDetailData?.valued_at
                        ? `Valued at $${raffleDetailData?.valued_at}`
                        : ""}
                    </p>
                  )}
                </div>
                {raffleDetailData?.type && (
                  <div className={s.featuredRafflePriceWrap}>
                    <div className={s.featuredRaffleTagWrap}>
                      {Array.isArray(raffleDetailData?.type) &&
                        raffleDetailData?.type.length > 0 &&
                        raffleDetailData?.type.map((type, index) => (
                          <div className={`${s.raffleTag}`} key={type}>
                            {type}
                          </div>
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
              <section
                className={`${s.buyTicketSection} ${s.sidebarSection} ${
                  checkDisplayEndAt ? s.sidebarHidden : ""
                }`}
              >
                <div className={s.raffleCountdown}>
                  <Image
                    src="/assets/P2E/raffles/iconCalendar.svg"
                    preview={false}
                    alt=""
                    fallback=""
                  />
                  <span className={s.raffleCountdownText}>
                    Rolling at{" "}
                    <span className={s.countdownTextColored}>
                      {raffleEndAt}
                    </span>
                  </span>
                </div>
                <h2 className={s.sectionTitle}>Buy tickets</h2>
                <div className={s.buyTicketInfo}>
                  <div className={s.buyTicketInfoItem}>
                    <div className={s.buyTicketInfoLabel}>Sold tickets</div>
                    <div className={s.buyTicketInfoValue}>
                      {allTicketsCount}{" "}
                      <Image
                        src="/assets/P2E/raffles/iconTicket.svg"
                        preview={false}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={s.buyTicketInfoItem}>
                    <div className={s.buyTicketInfoLabel}>My tickets</div>
                    <div className={s.buyTicketInfoValue}>
                      {myTicketsCount}{" "}
                      <Image
                        src="/assets/P2E/raffles/iconTicket.svg"
                        preview={false}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={s.buyTicketInfoItem}>
                    <div className={s.buyTicketInfoLabel}>Cost</div>
                    <div className={s.buyTicketInfoValue}>
                      <div className={s.rafflePrice}>
                        <div className={s.rafflePriceText}>
                          {raffleDetailData?.ticket?.cost}
                        </div>
                        <Image
                          src={
                            raffleDetailData?.ticket?.cost_type ===
                            "LUCIS_POINT"
                              ? "/assets/P2E/raffles/iconLucisPoint.svg"
                              : "/assets/P2E/raffles/iconLucisToken.svg"
                          }
                          preview={false}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className={s.buyTicketInfoItem}>
                    <div className={s.buyTicketInfoLabel}>
                      Amount{" "}
                      {ticketLimitationPerUser &&
                        `(Max: ${ticketLimitationPerUser})`}
                    </div>
                    {
                      // chaupa todo user limit validation
                    }
                    <div className={s.buyTicketInfoValue}>
                      <InputNumber
                        controls={false}
                        onChange={handleAmountChange}
                        min={0}
                        precision={0}
                      />
                    </div>
                  </div>
                  <Divider
                    style={{
                      backgroundColor: "rgba(118, 108, 108, 0.6)",
                      margin: "16px 0px",
                    }}
                  />
                  <CouponInput
                    coupons={dataMyInventoryCoupons}
                    raffle={raffleDetailData}
                    onSelect={onChangeCoupon}
                  />
                  {discount > 0 && (
                    <React.Fragment>
                      <div className={s.buyTicketInfoItem}>
                        <div className={s.buyTicketInfoLabel}>Subtotal</div>
                        <div className={s.buyTicketInfoValue}>
                          <div className={s.rafflePrice}>
                            <div className={s.rafflePriceText}>{totalCost}</div>
                            <Image
                              src={
                                raffleDetailData?.ticket?.cost_type ===
                                "LUCIS_POINT"
                                  ? "/assets/P2E/raffles/iconLucisPoint.svg"
                                  : "/assets/P2E/raffles/iconLucisToken.svg"
                              }
                              preview={false}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className={s.buyTicketInfoItem}>
                        <div className={s.buyTicketInfoLabel}>
                          Promotion total
                        </div>
                        <div className={s.buyTicketInfoValue}>
                          <div className={s.rafflePrice}>
                            <div className={s.rafflePriceText}>-{discount}</div>
                            <Image
                              src={
                                raffleDetailData?.ticket?.cost_type ===
                                "LUCIS_POINT"
                                  ? "/assets/P2E/raffles/iconLucisPoint.svg"
                                  : "/assets/P2E/raffles/iconLucisToken.svg"
                              }
                              preview={false}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <Divider
                        style={{
                          backgroundColor: "rgba(118, 108, 108, 0.6)",
                          margin: "16px 0px",
                        }}
                      />
                    </React.Fragment>
                  )}
                  <div className={s.buyTicketInfoItem}>
                    <div className={s.buyTicketInfoLabelLarge}>
                      Total payment
                    </div>
                    <div className={s.buyTicketInfoValue}>
                      <div className={s.rafflePrice}>
                        <div className={s.rafflePriceTextLarge}>
                          {totalPayment}
                        </div>
                        <Image
                          src={
                            raffleDetailData?.ticket?.cost_type ===
                            "LUCIS_POINT"
                              ? "/assets/P2E/raffles/iconLucisPoint.svg"
                              : "/assets/P2E/raffles/iconLucisToken.svg"
                          }
                          preview={false}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={s.buyTicket}>
                  <button
                    className={s.sidebarBtn}
                    onClick={handleBuyRaffleTicket}
                    disabled={cannotBuy}
                  >
                    <span>Buy</span>
                  </button>
                </div>
                <div className={s.buyTicketDesc}>
                  <h2>How you get tickets</h2>
                  <p>
                    You can get a lot of Lucis points after completing the Lucis
                    mission. {`Let's`} get it!
                  </p>
                  <Link href="/playcore/missions" passHref>
                    <a className={s.sidebarBtn}>
                      <span>Earn more</span>
                    </a>
                  </Link>
                </div>
              </section>
              {checkDisplayEndAt && (
                <section
                  className={`${s.rafflesRollingSection} ${s.sidebarSection}`}
                >
                  <RollingRaffles
                    raffleUid={raffleUID ? raffleUID.toString() : ""}
                    refetchRaffleDetail={refetchRaffleDetail}
                    dataWonTickets={dataWonTickets}
                    dataRaffleDetail={getRaffleDetailData?.getRaffleDetail}
                  ></RollingRaffles>
                </section>
              )}
            </div>
          </div>
          <section className={s.myTicketsSection}>
            <h2 className={s.sectionTitle}>My tickets [{myTicketsCount}]</h2>
            {getMyTicketsError ||
            (getMyTicketsData?.getMyTickets?.user_tickets &&
              getMyTicketsData?.getMyTickets?.user_tickets.length <= 0) ? (
              <p className={s.myTicketsEmpty}>
                You haven&apos;t bought any tickets yet. Please buy some tickets
                to try your luck!
              </p>
            ) : getMyTicketsLoading ? (
              <SpinLoading />
            ) : (
              <div className={s.myTicketsList}>
                {getMyTicketsData?.getMyTickets?.user_tickets &&
                  getMyTicketsData?.getMyTickets?.user_tickets.map(
                    (ticket, index) => (
                      <div className={s.ticketItem} key={ticket?.uid}>
                        #{ticket?.ticket_number}
                      </div>
                    )
                  )}
              </div>
            )}
          </section>
          <section className={s.allTicketsSection}>
            <div className={s.sectionTitleFlex}>
              <h2 className={s.sectionTitle}>
                Sold tickets [{allTicketsCount}]
              </h2>
              <div className={s.raffleSearch}>
                <Input
                  placeholder="Search by name"
                  onChange={handleTicketSearch}
                />
                <Image
                  src="/assets/P2E/raffles/iconSearch.svg"
                  preview={false}
                  alt=""
                />
              </div>
            </div>
            {getAllTicketsError ||
            (getAllTicketsData?.getAllTickets?.user_tickets &&
              getAllTicketsData?.getAllTickets?.user_tickets.length <= 0) ? (
              <Empty />
            ) : getAllTicketsLoading ? (
              <SpinLoading />
            ) : (
              <div className={s.allTicketsList}>
                <div className={s.tableResponsive}>
                  <table>
                    <tbody>
                      {allTickets.map((ticket, index) => (
                        <tr className={`${s.allTicketItem}`} key={ticket?.uid}>
                          <td className={s.ownerReward}>{index + 1}</td>
                          <td className={s.ownerInfo}>
                            <Link
                              href={`/profile/${ticket?.user?.profile?.user_name}`}
                              passHref
                            >
                              <a className={s.ownerInfoFlex}>
                                <Image
                                  src={
                                    ticket?.user?.profile?.avatar ??
                                    "/assets/P2E/raffles/defaultAvatar.jpg"
                                  }
                                  className={s.ownerAvatar}
                                  preview={false}
                                  alt=""
                                  fallback="/assets/P2E/raffles/defaultAvatar.jpg"
                                />
                                <div className={s.ownerName}>
                                  {ticket?.user?.profile?.display_name}
                                </div>
                              </a>
                            </Link>
                          </td>
                          <td className={s.ticketID}>
                            #{ticket?.ticket_number}
                          </td>
                          <td className={s.ticketCrown}>
                            {isRaffleClosed
                              ? ticket?.is_winner && (
                                  <Image
                                    src="/assets/P2E/raffles/iconCrown.svg"
                                    preview={false}
                                    alt=""
                                  />
                                )
                              : dataWinTicketDict[ticket.uid] && (
                                  <Image
                                    src="/assets/P2E/raffles/iconCrown.svg"
                                    preview={false}
                                    alt=""
                                  />
                                )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
          {Array.isArray(raffleDetailData?.raffle_sponsors) &&
            raffleDetailData?.raffle_sponsors.length > 0 && (
              <section className={s.sectionRafflesSponsor}>
                <h2 className={s.sectionTitle}>Sponsor</h2>
                <div className={s.rafflesSponsorList}>
                  {raffleDetailData?.raffle_sponsors.map((sponsor, index) => (
                    <div className={s.raffleSponsorItem} key={sponsor?.uid}>
                      <Image
                        src={sponsor?.img ? sponsor?.img : ""}
                        preview={false}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          <section className={s.sectionRaffles}>
            <div className={s.raffleTitleWrap}>
              <h2 className={s.sectionTitle}>Other Raffles</h2>
            </div>
            {searchRafflesLoading ? (
              <SpinLoading />
            ) : searchRafflesData?.searchRaffle.length <= 0 ||
              searchRafflesError ? (
              <>
                <div className={s.rafflesList}>
                  <div
                    className={`${s.rafflesItem} comingSoon ${s.rafflesItemEmpty}`}
                  >
                    NEW RAFFLES
                    <br />
                    COMING SOON
                  </div>
                </div>
              </>
            ) : (
              <div className={s.rafflesList}>
                {searchRafflesData?.searchRaffle.length > 0 &&
                  searchRafflesData?.searchRaffle.map((raffle, index) => (
                    <Link
                      href={`/playcore/raffles/${raffle?.uid}`}
                      passHref
                      key={`${raffle?.uid}${index}`}
                    >
                      <a className={s.rafflesItem}>
                        <div className={s.raffleThumbnail}>
                          <Image
                            src={raffle?.img as string}
                            preview={false}
                            alt=""
                          />
                        </div>
                        <div className={s.raffleInfo}>
                          {raffle?.type && (
                            <div className={s.raffleTagWrap}>
                              {
                                // @ts-ignore
                                raffle?.type.map(
                                  (type: string, index: number) => (
                                    <div
                                      className={s.raffleTag}
                                      key={`${type}${index}`}
                                    >
                                      {type}
                                    </div>
                                  )
                                )
                              }
                            </div>
                          )}
                          <h3 className={s.raffleTitle}>{raffle?.name}</h3>
                          <div className={s.rafflePriceWrap}>
                            <div className={s.raffleValued}>
                              {raffle?.valued_at
                                ? `Valued at $${raffle?.valued_at}`
                                : ""}
                            </div>
                            <div className={s.rafflePrice}>
                              {raffle?.prize_category?.currency_type ===
                                CurrencyType.LucisPoint && (
                                <>
                                  <div className={s.rafflePriceText}>
                                    {raffle?.amount_of_currency}
                                  </div>
                                  <Image
                                    src="/assets/P2E/lucis-point.svg"
                                    preview={false}
                                    alt=""
                                  />
                                </>
                              )}
                              {raffle?.prize_category?.currency_type ===
                                CurrencyType.LucisToken && (
                                <>
                                  <div className={s.rafflePriceText}>
                                    {raffle?.amount_of_currency}
                                  </div>
                                  <Image
                                    src="/assets/P2E/lucis-token.svg"
                                    preview={false}
                                    alt=""
                                  />
                                </>
                              )}
                              {raffle?.prize_category?.currency_type ===
                                CurrencyType.Decentralized && (
                                <>
                                  <div className={s.rafflePriceText}>
                                    {raffle?.amount_of_currency}
                                  </div>
                                  <Image
                                    src={
                                      raffle?.prize_category?.currency?.icon ??
                                      ""
                                    }
                                    preview={false}
                                    alt=""
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                <div className={`${s.rafflesItem} comingSoon`}>
                  NEW RAFFLES
                  <br />
                  COMING SOON
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
});
// export default RafflesDetail

export default function RafflesDetailSafe() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    if (isClientDevMode) {
      console.warn("{RafflesDetailDetail} Hey rafleUID is NULL");
    }
  }

  return id ? <RafflesDetail raffleUID={id as string} /> : null;
}
