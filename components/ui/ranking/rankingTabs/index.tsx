import {useEffect, useState} from "react";

import {Table} from "antd";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';

import s from "./RankingTabs.module.sass"
import {useArenaRanking, usePlaycoreRanking, useRaffleRanking} from "../../../../hooks/ranking/useRanking";
import {currentMonth as defaultCurrentMonth, currentYear as defaultCurrentYear} from "../banner";
import {AcceptedMonths} from "../../../../hooks/ranking/useTopRanking";
import {UserRanking} from "../../../../src/generated/graphql_p2e";
import Link from "next/link"

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

const columns = [
  {
    title: 'No',
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
            {rank < 3 && (
              <span className={s.rankNameText}>TOP </span>
            )}
            {rank}
          </div>
        </div>
      )
    }
  },
  {
    title: 'Name',
    dataIndex: ['profile', 'rank', 'total_earning'],
    className: s.columnName,
    render: (text: string, data: UserRanking) => {
      const profile = data?.profile
      const rank = data?.rank
      const totalEarning = data?.total_earning
      const userRank = rank === 1 ? 'top1' : rank === 2 ? 'top2' : ''

      return (
        <div className={s.userWrap}>
          <div className={`${s.userAvatar} ${userRank}`}>
            <Link href={`/profile/${profile?.user_name}`} passHref>
              <a target="_blank">
                <img src={profile?.avatar ? profile?.avatar : '/assets/MyProfile/default_avatar.png'} alt="" onError={(e) => {
                  e.currentTarget.src = '/assets/MyProfile/default_avatar.png'
                }} />
              </a>
            </Link>
          </div>
          <div className={`${s.userName} ${userRank}`}>
            <Link href={`/profile/${profile?.user_name}`} passHref>
              <a target="_blank">{profile?.display_name}</a>
            </Link>
          </div>
          {totalEarning && (
            <div className={s.userValue}>{totalEarning} NFTs</div>
          )}
        </div>
      )
    }
  },
  {
    title: 'Your Reward',
    dataIndex: 'reward',
    className: s.columnReward,
    render: () => {
      return (
        <div className={s.userReward}>
          <div className={s.rewardPoint}>
            9000 <img src="/assets/P2E/lucis-point.svg" alt=""/>
          </div>
          <div className={s.rewardToken}>
            9000 <img src="/assets/P2E/lucis-token.svg" alt=""/>
          </div>
        </div>
      )
    }
  },
];

const data: any[] = [];

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    rank: i,
    name: `Mèo Đi Here`,
    reward: `Reward no. ${i}`,
  });
}

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
      <img src={direction === 'prev' ? '/assets/Ranking/sliderNavLeft.svg' : '/assets/Ranking/sliderNavRight.svg'} alt="" />
    </button>
  )
}

type RankingTabsProps = {
  seasonId: string
}

const RankingTabs = ({seasonId}: RankingTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('playcore')
  const [currentMonth, setCurrentMonth] = useState<AcceptedMonths>(defaultCurrentMonth)
  const [currentYear, setCurrentYear] = useState<number>(defaultCurrentYear)
  const [rankingData, setRankingData] = useState<UserRanking[]>([])

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

  const playcoreRanking = dataPlaycoreRanking?.getPlaycoreRanking
  const arenaRanking = dataArenaRanking?.getTournamentRanking
  const rafflesRanking = dataRaffleRanking?.getRaffleRanking

  useEffect(() => {
    if (playcoreRanking) {
      setRankingData(playcoreRanking)
    } else {
      setRankingData([])
    }
  }, [dataPlaycoreRanking?.getPlaycoreRanking])

  useEffect(() => {
    if (arenaRanking) {
      setRankingData(arenaRanking)
    } else {
      setRankingData([])
    }
  }, [dataArenaRanking?.getTournamentRanking])

  useEffect(() => {
    if (rafflesRanking) {
      setRankingData(rafflesRanking)
    } else {
      setRankingData([])
    }
  }, [dataRaffleRanking?.getRaffleRanking])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <section className={s.sectionRanking}>
      <div className={s.rankingTabsNavWrapper}>
        <div className="lucis-container-2">
          <div className={s.rankingTabsNav}>
            {tabs.map(tab => (
              <button key={tab.key} className={`${s.rankingTabsItem} ${activeTab === tab.key ? 'active' : ''}`} onClick={() => handleTabChange(tab.key)}>{tab.name}</button>
            ))}
          </div>
          {/*<div className={s.rankingTabsFilter}>*/}
          {/*  <div className={s.filterItems}>*/}
          {/*    <button className={`active`}>Total NFTS</button>*/}
          {/*    <button>Total Quality NFTS</button>*/}
          {/*  </div>*/}
          {/*  <div className={s.filterDateTime}>*/}
          {/*    <div className={s.seasonCountdown}><span className={s.endText}>End Season In</span> <span className={s.countdownText}>12 Days 00:09:54</span></div>*/}
          {/*    <div className={s.season}>SEASON I/2022</div>*/}
          {/*  </div>*/}
          {/*</div>*/}
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
              <Table columns={columns} dataSource={rankingData} pagination={false} loading={getPlaycoreRankingLoading || getArenaRankingLoading || getRaffleRankingLoading} />
            </div>
          </SwiperSlide>
          <div className={`${s.rankingSwiperNavWrap}`}>
            <SwiperNav direction="prev" />
            <SwiperNav direction="next" />
          </div>
        </Swiper>
      </div>
    </section>
  )
}

export default RankingTabs