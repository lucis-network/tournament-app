import React from 'react'
import s from './dashboard.module.sass'
import { Col, Row, Spin } from "antd"
import {

  GET_STATISTICS,
  useGetRecentMatches
} from "../../../../hooks/p2e/useP2E";

import { useQuery } from "@apollo/client";
import { GPlayerMatch } from "../../../../src/generated/graphql_p2e";
import { RecentMatchList } from '../RecentMatchList';
import SidebarRight from '../missionComponent/SidebarRight';


const RecentMatchHistory = () => {
  const statisticQuery = useQuery(GET_STATISTICS, {
    context: {
      endpoint: 'p2e'
    }
  });

  const [currentLimit, setCurrentLimit] = React.useState(20);
  const [loading, setLoading] = React.useState(false);
  const { getRecentMatchesLoading, getRecentMatchesData, refetchRecentMatches } = useGetRecentMatches({
    game_uid: '03',
    offset: 1,
    limit: 20,
    platform_id: 1
  })
  const onViewMore = async () => {
    setLoading(true);
    await refetchRecentMatches({
      game_uid: '03',
      offset: 1,
      limit: currentLimit + 5,
      platform_id: 1
    })
    setLoading(false);
    setCurrentLimit(currentLimit + 5);
  }

  return (
    <div className="lucis-container-2">
      <div className={s.dailyContainer}>
        <SidebarRight onlyWallet balance={statisticQuery?.data?.getBalance} />
        <Row gutter={40}>
          <Col lg={16} md={24}>
            <RecentMatchList
              recentMatches={getRecentMatchesData?.getRecentlyMatch?.matches as GPlayerMatch[]}
              loading={getRecentMatchesLoading}
              title="Recent matches history"
              hasButtonBack
            />
            {currentLimit < (getRecentMatchesData?.getRecentlyMatch?.total as number) &&
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