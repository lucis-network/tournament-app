import React from "react";
import {observer} from "mobx-react-lite";
import s from "./MyTournament.module.sass"
import CardPlayed from "../../../../common/cardsItem/played";
import {TTournament} from "../../../../../../src/generated/graphql";

type MyTournamentListProps = {
  data: TTournament[],
  type: string,
  isOwner?: boolean,
}

const MyTournamentList = (props: MyTournamentListProps) => {
  const { data, type, isOwner } = props;

  return (
    <div className={s.tournamentList}>
      {data.length > 0 && data.map((item: TTournament) => {
        return (
          <CardPlayed key={item.uid} tournament={item} type={type} isOwner={isOwner} />
        )
      })}
    </div>
  )
}

export default observer(MyTournamentList);