import React, { useEffect, useState } from 'react'
import { useMutation } from "@apollo/client";
import { GET_DAILY_MISSION, UPDATE_DAILY_MISSION } from "../../../../hooks/p2e/useP2E";
import s from "../daily/Daily.module.sass";
import { Image } from "antd";
import MissionsList from "../MissionsList";
import OnUsingNFTs from '../OnUsingNFTs';
import Statistics from '../Statistics';

const Missions = () => {
  const [dailyMission, setDailyMission] = useState([]);

  const [getDailyMission] = useMutation(GET_DAILY_MISSION, {
    variables: {
      game_uid: '3',
    },
    context: {
      endpoint: 'p2e'
    }
  })
  const [updateDailyMission] = useMutation(UPDATE_DAILY_MISSION, {
    variables: {
      game_uid: '3',
    },
    context: {
      endpoint: 'p2e'
    }
  })

  const handleUpdateMissions = () => {
    updateDailyMission()
      .then(response => {
        setDailyMission(response.data.updateDailyMission)
      })
  }

  useEffect(() => {
    getDailyMission()
      .then(response => {
        setDailyMission(response.data.getDailyMission)
      })
  }, [])

  return (
    <div className={s.dailyContainer}>
      <div className={s.userInfo}>

      </div>
      <div className={s.gameInfo}>
        <Image src="/assets/P2E/csgo-logo-icon.png" preview={false} alt="" />
        <h3>CS:GO FACEIT</h3>
      </div>

      <Statistics />
      <OnUsingNFTs />
      <MissionsList
        title="Lucis missions"
        description="Complete the missions to get reward and up level"
        missions={dailyMission}
        handleUpdateMissions={handleUpdateMissions}
        canChooseGame
      />
    </div>
  )
}

export default Missions