import s from "./ContentMyProfile.module.sass";
import { Tabs } from "antd";

import MyTeamDetail from "components/ui/common/tabsItem/myTeamDetail";
import MyOverview from "../tabsitem/overview/Index";
import MyTournament from "../tabsitem/myTournament";
import {useEffect, useState} from "react";
import MyProfileStore from "../../../../../src/store/MyProfileStore";
import {observer} from "mobx-react-lite";

const { TabPane } = Tabs;

type ContentMyProfileProps = {
  isOwner?: boolean,
}

export default observer(function ContentMyProfile({ isOwner }: ContentMyProfileProps) {
  const { tabActiveKey } = MyProfileStore;
  const handleTabClick = (key: string) => {
    MyProfileStore.tabActiveKey = key;
  };

  useEffect(() => {
    console.log(tabActiveKey)
  }, [tabActiveKey])

  return (
    <Tabs defaultActiveKey={tabActiveKey} activeKey={tabActiveKey} onTabClick={handleTabClick} className={s.container_Tabs}>
      <TabPane tab="Overview" key="1">
        <MyOverview />
      </TabPane>
      <TabPane tab="My team" key="2">
        <MyTeamDetail />
      </TabPane>
      <TabPane tab="For Sponsor" disabled key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="My Tournament" key="4">
        <MyTournament />
      </TabPane>
    </Tabs>
  );
});
