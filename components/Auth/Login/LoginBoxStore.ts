import { makeAutoObservable } from "mobx";
import { isClientDevMode } from "utils/Env";

class LoginBoxStore {
  private _verified: boolean = false
  private _connectModalVisible: boolean = false
  private _alertModalVisible: boolean = false
  private _signupInfoModalVisible: boolean = false

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

  get alertModalVisible(): boolean {
    return this._alertModalVisible;
  }

  set alertModalVisible(value: boolean) {
    this._alertModalVisible = value;
  }

  get signupInfoModalVisible() {
    return this._signupInfoModalVisible;
  }

  set signupInfoModalVisible(value: boolean) {
    this._signupInfoModalVisible = value;
  }
}

const s = new LoginBoxStore();

if (isClientDevMode) {
  // @ts-ignore
  window.tmp__LoginBoxStore = s;
}

export default s;