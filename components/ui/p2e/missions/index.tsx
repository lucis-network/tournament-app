import React, { useEffect, useState } from 'react'
import s from '../dashboard/dashboard.module.sass'
import { Col, message, Row } from "antd"
import {
  GET_LUCIS_MISSION,
  GET_STATISTICS,
} from "../../../../hooks/p2e/useP2E";

import { useQuery } from "@apollo/client";
import MissionsList from "../missionComponent/MissionList";
import { PlayerMission } from "../../../../src/generated/graphql_p2e";
// import ButtonWrapper from 'components/common/button/Button';
import NFTList from '../NFTList';
import SidebarRight from '../SidebarRight';
import { Game } from 'utils/Enum';

interface IProps {
  currentGame?: Game;
}
const Mission = (props: IProps) => {
  const [loading, setLoading] = useState(false);
  const [mission, setMission] = useState<PlayerMission[]>([])
  const [statistic, setStatistic] = React.useState<{ lucis_point: number, lucis_token: number }>({ lucis_point: 0, lucis_token: 0 });
  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  });

  const lucisMissionQuery = useQuery(GET_LUCIS_MISSION, {
    context: {
      endpoint: 'p2e'
    },
    skip: true
  })



  // if (getDailyMissionLoading || isEmpty(getDailyMissionData)) return null

  const handleUpdateMissions = async (showMessage = true, loadingIconUpdate = true) => {
    if (loadingIconUpdate) {
      setLoading(true);
    }

    await queryData();
    const sta = await statisticQuery.refetch();
    setStatistic({ lucis_point: sta?.data?.getBalance?.lucis_point, lucis_token: sta?.data?.getBalance?.lucis_token })
    setLoading(false);
    if (showMessage) {
      message.success("Update!");
    }
  }

  React.useEffect(() => {
    setStatistic({ lucis_point: statisticQuery.data?.getBalance?.lucis_point, lucis_token: statisticQuery?.data?.getBalance?.lucis_token })
  },[statisticQuery.data])

  useEffect(() => {
    if(props.currentGame) {
      queryData();
    }
  }, [props?.currentGame])

  const queryData = async () => {
    switch (props.currentGame) {
      case Game.CSGO:
        const csgo = await lucisMissionQuery.refetch({
          game_uid: '03',
          platform_id: 1
        });

        setMission(csgo.data.getLucisMission);
        break;
      case Game.LOL:
        const lol = await lucisMissionQuery.refetch({
          game_uid: '06',
          platform_id: 4
        });

        setMission(lol.data.getLucisMission);
        break;

      default:
        break;
    }
  }

  return (
    <div className="lucis-container-2">
      <div className={s.dailyContainer}>
        <SidebarRight
          onlyWallet
          lucisPoint={statistic?.lucis_point}
          lucisToken={statistic?.lucis_token} />
        <Row gutter={51}>
          <Col lg={16} md={24}>
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
              title="Completed  the Lucis missions to receive"
              missions={mission}
              handleUpdateMissions={(showMessage, loadingIconUpdate) => handleUpdateMissions(showMessage, loadingIconUpdate)}
              loading={lucisMissionQuery.loading}
              currentGame={props.currentGame}
              loadingUpdate={loading} />
          </Col>
          <Col lg={8} md={24}>
            <SidebarRight
              lucisPoint={statistic?.lucis_point}
              lucisToken={statistic?.lucis_token}
            />

          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Mission