import { useState } from "react";
import { Button, Col, Row } from "antd";

import SearchComplete from "../../../common/searchs/index";
import CardHome from "components/ui/common/cardsItem/cardHome";
import ButtonSort from "components/ui/tournament/home/button"
import s from "./Tabs.module.sass";

import { useHomePage } from "hooks/home/useHomePage"

const listTabs = ["UPCOMING", "ONGOING", "CLOSED"];
const datas = [
  {
    id: 1,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 2,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 3,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 4,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 5,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 6,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 7,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 8,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 9,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 10,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 11,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 12,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 13,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 14,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
  {
    id: 15,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
];

export default function TabHome() {
  const { dataUpcoming, loadingUpcoming } = useHomePage({
    game: "",
    bracket: "",
    team_size: "",
    prize_pool: "",
    time: "",
  })
  const [type, setType] = useState("UPCOMING");
  const handleClickTab = (e: string) => {
    setType(e);
  };
  
  return (
    <div className={`${s.container_card_tournament}`}>
      <div className="lucis-container">
        <Row className={s.top_tab}>
          <Col className={s.tabs}>
            {listTabs.map((item: string) => (
              <div
                key={item}
                onClick={() => handleClickTab(item)}
                className={
                  type === item ? `${s.tab_item} ${s.active}` : `${s.tab_item}`
                }
              >
                {
                  type === item &&
                  <div className={s.ic_tab}>
                    <img src="/assets/home/ic_tab.svg" alt="" />
                  </div>
                }
                {item}
              </div>
            ))}
          </Col>
          <Col>
            <SearchComplete />
          </Col>
        </Row>
        <ButtonSort />
        <div>
          <CardHome datas={dataUpcoming} loading={loadingUpcoming} />
        </div>

        <div className={s.container_create}>
          <div className={s.line}></div>
          <div className={s.lin1}></div>
          <div className={s.im_create_tournament}>
            <img src="/assets/Banner/im_creat_tournament.png" alt="" />
          </div>
          <Row className={s.creat_tournament}>
            <Col></Col>
            <Col className={s.heading}>
              <h2>CREATE MY TOURNAMENT</h2>
              <p>
                Everyone can create tournaments on Lucis Network. The most
                useful platform to create and manage your own tournaments with
                ease.
              </p>
              <Button type="primary">CREATE NOW</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
