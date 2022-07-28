import React, {useEffect, useState} from "react";
import s from "./index.module.sass";
import {InventoryGql, UserInventory} from "../../../../../../src/generated/graphql_p2e";
import {Button, Select } from "antd";
import ChestPrize from "../../../../p2e/lucky/prize";

type Props = {
  dataMyInventory?: InventoryGql,
};

const { Option } = Select;

const TabPiecesInventory = (props: Props) => {
  const {dataMyInventory} = props;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <div>
          <div>
            <Select defaultValue="All" style={{ width: 220 }} onChange={handleChange}>
              <Option value="all">All</Option>
              <Option value="csgo">CSGO</Option>
              <Option value="lol">LOL</Option>
              <Option value="nft">NFT box</Option>
            </Select>
          </div>
      </div>
      <div className={s.groupInventory}>
        <div className={s.listPiecesInventory}>
          {
            dataMyInventory && dataMyInventory?.user_inventory &&
            dataMyInventory?.user_inventory.map((prize: UserInventory, index: number) => (
            <div className={s.item} key={`${index}${prize?.uid}`}>
              <ChestPrize
                //key={prize?.id}
                description={prize?.desc}
                image={prize?.img ?? ''}
                title={prize?.title}
                rarity={"Rare"}
                amount={1}
              />
            </div>
          ))}
        </div>
        <div className={s.btnCombine}>
          <Button>Combine</Button>
        </div>
      </div>
    </>

  );
};

export default TabPiecesInventory;
