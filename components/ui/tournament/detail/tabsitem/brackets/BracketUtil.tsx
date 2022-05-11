import React from "react";
import { BracketRound } from "src/generated/graphql";

export type BracketUiProps = {
  //   numRounds: number;
  //   numGames: number;
  bracketRounds?: BracketRound[];
  dataBracket?: any;
  loadingBracket?: any;
  listTeam?: any;
};

export const createSeed = (item: any, idx: number, listTeam: any[]) => {
  const team1 = listTeam.find((i) => i.uid == item.team1_uid);
  const team2 = listTeam.find((i) => i.uid == item.team2_uid);

  return {
    teams: [
      {
        id: item.team1_uid !== "bye" ? item.team1_uid : null,
        name: item.team1_uid !== "bye" ? team1?.team.name : null,
        score: item.score_1,
      },
      {
        id: item.team2_uid !== "bye" ? item.team2_uid : null,
        name: item.team2_uid !== "bye" ? team2?.team.name : null,
        score: item.score_2,
      },
    ],
  };
};

export const createRound = (item: any, idx: any, listTeam: any[]) => {
  return {
    title: <p className="m-0 text text-white text-[24px]">{item.title}</p>,
    seeds: item.bracketMatchs?.map((item: any, idx: any) =>
      createSeed(item, idx, listTeam)
    ),
  };
};

export const createRounds = ({ bracketRounds, listTeam }: BracketUiProps): any => {
  const rounds = bracketRounds?.map((item, idx) =>
    createRound(item, idx, listTeam)
  );

  return rounds;
};