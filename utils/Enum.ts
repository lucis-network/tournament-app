export const Teamsize = [5, 10, 15];
export const Region = [{ value: "VN", label: "Viet Nam" }];
export const Participants = [2, 4, 8, 16, 32, 64, 128, 256, 512];
export const Rounds = [1, 3, 5, 7, 9];
export const BracketType = [
  { value: "SINGLE", label: "Single elimination" },
  { value: "DOUBLE", label: "Double elimination" },
  { value: "BATTLE_ROYALE", label: "Battle Royal" },
];
export const ChainOption = [
  { value: "USDT", label: "USDT" },
  { value: "BUSD", label: "BUSD" },
];

export const BUSD = "0x4bE02BFe61a7ABDd31F8fE5e51a03ABd7028d450";
export const USDT = "0x7e66289AeD602Ed053F5Dc0cFC2973a3EB471731";
export const LUCIS = "0x0B0AF2077D1D831A879aBa2775b1a90dcE7c994A";

export const LucisNFT = "0x7DADfE84b3Da1d3bfbf73802dAb1D47ECF27a3c9";
export const BoxAddress = "0xDE6C81C0b87c17b54d9C6C6A53be8ACf5912D9d6";
export const NFTManager = "0x061017427D9Ac586dD85c69d1D24cF6c84689914";

export const LUCIS_FEE = 0;
export const REFEREES_FEE = 1;
export const LUCIS_FEE_DONATION = 5;
export enum REWARD_TYPES {}

export enum StatusGameType {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  CLOSED = "CLOSED",
}

export enum Bracket {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  ROUND_ROBIN = "ROUND_ROBIN",
  BATTLE_ROYALE = "BATTLE_ROYALE",
  SWISS = "SWISS",
  ALL = "ALL",
}

export enum OrderType {
  ASC = "ASC",
  DESC = "DESC",
  NONE = "NONE",
}

export const orderValues = [
  { key: "ASC", value: "Asc" },
  { key: "DESC", value: "Desc" },
];

export const bracketValues = [
  { key: "SINGLE", value: "Single Elimination" },
  { key: "DOUBLE", value: "Double Elimination" },
];

export const LINK_URL = "https://lucis-tn.koolab.io";

export const MAP_CSGO: { [s: string]: string } = {
  de_inferno: "Inferno",
  de_dust2: "Dust II",
  de_dust3: "Dust III",
  de_dust1: "Dust I",
  de_vertigo: "Vertigo",
  de_mirage: "Mirage",
  de_cache: "Cache",
  de_nuke: "Nuke",
  de_overpass: "Overpass",
  de_ancient: "Ancient",
  de_cbble: "Cbble",
  de_train: "Train",
  Dust2: "Dust II",
  de_aztec: "Aztec",
  de_tuscan: "Tuscan",
  de_prodigy: "Prodigy",
};

export const MAP_LOL: { [type: string]: string } = {
  NormalDraft: "SUMMONER'S RIFT",
  Aram: "ARAM",
  None: "SUMMONER'S RIFT",
  RankSingleDouble: "SUMMONER'S RIFT",
  RankFlexible: "SUMMONER'S RIFT",
};

export const MODE_LOL: { [type: string]: string } = {
  NormalDraft: "Normal",
  Aram: "ARAM",
  RankSingleDouble: "Rank",
  RankFlexible: "Rank",
  None: "Other",
};

export enum Game {
  NONE,
  CSGO,
  LOL,
}

export enum Platform {
  NONE,
  FACEIT,
  STEAM,
  RIOT,
  GARENA,
}

export enum OverviewSection {
  NONE,
  CONNECT_GAME,
}
