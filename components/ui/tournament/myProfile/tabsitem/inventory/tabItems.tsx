import React, {useCallback, useEffect, useState} from "react";
import s from "./index.module.sass";
import {Button, Input, Select} from "antd";
import {ItemGroup} from "../../../../../../src/generated/graphql";
import debounce from "lodash/debounce";
import { useGetMyInventoryItems } from "hooks/p2e/useP2E";
import AuthStore from "../../../../../Auth/AuthStore";
import {AppEmitter} from "../../../../../../services/emitter";
import ItemsTabItem from "./itemsTabItem";

type Props = {
};
const { Option } = Select;

const TabItemsInventory = (props: Props) => {
  const [searchName, setSearchName] = useState<string>("");
  const [searchGroupFilter, setSearchGroupFilter] = useState<string>("");
  const {dataMyInventoryItems, loading, refetchMyInventoryItems} = useGetMyInventoryItems(
    {
      user_id: AuthStore.id || undefined,
      group_filter: searchGroupFilter,
      search_name: searchName,
    }
  );

  const onSearch = (e: any) => {
    delayedSearch(e.target.value);
  };

  const delayedSearch = useCallback(
    debounce((value: string) => {
      setSearchName(value);
    }, 600),
    []
  );

  const handleChange = (value: string) => {
    setSearchGroupFilter(value);
  };

  useEffect(() => {
    const listener = AppEmitter.addListener("refetchMyInventoryItems", (res: any) => {
      refetchMyInventoryItems();
    });
    return () => {
      listener.remove();
    };
  }, [])

  return (
    <div>
      <div className={s.groupSearch}>
        <div>
          <Select defaultValue="All" className={s.dropdownSearch} onChange={handleChange}>
            <Option value="">All</Option>
            <Option value={ItemGroup.Csgo}>{ItemGroup.Csgo}</Option>
            <Option value={ItemGroup.Lol}>{ItemGroup.Lol}</Option>
            <Option value={ItemGroup.Nft}>{ItemGroup.Nft}</Option>
          </Select>
        </div>
        <div>
          <Input
            placeholder="Search"
            onChange={onSearch}
            className={`${s.searchText}`}
          />
        </div>
      </div>

      <div className={s.listItemsInventory}>
        {
          dataMyInventoryItems &&
          dataMyInventoryItems?.map((item , index) =>
            (
              <>
                <div className={s.item} key={`${index}`}>
                  <ItemsTabItem item={item}></ItemsTabItem>
                </div>
              </>
            )
          )
        }
      </div>
    </div>

  );
};

export default TabItemsInventory;
