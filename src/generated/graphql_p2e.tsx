import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type Balance = {
  __typename?: 'Balance';
  created_at: Scalars['DateTime'];
  lucis_point: Scalars['Int'];
  lucis_token: Scalars['Decimal'];
  lucis_token_lock: Scalars['Decimal'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type Bracket = {
  __typename?: 'Bracket';
  _count: BracketCount;
  bracketMatchs?: Maybe<Array<BracketMatch>>;
  bracketRounds?: Maybe<Array<BracketRound>>;
  created_at: Scalars['DateTime'];
  start_at: Scalars['DateTime'];
  status: BracketStatus;
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  type: BracketType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type BracketCount = {
  __typename?: 'BracketCount';
  bracketMatchs: Scalars['Int'];
  bracketRounds: Scalars['Int'];
};

export type BracketMatch = {
  __typename?: 'BracketMatch';
  bracket: Bracket;
  bracket_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  first_match_uid?: Maybe<Scalars['String']>;
  link_stream?: Maybe<Scalars['String']>;
  link_stream_enable?: Maybe<Scalars['Boolean']>;
  lower_match_uid?: Maybe<Scalars['String']>;
  playteam1_uid: Scalars['String'];
  playteam2_uid: Scalars['String'];
  round: BracketRound;
  round_uid: Scalars['String'];
  score_1?: Maybe<Scalars['Int']>;
  score_2?: Maybe<Scalars['Int']>;
  second_match_uid?: Maybe<Scalars['String']>;
  status: BracketMatchStatus;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  upper_match_uid?: Maybe<Scalars['String']>;
};

export enum BracketMatchStatus {
  Complete = 'COMPLETE',
  Pending = 'PENDING'
}

export type BracketRound = {
  __typename?: 'BracketRound';
  _count: BracketRoundCount;
  bracket: Bracket;
  bracketMatchs?: Maybe<Array<BracketMatch>>;
  bracket_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  start_at: Scalars['DateTime'];
  title: Scalars['String'];
  type: BracketRoundType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type BracketRoundCount = {
  __typename?: 'BracketRoundCount';
  bracketMatchs: Scalars['Int'];
};

export enum BracketRoundType {
  Lower = 'LOWER',
  Upper = 'UPPER'
}

export enum BracketStatus {
  Complete = 'COMPLETE',
  Ongoing = 'ONGOING',
  Pending = 'PENDING'
}

export enum BracketType {
  BattleRoyale = 'BATTLE_ROYALE',
  Double = 'DOUBLE',
  RoundRobin = 'ROUND_ROBIN',
  Single = 'SINGLE',
  Swiss = 'SWISS'
}

export type CachePlayerStatistic = {
  __typename?: 'CachePlayerStatistic';
  assists: Scalars['Int'];
  created_at: Scalars['DateTime'];
  headshot: Scalars['Int'];
  id: Scalars['ID'];
  kills: Scalars['Int'];
  matches: Scalars['Int'];
  player_game: PlayerGame;
  player_game_uid: Scalars['String'];
  round: Scalars['Int'];
  updated_at: Scalars['DateTime'];
  wins: Scalars['Int'];
};

export type CacheTournament = {
  __typename?: 'CacheTournament';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  team_participated: Scalars['Int'];
  total_donation?: Maybe<Scalars['Decimal']>;
  total_prize_pool?: Maybe<Scalars['Decimal']>;
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type Chain = {
  __typename?: 'Chain';
  _count: ChainCount;
  chain_id?: Maybe<Scalars['Int']>;
  contracts?: Maybe<Array<Contract>>;
  created_at: Scalars['DateTime'];
  currencies?: Maybe<Array<Currency>>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rpc_url?: Maybe<Scalars['String']>;
  symbol: ChainSymbol;
  updated_at: Scalars['DateTime'];
};

export type ChainCount = {
  __typename?: 'ChainCount';
  contracts: Scalars['Int'];
  currencies: Scalars['Int'];
};

export enum ChainSymbol {
  Avax = 'AVAX',
  Bsc = 'BSC',
  Eth = 'ETH',
  Flow = 'FLOW',
  Near = 'NEAR',
  Polkadot = 'POLKADOT',
  Polygon = 'POLYGON',
  Solana = 'SOLANA'
}

export type ClaimMatchTransaction = {
  __typename?: 'ClaimMatchTransaction';
  amount: Scalars['Decimal'];
  block?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  currency_uid: Scalars['String'];
  fee?: Maybe<Scalars['Decimal']>;
  match_uid: Scalars['String'];
  status: TransactionStatus;
  tx_hash?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  usd_value?: Maybe<Scalars['Decimal']>;
  user: User;
  user_id: Scalars['Int'];
};

export type ClaimMissionTransaction = {
  __typename?: 'ClaimMissionTransaction';
  amount: Scalars['Decimal'];
  block?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  currency_uid: Scalars['String'];
  fee?: Maybe<Scalars['Decimal']>;
  mission: Mission;
  mission_uid: Scalars['String'];
  status: TransactionStatus;
  tx_hash?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  usd_value?: Maybe<Scalars['Decimal']>;
  user: User;
  user_id: Scalars['Int'];
};

export type ClaimStakedTransaction = {
  __typename?: 'ClaimStakedTransaction';
  amount: Scalars['Decimal'];
  block?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  currency_uid: Scalars['String'];
  fee?: Maybe<Scalars['Decimal']>;
  staked: Staked;
  staked_uid: Scalars['String'];
  status: TransactionStatus;
  tx_hash?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  usd_value?: Maybe<Scalars['Decimal']>;
  user: User;
  user_id: Scalars['Int'];
};

export type ClaimTransaction = {
  __typename?: 'ClaimTransaction';
  amount: Scalars['Decimal'];
  block?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  currency_uid: Scalars['String'];
  fee?: Maybe<Scalars['Decimal']>;
  status: TransactionStatus;
  tournament_uid: Scalars['String'];
  tournaments: Tournament;
  tx_hash?: Maybe<Scalars['String']>;
  type: ClaimType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  usd_value?: Maybe<Scalars['Decimal']>;
  user: User;
  user_id: Scalars['Int'];
};

export enum ClaimType {
  Donate = 'DONATE',
  PrizePool = 'PRIZE_POOL',
  PrizeSystem = 'PRIZE_SYSTEM'
}

export type Contract = {
  __typename?: 'Contract';
  address: Scalars['String'];
  admin?: Maybe<Scalars['String']>;
  admin_prv_key?: Maybe<Scalars['String']>;
  chain: Chain;
  chain_symbol: ChainSymbol;
  created_at: Scalars['DateTime'];
  is_transfered?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['String']>;
  type: ContractType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export enum ContractType {
  Donate = 'DONATE',
  LucisToken = 'LUCIS_TOKEN',
  Prize = 'PRIZE'
}

export type CsgoMap = {
  __typename?: 'CsgoMap';
  created_at: Scalars['DateTime'];
  game_map_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  img_lg?: Maybe<Scalars['String']>;
  img_sm?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type Currency = {
  __typename?: 'Currency';
  _count: CurrencyCount;
  address?: Maybe<Scalars['String']>;
  chain?: Maybe<Chain>;
  chain_symbol?: Maybe<ChainSymbol>;
  created_at: Scalars['DateTime'];
  decimals?: Maybe<Scalars['Int']>;
  donateTransactions?: Maybe<Array<DonateTransaction>>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  sponsorTransactions?: Maybe<Array<SponsorTransaction>>;
  symbol?: Maybe<Scalars['String']>;
  tournaments?: Maybe<Array<Tournament>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  usd_value?: Maybe<Scalars['Float']>;
};

export type CurrencyCount = {
  __typename?: 'CurrencyCount';
  donateTransactions: Scalars['Int'];
  sponsorTransactions: Scalars['Int'];
  tournaments: Scalars['Int'];
};

export type DonateTransaction = {
  __typename?: 'DonateTransaction';
  amount: Scalars['Decimal'];
  block?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  currency: Currency;
  currency_uid: Scalars['String'];
  from: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  status: TransactionStatus;
  to: Scalars['String'];
  tournament_uid: Scalars['String'];
  tournaments: Tournament;
  tx_hash: Scalars['String'];
  type: DonateTransactionsType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  usd_value?: Maybe<Scalars['Decimal']>;
};

export enum DonateTransactionsType {
  Player = 'PLAYER',
  Referee = 'REFEREE',
  Team = 'TEAM',
  Tournament = 'TOURNAMENT'
}

export type EquipNftInput = {
  game_uid: Scalars['String'];
  nfts?: InputMaybe<Array<EquipNftSlotInput>>;
};

export type EquipNftSlotInput = {
  slot?: InputMaybe<Scalars['Int']>;
};

export type GBalance = {
  __typename?: 'GBalance';
  lucis_point?: Maybe<Scalars['Int']>;
  lucis_token?: Maybe<Scalars['Float']>;
};

export type Game = {
  __typename?: 'Game';
  _count: GameCount;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  favorite_user?: Maybe<Array<UserFavoriteGame>>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nft?: Maybe<Array<PlayerNft>>;
  nft_limit?: Maybe<Scalars['Int']>;
  tournaments?: Maybe<Array<Tournament>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GameCount = {
  __typename?: 'GameCount';
  favorite_user: Scalars['Int'];
  nft: Scalars['Int'];
  tournaments: Scalars['Int'];
};

export type Match = {
  __typename?: 'Match';
  end_at?: Maybe<Scalars['Int']>;
  is_win?: Maybe<Scalars['Boolean']>;
  loser_team?: Maybe<Scalars['String']>;
  match_uid?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['String']>;
  winner_team?: Maybe<Scalars['String']>;
};

export type MatchStatisticInput = {
  game_uid?: InputMaybe<Scalars['String']>;
  match_uid?: InputMaybe<Scalars['String']>;
  platform_type?: InputMaybe<Platform>;
};

export type MatchStatistics = {
  __typename?: 'MatchStatistics';
  is_win?: Maybe<Scalars['Boolean']>;
  map?: Maybe<CsgoMap>;
  match_uid?: Maybe<Scalars['String']>;
  playerStatistic?: Maybe<PlayerStatistic>;
  score?: Maybe<Scalars['String']>;
};

export type Member = {
  __typename?: 'Member';
  avatar?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  is_leader?: Maybe<Scalars['Boolean']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type Mission = {
  __typename?: 'Mission';
  _count: MissionCount;
  claim_mission?: Maybe<Array<ClaimMissionTransaction>>;
  created_at: Scalars['DateTime'];
  end_at?: Maybe<Scalars['DateTime']>;
  game_uid: Scalars['String'];
  goal?: Maybe<Scalars['Int']>;
  img?: Maybe<Scalars['String']>;
  is_daily_mission: Scalars['Boolean'];
  lucis_point: Scalars['Int'];
  lucis_token?: Maybe<Scalars['Decimal']>;
  player_mission?: Maybe<Array<PlayerMission>>;
  start_at?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  type: MissionType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_daily_mission?: Maybe<Array<UserDailyMission>>;
};

export type MissionCount = {
  __typename?: 'MissionCount';
  claim_mission: Scalars['Int'];
  player_mission: Scalars['Int'];
  user_daily_mission: Scalars['Int'];
};

export enum MissionType {
  Assists = 'ASSISTS',
  Headshot = 'HEADSHOT',
  Kills = 'KILLS',
  Matches = 'MATCHES',
  Round = 'ROUND',
  Wins = 'WINS'
}

export type Mutation = {
  __typename?: 'Mutation';
  addStakedNft?: Maybe<Scalars['Boolean']>;
  claimMission?: Maybe<Scalars['Boolean']>;
  claimStaked?: Maybe<Scalars['Boolean']>;
  /** Connect Faceit */
  connectFaceit: PlatformAccountDto;
  disconnectConnectFaceit?: Maybe<Scalars['Boolean']>;
  equipNft?: Maybe<Scalars['Boolean']>;
  getDailyMission: Array<PlayerMission>;
  unStakedNft?: Maybe<Scalars['Boolean']>;
  updateDailyMission?: Maybe<Array<PlayerMission>>;
};


export type MutationAddStakedNftArgs = {
  data: StakedNft;
};


export type MutationClaimMissionArgs = {
  mission_uid: Scalars['String'];
  tx_hash: Scalars['String'];
};


export type MutationClaimStakedArgs = {
  staked_uid: Scalars['String'];
  tx_hash: Scalars['String'];
};


export type MutationConnectFaceitArgs = {
  accessToken: Scalars['String'];
  idToken: Scalars['String'];
};


export type MutationEquipNftArgs = {
  data: EquipNftInput;
};


export type MutationGetDailyMissionArgs = {
  game_uid: Scalars['String'];
};


export type MutationUnStakedNftArgs = {
  nft_uid: Scalars['String'];
};


export type MutationUpdateDailyMissionArgs = {
  game_uid: Scalars['String'];
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Nft = {
  __typename?: 'Nft';
  contract?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  img?: Maybe<Scalars['String']>;
  mission_value?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  play_nft?: Maybe<PlayerNft>;
  staked_nft?: Maybe<Staked>;
  tier?: Maybe<Scalars['Int']>;
  token_id?: Maybe<Scalars['String']>;
  type?: Maybe<NftType>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export enum NftType {
  Equip = 'EQUIP',
  Staked = 'STAKED'
}

export type Notification = {
  __typename?: 'Notification';
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  is_seen: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export enum Platform {
  Faceit = 'FACEIT',
  None = 'NONE',
  Riot = 'RIOT'
}

export type PlatformAccount = {
  __typename?: 'PlatformAccount';
  _count: PlatformAccountCount;
  access_token?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  country_code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id_token?: Maybe<Scalars['String']>;
  nick_name?: Maybe<Scalars['String']>;
  platform: Platform;
  player_game?: Maybe<Array<PlayerGame>>;
  player_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type PlatformAccountCount = {
  __typename?: 'PlatformAccountCount';
  player_game: Scalars['Int'];
};

export type PlatformAccountDto = {
  __typename?: 'PlatformAccountDto';
  _count: PlatformAccountCount;
  avatar?: Maybe<Scalars['String']>;
  country_code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  nick_name?: Maybe<Scalars['String']>;
  platform: Platform;
  player_uid: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type PlayTeam = {
  __typename?: 'PlayTeam';
  _count: PlayTeamCount;
  created_at: Scalars['DateTime'];
  is_checkin?: Maybe<Scalars['Boolean']>;
  playTeamMembers?: Maybe<Array<PlayTeamMember>>;
  team: Team;
  team_uid: Scalars['String'];
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type PlayTeamCount = {
  __typename?: 'PlayTeamCount';
  playTeamMembers: Scalars['Int'];
};

export type PlayTeamMember = {
  __typename?: 'PlayTeamMember';
  created_at: Scalars['DateTime'];
  id_in_game?: Maybe<Scalars['String']>;
  is_leader?: Maybe<Scalars['Boolean']>;
  playTeam: PlayTeam;
  play_team_uid: Scalars['String'];
  prize_alloc: Scalars['Decimal'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type PlayerGame = {
  __typename?: 'PlayerGame';
  _count: PlayerGameCount;
  cache_player_statistic?: Maybe<CachePlayerStatistic>;
  created_at: Scalars['DateTime'];
  game_player_uid: Scalars['String'];
  game_uid: Scalars['String'];
  platform_account: PlatformAccount;
  platform_account_uid: Scalars['String'];
  player_mission?: Maybe<Array<PlayerMission>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type PlayerGameCount = {
  __typename?: 'PlayerGameCount';
  player_mission: Scalars['Int'];
};

export type PlayerMission = {
  __typename?: 'PlayerMission';
  achieved?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  daily_mission?: Maybe<UserDailyMission>;
  mission: Mission;
  mission_uid: Scalars['String'];
  player_game: PlayerGame;
  player_game_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type PlayerNft = {
  __typename?: 'PlayerNFT';
  created_at: Scalars['DateTime'];
  game: Game;
  game_uid: Scalars['String'];
  nft: Nft;
  nft_uid: Scalars['ID'];
  slot?: Maybe<Scalars['Int']>;
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type PlayerStatistic = {
  __typename?: 'PlayerStatistic';
  Assists?: Maybe<Scalars['String']>;
  Headshots?: Maybe<Scalars['String']>;
  Headshots_percent?: Maybe<Scalars['String']>;
  KD_Ratio?: Maybe<Scalars['String']>;
  KR_Ratio?: Maybe<Scalars['String']>;
  Kills?: Maybe<Scalars['String']>;
  MVPs?: Maybe<Scalars['String']>;
  Penta_Kills?: Maybe<Scalars['String']>;
  Quadro_Kills?: Maybe<Scalars['String']>;
  Result?: Maybe<Scalars['String']>;
  Triple_Kills?: Maybe<Scalars['String']>;
};

export type ProgressDailyMission = {
  __typename?: 'ProgressDailyMission';
  archieved?: Maybe<Scalars['Int']>;
  goal?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  GetAllPlayerNFT?: Maybe<Array<PlayerNft>>;
  getBalance?: Maybe<GBalance>;
  getLucisMission?: Maybe<Array<PlayerMission>>;
  getMatchStatistic?: Maybe<MatchStatistics>;
  getPlatformAccount?: Maybe<Array<PlatformAccountDto>>;
  getProgressDailyMission?: Maybe<ProgressDailyMission>;
  getRecentlyMatch: Array<Match>;
  isConnectFaceit?: Maybe<Scalars['Boolean']>;
};


export type QueryGetAllPlayerNftArgs = {
  game_uid: Scalars['String'];
};


export type QueryGetLucisMissionArgs = {
  game_uid: Scalars['String'];
};


export type QueryGetMatchStatisticArgs = {
  data: MatchStatisticInput;
};


export type QueryGetProgressDailyMissionArgs = {
  game_uid: Scalars['String'];
};

export type Raffle = {
  __typename?: 'Raffle';
  _count: RaffleCount;
  amount?: Maybe<Scalars['Decimal']>;
  created_at: Scalars['DateTime'];
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  sponsor_raffle?: Maybe<Array<SponsorRaffle>>;
  ticket?: Maybe<Ticket>;
  title?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  winner_id?: Maybe<Scalars['Int']>;
};

export type RaffleCount = {
  __typename?: 'RaffleCount';
  sponsor_raffle: Scalars['Int'];
};

export type Reaction = {
  __typename?: 'Reaction';
  created_at: Scalars['DateTime'];
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  type: ReactionType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export enum ReactionType {
  Dislike = 'DISLIKE',
  Hear = 'HEAR',
  Like = 'LIKE'
}

export type SponsorRaffle = {
  __typename?: 'SponsorRaffle';
  created_at: Scalars['DateTime'];
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  raffle: Raffle;
  raffle_uid: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type SponsorSlot = {
  __typename?: 'SponsorSlot';
  _count: SponsorSlotCount;
  cover?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  max: Scalars['Int'];
  min: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  show_ads?: Maybe<Scalars['Boolean']>;
  show_logo?: Maybe<Scalars['Boolean']>;
  show_name?: Maybe<Scalars['Boolean']>;
  sponsor_transactions?: Maybe<Array<SponsorTransaction>>;
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type SponsorSlotCount = {
  __typename?: 'SponsorSlotCount';
  sponsor_transactions: Scalars['Int'];
};

export type SponsorTransaction = {
  __typename?: 'SponsorTransaction';
  ads_link?: Maybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  block?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  currency: Currency;
  currency_uid: Scalars['String'];
  home_page?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  referee_fee?: Maybe<Scalars['Decimal']>;
  sponsor_slot: SponsorSlot;
  sponsor_slot_uid: Scalars['String'];
  sponsor_type?: Maybe<SponsorTransactionType>;
  status: TransactionStatus;
  system_fee?: Maybe<Scalars['Decimal']>;
  tournament_uid: Scalars['String'];
  tx_hash?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export enum SponsorTransactionType {
  Become = 'BECOME',
  Existing = 'EXISTING'
}

export type Staked = {
  __typename?: 'Staked';
  _count: StakedCount;
  apr?: Maybe<Scalars['Decimal']>;
  claim_staked?: Maybe<Array<ClaimStakedTransaction>>;
  created_at: Scalars['DateTime'];
  nft: Nft;
  ntf_uid: Scalars['String'];
  total_reward?: Maybe<Scalars['Decimal']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type StakedCount = {
  __typename?: 'StakedCount';
  claim_staked: Scalars['Int'];
};

export type StakedNft = {
  apr?: InputMaybe<Scalars['Float']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type SystemSponsor = {
  __typename?: 'SystemSponsor';
  amount: Scalars['Decimal'];
  block?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  status: TransactionStatus;
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  tx_hash: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type Team = {
  __typename?: 'Team';
  _count: TeamCount;
  avatar?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  created_by: Scalars['Int'];
  name: Scalars['String'];
  playTeams?: Maybe<Array<PlayTeam>>;
  team_members?: Maybe<Array<TeamMember>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type TeamCount = {
  __typename?: 'TeamCount';
  playTeams: Scalars['Int'];
  team_members: Scalars['Int'];
};

export type TeamMember = {
  __typename?: 'TeamMember';
  created_at: Scalars['DateTime'];
  is_leader?: Maybe<Scalars['Boolean']>;
  team: Team;
  team_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type Ticket = {
  __typename?: 'Ticket';
  _count: TicketCount;
  cost: Scalars['Int'];
  created_at: Scalars['DateTime'];
  raffle: Raffle;
  raffle_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_limmit?: Maybe<Scalars['Int']>;
  user_ticket?: Maybe<Array<UserTicket>>;
};

export type TicketCount = {
  __typename?: 'TicketCount';
  user_ticket: Scalars['Int'];
};

export type Tournament = {
  __typename?: 'Tournament';
  _count: TournamentCount;
  additionPrize: Scalars['Decimal'];
  brackets?: Maybe<Array<Bracket>>;
  cache_tournament?: Maybe<CacheTournament>;
  claim_transactions?: Maybe<Array<ClaimTransaction>>;
  cover: Scalars['String'];
  created_at: Scalars['DateTime'];
  currency: Currency;
  currency_uid: Scalars['String'];
  desc?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  donate_transactions?: Maybe<Array<DonateTransaction>>;
  game: Game;
  game_uid: Scalars['String'];
  invite_link?: Maybe<Scalars['String']>;
  join_fee?: Maybe<Scalars['Decimal']>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: Maybe<Scalars['String']>;
  playTeams?: Maybe<Array<PlayTeam>>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: Maybe<Array<TournamentRank>>;
  reaction?: Maybe<Array<Reaction>>;
  referees?: Maybe<Scalars['String']>;
  regions?: Maybe<Scalars['String']>;
  rules?: Maybe<Scalars['String']>;
  sponsorSlot?: Maybe<Array<SponsorSlot>>;
  spotlight_position?: Maybe<Scalars['Int']>;
  status: TournamentStatus;
  systemSponsor?: Maybe<SystemSponsor>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: Maybe<TournamentDeposit>;
  tournament_subscribes?: Maybe<Array<TournamentSubscriber>>;
  turns?: Maybe<Scalars['Int']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type TournamentCount = {
  __typename?: 'TournamentCount';
  brackets: Scalars['Int'];
  claim_transactions: Scalars['Int'];
  donate_transactions: Scalars['Int'];
  leader_board: Scalars['Int'];
  playTeams: Scalars['Int'];
  ranks: Scalars['Int'];
  reaction: Scalars['Int'];
  sponsorSlot: Scalars['Int'];
  tournament_subscribes: Scalars['Int'];
};

export type TournamentDeposit = {
  __typename?: 'TournamentDeposit';
  amount?: Maybe<Scalars['Decimal']>;
  block?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  referee_fee?: Maybe<Scalars['Decimal']>;
  status: TransactionStatus;
  system_fee?: Maybe<Scalars['Decimal']>;
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  tx_hash: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type TournamentLeaderBoard = {
  __typename?: 'TournamentLeaderBoard';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  total_donation?: Maybe<Scalars['Decimal']>;
  total_earning?: Maybe<Scalars['Decimal']>;
  total_prize?: Maybe<Scalars['Decimal']>;
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user?: Maybe<User>;
  user_id: Scalars['Int'];
};

export type TournamentRank = {
  __typename?: 'TournamentRank';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  rank: Scalars['Int'];
  team_uid: Scalars['String'];
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export enum TournamentStatus {
  Accepted = 'ACCEPTED',
  Complete = 'COMPLETE',
  Disable = 'DISABLE',
  Finish = 'FINISH',
  Pending = 'PENDING',
  Reviewing = 'REVIEWING'
}

export type TournamentSubscriber = {
  __typename?: 'TournamentSubscriber';
  created_at: Scalars['DateTime'];
  is_subscribed?: Maybe<Scalars['Int']>;
  tournament_uid: Scalars['String'];
  tournaments: Tournament;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
  users: User;
};

export enum TransactionStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Succeed = 'SUCCEED'
}

export type User = {
  __typename?: 'User';
  _count: UserCount;
  balance?: Maybe<Balance>;
  claim_match?: Maybe<Array<ClaimMatchTransaction>>;
  claim_mission?: Maybe<Array<ClaimMissionTransaction>>;
  claim_staked?: Maybe<Array<ClaimStakedTransaction>>;
  claim_tournament?: Maybe<Array<ClaimTransaction>>;
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  dailyMission?: Maybe<Array<UserDailyMission>>;
  email?: Maybe<Scalars['String']>;
  facebook_id?: Maybe<Scalars['String']>;
  favorite_game?: Maybe<Array<UserFavoriteGame>>;
  google_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  nfts?: Maybe<Array<Nft>>;
  notification?: Maybe<Array<Notification>>;
  password?: Maybe<Scalars['String']>;
  platform_accounnt?: Maybe<Array<PlatformAccount>>;
  platform_uid?: Maybe<Scalars['String']>;
  playTeamMembers?: Maybe<Array<PlayTeamMember>>;
  player_nft?: Maybe<PlayerNft>;
  profile?: Maybe<UserProfile>;
  reaction?: Maybe<Array<Reaction>>;
  ref_code?: Maybe<Scalars['String']>;
  role: UserRole;
  sponsorTransactions?: Maybe<Array<SponsorTransaction>>;
  staked_nft?: Maybe<Array<Staked>>;
  status: UserStatus;
  teamMembers?: Maybe<Array<TeamMember>>;
  tournament?: Maybe<Array<Tournament>>;
  tournamentSubscriber?: Maybe<Array<TournamentSubscriber>>;
  updated_at: Scalars['DateTime'];
  user_ticket?: Maybe<Array<UserTicket>>;
};

export type UserCount = {
  __typename?: 'UserCount';
  claim_match: Scalars['Int'];
  claim_mission: Scalars['Int'];
  claim_staked: Scalars['Int'];
  claim_tournament: Scalars['Int'];
  dailyMission: Scalars['Int'];
  favorite_game: Scalars['Int'];
  leader_board: Scalars['Int'];
  nfts: Scalars['Int'];
  notification: Scalars['Int'];
  platform_accounnt: Scalars['Int'];
  playTeamMembers: Scalars['Int'];
  reaction: Scalars['Int'];
  sponsorTransactions: Scalars['Int'];
  staked_nft: Scalars['Int'];
  teamMembers: Scalars['Int'];
  tournament: Scalars['Int'];
  tournamentSubscriber: Scalars['Int'];
  user_ticket: Scalars['Int'];
};

export type UserDailyMission = {
  __typename?: 'UserDailyMission';
  created_at: Scalars['DateTime'];
  mission: Mission;
  mission_uid: Scalars['String'];
  player_mission: PlayerMission;
  player_mission_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type UserFavoriteGame = {
  __typename?: 'UserFavoriteGame';
  created_at: Scalars['DateTime'];
  enable_favorite?: Maybe<Scalars['Boolean']>;
  game: Game;
  game_uid: Scalars['String'];
  id: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  avatar?: Maybe<Scalars['String']>;
  biography?: Maybe<Scalars['String']>;
  country_code?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  discord?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  family_name?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  telegram?: Maybe<Scalars['String']>;
  twitch?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['ID'];
  user_name?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum UserStatus {
  Active = 'ACTIVE',
  Banned = 'BANNED'
}

export type UserTicket = {
  __typename?: 'UserTicket';
  amount?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  ticket: Ticket;
  ticket_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};