import React, {useEffect, useState} from 'react'
import s from './Daily.module.sass'
import {Button, Col, Image, Progress, Row} from "antd"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faRepeat} from '@fortawesome/free-solid-svg-icons'
import AuthStore from "../../../Auth/AuthStore";
import {GET_DAILY_MISSION, UPDATE_DAILY_MISSION, useGetRecentMatches} from "../../../../hooks/p2e/useP2E";
import {isEmpty} from "lodash";
import {Mission} from "../../../../src/generated/graphql";
import moment from "moment";
import SpinLoading from "../../common/Spin";
import {useMutation} from "@apollo/client";

const DailyMission = () => {
  const userInfo = AuthStore
  const [dailyMission, setDailyMission] = useState([])
  const [getDailyMission] = useMutation(GET_DAILY_MISSION, {
    variables: {
      game_uid: '3',
    },
  })
  const [updateDailyMission] = useMutation(UPDATE_DAILY_MISSION, {
    variables: {
      game_uid: '3',
    },
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
      <div className={s.missionsWrap}>
        <div className={s.missionsWrapHeader}>
          <h2>Daily missions</h2>
          <Button onClick={handleUpdateMissions}>
            <FontAwesomeIcon icon={faRepeat} />
            <span>Update</span>
          </Button>
        </div>
        <div className={s.missionsList}>
          {isEmpty(dailyMission) ? <SpinLoading /> : (
            dailyMission.map((mission: Mission) => {
              const achived = (mission?.player_mission && (mission?.player_mission?.length > 0)) ? (mission?.player_mission[0]?.achived as unknown as number) : 0
              const currentPercent = ((achived/(mission?.goal as unknown as number)) * 100)
              return (
                <div className={s.missionItem} key={mission?.uid}>
                  <div className={s.missionLogo}>
                    <Image src="/assets/P2E/gun.png" preview={false} alt="" />
                  </div>
                  <div className={s.missionInfo}>
                    <h4>{mission?.title}</h4>
                    <Row className={s.missionReward}>
                      <Col xs={{ span: 3 }}>Reward</Col>
                      <Col xs={{ span: 21 }}>
                        <p>{mission?.lucis_point} Lucis point</p>
                        <p>{mission?.lucis_token} Lucis token</p>
                      </Col>
                    </Row>
                    <div className={s.missionProgress}>
                      <div>0</div>
                      <Progress percent={currentPercent} format={percent => ''} />
                      <div>{mission?.goal}</div>
                    </div>
                  </div>
                  <div className={s.missionAction}>
                    <Button disabled>Claim</Button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
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