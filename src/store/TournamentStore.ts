import { makeAutoObservable } from "mobx";

class TournamentStore {
  private _chooseGameModalVisible: boolean = false;
  private _refereeModalVisible: boolean = false;

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

  public get refereeModalVisible(): boolean {
    return this._refereeModalVisible;
  }
  public set refereeModalVisible(value: boolean) {
    this._refereeModalVisible = value;
  }
}

const s = new TournamentStore();
export default s;
