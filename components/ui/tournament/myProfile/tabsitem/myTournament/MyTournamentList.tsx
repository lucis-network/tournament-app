import React, {useCallback} from "react";
import {observer} from "mobx-react-lite";
import s from "./MyTournament.module.sass"
import CardPlayed from "../../../../common/cardsItem/played";
import {Col, Input, Row} from "antd";
import {debounce} from "lodash";
import {TTournament} from "../../../../../../src/generated/graphql";

type MyTournamentListProps = {
  data: TTournament[],
  type: string,
}

const MyTournamentList = (props: MyTournamentListProps) => {
  const { data, type } = props;

  return (
    <div className={s.tournamentList}>
      {data.length > 0 && data.map((item: TTournament) => {
        return (
          <CardPlayed key={item.uid} tournament={item} type={type} canEdit />
        )
      })}
    </div>
  )
}

export default observer(MyTournamentList);