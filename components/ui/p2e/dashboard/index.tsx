import React, { useEffect, useState } from 'react'
import s from './dashboard.module.sass'
import { Col, message, Modal, Row } from "antd"
import {
  CLAIM_BOX,
  GET_DAILY_POINT,
  GET_OR_SET_DAILY_MISSION,
  GET_STATISTICS,
  IS_CLAIM_BOX,
  UPDATE_DAILY_MISSION,
  UPDATE_RECENTLY_MATCH,
  useGetRecentMatches
} from "../../../../hooks/p2e/useP2E";

import { useMutation, useQuery } from "@apollo/client";
import { GMatch, GPlayerMatch, PlayerMission } from "../../../../src/generated/graphql_p2e";
import { RecentMatchList } from '../RecentMatchList';
import NFTList from '../NFTList';
import { handleGraphqlErrors } from 'utils/apollo_client';
import DailyMissionList from '../missionComponent/DailyMissionList';
import SidebarRight from '../missionComponent/SidebarRight';
import { useRouter } from 'next/router';
import ButtonWrapper from 'components/common/button/Button';

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dailyMission, setDailyMission] = useState<PlayerMission[]>([])
  const [recentlyMatches, setRecentlyMatches] = useState<GPlayerMatch[]>([])
  const [showGiftBox, setShowGiftBox] = React.useState<boolean>(false);
  const [getDailyMission, stateDailyMissionFetch] = useMutation(GET_OR_SET_DAILY_MISSION, {
    variables: {
      game_uid: '03',
      platform_id: 1
    },
    context: {
      endpoint: 'p2e'
    }
  })

  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  });

  const isClaimBoxQuery = useQuery(IS_CLAIM_BOX, {
    context: {
      endpoint: 'p2e'
    },
    variables: {
      game_uid: '03',
      platform_id: 1
    },
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

  const [updateRecentlyMatch] = useMutation(UPDATE_RECENTLY_MATCH, {
    variables: {
      game_uid: '03',
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

  const { getRecentMatchesLoading, getRecentMatchesData } = useGetRecentMatches({
    game_uid: '03',
    offset: 1,
    limit: 5,
    platform_id: 1
  })

  // if (getDailyMissionLoading || isEmpty(getDailyMissionData)) return null

  const handleUpdateMissions = async (showMessage = true, loadingUpdateIcon = true) => {
    if (loadingUpdateIcon) {
      setLoading(true);
    }

    const promise = await Promise.all([
      updateDailyMission(),
      updateRecentlyMatch(),
      statisticQuery.refetch()
    ])
    setDailyMission(promise[0].data.updateDailyMission)
    setRecentlyMatches([...promise[1].data.updateRecentlyMatch, ...recentlyMatches]);
    setLoading(false);
    if (showMessage) {
      message.success("Success!");
    }
  }

  useEffect(() => {
    getDailyMission()
      .then(response => {
        setDailyMission(response.data.getOrSetDailyMission)
      });
  }, [])

  useEffect(() => {
    setRecentlyMatches(getRecentMatchesData?.getRecentlyMatch?.matches as GPlayerMatch[]);
  }, [getRecentMatchesData])

  const onClaimBox = async () => {
    try {
      await claimBox({
        variables: {
          game_uid: '03',
          platform_id: 1
        }
      })
      await statisticQuery.refetch();
      await isClaimBoxQuery.refetch();

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

  return (
    <>
      <Modal
        centered
        closable={false}
        visible={showGiftBox}
        onCancel={() => setShowGiftBox(false)}
        footer={[
          <div style={{ textAlign: 'center' }} key="open-box-ok">
            <ButtonWrapper style={{ textAlign: "center" }} onClick={() => setShowGiftBox(false)}>OK</ButtonWrapper>
          </div>

        ]}
      >
        <div>
          <p style={{ textAlign: "center" }}>You have successfully claimed 30 lucis point!</p>
          <img src="/assets/P2E/csgo/box-open.png" alt="" />
        </div>
      </Modal>
      <div className="lucis-container-2">
        <div className={s.dailyContainer}>
          <SidebarRight onlyWallet balance={statisticQuery?.data?.getBalance} />
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
              <DailyMissionList
                title="Daily missions"
                missions={dailyMission}
                handleUpdateMissions={(showMessage) => handleUpdateMissions(showMessage)}
                onClaimBox={onClaimBox}
                loading={stateDailyMissionFetch.loading}
                isClaimBox={isClaimBoxQuery?.data?.isClaimBox ?? false}
                loadingUpdate={loading} />
              <RecentMatchList recentMatches={recentlyMatches} loading={getRecentMatchesLoading} />
              {recentlyMatches?.length !== 0 && <div className={s.viewAllHistory}>
                <span onClick={() => router.push("/p2e/dashboard/history")}>View all history</span>
              </div>}
            </Col>
            <Col lg={8} md={24}>
              <SidebarRight balance={statisticQuery?.data?.getBalance} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Dashboard