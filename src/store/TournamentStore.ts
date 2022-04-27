import { makeAutoObservable } from "mobx";

class TournamentStore {
  private _chooseGameModalVisible: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  /* ============= Getter & Setter ==============*/
  public get chooseGameModalVisible(): boolean {
    return this._chooseGameModalVisible;
  }
  public set chooseGameModalVisible(value: boolean) {
    this._chooseGameModalVisible = value;
  }
}

const s = new TournamentStore();
export default s;
