import React, {useEffect, useState} from "react";
import s from "./index.module.sass";
import {useGetMyInventory} from "../../../../../../hooks/p2e/useP2E";
import Tabs from "antd/lib/tabs";
import TabItemsInventory from "./tabItems";
import TabPiecesInventory from "./tabPieces";

type Props = {
};
const { TabPane } = Tabs;

const Inventory = (props: Props) => {
  const {dataMyInventory, loading, refetchMyInventory} = useGetMyInventory();

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className={s.wrapper}>
      <h2>Inventory</h2>

      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Items" key="1">
          <TabItemsInventory dataMyInventory={dataMyInventory}></TabItemsInventory>
        </TabPane>
        <TabPane tab="Pieces" key="2">
          <TabPiecesInventory dataMyInventory={dataMyInventory}></TabPiecesInventory>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Inventory;
