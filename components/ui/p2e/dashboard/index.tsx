import React, { useEffect, useState } from 'react'
import s from './dashboard.module.sass'
import { Col, message, Row } from "antd"
import { GET_OR_SET_DAILY_MISSION, GET_STATISTICS, UPDATE_DAILY_MISSION, UPDATE_RECENTLY_MATCH, useGetRecentMatches } from "../../../../hooks/p2e/useP2E";

import { useMutation, useQuery } from "@apollo/client";
import MissionsList from "../MissionsList";
import { GMatch, GPlayerMatch, PlayerMission } from "../../../../src/generated/graphql_p2e";
import { RecentMatchList } from '../RecentMatchList';
import ButtonWrapper from 'components/common/button/Button';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [dailyMission, setDailyMission] = useState<PlayerMission[]>([])
  const [recentlyMatches, setRecentlyMatches] = useState<GPlayerMatch[]>([])
  const [getDailyMission, stateDailyMissionFetch] = useMutation(GET_OR_SET_DAILY_MISSION, {
    variables: {
      game_uid: '03',
      platform_id: 1
    },
    context: {
      endpoint: 'p2e'
    }
  })

  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  });

  const [updateDailyMission] = useMutation(UPDATE_DAILY_MISSION, {
    variables: {
      game_uid: '03',
      platform_id: 1
    },
    context: {
      endpoint: 'p2e'
    }
  })

  const [updateRecentlyMatch] = useMutation(UPDATE_RECENTLY_MATCH, {
    variables: {
      game_uid: '03',
      platform_id: 1
    },
    context: {
      endpoint: 'p2e'
    }
  })

  const { getRecentMatchesLoading, getRecentMatchesData } = useGetRecentMatches({
    game_uid: '03',
    offset: 1,
    limit: 5,
    platform_id: 1
  })

  // if (getDailyMissionLoading || isEmpty(getDailyMissionData)) return null

  const handleUpdateMissions = async (popup = true) => {
    setLoading(true);

    const promise = await Promise.all([
      updateDailyMission(),
      updateRecentlyMatch(),
      statisticQuery.refetch()
    ])
    setDailyMission(promise[0].data.updateDailyMission)
    setRecentlyMatches([...promise[1].data.updateRecentlyMatch, ...recentlyMatches]);
    setLoading(false);
    if (popup) {

      message.success("update successfully!");
    }
  }

  useEffect(() => {
    getDailyMission()
      .then(response => {
        setDailyMission(response.data.getOrSetDailyMission)
      });
  }, [])

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
        <Row gutter={40}>
          <Col span={16}>
            <div className={s.dailyTitle}>
              <h2>
                Daily Mission
              </h2>
            </div>
            <MissionsList
              title="Daily missions"
              missions={dailyMission}
              handleUpdateMissions={handleUpdateMissions}
              loading={stateDailyMissionFetch.loading}
              loadingUpdate={loading} />
            <div className={s.recentMatchTitle}>
              <h2>
                Recent matches
              </h2>
              <div className={s.recentMatchRewardGeneral}>
                <div style={{ marginRight: 16 }}>
                  Today:
                </div>
                <div className={s.rewardItem} style={{ marginRight: 8 }}>
                  <span className={s.lucisPoint}>{lucisPointRewardToday(getRecentMatchesData?.getRecentlyMatch)} / 300</span>
                  <img src="/assets/P2E/lucis-point.svg" alt="" />
                </div>
                <div className={s.rewardItem}>
                  <span>-- / 300</span>
                  <img src="/assets/P2E/lucis-token.svg" alt="" />
                </div>
              </div>
            </div>
            <RecentMatchList recentMatches={recentlyMatches} loading={getRecentMatchesLoading} />
            <div className={s.viewAllHistory}>
              <img src="/assets/P2E/arrow-left.png" alt="" />
              <span>View all history</span>
              <img src="/assets/P2E/arrow-right.png" alt="" />
            </div>
          </Col>
          <Col span={8}>
            <div className={s.sidebarRight}>
              <Row>
                <Col span={24}>
                  <div className={s.walletTitle}>
                    <h2>
                      Lucis Wallet
                    </h2>
                  </div>
                  <div className={s.wallet}>
                    <Row gutter={32}>
                      <Col span={12}>
                        <div className={s.lucisPointWallet}>
                          LUCIS Point
                          <img src="/assets/P2E/lucis-point.svg" alt="" width="24" height="24" />
                          {statisticQuery?.data?.getBalance?.lucis_point}
                        </div>
                      </Col>
                      <Col span={12}>
                        <div >
                          <div className={s.BUSDWallet}>
                            Lucis Token
                            <img src="/assets/P2E/lucis-token.svg" alt="" width="24" height="24" />
                            --
                          </div>
                          <div className={s.busdClaim}>
                            <ButtonWrapper type="primary" disabled>Claim</ButtonWrapper>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col span={24}>
                  <div className={s.share}>
                    <div>
                      <h2>
                        Join our Discord
                      </h2>
                    </div>
                    <div className={s.shareDiscordContent}>
                      <div className={s.shareDiscordText}>
                        <img src="/assets/P2E/discord.png" alt="" />
                        <p>Connect your Discord account and join our server!</p>
                        <ButtonWrapper width={56} onClick={() => window.open("https://discord.gg/Y3E4x4U38k")}>Join</ButtonWrapper>
                      </div>
                      <div className={s.shareBonus}>
                        <p>Join bonus:</p>
                        <div className={s.rewardItem}>
                          <span>--</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={24}>
                  <div className={s.share}>
                    <div>
                      <h2>
                        Refer a friend
                      </h2>
                    </div>
                    <div className={s.shareDiscordContent}>
                      <div className={s.shareDiscordText}>
                        <img src="/assets/P2E/referFriend.png" alt="" />
                        <p>https://lucis.network</p>
                        <img src="/assets/P2E/link.png" alt="" />
                      </div>
                      <div className={s.shareBonus}>
                        <p>Join bonus:</p>
                        <div className={s.rewardItem}>
                          <span>--</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Dashboard