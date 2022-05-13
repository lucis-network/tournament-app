import { makeAutoObservable } from "mobx";
import { isClientDevMode } from "utils/Env";
import { CurrentMatch, Round } from "src/store/SingleRoundStore";

class DoubleBracketStore {
  public updateScoreModalVisible: boolean = false;
  public currentMatch?: CurrentMatch;

  public winRounds: Round[] = [];
  public loseRounds: Round[] = [];
  public finalRounds: Round[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}

const s = new DoubleBracketStore();
export default s;

if (isClientDevMode) {
  // @ts-ignore
  window.tmp__DoubleBracketStore = s;
}
