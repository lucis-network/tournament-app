import { ReactElement } from "react";
import { makeAutoObservable } from "mobx";
import { isClientDevMode } from "../../utils/Env";
import { BracketMatchStatus } from "../generated/graphql";

export type Team = {
  id: string | number;
  name: string;
  score: number;
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
}

export type CurrentMatch = {
  uid: string
  teams: Team[]
  seedIndex: number
  roundIndex: number
}

export type ISingleRoundStore = {
  rounds: Round[];
  updateScoreModalVisible: boolean;
  currentMatch?: CurrentMatch;

  updateCurrentMatchScore(score: number, teamIndex: number): void
  reflectCurrentMatchToStore(roundIndex: number, seedIndex: number): void
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

  updateCurrentMatchScore(score: number, teamIndex: number) {
    if (!this.currentMatch) {
      return
    }

    this.currentMatch.teams[teamIndex].score = score;
  }

  reflectCurrentMatchToStore(roundIndex: number, seedIndex: number) {
    if (!this.currentMatch) {
      return
    }
    this.rounds[roundIndex].seeds[seedIndex].teams = this.currentMatch.teams;
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
