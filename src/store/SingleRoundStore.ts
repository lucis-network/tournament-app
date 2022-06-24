import { ReactElement } from "react";
import { makeAutoObservable } from "mobx";
import { isClientDevMode } from "../../utils/Env";
import {BracketMatchStatus, Maybe} from "../generated/graphql";

export type Team = {
  id: string | number;
  name: string;
  score: number;
  logo?: string;
};

// RoundProps
export type Round = {
  seeds: RoundMatch[]
  title: string | ReactElement,
  [key: string]: any;
}
export type RoundMatch = {
  uid: string
  teams: Team[]
  status: BracketMatchStatus
  linkStream?: Maybe<string>
  linkStreamEnable?: Maybe<boolean>
}

export type CurrentMatch = {
  uid: string
  teams: Team[]
  seedIndex: number
  roundIndex: number
  linkStream?: Maybe<string>
  linkStreamEnabled?: Maybe<boolean>
}

export type ISingleRoundStore = {
  rounds: Round[];
  updateScoreModalVisible: boolean;
  currentMatch?: CurrentMatch;
}
class SingleRoundStore implements ISingleRoundStore {
  public _rounds: Round[] = [];
  public _updateScoreModalVisible: boolean = false;
  public _currentMatch?: CurrentMatch;

  constructor() {
    makeAutoObservable(this);
  }

  setDataBracket(data: any[]) {
    this._rounds = data;
  }

  // updateCurrentMatchScore(score: number, teamIndex: number) {
  //   if (!this.currentMatch) {
  //     return
  //   }
  //
  //   this.currentMatch.teams[teamIndex].score = score;
  // }

  // reflectCurrentMatchToStore(roundIndex: number, seedIndex: number) {
  //   if (!this.currentMatch) {
  //     return
  //   }
  //   this.rounds[roundIndex].seeds[seedIndex].teams = this.currentMatch.teams;
  //   // change pointer to trigger bracket re-render
  //   this.rounds = [...this.rounds];
  // }

  setMatchScore(roundIndex: number, seedIndex: number, score0: number, score1: number) {
    this.rounds[roundIndex].seeds[seedIndex].teams[0].score = score0;
    this.rounds[roundIndex].seeds[seedIndex].teams[1].score = score1;
    // change pointer to trigger bracket re-render
    this.rounds = [...this.rounds];
  }

  public get rounds(): Round[] {
    return this._rounds;
  }
  public set rounds(value: Round[]) {
    this._rounds = value;
  }

  public get updateScoreModalVisible(): boolean {
    return this._updateScoreModalVisible;
  }
  public set updateScoreModalVisible(value: boolean) {
    this._updateScoreModalVisible = value;
  }

  public get currentMatch(): CurrentMatch | undefined {
    return this._currentMatch;
  }
  public set currentMatch(value: CurrentMatch | undefined) {
    this._currentMatch = value;
  }
}

const s = new SingleRoundStore();
export default s;

if (isClientDevMode) {
  // @ts-ignore
  window.tmp__SingleRoundStore = s;
}
