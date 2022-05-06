import { makeAutoObservable } from "mobx";

type Seed = {
  id: string | number;
  name: string;
  score: string | number;
};

class RoundStore {
  private _singleRounds: any[] = [];
  private _winRounds: any[] = [];
  private _loseRounds: any[] = [];
  private _finalRound: any[] = [];
  private _updateScoreModal: boolean = false;
  private _currentMatch: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setDataBracket(data: any[]) {
    this._singleRounds = data;
  }

  public get singleRounds(): any[] {
    return this._singleRounds;
  }
  public set singleRounds(value: any[]) {
    this._singleRounds = value;
  }

  public get winRounds(): any[] {
    return this._winRounds;
  }
  public set winRounds(value: any[]) {
    this._winRounds = value;
  }

  public get loseRounds(): any[] {
    return this._loseRounds;
  }
  public set loseRounds(value: any[]) {
    this._loseRounds = value;
  }

  public get finalRound(): any[] {
    return this._finalRound;
  }
  public set finalRound(value: any[]) {
    this._finalRound = value;
  }

  public get updateScoreModal(): boolean {
    return this._updateScoreModal;
  }
  public set updateScoreModal(value: boolean) {
    this._updateScoreModal = value;
  }

  public get currentMatch(): any {
    return this._currentMatch;
  }
  public set currentMatch(value: any) {
    this._currentMatch = value;
  }
}

const s = new RoundStore();
export default s;
