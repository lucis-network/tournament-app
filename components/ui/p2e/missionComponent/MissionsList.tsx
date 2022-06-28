import React from 'react'
import s from "./mission.module.sass";
import { Row, Col } from "antd";
import SpinLoading from "../../common/Spin";
import { PlayerMission } from "../../../../src/generated/graphql_p2e";

import MissionItem from "./MissionItem";
import { isEmpty } from 'lodash';

type MissionsListProp = {
  missions?: PlayerMission[];
  loading?: boolean;
  loadingUpdate?: boolean;
  handleUpdateMissions: (popup: boolean) => void;
};

const MissionsList = ({
  missions,
  handleUpdateMissions,
  loading,
  loadingUpdate
}: MissionsListProp) => {

  return (
    <div className={s.missionsList}>
      <div className={s.subHeader}>
        <p>
          Completed  the Lucis missions to receive
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
              return <MissionItem mission={mission} key={`${mission?.mission?.game_uid}-${index}`} handleUpdateMissions={() => handleUpdateMissions(false)} />;
            })
        )}
      </div>
    </div>
  );
};

export default MissionsList;
