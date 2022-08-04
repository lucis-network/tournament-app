import {useEffect, useState} from "react";

import {Dropdown, Menu, Table} from "antd";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';

import s from "./RankingTabs.module.sass"
import {
  RankingTabsKey,
  useRanking,
  useUserArenaRanking,
  useUserPlaycoreRanking,
  useUserRaffleRanking,
} from "../../../../hooks/ranking/useRanking";
import {RankingSeasonDto, StatusSeason, UserRanking} from "../../../../src/generated/graphql_p2e";
import Link from "next/link"
import AuthStore from "../../../Auth/AuthStore";
import {groupBy} from "lodash";
import moment from "moment";

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

const tabFilters = []

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
  rankingSeasons: RankingSeasonDto[]
}

const RankingTabs = ({rankingSeasons}: RankingTabsProps) => {
  const [activeTab, setActiveTab] = useState<RankingTabsKey>('playcore')
  const [rankingData, setRankingData] = useState<any[]>([])
  const [yourRankData, setYourRankData] = useState<UserRanking[]>([])
  const [currentSeason, setCurrentSeason] = useState<RankingSeasonDto>()
  const [rankingLoading, setRankingLoading] = useState(false)
  const {getDataRanking} = useRanking()

  const userId = AuthStore.id

  const seasonId = rankingSeasons?.filter(season => season.status === StatusSeason.Active)[0].uid

  const fetchDataRanking = (seasonId: string) => {
    if (!seasonId) return
    setRankingLoading(true)
    getDataRanking({
      seasonId: seasonId,
      type: activeTab,
    })
      .then((result) => {
        setRankingData((prevState) => (
          [
            ...prevState,
            result[activeTab]
          ]
        ))
      })
      .finally(() => setRankingLoading(false))
  }

  console.log('[RankingTabs] rankingData: ', rankingData);
  useEffect(() => {
    setRankingData([])
    rankingSeasons && rankingSeasons?.map(season => {
      fetchDataRanking(season.uid)
    })
  }, [activeTab, rankingSeasons])

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

  const userPlaycoreRanking = dataUserPlaycoreRanking?.getUserPlaycoreRanking
  const userArenaRanking = dataUserArenaRanking?.getUserTournamentRanking
  const userRafflesRanking = dataUserRaffleRanking?.getUserRaffleRanking

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

  const handleTabChange = (tab: RankingTabsKey) => {
    setActiveTab(tab)
  }

  const handleSeasonSelect = () => {

  }

  const seasonsGroupByYear = groupBy(rankingSeasons, (n) => {
    return (new Date(n.toDate)).getFullYear()
  })

  const seasonMenu = (
    <Menu
      items={Object.entries(seasonsGroupByYear)?.map(season => {
        return {
          label: (
            <div className={s.seasonsByYear}>
              <div className={s.seasonsByYearTitle}>
                <div>SEASON {season[0]}</div>
                <img src="/assets/Ranking/caretDown.svg" alt=""/>
              </div>
              <ul className={s.seasonsList}>
                {season[1].map(item => {
                  const fromDate = moment(item.fromDate).format('MMM, Do YYYY')
                  const toDate = moment(item.toDate).format('MMM, Do YYYY')
                  return (
                    <li key={item.uid} onClick={() => setCurrentSeason(item)}>
                      <div className={s.seasonTitle}>{item.name}</div>
                      <p className={s.seasonDesc}>{fromDate} - {toDate}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          ),
          key: season[0],
        }
      })}
    />
  );

  return (
    <section className={s.sectionRanking}>
      <div className={s.rankingTabsNavWrapper}>
        <div className="lucis-container-2">
          <div className={s.rankingTabsNav}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`${s.rankingTabsItem} ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.key as RankingTabsKey)}
                disabled={rankingLoading}
              >
                {tab.name}
              </button>
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
                  <span>{currentSeason?.name}</span>
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
          {rankingData.map(data => (
            <SwiperSlide key={data.id}>
              <div className={s.rankingTableResponsive}>
                <Table className={s.rankingTable} columns={columns} dataSource={data} pagination={false} loading={rankingLoading} />
              </div>
            </SwiperSlide>
          ))}
          <div className={`${s.rankingSwiperNavWrap}`}>
            <SwiperNav direction="prev" />
            <SwiperNav direction="next" />
          </div>
        </Swiper>
      </div>
      {AuthStore?.isLoggedIn && (
        <div className={s.yourRankWrapper}>
          <h3 className={s.yourRankTitle}>Your Rank</h3>
          <div className={s.rankingTableResponsive}>
            <Table columns={columns} dataSource={yourRankData} pagination={false} loading={getUserRaffleRankingLoading || getUserArenaRankingLoading || getUserPlaycoreRankingLoading} />
          </div>
        </div>
      )}
    </section>
  )
}

export default RankingTabs