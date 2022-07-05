import React, { useState } from 'react'
import s from "./dailyMission.module.sass";
import { Row, Col } from "antd";
import SpinLoading from "../../common/Spin";
import { PlayerMission } from "../../../../src/generated/graphql_p2e";
import { isEmpty } from 'lodash';
import MissionItem from './MissionItem';
import { Game } from 'utils/Enum';

type MissionsListProp = {
  title?: string;
  missions?: PlayerMission[];
  loading?: boolean;
  loadingUpdate?: boolean;
  handleUpdateMissions: (showMessage: boolean, loadingIconUpdate?: boolean) => Promise<void>;
  onClaimBox?: () => Promise<void>;
  isClaimBox?: boolean;
  currentGame?: Game;
  isDailyMission?: boolean;
};

const DailyMissionList = React.memo(({
  title,
  missions,
  handleUpdateMissions,
  onClaimBox,
  loading,
  loadingUpdate,
  isClaimBox,
  currentGame,
  isDailyMission
}: MissionsListProp) => {
  const [loadingOpenBox, setLoadingOpenBox] = useState(false);
  const boxOpen = missions?.[0]?.is_claim
    && missions?.[1]?.is_claim
    && missions?.[2]?.is_claim
    && missions?.[3]?.is_claim;
  const listMissionDone = missions?.map(item => {
    const achieved = item?.achieved;
    const currentPercent =
      ((achieved as number) / (item?.mission?.goal as unknown as number)) *
      100;

    return currentPercent >= 100;
  });

  const lengthMissionDone = listMissionDone?.filter(item => item)?.length ?? 0;
  console.log("missionList")
  return (
    <div className={s.dailyMissionsList}>
      {isDailyMission ?
        <Row className={s.header}>

          <Col xl={8} sm={24} xs={24} className={s.checkListMission}>
            {listMissionDone?.map((item, index) => {
              return (
                <div className={s.checkListMissionItem} key={index}>
                  {currentGame === Game.LOL ?
                    <img className={s.csgoImage} src="/assets/P2E/lol-game.svg" alt="lol-checklist-mission" />
                    : <img className={s.csgoImage} src="/assets/P2E/csgo/csgo-checklist-mission.png" alt="csgo-checklist-mission" />
                  }

                  {item
                    ? <img src="/assets/P2E/checkbox-active.svg" />
                    : <img src="/assets/P2E/checkbox-default.svg" />}
                </div>
              );
            })}
          </Col>
          <Col xl={16} sm={24} xs={24} className={s.headerRight}>
            <div className={s.rewardBox}>
              Complete 4 quests to unlock reward!
              <img src={
                isClaimBox ?
                  "/assets/P2E/csgo/box-open.png"
                  : "/assets/P2E/csgo/box-normal.png"
              }
                style={
                  !boxOpen && lengthMissionDone < 4 ? { filter: "grayscale(100%)", cursor: "auto" }
                    : isClaimBox ? { cursor: "auto" } : {}
                }
                width="300" alt="" onClick={async () => {
                  if (!boxOpen && lengthMissionDone < 4 || isClaimBox || loadingOpenBox) {
                    return;
                  }
                  setLoadingOpenBox(true);
                  if (onClaimBox) {
                    await onClaimBox();
                  }
                  setLoadingOpenBox(false);
                }} />
            </div>

          </Col>
        </Row>
        : null
      }
      <div className={s.subHeader}>
        <p>
          {title ?? "Completed all the daily misions to receive"}
        </p>
        <div className={s.updateButton} onClick={() => handleUpdateMissions(true)}>
          <img src="/assets/P2E/reload-icon.png"
            alt=""
            className={loadingUpdate ? `${s.spinner}` : ""} />
          Update
        </div>
      </div>
      <div className={s.missionsList}>
        {loading ? (
          <SpinLoading />
        ) : (
          isEmpty(missions)
            ? <div className={s.blankState}>No missions found.</div>
            : missions?.map((mission: PlayerMission, index: number) => {
              return <MissionItem
                isDailyMission={isDailyMission}
                currentGame={currentGame}
                mission={mission}
                key={`${mission?.mission?.game_uid}-${index}`}
                handleUpdateMissions={async () => await handleUpdateMissions(false, false)} />;
            })
        )}
      </div>
    </div>
  );
});

export default DailyMissionList;
