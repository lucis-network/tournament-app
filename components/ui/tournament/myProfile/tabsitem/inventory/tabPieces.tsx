import React, {useCallback, useState} from "react";
import s from "./index.module.sass";
import {Input, Select} from "antd";
import {useGetMyInventoryPieces, useGetMyInventoryPiecesConfig} from "../../../../../../hooks/p2e/useP2E";
import debounce from "lodash/debounce";
import ItemsPiece from "./itemsPiece";
import AuthStore from "../../../../../Auth/AuthStore";

type Props = {};

const {Option} = Select;

const TabPiecesInventory = (props: Props) => {
  const [searchName, setSearchName] = useState<string>("");
  const [searchGroupFilter, setSearchGroupFilter] = useState<string>("");

  const {dataMyInventoryPieces, loading, refetchMyInventoryPieces} = useGetMyInventoryPieces(
    {
      user_id: AuthStore.id || undefined,
      group_filter: searchGroupFilter,
      search_name: searchName,
    }
  );

  const {dataMyInventoryPiecesConfig} = useGetMyInventoryPiecesConfig();

  const handleChange = (value: string) => {
    setSearchGroupFilter(value);
  };

  const onSearch = (e: any) => {
    delayedSearch(e.target.value);
  };

  const delayedSearch = useCallback(
    debounce((value: string) => {
      setSearchName(value);
    }, 600),
    []
  );

  return (
    <>
      <div className={s.groupSearch}>
        <div>
          <Select defaultValue="All" className={s.dropdownSearch} onChange={handleChange}>
            <Option value="">All</Option>
            {dataMyInventoryPiecesConfig && dataMyInventoryPiecesConfig?.map((item, index) => (
              <Option key={`${item?.piece_group}${index}`} value={item?.piece_group}>{item?.piece_group}</Option>
            ))}
          </Select>
        </div>
        <div>
          {/*<img src="/assets/home/ic_member.svg" alt="" />*/}
          <Input
            placeholder="Search"
            onChange={onSearch}
            className={`${s.searchText}`}
          />
        </div>
      </div>
      <div className={s.groupInventory}>
        <div className={s.listPiecesInventory}>
          {
            dataMyInventoryPieces &&
            dataMyInventoryPieces.map((item, index) => (
              <>
                <div className={s.rowPieces} key={`${index}${item?.type}`}>
                  <ItemsPiece item={item} refetchMyInventoryPieces={refetchMyInventoryPieces}></ItemsPiece>
                </div>
                {index < dataMyInventoryPieces.length-1 &&
                    <div className={s.cross}></div>
                }
              </>
            ))
          }
        </div>
      </div>
    </>

  );
};

export default TabPiecesInventory;
