import React, { useState } from "react";
import s from "./p2e.module.sass";
import { Button, Col, Image, message, Progress, Row } from "antd";
import { isEmpty } from "lodash";
import SpinLoading from "../common/Spin";
import { PlayerMission } from "../../../src/generated/graphql_p2e";
import { useMutation } from "@apollo/client";
import { CLAIM_MISSION, REROLL_MISSION } from "hooks/p2e/useP2E";
import ButtonWrapper from "../../common/button/Button";
import moment from "moment";

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
  let nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1)
  nextDay.setHours(0, 0, 0);

  const finish = hasDone && mission?.is_claim;
  return (
    <div className={s.missionItem} style={finish ? { background: "rgba(50, 110, 123, 0.5)" } : {}}>
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
            <img src="/assets/P2E/csgo/hourglass.png" alt="hourglass" style={{ marginRight: 5 }} />
            <span>{moment(nextDay).fromNow()} next mission</span> {/**sub title */}
          </div>
          <div className={s.missionReward}>
            <div className={s.missionReward}>
              <div className={s.rewardItem}>
                <span>+ {mission?.mission?.level?.lucis_point ?? "--"}</span>
                <img src="/assets/P2E/lucis-point.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Row className={s.missionState}>
        <Col className={!hasDone ? s.missionProgress : s.missionProgressFinish}>
          <Progress
            type="circle"
            strokeColor={{ '0%': '#1889E4', '100%': '#0BEBD6' }}
            width={60}
            percent={currentPercent} format={() => `${achieved}/${mission?.mission?.goal}`} />
        </Col>
        <Col className={s.missionAction}>
          {finish ?
            <img src="/assets/P2E/csgo/finish.png" alt="" />
            :
            <ButtonWrapper
              disabled={!hasDone}
              onClick={() => handleClaimMission(mission)}
              loading={loading}
              type="primary"
            >
              Claim
            </ButtonWrapper>
          }
        </Col>
      </Row>

    </div>
  );
};

export default MissionItem;
