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
  GET_CSGO_RECENT_MATCHES,
  UPDATE_LOL_RECENTLY_MATCH
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

  const [updateCSGORecentlyMatch] = useMutation(UPDATE_CSGO_RECENTLY_MATCH, {
    variables: {
      platform_id: 1
    },
    context: {
      endpoint: 'p2e'
    }
  })

  const [updateLOLRecentlyMatch] = useMutation(UPDATE_LOL_RECENTLY_MATCH, {
    variables: {
      platform_id: 4
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
    const missionUpdate = await updateDailyMission();
    
    queryDataRecentMatches(props.currentGame as Game);
    statisticQuery.refetch();
    setDailyMission(missionUpdate.data.updateDailyMission);

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

  const queryDataDailyMission = async (variables: { game_uid: string, platform_id: number }, game: Game) => {
    switch (game) {
      case Game.CSGO:
        const promiseDailyCsgo = await getDailyMission({ variables });
        setDailyMission(promiseDailyCsgo.data.getOrSetDailyMission);
        return;
      case Game.LOL:
        const promiseDailyLol = await getDailyMission({ variables });
        setDailyMission(promiseDailyLol.data.getOrSetDailyMission);
        return;

      default:
        break;
    }


  }

  const queryDataRecentMatches = async (game: Game) => {
    switch (game) {
      case Game.CSGO:
        const promiseCsgo = await csgoRecentMatchQuery.refetch({
          offset: 1,
          limit: 5,
          platform_id: 1
        });
        setRecentlyMatches(promiseCsgo.data?.getRecentlyCsgoMatch?.matches as CsgoPlayerMatch[]);
        return;
      case Game.LOL:
        const promiseLol = await lolRecentMatchQuery.refetch({
          offset: 1,
          limit: 5,
          platform_id: 4
        })
        setRecentlyMatches(promiseLol.data?.getRecentlyLolMatch?.matches as LolPlayerMatchGql[]);
        return;

      default:
        break;
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
      await isClaimBoxQuery.refetch(dailyMissionVariables);
      await statisticQuery.refetch();

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
            lucisPoint={statisticQuery?.data?.getBalance?.lucis_point}
            lucisToken={statisticQuery?.data?.getBalance?.lucis_point} />
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
                handleUpdateStatistic={() => statisticQuery.refetch()}
                onClaimBox={onClaimBox}
                loading={stateDailyMissionFetch.loading}
                isClaimBox={isClaimBoxQuery?.data?.isClaimBox ?? false}
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
                lucisPoint={statisticQuery?.data?.getBalance?.lucis_point}
                lucisToken={statisticQuery?.data?.getBalance?.lucis_token}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Dashboard