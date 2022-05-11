import { makeAutoObservable } from "mobx";
import { isClientDevMode } from "utils/Env";

export type TMyProfileStore = {
  tabActiveKey?: string,
  chooseGameModalVisible?: boolean
};

class MyProfileStore {
  private _tabActiveKey?: string = "1";
  private _chooseGameModalVisible?: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setMyProfileStore(profile: TMyProfileStore) {
    this._tabActiveKey = profile.tabActiveKey;
    this._chooseGameModalVisible = profile.chooseGameModalVisible;
  }

  getMyProfileStore() {
    let profile: TMyProfileStore = {};
    profile.tabActiveKey = this._tabActiveKey;
    profile.chooseGameModalVisible = this._chooseGameModalVisible;

    return profile;
  }

  /* ============= Getter & Setter ==============*/
  public get tabActiveKey(): string | undefined {
    return this._tabActiveKey;
  }
  public set tabActiveKey(key: string | undefined) {
    this._tabActiveKey = key;
  }
  public get chooseGameModalVisible(): boolean | undefined {
    return this._chooseGameModalVisible;
  }
  public set chooseGameModalVisible(visible: boolean | undefined) {
    this._chooseGameModalVisible = visible;
  }
}

const s = new MyProfileStore();
export default s;

if (isClientDevMode) {
  // @ts-ignore
  window.tmp__MyProfileStore = s;
}
