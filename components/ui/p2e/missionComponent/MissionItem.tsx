import React, { useState } from "react";
import s from "./mission.module.sass";
import { Col, message, Progress, Row } from "antd";
import ButtonWrapper from "../../../common/button/Button";
import moment from "moment";
import { handleGraphqlErrors } from "utils/apollo_client";
import { Game } from "utils/Enum";
import { CsgoMissionType, PlayerMission } from "src/generated/graphql_p2e";
import MissionService from "components/service/p2e/MissionService";

type MissionItemProp = {
  mission: PlayerMission;
  handleUpdateStatistic?: () => void;
  handleUpdateMission?: () => void;
  currentGame?: Game;
  isDailyMission?: boolean;
};

const MissionItem = (props: MissionItemProp) => {
  const [loading, setLoading] = useState(false);
  const [currentMission, setCurrentMission] = useState<PlayerMission>(props.mission);

  React.useEffect(() => {
    setCurrentMission(props.mission);
  }, [props.mission])


  const handleClaimMission = async () => {
    setLoading(true);

    // const platformId = props.currentGame === Game.CSGO ? 1 : 4;
    try {
      await MissionService.claimMission(currentMission?.uid);
      let updatedMission: PlayerMission = {
        ...currentMission,
        is_claim: true
      };

      // if (!props.isDailyMission) {
      //   const newMissionRes = await upgradeLucisMission({
      //     variables: {
      //       player_mission_uid: currentMission.uid,
      //       platform_id: platformId
      //     }
      //   });
      //   updatedMission = newMissionRes.data.upgradeLucisMission;
      // }

      if (props.handleUpdateMission && !props.isDailyMission) {
        props.handleUpdateMission();
      }
      if (props.handleUpdateStatistic) {
        props.handleUpdateStatistic();
      }

      setCurrentMission(updatedMission);
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
            message.error("Something was wrong. Please contact to Lucis network for assistance.")
        };
      })
    }


  };

  const achieved = currentMission?.achieved;
  const currentPercent =
    ((achieved as number) / (currentMission?.mission?.goal as unknown as number)) *
    100;
  const hasDone = currentPercent >= 100;
  let nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1)
  nextDay.setHours(0, 0, 0);

  const finish = hasDone && currentMission?.is_claim;
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
                    currentMission?.mission?.img
                      ? currentMission?.mission?.img
                      : props.currentGame === Game.LOL ? "/assets/P2E/lol-game.svg" : "/assets/P2E/csgo/avatar-mission.png"
                  }

                  alt=""
                />
              </div>
              <div className={s.missionTitle}>
                <h4>{currentMission?.mission?.title}</h4>

                {props.isDailyMission
                  ? (
                    <>
                      <img src="/assets/P2E/csgo/hourglass.png" alt="hourglass" style={{ marginRight: 5 }} />
                      <span>{moment(nextDay).fromNow().slice(3)} until next mission</span>
                    </>
                  )
                  :
                  (<div className={s.levelMission}>
                    Mission level: {currentMission?.mission?.level?.level}
                  </div>)
                }
              </div>
            </Col>
            <Col xl={8} xs={24}>
              <div className={s.missionReward}>
                <div className={s.rewardItem} style={{ marginRight: 70 }}>
                  <span className={s.lucisPoint}>+{currentMission?.mission?.level?.lucis_point ?? "--"}</span>
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
                  if (currentMission?.mission?.csgo_mission?.type === CsgoMissionType.Kr || currentMission?.mission?.csgo_mission?.type === CsgoMissionType.Kda) {
                    return `${achieved}`
                  }
                  if (currentMission?.mission?.goal.length >= 3) {
                    return `${achieved}`;
                  }
                  return `${achieved}/${currentMission?.mission?.goal}`
                }
                } />
            </Col>
            <Col xl={12} xs={24} className={s.missionAction} style={finish ? { justifyContent: "center" } : {}}>
              {finish ?
                <img src="/assets/P2E/csgo/finish.png" alt="" />
                :
                <ButtonWrapper
                  disabled={!hasDone}
                  onClick={() => handleClaimMission()}
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

export default MissionItem;
