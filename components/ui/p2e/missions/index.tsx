import React, { useEffect, useState } from 'react'
import s from '../dashboard/dashboard.module.sass'
import { Col, message, Row } from "antd"
import {
  CLAIM_BOX,
  GET_LUCIS_MISSION,
  GET_OR_SET_DAILY_MISSION,
  GET_STATISTICS,
  UPDATE_DAILY_MISSION,
  UPDATE_RECENTLY_MATCH,
  useGetRecentMatches
} from "../../../../hooks/p2e/useP2E";

import { useMutation, useQuery } from "@apollo/client";
import MissionsList from "../missionComponent/MissionsList";
import { GMatch, GPlayerMatch, PlayerMission } from "../../../../src/generated/graphql_p2e";
import ButtonWrapper from 'components/common/button/Button';
import NFTList from '../NFTList';
import { handleGraphqlErrors } from 'utils/apollo_client';

const Mission = () => {
  const [loading, setLoading] = useState(false);
  const [mission, setMission] = useState<PlayerMission[]>([])

  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  });

  const lucisMissionQuery = useQuery(GET_LUCIS_MISSION, {
    context: {
      endpoint: 'p2e'
    },
    variables: {
      game_uid: '03',
      platform_id: 1
    },
  })



  // if (getDailyMissionLoading || isEmpty(getDailyMissionData)) return null

  const handleUpdateMissions = async (popup = true) => {
    setLoading(true);

    const promise = await Promise.all([
      lucisMissionQuery.refetch(),
      statisticQuery.refetch()
    ])
    setMission(lucisMissionQuery?.data?.getLucisMission)
    setLoading(false);
    if (popup) {
      message.success("update successfully!");
    }
  }

  useEffect(() => {
    setMission(lucisMissionQuery?.data?.getLucisMission)
  }, [lucisMissionQuery?.data])


  return (
    <div className="lucis-container-2">
      <div className={s.dailyContainer}>
        <Row>
          <Col xl={0} xs={24}>
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
        </Row>
        <Row gutter={40}>
          <Col xl={16} md={24}>
            <div>
              {/* <h2>
                Your NFTs card
              </h2> */}
              <NFTList />
            </div>
            <div className={s.dailyTitle}>
              <h2>
                Lucis missions
              </h2>
            </div>
            <MissionsList
              missions={mission}
              handleUpdateMissions={(popup) => handleUpdateMissions(popup)}
              loading={lucisMissionQuery.loading}
              loadingUpdate={loading} />
          </Col>
          <Col xl={8} md={24}>
            <div className={s.sidebarRight}>
              <Row>
                <Col xs={0} xl={24}>
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
                          <span className={s.lucisPoint}>+50</span>
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
                          <span className={s.lucisPoint}>+50</span>
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

export default Mission