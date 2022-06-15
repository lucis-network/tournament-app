import React, { useEffect, useState } from 'react'
import s from './dashboard.module.sass'
import { Button, Col, Image, message, Row } from "antd"
import { GET_OR_SET_DAILY_MISSION, GET_STATISTICS, UPDATE_DAILY_MISSION, useGetRecentMatches } from "../../../../hooks/p2e/useP2E";
import { isEmpty } from "lodash";
import moment from "moment";
import SpinLoading from "../../common/Spin";
import { useMutation, useQuery } from "@apollo/client";
import MissionsList from "../MissionsList";
import { PlayerMission } from "../../../../src/generated/graphql_p2e";
import Statistics from "../Statistics";
import OnUsingNFTs from '../OnUsingNFTs';
import { RecentMatchList } from '../RecentMatchList';

const DailyMission = () => {
  const [lengthShowMore, setLengthShowMore] = useState(5);
  const [loading, setLoading] = useState(false);
  const [dailyMission, setDailyMission] = useState<PlayerMission[]>([])
  const [getDailyMission, stateDailyMissionFetch] = useMutation(GET_OR_SET_DAILY_MISSION, {
    variables: {
      game_uid: '03',
      platform_id: 1
    },
    context: {
      endpoint: 'p2e'
    }
  })

  const { error, data, refetch } = useQuery(GET_STATISTICS, {
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

  const { getRecentMatchesLoading, getRecentMatchesData, refetchRecentMatches } = useGetRecentMatches({
    game_uid: '03',
    offset: 1,
    limit: 5,
    platform_id: 1
  })

  // if (getDailyMissionLoading || isEmpty(getDailyMissionData)) return null

  const handleUpdateMissions = async () => {
    setLoading(true);
    const dailyMissions = await updateDailyMission();
    setDailyMission(dailyMissions.data.updateDailyMission)
    await refetchRecentMatches()
    // refetchDailyMission()
    await refetch();
    setLoading(false);
    message.success("update successfully!");
  }

  useEffect(() => {
    getDailyMission()
      .then(response => {
        setDailyMission(response.data.getOrSetDailyMission)
      });
  }, [])

  const loadMore = () => {
    setLengthShowMore(lengthShowMore + 5);
  };

  return (
    <div className="lucis-container-2">
      <div className={s.dailyContainer}>
        <Row gutter={32}>
          <Col span={16}>

            {/* <div className={s.gameInfo}>
              <Image src="/assets/P2E/csgo-logo-icon.png" preview={false} alt="" />
              <h3>CS:GO FACEIT</h3>
            </div>
            <Statistics balance={{ lucisPoint: data?.getBalance?.lucis_point, lucisToken: data?.getBalance?.lucis_token }} /> */}
            {/* <OnUsingNFTs /> */}
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
            <div className={s.dailyTitle}>
              <h2>
                Recent matches
              </h2>
            </div>
            <RecentMatchList recentMatches={getRecentMatchesData?.getRecentlyMatch} loading={getRecentMatchesLoading} />
          </Col>
          <Col span={8}>
            <div className={s.dailyTitle}>
              <h2>
                Lucis Wallet
              </h2>
            </div>
            <div className={s.wallet}>
              <Row gutter={32}>
                <Col span={12}>
                  <div className={s.lucisPointWallet}>
                    LUCIS Point
                    <img src="/assets/P2E/lucis-point.png" alt="" width="68" height="68" />
                    {data?.getBalance?.lucis_point}
                  </div>
                </Col>
                <Col span={12}>
                  <div >
                    <div className={s.BUSDWallet}>
                      BUSD
                      <img src="/assets/P2E/BUSD.png" alt="" width="38" height="38" style={{ margin: 16 }} />
                      --
                    </div>
                    <div className={s.busdClaim}>
                      <Button type="ghost" disabled>Claim</Button>
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

export default DailyMission