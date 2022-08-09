
import React from "react";
import { Game, } from "utils/Enum";
import { RecentMatchDetailCSGO } from "./csgo/RecentMatchDetailCSGO";
import { RecentMatchDetailLOL } from "./lol/RecentMatchDetailLOL";
import DocHeadPlaycore from "../../../DocHeadPlaycore";

interface IProps {
  currentGame?: Game;
}
export const RecentMatchDetail = (props: IProps) => {
  
  const [currentGame, setCurrentGame] = React.useState<Game | undefined | null>(props.currentGame);


  React.useEffect(() => {
    setCurrentGame(props.currentGame)
  }, [props.currentGame])

  switch (currentGame) {
    case Game.CSGO:
      return (
        <>
          <DocHeadPlaycore
            title={"[MATCH DETAILS] - More skills | More rewards"}
            description={"Join Lucis PlayCore Now!! Every matches will be recorded and you will be rewarded from it."}
            thumb={"/assets/P2E/ceo/match-detail-csgo.png"}
          />
          <RecentMatchDetailCSGO />
        </>
      );
    case Game.LOL:
      return (
        <>
          <DocHeadPlaycore
            title={"[MATCH DETAILS] - More skills | More rewards"}
            description={"Join Lucis PlayCore Now!! Every matches will be recorded and you will be rewarded from it."}
            thumb={"/assets/P2E/ceo/match-detail-lol.png"}
          />
          <RecentMatchDetailLOL />
        </>
      )
    default:
      return null;
  }
}

