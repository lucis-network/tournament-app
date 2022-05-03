import s from "./TournamentDetail.module.sass";
import TableParticipant from "../../../components/ui/common/tabsItem/participantsDetail/index";
import Referees from "../../../components/ui/common/tabsItem/refereesDetail/index";
import Prizing from "components/ui/common/tabsItem/prizingDetail";

import { Button, Col, Row, Tabs } from "antd";
import Banner from "components/ui/tournament/detail/Banner";
import { useTournamentDetail } from "hooks/tournament/useTournamentDetail";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { isClient } from "utils/DOM";

const { TabPane } = Tabs;
const ItemButton = ["Donate", "Subcribe", "Invite or Share"];

const TournamentDetail = () => {
  // ====== Use to get tournament_uid
  // const router = useRouter();
  // const tournamentUid = useMemo(() => {
  //   const { slug } = router.query;
  //   if (slug) {
  //     return slug[0];
  //   }
  //   if (isClient) {
  //     const paths = router.asPath.split("/").filter((item) => item !== "");
  //     if (paths.length > 1) {
  //       return paths[1];
  //     }
  //   }
  //   return "";
  // }, [router]);

  const { dataTournamentDetail, loading } = useTournamentDetail({
    // Change to tournamentUid after
    tournament_uid: "cl2ek8le201060jn6tzuoo7nv",
  });

  if (loading) {
    return "";
  }

  const { team_size, brackets } = dataTournamentDetail;
  console.log(brackets[0].type);

  return (
    <div className={s.wrapper}>
      <Banner />

      <div className={`lucis-container ${s.group_button}`}>
        {ItemButton.map((item) => (
          // <Button type="primary" key={item}>
          //   {item}
          // </Button>
          <button key={item}>{item}</button>
        ))}
      </div>

      <Row className={`lucis-container`}>
        <Col span={6} className={s.content_top}>
          <div className={s.img_game}>
            <img src="" alt="" />
          </div>
          <h2>Thetan Arena</h2>
        </Col>

        <Col span={16} className={s.content_center}>
          <h1>Thetan + Lucis Mid Summer Batch</h1>
          <Row>
            <Col span={8} className={s.free_entry}>
              <p className={s.title}>Free entry</p>
              <div className={s.text}>
                <p>Bracket type</p>
                <span>Single eliminnation</span>
              </div>
            </Col>

            <Col span={8} className={s.tournament_by}>
              <p>Tournament by</p>
              <div className={s.text}>
                <p>Team size</p>
                <span>
                  {team_size} vs {team_size}
                </span>
              </div>
            </Col>
            <Col span={8} className={s.lucis_offical}>
              <p>Lucis Offical</p>
              <div className={s.text}>
                <p>Max participants</p>
                <span>32</span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={2}>content right</Col>
      </Row>

      {/* ===== tabs ===== */}
      <div className={`lucis-container ${s.container_Tabs}`}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Overview" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Rules" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Bracket" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Participants(32/32)" key="4">
            <TableParticipant />
          </TabPane>
          <TabPane tab="Referees" key="5">
            <Referees />
          </TabPane>
          <TabPane tab="Prizing" key="6">
            <Prizing />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentDetail;
