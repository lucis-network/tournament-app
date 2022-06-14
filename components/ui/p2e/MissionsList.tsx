import React from 'react'
import s from "./p2e.module.sass";
import { Button, Checkbox, Col, Image, message, Progress, Row } from "antd";
import { isEmpty } from "lodash";
import SpinLoading from "../common/Spin";
import { PlayerMission } from "../../../src/generated/graphql_p2e";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { CLAIM_MISSION, REROLL_MISSION } from "hooks/p2e/useP2E";
import MissionItem from "./MissionItem";

type MissionsListProp = {
  title?: string;
  description?: string;
  canChooseGame?: boolean;
  missions?: PlayerMission[];
  loading?: boolean;
  handleUpdateMissions?: () => void;
};

const MissionsList = ({
  title,
  description,
  missions,
  handleUpdateMissions,
  canChooseGame,
  loading,
}: MissionsListProp) => {
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
            <span style={{ paddingLeft: "5px" }}>Update</span>
          </Button>
          {canChooseGame && (
            <Button>
              <FontAwesomeIcon icon={faPlusCircle} />
              <span style={{ paddingLeft: "5px" }}>Choose another game</span>
            </Button>
          )}
        </div>
      </div>
      <div className={s.missionsList}>
        {loading ? (
          <SpinLoading />
        ) : (
          missions?.map((mission: PlayerMission, index: number) => {
            return <MissionItem mission={mission} key={`${mission?.mission?.game_uid}-${index}`} handleUpdateMissions={handleUpdateMissions} />;
          })
        )}
      </div>
    </div>
  );
};

export default MissionsList;
