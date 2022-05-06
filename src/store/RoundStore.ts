import { makeAutoObservable } from "mobx";

class RoundStore {
  private _singleRounds: any[] = [];
  private _bracketTeams: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setDataBracket(data: any[]) {
    this._singleRounds = data;
  }

  public get bracketTeams(): any[] {
    return this._bracketTeams;
  }
  public set bracketTeams(value: any[]) {
    this._bracketTeams = value;
  }

  public get singleRounds(): any[] {
    return this._singleRounds;
  }
  public set singleRounds(value: any[]) {
    this._singleRounds = value;
  }
}

const s = new RoundStore();
export default s;
