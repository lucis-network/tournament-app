
import React from "react";
import { Game, } from "utils/Enum";
import { RecentMatchDetailCSGO } from "./csgo/RecentMatchDetailCSGO";
import { RecentMatchDetailLOL } from "./lol/RecentMatchDetailLOL";

interface IProps {
  currentGame?: Game;
}
export const RecentMatchDetail = (props: IProps) => {

  switch (props.currentGame) {
    case Game.CSGO:
      return <RecentMatchDetailCSGO />
    case Game.LOL:
      return <RecentMatchDetailLOL />
    default:
      return null;
  }
}

