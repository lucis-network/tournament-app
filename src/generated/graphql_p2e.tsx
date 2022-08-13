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

export type BalanceHistory = {
  __typename?: 'BalanceHistory';
  created_at: Scalars['DateTime'];
  decs?: Maybe<Scalars['String']>;
  game_uid?: Maybe<Scalars['String']>;
  lucis_point?: Maybe<Scalars['Int']>;
  lucis_token?: Maybe<Scalars['Decimal']>;
  reference?: Maybe<Scalars['String']>;
  type: BalanceHistoryType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export enum BalanceHistoryType {
  Addition = 'ADDITION',
  Buyraffleticket = 'BUYRAFFLETICKET',
  Claimchestprize = 'CLAIMCHESTPRIZE',
  Claimraffle = 'CLAIMRAFFLE',
  Dailymission = 'DAILYMISSION',
  Dailymissionbox = 'DAILYMISSIONBOX',
  Equip = 'EQUIP',
  Joindiscord = 'JOINDISCORD',
  Lucismission = 'LUCISMISSION',
  Match = 'MATCH',
  Newuser = 'NEWUSER',
  Openluckychest = 'OPENLUCKYCHEST',
  Rafflereimburse = 'RAFFLEREIMBURSE',
  Referfriend = 'REFERFRIEND',
  Reroll = 'REROLL',
  Staked = 'STAKED',
  Wasinvited = 'WASINVITED'
}

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

export enum BuyRaffleTicketErrorCode {
  BalanceNotInitiated = 'BalanceNotInitiated',
  BuyPhaseEnded = 'BuyPhaseEnded',
  NotEnoughLucisPoint = 'NotEnoughLucisPoint',
  NotEnoughLucisToken = 'NotEnoughLucisToken',
  RaffleNotFound = 'RaffleNotFound',
  ServerError = 'ServerError',
  TicketQuantityCannotBeZero = 'TicketQuantityCannotBeZero',
  TotalLimitExceeded = 'TotalLimitExceeded',
  UserLimitExceeded = 'UserLimitExceeded',
  UserRegionInvalid = 'UserRegionInvalid'
}

export type CacheCsgoPlayerStatistic = {
  __typename?: 'CacheCSGOPlayerStatistic';
  _count: CacheCsgoPlayerStatisticCount;
  average_headshots: Scalars['Int'];
  average_headshots_percent?: Maybe<Scalars['Int']>;
  average_kd_ratio: Scalars['Decimal'];
  created_at: Scalars['DateTime'];
  current_win_streak: Scalars['Int'];
  id: Scalars['ID'];
  kd_ratio: Scalars['Decimal'];
  last_match_uid?: Maybe<Scalars['String']>;
  longest_win_streak: Scalars['Int'];
  map_detail?: Maybe<Array<CsgoMapStatistic>>;
  matches: Scalars['Int'];
  player_game_uid: Scalars['String'];
  recent_result?: Maybe<Scalars['String']>;
  total_headshots: Scalars['Int'];
  updated_at: Scalars['DateTime'];
  win_rate?: Maybe<Scalars['Int']>;
  wins: Scalars['Int'];
};

export type CacheCsgoPlayerStatisticCount = {
  __typename?: 'CacheCSGOPlayerStatisticCount';
  map_detail: Scalars['Int'];
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
  explorer?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  poolWallet?: Maybe<Array<PoolWallet>>;
  rpc_url?: Maybe<Scalars['String']>;
  symbol: ChainSymbol;
  updated_at: Scalars['DateTime'];
};

export type ChainCount = {
  __typename?: 'ChainCount';
  contracts: Scalars['Int'];
  currencies: Scalars['Int'];
  poolWallet: Scalars['Int'];
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

export type ChestDetail = {
  __typename?: 'ChestDetail';
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  game_platform?: Maybe<GamePlatform>;
  game_platform_id?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  prizes: Array<LuckyChestPrize>;
  sponsors?: Maybe<Array<P2eSponsor>>;
  ticket_cost?: Maybe<Scalars['Decimal']>;
  ticket_cost_type?: Maybe<CostType>;
  tier: LuckyChestTier;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type ClaimCsgoInput = {
  prize_id: Scalars['Int'];
  steam_url: Scalars['String'];
};

export enum ClaimChestPrizeErrorCode {
  ServerError = 'ServerError',
  UserHasClaimed = 'UserHasClaimed',
  UserHistoryNotFound = 'UserHistoryNotFound',
  WalletAddressRequired = 'WalletAddressRequired'
}

export type ClaimPhysicalInput = {
  phone: NullableStringFieldUpdateOperationsInput;
  prize_id: Scalars['Int'];
  shipping_address: Scalars['String'];
};

export type ClaimPrizeTransaction = {
  __typename?: 'ClaimPrizeTransaction';
  amount: Scalars['Decimal'];
  block?: Maybe<Scalars['Int']>;
  chest_user_history_uid?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  currency: Currency;
  currency_uid: Scalars['String'];
  fee?: Maybe<Scalars['Decimal']>;
  raffle_user_ticket_uid?: Maybe<Scalars['String']>;
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
  PrizeSystem = 'PRIZE_SYSTEM',
  RefereeFee = 'REFEREE_FEE'
}

export type ConnectesUser = {
  __typename?: 'ConnectesUser';
  game?: Maybe<Scalars['String']>;
  number_user?: Maybe<Scalars['Int']>;
  platform?: Maybe<Scalars['String']>;
};

export type Contract = {
  __typename?: 'Contract';
  abi?: Maybe<Scalars['JSON']>;
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

export enum CostType {
  LucisPoint = 'LUCIS_POINT',
  LucisToken = 'LUCIS_TOKEN'
}

export type CsgoLucisMission = {
  __typename?: 'CsgoLucisMission';
  created_at: Scalars['DateTime'];
  csgo_mission: CsgoMission;
  csgo_mission_uid: Scalars['String'];
  group: Scalars['Int'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type CsgoMap = {
  __typename?: 'CsgoMap';
  _count: CsgoMapCount;
  created_at: Scalars['DateTime'];
  game_map_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  img_lg?: Maybe<Scalars['String']>;
  img_sm?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  player_statistics?: Maybe<Array<CsgoMapStatistic>>;
  updated_at: Scalars['DateTime'];
};

export type CsgoMapCount = {
  __typename?: 'CsgoMapCount';
  player_statistics: Scalars['Int'];
};

export type CsgoMapStatistic = {
  __typename?: 'CsgoMapStatistic';
  aces?: Maybe<Scalars['Int']>;
  all_maps: CacheCsgoPlayerStatistic;
  assists?: Maybe<Scalars['Int']>;
  average_aces?: Maybe<Scalars['Decimal']>;
  average_assists?: Maybe<Scalars['Decimal']>;
  average_death?: Maybe<Scalars['Decimal']>;
  average_heashots?: Maybe<Scalars['Decimal']>;
  average_kda?: Maybe<Scalars['Decimal']>;
  average_kills?: Maybe<Scalars['Decimal']>;
  average_kr?: Maybe<Scalars['Decimal']>;
  average_mvps?: Maybe<Scalars['Decimal']>;
  average_quadro_kills?: Maybe<Scalars['Decimal']>;
  average_triple_kills?: Maybe<Scalars['Decimal']>;
  created_at: Scalars['DateTime'];
  csgo_player_statistic_id: Scalars['Int'];
  deaths?: Maybe<Scalars['Int']>;
  headshot_per_match?: Maybe<Scalars['Decimal']>;
  headshots?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  kda_ratio?: Maybe<Scalars['Decimal']>;
  kills?: Maybe<Scalars['Int']>;
  kr_ratio?: Maybe<Scalars['Decimal']>;
  map: CsgoMap;
  map_id: Scalars['Int'];
  matches?: Maybe<Scalars['Int']>;
  mvps?: Maybe<Scalars['Int']>;
  quadro_assists?: Maybe<Scalars['Int']>;
  rounds?: Maybe<Scalars['Int']>;
  total_headshots?: Maybe<Scalars['Int']>;
  triple_kills?: Maybe<Scalars['Int']>;
  updated_at: Scalars['DateTime'];
  win_rate?: Maybe<Scalars['Decimal']>;
  wins?: Maybe<Scalars['Int']>;
};

export type CsgoMatch = {
  __typename?: 'CsgoMatch';
  _count: CsgoMatchCount;
  created_at: Scalars['DateTime'];
  end_at: Scalars['DateTime'];
  loser_team?: Maybe<Scalars['String']>;
  map?: Maybe<Scalars['String']>;
  match_statistic?: Maybe<Scalars['JSON']>;
  players?: Maybe<Array<PlayerCsgoMatch>>;
  score?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  winner_team?: Maybe<Scalars['String']>;
};

export type CsgoMatchCount = {
  __typename?: 'CsgoMatchCount';
  players: Scalars['Int'];
};

export type CsgoMatchStatistics = {
  __typename?: 'CsgoMatchStatistics';
  current_win_streak?: Maybe<Scalars['Int']>;
  end_at?: Maybe<Scalars['DateTime']>;
  highest_kda?: Maybe<Scalars['Boolean']>;
  highest_kr?: Maybe<Scalars['Boolean']>;
  is_win?: Maybe<Scalars['Boolean']>;
  least_died?: Maybe<Scalars['Boolean']>;
  map?: Maybe<CsgoMap>;
  match_earning?: Maybe<MatchEarning>;
  match_uid?: Maybe<Scalars['String']>;
  most_headshot?: Maybe<Scalars['Boolean']>;
  most_kill?: Maybe<Scalars['Boolean']>;
  most_support?: Maybe<Scalars['Boolean']>;
  player_statistic?: Maybe<Scalars['JSON']>;
  point?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['String']>;
};

export type CsgoMission = {
  __typename?: 'CsgoMission';
  created_at: Scalars['DateTime'];
  csgo_lucis_misison?: Maybe<CsgoLucisMission>;
  map?: Maybe<Scalars['String']>;
  mission: Mission;
  mission_uid: Scalars['String'];
  type: CsgoMissionType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export enum CsgoMissionType {
  Aces = 'Aces',
  Assists = 'Assists',
  Deaths = 'Deaths',
  HeadshotPercentage = 'HeadshotPercentage',
  Headshots = 'Headshots',
  Kda = 'Kda',
  Kills = 'Kills',
  Kr = 'Kr',
  Matches = 'Matches',
  Mvps = 'Mvps',
  QuadraKill = 'QuadraKill',
  Triplekill = 'Triplekill',
  WinStreak = 'WinStreak',
  Wins = 'Wins'
}

export type CsgoPlayerMatch = {
  __typename?: 'CsgoPlayerMatch';
  id: Scalars['ID'];
  is_win: Scalars['Boolean'];
  lucis_point: Scalars['Int'];
  map_img?: Maybe<Scalars['String']>;
  match: CsgoMatch;
  match_uid: Scalars['String'];
  player: PlayerGame;
  player_game_uid: Scalars['String'];
  player_statistic?: Maybe<Scalars['JSON']>;
};

export type Currency = {
  __typename?: 'Currency';
  _count: CurrencyCount;
  address?: Maybe<Scalars['String']>;
  chain?: Maybe<Chain>;
  chain_symbol?: Maybe<ChainSymbol>;
  claim_prize_transactions?: Maybe<Array<ClaimPrizeTransaction>>;
  created_at: Scalars['DateTime'];
  decimals?: Maybe<Scalars['Int']>;
  donateTransactions?: Maybe<Array<DonateTransaction>>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  prize_category?: Maybe<Array<PrizeCategory>>;
  sponsorTransactions?: Maybe<Array<SponsorTransaction>>;
  symbol?: Maybe<Scalars['String']>;
  tournaments?: Maybe<Array<Tournament>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  usd_value?: Maybe<Scalars['Float']>;
  withdrawTransactions?: Maybe<Array<WithdrawTransaction>>;
};

export type CurrencyCount = {
  __typename?: 'CurrencyCount';
  claim_prize_transactions: Scalars['Int'];
  donateTransactions: Scalars['Int'];
  prize_category: Scalars['Int'];
  sponsorTransactions: Scalars['Int'];
  tournaments: Scalars['Int'];
  withdrawTransactions: Scalars['Int'];
};

export enum CurrrencyType {
  Decentralized = 'DECENTRALIZED',
  LucisPoint = 'LUCIS_POINT',
  LucisToken = 'LUCIS_TOKEN'
}

export type DailyPoint = {
  __typename?: 'DailyPoint';
  day?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  point?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
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

export type GCsgoMatch = {
  __typename?: 'GCsgoMatch';
  daily_point?: Maybe<Array<DailyPoint>>;
  matches?: Maybe<Array<CsgoPlayerMatch>>;
  max_point?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
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
  platform?: Maybe<Array<GamePlatform>>;
  tournaments?: Maybe<Array<Tournament>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GameCount = {
  __typename?: 'GameCount';
  favorite_user: Scalars['Int'];
  nft: Scalars['Int'];
  platform: Scalars['Int'];
  tournaments: Scalars['Int'];
};

export type GamePlatform = {
  __typename?: 'GamePlatform';
  _count: GamePlatformCount;
  created_at: Scalars['DateTime'];
  game: Game;
  game_uid: Scalars['String'];
  id: Scalars['ID'];
  lucky_chest?: Maybe<Array<LuckyChest>>;
  platform: Platform;
  platform_id: Scalars['Int'];
  updated_at: Scalars['DateTime'];
};

export type GamePlatformCount = {
  __typename?: 'GamePlatformCount';
  lucky_chest: Scalars['Int'];
};

export type InventoryItem = {
  __typename?: 'InventoryItem';
  prize?: Maybe<LuckyChestPrize>;
  quantity?: Maybe<Scalars['Int']>;
};

export type InventoryPieceGroup = {
  __typename?: 'InventoryPieceGroup';
  achieved?: Maybe<Scalars['Boolean']>;
  pieces?: Maybe<Array<UserInventoryPiece>>;
  type?: Maybe<Scalars['String']>;
};

export enum ItemGroup {
  Csgo = 'Csgo',
  Lol = 'Lol',
  Nft = 'Nft',
  Physical = 'Physical'
}

export type LolAccountDto = {
  __typename?: 'LolAccountDto';
  avatar?: Maybe<Scalars['String']>;
  connected_display_name?: Maybe<Scalars['String']>;
  connected_user_name?: Maybe<Scalars['String']>;
  nick_name?: Maybe<Scalars['String']>;
};

export enum LolLane {
  Bottom = 'Bottom',
  Jungle = 'Jungle',
  Middle = 'Middle',
  None = 'None',
  Support = 'Support',
  Top = 'Top'
}

export type LolLucisMission = {
  __typename?: 'LolLucisMission';
  created_at: Scalars['DateTime'];
  group: Scalars['Int'];
  lol_mission: LolMission;
  lol_mission_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type LolMatch = {
  __typename?: 'LolMatch';
  _count: LolMatchCount;
  created_at: Scalars['DateTime'];
  end_at: Scalars['DateTime'];
  map?: Maybe<Scalars['String']>;
  match_statistic?: Maybe<Scalars['JSON']>;
  players?: Maybe<Array<PlayerLolMatch>>;
  region?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['String']>;
  type: LolRegime;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type LolMatchCount = {
  __typename?: 'LolMatchCount';
  players: Scalars['Int'];
};

export type LolMatchGql = {
  __typename?: 'LolMatchGql';
  daily_point?: Maybe<Array<DailyPoint>>;
  matches?: Maybe<Array<LolPlayerMatchGql>>;
  max_point?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type LolMatchStatisticGql = {
  __typename?: 'LolMatchStatisticGql';
  aces?: Maybe<Scalars['Int']>;
  assist?: Maybe<Scalars['Int']>;
  champion_id: Scalars['Int'];
  damage_dealt?: Maybe<Scalars['Int']>;
  damage_taken?: Maybe<Scalars['Int']>;
  deaths?: Maybe<Scalars['Int']>;
  double_kill?: Maybe<Scalars['Int']>;
  eye_killed?: Maybe<Scalars['Int']>;
  eye_placed?: Maybe<Scalars['Int']>;
  gold_earned?: Maybe<Scalars['Int']>;
  is_most_assist: Scalars['Boolean'];
  is_most_damage_dealt: Scalars['Boolean'];
  is_most_damage_taken?: Maybe<Scalars['Boolean']>;
  is_most_eye_killed: Scalars['Boolean'];
  is_most_eye_placed: Scalars['Boolean'];
  is_most_gold_earned: Scalars['Boolean'];
  is_most_minion_killed: Scalars['Boolean'];
  is_mvp?: Maybe<Scalars['Boolean']>;
  is_win: Scalars['Boolean'];
  kill?: Maybe<Scalars['Int']>;
  lane: LolLane;
  match: LolMatch;
  match_uid: Scalars['String'];
  minion_killed?: Maybe<Scalars['Int']>;
  most_kill: Scalars['Boolean'];
  pental_kill?: Maybe<Scalars['Int']>;
  player: PlayerGame;
  player_game_uid: Scalars['String'];
  player_statistic?: Maybe<Scalars['JSON']>;
  point?: Maybe<Scalars['Int']>;
  quadra_kill?: Maybe<Scalars['Int']>;
  triple_kill?: Maybe<Scalars['Int']>;
  uid: Scalars['ID'];
};

export type LolMission = {
  __typename?: 'LolMission';
  champion?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  lane: LolLane;
  lucis_mission?: Maybe<LolLucisMission>;
  mission: Mission;
  mission_uid: Scalars['String'];
  number_match?: Maybe<Scalars['Int']>;
  regime: LolRegime;
  type: LolMissionType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export enum LolMissionType {
  Assist = 'Assist',
  Baron = 'Baron',
  DamageDealt = 'DamageDealt',
  DamageTaken = 'DamageTaken',
  DamageToChampion = 'DamageToChampion',
  DestroyTurret = 'DestroyTurret',
  DoubleKill = 'DoubleKill',
  DragonElemental = 'DragonElemental',
  DragonThousandYears = 'DragonThousandYears',
  FirstBlood = 'FirstBlood',
  FirstBloodTeam = 'FirstBloodTeam',
  Gold = 'Gold',
  GoldSpent = 'GoldSpent',
  Kill = 'Kill',
  KillingSpree = 'KillingSpree',
  MagicDamageDealt = 'MagicDamageDealt',
  MagicDamageTaken = 'MagicDamageTaken',
  MagicDamageToChampion = 'MagicDamageToChampion',
  Match = 'Match',
  MinionKill = 'MinionKill',
  PentalKill = 'PentalKill',
  PhysicalDamageDealt = 'PhysicalDamageDealt',
  PhysicalDamageTaken = 'PhysicalDamageTaken',
  PhysicalDamageToChampion = 'PhysicalDamageToChampion',
  QuadraKill = 'QuadraKill',
  TripleKill = 'TripleKill',
  TrueDamageDealt = 'TrueDamageDealt',
  TrueDamageTaken = 'TrueDamageTaken',
  TrueDamageToChampion = 'TrueDamageToChampion',
  UseChampion = 'UseChampion',
  WardKill = 'WardKill',
  WardPlace = 'WardPlace',
  Win = 'Win',
  WinStreak = 'WinStreak'
}

export type LolPlayerMatchGql = {
  __typename?: 'LolPlayerMatchGql';
  aces?: Maybe<Scalars['Int']>;
  assist?: Maybe<Scalars['Int']>;
  champion_id: Scalars['Int'];
  damage_dealt?: Maybe<Scalars['Int']>;
  damage_taken?: Maybe<Scalars['Int']>;
  deaths?: Maybe<Scalars['Int']>;
  double_kill?: Maybe<Scalars['Int']>;
  eye_killed?: Maybe<Scalars['Int']>;
  eye_placed?: Maybe<Scalars['Int']>;
  gold_earned?: Maybe<Scalars['Int']>;
  is_most_assist: Scalars['Boolean'];
  is_most_damage_dealt: Scalars['Boolean'];
  is_most_damage_taken?: Maybe<Scalars['Boolean']>;
  is_most_eye_killed: Scalars['Boolean'];
  is_most_eye_placed: Scalars['Boolean'];
  is_most_gold_earned: Scalars['Boolean'];
  is_most_minion_killed: Scalars['Boolean'];
  is_mvp?: Maybe<Scalars['Boolean']>;
  is_win: Scalars['Boolean'];
  kill?: Maybe<Scalars['Int']>;
  lane: LolLane;
  map_img?: Maybe<Scalars['String']>;
  match: LolMatch;
  match_uid: Scalars['String'];
  minion_killed?: Maybe<Scalars['Int']>;
  most_kill: Scalars['Boolean'];
  pental_kill?: Maybe<Scalars['Int']>;
  player: PlayerGame;
  player_game_uid: Scalars['String'];
  player_statistic?: Maybe<Scalars['JSON']>;
  point?: Maybe<Scalars['Int']>;
  quadra_kill?: Maybe<Scalars['Int']>;
  triple_kill?: Maybe<Scalars['Int']>;
  uid: Scalars['ID'];
};

export enum LolRegime {
  Arurf = 'ARURF',
  Aram = 'Aram',
  None = 'None',
  NormalDraft = 'NormalDraft',
  OneForAll = 'OneForAll',
  RankFlexible = 'RankFlexible',
  RankSingleDouble = 'RankSingleDouble',
  Tft = 'TFT',
  Urf = 'URF'
}

export type LucisMission = {
  __typename?: 'LucisMission';
  created_at: Scalars['DateTime'];
  game_uid?: Maybe<Scalars['String']>;
  mission: Mission;
  mission_uid: Scalars['String'];
  player_mission: PlayerMission;
  player_mission_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
};

export type LuckyChest = {
  __typename?: 'LuckyChest';
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  game_platform?: Maybe<GamePlatform>;
  game_platform_id?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  prize_alloc: Scalars['JSON'];
  sponsors?: Maybe<Scalars['String']>;
  ticket_cost?: Maybe<Scalars['Decimal']>;
  ticket_cost_type?: Maybe<CostType>;
  tier: LuckyChestTier;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type LuckyChestPrize = {
  __typename?: 'LuckyChestPrize';
  _count: LuckyChestPrizeCount;
  category?: Maybe<PrizeCategory>;
  category_id?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  img?: Maybe<Scalars['String']>;
  inventory_item?: Maybe<Array<UserInventoryItem>>;
  inventory_piece?: Maybe<Array<UserInventoryPiece>>;
  prize_amount?: Maybe<Scalars['Decimal']>;
  quantity_in_stock?: Maybe<Scalars['Int']>;
  raffle?: Maybe<Array<Raffle>>;
  rarity?: Maybe<PrizeRarity>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user_prize_history?: Maybe<Array<UserLuckyChestHistory>>;
  valued_at?: Maybe<Scalars['Decimal']>;
};

export type LuckyChestPrizeCount = {
  __typename?: 'LuckyChestPrizeCount';
  inventory_item: Scalars['Int'];
  inventory_piece: Scalars['Int'];
  raffle: Scalars['Int'];
  user_prize_history: Scalars['Int'];
};

export enum LuckyChestTier {
  Free = 'FREE',
  Nft = 'NFT',
  Premium = 'PREMIUM',
  Standard = 'STANDARD'
}

export type LuckyChestUserInfo = {
  __typename?: 'LuckyChestUserInfo';
  history?: Maybe<Array<UserHistory>>;
  history_count?: Maybe<Scalars['Int']>;
};

export type MatchEarning = {
  __typename?: 'MatchEarning';
  assist?: Maybe<Scalars['Int']>;
  damage_taken1?: Maybe<Scalars['Int']>;
  damage_taken2?: Maybe<Scalars['Int']>;
  damage_taken3?: Maybe<Scalars['Int']>;
  damage_taken_aram1?: Maybe<Scalars['Int']>;
  damage_taken_aram2?: Maybe<Scalars['Int']>;
  damage_taken_aram3?: Maybe<Scalars['Int']>;
  double_kill?: Maybe<Scalars['Int']>;
  game_uid?: Maybe<Scalars['String']>;
  headshot?: Maybe<Scalars['Int']>;
  highest_kda?: Maybe<Scalars['Int']>;
  highest_kr?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  kill?: Maybe<Scalars['Int']>;
  least_died?: Maybe<Scalars['Int']>;
  minion_kill1?: Maybe<Scalars['Int']>;
  minion_kill2?: Maybe<Scalars['Int']>;
  minion_kill3?: Maybe<Scalars['Int']>;
  minion_kill_map_aram1?: Maybe<Scalars['Int']>;
  minion_kill_map_aram2?: Maybe<Scalars['Int']>;
  minion_kill_map_aram3?: Maybe<Scalars['Int']>;
  most_damage_taken?: Maybe<Scalars['Int']>;
  most_headshot?: Maybe<Scalars['Int']>;
  most_kill?: Maybe<Scalars['Int']>;
  most_support?: Maybe<Scalars['Int']>;
  mvp?: Maybe<Scalars['Int']>;
  pental_kill?: Maybe<Scalars['Int']>;
  quadra_kill?: Maybe<Scalars['Int']>;
  triple_kill?: Maybe<Scalars['Int']>;
  win?: Maybe<Scalars['Int']>;
  win_map_aram?: Maybe<Scalars['Int']>;
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
  created_at: Scalars['DateTime'];
  csgo_mission?: Maybe<CsgoMission>;
  game_uid: Scalars['String'];
  goal?: Maybe<Scalars['Decimal']>;
  img?: Maybe<Scalars['String']>;
  is_daily_mission: Scalars['Boolean'];
  level: MissionLevel;
  level_id: Scalars['Int'];
  lol_mission?: Maybe<LolMission>;
  lucis_mission?: Maybe<Array<LucisMission>>;
  mission_status: MissionStatus;
  number_match?: Maybe<Scalars['Int']>;
  player_mission?: Maybe<Array<PlayerMission>>;
  title?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_daily_mission?: Maybe<Array<UserDailyMission>>;
};

export type MissionCount = {
  __typename?: 'MissionCount';
  lucis_mission: Scalars['Int'];
  player_mission: Scalars['Int'];
  user_daily_mission: Scalars['Int'];
};

export type MissionHistory = {
  __typename?: 'MissionHistory';
  created_at: Scalars['DateTime'];
  player_mission: PlayerMission;
  player_mission_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type MissionLevel = {
  __typename?: 'MissionLevel';
  _count: MissionLevelCount;
  created_at: Scalars['DateTime'];
  game_uid?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  is_lucis_mission: Scalars['Boolean'];
  level: Scalars['Int'];
  lucis_point?: Maybe<Scalars['Int']>;
  lucis_token?: Maybe<Scalars['Decimal']>;
  mission?: Maybe<Array<Mission>>;
  updated_at: Scalars['DateTime'];
};

export type MissionLevelCount = {
  __typename?: 'MissionLevelCount';
  mission: Scalars['Int'];
};

export enum MissionStatus {
  Finish = 'FINISH',
  Ongoing = 'ONGOING',
  Upcoming = 'UPCOMING'
}

export type Mutation = {
  __typename?: 'Mutation';
  addStakedNft?: Maybe<Scalars['Boolean']>;
  assemble?: Maybe<UserInventoryItem>;
  buyRaffleTicket?: Maybe<Scalars['Boolean']>;
  claimBox?: Maybe<Scalars['Boolean']>;
  claimCSGOItem?: Maybe<Scalars['Boolean']>;
  claimChestPrize?: Maybe<Scalars['Boolean']>;
  claimMission?: Maybe<Scalars['Boolean']>;
  claimPhysicalItem?: Maybe<Scalars['Boolean']>;
  claimRaffle?: Maybe<Scalars['Boolean']>;
  claimStaked?: Maybe<Scalars['Boolean']>;
  connect?: Maybe<PlatformAccountDto>;
  /** Connect Faceit */
  connectFaceit: PlatformAccountDto;
  disconnectConnectFaceit?: Maybe<Scalars['Boolean']>;
  /** Disconnect LOL */
  disconnectLmss?: Maybe<Scalars['Boolean']>;
  equipNft?: Maybe<Scalars['Boolean']>;
  getOrSetDailyMission: Array<PlayerMission>;
  kycAccount?: Maybe<PlatformAccountDto>;
  openChest?: Maybe<Scalars['String']>;
  rerollDailyMission?: Maybe<PlayerMission>;
  setUtm?: Maybe<Scalars['Boolean']>;
  unStakedNft?: Maybe<Scalars['Boolean']>;
  updateDailyMission?: Maybe<Array<PlayerMission>>;
  upgradeLucisMission?: Maybe<PlayerMission>;
  withdrawLucisToken?: Maybe<Scalars['Boolean']>;
};


export type MutationAddStakedNftArgs = {
  data: StakedNft;
};


export type MutationAssembleArgs = {
  piece_group: Scalars['String'];
};


export type MutationBuyRaffleTicketArgs = {
  input: UserTicketInputGql;
};


export type MutationClaimBoxArgs = {
  game_uid: Scalars['String'];
  platform_id: Scalars['Int'];
};


export type MutationClaimCsgoItemArgs = {
  input: ClaimCsgoInput;
};


export type MutationClaimChestPrizeArgs = {
  address?: InputMaybe<Scalars['String']>;
  user_prize_history_uid: Scalars['String'];
};


export type MutationClaimMissionArgs = {
  player_mission_uid: Scalars['String'];
};


export type MutationClaimPhysicalItemArgs = {
  input: ClaimPhysicalInput;
};


export type MutationClaimRaffleArgs = {
  address?: InputMaybe<Scalars['String']>;
  raffle_uid: Scalars['String'];
  ticket_number: Scalars['String'];
};


export type MutationClaimStakedArgs = {
  staked_uid: Scalars['String'];
  tx_hash: Scalars['String'];
};


export type MutationConnectArgs = {
  avatar: Scalars['String'];
  nick_name: Scalars['String'];
  player_id: Scalars['String'];
  user_id: Scalars['Int'];
};


export type MutationConnectFaceitArgs = {
  accessToken: Scalars['String'];
  idToken: Scalars['String'];
};


export type MutationEquipNftArgs = {
  data: EquipNftInput;
};


export type MutationGetOrSetDailyMissionArgs = {
  game_uid: Scalars['String'];
  platform_id: Scalars['Int'];
};


export type MutationKycAccountArgs = {
  summoner_name: Scalars['String'];
};


export type MutationOpenChestArgs = {
  game_platform_id?: InputMaybe<Scalars['Int']>;
  tier: LuckyChestTier;
};


export type MutationRerollDailyMissionArgs = {
  platform_id: Scalars['Int'];
  player_mission_uid: Scalars['String'];
};


export type MutationSetUtmArgs = {
  raw_uri: Scalars['String'];
  user_id?: InputMaybe<Scalars['Float']>;
};


export type MutationUnStakedNftArgs = {
  nft_uid: Scalars['String'];
};


export type MutationUpdateDailyMissionArgs = {
  game_uid: Scalars['String'];
  platform_id: Scalars['Int'];
};


export type MutationUpgradeLucisMissionArgs = {
  platform_id: Scalars['Int'];
  player_mission_uid: Scalars['String'];
};


export type MutationWithdrawLucisTokenArgs = {
  address: Scalars['String'];
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
  tournament_uid?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export enum OpenChestErrorCode {
  BalanceNotInitiated = 'BalanceNotInitiated',
  ChestNotFound = 'ChestNotFound',
  GameNotConnected = 'GameNotConnected',
  NotEnoughLucisPoint = 'NotEnoughLucisPoint',
  NotEnoughLucisToken = 'NotEnoughLucisToken',
  OutOfPrizes = 'OutOfPrizes',
  PrizeNotFound = 'PrizeNotFound',
  ServerError = 'ServerError'
}

export type P2eSponsor = {
  __typename?: 'P2eSponsor';
  created_at: Scalars['DateTime'];
  img?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  pos_in_raffle_overview?: Maybe<Scalars['Int']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type PiecesFilter = {
  __typename?: 'PiecesFilter';
  piece_group?: Maybe<Scalars['String']>;
};

export type Platform = {
  __typename?: 'Platform';
  _count: PlatformCount;
  accounts?: Maybe<Array<PlatformAccount>>;
  created_at: Scalars['DateTime'];
  game?: Maybe<Array<GamePlatform>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

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
  platform_id: Scalars['Int'];
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
  platform_id: Scalars['Int'];
  player_uid: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type PlatformCount = {
  __typename?: 'PlatformCount';
  accounts: Scalars['Int'];
  game: Scalars['Int'];
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

export type PlayerCsgoMatch = {
  __typename?: 'PlayerCsgoMatch';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  is_win: Scalars['Boolean'];
  lucis_point: Scalars['Int'];
  match: CsgoMatch;
  match_uid: Scalars['String'];
  player: PlayerGame;
  player_game_uid: Scalars['String'];
  player_statistic?: Maybe<Scalars['JSON']>;
  updated_at: Scalars['DateTime'];
};

export type PlayerCsgoMatchGql = {
  __typename?: 'PlayerCsgoMatchGql';
  end_at: Scalars['DateTime'];
  is_win: Scalars['Boolean'];
  lucis_point: Scalars['Int'];
  map?: Maybe<Scalars['String']>;
  match_uid: Scalars['String'];
  player_statistic?: Maybe<Scalars['JSON']>;
  score?: Maybe<Scalars['String']>;
};

export type PlayerGame = {
  __typename?: 'PlayerGame';
  _count: PlayerGameCount;
  created_at: Scalars['DateTime'];
  csgo_matches?: Maybe<Array<PlayerCsgoMatch>>;
  game_uid: Scalars['String'];
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  lol_matches?: Maybe<Array<PlayerLolMatch>>;
  platform_account: PlatformAccount;
  platform_account_uid: Scalars['String'];
  player_mission?: Maybe<Array<PlayerMission>>;
  puuid?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type PlayerGameCount = {
  __typename?: 'PlayerGameCount';
  csgo_matches: Scalars['Int'];
  lol_matches: Scalars['Int'];
  player_mission: Scalars['Int'];
};

export type PlayerInformation = {
  __typename?: 'PlayerInformation';
  avatar?: Maybe<Scalars['String']>;
  is_connect?: Maybe<Scalars['Boolean']>;
  lucis_point?: Maybe<Scalars['Int']>;
  lucis_token?: Maybe<Scalars['Decimal']>;
  nickname?: Maybe<Scalars['String']>;
  player_uid?: Maybe<Scalars['String']>;
};

export type PlayerLolMatch = {
  __typename?: 'PlayerLolMatch';
  aces?: Maybe<Scalars['Int']>;
  assist?: Maybe<Scalars['Int']>;
  champion_id: Scalars['Int'];
  created_at: Scalars['DateTime'];
  damage_dealt?: Maybe<Scalars['Int']>;
  damage_taken?: Maybe<Scalars['Int']>;
  deaths?: Maybe<Scalars['Int']>;
  double_kill?: Maybe<Scalars['Int']>;
  eye_killed?: Maybe<Scalars['Int']>;
  eye_placed?: Maybe<Scalars['Int']>;
  gold_earned?: Maybe<Scalars['Int']>;
  is_most_assist: Scalars['Boolean'];
  is_most_damage_dealt: Scalars['Boolean'];
  is_most_damage_taken?: Maybe<Scalars['Boolean']>;
  is_most_eye_killed: Scalars['Boolean'];
  is_most_eye_placed: Scalars['Boolean'];
  is_most_gold_earned: Scalars['Boolean'];
  is_most_minion_killed: Scalars['Boolean'];
  is_mvp?: Maybe<Scalars['Boolean']>;
  is_win: Scalars['Boolean'];
  kill?: Maybe<Scalars['Int']>;
  lane: LolLane;
  match: LolMatch;
  match_uid: Scalars['String'];
  minion_killed?: Maybe<Scalars['Int']>;
  most_kill: Scalars['Boolean'];
  pental_kill?: Maybe<Scalars['Int']>;
  player: PlayerGame;
  player_game_uid: Scalars['String'];
  player_statistic?: Maybe<Scalars['JSON']>;
  point?: Maybe<Scalars['Int']>;
  quadra_kill?: Maybe<Scalars['Int']>;
  triple_kill?: Maybe<Scalars['Int']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type PlayerLolMatchGql = {
  __typename?: 'PlayerLolMatchGql';
  aces?: Maybe<Scalars['Int']>;
  assist?: Maybe<Scalars['Int']>;
  champion_id: Scalars['Int'];
  damage_dealt?: Maybe<Scalars['Int']>;
  damage_taken?: Maybe<Scalars['Int']>;
  deaths?: Maybe<Scalars['Int']>;
  double_kill?: Maybe<Scalars['Int']>;
  end_at: Scalars['DateTime'];
  eye_killed?: Maybe<Scalars['Int']>;
  eye_placed?: Maybe<Scalars['Int']>;
  gold_earned?: Maybe<Scalars['Int']>;
  is_most_assist: Scalars['Boolean'];
  is_most_damage_dealt: Scalars['Boolean'];
  is_most_damage_taken?: Maybe<Scalars['Boolean']>;
  is_most_eye_killed: Scalars['Boolean'];
  is_most_eye_placed: Scalars['Boolean'];
  is_most_gold_earned: Scalars['Boolean'];
  is_most_minion_killed: Scalars['Boolean'];
  is_mvp?: Maybe<Scalars['Boolean']>;
  is_win: Scalars['Boolean'];
  kill?: Maybe<Scalars['Int']>;
  lane: LolLane;
  map?: Maybe<Scalars['String']>;
  match_uid: Scalars['String'];
  minion_killed?: Maybe<Scalars['Int']>;
  most_kill: Scalars['Boolean'];
  pental_kill?: Maybe<Scalars['Int']>;
  player_statistic?: Maybe<Scalars['JSON']>;
  point?: Maybe<Scalars['Int']>;
  quadra_kill?: Maybe<Scalars['Int']>;
  region?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['String']>;
  triple_kill?: Maybe<Scalars['Int']>;
  type: LolRegime;
  uid: Scalars['ID'];
};

export type PlayerMission = {
  __typename?: 'PlayerMission';
  _count: PlayerMissionCount;
  achieved?: Maybe<Scalars['Decimal']>;
  created_at: Scalars['DateTime'];
  daily_mission?: Maybe<Array<UserDailyMission>>;
  history?: Maybe<Array<MissionHistory>>;
  is_claim: Scalars['Boolean'];
  lucis_mission?: Maybe<Array<LucisMission>>;
  mission: Mission;
  mission_uid: Scalars['String'];
  player_game: PlayerGame;
  player_game_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type PlayerMissionCount = {
  __typename?: 'PlayerMissionCount';
  daily_mission: Scalars['Int'];
  history: Scalars['Int'];
  lucis_mission: Scalars['Int'];
};

export type PlayerMissionGql = {
  __typename?: 'PlayerMissionGql';
  achieve?: Maybe<Scalars['Decimal']>;
  claim?: Maybe<Scalars['Boolean']>;
  goal?: Maybe<Scalars['Decimal']>;
  is_daily_mission?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
  lucis_point?: Maybe<Scalars['Int']>;
  lucis_token?: Maybe<Scalars['Decimal']>;
  mission_title?: Maybe<Scalars['String']>;
  mission_type?: Maybe<Scalars['String']>;
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

export type PoolWallet = {
  __typename?: 'PoolWallet';
  address: Scalars['String'];
  chain: Chain;
  chain_symbol: ChainSymbol;
  created_at: Scalars['DateTime'];
  currency_uid: Scalars['String'];
  private_key: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type PrizeCategory = {
  __typename?: 'PrizeCategory';
  _count: PrizeCategoryCount;
  created_at: Scalars['DateTime'];
  currency?: Maybe<Currency>;
  currency_type?: Maybe<CurrrencyType>;
  currency_uid?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  item_group?: Maybe<ItemGroup>;
  piece_group?: Maybe<Scalars['String']>;
  prize?: Maybe<Array<LuckyChestPrize>>;
  prize_type?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type PrizeCategoryCount = {
  __typename?: 'PrizeCategoryCount';
  prize: Scalars['Int'];
};

export enum PrizeRarity {
  Common = 'Common',
  Epic = 'Epic',
  Legendary = 'Legendary',
  Mythic = 'Mythic',
  Rare = 'Rare',
  Uncommon = 'Uncommon'
}

export type ProgressDailyMission = {
  __typename?: 'ProgressDailyMission';
  achieved?: Maybe<Scalars['Int']>;
  goal?: Maybe<Scalars['Int']>;
  is_open?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  GetAllPlayerNFT?: Maybe<Array<PlayerNft>>;
  createInviteLinkDiscord?: Maybe<Scalars['String']>;
  /** this token will expire after 5 minutes */
  generateToken?: Maybe<Scalars['String']>;
  getAllTickets?: Maybe<TicketList>;
  getAppErrorCode?: Maybe<Scalars['Boolean']>;
  getBalance?: Maybe<GBalance>;
  getChestDetail?: Maybe<ChestDetail>;
  getCsgoMatchStatistic?: Maybe<CsgoMatchStatistics>;
  getInvitedFriend?: Maybe<Array<ReferFriendGql>>;
  getLolMatchStatistic?: Maybe<LolMatchStatisticGql>;
  getLucisMission: Array<PlayerMission>;
  getLuckyChestUserInfo?: Maybe<LuckyChestUserInfo>;
  getMyTickets?: Maybe<TicketList>;
  getNumberConnectedUser?: Maybe<Array<ConnectesUser>>;
  getPlatformAccount?: Maybe<Array<PlatformAccount>>;
  getPlaycoreRanking?: Maybe<Array<UserRanking>>;
  getProgressDailyMission?: Maybe<ProgressDailyMission>;
  getRaffleDetail?: Maybe<RaffleDetail>;
  getRaffleRanking?: Maybe<Array<UserRanking>>;
  getRankingSeasons?: Maybe<Array<RankingSeasonDto>>;
  getRecentWinners?: Maybe<Array<RecentWinner>>;
  getRecentlyCsgoMatch?: Maybe<GCsgoMatch>;
  getRecentlyLolMatch?: Maybe<LolMatchGql>;
  getReferralCard?: Maybe<ReferralCardDto>;
  getSponsorRaffles?: Maybe<Array<P2eSponsor>>;
  getTopRanking?: Maybe<TopRanking>;
  getTournamentRanking?: Maybe<Array<UserRanking>>;
  getUserPlaycoreRanking?: Maybe<UserRanking>;
  getUserRaffleRanking?: Maybe<UserRanking>;
  getUserTournamentRanking?: Maybe<UserRanking>;
  getWinnerAnnouncement?: Maybe<Array<WinnerAnnouncement>>;
  getWonTickets?: Maybe<Array<Scalars['String']>>;
  hasJoinedDiscord?: Maybe<Scalars['Boolean']>;
  inventoryItems?: Maybe<Array<InventoryItem>>;
  inventoryPieces?: Maybe<Array<InventoryPieceGroup>>;
  isClaimBox?: Maybe<Scalars['Boolean']>;
  isConnectPlatform?: Maybe<Scalars['Boolean']>;
  myWonTickets?: Maybe<Array<UserWonTicketGql>>;
  piecesFilter?: Maybe<Array<PiecesFilter>>;
  searchAndGetPlayerInformation?: Maybe<PlayerInformation>;
  searchBySummonerName?: Maybe<LolAccountDto>;
  searchRaffle?: Maybe<Array<RaffleGql>>;
  spotlightRaffle?: Maybe<RaffleGql>;
};


export type QueryGetAllPlayerNftArgs = {
  game_uid: Scalars['String'];
};


export type QueryGetAllTicketsArgs = {
  display_name?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  raffle_uid: Scalars['String'];
};


export type QueryGetAppErrorCodeArgs = {
  BuyRaffleTicketErrorCode?: InputMaybe<BuyRaffleTicketErrorCode>;
  ClaimChestPrizeErrorCode?: InputMaybe<ClaimChestPrizeErrorCode>;
  OpenChestErrorCode?: InputMaybe<OpenChestErrorCode>;
};


export type QueryGetChestDetailArgs = {
  game_platform_id?: InputMaybe<Scalars['Int']>;
  tier: LuckyChestTier;
};


export type QueryGetCsgoMatchStatisticArgs = {
  player_match_id: Scalars['Int'];
};


export type QueryGetLolMatchStatisticArgs = {
  player_match_id: Scalars['String'];
};


export type QueryGetLucisMissionArgs = {
  game_uid: Scalars['String'];
  platform_id: Scalars['Int'];
};


export type QueryGetLuckyChestUserInfoArgs = {
  game_platform_id?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  tier: LuckyChestTier;
};


export type QueryGetMyTicketsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  raffle_uid: Scalars['String'];
};


export type QueryGetPlaycoreRankingArgs = {
  seasonId: Scalars['String'];
};


export type QueryGetProgressDailyMissionArgs = {
  game_uid: Scalars['String'];
  platform_id: Scalars['Int'];
};


export type QueryGetRaffleDetailArgs = {
  raffle_uid: Scalars['String'];
};


export type QueryGetRaffleRankingArgs = {
  seasonId: Scalars['String'];
};


export type QueryGetRecentlyCsgoMatchArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  platform_id: Scalars['Int'];
};


export type QueryGetRecentlyLolMatchArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  platform_id: Scalars['Int'];
};


export type QueryGetReferralCardArgs = {
  game_uid: Scalars['String'];
  nickname: Scalars['String'];
  platform_id: Scalars['Int'];
  player_uid?: InputMaybe<Scalars['String']>;
};


export type QueryGetTopRankingArgs = {
  seasonId: Scalars['String'];
};


export type QueryGetTournamentRankingArgs = {
  seasonId: Scalars['String'];
};


export type QueryGetUserPlaycoreRankingArgs = {
  seasonId: Scalars['String'];
  user_id: Scalars['Int'];
};


export type QueryGetUserRaffleRankingArgs = {
  seasonId: Scalars['String'];
  user_id: Scalars['Int'];
};


export type QueryGetUserTournamentRankingArgs = {
  seasonId: Scalars['String'];
  user_id: Scalars['Int'];
};


export type QueryGetWonTicketsArgs = {
  raffle_uid: Scalars['String'];
};


export type QueryInventoryItemsArgs = {
  group_filter?: InputMaybe<ItemGroup>;
  search_name?: InputMaybe<Scalars['String']>;
  user_id: Scalars['Int'];
};


export type QueryInventoryPiecesArgs = {
  group_filter?: InputMaybe<Scalars['String']>;
  search_name?: InputMaybe<Scalars['String']>;
  user_id: Scalars['Int'];
};


export type QueryIsClaimBoxArgs = {
  game_uid: Scalars['String'];
  platform_id: Scalars['Int'];
};


export type QueryIsConnectPlatformArgs = {
  platform_id: Scalars['Int'];
};


export type QueryMyWonTicketsArgs = {
  raffle_uid: Scalars['String'];
};


export type QuerySearchAndGetPlayerInformationArgs = {
  game_uid: Scalars['String'];
  nickname: Scalars['String'];
  platform_id: Scalars['Int'];
};


export type QuerySearchBySummonerNameArgs = {
  name: Scalars['String'];
};


export type QuerySearchRaffleArgs = {
  filter: RaffleFilter;
};

export type Raffle = {
  __typename?: 'Raffle';
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  end_at: Scalars['DateTime'];
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  prize?: Maybe<LuckyChestPrize>;
  prize_amount?: Maybe<Scalars['Decimal']>;
  prize_id?: Maybe<Scalars['Int']>;
  raffle_sponsors?: Maybe<Scalars['String']>;
  regions?: Maybe<Scalars['String']>;
  status?: Maybe<RaffleStatus>;
  ticket?: Maybe<Ticket>;
  type?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  valued_at?: Maybe<Scalars['Decimal']>;
  winner_total?: Maybe<Scalars['Int']>;
  won_tickets?: Maybe<Scalars['String']>;
};

export type RaffleDetail = {
  __typename?: 'RaffleDetail';
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  end_at: Scalars['DateTime'];
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  prize_amount?: Maybe<Scalars['Decimal']>;
  prize_category?: Maybe<PrizeCategory>;
  raffle_sponsors?: Maybe<Array<P2eSponsor>>;
  regions?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<RaffleStatus>;
  ticket?: Maybe<Ticket>;
  type?: Maybe<Array<Scalars['String']>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  valued_at?: Maybe<Scalars['Decimal']>;
  winner_total?: Maybe<Scalars['Int']>;
};

export type RaffleFilter = {
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  skip_raffle_uid?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<RaffleStatusType>;
};

export type RaffleGql = {
  __typename?: 'RaffleGql';
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  end_at: Scalars['DateTime'];
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  prize_amount?: Maybe<Scalars['Decimal']>;
  prize_category?: Maybe<PrizeCategory>;
  raffle_sponsors?: Maybe<Scalars['String']>;
  regions?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<RaffleStatus>;
  ticket?: Maybe<Ticket>;
  type?: Maybe<Array<Scalars['String']>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  valued_at?: Maybe<Scalars['Decimal']>;
  winner_total?: Maybe<Scalars['Int']>;
};

export enum RaffleStatus {
  Closed = 'CLOSED',
  Disabled = 'DISABLED',
  Enabled = 'ENABLED'
}

export enum RaffleStatusType {
  Closed = 'CLOSED',
  Disabled = 'DISABLED',
  Enabled = 'ENABLED'
}

export type RankingSeasonDto = {
  __typename?: 'RankingSeasonDto';
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  fromDate: Scalars['DateTime'];
  name: Scalars['String'];
  status: StatusSeason;
  toDate: Scalars['DateTime'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
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

export type RecentWinner = {
  __typename?: 'RecentWinner';
  raffle?: Maybe<Raffle>;
  user?: Maybe<User>;
};

export type ReferFriendGql = {
  __typename?: 'ReferFriendGql';
  id: Scalars['ID'];
  invited_user_id: Scalars['Int'];
  status: ReferFriendStatus;
  user?: Maybe<User>;
};

export enum ReferFriendStatus {
  ConnectGame = 'ConnectGame',
  EarningPoint = 'EarningPoint',
  JoinSystem = 'JoinSystem',
  None = 'None'
}

export type ReferralCardDto = {
  __typename?: 'ReferralCardDto';
  daily_missions?: Maybe<Array<PlayerMissionGql>>;
  lucis_missions?: Maybe<Array<PlayerMissionGql>>;
  recent_csgo_matches?: Maybe<Array<PlayerCsgoMatchGql>>;
  recent_lol_matches?: Maybe<Array<PlayerLolMatchGql>>;
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

export type SpotlightAnnouncement = {
  __typename?: 'SpotlightAnnouncement';
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

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

export enum StatusSeason {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
  Upcoming = 'UPCOMING'
}

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

export type Subscription = {
  __typename?: 'Subscription';
  pushNotification: Notification;
  winnerAnnouncement: WinnerAnnouncement;
};


export type SubscriptionPushNotificationArgs = {
  user_id: Scalars['Float'];
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
  bought_count?: Maybe<Scalars['Int']>;
  cost?: Maybe<Scalars['Decimal']>;
  cost_type?: Maybe<CostType>;
  created_at: Scalars['DateTime'];
  raffle: Raffle;
  raffle_uid: Scalars['String'];
  total_limit?: Maybe<Scalars['Int']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_limit?: Maybe<Scalars['Int']>;
  user_ticket?: Maybe<Array<UserTicket>>;
};

export type TicketCount = {
  __typename?: 'TicketCount';
  user_ticket: Scalars['Int'];
};

export type TicketList = {
  __typename?: 'TicketList';
  count?: Maybe<Scalars['Int']>;
  user_tickets?: Maybe<Array<UserTicketGql>>;
};

export type TopRanking = {
  __typename?: 'TopRanking';
  playcore: UserRanking;
  raffle: UserRanking;
  tournament: UserRanking;
};

export type Tournament = {
  __typename?: 'Tournament';
  _count: TournamentCount;
  additionPrize: Scalars['Decimal'];
  annoucement?: Maybe<Array<SpotlightAnnouncement>>;
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
  is_auto_checkin: Scalars['Boolean'];
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
  systemSponsors?: Maybe<Array<SystemSponsor>>;
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
  annoucement: Scalars['Int'];
  brackets: Scalars['Int'];
  claim_transactions: Scalars['Int'];
  donate_transactions: Scalars['Int'];
  leader_board: Scalars['Int'];
  playTeams: Scalars['Int'];
  ranks: Scalars['Int'];
  reaction: Scalars['Int'];
  sponsorSlot: Scalars['Int'];
  systemSponsors: Scalars['Int'];
  tournament_subscribes: Scalars['Int'];
};

export type TournamentDeposit = {
  __typename?: 'TournamentDeposit';
  amount?: Maybe<Scalars['Decimal']>;
  block?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  created_by?: Maybe<Scalars['Int']>;
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
  Cancel = 'CANCEL',
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
  balace_history?: Maybe<Array<BalanceHistory>>;
  balance?: Maybe<Balance>;
  claim_prize_transactions?: Maybe<Array<ClaimPrizeTransaction>>;
  claim_staked?: Maybe<Array<ClaimStakedTransaction>>;
  claim_tournament?: Maybe<Array<ClaimTransaction>>;
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  dailyMission?: Maybe<Array<UserDailyMission>>;
  daily_history?: Maybe<Array<MissionHistory>>;
  email?: Maybe<Scalars['String']>;
  facebook_id?: Maybe<Scalars['String']>;
  favorite_game?: Maybe<Array<UserFavoriteGame>>;
  google_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inventory_items?: Maybe<Array<UserInventoryItem>>;
  inventory_pieces?: Maybe<Array<UserInventoryPiece>>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  luckychest_history?: Maybe<Array<UserLuckyChestHistory>>;
  nfts?: Maybe<Array<Nft>>;
  notification?: Maybe<Array<Notification>>;
  password?: Maybe<Scalars['String']>;
  platform_account?: Maybe<Array<PlatformAccount>>;
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
  withdraws?: Maybe<Array<WithdrawTransaction>>;
};

export type UserCount = {
  __typename?: 'UserCount';
  balace_history: Scalars['Int'];
  claim_prize_transactions: Scalars['Int'];
  claim_staked: Scalars['Int'];
  claim_tournament: Scalars['Int'];
  dailyMission: Scalars['Int'];
  daily_history: Scalars['Int'];
  favorite_game: Scalars['Int'];
  inventory_items: Scalars['Int'];
  inventory_pieces: Scalars['Int'];
  leader_board: Scalars['Int'];
  luckychest_history: Scalars['Int'];
  nfts: Scalars['Int'];
  notification: Scalars['Int'];
  platform_account: Scalars['Int'];
  playTeamMembers: Scalars['Int'];
  reaction: Scalars['Int'];
  sponsorTransactions: Scalars['Int'];
  staked_nft: Scalars['Int'];
  teamMembers: Scalars['Int'];
  tournament: Scalars['Int'];
  tournamentSubscriber: Scalars['Int'];
  user_ticket: Scalars['Int'];
  withdraws: Scalars['Int'];
};

export type UserDailyMission = {
  __typename?: 'UserDailyMission';
  created_at: Scalars['DateTime'];
  game_uid?: Maybe<Scalars['String']>;
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

export type UserHistory = {
  __typename?: 'UserHistory';
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  game_platform_id?: Maybe<Scalars['Int']>;
  is_claimed: Scalars['Boolean'];
  prize: LuckyChestPrize;
  prize_id: Scalars['Int'];
  tier: LuckyChestTier;
  uid: Scalars['ID'];
  user_id: Scalars['Int'];
};

export type UserInventoryItem = {
  __typename?: 'UserInventoryItem';
  created_at: Scalars['DateTime'];
  is_claimed: Scalars['Boolean'];
  prize?: Maybe<LuckyChestPrize>;
  prize_id?: Maybe<Scalars['Int']>;
  shipping_address?: Maybe<Scalars['String']>;
  steam_url?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
  user_phone?: Maybe<Scalars['String']>;
};

export type UserInventoryPiece = {
  __typename?: 'UserInventoryPiece';
  created_at: Scalars['DateTime'];
  prize: LuckyChestPrize;
  prize_id: Scalars['Int'];
  quantity: Scalars['Int'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type UserLuckyChestHistory = {
  __typename?: 'UserLuckyChestHistory';
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  game_platform_id?: Maybe<Scalars['Int']>;
  is_claimed: Scalars['Boolean'];
  prize: LuckyChestPrize;
  prize_id: Scalars['Int'];
  tier: LuckyChestTier;
  uid: Scalars['ID'];
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

export type UserRanking = {
  __typename?: 'UserRanking';
  code?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  platform_account?: Maybe<Array<PlatformAccount>>;
  profile?: Maybe<UserProfile>;
  rank?: Maybe<Scalars['Int']>;
  total_earning?: Maybe<Scalars['Float']>;
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
  created_at: Scalars['DateTime'];
  is_claimed?: Maybe<Scalars['Boolean']>;
  is_winner?: Maybe<Scalars['Boolean']>;
  ticket: Ticket;
  ticket_number?: Maybe<Scalars['String']>;
  ticket_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type UserTicketGql = {
  __typename?: 'UserTicketGql';
  created_at: Scalars['DateTime'];
  is_claimed?: Maybe<Scalars['Boolean']>;
  is_winner?: Maybe<Scalars['Boolean']>;
  ticket_number?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type UserTicketInputGql = {
  quantity: Scalars['Int'];
  raffle_ticket_uid: Scalars['String'];
};

export type UserWonTicketGql = {
  __typename?: 'UserWonTicketGql';
  created_at: Scalars['DateTime'];
  is_claimed?: Maybe<Scalars['Boolean']>;
  is_winner?: Maybe<Scalars['Boolean']>;
  ticket_number?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
};

export type WinnerAnnouncement = {
  __typename?: 'WinnerAnnouncement';
  content?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

export type WithdrawTransaction = {
  __typename?: 'WithdrawTransaction';
  amount: Scalars['Decimal'];
  block?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  currency: Currency;
  currency_uid: Scalars['String'];
  fee?: Maybe<Scalars['Decimal']>;
  status: TransactionStatus;
  tx_hash?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  usd_value?: Maybe<Scalars['Decimal']>;
  user: User;
  user_id: Scalars['Int'];
};
