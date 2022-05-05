import s from "./TournamentDetail.module.sass";
import { Col, Row, Tabs } from "antd";
import Banner from "components/ui/tournament/detail/Banner";
import { useTournamentDetail } from "hooks/tournament/useTournamentDetail";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { isClient } from "utils/DOM";
import Bracket from "components/ui/common/tabsItem/brackets";
import Overview from "components/ui/tournament/detail/tabsitem/overview/Index";
import Rules from "components/ui/tournament/detail/tabsitem/rules/Index";
import TableParticipant from "components/ui/tournament/detail/tabsitem/participants";
import Referees from "components/ui/tournament/detail/tabsitem/referees";
import Prizing from "components/ui/tournament/detail/tabsitem/prizing";
import RegistrationPhase from "components/ui/tournament/detail/registrationPhase/RegistrationPhase";
import { GetStaticPaths } from "next";

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

  const {
    dataTournamentDetail,
    dataParticipants,
    dataRefereesDetail,
    dataPrizing,
    dataBracket,

    loading,
    loadingParticipant,
    loadingReferees,
    loadingPrizing,
    loadingBracket,
  } = useTournamentDetail({
    // Change to tournamentUid after
    tournament_uid: "cl2rdu56s18150jrswgoh73lb",
  });

  if (loading) {
    return "";
  }

  const {
    team_size,
    desc,
    rules,
    participants,
    user,
    game,
    name,
    sponsorSlot,
    pool_size,
    currency,
  } = dataTournamentDetail;
  // useEffect(() => {
  //   if (dataTournamentDetail)
  //     console.log("dataTournamentDetail", dataTournamentDetail);
  // }, [dataTournamentDetail]);

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
          <h2>{game.name}</h2>
        </Col>

        <Col span={16} className={s.content_center}>
          <h1>{`${game.name} + ${name}`}</h1>
          <Row>
            <Col span={8} className={s.free_entry}>
              <p className={s.title}>Free entry</p>
              <div className={s.text}>
                <p>Bracket type</p>
                <span>
                  {dataBracket?.type === "SINGLE"
                    ? "Single eliminnation"
                    : dataBracket?.type === "DOUBLE"
                    ? "Double eliminnation"
                    : ""}
                </span>
              </div>
            </Col>

            <Col span={8} className={s.tournament_by}>
              <p>Tournament by</p>
              <div className={s.text}>
                <p>Team size</p>
                <span>
                  {team_size ?? "-"} vs {team_size ?? "-"}
                </span>
              </div>
            </Col>
            <Col span={8} className={s.lucis_offical}>
              <p>Lucis Offical</p>
              <div className={s.text}>
                <p>Max participants</p>
                <span>{participants}</span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={2}>content right</Col>
      </Row>

      {/* ==== registration phase ====  */}

      <div className={`lucis-container`}>
        <RegistrationPhase
          participants={participants}
          brackets={dataBracket}
          sponsorSlot={sponsorSlot}
          pool_size={pool_size}
          currency={currency}
        />
      </div>

      {/* ===== tabs ===== */}
      <div className={`lucis-container ${s.container_Tabs}`}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Overview" key="1">
            <Overview desc={desc} />
          </TabPane>
          <TabPane tab="Rules" key="2">
            <Rules rules={rules} />
          </TabPane>
          <TabPane tab="Bracket" key="3">
            <Bracket
              dataBracket={dataBracket}
              loadingBracket={loadingBracket}
            />
          </TabPane>
          <TabPane tab={`Participants (${team_size}/${team_size})`} key="4">
            <TableParticipant
              dataParticipants={dataParticipants}
              loading={loadingParticipant}
            />
          </TabPane>
          <TabPane tab="Referees" key="5">
            <Referees
              dataRefereesDetail={dataRefereesDetail}
              loadingReferees={loadingReferees}
            />
          </TabPane>
          <TabPane tab="Prizing" key="6">
            <Prizing
              dataPrizing={dataPrizing}
              loadingPrizing={loadingPrizing}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export function getStaticPaths() {
  return {
    paths: [
      {
        params: { slug: "1" },
      },
      {
        params: { slug: "2" },
      },
    ],
    fallback: false,
  };
}

export function getStaticProps({}) {
  return {
    props: {
      course: {},
    },
  };
}

export default TournamentDetail;
