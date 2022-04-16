import { makeAutoObservable } from "mobx";

class AuthBoxStore {
  private _verified: boolean = false
  private _connectModalVisible: boolean = false


  constructor() {
    makeAutoObservable(this)
  }

  /* ============= Getter & Setter ==============*/
  get verified(): boolean {
    return this._verified;
  }

  set verified(value: boolean) {
    this._verified = value;
  }

  get connectModalVisible(): boolean {
    return this._connectModalVisible;
  }

  set connectModalVisible(value: boolean) {
    this._connectModalVisible = value;
  }
}

const s = new AuthBoxStore();
export default s;