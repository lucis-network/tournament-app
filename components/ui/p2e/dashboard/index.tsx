import React, { useEffect, useState } from 'react'
import s from './dashboard.module.sass'
import { Button, Col, Image, message, Row } from "antd"
import { GET_OR_SET_DAILY_MISSION, GET_STATISTICS, UPDATE_DAILY_MISSION, useGetRecentMatches } from "../../../../hooks/p2e/useP2E";
import { isEmpty } from "lodash";
import moment from "moment";
import SpinLoading from "../../common/Spin";
import { useMutation, useQuery } from "@apollo/client";
import MissionsList from "../MissionsList";
import { PlayerMission } from "../../../../src/generated/graphql_p2e";
import Statistics from "../Statistics";
import OnUsingNFTs from '../OnUsingNFTs';

const DailyMission = () => {
  const [lengthShowMore, setLengthShowMore] = useState(5);
  const [loading, setLoading] = useState(false);
  const [dailyMission, setDailyMission] = useState<PlayerMission[]>([])
  const [getDailyMission, stateDailyMissionFetch] = useMutation(GET_OR_SET_DAILY_MISSION, {
    variables: {
      game_uid: '03',
      platform_id: 1
    },
    context: {
      endpoint: 'p2e'
    }
  })

  const { error, data, refetch } = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  });

  const [updateDailyMission] = useMutation(UPDATE_DAILY_MISSION, {
    variables: {
      game_uid: '03',
      platform_id: 1
    },
    context: {
      endpoint: 'p2e'
    }
  })

  const { getRecentMatchesLoading, getRecentMatchesData, refetchRecentMatches } = useGetRecentMatches({
    game_uid: '03',
    offset: 1,
    limit: 5,
    platform_id: 1
  })

  // if (getDailyMissionLoading || isEmpty(getDailyMissionData)) return null

  const handleUpdateMissions = async () => {
    setLoading(true);
    const dailyMissions = await updateDailyMission();
    setDailyMission(dailyMissions.data.updateDailyMission)
    await refetchRecentMatches()
    // refetchDailyMission()
    await refetch();
    setLoading(false);
    message.success("update successfully!");
  }

  useEffect(() => {
    getDailyMission()
      .then(response => {
        setDailyMission(response.data.getOrSetDailyMission)
      });
  }, [])

  const loadMore = () => {
    setLengthShowMore(lengthShowMore + 5);
  };

  return (
    <div className="lucis-container-2">
      <Row>
        <Col span={24}>
          <div className={s.dailyContainer}>
            <div className={s.gameInfo}>
              <Image src="/assets/P2E/csgo-logo-icon.png" preview={false} alt="" />
              <h3>CS:GO FACEIT</h3>
            </div>
            <Statistics balance={{ lucisPoint: data?.getBalance?.lucis_point, lucisToken: data?.getBalance?.lucis_token }} />
            {/* <OnUsingNFTs /> */}
            <MissionsList loadingUpdate={loading} title="Daily missions" missions={dailyMission} handleUpdateMissions={handleUpdateMissions} loading={stateDailyMissionFetch.loading} />
            <div className={s.recentMatchesWrap}>
              <h2>Recent matches</h2>
              <div className={s.recentMatchesList}>
                {getRecentMatchesLoading ? <SpinLoading /> : (
                  !isEmpty(getRecentMatchesData?.getRecentlyMatch?.matches) && getRecentMatchesData?.getRecentlyMatch?.matches?.map((item, index) => {
                    // const endAt = moment.unix(item?.match?.end_at as number).fromNow()

                    return (
                      <div className={s.recentMatchesItem} key={`${item?.match_uid}-${index}`}>
                        <div className={s.recentMatchesLogo}>
                          <Image src="/assets/P2E/csgo-logo-icon.png" preview={false} alt="" />
                        </div>
                        <div className={s.recentMatchReward}>{item?.lucis_point} lucis point</div>
                        {/* <div className={s.recentMatchReward}>100 Lucis token</div> */}
                        <div className={s.recentMatchScore}>{item?.match?.score}</div>
                        <div className={s.recentMatchTime}>{new Date(item?.match?.end_at).toLocaleString()}</div>
                        {/* <div className={s.recentMatchActions}>
                          <Button disabled>Claim</Button>
                        </div> */}
                      </div>
                    )
                  })
                )}
                {/* {FETCH_API.length > 5 && lengthShowMore < FETCH_API.length && (
                  <div className={s.recentMatchesBtn}>
                    <Button onClick={loadMore} loading={loading}>Load more</Button>
                  </div>
                )}
                {getRecentMatchesData?.getRecentlyMatch?.matches?.length == 0 && (
                  <div className={s.recentMatchesNodata}>No data Recent matches</div> */}
                {/* )} */}

              </div>
            </div>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default DailyMission