import s from "./ContentTournament.module.sass";
import { Tabs } from "antd";
import Overview from "components/ui/common/Tabs/Overview/Index";

const { TabPane } = Tabs;

export default function ContentTournament() {
  return (
    <Tabs defaultActiveKey="1" className={s.container_Tabs}>
      <TabPane tab="Overview" key="1">
        <Overview />
      </TabPane>
      <TabPane tab="My team" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="For Sponsor" key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="My Tournament" key="4">
        Content of Tab Pane 4
      </TabPane>
    </Tabs>
  );
}
