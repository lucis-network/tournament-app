import {useState} from "react";
import s from "./RankingTabs.module.sass"
import {Table} from "antd";
import { Swiper, SwiperSlide } from 'swiper/react';

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

const RankingTabs = () => {
  const [activeTab, setActiveTab] = useState(1)
  const handleTabChange = (tab: number) => {
    setActiveTab(tab)
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'rank',
      className: s.columnNo,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      className: s.columnName,
    },
    {
      title: 'Your Reward',
      dataIndex: 'reward',
      className: s.columnReward,
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      rank: i,
      name: `Edward King ${i}`,
      reward: `Reward no. ${i}`,
    });
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
          spaceBetween={10}
          allowTouchMove={false}
        >
          <SwiperSlide>
            <div className="">
              <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 240 }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 240 }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 240 }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 240 }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 240 }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 240 }} />
            </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </section>

  )
}

export default RankingTabs