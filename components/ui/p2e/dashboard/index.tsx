import React, { useEffect, useState } from 'react'
import s from './dashboard.module.sass'
import { Col, message, Modal, Row } from "antd"
import {
  CLAIM_BOX,
  GET_OR_SET_DAILY_MISSION,
  GET_STATISTICS,
  IS_CLAIM_BOX,
  UPDATE_DAILY_MISSION,
  UPDATE_CSGO_RECENTLY_MATCH,
  useGetRecentCsgoMatches,
  GET_LOL_RECENT_MATCHES,
  GET_CSGO_RECENT_MATCHES
} from "../../../../hooks/p2e/useP2E";

import { useMutation, useQuery } from "@apollo/client";
import { CsgoMatch, CsgoPlayerMatch, LolPlayerMatchGql, PlayerMission } from "../../../../src/generated/graphql_p2e";
import { RecentMatchListCSGO } from '../recentMatchComponent/RecentMatchListCSGO';
import NFTList from '../NFTList';
import { handleGraphqlErrors } from 'utils/apollo_client';
import MissionList from '../missionComponent/MissionList';
import SidebarRight from '../SidebarRight';
import { useRouter } from 'next/router';
import ButtonWrapper from 'components/common/button/Button';
import { Game } from 'utils/Enum';
import { RecentMatchListLOL } from '../recentMatchComponent/RecentMatchListLOL';


interface IProps {
  currentGame?: Game;
}
const Dashboard = (props: IProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dailyMission, setDailyMission] = useState<PlayerMission[]>([])
  const [recentlyMatches, setRecentlyMatches] = useState<CsgoPlayerMatch[] | LolPlayerMatchGql[]>([])
  const [showGiftBox, setShowGiftBox] = React.useState<boolean>(false);
  const [dailyMissionVariables, setDailyMissionVariables] =
    React.useState<{ game_uid: string, platform_id: number }>({
      game_uid: '03',
      platform_id: 1
    });

  const [isClaimBox, setIsClaimBox] = React.useState<boolean>(false);
  const [statistic, setStatistic] = React.useState<{ lucis_point: number, lucis_token: number }>({ lucis_point: 0, lucis_token: 0 });
  const [getDailyMission, stateDailyMissionFetch] = useMutation(GET_OR_SET_DAILY_MISSION, {
    variables: dailyMissionVariables,
    context: {
      endpoint: 'p2e'
    }
  })

  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  })

  const lolRecentMatchQuery = useQuery(GET_LOL_RECENT_MATCHES, {
    context: {
      endpoint: 'p2e'
    },
    variables: {
      offset: 1,
      limit: 5,
      platform_id: 4
    },
    skip: true
  })

  const csgoRecentMatchQuery = useQuery(GET_CSGO_RECENT_MATCHES, {
    context: {
      endpoint: 'p2e'
    },
    variables: {
      offset: 1,
      limit: 5,
      platform_id: 1
    },
    skip: true
  })

  const isClaimBoxQuery = useQuery(IS_CLAIM_BOX, {
    variables: dailyMissionVariables,
    context: {
      endpoint: 'p2e'
    }
  });

  const [updateDailyMission] = useMutation(UPDATE_DAILY_MISSION, {
    variables: dailyMissionVariables,
    context: {
      endpoint: 'p2e'
    }
  })

  const [updateRecentlyMatch] = useMutation(UPDATE_CSGO_RECENTLY_MATCH, {
    variables: {
      platform_id: 1
    },
    context: {
      endpoint: 'p2e'
    }
  })

  const [claimBox] = useMutation(CLAIM_BOX, {
    context: {
      endpoint: 'p2e'
    }
  })

  // const { getRecentMatchesLoading, getRecentMatchesData } = useGetRecentCsgoMatches({
  //   offset: 1,
  //   limit: 5,
  //   platform_id: 1
  // })

  // if (getDailyMissionLoading || isEmpty(getDailyMissionData)) return null

  const handleUpdateMissions = async (showMessage = true, loadingUpdateIcon = true) => {
    if (loadingUpdateIcon) {
      setLoading(true);
    }

    const promise = await Promise.all([
      updateDailyMission(),
      updateRecentlyMatch(),
    ])
    const sta = await statisticQuery.refetch();
    setStatistic({ lucis_point: sta?.data?.getBalance?.lucis_point, lucis_token: sta?.data?.getBalance?.lucis_token })
    setDailyMission(promise[0].data.updateDailyMission)
    if (promise[1].data.updateCsgoRecentlyMatch.length > 0) {
      setRecentlyMatches([...promise[1].data.updateCsgoRecentlyMatch, ...recentlyMatches]);
    }
    setLoading(false);
    if (showMessage) {
      message.success("Success!");
    }
  }

  useEffect(() => {
    let variables = dailyMissionVariables;
    switch (props.currentGame) {
      case Game.CSGO:
        variables = {
          game_uid: '03',
          platform_id: 1
        };
        setDailyMissionVariables(variables);
        break;
      case Game.LOL:
        variables = {
          game_uid: '06',
          platform_id: 4
        };
        setDailyMissionVariables(variables);
        break;

      default:
        break;
    }
    if (props.currentGame) {
      queryDataDailyMission(variables, props.currentGame);
      queryDataRecentMatches(props.currentGame);

    }

  }, [props.currentGame])

  React.useEffect(() => {
    setStatistic({ lucis_point: statisticQuery.data?.getBalance?.lucis_point, lucis_token: statisticQuery?.data?.getBalance?.lucis_token })
  },[statisticQuery.data])
  const queryDataDailyMission = async (variables: { game_uid: string, platform_id: number }, game: Game) => {
    if (game === Game.CSGO) {
      const promiseDaily = await getDailyMission({ variables });
      setDailyMission(promiseDaily.data.getOrSetDailyMission);
      const is = await isClaimBoxQuery.refetch(variables);
      setIsClaimBox(is?.data?.isClaimBox);
      return;
    }

    if (game === Game.LOL) {
      const promiseDaily = await getDailyMission({ variables });
      setDailyMission(promiseDaily.data.getOrSetDailyMission);
      const is = await isClaimBoxQuery.refetch(variables);
      setIsClaimBox(is?.data?.isClaimBox);
      return;
    }

  }

  const queryDataRecentMatches = async (game: Game) => {
    if (game === Game.CSGO) {
      const promise = await csgoRecentMatchQuery.refetch({
        offset: 1,
        limit: 5,
        platform_id: 1
      });
      setRecentlyMatches(promise.data?.getRecentlyCsgoMatch?.matches as CsgoPlayerMatch[]);
      return;
    }

    if (game === Game.LOL) {
      const promise = await lolRecentMatchQuery.refetch({
        offset: 1,
        limit: 5,
        platform_id: 4
      })
      setRecentlyMatches(promise.data?.getRecentlyLolMatch?.matches as LolPlayerMatchGql[]);
      return;
    }
  }
  // useEffect(() => {
  //   setRecentlyMatches(getRecentMatchesData?.getRecentlyCsgoMatch?.matches as CsgoPlayerMatch[]);
  // }, [getRecentMatchesData])


  const onClaimBox = async () => {
    try {
      await claimBox({
        variables: dailyMissionVariables
      })
      const is = await isClaimBoxQuery.refetch(dailyMissionVariables);
      const sta = await statisticQuery.refetch();
      setStatistic({ lucis_point: sta?.data?.getBalance?.lucis_point, lucis_token: sta?.data?.getBalance?.lucis_token })
      setIsClaimBox(is?.data?.isClaimBox);

      setShowGiftBox(true);
    } catch (error: any) {
      handleGraphqlErrors(error, (code) => {
        switch (code) {
          case "MISSION_NOT_COMPLETE":
            message.error("You must complete all mission to claim!");
            return;
          case "HAS_CLAIMED":
            message.error("You has claimed!");
            return;
          case "INVALID_PLATFORM_ID":
            message.error("You must connect faceit to continue!");
            return;
          default:
            message.error("Something was wrong! Please contact to Lucis network!");
            return;
        }
      })
    }
  }

  const RecentMatchListRender = () => {
    switch (props.currentGame) {
      case Game.CSGO:
        return <RecentMatchListCSGO
          recentMatches={recentlyMatches as CsgoPlayerMatch[]}
          loading={csgoRecentMatchQuery.loading} />;
      case Game.LOL:
        return <RecentMatchListLOL
          recentMatches={recentlyMatches as LolPlayerMatchGql[]}
          loading={lolRecentMatchQuery.loading} />;

      default:
        return <RecentMatchListCSGO
          recentMatches={recentlyMatches as CsgoPlayerMatch[]}
          loading={csgoRecentMatchQuery.loading} />;
    }
  }

  return (
    <>
      <Modal
        centered
        closable={false}
        visible={showGiftBox}
        onCancel={() => setShowGiftBox(false)}
        footer={[


        ]}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ textAlign: "center", fontSize: 30, margin: 0 }}>Congratulations</p>
          <img src="/assets/P2E/csgo/box-open.png" alt="" width="300" />
          <p style={{ textAlign: "center" }}>You have successfully claimed 30 Lucis points!</p>
          <div style={{ textAlign: 'center' }} key="open-box-ok">
            <ButtonWrapper style={{ textAlign: "center" }} onClick={() => setShowGiftBox(false)}>OK</ButtonWrapper>
          </div>
        </div>
      </Modal>
      <div className="lucis-container-2">
        <div className={s.dailyContainer}>
          <SidebarRight
            onlyWallet
            lucisPoint={statistic.lucis_point}
            lucisToken={statistic.lucis_point} />
          <Row gutter={51}>
            <Col lg={16} md={24}>
              <div>
                {/* <h2>
                Your NFTs card
              </h2> */}
                <NFTList />
              </div>
              <div className={s.dailyTitle}>
                <h2>
                  Daily Mission
                </h2>
              </div>
              <MissionList
                title="Daily missions"
                missions={dailyMission}
                handleUpdateMissions={(showMessage, loadingIcon) => handleUpdateMissions(showMessage, loadingIcon)}
                onClaimBox={onClaimBox}
                loading={stateDailyMissionFetch.loading}
                isClaimBox={isClaimBox ?? false}
                loadingUpdate={loading}
                isDailyMission
                currentGame={props.currentGame}
              />
              {RecentMatchListRender()}
              {recentlyMatches?.length !== 0 && <div className={s.viewAllHistory}>
                <span onClick={() => router.push("/p2e/dashboard/history")}>View all history</span>
              </div>}
            </Col>
            <Col lg={8} md={24}>
              <SidebarRight
                lucisPoint={statistic.lucis_point}
                lucisToken={statistic.lucis_token}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Dashboard