import React from "react";
import moment from 'moment'
import { BracketGql, BracketMatch, BracketMatchStatus, BracketRound, PlayTeam, PlayTeamGql } from "src/generated/graphql";
import { Round, RoundMatch, Team } from "src/store/SingleRoundStore";
import s from './index.module.sass'
import {ApolloQueryResult} from "@apollo/client";

export type BracketUiProps = {
  dataBracket?: BracketGql;
  loadingBracket?: any;
  refereeIds: string[];
  refetchBracket: () => Promise<ApolloQueryResult<any>>
};

function _defaultRoundTeam(): Team {
  return {
    id: "",
    name: "",
    score: 0,
  }
}

export const createSeed = (item: BracketMatch, idx: number, listTeam: PlayTeamGql[] | undefined): RoundMatch => {
  const team1 = listTeam?.find((i) => i.uid == item.playteam1_uid);
  const team2 = listTeam?.find((i) => i.uid == item.playteam2_uid);

  const roundTeam1: Team = !team1
    ? _defaultRoundTeam()
    : {
      id: item.playteam1_uid !== "bye" ? (item.playteam1_uid ?? "") : "",
      name: item.playteam1_uid !== "bye" ? team1.team.name : "",
      score: item.score_1 ?? 0,
    };

  const roundTeam2: Team = !team2
    ? _defaultRoundTeam()
    : {
      id: item.playteam2_uid !== "bye" ? (item.playteam2_uid ?? "") : "",
      name: item.playteam2_uid !== "bye" ? team2.team.name : "",
      score: item.score_2 ?? 0,
    };

  return {
    uid: item.uid,
    teams: [roundTeam1, roundTeam2],
    status: item.status,
    linkStream: item.link_stream,
    linkStreamEnable: item.link_stream_enable,
  };
};

export const createRound = (item: BracketRound, idx: number, listTeam: PlayTeamGql[] | undefined): Round => {
  const seeds = !item.bracketMatchs
    ? []
    : item.bracketMatchs.map((item, idx) =>
      createSeed(item, idx, listTeam)
    );
  const startAt = moment(item.start_at).format("MMM Do, HH:mm:ss")

  return {
    title: (
      <div>
        <p className="m-0 text text-white text-[24px]">{item.title}</p>
        <p className="text-[18px]">{startAt}</p>
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
  bracketTeams: PlayTeamGql[] | undefined,
}): Round[] => {
  if (!bracketRounds) {
    return []
  }

  return bracketRounds.map((item, idx) => {
    return createRound(item, idx, bracketTeams)
  });
};