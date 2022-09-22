import React, {useEffect, useState} from "react";

import {Table} from "antd";
import {Swiper, SwiperSlide} from 'swiper/react';
import {useSwiper} from 'swiper/react';

import s from "./RankingTabs.module.sass"
import {
  GET_USER_RANK_PLAYCORE, GET_USER_RANK_RAFFLE, GET_USER_RANK_TOURNAMENT,
  useArenaRanking,
  usePlaycoreRanking,
  useRaffleRanking
} from "../../../../hooks/ranking/useRanking";
import {currentMonth as defaultCurrentMonth, currentYear as defaultCurrentYear} from "../banner";
import {AcceptedMonths} from "../../../../hooks/ranking/useTopRanking";
import {RankingSeasonDto, UserRanking} from "../../../../src/generated/graphql_p2e";
import Link from "next/link"
import {SelectSeason} from "../SelectSeason";
import CountdownTimer from "../../common/CountDown";
import {useQuery} from "@apollo/client";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../Auth/AuthStore";
import {fomatNumber, format} from "../../../../utils/Number";
import ButtonWrapper from "../../../common/button/Button";
import {useRouter} from "next/router";

const tabs = [
  // {
  //   key: 'nfts',
  //   name: 'Nfts',
  // },
  {
    key: 'arena',
    name: 'Arena',
  },
  {
    key: 'playcore',
    name: 'Playcore',
  },
  {
    key: 'raffles',
    name: 'Raffles',
  },
  // {
  //   key: 'scholarship',
  //   name: 'Scholarship',
  //   tabIndex: 5,
  // },
]


type SwiperNavProps = {
  direction: 'prev' | 'next',
}

const SwiperNav = ({direction}: SwiperNavProps) => {
  const swiper = useSwiper()

  const navigate = () => {
    direction === 'prev' ? swiper.slidePrev() : swiper.slideNext()
  }

  return (
    <button onClick={navigate} className={`${s.sliderNav} ${direction}`}>
      <img src={direction === 'prev' ? '/assets/Ranking/sliderNavLeft.svg' : '/assets/Ranking/sliderNavRight.svg'}
           alt=""/>
    </button>
  )
}

type RankingTabsProps = {
  seasonId: string,
  seasonList: RankingSeasonDto[];
  setSeasonId: (seasonId: string) => void;
  activeSeasonId: string;
  endIn: number;
}

const BlankState = ({redirectUrl}: any) => {
  const router = useRouter();
  return (
    <>
      <ButtonWrapper onClick={() => router.push(redirectUrl)}>Join now</ButtonWrapper>
      <div className={s.blankStateDescription}>
        For high rank and big prizes on Lucis Network.
      </div>
    </>
  );
}

const RankingTabs = ({seasonId, seasonList, setSeasonId, activeSeasonId, endIn}: RankingTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('playcore')
  const [currentMonth, setCurrentMonth] = useState<AcceptedMonths>(defaultCurrentMonth)
  const [currentYear, setCurrentYear] = useState<number>(defaultCurrentYear)
  const [rankingData, setRankingData] = useState<{ [activeTab: string]: UserRanking[] }>({})
  const [userRank, setUserRank] = useState<UserRanking | null>(null);
  const {id} = AuthStore;
  const {getPlaycoreRankingError, getPlaycoreRankingLoading, dataPlaycoreRanking} = usePlaycoreRanking({
    seasonId: seasonId,
    skip: (activeTab !== 'playcore') || !seasonId
  })
  const {getArenaRankingError, getArenaRankingLoading, dataArenaRanking} = useArenaRanking({
    seasonId: seasonId,
    skip: (activeTab !== 'arena') || !seasonId
  })
  const {getRaffleRankingError, getRaffleRankingLoading, dataRaffleRanking} = useRaffleRanking({
    seasonId: seasonId,
    skip: (activeTab !== 'raffles') || !seasonId
  })

  const userRankPlaycore = useQuery(GET_USER_RANK_PLAYCORE, {
    variables: {
      user_id: Number(id),
      seasonId: seasonId,
    },
    skip: (activeTab !== 'playcore') || !seasonId || !id,
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  const userRankTournament = useQuery(GET_USER_RANK_TOURNAMENT, {
    variables: {
      user_id: Number(id),
      seasonId: seasonId,
    },
    skip: (activeTab !== 'arena') || !seasonId || !id,
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  const userRankRaffle = useQuery(GET_USER_RANK_RAFFLE, {
    variables: {
      user_id: Number(id),
      seasonId: seasonId,
    },
    skip: (activeTab !== 'raffles') || !seasonId || !id,
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  const playcoreRanking = dataPlaycoreRanking?.getPlaycoreRanking
  const arenaRanking = dataArenaRanking?.getTournamentRanking
  const rafflesRanking = dataRaffleRanking?.getRaffleRanking

  useEffect(() => {
    if (playcoreRanking && activeTab === "playcore") {
      setRankingData({"playcore": playcoreRanking})
    } else if (arenaRanking && activeTab === "arena") {
      setRankingData({"arena": arenaRanking})
    } else if (rafflesRanking && activeTab === "raffles") {
      setRankingData({"raffles": rafflesRanking})
    } else {
      setRankingData({})
    }
  }, [playcoreRanking, arenaRanking, rafflesRanking])

  // useEffect(() => {
  //   if (arenaRanking) {
  //     setRankingData(arenaRanking)
  //   } else {
  //     setRankingData([])
  //   }
  // }, [dataArenaRanking?.getTournamentRanking])
  //
  // useEffect(() => {
  //   if (rafflesRanking) {
  //     setRankingData(rafflesRanking)
  //   } else {
  //     setRankingData([])
  //   }
  // }, [dataRaffleRanking?.getRaffleRanking])

  useEffect(() => {
    setUserRank(userRankPlaycore.data?.getUserPlaycoreRanking)
  }, [userRankPlaycore.data?.getUserPlaycoreRanking])

  useEffect(() => {
    setUserRank(userRankTournament.data?.getUserTournamentRanking)
  }, [userRankTournament.data?.getUserTournamentRanking])

  useEffect(() => {
    setUserRank(userRankTournament.data?.getUserTournamentRanking)
  }, [userRankTournament.data?.getUserTournamentRanking])

  useEffect(() => {
    setUserRank(userRankRaffle.data?.getUserRaffleRanking)
  }, [userRankRaffle.data?.getUserRaffleRanking])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const columns = [
    {
      title: () => <div className={s.headerNo}>Rank</div>,
      dataIndex: 'rank',
      className: s.columnNo,
      render: (rank: number) => {
        return (
          <div className={s.userRank}>
            {rank < 3 && (
              <div className={s.userMedal}>
                <img src={rank === 1 ? '/assets/Ranking/medalGold.svg' : '/assets/Ranking/medalSilver.svg'} alt=""/>
              </div>
            )}
            <div className={`${s.userRankName} ${rank === 1 ? 'top1' : rank === 2 ? 'top2' : ''}`}>
              <div className={s.rankNumber}>
                {rank < 3 && (
                  <span className={s.rankNameText}>TOP </span>
                )}
                {rank}
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: () => <div className={s.headerName}>Name</div>,
      dataIndex: ['profile', 'rank', 'total_earning'],
      className: s.columnName,
      render: (text: string, data: UserRanking) => {
        const profile = data?.profile
        const rank = data?.rank
        const userRank = rank === 1 ? 'top1' : rank === 2 ? 'top2' : ''

        return (
          <div className={s.userWrap}>
            <div className={`${s.userAvatar} ${userRank}`}>
              <Link href={`/profile/${profile?.user_name}`} passHref>
                <a target="_blank">
                  <img src={profile?.avatar ? profile?.avatar : '/assets/MyProfile/default_avatar.png'} alt=""
                       onError={(e) => {
                         e.currentTarget.src = '/assets/MyProfile/default_avatar.png'
                       }}/>
                </a>
              </Link>
            </div>
            <div className={`${s.userName} ${userRank}`}>
              <Link href={`/profile/${profile?.user_name}`} passHref>
                <a target="_blank">{profile?.display_name}</a>
              </Link>
            </div>
          </div>
        )
      }
    },

    {
      title: () => <div className={s.headerEarning}>{activeTab === "arena" ? "Total earnings" : "Total rewards"}</div>,
      dataIndex: ['profile', 'rank', 'total_earning'],
      className: s.columnEarning,
      render: (text: string, data: UserRanking) => {
        const totalEarning = data?.total_earning!
        return (
          <div className={s.userWrap}>
            <div
              className={s.userValue}>{activeTab === "playcore" ? format(totalEarning) : format(totalEarning, 2)} {activeTab === "playcore" ? "points" : "$"}</div>
          </div>
        )
      }
    },
    {
      title: 'Reward',
      dataIndex: 'reward',
      className: s.columnReward,
      render: (text: string, data: UserRanking) => {
        return (
          <div className={s.userReward}>
            <div className={s.rewardPoint}>
              -- <img src="/assets/P2E/lucis-point.svg" alt=""/>
            </div>
            <div className={s.rewardToken}>
              -- <img src="/assets/P2E/lucis-token.svg" alt=""/>
            </div>
          </div>
        )
      }
    },
  ];

  return (
    <section className={s.sectionRanking}>
      <div className={s.rankingTabsNavWrapper}>
        <div className="lucis-container-2">
          <div className={s.rankingTabsNav}>
            {tabs.map(tab => (
              <button key={tab.key} className={`${s.rankingTabsItem} ${activeTab === tab.key ? 'active' : ''}`}
                      onClick={() => handleTabChange(tab.key)}>{tab.name}</button>
            ))}
          </div>
          <div className={s.rankingTabsFilter}>
            <div className={s.filterItems}>
              <button className={`active`}>Total Rewards</button>
              <button>Total Quality Rewards</button>
            </div>
            <div className={s.filterDateTime}>
              <div className={s.seasonCountdown}><span
                className={s.endText}>{endIn > Date.now() ? "End Season In" : "Season ended"}</span>
                {endIn > Date.now() && <span className={s.countdownText}>
                  <CountdownTimer targetDate={endIn}/>
                </span>
                }
              </div>
              <SelectSeason seasonList={seasonList} activeSeasonId={activeSeasonId} setSeasonId={setSeasonId}/>
            </div>
          </div>
        </div>
      </div>
      <div className={s.rankingTableWrapper}>
        <Swiper
          centeredSlides
          initialSlide={0}
          slidesPerView="auto"
          allowTouchMove={false}
          className={s.rankingSwiperWrapper}
          breakpoints={{
            320: {
              spaceBetween: 10
            },
            992: {
              spaceBetween: 0
            }
          }}
        >
          <SwiperSlide>
            <div className={s.rankingTableResponsive}>
              <Table
                columns={columns}
                dataSource={rankingData[activeTab]}
                locale={{
                  emptyText: <BlankState
                    redirectUrl={`/${activeTab === "playcore" ? "/" : (activeTab === "raffles" ? `/playcore/${activeTab}` : activeTab)}`}
                  />
                }}
                pagination={false}
                loading={getPlaycoreRankingLoading || getArenaRankingLoading || getRaffleRankingLoading}/>
            </div>
            {userRank && <div className={s.yourRank}>
              <div className={s.titleYourRank}>Your Rank</div>
              <Table
                showHeader={false}
                columns={columns}
                dataSource={[userRank]}
                pagination={false}/>
            </div>}
          </SwiperSlide>
          <div className={`${s.rankingSwiperNavWrap}`}>
            <SwiperNav direction="prev"/>
            <SwiperNav direction="next"/>
          </div>
        </Swiper>
      </div>
    </section>
  )
}

export default observer(RankingTabs);