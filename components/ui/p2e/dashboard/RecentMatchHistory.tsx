import React, { useEffect, useState } from 'react'
import s from './dashboard.module.sass'
import { Col, Row } from "antd"
import {

  GET_RECENT_MATCHES_BY_DAYS,
  GET_STATISTICS,
  useGetRecentMatches
} from "../../../../hooks/p2e/useP2E";

import { useQuery } from "@apollo/client";
import { GMatch, GPlayerMatch, PlayerMatch } from "../../../../src/generated/graphql_p2e";
import { RecentMatchList } from '../RecentMatchList';
import { useRouter } from 'next/router';
import SidebarRight from '../missionComponent/SidebarRight';

const RecentMatchHistory = () => {
  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  });

  const historyQuery = useQuery(GET_RECENT_MATCHES_BY_DAYS, {
    context: {
      endpoint: 'p2e'
    },
    variables: {
      game_uid: '03',
      platform_id: 1,
      number_of_day: 3
    }
  });

  const router = useRouter();

  // const [updateRecentlyMatch] = useMutation(UPDATE_RECENTLY_MATCH, {
  //   variables: {
  //     game_uid: '03',
  //     platform_id: 1
  //   },
  //   context: {
  //     endpoint: 'p2e'
  //   }
  // })


  // if (getDailyMissionLoading || isEmpty(getDailyMissionData)) return null

  // const handleUpdateMissions = async (popup = true) => {
  //   const promise = await Promise.all([
  //     updateRecentlyMatch(),
  //     statisticQuery.refetch()
  //   ])
  //   setRecentlyMatches([...promise[0].data.updateRecentlyMatch, ...recentlyMatches]);
  //   if (popup) {
  //     message.success("update successfully!");
  //   }
  // }

  const lucisPointRewardToday = (matches: GPlayerMatch[]): number => {
    let total = 0;
    matches?.forEach((match) => {
      total += match.lucis_point;
    })
    return total
  }

  const isSameDay = (d1: Date, d2: Date) => {
    d1 = new Date(d1);
    d2 = new Date(d2);
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth();
  }
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(new Date().getDate() - 1);
  const beforeYesterday = new Date();
  beforeYesterday.setDate(new Date().getDate() - 2);
  const historyToday = historyQuery?.data?.getPreviousMatch?.filter((item: PlayerMatch) => isSameDay(today, item?.match?.end_at));
  const historyYesterday = historyQuery?.data?.getPreviousMatch?.filter((item: PlayerMatch) => isSameDay(yesterday, item?.match?.end_at));
  const historyBeforeYesterday = historyQuery?.data?.getPreviousMatch?.filter((item: PlayerMatch) => isSameDay(beforeYesterday, item?.match?.end_at));
  return (
    <div className="lucis-container-2">
      <div className={s.dailyContainer}>
        <SidebarRight onlyWallet balance={statisticQuery?.data?.getBalance} />
        <Row gutter={40}>
          <Col xl={16} md={24}>
            <Row className={s.recentMatchTitle} style={{ marginTop: 0 }}>
              <Col xs={24} sm={12}>
                <h2>
                  <img style={{ marginRight: 16, cursor: "pointer" }} src="/assets/P2E/back-icon.svg" alt="" onClick={() => router.back()} />

                  Recent matches
                </h2>
              </Col>
              <Col xs={24} sm={12} className={s.recentMatchRewardGeneral}>
                <div style={{ marginRight: 16 }}>
                  Today :
                </div>
                <div className={s.rewardItem} style={{ marginRight: 8 }}>
                  <span className={s.lucisPoint}>{lucisPointRewardToday(historyToday)} / --</span>
                  <img src="/assets/P2E/lucis-point.svg" alt="" />
                </div>
                <div className={s.rewardItem}>
                  <span>-- / 300</span>
                  <img src="/assets/P2E/lucis-token.svg" alt="" />
                </div>
              </Col>
            </Row>
            <RecentMatchList isHistory recentMatches={historyToday} loading={historyQuery.loading} />
            <Row className={s.recentMatchTitle}>
              <Col xs={24} className={s.recentMatchRewardGeneral}>
                <div style={{ marginRight: 16 }}>
                  {yesterday.toLocaleDateString()} :
                </div>
                <div className={s.rewardItem} style={{ marginRight: 8 }}>
                  <span className={s.lucisPoint}>{lucisPointRewardToday(historyYesterday)} / --</span>
                  <img src="/assets/P2E/lucis-point.svg" alt="" />
                </div>
                <div className={s.rewardItem}>
                  <span>-- / 300</span>
                  <img src="/assets/P2E/lucis-token.svg" alt="" />
                </div>
              </Col>
            </Row>
            <RecentMatchList isHistory recentMatches={historyYesterday} loading={historyQuery.loading} />
            <Row className={s.recentMatchTitle}>
              <Col xs={24} className={s.recentMatchRewardGeneral}>
                <div style={{ marginRight: 16 }}>
                  {beforeYesterday.toLocaleDateString()} :
                </div>
                <div className={s.rewardItem} style={{ marginRight: 8 }}>
                  <span className={s.lucisPoint}>{lucisPointRewardToday(historyBeforeYesterday)} / --</span>
                  <img src="/assets/P2E/lucis-point.svg" alt="" />
                </div>
                <div className={s.rewardItem}>
                  <span>-- / 300</span>
                  <img src="/assets/P2E/lucis-token.svg" alt="" />
                </div>
              </Col>
            </Row>
            <RecentMatchList isHistory recentMatches={historyBeforeYesterday} loading={historyQuery.loading} />
          </Col>
          <Col xl={8} md={24}>
            <SidebarRight balance={statisticQuery?.data?.getBalance} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default RecentMatchHistory