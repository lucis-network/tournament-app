import React, {useEffect, useState} from 'react'
import s from './Daily.module.sass'
import {Button, Image} from "antd"
import {GET_DAILY_MISSION, UPDATE_DAILY_MISSION, useGetRecentMatches} from "../../../../hooks/p2e/useP2E";
import {isEmpty} from "lodash";
import moment from "moment";
import SpinLoading from "../../common/Spin";
import {useMutation} from "@apollo/client";
import MissionsList from "../MissionsList";
import {PlayerMission} from "../../../../src/generated/graphql_p2e";

const DailyMission = () => {
  const [dailyMission, setDailyMission] = useState<PlayerMission[]>([])
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

  const { getRecentMatchesLoading, getRecentMatchesData } = useGetRecentMatches()

  // if (getDailyMissionLoading || isEmpty(getDailyMissionData)) return null

  const handleUpdateMissions = () => {
    updateDailyMission()
      .then(response => {
        setDailyMission(response.data.updateDailyMission)
      })
    // refetchDailyMission()
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
      <MissionsList title="Daily missions" missions={dailyMission} handleUpdateMissions={handleUpdateMissions} />
      <div className={s.recentMatchesWrap}>
        <h2>Recent matches</h2>
        <div className={s.recentMatchesList}>
          {getRecentMatchesLoading ? <SpinLoading /> : (
            !isEmpty(getRecentMatchesData?.getRecentlyMatch) && getRecentMatchesData?.getRecentlyMatch.map(match => {
              const endAt = moment.unix(match?.end_at as number).fromNow()

              return (
                <div className={s.recentMatchesItem} key={match?.match_uid}>
                  <div className={s.recentMatchesLogo}>
                    <Image src="/assets/P2E/csgo-logo-icon.png" preview={false} alt="" />
                  </div>
                  <div className={s.recentMatchReward}>1000 Lucis point</div>
                  <div className={s.recentMatchReward}>100 Lucis token</div>
                  <div className={s.recentMatchScore}>{match?.score}</div>
                  <div className={s.recentMatchTime}>{endAt}</div>
                  <div className={s.recentMatchActions}>
                    <Button disabled>Claim</Button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default DailyMission