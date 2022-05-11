import { makeAutoObservable } from "mobx";

type Seed = {
  id: string | number;
  name: string;
  score: string | number;
};

class SingleRoundStore {
  private _rounds: any[] = [];
  private _updateScoreModalVisible: boolean = false;
  private _currentMatch: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setDataBracket(data: any[]) {
    this._rounds = data;
  }

  updateScoreCurrentMatch(
    value: string,
    roundIndex: number,
    seedIndex: number,
    teamIndex: number
  ) {
    this.rounds[roundIndex].seeds[seedIndex].teams[teamIndex].score = value;
    this.currentMatch.teams[teamIndex].score = value;
  }

  updateScoreMatch(roundIndex: number, seedIndex: number) {
    this.rounds[roundIndex].seeds[seedIndex].teams = this.currentMatch.teams;
  }

  public get rounds(): any[] {
    return this._rounds;
  }
  public set rounds(value: any[]) {
    this._rounds = value;
  }

  public get updateScoreModalVisible(): boolean {
    return this._updateScoreModalVisible;
  }
  public set updateScoreModalVisible(value: boolean) {
    this._updateScoreModalVisible = value;
  }

  public get currentMatch(): any {
    return this._currentMatch;
  }
  public set currentMatch(value: any) {
    this._currentMatch = value;
  }
}

const s = new SingleRoundStore();
export default s;
