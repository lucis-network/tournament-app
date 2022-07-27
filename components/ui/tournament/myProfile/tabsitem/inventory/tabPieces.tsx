import React, {useEffect, useState} from "react";
import s from "./index.module.sass";
import {InventoryGql, UserInventory} from "../../../../../../src/generated/graphql_p2e";
import {Button, Select } from "antd";

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
            <Select defaultValue="All" style={{ width: 120 }} onChange={handleChange}>
              <Option value="all">All</Option>
              <Option value="csgo">CSGO</Option>
              <Option value="lol">LOL</Option>
              <Option value="nft">NFT box</Option>
            </Select>
          </div>
      </div>
      <div className={s.listPiecesInventory}>
        {
          dataMyInventory && dataMyInventory?.user_inventory &&
          dataMyInventory?.user_inventory.map((item: UserInventory, index: number) =>
            (
              <div className={s.item} key={`${index}${item?.uid}`}>
                <img src={item?.img ?? "/assets/avatar.jpg" } alt="" width={50} height={50} />
                <h2>{item?.title}</h2>
                <Button>Claim</Button>
              </div>
            )
          )
        }
      </div>
    </>

  );
};

export default TabPiecesInventory;
