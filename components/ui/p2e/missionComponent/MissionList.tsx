import React, { useState } from 'react'
import s from "./mission.module.sass";
import { Row, Col, Skeleton } from "antd";
import SpinLoading from "../../common/Spin";
import { PlayerMission } from "../../../../src/generated/graphql_p2e";
import { isEmpty } from 'lodash';
import MissionItem from './MissionItem';
import { Game } from 'utils/Enum';
import { SkeletonItem } from './SkeletonItem';

type MissionsListProp = {
  title?: string;
  missions?: PlayerMission[];
  loading?: boolean;
  loadingUpdate?: boolean;
  handleUpdateMissions: (showMessage: boolean, loadingIconUpdate?: boolean) => Promise<void>;
  handleUpdateStatistic: () => void;
  onClaimBox?: () => Promise<void>;
  isClaimBox?: boolean;
  currentGame?: Game;
  isDailyMission?: boolean;
};

const MissionList = ({
  title,
  missions,
  handleUpdateMissions,
  handleUpdateStatistic,
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


  const clickUpdateButton = async () => {
    if (loadingUpdate) {
      return;
    }
    await handleUpdateMissions(true);
  }
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
              Complete 4 quests to open this box!
              <img src={
                isClaimBox ?
                  "/assets/P2E/box-open.png"
                  : "/assets/P2E/box-normal.png"
              }
                style={
                  !boxOpen && lengthMissionDone < 4 ? { filter: "grayscale(100%)", cursor: "no-drop" }
                    : isClaimBox ? { cursor: "auto" } : {}
                }
                alt="" onClick={async () => {
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
        <div className={s.updateButton} onClick={() => clickUpdateButton()}>
          <img src="/assets/P2E/reload-icon.png"
            alt=""
            className={loadingUpdate ? `${s.spinner}` : ""} />
          Update
        </div>
      </div>
      <div className={s.missionsList}>
        {loading ? (
          [1, 2, 3, 4].map(item => {
            return (
              <SkeletonItem key={item} />
            )
          })
        ) : (
          isEmpty(missions)
            ? <div className={s.blankState}>No missions found.</div>
            : missions?.map((mission: PlayerMission, index: number) => {
              return <MissionItem
                isDailyMission={isDailyMission}
                currentGame={currentGame}
                mission={mission}
                key={`${mission?.mission?.game_uid}-${index}`}
                handleUpdateMission={async () => await handleUpdateMissions(false, false)}
                handleUpdateStatistic={() =>  handleUpdateStatistic()} />;
            })
        )}
      </div>
    </div>
  );
};

export default MissionList;
