import { Button, Col, message, Row } from "antd";
import Link from "next/link";
import CardHome from "components/ui/common/cardsItem/cardHome";
import ButtonSort from "components/ui/tournament/home/button";
import s from "./Tabs.module.sass";

import { useHomePage } from "hooks/home/useHomePage";
import Search from "antd/lib/input/Search";
import { StatusGameType } from "utils/Enum";
import { useState } from "react";
import SpinLoading from "components/ui/common/Spin";
import AuthStore from "components/Auth/AuthStore";
import router from "next/router";

export default function TabHome() {
  const {
    filter,
    listTabs,
    data,
    gameData,
    loading,
    handleChangeFilter,
    handleOrder,
  } = useHomePage();

  const [creating, setCreating] = useState(false);
  const [typeTab, setTypeTab] = useState("UPCOMING");

  const handleChangeTab = (item: string) => {
    setTypeTab(item);
    handleChangeFilter("type", item);
  };
  let cardHome;

  if (loading) {
    cardHome = <SpinLoading className="min-h-[500px] pt-0" />;
  } else {
    cardHome = <CardHome datas={data} loading={loading} type={typeTab} />;
  }

  const createTournament = () => {
    if (!AuthStore.isLoggedIn) {
      message.warn("Please signin first");
    } else {
      setCreating(true);
      router.push("/tournament/create");
    }
  };

  return (
    <div className={`${s.container_card_tournament}`}>
      <div className="lucis-container">
        <Row className={s.top_tab}>
          <Col className={s.tabs}>
            {listTabs.map((item: StatusGameType) => (
              <div
                key={item}
                onClick={() => handleChangeTab(item)}
                className={
                  filter.type === item
                    ? `${s.tab_item} ${s.active}`
                    : `${s.tab_item}`
                }
              >
                {filter.type === item && (
                  <div className={s.ic_tab}>
                    <img src="/assets/home/ic_tab.svg" alt="" />
                  </div>
                )}
                <p className="uppercase mb-0">{item}</p>
              </div>
            ))}
          </Col>
          <Col className={s.container_search}>
            <Search
              className={s.search}
              placeholder="Search by game"
              autoFocus
              value={filter.search}
              onChange={(e) => handleChangeFilter("search", e.target.value)}
            />
          </Col>
        </Row>
        <ButtonSort
          filter={filter}
          gameData={gameData}
          onFilter={handleChangeFilter}
          onOrder={handleOrder}
        />
        <div style={{ minHeight: "500px" }}>{cardHome}</div>
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
              <Button
                type="primary"
                loading={creating}
                onClick={createTournament}
                className={s.btn_create_now}
              >
                CREATE NOW
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
