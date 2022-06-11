import React, { useState } from "react";
import s from "./daily/Daily.module.sass";
import { Button, Col, Image, message, Progress, Row } from "antd";
import { isEmpty } from "lodash";
import SpinLoading from "../common/Spin";
import { PlayerMission } from "../../../src/generated/graphql_p2e";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { CLAIM_MISSION, REROLL_MISSION } from "hooks/p2e/useP2E";

type MissionItemProp = {
  mission: PlayerMission;
  handleUpdateMissions?: () => void;
};

const MissionItem = (props: MissionItemProp) => {
  const { mission, handleUpdateMissions } = props;
  const [loading, setLoading] = useState(false);

  const [claimMission] = useMutation(CLAIM_MISSION, {
    context: {
      endpoint: "p2e",
    },
  });

  const [rerollMission] = useMutation(REROLL_MISSION, {
    context: {
      endpoint: "p2e",
    },
  });

  const handleClaimMission = async (mission: PlayerMission) => {
    claimMission({
      variables: { mission_uid: mission?.mission_uid },
      onCompleted: (data) => {
        message.success("Claimed!");
        if (handleUpdateMissions) {
          handleUpdateMissions();
        }
        console.log("data", data);
        setLoading(false);
      },
      onError: (errors) => {
        console.log("errors", errors);
        setLoading(false);
      },
    });
  };

  const handleRerollMission = async (mission: PlayerMission) => {
    setLoading(true);
    rerollMission({
      variables: { player_mission_uid: mission?.uid },
      onCompleted: (data) => {
        message.success("Rerolled!");
        if (handleUpdateMissions) {
          handleUpdateMissions();
        }
        setLoading(false);
      },
      onError: (errors) => {
        console.log("errors", errors);
        setLoading(false);
      },
    });
  };

  const achieved = mission?.achieved;
  const currentPercent =
    ((achieved as number) / (mission?.mission?.goal as unknown as number)) *
    100;
  const hasDone = currentPercent >= 100;

  return (
    <div className={s.missionItem}>
      <div className={s.missionLogo}>
        <Image
          src={
            mission?.mission?.img
              ? mission?.mission?.img
              : "/assets/P2E/gun.png"
          }
          preview={false}
          alt=""
        />
      </div>
      <div className={s.missionInfo}>
        <h4>{mission?.mission?.title}</h4>
        <Row className={s.missionReward}>
          <Col xs={{ span: 3 }}>Reward</Col>
          <Col xs={{ span: 21 }}>
            {mission?.mission?.lucis_point && (
              <p>{mission?.mission?.lucis_point} Lucis point</p>
            )}
            {mission?.mission?.lucis_token && (
              <p>{mission?.mission?.lucis_token} Lucis token</p>
            )}
          </Col>
        </Row>
        <div className={s.missionProgress}>
          <div>{achieved}</div>
          <Progress percent={currentPercent} format={(percent) => ""} />
          <div>{mission?.mission?.goal}</div>
        </div>
      </div>
      {/* <div className={s.missionAction}>
                  <Button disabled={!hasClaim} onClick={() => handleClaimMission(mission)}>Claim</Button>
                </div> */}
      <div className={s.missionAction}>
        {!hasDone ? (
          <Button
            onClick={() => handleRerollMission(mission)}
            loading={loading}
          >
            Reroll
          </Button>
        ) : (
          <Button
            disabled={mission?.is_claim}
            onClick={() => handleClaimMission(mission)}
            loading={loading}
          >
            Claim
          </Button>
        )}
      </div>
    </div>
  );
};

export default MissionItem;
