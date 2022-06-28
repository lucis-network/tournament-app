import React, { useEffect, useState } from 'react'
import s from '../dashboard/dashboard.module.sass'
import { Col, message, Row } from "antd"
import {
  GET_LUCIS_MISSION,
  GET_STATISTICS,
} from "../../../../hooks/p2e/useP2E";

import { useQuery } from "@apollo/client";
import MissionsList from "../missionComponent/MissionsList";
import { PlayerMission } from "../../../../src/generated/graphql_p2e";
import ButtonWrapper from 'components/common/button/Button';
import NFTList from '../NFTList';
import SidebarRight from '../missionComponent/SidebarRight';

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
        <SidebarRight onlyWallet balance={statisticQuery?.data?.getBalance} />
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
            <SidebarRight balance={statisticQuery?.data?.getBalance} />

          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Mission