import React from 'react'
import s from './dashboard.module.sass'
import { Col, Row, Spin } from "antd"
import {

  GET_STATISTICS,
  useGetRecentMatches
} from "../../../../hooks/p2e/useP2E";

import { useQuery } from "@apollo/client";
import { CsgoPlayerMatch } from "../../../../src/generated/graphql_p2e";
import { RecentMatchListCSGO } from '../recentMatchComponent/RecentMatchListCSGO';
import SidebarRight from '../SidebarRight';
import { Game } from 'utils/Enum';

interface IProps {
  currentGame: Game;
}
const RecentMatchHistory = (props: IProps) => {
  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  });

  const [currentLimit, setCurrentLimit] = React.useState(20);
  const [loading, setLoading] = React.useState(false);
  const { getRecentMatchesLoading, getRecentMatchesData, refetchRecentMatches } = useGetRecentMatches({
    offset: 1,
    limit: 20,
    platform_id: 1
  })
  const onViewMore = async () => {
    setLoading(true);
    await refetchRecentMatches({
      offset: 1,
      limit: currentLimit + 5,
      platform_id: 1
    })
    setLoading(false);
    setCurrentLimit(currentLimit + 5);
  }

  const RecentMatchListRender = () => {
    switch (props.currentGame) {
      case Game.CSGO:
        return <RecentMatchListCSGO
          recentMatches={getRecentMatchesData?.getRecentlyCsgoMatch?.matches as CsgoPlayerMatch[]}
          loading={getRecentMatchesLoading}
          title="Recent matches history"
          hasButtonBack
        />;

      default:
        return <RecentMatchListCSGO
          recentMatches={getRecentMatchesData?.getRecentlyCsgoMatch?.matches as CsgoPlayerMatch[]}
          loading={getRecentMatchesLoading}
          title="Recent matches history"
          hasButtonBack
        />;
    }
  }

  return (
    <div className="lucis-container-2">
      <div className={s.dailyContainer}>
        <SidebarRight onlyWallet balance={statisticQuery?.data?.getBalance} />
        <Row gutter={40}>
          <Col lg={16} md={24}>
            {RecentMatchListRender()}
            {currentLimit < (getRecentMatchesData?.getRecentlyCsgoMatch?.total as number) &&
              <div className={s.viewAllHistory}>
                <span onClick={() => onViewMore()}>
                  {loading ? <Spin /> :
                    "View more"}</span>
              </div>}
          </Col>
          <Col lg={8} md={24}>
            <SidebarRight balance={statisticQuery?.data?.getBalance} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default RecentMatchHistory