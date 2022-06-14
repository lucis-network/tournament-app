import React from 'react'
import s from "./p2e.module.sass";
import { Button, Checkbox, Col, Image, message, Progress, Row } from "antd";
import { isEmpty } from "lodash";
import SpinLoading from "../common/Spin";
import { PlayerMission } from "../../../src/generated/graphql_p2e";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from '@apollo/client';
import { CLAIM_MISSION } from 'hooks/p2e/useP2E';

type MissionsListProp = {
  title?: string,
  description?: string,
  canChooseGame?: boolean,
  missions?: PlayerMission[],
  loading?: boolean,
  handleUpdateMissions?: () => void,
}

const MissionsList = ({ title, description, missions, handleUpdateMissions, canChooseGame, loading }: MissionsListProp) => {

  const [claimMission] = useMutation(CLAIM_MISSION, {
    context: {
      endpoint: 'p2e'
    }
  })
  const handleClaimMission = async (mission: PlayerMission) => {
    try {
      await claimMission({ variables: { mission_uid: mission.mission_uid } }) // fake tx_hash

      if (handleUpdateMissions) {
        handleUpdateMissions();
      }
      message.success("Claimed!");

    } catch (error) {
      console.error(error);
      message.error("Error!");
    }
  }
  return (
    <div className={s.missionsWrap}>
      {/* <div className={s.header}>
        <Row>
          <Col span="12">
            <div className={s.checkListMission}>
              <div className={s.checkListMissionItem}>
                <img src="/assets/P2E/csgo/csgo-checklist-mission.png" alt="csgo-checklist-mission" />
                <Checkbox checked />
              </div>
            </div>
          </Col>
          <Col span="12"></Col>
        </Row>
      </div> */}
      <div className={s.missionsWrapHeader}>
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <div>
          <Button onClick={handleUpdateMissions}>
            <FontAwesomeIcon icon={faRepeat} />
            <span style={{ paddingLeft: '5px' }}>Update</span>
          </Button>
          {canChooseGame && (
            <Button>
              <FontAwesomeIcon icon={faPlusCircle} />
              <span style={{ paddingLeft: '5px' }}>Choose another game</span>
            </Button>
          )}
        </div>
      </div>
      <div className={s.missionsList}>
        {loading ? <SpinLoading /> : (
          missions?.map((mission: PlayerMission, index) => {
            const achieved = mission?.achieved
            const currentPercent = (((achieved as number) / (mission?.mission?.goal as unknown as number)) * 100);
            const hasClaim = currentPercent >= 100;
            return (
              <div className={s.missionItem} key={`${mission?.mission?.game_uid}-${index}`}>
                <div className={s.missionLogo}>
                  <Image src={mission?.mission?.img ? mission?.mission?.img : "/assets/P2E/gun.png"} preview={false} alt="" />
                </div>
                <div className={s.missionInfo} style={{ flex: 1, padding: "0 15px" }}>
                  <h4>{mission?.mission?.title}</h4>
                  <Row className={s.missionReward}>
                    <Col xs={{ span: 3 }}>Reward</Col>
                    <Col xs={{ span: 21 }}>
                      {mission?.mission?.lucis_point && <p>{mission?.mission?.lucis_point} Lucis point</p>}
                      {mission?.mission?.lucis_token && <p>{mission?.mission?.lucis_token} Lucis token</p>}
                    </Col>
                  </Row>
                  <div className={s.missionProgress}>
                    <div>{achieved}</div>
                    <Progress percent={currentPercent} format={percent => ''} />
                    <div>{mission?.mission?.goal}</div>
                  </div>
                </div>
                <div className={s.missionAction}>
                  <Button disabled={!hasClaim} onClick={() => handleClaimMission(mission)}>Claim</Button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default MissionsList