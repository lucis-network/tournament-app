import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** An arbitrary-precision Decimal type */
  Decimal: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AuthGraphql = {
  __typename?: "AuthGraphql";
  token: Scalars["String"];
  user?: Maybe<UserGraphql>;
};

export type Bracket = {
  __typename?: "Bracket";
  _count: BracketCount;
  bracketMatchs?: Maybe<Array<BracketMatch>>;
  bracketRounds?: Maybe<Array<BracketRound>>;
  bracketTeams?: Maybe<Array<BracketTeam>>;
  created_at: Scalars["DateTime"];
  start_at: Scalars["DateTime"];
  status: BracketStatus;
  tournament: Tournament;
  tournament_uid: Scalars["String"];
  type: BracketType;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type BracketCount = {
  __typename?: "BracketCount";
  bracketMatchs: Scalars["Int"];
  bracketRounds: Scalars["Int"];
  bracketTeams: Scalars["Int"];
};

export type BracketMatch = {
  __typename?: "BracketMatch";
  bracket: Bracket;
  bracket_uid: Scalars["String"];
  created_at: Scalars["DateTime"];
  link_stream?: Maybe<Scalars["String"]>;
  lower_match_id?: Maybe<Scalars["String"]>;
  next_match_id?: Maybe<Scalars["String"]>;
  pre_match_id?: Maybe<Scalars["String"]>;
  round_uid: Scalars["String"];
  score_1?: Maybe<Scalars["Int"]>;
  score_2?: Maybe<Scalars["Int"]>;
  status: BracketMatchStatus;
  team_1?: Maybe<Scalars["String"]>;
  team_2?: Maybe<Scalars["String"]>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  uper_match_id?: Maybe<Scalars["String"]>;
};

export enum BracketMatchStatus {
  Complete = "COMPLETE",
  Pending = "PENDING",
}

export type BracketRound = {
  __typename?: "BracketRound";
  bracket: Bracket;
  bracket_uid: Scalars["String"];
  created_at: Scalars["DateTime"];
  start_at: Scalars["DateTime"];
  title: Scalars["String"];
  type: BracketRoundType;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type BracketRoundCreateInputGql = {
  start_at: Scalars["DateTime"];
  title: Scalars["String"];
  type?: InputMaybe<BracketRoundType>;
};

export enum BracketRoundType {
  Lower = "LOWER",
  Upper = "UPPER",
}

export enum BracketStatus {
  Complete = "COMPLETE",
  Ongoing = "ONGOING",
  Pending = "PENDING",
}

export type BracketTeam = {
  __typename?: "BracketTeam";
  _count: BracketTeamCount;
  bracket: Bracket;
  bracketTeamMembers?: Maybe<Array<BracketTeamMembers>>;
  bracket_uid: Scalars["String"];
  created_at: Scalars["DateTime"];
  team: Team;
  team_uid: Scalars["String"];
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type BracketTeamCount = {
  __typename?: "BracketTeamCount";
  bracketTeamMembers: Scalars["Int"];
};

export type BracketTeamMembers = {
  __typename?: "BracketTeamMembers";
  bracketTeam: BracketTeam;
  bracket_team_uid: Scalars["String"];
  created_at: Scalars["DateTime"];
  id_in_game?: Maybe<Scalars["String"]>;
  is_leader?: Maybe<Scalars["Boolean"]>;
  prize_alloc?: Maybe<Scalars["Decimal"]>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user_id: Scalars["Int"];
};

export enum BracketType {
  BattleRoyale = "BATTLE_ROYALE",
  Double = "DOUBLE",
  RoundRobin = "ROUND_ROBIN",
  Single = "SINGLE",
  Swiss = "SWISS",
}

export type CacheTournament = {
  __typename?: "CacheTournament";
  created_at: Scalars["DateTime"];
  id: Scalars["ID"];
  team_participated: Scalars["Int"];
  tournament: Tournament;
  tournament_uid: Scalars["String"];
  updated_at: Scalars["DateTime"];
};

export type CacheTournamentCreateNestedOneWithoutTournamentInput = {
  connect?: InputMaybe<CacheTournamentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CacheTournamentCreateOrConnectWithoutTournamentInput>;
  create?: InputMaybe<CacheTournamentCreateWithoutTournamentInput>;
};

export type CacheTournamentCreateOrConnectWithoutTournamentInput = {
  create: CacheTournamentCreateWithoutTournamentInput;
  where: CacheTournamentWhereUniqueInput;
};

export type CacheTournamentCreateWithoutTournamentInput = {
  created_at?: InputMaybe<Scalars["DateTime"]>;
  team_participated: Scalars["Int"];
  updated_at?: InputMaybe<Scalars["DateTime"]>;
};

export type CacheTournamentWhereUniqueInput = {
  id?: InputMaybe<Scalars["Int"]>;
  tournament_uid?: InputMaybe<Scalars["String"]>;
};

export type Chain = {
  __typename?: "Chain";
  Contracts?: Maybe<Array<Contracts>>;
  Currency?: Maybe<Array<Currency>>;
  _count: ChainCount;
  chain_id?: Maybe<Scalars["Int"]>;
  created_at: Scalars["DateTime"];
  icon?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  rpc_url?: Maybe<Scalars["String"]>;
  symbol: ChainSymbol;
  updated_at: Scalars["DateTime"];
};

export type ChainCount = {
  __typename?: "ChainCount";
  Contracts: Scalars["Int"];
  Currency: Scalars["Int"];
};

export enum ChainSymbol {
  Avax = "AVAX",
  Bsc = "BSC",
  Eth = "ETH",
  Flow = "FLOW",
  Near = "NEAR",
  Polkadot = "POLKADOT",
  Polygon = "POLYGON",
  Solana = "SOLANA",
}

export type ClaimTransactions = {
  __typename?: "ClaimTransactions";
  amount?: Maybe<Scalars["Decimal"]>;
  created_at: Scalars["DateTime"];
  currency_uid: Scalars["String"];
  tournament_uid: Scalars["String"];
  tournaments: Tournament;
  tx_hash?: Maybe<Scalars["String"]>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  usd_value?: Maybe<Scalars["Decimal"]>;
  user: User;
  user_id: Scalars["Int"];
};

export type Contracts = {
  __typename?: "Contracts";
  address?: Maybe<Scalars["String"]>;
  admin?: Maybe<Scalars["String"]>;
  admin_prv_key?: Maybe<Scalars["String"]>;
  chain?: Maybe<Chain>;
  chain_symbol?: Maybe<ChainSymbol>;
  created_at: Scalars["DateTime"];
  currency_symbol?: Maybe<Scalars["String"]>;
  is_transfered?: Maybe<Scalars["Int"]>;
  owner?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type Currency = {
  __typename?: "Currency";
  _count: CurrencyCount;
  address?: Maybe<Scalars["String"]>;
  chain?: Maybe<Chain>;
  chain_symbol?: Maybe<ChainSymbol>;
  created_at: Scalars["DateTime"];
  icon?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
  tournaments?: Maybe<Array<Tournament>>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type CurrencyCount = {
  __typename?: "CurrencyCount";
  tournaments: Scalars["Int"];
};

export type CurrencyGql = {
  __typename?: "CurrencyGql";
  address?: Maybe<Scalars["String"]>;
  chain_symbol?: Maybe<ChainSymbol>;
  created_at: Scalars["DateTime"];
  icon?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type DonateTransaction = {
  __typename?: "DonateTransaction";
  amount?: Maybe<Scalars["Decimal"]>;
  created_at: Scalars["DateTime"];
  from: Scalars["String"];
  to: Scalars["String"];
  tournament_uid: Scalars["String"];
  tournaments: Tournament;
  tx_hash?: Maybe<Scalars["String"]>;
  type?: Maybe<DonateTransactionsType>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  usd_value?: Maybe<Scalars["Decimal"]>;
};

export enum DonateTransactionsType {
  Player = "PLAYER",
  Referee = "REFEREE",
  Team = "TEAM",
  Tournament = "TOURNAMENT",
}

export type EarningHistory = {
  __typename?: "EarningHistory";
  amount?: Maybe<Scalars["Float"]>;
  symbol?: Maybe<Scalars["String"]>;
  tournament_name?: Maybe<Scalars["String"]>;
  tx_hash?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type Game = {
  __typename?: "Game";
  _count: GameCount;
  created_at: Scalars["DateTime"];
  desc?: Maybe<Scalars["String"]>;
  favorite_user?: Maybe<Array<UserFavoriteGame>>;
  logo?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  tournaments?: Maybe<Array<Tournament>>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type GameCount = {
  __typename?: "GameCount";
  favorite_user: Scalars["Int"];
  tournaments: Scalars["Int"];
};

export type Member = {
  __typename?: "Member";
  avatar?: Maybe<Scalars["String"]>;
  full_name?: Maybe<Scalars["String"]>;
  is_leader?: Maybe<Scalars["Boolean"]>;
  user_id?: Maybe<Scalars["Int"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addFavoriteGame?: Maybe<Scalars["Boolean"]>;
  createTournament?: Maybe<Scalars["String"]>;
  /** Generate nonce for user login */
  generateNonce: Scalars["String"];
  /** Facebook login */
  loginFacebook: AuthGraphql;
  /** Google login */
  loginGoogle: AuthGraphql;
  updateProfile?: Maybe<UserProfile>;
};

export type MutationAddFavoriteGameArgs = {
  game_uid: Scalars["String"];
};

export type MutationCreateTournamentArgs = {
  input: TournamentCreateInputGql;
};

export type MutationGenerateNonceArgs = {
  address: Scalars["String"];
};

export type MutationLoginFacebookArgs = {
  accessToken: Scalars["String"];
};

export type MutationLoginGoogleArgs = {
  token: Scalars["String"];
};

export type MutationUpdateProfileArgs = {
  data: ProfileUpdateInput;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars["String"]>;
};

export type PrizeAllocation = {
  /** Percent allocation */
  percent: Scalars["Float"];
  /** Level of team */
  position: Scalars["Int"];
  /** Number of teams */
  qty: Scalars["Int"];
};

export type ProfileUpdateInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  biography?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  cover?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  discord?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  display_name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  facebook?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  telegram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  user_name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type Query = {
  __typename?: "Query";
  currencies?: Maybe<Array<CurrencyGql>>;
  getClosedTournament?: Maybe<Array<Tournament>>;
  getGame?: Maybe<Array<Game>>;
  getOnGoingTournament?: Maybe<Array<Tournament>>;
  getReferee?: Maybe<Array<Referee>>;
  getTeam?: Maybe<Array<UserTeam>>;
  getUpComingTournament?: Maybe<Array<Tournament>>;
  me?: Maybe<UserGraphql>;
  regions?: Maybe<Array<Region>>;
  search?: Maybe<Array<Tournament>>;
  searchTeam?: Maybe<Array<UserTeam>>;
};

export type QueryGetClosedTournamentArgs = {
  data: TournamentFilterInput;
};

export type QueryGetGameArgs = {
  name: Scalars["String"];
};

export type QueryGetOnGoingTournamentArgs = {
  data: TournamentFilterInput;
};

export type QueryGetRefereeArgs = {
  name: Scalars["String"];
};

export type QueryGetUpComingTournamentArgs = {
  data: TournamentFilterInput;
};

export type QuerySearchArgs = {
  value: Scalars["String"];
};

export type QuerySearchTeamArgs = {
  name: Scalars["String"];
};

export type Reaction = {
  __typename?: "Reaction";
  created_at: Scalars["DateTime"];
  tournament: Tournament;
  tournament_uid: Scalars["String"];
  type: ReactionType;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["Int"];
};

export enum ReactionType {
  Dislike = "DISLIKE",
  Hear = "HEAR",
  Like = "LIKE",
}

export type Referee = {
  __typename?: "Referee";
  created_at: Scalars["DateTime"];
  desc?: Maybe<Scalars["String"]>;
  updated_at: Scalars["DateTime"];
  user?: Maybe<User>;
  user_id: Scalars["ID"];
};

export type Region = {
  __typename?: "Region";
  created_at: Scalars["DateTime"];
  name?: Maybe<Scalars["String"]>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type SponsorSlot = {
  __typename?: "SponsorSlot";
  _count: SponsorSlotCount;
  cover?: Maybe<Scalars["String"]>;
  created_at: Scalars["DateTime"];
  max: Scalars["Int"];
  min: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
  show_ads?: Maybe<Scalars["Boolean"]>;
  show_logo?: Maybe<Scalars["Boolean"]>;
  show_name?: Maybe<Scalars["Boolean"]>;
  sponsor_transactions?: Maybe<Array<SponsorTransaction>>;
  tournament: Tournament;
  tournaments_uid: Scalars["String"];
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type SponsorSlotCount = {
  __typename?: "SponsorSlotCount";
  sponsor_transactions: Scalars["Int"];
};

export type SponsorSlotCreateInputGql = {
  cover?: InputMaybe<Scalars["String"]>;
  max: Scalars["Int"];
  min: Scalars["Int"];
  name?: InputMaybe<Scalars["String"]>;
  show_ads?: InputMaybe<Scalars["Boolean"]>;
  show_logo?: InputMaybe<Scalars["Boolean"]>;
  show_name?: InputMaybe<Scalars["Boolean"]>;
  uid?: InputMaybe<Scalars["String"]>;
};

export type SponsorTransaction = {
  __typename?: "SponsorTransaction";
  ads_link?: Maybe<Scalars["String"]>;
  amount: Scalars["Decimal"];
  created_at: Scalars["DateTime"];
  home_page?: Maybe<Scalars["String"]>;
  logo?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  sponsor_slot: SponsorSlot;
  sponsor_slot_uid: Scalars["String"];
  tx_hash?: Maybe<Scalars["String"]>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["Int"];
};

export enum Status {
  Closed = "CLOSED",
  Opening = "OPENING",
  Upcoming = "UPCOMING",
}

export type TTournament = {
  __typename?: "TTournament";
  _count: TournamentCount;
  brackets?: Maybe<Array<Bracket>>;
  cache_tournament?: Maybe<CacheTournament>;
  claim_transactions?: Maybe<Array<ClaimTransactions>>;
  cover: Scalars["String"];
  created_at: Scalars["DateTime"];
  currency: Currency;
  currency_uid: Scalars["String"];
  desc?: Maybe<Scalars["String"]>;
  game: Game;
  game_uid: Scalars["String"];
  join_fee?: Maybe<Scalars["Decimal"]>;
  name: Scalars["String"];
  participants: Scalars["Int"];
  pool_size: Scalars["Decimal"];
  prize_allocation: Scalars["JSON"];
  reaction?: Maybe<Array<Reaction>>;
  referees: Scalars["String"];
  regions?: Maybe<Scalars["String"]>;
  rules?: Maybe<Scalars["String"]>;
  sponsorSlot?: Maybe<Array<SponsorSlot>>;
  start_at?: Maybe<Scalars["DateTime"]>;
  team_participated?: Maybe<Scalars["Int"]>;
  team_size: Scalars["Int"];
  thumbnail: Scalars["String"];
  tournament_status?: Maybe<Status>;
  tournament_subscribes?: Maybe<Array<TournamentSubscriber>>;
  tournament_type?: Maybe<TournamentType>;
  turns?: Maybe<Scalars["Int"]>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user_id: Scalars["Int"];
};

export type Team = {
  __typename?: "Team";
  BracketTeam?: Maybe<Array<BracketTeam>>;
  _count: TeamCount;
  avatar?: Maybe<Scalars["String"]>;
  created_at: Scalars["DateTime"];
  created_by: Scalars["Int"];
  name: Scalars["String"];
  team_members?: Maybe<Array<TeamMember>>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type TeamCount = {
  __typename?: "TeamCount";
  BracketTeam: Scalars["Int"];
  team_members: Scalars["Int"];
};

export type TeamMember = {
  __typename?: "TeamMember";
  created_at: Scalars["DateTime"];
  is_leader?: Maybe<Scalars["Boolean"]>;
  team: Team;
  team_uid: Scalars["String"];
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["Int"];
};

export type Tournament = {
  __typename?: "Tournament";
  _count: TournamentCount;
  brackets?: Maybe<Array<Bracket>>;
  cache_tournament?: Maybe<CacheTournament>;
  claim_transactions?: Maybe<Array<ClaimTransactions>>;
  cover: Scalars["String"];
  created_at: Scalars["DateTime"];
  currency: Currency;
  currency_uid: Scalars["String"];
  desc?: Maybe<Scalars["String"]>;
  donate_transactions?: Maybe<Array<DonateTransaction>>;
  game: Game;
  game_uid: Scalars["String"];
  invite_link?: Maybe<Scalars["String"]>;
  join_fee?: Maybe<Scalars["Decimal"]>;
  name: Scalars["String"];
  participants: Scalars["Int"];
  password?: Maybe<Scalars["String"]>;
  pool_size: Scalars["Decimal"];
  prize_allocation: Scalars["JSON"];
  reaction?: Maybe<Array<Reaction>>;
  referees: Scalars["String"];
  regions?: Maybe<Scalars["String"]>;
  rules?: Maybe<Scalars["String"]>;
  sponsorSlot?: Maybe<Array<SponsorSlot>>;
  status: TournamentStatus;
  team_size: Scalars["Int"];
  thumbnail: Scalars["String"];
  tournament_subscribes?: Maybe<Array<TournamentSubscriber>>;
  turns?: Maybe<Scalars["Int"]>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["Int"];
};

export type TournamentCount = {
  __typename?: "TournamentCount";
  brackets: Scalars["Int"];
  claim_transactions: Scalars["Int"];
  donate_transactions: Scalars["Int"];
  reaction: Scalars["Int"];
  sponsorSlot: Scalars["Int"];
  tournament_subscribes: Scalars["Int"];
};

export type TournamentCreateInputGql = {
  bracket_type: BracketType;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  cover: Scalars["String"];
  created_at?: InputMaybe<Scalars["DateTime"]>;
  currency_uid: Scalars["String"];
  desc?: InputMaybe<Scalars["String"]>;
  game_uid: Scalars["String"];
  join_fee?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  participants: Scalars["Int"];
  password?: InputMaybe<Scalars["String"]>;
  pool_size: Scalars["Float"];
  prize_allocation: Array<PrizeAllocation>;
  referees: Array<Scalars["Int"]>;
  regions?: InputMaybe<Array<Scalars["String"]>>;
  rounds: Array<BracketRoundCreateInputGql>;
  rules?: InputMaybe<Scalars["String"]>;
  sponsor_slots: Array<SponsorSlotCreateInputGql>;
  start_at: Scalars["DateTime"];
  team_size: Scalars["Int"];
  thumbnail: Scalars["String"];
  turns?: InputMaybe<Scalars["Int"]>;
  updated_at?: InputMaybe<Scalars["DateTime"]>;
};

export type TournamentFilterInput = {
  bracket?: InputMaybe<Scalars["String"]>;
  game?: InputMaybe<Scalars["String"]>;
  /** ASC OR DESC */
  prize_pool?: InputMaybe<Scalars["String"]>;
  team_size?: InputMaybe<Scalars["String"]>;
  /** ASC OR DESC */
  time?: InputMaybe<Scalars["String"]>;
};

export enum TournamentStatus {
  Accepted = "ACCEPTED",
  Complete = "COMPLETE",
  Disable = "DISABLE",
  Pending = "PENDING",
  Reviewing = "REVIEWING",
}

export type TournamentSubscriber = {
  __typename?: "TournamentSubscriber";
  created_at: Scalars["DateTime"];
  is_subscribed?: Maybe<Scalars["Int"]>;
  tournament_uid: Scalars["String"];
  tournaments: Tournament;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user_id: Scalars["Int"];
  users: User;
};

export enum TournamentType {
  Joined = "JOINED",
  Owner = "OWNER",
}

export type User = {
  __typename?: "User";
  _count: UserCount;
  claim?: Maybe<Array<ClaimTransactions>>;
  code?: Maybe<Scalars["String"]>;
  created_at: Scalars["DateTime"];
  email?: Maybe<Scalars["String"]>;
  facebook_id?: Maybe<Scalars["String"]>;
  favorite_game?: Maybe<Array<UserFavoriteGame>>;
  google_id?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  password?: Maybe<Scalars["String"]>;
  profile?: Maybe<UserProfile>;
  reaction?: Maybe<Array<Reaction>>;
  ref_code?: Maybe<Scalars["String"]>;
  referee?: Maybe<Array<Referee>>;
  role: UserRole;
  sponsorTransaction?: Maybe<Array<SponsorTransaction>>;
  status: UserStatus;
  teamMembers?: Maybe<Array<TeamMember>>;
  tournament?: Maybe<Array<Tournament>>;
  tournamentSubscriber?: Maybe<Array<TournamentSubscriber>>;
  updated_at: Scalars["DateTime"];
};

export type UserCount = {
  __typename?: "UserCount";
  claim: Scalars["Int"];
  favorite_game: Scalars["Int"];
  reaction: Scalars["Int"];
  referee: Scalars["Int"];
  sponsorTransaction: Scalars["Int"];
  teamMembers: Scalars["Int"];
  tournament: Scalars["Int"];
  tournamentSubscriber: Scalars["Int"];
};

export type UserFavoriteGame = {
  __typename?: "UserFavoriteGame";
  created_at: Scalars["DateTime"];
  enable_favorite?: Maybe<Scalars["Boolean"]>;
  game: Game;
  game_uid: Scalars["String"];
  id: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["Int"];
};

export type UserGraphql = {
  __typename?: "UserGraphql";
  _count: UserCount;
  claim?: Maybe<Array<ClaimTransactions>>;
  code?: Maybe<Scalars["String"]>;
  created_at: Scalars["DateTime"];
  earningHistory?: Maybe<Array<EarningHistory>>;
  email?: Maybe<Scalars["String"]>;
  facebook_id?: Maybe<Scalars["String"]>;
  favorite_game?: Maybe<Array<UserFavoriteGame>>;
  google_id?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  playedTournament?: Maybe<Array<TTournament>>;
  profile?: Maybe<UserProfile>;
  reaction?: Maybe<Array<Reaction>>;
  ref_code?: Maybe<Scalars["String"]>;
  referee?: Maybe<Array<Referee>>;
  role: UserRole;
  sponsorTransaction?: Maybe<Array<SponsorTransaction>>;
  status: UserStatus;
  teamMembers?: Maybe<Array<TeamMember>>;
  totalEarning?: Maybe<Scalars["Float"]>;
  tournament?: Maybe<Array<Tournament>>;
  tournamentSubscriber?: Maybe<Array<TournamentSubscriber>>;
  updated_at: Scalars["DateTime"];
};

export type UserProfile = {
  __typename?: "UserProfile";
  avatar?: Maybe<Scalars["String"]>;
  biography?: Maybe<Scalars["String"]>;
  cover?: Maybe<Scalars["String"]>;
  created_at: Scalars["DateTime"];
  discord?: Maybe<Scalars["String"]>;
  display_name?: Maybe<Scalars["String"]>;
  facebook?: Maybe<Scalars["String"]>;
  family_name?: Maybe<Scalars["String"]>;
  given_name?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  telegram?: Maybe<Scalars["String"]>;
  twitter?: Maybe<Scalars["String"]>;
  updated_at: Scalars["DateTime"];
  user: User;
  user_id: Scalars["ID"];
  user_name?: Maybe<Scalars["String"]>;
};

export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
}

export enum UserStatus {
  Active = "ACTIVE",
  Banned = "BANNED",
}

export type UserTeam = {
  __typename?: "UserTeam";
  participant?: Maybe<Scalars["Int"]>;
  team?: Maybe<Array<Member>>;
  team_avatar?: Maybe<Scalars["String"]>;
  team_name?: Maybe<Scalars["String"]>;
  team_uid?: Maybe<Scalars["Int"]>;
};
