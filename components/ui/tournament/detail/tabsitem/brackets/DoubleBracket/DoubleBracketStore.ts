import { makeAutoObservable } from "mobx";
import { isClientDevMode } from "utils/Env";
import { CurrentMatch, Round } from "src/store/SingleRoundStore";

export type IDoubleBracketStore = {
  updateScoreModalVisible?: boolean
  // currentMatch?: CurrentMatch
  winRounds?: Round[]
  loseRounds?: Round[]
  finalRounds?: Round[]
}

class DoubleBracketStore implements IDoubleBracketStore {
  public updateScoreModalVisible: boolean = false;
  // public currentMatch?: CurrentMatch;

  public winRounds: Round[] = [];
  public loseRounds: Round[] = [];
  public finalRounds: Round[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setState(s: IDoubleBracketStore) {
    // @ts-ignore
    if ('updateScoreModalVisible' in s) this.updateScoreModalVisible = s.updateScoreModalVisible;
    // @ts-ignore
    // if ('currentMatch' in s) this.currentMatch = s.currentMatch;
    // @ts-ignore
    if ('winRounds' in s) this.winRounds = s.winRounds;
    // @ts-ignore
    if ('loseRounds' in s) this.loseRounds = s.loseRounds;
    // @ts-ignore
    if ('finalRounds' in s) this.finalRounds = s.finalRounds;
  }

  resetState(keys: Record<string, boolean>) {
    if ('updateScoreModalVisible' in keys) this.updateScoreModalVisible = false;
    // if ('currentMatch' in keys) this.currentMatch = undefined;
    if ('winRounds' in keys) this.winRounds = [];
    if ('loseRounds' in keys) this.loseRounds = [];
    if ('finalRounds' in keys) this.finalRounds = [];
  }

  setWinnerRoundMatchScore(roundIndex: number, seedIndex: number, score0: number, score1: number) {
    this.winRounds[roundIndex].seeds[seedIndex].teams[0].score = score0;
    this.winRounds[roundIndex].seeds[seedIndex].teams[1].score = score1;
    // change pointer to trigger bracket re-render
    this.winRounds = [...this.winRounds];
  }
  setLoserRoundMatchScore(roundIndex: number, seedIndex: number, score0: number, score1: number) {
    this.loseRounds[roundIndex].seeds[seedIndex].teams[0].score = score0;
    this.loseRounds[roundIndex].seeds[seedIndex].teams[1].score = score1;
    // change pointer to trigger bracket re-render
    this.loseRounds = [...this.loseRounds];
  }
  setFinalRoundMatchScore(roundIndex: number, seedIndex: number, score0: number, score1: number) {
    this.finalRounds[roundIndex].seeds[seedIndex].teams[0].score = score0;
    this.finalRounds[roundIndex].seeds[seedIndex].teams[1].score = score1;
    // change pointer to trigger bracket re-render
    this.finalRounds = [...this.finalRounds];
  }
}

const s = new DoubleBracketStore();
export default s;

if (isClientDevMode) {
  // @ts-ignore
  window.tmp__DoubleBracketStore = s;
}
