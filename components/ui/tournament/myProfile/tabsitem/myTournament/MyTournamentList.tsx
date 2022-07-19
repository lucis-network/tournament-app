import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import s from "./MyTournament.module.sass"
import CardPlayed from "../../../../common/cardsItem/played";
import {TTournament} from "../../../../../../src/generated/graphql";
import {Button} from "antd";

type MyTournamentListProps = {
  data: TTournament[],
  type: string,
  isOwner?: boolean,
  maxItems: number,
  isMyTournament?: boolean,
}

const MyTournamentList = (props: MyTournamentListProps) => {
  const { data, type, isOwner, maxItems, isMyTournament } = props;
  const [isHidden, setIsHidden] = useState<boolean>(true)

  return (
    <>
      <div className={s.tournamentList}>
        {data.length > 0 && data.map((item: TTournament, index: number) => {
          return (
            <CardPlayed
              key={item.uid}
              tournament={item}
              type={type}
              isOwner={isOwner}
              isHidden={index > (maxItems - 1) ? (data.length > maxItems ? isHidden : false) : false}
            />
          )
        })}
      </div>
      {(isMyTournament && (data.length > maxItems) && isHidden) && (
        <Button onClick={() => setIsHidden(false)}>Show more</Button>
      )}
    </>
  )
}

export default observer(MyTournamentList);