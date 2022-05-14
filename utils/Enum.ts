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

export const LINK_URL = "https://lucis-lp.koolab.io/"