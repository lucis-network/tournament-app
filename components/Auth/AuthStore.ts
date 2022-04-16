import { makeAutoObservable } from "mobx";
import { isClient } from "../../utils/DOM";


type TLoyalty = {
  level: number;
  totalVolume: number;
};
export type AuthUser = {
  id?: number;
  code?: string;
  address?: string;
  token?: string;
  email?: string;
  name?: string;
  loyalty?: TLoyalty;
  loading?: boolean;
  facebook?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  phone?: string;
  full_name?: string;
};
type AuthWallet = {
  address?: string;
  networkId?: number;
  chainId?: number;
  balance?: number;
};

export type TAuthInfo = AuthUser | AuthWallet;

class AuthStore {
  private _id?: number;
  private _code?: string;
  private _address?: string;
  private _token?: string;
  private _email?: string;
  private _name?: string;
  private _facebook?: string;
  private _twitter?: string;
  private _tele?: string;
  private _discord?: string;
  private _phone?: string;
  private _loyalty: TLoyalty = {
    level: 0,
    totalVolume: 0,
  };
  private _balance?: string;
  private _loading: boolean = false;

  /**
   * This state will ensure:
   * - User connected their wallet
   * - User completed the verification process
   *
   * So this will be use in the whole app,
   * whenever you wanna check if user have finished connecting their wallet and logging in
   */
  public get isLoggedIn(): boolean {
    return !!this._token;
  }

  constructor() {
    makeAutoObservable(this);
    // const u = getLocalAuthInfo();
    // if (!!u) {
    //   this.setAuthUser(u);
    // }
  }

  resetStates() {
    this._id = undefined;
    this._code = undefined;
    this._token = undefined;
    this._email = undefined;
    this._name = undefined;
    this._facebook = undefined;
    this._twitter = undefined;
    this._tele = undefined;
    this._discord = undefined;
    this._phone = undefined;
    this._loyalty = {
      level: 0,
      totalVolume: 0,
    };
    this._balance = undefined;
    this._loading = false;
  }

  setAuthUser(user: AuthUser) {
    this._id = user.id;
    this._code = user.code;
    this._address = user.address;
    this._token = user.token;
    this._email = user.email;
    this._name = user.name;
    this._loyalty = user.loyalty!;
    this._facebook = user.facebook;
    this._twitter = user.twitter;
    this._tele = user.telegram;
    this._discord = user.discord;
    this._phone = user.phone;
  }

  /* ============= Getter & Setter ==============*/

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get address(): string | undefined {
    return this._address;
  }

  set address(value: string | undefined) {
    this._address = value;
  }

  get token(): string | undefined {
    return this._token;
  }

  set token(value: string | undefined) {
    this._token = value;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string | undefined) {
    this._email = value;
  }

  get loyalty(): TLoyalty {
    return this._loyalty;
  }

  set loyalty(value: TLoyalty) {
    this._loyalty = value;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  get code(): string | undefined {
    return this._code;
  }

  set code(value: string | undefined) {
    this._code = value;
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(value: string | undefined) {
    this._name = value;
  }

  get phone(): string | undefined {
    return this._phone;
  }

  set phone(value: string | undefined) {
    this._phone = value;
  }

  get facebook(): string | undefined {
    return this._facebook;
  }

  set facebook(value: string | undefined) {
    this._facebook = value;
  }

  get twitter(): string | undefined {
    return this._twitter;
  }

  set twitter(value: string | undefined) {
    this._twitter = value;
  }

  get tele(): string | undefined {
    return this._tele;
  }

  set tele(value: string | undefined) {
    this._tele = value;
  }

  get discord(): string | undefined {
    return this._discord;
  }

  set discord(value: string | undefined) {
    this._discord = value;
  }

  get balance(): string | undefined {
    return this._balance;
  }

  set balance(value: string | undefined) {
    this._balance = value;
  }
}

const s = new AuthStore();
if (isClient) {
  // @ts-ignore
  window.tmp__AuthStore = s;
}
export default s;
