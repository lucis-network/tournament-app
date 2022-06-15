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
};

const { TabPane } = Tabs;

export default observer(function ContentMyProfile({
  isOwner,
  userInfo,
  getUserProfileRefetch,
}: ContentMyProfileProps) {
  const { tabActiveKey } = MyProfileStore;
  const handleTabClick = (key: string) => {
    MyProfileStore.tabActiveKey = key;
  };

  const route = useRouter();
  useEffect(() => {
    if (route?.query?.tab === "teams") MyProfileStore.tabActiveKey = "2";
  }, []);

  const handleBeforeHistoryChange = (url: string) => {
    if(url.includes("/tournament/") && route?.query?.tab === "teams") {
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
      <TabPane tab="Overview" key="1">
        <MyOverview
          userInfo={userInfo}
          getUserProfileRefetch={getUserProfileRefetch}
          isOwner={isOwner}
        />
      </TabPane>
      <TabPane tab="Teams" key="2">
        <MyTeamDetail isOwnerProp={isOwner} />
      </TabPane>
      <TabPane tab="For Sponsor" disabled key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="Tournaments" key="4">
        <MyTournament
          userInfo={userInfo}
          getUserProfileRefetch={getUserProfileRefetch}
          isOwner={isOwner}
        />
      </TabPane>
    </Tabs>
  );
});
