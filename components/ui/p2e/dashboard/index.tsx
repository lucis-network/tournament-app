import React, {useEffect, useState} from 'react'
import s from './dashboard.module.sass'
import {Col, message, Modal, Row} from "antd"
import {
  CLAIM_BOX,
  GET_STATISTICS, HAS_JOINED_DISCORD,
  IS_CLAIM_BOX,
} from "../../../../hooks/p2e/useP2E";

import {useMutation, useQuery} from "@apollo/client";
import {CsgoMatch, CsgoPlayerMatch, LolPlayerMatchGql, PlayerMission} from "../../../../src/generated/graphql_p2e";
import {RecentMatchListCSGO} from '../recentMatchComponent/RecentMatchListCSGO';
import NFTList from '../NFTList';
import {handleGraphqlErrors} from 'utils/apollo_client';
import MissionList from '../missionComponent/MissionList';
import SidebarRight from '../SidebarRight';
import {useRouter} from 'next/router';
import ButtonWrapper from 'components/common/button/Button';
import {Game} from 'utils/Enum';
import {RecentMatchListLOL} from '../recentMatchComponent/RecentMatchListLOL';
import MissionService from 'components/service/p2e/MissionService';
import Link from 'next/link';
import {AppEmitter} from "../../../../services/emitter";


interface IProps {
  currentGame?: Game;
}

const Dashboard = (props: IProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dailyMission, setDailyMission] = useState<PlayerMission[] | undefined>([]);
  const [loadingDailyMission, setLoadingDailyMission] = useState(false);
  const [loadingRecentMatch, setLoadingRecentMatch] = useState(false);

  const [recentlyMatches, setRecentlyMatches] = useState<CsgoPlayerMatch[] | LolPlayerMatchGql[]>([])
  const [dailyPointRecentMatch, setDailyPointRecentMatch] = useState<{ day: number, month: number, year: number, point: number }[]>();
  const [maxPointRecentMatch, setMaxPointRecentMatch] = React.useState("");
  const [showGiftBox, setShowGiftBox] = React.useState<boolean>(false);
  const [isClaimBox, setIsClaimBox] = React.useState(false);
  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  })

  const handleUpdateMissions = async (showMessage = true, loadingUpdateIcon = true) => {
    if (loadingUpdateIcon) {
      setLoading(true);
    }
    const missionUpdate = await MissionService.updateDailyMission();

    queryDataRecentMatches(props.currentGame as Game);
    statisticQuery.refetch().then((res) => {
        AppEmitter.emit("updateBalance",
          {
            balance: {
              lucis_point: res.data?.getBalance?.lucis_point,
              lucis_token: res.data?.getBalance?.lucis_token
            }
          })
      }
    );
    setDailyMission(missionUpdate?.data?.updateDailyMission);

    setLoading(false);
    if (showMessage) {
      message.success("Success!");
    }
  }

  useEffect(() => {
    switch (props.currentGame) {
      case Game.CSGO:
        MissionService.setVariable("03", 1);
        break;
      case Game.LOL:
        MissionService.setVariable("06", 4);
        break;

      default:
        break;
    }
    if (props.currentGame) {
      queryDataDailyMission();
      queryDataRecentMatches(props.currentGame);
      queryIsClaimBox();
    }

  }, [props.currentGame])

  const queryDataDailyMission = async () => {
    setLoadingDailyMission(true);
    const promiseDaily = await MissionService.getOrSerDailyMission();
    setDailyMission(promiseDaily?.data?.getOrSetDailyMission);
    setLoadingDailyMission(false);
  }

  const queryIsClaimBox = async () => {
    const res = await MissionService.isClaimBox();
    setIsClaimBox(res?.data?.isClaimBox)
  }

  const queryDataRecentMatches = async (game: Game) => {
    setLoadingRecentMatch(true);
    switch (game) {
      case Game.CSGO:
        const promiseCsgo = await MissionService.getCSGORecentMatch(1, 5);
        setRecentlyMatches(promiseCsgo.data?.getRecentlyCsgoMatch?.matches as CsgoPlayerMatch[]);
        setDailyPointRecentMatch(promiseCsgo?.data?.getRecentlyCsgoMatch?.daily_point as any);
        setMaxPointRecentMatch(promiseCsgo?.data?.getRecentlyCsgoMatch?.max_point as any);
        setLoadingRecentMatch(false);
        return;
      case Game.LOL:
        const promiseLol = await MissionService.getLOLRecentMatch(1, 5);
        setRecentlyMatches(promiseLol.data?.getRecentlyLolMatch?.matches as LolPlayerMatchGql[]);
        setDailyPointRecentMatch(promiseLol?.data?.getRecentlyLolMatch?.daily_point as any);
        setMaxPointRecentMatch(promiseLol?.data?.getRecentlyLolMatch?.max_point as any);
        setLoadingRecentMatch(false);
        return;

      default:
        break;
    }
  }

  const onClaimBox = async () => {
    try {
      await MissionService.claimBox();
      const isClaimBoxRes = await MissionService.isClaimBox();
      statisticQuery.refetch().then((res) => {
          AppEmitter.emit("updateBalance",
            {
              balance: {
                lucis_point: res.data?.getBalance?.lucis_point,
                lucis_token: res.data?.getBalance?.lucis_token
              }
            })
        }
      );
      setIsClaimBox(isClaimBoxRes?.data?.isClaimBox);

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
          dailyPoint={dailyPointRecentMatch}
          maxPoint={maxPointRecentMatch}
          loading={loadingRecentMatch}/>;
      case Game.LOL:
        return <RecentMatchListLOL
          recentMatches={recentlyMatches as LolPlayerMatchGql[]}
          dailyPoint={dailyPointRecentMatch}
          maxPoint={maxPointRecentMatch}
          loading={loadingRecentMatch}/>;

      default:
        return null;
    }
  }

  return (
    <>
      <Modal
        centered
        closable={false}
        visible={showGiftBox}
        onCancel={() => setShowGiftBox(false)}
        footer={[]}
      >
        <div style={{textAlign: "center"}}>
          <p style={{textAlign: "center", fontSize: 30, margin: 0}}>Congratulations</p>
          <img src="/assets/P2E/csgo/box-open.png" alt="" width="300"/>
          <p style={{textAlign: "center"}}>You have successfully claimed 30 Lucis points!</p>
          <div style={{textAlign: 'center'}} key="open-box-ok">
            <ButtonWrapper style={{textAlign: "center"}} onClick={() => setShowGiftBox(false)}>OK</ButtonWrapper>
          </div>
        </div>
      </Modal>
      <div className="lucis-container-2">
        <div className={s.dailyContainer}>
          <SidebarRight
            onlyWallet
            lucisPoint={statisticQuery?.data?.getBalance?.lucis_point}
            lucisToken={statisticQuery?.data?.getBalance?.lucis_point}/>
          <Row gutter={51}>
            <Col lg={16} md={24}>
              <div>
                {/* <h2>
                Your NFTs card
              </h2> */}
                <NFTList currentGame={props.currentGame}/>
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
                handleUpdateStatistic={() => statisticQuery.refetch().then((res) => {
                    AppEmitter.emit("updateBalance",
                      {
                        balance: {
                          lucis_point: res.data?.getBalance?.lucis_point,
                          lucis_token: res.data?.getBalance?.lucis_token
                        }
                      })
                  }
                )}
                onClaimBox={onClaimBox}
                loading={loadingDailyMission}
                isClaimBox={isClaimBox ?? false}
                loadingUpdate={loading}
                isDailyMission
                currentGame={props.currentGame}
              />
              {RecentMatchListRender()}
              {recentlyMatches?.length !== 0 && <div className={s.viewAllHistory}>
                  <Link passHref href="/playcore/dashboard/history">
                      <a onClick={() => router.push("/playcore/dashboard/history")}>View all history</a>
                  </Link>
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