import React, { useEffect, useState } from 'react'
import s from './dashboard.module.sass'
import { Col, message, Row } from "antd"
import {
  CLAIM_BOX,
  GET_OR_SET_DAILY_MISSION,
  GET_STATISTICS,
  UPDATE_DAILY_MISSION,
  UPDATE_RECENTLY_MATCH,
  useGetRecentMatches
} from "../../../../hooks/p2e/useP2E";

import { useMutation, useQuery } from "@apollo/client";
import { GMatch, GPlayerMatch, PlayerMission } from "../../../../src/generated/graphql_p2e";
import { RecentMatchList } from '../RecentMatchList';
import ButtonWrapper from 'components/common/button/Button';
import { useRouter } from 'next/router';
import SidebarRight from '../missionComponent/SidebarRight';

const RecentMatchHistory = () => {
  const [recentlyMatches, setRecentlyMatches] = useState<GPlayerMatch[]>([])

  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
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

  const { getRecentMatchesLoading, getRecentMatchesData } = useGetRecentMatches({
    game_uid: '03',
    offset: 1,
    limit: 5,
    platform_id: 1
  })

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

  useEffect(() => {
    setRecentlyMatches(getRecentMatchesData?.getRecentlyMatch?.matches as GPlayerMatch[]);
  }, [getRecentMatchesData])

  const lucisPointRewardToday = (missions: GMatch): number => {
    const matchesToday = missions?.matches?.filter(item => {
      const now = new Date();
      const endMatch = new Date(item.match.end_at);
      return now.getDate() === endMatch.getDate()
        && now.getFullYear() === endMatch.getFullYear()
        && now.getMonth() === endMatch.getMonth()
    })

    let total = 0;

    matchesToday?.forEach((match) => {
      total += match.lucis_point;
    })
    return total
  }


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
                  Today:
                </div>
                <div className={s.rewardItem} style={{ marginRight: 8 }}>
                  <span className={s.lucisPoint}>{lucisPointRewardToday(getRecentMatchesData?.getRecentlyMatch)} / --</span>
                  <img src="/assets/P2E/lucis-point.svg" alt="" />
                </div>
                <div className={s.rewardItem}>
                  <span>-- / 300</span>
                  <img src="/assets/P2E/lucis-token.svg" alt="" />
                </div>
              </Col>
            </Row>
            <RecentMatchList recentMatches={recentlyMatches} loading={getRecentMatchesLoading} />
            <Row className={s.recentMatchTitle}>
              <Col xs={24} className={s.recentMatchRewardGeneral}>
                <div style={{ marginRight: 16 }}>
                  Last day:
                </div>
                <div className={s.rewardItem} style={{ marginRight: 8 }}>
                  <span className={s.lucisPoint}>{lucisPointRewardToday(getRecentMatchesData?.getRecentlyMatch)} / --</span>
                  <img src="/assets/P2E/lucis-point.svg" alt="" />
                </div>
                <div className={s.rewardItem}>
                  <span>-- / 300</span>
                  <img src="/assets/P2E/lucis-token.svg" alt="" />
                </div>
              </Col>
            </Row>
            <RecentMatchList recentMatches={recentlyMatches} loading={getRecentMatchesLoading} />
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