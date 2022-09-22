import React from "react";
import {RankingSeasonDto, StatusSeason} from "../../../src/generated/graphql_p2e";
import { Select } from 'antd';
import s from "./Ranking.module.sass";
import moment from "moment";

const { Option } = Select;
interface IProps {
  seasonList: RankingSeasonDto[];
  setSeasonId: (seasonId: string) => void;
  activeSeasonId: string;
}
export const SelectSeason = (props: IProps) => {
  const { seasonList,  setSeasonId, activeSeasonId} = props

  return (
    <div>
      {activeSeasonId &&
        <Select
          onChange={value => setSeasonId(value)}
          className={s.selectSeason}
          defaultValue={activeSeasonId}
          optionLabelProp="label"
        >
          {seasonList?.map(item => <Option value={item.uid} key={item.uid} label={item.name}>
            <div id="option-ranking" className={s.optionSelect}>
              <div className={s.optionName}>{item.name}</div>
              <div className={s.fromDateToDate}>
                {moment(new Date(item.fromDate)).format("ll")} - {moment(new Date(item.toDate)).format("ll")}
              </div>
            </div>
          </Option>)}
        </Select>
      }
    </div>
  );
}