import s from "./ContentMyProfile.module.sass";
import { Tabs } from "antd";
import MyTeamDetail from "components/ui/common/tabsItem/myTeamDetail";
import MyOverview from "../tabsitem/overview/Index";
import MyTournament from "../tabsitem/myTournament";
import MyProfileStore from "../../../../../src/store/MyProfileStore";
import { observer } from "mobx-react-lite";
import { UserGraphql } from "../../../../../src/generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { useEffect } from "react";
import { Router, useRouter } from "next/router";
import TournamentStore from "src/store/TournamentStore";

type ContentMyProfileProps = {
  isOwner?: boolean;
  userInfo: UserGraphql;
  getUserProfileRefetch?: () => Promise<ApolloQueryResult<any>>;
  page?: string;
};

const { TabPane } = Tabs;

export default observer(function ContentMyProfile({
  isOwner,
  userInfo,
  getUserProfileRefetch,
  page,
}: ContentMyProfileProps) {
  const tabActiveKey = page ?? 'overview';
  const router = useRouter();
  const user_name = router.query.username;
  const handleTabClick = (key: string) => {
    if (key === 'overview') {
      router.push(`/profile${!isOwner ? `/${user_name}` : ''}`)
    } else {
      router.push(`/profile${!isOwner ? `/${user_name}` : ''}?page=${key}`)
    }
  };

  const handleBeforeHistoryChange = (url: string) => {
    if(url.includes("/tournament/") && router?.query?.page === "teams") {
      TournamentStore.checkBacktoTournament = true;
    }
  };

  useEffect(() => {
    Router.events.on('beforeHistoryChange', handleBeforeHistoryChange);

    return () => {
      Router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
    };
  }, []);
  
  return (
    <Tabs
      defaultActiveKey={tabActiveKey}
      activeKey={tabActiveKey}
      onTabClick={handleTabClick}
      className={s.container_Tabs}
    >
      <TabPane tab="Overview" key="overview">
        <MyOverview
          userInfo={userInfo}
          getUserProfileRefetch={getUserProfileRefetch}
          isOwner={isOwner}
        />
      </TabPane>
      <TabPane tab="Teams" key="teams">
        <MyTeamDetail isOwnerProp={isOwner} />
      </TabPane>
      <TabPane tab="For Sponsor" disabled key="sponsor">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="Tournaments" key="tournaments">
        <MyTournament
          userInfo={userInfo}
          getUserProfileRefetch={getUserProfileRefetch}
          isOwner={isOwner}
        />
      </TabPane>
    </Tabs>
  );
});
