import React from "react";
import moment from 'moment'
import { BracketGql, BracketMatch, BracketMatchStatus, BracketRound, GBracketTeam } from "src/generated/graphql";
import { Round, RoundMatch, Team } from "src/store/SingleRoundStore";
import s from './index.module.sass'

export type BracketUiProps = {
  dataBracket?: BracketGql;
  loadingBracket?: any;
  refereeIds: string[];
};

function _defaultRoundTeam(): Team {
  return {
    id: "",
    name: "",
    score: 0,
  }
}

export const createSeed = (item: BracketMatch, idx: number, listTeam: GBracketTeam[] | undefined): RoundMatch => {
  const team1 = listTeam?.find((i) => i.uid == item.team1_uid);
  const team2 = listTeam?.find((i) => i.uid == item.team2_uid);

  const roundTeam1: Team = !team1
    ? _defaultRoundTeam()
    : {
      id: item.team1_uid !== "bye" ? (item.team1_uid ?? "") : "",
      name: item.team1_uid !== "bye" ? team1.team.name : "",
      score: item.score_1 ?? 0,
    };

  const roundTeam2: Team = !team2
    ? _defaultRoundTeam()
    : {
      id: item.team2_uid !== "bye" ? (item.team2_uid ?? "") : "",
      name: item.team2_uid !== "bye" ? team2.team.name : "",
      score: item.score_2 ?? 0,
    };

  return {
    uid: item.uid,
    teams: [roundTeam1, roundTeam2],
    status: item.status,
  };
};

export const createRound = (item: BracketRound, idx: number, listTeam: GBracketTeam[] | undefined): Round => {
  const seeds = !item.bracketMatchs
    ? []
    : item.bracketMatchs.map((item, idx) =>
      createSeed(item, idx, listTeam)
    );

  return {
    title: (
      <div>
        <p className="m-0 text text-white text-[24px]">{item.title}</p>
        <p>{moment(item.start_at).format("MMM Do, HH:MM:SS")}</p>
      </div>
    ),
    seeds,
  };
};

export const createRounds = ({
  bracketRounds,
  bracketTeams,
}: {
  bracketRounds: BracketRound[],
  bracketTeams: GBracketTeam[] | undefined,
}): Round[] => {
  if (!bracketRounds) {
    return []
  }

  return bracketRounds.map((item, idx) => {
    return createRound(item, idx, bracketTeams)
  });
};