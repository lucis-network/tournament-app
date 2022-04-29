import { makeAutoObservable } from "mobx";

export type ISponsorStore = {
  tiers: SponsorTierStore[]
}
export class SponsorStore implements ISponsorStore {
  tiers: SponsorTierStore[]

  constructor() {
    makeAutoObservable(this);
    this.tiers = [];
  }

  setState(s: ISponsorStore) {
    (s.tiers !== undefined) && (this.tiers = s.tiers);
  }
}

export type ISponsorTierStore = {
  tier_id?: string;
  name?: string;

  show_logo?: boolean;
  show_name?: boolean;
  show_ads?: boolean;
  max_slot?: number;
  min_deposit?: number;

  slots?: SponsorSlot[];
}

export class SponsorTierStore implements ISponsorTierStore {
  // config
  tier_id;
  name;

  show_logo = true;
  show_name = false;
  show_ads = false;
  max_slot = 1;
  min_deposit = 0;

  slots = [] as SponsorSlot[];

  constructor(tier_id: string, name: string, data?: ISponsorTierStore) {
    this.tier_id = tier_id
    this.name = name
    if (data) {
      this.setState(data);
    }

    makeAutoObservable(this);
  }

  setState(s: ISponsorTierStore) {
    (s.tier_id !== undefined) && (this.tier_id = s.tier_id);
    (s.name !== undefined) && (this.name = s.name);
    (s.show_logo !== undefined) && (this.show_logo = s.show_logo);
    (s.show_name !== undefined) && (this.show_name = s.show_name);
    (s.show_ads !== undefined) && (this.show_ads = s.show_ads);
    (s.max_slot !== undefined) && (this.max_slot = s.max_slot);
    (s.min_deposit !== undefined) && (this.min_deposit = s.min_deposit);
    (s.slots !== undefined) && (this.slots = s.slots);
  }
}


export type ISponsorSlot = {
  // True: This slot was buy, false: This is placeholder slot
  was_taken?: boolean

  logo?: string
  name?: string
  home_page?: string
  ads_link?: string
  tx_hash?: string
  order?: number
  amount?: number
}
export class SponsorSlot implements ISponsorSlot {
  was_taken = false

  logo?: string
  name?: string
  home_page?: string
  ads_link?: string
  tx_hash?: string
  order?: number
  amount?: number

  constructor() {
    makeAutoObservable(this);
  }

  setState(s: ISponsorSlot) {
    (s.logo !== undefined) && (this.logo = s.logo);
    (s.name !== undefined) && (this.name = s.name);
    (s.home_page !== undefined) && (this.home_page = s.home_page);
    (s.ads_link !== undefined) && (this.ads_link = s.ads_link);
    (s.tx_hash !== undefined) && (this.tx_hash = s.tx_hash);
    (s.order !== undefined) && (this.order = s.order);
    (s.amount !== undefined) && (this.amount = s.amount);
  }
}