import React, { useState } from "react";
import s from "./p2e.module.sass";
import { Button, Col, Image, message, Progress, Row } from "antd";
import { isEmpty } from "lodash";
import SpinLoading from "../common/Spin";
import { PlayerMission } from "../../../src/generated/graphql_p2e";
import { useMutation } from "@apollo/client";
import { CLAIM_MISSION, REROLL_MISSION } from "hooks/p2e/useP2E";
import ButtonWrapper from "../common/btn/Btn";

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
        <img
          src={
            mission?.mission?.img
              ? mission?.mission?.img
              : "/assets/P2E/csgo/avatar-mission.png"
          }

          alt=""
        />
      </div>
      <div className={s.missionInfo}>
        <div className={s.missionContent}>
          <div className={s.missionTitle}>
            <h4>{mission?.mission?.title}</h4>
            <h5></h5> {/**sub title */}
          </div>
          <div className={s.missionReward}>
            + {"1"}
            <img src="/assets/P2E/lucis-point.png" alt="" width="30" height="30" />
          </div>
          <div className={s.missionProgress}>
            <Progress
              type="circle"
              strokeColor={{ '0%': '#1889E4', '100%': '#0BEBD6', }}
              width={64}
              percent={currentPercent} format={() => `${achieved}/${mission?.mission?.goal}`} />
          </div>
        </div>
      </div>

      {/* <div className={s.missionAction}>
                  <Button disabled={!hasClaim} onClick={() => handleClaimMission(mission)}>Claim</Button>
                </div> */}
      <div className={s.missionAction}>
        {!hasDone ? (
          <ButtonWrapper
            onClick={() => handleRerollMission(mission)}
            loading={loading}
            type="primary"
          >
            Reroll
          </ButtonWrapper>
        ) : (
          <Button
            disabled={mission?.is_claim}
            onClick={() => handleClaimMission(mission)}
            loading={loading}
            type="primary"
          >
            Claim
          </Button>
        )}
      </div>
    </div>
  );
};

export default MissionItem;
