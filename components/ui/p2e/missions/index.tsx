import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from "@apollo/client";
import { GET_OR_SET_DAILY_MISSION, GET_STATISTICS, UPDATE_DAILY_MISSION } from "../../../../hooks/p2e/useP2E";
import s from "../dashboard/dashboard.module.sass";
import { Image } from "antd";
import MissionsList from "../MissionsList";
import NFTList from '../NFTList';
import Statistics from '../Statistics';

const Missions = () => {
  const [dailyMission, setDailyMission] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  });
  const [getDailyMission] = useMutation(GET_OR_SET_DAILY_MISSION, {
    variables: {
      game_uid: '03',
      platform_id: 1 // Faceit
    },
    context: {
      endpoint: 'p2e'
    }
  })
  const [updateDailyMission] = useMutation(UPDATE_DAILY_MISSION, {
    variables: {
      game_uid: '03',
      platform_id: 1 // Faceit
    },
    context: {
      endpoint: 'p2e'
    }
  })

  const handleUpdateMissions = () => {
    updateDailyMission()
      .then(response => {
        setDailyMission(response.data.updateDailyMission)
        refetch()
      })
  }

  useEffect(() => {
    getDailyMission()
      .then(response => {
        setDailyMission(response.data.getOrSetDailyMission)
      })
  }, [])

  return (
    <div className="lucis-container-2">
      <div className={s.dailyContainer}>
        <div className={s.userInfo}>

        </div>
        <div className={s.gameInfo}>
          <Image src="/assets/P2E/csgo-logo-icon.png" preview={false} alt="" />
          <h3>CS:GO FACEIT</h3>
        </div>

        {/* <Statistics balance={{ lucisPoint: data?.getBalance?.lucis_point, lucisToken: data?.getBalance?.lucis_token }} /> */}
        {/* <OnUsingNFTs /> */}
        <MissionsList
          title="Lucis missions"
          description="Complete the missions to get reward and up level"
          missions={dailyMission}
          handleUpdateMissions={handleUpdateMissions}
          canChooseGame
          onClaimBox={() => null}
        />
      </div>
    </div>
  )
}

export default Missions