import React, {useEffect, useState} from "react";
import s from "./index.module.sass";
import Tabs from "antd/lib/tabs";
import TabItemsInventory from "./tabItems";
import TabPiecesInventory from "./tabPieces";
import {AuthUser} from "../../../../../Auth/AuthStore";

type Props = {
  isOwner?: boolean;
  userInfo: AuthUser;
};
const { TabPane } = Tabs;

const Inventory = (props: Props) => {
  const {isOwner, userInfo} = props;
  const onChange = (key: string) => {
    //console.log(key);
  };

  return (
    <div className={s.wrapper}>
      <h2>Inventory</h2>

      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Items" key="1">
          <TabItemsInventory isOwner={isOwner} userInfo={userInfo}></TabItemsInventory>
        </TabPane>
        <TabPane tab="Pieces" key="2">
          <TabPiecesInventory isOwner={isOwner} userInfo={userInfo}></TabPiecesInventory>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Inventory;
