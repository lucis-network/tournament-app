
import React from "react";
import { Game, } from "utils/Enum";
import { RecentMatchDetailCSGO } from "./csgo/RecentMatchDetailCSGO";

interface IProps {
  currentGame: Game;
}
export const RecentMatchDetail = (props: IProps) => {

  switch (props.currentGame) {
    case Game.CSGO:
      return <RecentMatchDetailCSGO />
    default:
      return <RecentMatchDetailCSGO />
  }
}

