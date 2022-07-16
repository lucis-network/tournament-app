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
import MissionService from 'components/service/p2e/MissionService';

interface IProps {
  currentGame?: Game;
}
const Mission = (props: IProps) => {
  const [loading, setLoading] = useState(false);
  const [mission, setMission] = useState<PlayerMission[]>([])
  const [loadingLucisMission, setLoadingLucisMission] = useState(false);
  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  });




  // if (getDailyMissionLoading || isEmpty(getDailyMissionData)) return null

  const handleUpdateMissions = async (showMessage = true, loadingIconUpdate = true) => {
    if (loadingIconUpdate) {
      setLoading(true);
    }
    await MissionService.updateDailyMission();
    await queryData();
    // await statisticQuery.refetch();
    setLoading(false);
    if (showMessage) {
      message.success("Update!");
    }
  }

  useEffect(() => {
    switch (props.currentGame) {
      case Game.CSGO:
        MissionService.setVariable("03", 1);
        break;
      case Game.LOL:
        MissionService.setVariable("06", 4);
        break;

      default:
        break;
    }
    if (props.currentGame) {
      queryData();
    }
  }, [props?.currentGame])

  const queryData = async () => {
    setLoadingLucisMission(true);
    const res = await MissionService.getLucisMission();
    setMission(res.data.getLucisMission);
    setLoadingLucisMission(false);


  }

  return (
    <div className="lucis-container-2">
      <div className={s.dailyContainer}>
        <SidebarRight
          onlyWallet
          lucisPoint={statisticQuery?.data?.getBalance?.lucis_point}
          lucisToken={statisticQuery?.data?.getBalance?.lucis_point} />
        <Row gutter={51}>
          <Col lg={16} md={24}>
            <div>
              {/* <h2>
                Your NFTs card
              </h2> */}
              <NFTList currentGame={props.currentGame} />
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
              handleUpdateStatistic={() => statisticQuery.refetch()}
              loading={loadingLucisMission}
              currentGame={props.currentGame}
              loadingUpdate={loading} />
          </Col>
          <Col lg={8} md={24}>
            <SidebarRight
              lucisPoint={statisticQuery?.data?.getBalance?.lucis_point}
              lucisToken={statisticQuery?.data?.getBalance?.lucis_point}
            />

          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Mission