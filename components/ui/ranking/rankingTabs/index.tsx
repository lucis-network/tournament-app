import {useEffect, useState} from "react";

import {Dropdown, Menu, Space, Table} from "antd";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';

import s from "./RankingTabs.module.sass"
import {
  useArenaRanking,
  usePlaycoreRanking,
  useRaffleRanking, useUserArenaRanking,
  useUserPlaycoreRanking, useUserRaffleRanking
} from "../../../../hooks/ranking/useRanking";
import {currentMonth as defaultCurrentMonth, currentYear as defaultCurrentYear} from "../banner";
import {AcceptedMonths} from "../../../../hooks/ranking/useTopRanking";
import {UserRanking} from "../../../../src/generated/graphql_p2e";
import Link from "next/link"
import AuthStore from "../../../Auth/AuthStore";

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
    title: 'Rank',
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
    dataIndex: ['profile', 'rank'],
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
          {/*<div className={s.userValue}>{totalEarning} NFTs</div>*/}
        </div>
      )
    }
  },
  {
    title: 'Reward',
    dataIndex: 'reward',
    className: s.columnReward,
    render: (totalEarning: number) => {
      return (
        <div className={s.userReward}>
          <div className={s.rewardPoint}>
            9000 <img src="/assets/P2E/lucis-point.svg" alt=""/>
          </div>
          {/*<div className={s.rewardToken}>*/}
          {/*  9000 <img src="/assets/P2E/lucis-token.svg" alt=""/>*/}
          {/*</div>*/}
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
  const [yourRankData, setYourRankData] = useState<UserRanking[]>([])

  const userId = AuthStore.id
  console.log('[RankingTabs] userId: ', userId);
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
  const {getUserPlaycoreRankingError, getUserPlaycoreRankingLoading, dataUserPlaycoreRanking} = useUserPlaycoreRanking({
    userId: userId,
    seasonId: seasonId,
    skip: (activeTab !== 'playcore') || !seasonId || !userId
  })
  const {getUserArenaRankingError, getUserArenaRankingLoading, dataUserArenaRanking} = useUserArenaRanking({
    userId: userId,
    seasonId: seasonId,
    skip: (activeTab !== 'arena') || !seasonId || !userId
  })
  const {getUserRaffleRankingError, getUserRaffleRankingLoading, dataUserRaffleRanking} = useUserRaffleRanking({
    userId: userId,
    seasonId: seasonId,
    skip: (activeTab !== 'raffles') || !seasonId || !userId
  })

  const playcoreRanking = dataPlaycoreRanking?.getPlaycoreRanking
  const arenaRanking = dataArenaRanking?.getTournamentRanking
  const rafflesRanking = dataRaffleRanking?.getRaffleRanking
  const userPlaycoreRanking = dataUserPlaycoreRanking?.getUserPlaycoreRanking
  const userArenaRanking = dataUserArenaRanking?.getUserTournamentRanking
  const userRafflesRanking = dataUserRaffleRanking?.getUserRaffleRanking

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

  useEffect(() => {
    if (userRafflesRanking) {
      setYourRankData([{...userRafflesRanking}])
    } else {
      setYourRankData([])
    }
  }, [dataUserRaffleRanking?.getUserRaffleRanking])

  useEffect(() => {
    if (userArenaRanking) {
      setYourRankData([{...userArenaRanking}])
    } else {
      setYourRankData([])
    }
  }, [dataUserArenaRanking?.getUserTournamentRanking])

  useEffect(() => {
    if (userPlaycoreRanking) {
      setYourRankData([{...userPlaycoreRanking}])
    } else {
      setYourRankData([])
    }
  }, [dataUserPlaycoreRanking?.getUserPlaycoreRanking])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleSeasonSelect = () => {

  }

  const seasonMenu = (
    <Menu
      items={[
        {
          label: (
            <div className={s.seasonsByYear}>
              <div className={s.seasonsByYearTitle}>
                <div>SEASON 2022</div>
                <img src="/assets/Ranking/caretDown.svg" alt=""/>
              </div>
              <ul className={s.seasonsList}>
                <li>
                  <div className={s.seasonTitle}>SEASON IV/2022</div>
                  <p className={s.seasonDesc}>Jan, 1st 2022 - Apr, 28th 2022</p>
                </li>
                <li>
                  <div className={s.seasonTitle}>SEASON IV/2022</div>
                  <p className={s.seasonDesc}>Jan, 1st 2022 - Apr, 28th 2022</p>
                </li>
                <li>
                  <div className={s.seasonTitle}>SEASON IV/2022</div>
                  <p className={s.seasonDesc}>Jan, 1st 2022 - Apr, 28th 2022</p>
                </li>
              </ul>
            </div>
          ),
          key: '0',
        },
        {
          label: (
            <div className={s.seasonsByYear}>
              <div className={s.seasonsByYearTitle}>
                <div>SEASON 2022</div>
                <img src="/assets/Ranking/caretDown.svg" alt=""/>
              </div>
              <ul className={s.seasonsList}>
                <li>
                  <div className={s.seasonTitle}>SEASON IV/2022</div>
                  <p className={s.seasonDesc}>Jan, 1st 2022 - Apr, 28th 2022</p>
                </li>
                <li>
                  <div className={s.seasonTitle}>SEASON IV/2022</div>
                  <p className={s.seasonDesc}>Jan, 1st 2022 - Apr, 28th 2022</p>
                </li>
                <li>
                  <div className={s.seasonTitle}>SEASON IV/2022</div>
                  <p className={s.seasonDesc}>Jan, 1st 2022 - Apr, 28th 2022</p>
                </li>
              </ul>
            </div>
          ),
          key: '1',
        },
      ]}
    />
  );

  return (
    <section className={s.sectionRanking}>
      <div className={s.rankingTabsNavWrapper}>
        <div className="lucis-container-2">
          <div className={s.rankingTabsNav}>
            {tabs.map(tab => (
              <button key={tab.key} className={`${s.rankingTabsItem} ${activeTab === tab.key ? 'active' : ''}`} onClick={() => handleTabChange(tab.key)}>{tab.name}</button>
            ))}
          </div>
          <div className={s.rankingTabsFilter}>
            <div className={s.filterItems}>
              <button className={`active`}>Total NFTS</button>
              <button>Total Quality NFTS</button>
            </div>
            <div className={s.filterDateTime}>
              <div className={s.seasonCountdown}><span className={s.endText}>End Season In</span> <span className={s.countdownText}>12 Days 00:09:54</span></div>
              <Dropdown overlay={seasonMenu} trigger={['click']} overlayClassName={s.seasonSelect}>
                <button className={s.seasonSelectTrigger}>
                  <span>SEASON IV/2022</span>
                  <img src="/assets/Ranking/caretDown.svg" alt=""/>
                </button>
              </Dropdown>
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
              <Table className={s.rankingTable} columns={columns} dataSource={rankingData} pagination={false} loading={getPlaycoreRankingLoading || getArenaRankingLoading || getRaffleRankingLoading} />
            </div>
          </SwiperSlide>
          <div className={`${s.rankingSwiperNavWrap}`}>
            <SwiperNav direction="prev" />
            <SwiperNav direction="next" />
          </div>
        </Swiper>
      </div>
      {AuthStore?.isLoggedIn && (
        <div className={s.yourRankWrapper}>
          <div className={s.rankingTableResponsive}>
            <Table columns={columns} dataSource={yourRankData} pagination={false} loading={getUserRaffleRankingLoading || getUserArenaRankingLoading || getUserPlaycoreRankingLoading} />
          </div>
        </div>
      )}
    </section>
  )
}

export default RankingTabs