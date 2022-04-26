import { makeAutoObservable } from "mobx";

export type CreateTournament = {
  id?: number;
  name?: string;
  cover?: string;
  thumbnail?: string;
  participants?: string;
  team_size?: number;
  turns?: string;
  desc?: string;
  rules?: string;
  prize_allocation?: string;
  password?: string;
  game_uid?: string;
  currency_uid?: string;
  join_fee?: string;
  pool_size?: string;
  referees?: string;
  regions?: string;
  bracket_type?: string;
};

type PrizeAllocation = {
  position?: number;
  qty?: number;
  percent?: number;
};
class TournamentStore {
  private _chooseGameModalVisible: boolean = false;
  private _refereeModalVisible: boolean = false;
  private _prizingModalVisible: boolean = false;

  private _id?: number | undefined;

  private _name?: string | undefined;

  private _cover?: string | undefined;

  private _thumbnail?: string | undefined;

  private _participants?: number = 8;

  private _team_size?: number | undefined;

  private _turns?: number = 1;

  private _desc?: string | undefined;

  private _rules?: string | undefined;

  private _password?: string | undefined;

  private _game_uid?: string | undefined;

  private _currency_uid?: string | undefined;

  private _join_fee?: number = 0;

  private _pool_size?: number | undefined;

  private _referees?: string | undefined;

  private _regions?: string | undefined;

  private _bracket_type?: string | undefined;

  private _prize_allocation?: PrizeAllocation[] | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setPrizeAllocation(prize: PrizeAllocation[]) {
    this._prize_allocation = prize;
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

  public get prizingModalVisible(): boolean {
    return this._prizingModalVisible;
  }
  public set prizingModalVisible(value: boolean) {
    this._prizingModalVisible = value;
  }

  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number | undefined) {
    this._id = value;
  }

  public get thumbnail(): string | undefined {
    return this._thumbnail;
  }
  public set thumbnail(value: string | undefined) {
    this._thumbnail = value;
  }
  public get name(): string | undefined {
    return this._name;
  }
  public set name(value: string | undefined) {
    this._name = value;
  }
  public get cover(): string | undefined {
    return this._cover;
  }
  public set cover(value: string | undefined) {
    this._cover = value;
  }
  public get participants(): number | undefined {
    return this._participants;
  }
  public set participants(value: number | undefined) {
    this._participants = value;
  }
  public get team_size(): number | undefined {
    return this._team_size;
  }
  public set team_size(value: number | undefined) {
    this._team_size = value;
  }
  public get turns(): number | undefined {
    return this._turns;
  }
  public set turns(value: number | undefined) {
    this._turns = value;
  }
  public get desc(): string | undefined {
    return this._desc;
  }
  public set desc(value: string | undefined) {
    this._desc = value;
  }
  public get rules(): string | undefined {
    return this._rules;
  }
  public set rules(value: string | undefined) {
    this._rules = value;
  }
  public get password(): string | undefined {
    return this._password;
  }
  public set password(value: string | undefined) {
    this._password = value;
  }
  public get game_uid(): string | undefined {
    return this._game_uid;
  }
  public set game_uid(value: string | undefined) {
    this._game_uid = value;
  }
  public get currency_uid(): string | undefined {
    return this._currency_uid;
  }
  public set currency_uid(value: string | undefined) {
    this._currency_uid = value;
  }
  public get join_fee(): number | undefined {
    return this._join_fee;
  }
  public set join_fee(value: number | undefined) {
    this._join_fee = value;
  }
  public get pool_size(): number | undefined {
    return this._pool_size;
  }
  public set pool_size(value: number | undefined) {
    this._pool_size = value;
  }
  public get referees(): string | undefined {
    return this._referees;
  }
  public set referees(value: string | undefined) {
    this._referees = value;
  }
  public get regions(): string | undefined {
    return this._regions;
  }
  public set regions(value: string | undefined) {
    this._regions = value;
  }
  public get bracket_type(): string | undefined {
    return this._bracket_type;
  }
  public set bracket_type(value: string | undefined) {
    this._bracket_type = value;
  }
  public get prize_allocation(): PrizeAllocation[] | undefined {
    return this._prize_allocation;
  }
  public set prize_allocation(value: PrizeAllocation[] | undefined) {
    this._prize_allocation = value;
  }
}

const s = new TournamentStore();
export default s;
