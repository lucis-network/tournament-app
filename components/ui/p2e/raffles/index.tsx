import s from "./Raffles.module.sass";
import { Image, Input, Empty, Radio } from "antd";
import Link from "next/link";
import {
  useGetFeaturedRaffle,
  useGetRecentWinners,
  useGetSponsorRaffle,
  useSearchRaffles,
} from "../../../../hooks/p2e/raffles/useRafflesList";
import React, { useCallback, useEffect, useState } from "react";
import { debounce, isEmpty } from "lodash";
import SpinLoading from "../../common/Spin";
import CountdownTimer from "../../common/CountDown";
import moment from "moment";
import { CurrencyType, RaffleGql } from "src/generated/graphql_p2e";

const Raffles = () => {
  const [rafflesData, setRafflesData] = useState<RaffleGql[]>([]);
  const [rafflesKeyword, setRafflesKeyword] = useState<string>("");
  const [searchOption, setSearchOption] = useState<string>("ENABLED");
  const [isCheckFirstTimeRender, setIsCheckFirstTimeRender] =
    useState<boolean>(false);
  const {
    getRecentWinnersLoading,
    getRecentWinnersError,
    getRecentWinnersData,
  } = useGetRecentWinners();
  const {
    getFeaturedRaffleLoading,
    getFeaturedRaffleError,
    getFeaturedRaffleData,
  } = useGetFeaturedRaffle();
  const {
    getSponsorRaffleLoading,
    getSponsorRaffleError,
    getSponsorRaffleData,
  } = useGetSponsorRaffle();
  const { searchRafflesLoading, searchRafflesError, searchRafflesData } =
    useSearchRaffles({
      name: rafflesKeyword,
      status: searchOption,
    });
  const recentWinnersEmpty = isEmpty(getRecentWinnersData?.getRecentWinners);
  // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  useEffect(() => {
    if (
      searchRafflesData?.searchRaffle.length == 0 &&
      !isCheckFirstTimeRender
    ) {
      if (searchOption === "ENABLED") setSearchOption("CLOSED");
      else {
        setSearchOption("ENABLED");
        setIsCheckFirstTimeRender(true);
      }
    }

    if (searchRafflesData?.searchRaffle) {
      if (!isCheckFirstTimeRender) {
        setIsCheckFirstTimeRender(true);
      }
      setRafflesData(searchRafflesData?.searchRaffle);
    }
  }, [searchRafflesData?.searchRaffle]);

  const debouncedInputTyping = useCallback(
    debounce((value: string) => {
      setRafflesKeyword(value);
    }, 500),
    []
  );

  const handleRafflesSearch = (event: React.FormEvent<HTMLInputElement>) => {
    debouncedInputTyping(event.currentTarget.value);
  };

  const onChangeSearchOption = (event: any) => {
    setSearchOption(event.target.value);
  };

  const targetDate = moment(
    getFeaturedRaffleData?.spotlightRaffle?.end_at
  ).valueOf();

  return (
    <div className={s.rafflesWrapper}>
      {getRecentWinnersLoading ? (
        <SpinLoading />
      ) : (
        !recentWinnersEmpty && (
          <section className={s.sectionRecentWinners}>
            <div className="lucis-container-2">
              <h2 className={s.sectionTitle}>Recent Winners</h2>
              <div className={s.recentWinnersList}>
                {getRecentWinnersData?.getRecentWinners &&
                  getRecentWinnersData?.getRecentWinners.length > 0 &&
                  getRecentWinnersData?.getRecentWinners.map((item, index) => (
                    <div
                      className={s.recentWinnersItem}
                      key={`${item?.raffle?.uid}${index}`}
                    >
                      <div className={s.recentWinnerThumbnail}>
                        <Link
                          href={`/playcore/raffles/${item?.raffle?.uid}`}
                          passHref
                        >
                          <Image
                            src={
                              item?.raffle?.img
                                ? item?.raffle?.img
                                : "/assets/P2E/raffles/defaultImage.jpg"
                            }
                            preview={false}
                            alt=""
                            fallback="/assets/P2E/raffles/defaultImage.jpg"
                          />
                        </Link>
                      </div>
                      <div className={s.recentWinnerInfo}>
                        <div className={s.winner}>
                          <div className={s.winnerAvatar}>
                            <Image
                              src={
                                item?.user?.profile?.avatar
                                  ? item?.user?.profile?.avatar
                                  : "/assets/P2E/raffles/defaultAvatar.jpg"
                              }
                              preview={false}
                              alt=""
                              fallback="/assets/P2E/raffles/defaultAvatar.jpg"
                            />
                          </div>
                          <div className={s.winnerUsername}>
                            <a
                              href={`/profile/${item?.user?.profile?.user_name}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item?.user?.profile?.display_name}
                            </a>
                          </div>
                        </div>
                        {item?.raffle?.valued_at && (
                          <div className={s.winnerValued}>
                            Valued at ${item?.raffle?.valued_at}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              {/*{getRecentWinnersData?.getRecentWinners.length > 0 && (*/}
              {/*  <button className={s.btnViewAll} disabled>View all</button>*/}
              {/*)}*/}
            </div>
          </section>
        )
      )}
      <section className={s.sectionFeaturedRaffle}>
        <div className="lucis-container-2">
          <div className={s.titleFlex}>
            {/*<h2 className={s.sectionTitle}>Raffles in {month[(new Date()).getMonth()]} </h2>*/}
            <div className={s.raffleCountdown}>
              <Image
                src="/assets/P2E/raffles/iconCalendar.svg"
                preview={false}
                alt=""
                fallback=""
              />
              <span className={s.raffleCountdownText}>End in 7 days</span>
            </div>
          </div>
          {getFeaturedRaffleLoading ? (
            <SpinLoading />
          ) : getFeaturedRaffleError ||
            !getFeaturedRaffleData?.spotlightRaffle ? (
            <Empty />
          ) : (
            <div className={s.featuredRaffle}>
              <div className={s.featuredRaffleThumbnail}>
                <Image
                  src={getFeaturedRaffleData?.spotlightRaffle?.img as string}
                  preview={false}
                  fallback={"/assets/P2E/raffles/defaultImage.jpg"}
                  alt=""
                />
              </div>
              <div className={s.featuredRaffleInfo}>
                <Link
                  href={`/playcore/raffles/${getFeaturedRaffleData?.spotlightRaffle?.uid}`}
                  passHref
                >
                  <a className={s.btnViewRaffle}>
                    <span>View Raffle</span>
                  </a>
                </Link>
                <div className={s.featuredRaffleTitleWrap}>
                  <h3>{getFeaturedRaffleData?.spotlightRaffle?.name}</h3>
                  <p>
                    {getFeaturedRaffleData?.spotlightRaffle?.valued_at
                      ? `Valued at $${getFeaturedRaffleData?.spotlightRaffle?.valued_at}`
                      : ""}
                  </p>
                </div>
                <div className={s.featuredRafflePriceWrap}>
                  <div className={s.rafflePrice}>
                    {getFeaturedRaffleData?.spotlightRaffle?.prize_category
                      ?.currency_type === CurrencyType.LucisPoint && (
                      <>
                        <div className={s.rafflePriceText}>
                          {
                            getFeaturedRaffleData?.spotlightRaffle
                              ?.amount_of_currency
                          }
                        </div>
                        <Image
                          src="/assets/P2E/lucis-point.svg"
                          preview={false}
                          alt=""
                        />
                      </>
                    )}
                    {getFeaturedRaffleData?.spotlightRaffle?.prize_category
                      ?.currency_type === CurrencyType.LucisToken && (
                      <>
                        <div className={s.rafflePriceText}>
                          {
                            getFeaturedRaffleData?.spotlightRaffle
                              ?.amount_of_currency
                          }
                        </div>
                        <Image
                          src="/assets/P2E/lucis-token.svg"
                          preview={false}
                          alt=""
                        />
                      </>
                    )}
                    {getFeaturedRaffleData?.spotlightRaffle?.prize_category
                      ?.currency_type === CurrencyType.Decentralized && (
                      <>
                        <div className={s.rafflePriceText}>
                          {
                            getFeaturedRaffleData?.spotlightRaffle
                              ?.amount_of_currency
                          }
                        </div>
                        <Image
                          src={
                            getFeaturedRaffleData?.spotlightRaffle
                              ?.prize_category?.currency?.icon ?? ""
                          }
                          preview={false}
                          alt=""
                        />
                      </>
                    )}
                  </div>
                  {getFeaturedRaffleData?.spotlightRaffle?.status ===
                    "ENABLED" && (
                    <div className={s.raffleCountdown}>
                      <Image
                        src="/assets/P2E/raffles/iconCalendar.svg"
                        preview={false}
                        alt=""
                      />
                      <span className={s.raffleCountdownText}>End in</span>
                      <span className={s.raffleCountdownTime}>
                        <CountdownTimer
                          targetDate={targetDate}
                        ></CountdownTimer>
                      </span>
                    </div>
                  )}
                  {getFeaturedRaffleData?.spotlightRaffle?.status ===
                    "CLOSED" && (
                    <div className={s.raffleClose}>
                      <Image
                        src="/assets/P2E/raffles/iconCalendarClosed.svg"
                        preview={false}
                        alt=""
                      />
                      <div className={`${s.raffleCloseDesc}`}>Closed</div>
                    </div>
                  )}
                  {getFeaturedRaffleData?.spotlightRaffle?.type &&
                    getFeaturedRaffleData?.spotlightRaffle?.type.length > 0 && (
                      <div className={s.featuredRaffleTagWrap}>
                        {
                          // @ts-ignore
                          getFeaturedRaffleData?.spotlightRaffle?.type.map(
                            (type: string, index: number) => (
                              <div className={`${s.raffleTag}`} key={type}>
                                {type}
                              </div>
                            )
                          )
                        }
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {getSponsorRaffleError ||
      getSponsorRaffleData?.getSponsorRaffles.length <=
        0 ? null : getSponsorRaffleLoading ? (
        <SpinLoading />
      ) : (
        getSponsorRaffleData?.getSponsorRaffles && (
          <section className={s.sectionRafflesSponsor}>
            <div className="lucis-container-2">
              <h2 className={s.sectionTitle}>Sponsor</h2>
              <div className={s.rafflesSponsorList}>
                {getSponsorRaffleData?.getSponsorRaffles.map(
                  (sponsor, index) => (
                    <div className={s.raffleSponsorItem} key={sponsor?.uid}>
                      <Image
                        src={sponsor?.img as string}
                        preview={false}
                        alt=""
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )
      )}
      <section className={s.sectionRaffles}>
        <div className="lucis-container-2">
          <div className={s.raffleTitleWrap}>
            <h2 className={s.sectionTitle}>Raffles</h2>
            <div className={s.raffleSearchBar}>
              <div className={s.raffleSearchOption}>
                <Radio.Group
                  value={searchOption}
                  onChange={onChangeSearchOption}
                >
                  <Radio value={"ENABLED"}>Ongoing</Radio>
                  <Radio value={"CLOSED"}>Closed</Radio>
                </Radio.Group>
              </div>
              <div className={s.raffleSearch}>
                <Input
                  placeholder="Name of raffle"
                  onChange={handleRafflesSearch}
                />
                <Image
                  src="/assets/P2E/raffles/iconSearch.svg"
                  preview={false}
                  alt=""
                />
              </div>
            </div>
          </div>
          {searchRafflesLoading ? (
            <SpinLoading />
          ) : rafflesData.length <= 0 || searchRafflesError ? (
            <Empty />
          ) : (
            <div className={s.rafflesList}>
              {rafflesData.length > 0 &&
                rafflesData.map((raffle, index) => (
                  <Link
                    href={`/playcore/raffles/${raffle?.uid}`}
                    passHref
                    key={raffle?.uid}
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
                                  <div className={s.raffleTag} key={type}>
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
                                    raffle?.prize_category?.currency?.icon ?? ""
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
        </div>
      </section>
    </div>
  );
};
export default Raffles;
