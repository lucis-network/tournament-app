import { useState } from "react";
import { Button, Col, Row } from "antd";

import SearchComplete from "../../../common/searchs/index";
import CardHome from "components/ui/common/cardsItem/cardHome";
import s from "./Tabs.module.sass";

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
  {
    id: 17,
    name: "Thetan",
    title:
      "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
  },
];

export default function TabHome() {
  const [type, setType] = useState("UPCOMING");
  const handleClickTab = (e: string) => {
    setType(e);
  };

  return (
    <div className={`${s.container_card_tournament}`}>
      <div className="lucis-container">
        <Row style={{ justifyContent: "space-between" }}>
          <Col span={18} className={s.tabs}>
            {listTabs.map((item: string) => (
              <div
                key={item}
                onClick={() => handleClickTab(item)}
                className={
                  type === item ? `${s.tab_item} ${s.active}` : `${s.tab_item}`
                }
              >
                {item}
              </div>
            ))}
          </Col>
          <Col>
            <SearchComplete />
          </Col>
        </Row>

        <div>
          <CardHome datas={datas} />
        </div>

        <Row className={s.creat_tournament}>
          <Col>
            <img src="/assets/Banner/im_creat_tournament.png" alt="" />
          </Col>
          <Col className={s.heading} span={7}>
            <h2>CREATE MY TOURNAMENT</h2>
            <p>
              Everyone can create tournaments on Lucis Network. The most useful
              platform to create and manage your own tournaments with ease.
            </p>
            <Button type="primary">CREAT NOW</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
