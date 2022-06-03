import React from 'react'
import s from "./daily/Daily.module.sass";
import {Button, Col, Image, Progress, Row} from "antd";
import {isEmpty} from "lodash";
import SpinLoading from "../common/Spin";
import {PlayerMission} from "../../../src/generated/graphql_p2e";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRepeat, faPlusCircle} from "@fortawesome/free-solid-svg-icons";

type MissionsListProp = {
  title?: string,
  description?: string,
  canChooseGame?: boolean,
  missions?: PlayerMission[],
  handleUpdateMissions?: () => void,
}

const MissionsList = ({ title, description, missions, handleUpdateMissions, canChooseGame }: MissionsListProp) => {

  return (
    <div className={s.missionsWrap}>
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
        {isEmpty(missions) ? <SpinLoading /> : (
          missions?.map((mission: PlayerMission, index) => {
            const achieved = mission?.achieved
            const currentPercent = (((achieved as number)/(mission?.mission?.goal as unknown as number)) * 100)

            return (
              <div className={s.missionItem} key={`${mission?.mission?.game_uid}-${index}`}>
                <div className={s.missionLogo}>
                  <Image src="/assets/P2E/gun.png" preview={false} alt="" />
                </div>
                <div className={s.missionInfo}>
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
                  <Button disabled>Claim</Button>
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