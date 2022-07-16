import React, { useEffect, useState } from 'react'
import s from './dashboard.module.sass'
import { Col, Row, Spin } from "antd"
import {

  GET_CSGO_RECENT_MATCHES,
  GET_LOL_RECENT_MATCHES,
  GET_STATISTICS,
  useGetRecentCsgoMatches
} from "../../../../hooks/p2e/useP2E";

import { useQuery } from "@apollo/client";
import { CsgoPlayerMatch, LolPlayerMatchGql } from "../../../../src/generated/graphql_p2e";
import { RecentMatchListCSGO } from '../recentMatchComponent/RecentMatchListCSGO';
import SidebarRight from '../SidebarRight';
import { Game } from 'utils/Enum';
import { RecentMatchListLOL } from '../recentMatchComponent/RecentMatchListLOL';
import MissionService from 'components/service/p2e/MissionService';

interface IProps {
  currentGame?: Game;
}

const RecentMatchHistory = (props: IProps) => {
  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  });
  const [currentLimit, setCurrentLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [recentMatches, setRecentMatches] = useState<CsgoPlayerMatch[] | LolPlayerMatchGql[]>([]);

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
      queryData();
    }
  }, [props?.currentGame])
  const queryData = async () => {
    setLoading(true);
    switch (props.currentGame) {
      case Game.CSGO:
        const csgo = await MissionService.getCSGORecentMatch(1,currentLimit);
        setLoading(false);
        setCurrentLimit(currentLimit + 5);
        setRecentMatches(csgo.data?.getRecentlyCsgoMatch?.matches as CsgoPlayerMatch[]);
        setTotalItem(csgo.data?.getRecentlyCsgoMatch?.total as number)
        break;
      case Game.LOL:
        const lol = await MissionService.getLOLRecentMatch(1,currentLimit);
        setLoading(false);
        setCurrentLimit(currentLimit + 5);
        setRecentMatches(lol.data?.getRecentlyLolMatch?.matches as LolPlayerMatchGql[]);
        setTotalItem(lol.data?.getRecentlyLolMatch?.total as number)
        break;
    }

  }

  useEffect(() => {
    if (props.currentGame) {
      queryData();
    }
  }, [props.currentGame])

  const RecentMatchListRender = () => {
    switch (props.currentGame) {
      case Game.CSGO:
        return <RecentMatchListCSGO
          recentMatches={recentMatches as CsgoPlayerMatch[]}
          loading={loading}
          title="Recent matches history"
          hasButtonBack
        />;
      case Game.LOL:
        return <RecentMatchListLOL
          recentMatches={recentMatches as LolPlayerMatchGql[]}
          loading={loading}
          title="Recent matches history"
          hasButtonBack
        />;
      default:
        return null;
    }
  }

  return (
    <div className="lucis-container-2">
      <div className={s.dailyContainer}>
        <SidebarRight
          onlyWallet
          lucisPoint={statisticQuery?.data?.getBalance?.lucis_point}
          lucisToken={statisticQuery?.data?.getBalance?.lucis_token} />
        <Row gutter={40}>
          <Col lg={16} md={24}>
            {RecentMatchListRender()}
            {currentLimit < (totalItem as number) &&
              <div className={s.viewAllHistory}>
                <span onClick={() => queryData()}>
                  {loading ? <Spin /> :
                    "View more"}</span>
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
  )
}

export default RecentMatchHistory