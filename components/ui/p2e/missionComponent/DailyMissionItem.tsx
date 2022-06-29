import React, { useState } from "react";
import s from "./dailyMission.module.sass";
import { Col, message, Progress, Row } from "antd";
import { MissionType, PlayerMission } from "../../../../src/generated/graphql_p2e";
import { useMutation } from "@apollo/client";
import { CLAIM_MISSION, REROLL_MISSION } from "hooks/p2e/useP2E";
import ButtonWrapper from "../../../common/button/Button";
import moment from "moment";
import { handleGraphqlErrors } from "utils/apollo_client";

type MissionItemProp = {
  mission: PlayerMission;
  handleUpdateMissions?: () => Promise<void>;
};

const DailyMissionItem = (props: MissionItemProp) => {
  const { mission, handleUpdateMissions } = props;
  const [loading, setLoading] = useState(false);

  const [claimMission] = useMutation(CLAIM_MISSION, {
    context: {
      endpoint: "p2e",
    },
  });

  // const [rerollMission] = useMutation(REROLL_MISSION, {
  //   context: {
  //     endpoint: "p2e",
  //   },
  // });

  const handleClaimMission = async (mission: PlayerMission) => {
    setLoading(true);
    try {
      await claimMission({
        variables: { player_mission_uid: mission?.uid },
      });

      if (handleUpdateMissions) {
        await handleUpdateMissions();
      }
      message.success("Claimed!");
      setLoading(false);

    } catch (error: any) {
      setLoading(false);
      handleGraphqlErrors(error, (code) => {
        switch (code) {
          case "INVALID_PLAYER_MISSION_UID":
            message.error("Your in invalid.")
            return;
          case "NOT_ACHIEVED":
            message.error("You must complete mission.");
            return;
          case "HAS_CLAIMED":
            message.error("You has claimed.");
            return;
          default:
            message.error("Something was wrong. Please contact to lucis network for assistance.")
        };
      })
    }


  };

  // const handleRerollMission = async (mission: PlayerMission) => {
  //   setLoading(true);
  //   rerollMission({
  //     variables: { player_mission_uid: mission?.uid },
  //     onCompleted: (data) => {
  //       message.success("Rerolled!");
  //       if (handleUpdateMissions) {
  //         handleUpdateMissions();
  //       }
  //       setLoading(false);
  //     },
  //     onError: (errors) => {
  //       console.log("errors", errors);
  //       setLoading(false);
  //     },
  //   });
  // };

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
    <div className={s.missionItem} style={
      finish ?
        { background: "rgba(50, 110, 123, 0.5)" }
        : hasDone
          ? { background: "linear-gradient(270deg, #326E7B 74.38%, rgba(50, 110, 123, 0.2) 99.08%)" }
          : {}
    }>
      <Row>
        <Col xs={20} xl={18}>
          <Row className={s.missionInfo}>
            <Col xl={16} xs={24} className={s.missionContent}>
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
              <div className={s.missionTitle}>
                <h4>{mission?.mission?.title}</h4>
                <img src="/assets/P2E/csgo/hourglass.png" alt="hourglass" style={{ marginRight: 5 }} />
                <span>{moment(nextDay).fromNow().slice(3)} until next mission</span> {/**sub title */}
              </div>
            </Col>
            <Col xl={8} xs={24}>
              <div className={s.missionReward}>
                <div className={s.rewardItem} style={{ marginRight: 70 }}>
                  <span className={s.lucisPoint}>+{mission?.mission?.level?.lucis_point ?? "--"}</span>
                  <img src="/assets/P2E/lucis-point.svg" alt="" />
                </div>
                <div className={s.rewardItem}>
                  <span>-</span>
                  <img src="/assets/P2E/lucis-token.svg" alt="" />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={4} xl={6}>
          <Row gutter={[50, 0]} className={s.missionState}>
            <Col xl={12} xs={24} className={!hasDone ? s.missionProgress : s.missionProgressFinish} style={finish ? { justifyContent: "center" } : {}}>
              <Progress
                type="circle"
                strokeColor={{ '0%': '#1889E4', '100%': '#0BEBD6' }}
                width={60}
                percent={currentPercent} format={() => {
                  if (mission?.mission?.type === MissionType.Kr || mission?.mission?.type === MissionType.Kda) {
                    return `${achieved}`
                  }
                  if (mission?.mission?.goal.length >= 3) {
                    return `${achieved}`;
                  }
                  return `${achieved}/${mission?.mission?.goal}`
                }
                } />
            </Col>
            <Col xl={12} xs={24} className={s.missionAction} style={finish ? { justifyContent: "center" } : {}}>
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
        </Col>
      </Row>


    </div >
  );
};

export default DailyMissionItem;
