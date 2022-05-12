import { makeAutoObservable } from "mobx";
import { isClientDevMode } from "../../utils/Env";

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

  updateCurrentMatchScore(score: number, teamIndex: number) {
    this.currentMatch.teams[teamIndex].score = score;
  }

  reflectCurrentMatchToStore(roundIndex: number, seedIndex: number) {
    this.rounds[roundIndex].seeds[seedIndex].teams = this.currentMatch.teams;
    // change pointer to trigger bracket re-render
    this.rounds = [...this.rounds];
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

if (isClientDevMode) {
  // @ts-ignore
  window.tmp__SingleRoundStore = s;
}
