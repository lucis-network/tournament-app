
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
          <RecentMatchDetailCSGO />
        </>
      );
    case Game.LOL:
      return (
        <>
          <RecentMatchDetailLOL />
        </>
      )
    default:
      return null;
  }
}

