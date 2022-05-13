import React from "react";
import {observer} from "mobx-react-lite";
import s from "./MyTournament.module.sass"
import CardPlayed from "../../../../common/cardsItem/played";
import {TTournament} from "../../../../../../src/generated/graphql";

type MyTournamentListProps = {
  data: TTournament[],
  type: string,
  isOwner?: boolean,
  maxItems?: number,
}

const MyTournamentList = (props: MyTournamentListProps) => {
  const { data, type, isOwner, maxItems } = props;
  let newData = [...data];
  if (maxItems) {
    newData = newData.splice(0, maxItems);
  }

  return (
    <div className={s.tournamentList}>
      {newData.length > 0 && newData.map((item: TTournament) => {
        return (
          <CardPlayed key={item.uid} tournament={item} type={type} isOwner={isOwner} />
        )
      })}
    </div>
  )
}

export default observer(MyTournamentList);