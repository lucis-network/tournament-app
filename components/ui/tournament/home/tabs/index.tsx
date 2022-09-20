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

export default function  TabHome() {
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
  const handleChangeTab = (item: string) => {
    handleChangeFilter("type", item);
  };
  let cardHome;

  if (loading) {
    cardHome = <SpinLoading className="min-h-[500px] pt-0" />;
  } else {
    cardHome = <CardHome datas={data} loading={loading} type={filter?.type} />;
  }

  const createTournament = () => {
    if (!AuthStore.isLoggedIn) {
      message.warn("Please sign in first");
    } else {
      setCreating(true);
      router.push("/arena/create");
    }
  };

  return (
    <div className={`${s.container_card_tournament}`}>
      <div className="lucis-container-2">
        <ButtonSort
          filter={filter}
          gameData={gameData}
          onFilter={handleChangeFilter}
          onOrder={handleOrder}
          listTabs={listTabs}
        />
        <div>{cardHome}</div>
      </div>
    </div>
  );
}
