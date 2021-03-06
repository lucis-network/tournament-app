import { makeAutoObservable } from "mobx";
import { isClientDevMode } from "utils/Env";

export type CreateTournament = {
  name?: string;
  cover?: string;
  thumbnail?: string;
  participants?: number;
  team_size?: number;
  turns?: number;
  desc?: string;
  rules?: string;
  prize_allocation?: PrizeAllocation[];
  password?: string;
  game_uid?: string;
  currency_uid?: string;
  currency_symbol?: string;
  currency_address?: string;
  join_fee?: number;
  pool_size?: number;
  referees?: number[];
  regions?: string[];
  bracket_type?: string;
  sponsor_slots?: SponsorTierType[];
  start_at?: Date;
  rounds?: Rounds[];
  discord?: string;
  is_auto_checkin?: boolean;
};

export type PrizeAllocation = {
  position?: number;
  qty?: number;
  percent?: number;
};

export type SponsorTierType = {
  name?: string;
  max: number;
  min: number;
  show_logo?: boolean;
  show_name?: boolean;
  cover?: string;
  show_ads?: boolean;
  sponsor_transactions?: SponsorTransactions;
};

export type SponsorTransactions = {
  createMany?: CreateMany;
};

export type CreateMany = {
  data: SponsorSlotType[];
};

export type SponsorSlotType = {
  logo?: string;
  name: string;
  home_page?: string;
  ads_link?: string;
  order?: number;
  amount: number;
};

export type Rounds = {
  title?: string;
  start_at?: Date;
  type?: string;
};

const DEFAULT_PARTICIPANTS = 8;
const DEFAULT_TURNS = 1;
const DEFAULT_CURRENCY_UID = "BSC_BUSD";
const DEFAULT_CURRENCY_SYMBOL = "BUSD";
const DEFAULT_JOIN_FEE = 0;
const DEFAULT_REGIONS = ["AA"];
class TournamentStore {
  private _depositModalVisible: boolean = false;
  private _chooseGameModalVisible: boolean = false;
  private _refereeModalVisible: boolean = false;
  private _prizingModalVisible: boolean = false;
  private _draftPopupVisible: boolean = false;
  private _timelineModalVisible: boolean = false;
  private _notifyModalVisible: boolean = false;
  private _claimDonationModalVisible: boolean = false;
  private _claimResultModalVisible: boolean = false;
  private _checkDepositApprove: boolean = false;
  private _checkDonationApprove: boolean = false;
  private _checkBecomeSponser: boolean = false;
  private _loadingCeateTeam: boolean = false;
  private _checkBacktoTournament: boolean = false;

  private _id?: number | undefined;

  private _name?: string | undefined;

  private _cover?: string | undefined;

  private _thumbnail?: string | undefined;

  private _participants?: number = DEFAULT_PARTICIPANTS;

  private _team_size?: number | undefined;

  private _turns?: number = DEFAULT_TURNS;

  private _desc?: string | undefined;

  private _rules?: string | undefined;

  private _password?: string | undefined;

  private _game_uid?: string | undefined;

  // private _currency_uid?: string = DEFAULT_CURRENCY_UID;

  // private _currency_symbol?: string | undefined = DEFAULT_CURRENCY_SYMBOL;

  private _currency_uid?: string | undefined;

  private _currency_symbol?: string | undefined;

  private _currency_address?: string | undefined;

  private _join_fee?: number = DEFAULT_JOIN_FEE;

  private _pool_size?: number | undefined;

  private _referees?: number[] | undefined = [];

  private _regions?: string[] = DEFAULT_REGIONS;

  private _bracket_type?: string | undefined;

  private _prize_allocation?: PrizeAllocation[] | undefined;

  private _start_at?: Date | undefined;

  private _sponsor_slots: SponsorTierType[] | undefined;

  private _rounds?: Rounds[] | undefined;

  private _discord?: string | undefined;

  private _is_auto_checkin?: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setCreateTournament(cr: CreateTournament) {
    this._name = cr.name;
    this._cover = cr.cover;
    this._thumbnail = cr.thumbnail;
    this._participants = cr.participants;
    this._team_size = cr.team_size;
    this._turns = cr.turns;
    this._desc = cr.desc;
    this._rules = cr.rules;
    this._prize_allocation = cr.prize_allocation;
    this._password = cr.password;
    this._game_uid = cr.game_uid;
    this._currency_uid = cr.currency_uid;
    this._join_fee = cr.join_fee;
    this._pool_size = cr.pool_size;
    this._referees = cr.referees;
    this._regions = cr.regions;
    this._bracket_type = cr.bracket_type;
    this._sponsor_slots = cr.sponsor_slots;
    this._start_at = cr.start_at;
    this._rounds = cr.rounds;
    this._discord = cr.discord;
    this._is_auto_checkin = cr.is_auto_checkin;
  }

  resetStates() {
    this._name = undefined;
    this._cover = undefined;
    this._thumbnail = undefined;
    this._participants = DEFAULT_PARTICIPANTS;
    this._team_size = undefined;
    this._turns = DEFAULT_TURNS;
    this._desc = undefined;
    this._rules = undefined;
    this._prize_allocation = undefined;
    this._password = undefined;
    this._game_uid = undefined;
    this._currency_uid = DEFAULT_CURRENCY_UID;
    this._currency_symbol = DEFAULT_CURRENCY_SYMBOL;
    this._currency_address = undefined;
    this._join_fee = DEFAULT_JOIN_FEE;
    this._pool_size = undefined;
    this._referees = undefined;
    this._regions = DEFAULT_REGIONS;
    this._bracket_type = undefined;
    this._sponsor_slots = undefined;
    this._start_at = undefined;
    this._rounds = undefined;
    this._discord = undefined;
    this._is_auto_checkin = false;
  }

  getCreateTournament() {
    let cr: CreateTournament = {};
    cr.name = this._name;
    cr.cover = this._cover;
    cr.thumbnail = this._thumbnail;
    cr.participants = this._participants;
    cr.team_size = this._team_size;
    cr.turns = this._turns;
    cr.desc = this._desc;
    cr.rules = this._rules;
    cr.prize_allocation = this._prize_allocation;
    cr.password = this._password;
    cr.game_uid = this._game_uid;
    cr.currency_uid = this._currency_uid;
    cr.join_fee = this._join_fee;
    cr.pool_size = this._pool_size;
    cr.referees = this._referees;
    cr.regions = this._regions;
    cr.bracket_type = this._bracket_type;
    cr.sponsor_slots = this._sponsor_slots;
    cr.start_at = this._start_at;
    cr.rounds = this._rounds;
    cr.discord = this._discord;
    cr.is_auto_checkin = this._is_auto_checkin;
    return cr;
  }

  /* ============= Getter & Setter ==============*/
  public get draftPopupVisible(): boolean {
    return this._draftPopupVisible;
  }
  public set draftPopupVisible(value: boolean) {
    this._draftPopupVisible = value;
  }

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

  public get timelineModalVisible(): boolean {
    return this._timelineModalVisible;
  }
  public set timelineModalVisible(value: boolean) {
    this._timelineModalVisible = value;
  }

  /* ------------ INFO ------------ */

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
  public get referees(): number[] {
    return this._referees ? this._referees : [];
  }
  public set referees(value: number[]) {
    this._referees = value;
  }
  public get regions(): string[] {
    return this._regions ? this._regions : [];
  }
  public set regions(value: string[]) {
    this._regions = value;
  }
  public get bracket_type(): string | undefined {
    return this._bracket_type;
  }
  public set bracket_type(value: string | undefined) {
    this._bracket_type = value;
  }
  public get prize_allocation(): PrizeAllocation[] {
    return this._prize_allocation ? this._prize_allocation : [];
  }
  public set prize_allocation(value: PrizeAllocation[]) {
    this._prize_allocation = value;
  }

  public get start_at(): Date | undefined {
    return this._start_at;
  }
  public set start_at(value: Date | undefined) {
    this._start_at = value;
  }
  public get sponsor_slots(): SponsorTierType[] {
    return this._sponsor_slots ? this._sponsor_slots : [];
  }
  public set sponsor_slots(value: SponsorTierType[]) {
    this._sponsor_slots = value;
  }
  public get depositModalVisible(): boolean {
    return this._depositModalVisible;
  }
  public set depositModalVisible(value: boolean) {
    this._depositModalVisible = value;
  }
  public get notifyModalVisible(): boolean {
    return this._notifyModalVisible;
  }
  public set notifyModalVisible(value: boolean) {
    this._notifyModalVisible = value;
  }
  public get rounds(): Rounds[] {
    return this._rounds ? this._rounds : [];
  }
  public set rounds(value: Rounds[]) {
    this._rounds = value;
  }

  public get claimDonationModalVisible(): boolean {
    return this._claimDonationModalVisible;
  }
  public set claimDonationModalVisible(value: boolean) {
    this._claimDonationModalVisible = value;
  }

  public get claimResultModalVisible(): boolean {
    return this._claimResultModalVisible;
  }
  public set claimResultModalVisible(value: boolean) {
    this._claimResultModalVisible = value;
  }

  public get checkDepositApprove(): boolean {
    return this._checkDepositApprove;
  }
  public set checkDepositApprove(value: boolean) {
    this._checkDepositApprove = value;
  }
  public get checkDonationApprove(): boolean {
    return this._checkDonationApprove;
  }
  public set checkDonationApprove(value: boolean) {
    this._checkDonationApprove = value;
  }
  public get checkBecomeSponser(): boolean {
    return this._checkBecomeSponser;
  }
  public set checkBecomeSponser(value: boolean) {
    this._checkBecomeSponser = value;
  }

  public get discord(): string | undefined {
    return this._discord;
  }
  public set discord(value: string | undefined) {
    this._discord = value;
  }

  public get currency_symbol(): string | undefined {
    return this._currency_symbol;
  }
  public set currency_symbol(value: string | undefined) {
    this._currency_symbol = value;
  }

  public get currency_address(): string | undefined {
    return this._currency_address;
  }
  public set currency_address(value: string | undefined) {
    this._currency_address = value;
  }

  public get is_auto_checkin() {
    return this._is_auto_checkin;
  }

  public set is_auto_checkin(value) {
    this._is_auto_checkin = value;
  }

  public get loadingCeateTeam(): boolean {
    return this._loadingCeateTeam;
  }
  public set loadingCeateTeam(value: boolean) {
    this._loadingCeateTeam = value;
  }
  
  public get checkBacktoTournament(): boolean {
    return this._checkBacktoTournament;
  }
  public set checkBacktoTournament(value: boolean) {
    this._checkBacktoTournament = value;
  }
}

const s = new TournamentStore();
export default s;

if (isClientDevMode) {
  // @ts-ignore
  window.tmp__TournamentStore = s;
}
