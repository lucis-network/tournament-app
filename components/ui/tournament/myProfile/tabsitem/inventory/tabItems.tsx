import React, {useEffect, useState} from "react";
import s from "./index.module.sass";
import {InventoryGql, UserInventory} from "../../../../../../src/generated/graphql_p2e";

type Props = {
  dataMyInventory?: InventoryGql,
};

const TabItemsInventory = (props: Props) => {
  const {dataMyInventory} = props;
  console.log("dataMyInventory", dataMyInventory);
  return (
      <div className={s.listInventory}>
        {
          dataMyInventory && dataMyInventory?.user_inventory &&
          dataMyInventory?.user_inventory.map((item: UserInventory, index: number) =>
            (
                <div className={s.item} key={`${index}${item?.uid}`}>
                  <img src={item?.img ?? "/assets/avatar.jpg" } alt="" width={50} height={50} />
                  <h2>{item?.title}</h2>
                </div>
            )
          )
        }
      </div>
  );
};

export default TabItemsInventory;
