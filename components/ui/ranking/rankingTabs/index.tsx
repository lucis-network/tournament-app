import {ReactElement, useState} from "react";

import {Table} from "antd";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';

import s from "./RankingTabs.module.sass"

const tabs = [
  {
    key: 'raffles',
    name: 'Raffles',
    tabIndex: 1,
  },
  {
    key: 'arena',
    name: 'Arena',
    tabIndex: 2,
  },
  {
    key: 'nfts',
    name: 'Nfts',
    tabIndex: 3,
  },
  {
    key: 'playcore',
    name: 'Playcore',
    tabIndex: 4,
  },
  {
    key: 'scholarship',
    name: 'Scholarship',
    tabIndex: 5,
  },
]

const columns = [
  {
    title: 'No',
    dataIndex: 'rank',
    className: s.columnNo,
    render: () => {
      return (
        <div className={s.userRank}>
          <div className={s.userMedal}>
            <img src="/assets/Ranking/medalGold.svg" alt=""/>
          </div>
          <div className={s.userRankName}>
            <span className={s.rankNameText}>TOP</span> 1
          </div>
        </div>
      )
    }
  },
  {
    title: 'Name',
    dataIndex: 'name',
    className: s.columnName,
    render: (name: string) => {
      return (
        <div className={s.userWrap}>
          <div className={`${s.userAvatar} top1`}>
            <img src="/assets/Ranking/tempAvatar.jpg" alt=""/>
          </div>
          <div className={`${s.userName} top1`}>{name}</div>
          <div className={s.userValue}>63 NFTs</div>
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

const RankingTabs = () => {
  const [activeTab, setActiveTab] = useState(1)
  const handleTabChange = (tab: number) => {
    setActiveTab(tab)
  }

  return (
    <section className={s.sectionRanking}>
      <div className={s.rankingTabsNavWrapper}>
        <div className="lucis-container-2">
          <div className={s.rankingTabsNav}>
            {tabs.map(tab => (
              <button key={tab.key} className={`${s.rankingTabsItem} ${activeTab === tab.tabIndex ? 'active' : ''}`} onClick={() => handleTabChange(tab.tabIndex)}>{tab.name}</button>
            ))}
          </div>
          <div className={s.rankingTabsFilter}>
            <div className={s.filterItems}>
              <button className={`active`}>Total NFTS</button>
              <button>Total Quality NFTS</button>
            </div>
            <div className={s.filterDateTime}>
              <div className={s.seasonCountdown}><span className={s.endText}>End Season In</span> <span className={s.countdownText}>12 Days 00:09:54</span></div>
              <div className={s.season}>SEASON I/2022</div>
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
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={s.rankingTableResponsive}>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={s.rankingTableResponsive}>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={s.rankingTableResponsive}>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={s.rankingTableResponsive}>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={s.rankingTableResponsive}>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={s.rankingTableResponsive}>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={s.rankingTableResponsive}>
              <Table columns={columns} dataSource={data} pagination={false} />
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