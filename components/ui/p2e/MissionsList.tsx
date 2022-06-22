import React from 'react'
import s from "./p2e.module.sass";
import { Checkbox } from "antd";
import SpinLoading from "../common/Spin";
import { PlayerMission } from "../../../src/generated/graphql_p2e";

import MissionItem from "./MissionItem";

type MissionsListProp = {
  title?: string;
  description?: string;
  canChooseGame?: boolean;
  missions?: PlayerMission[];
  loading?: boolean;
  loadingUpdate?: boolean;
  handleUpdateMissions: (popup: boolean) => void;
};

const MissionsList = ({
  missions,
  handleUpdateMissions,
  canChooseGame,
  loading,
  loadingUpdate
}: MissionsListProp) => {
  return (
    <div className={s.missionsList}>
      <div className={s.header}>
        <div className={s.checkListMission}>
          {

          }
          <div className={s.checkListMissionItem}>
            <img className={s.csgoImage} src="/assets/P2E/csgo/csgo-checklist-mission.png" alt="csgo-checklist-mission" />
            {/* <Checkbox checked={missions?.[0]?.is_claim} disabled /> */}
            {missions?.[0]?.is_claim
              ? <img src="/assets/P2E/csgo/checkbox-active.png" />
              : <img src="/assets/P2E/csgo/checkbox-default.png" />}
          </div>
          <div className={s.checkListMissionItem}>
            <img className={s.csgoImage} src="/assets/P2E/csgo/csgo-checklist-mission.png" alt="csgo-checklist-mission" />
            {/* <Checkbox checked={missions?.[1]?.is_claim} disabled /> */}
            {missions?.[1]?.is_claim
              ? <img src="/assets/P2E/csgo/checkbox-active.png" />
              : <img src="/assets/P2E/csgo/checkbox-default.png" />}
          </div>
          <div className={s.checkListMissionItem}>
            <img className={s.csgoImage} src="/assets/P2E/csgo/csgo-checklist-mission.png" alt="csgo-checklist-mission" />
            {/* <Checkbox checked={missions?.[2]?.is_claim} disabled /> */}
            {missions?.[2]?.is_claim
              ? <img src="/assets/P2E/csgo/checkbox-active.png" />
              : <img src="/assets/P2E/csgo/checkbox-default.png" />}
          </div>
          <div className={s.checkListMissionItem}>
            <img className={s.csgoImage} src="/assets/P2E/csgo/csgo-checklist-mission.png" alt="csgo-checklist-mission" />
            {/* <Checkbox checked={missions?.[3]?.is_claim} disabled /> */}
            {missions?.[3]?.is_claim
              ? <img src="/assets/P2E/csgo/checkbox-active.png" />
              : <img src="/assets/P2E/csgo/checkbox-default.png" />}
          </div>
        </div>

        <div className={s.headerCenter}>
          Complete 4 quests to unlock rewards!
          <img src="/assets/P2E/box.png" alt="" />
        </div>
        <div className={s.updateButton} onClick={() => handleUpdateMissions(true)}>
          <img src="/assets/P2E/reload-icon.png"
            alt=""
            className={loadingUpdate ? `${s.spinner}` : ""} />
          Update
        </div>
      </div>
      <div className={s.subHeader}>
        <p>
          Completed all the daily misions to receive
        </p>
      </div>
      <div className={s.missionsList}>
        {loading ? (
          <SpinLoading />
        ) : (
          missions?.map((mission: PlayerMission, index: number) => {
            return <MissionItem mission={mission} key={`${mission?.mission?.game_uid}-${index}`} handleUpdateMissions={() => handleUpdateMissions(false)} />;
          })
        )}
      </div>
    </div>
  );
};

export default MissionsList;
