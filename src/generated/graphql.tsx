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

export type AnnouncementType = {
  __typename?: 'AnnouncementType';
  content?: Maybe<Scalars['String']>;
  tournament_uid?: Maybe<Scalars['String']>;
};

export type AuthGraphql = {
  __typename?: 'AuthGraphql';
  token: Scalars['String'];
  user?: Maybe<AuthUserGql>;
};

export type AuthUserGql = {
  __typename?: 'AuthUserGql';
  _count: UserCount;
  balace_history?: Maybe<Array<BalanceHistory>>;
  balance?: Maybe<Balance>;
  claim_raffle?: Maybe<Array<ClaimRaffleTransaction>>;
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
  is_exist_pass?: Maybe<Scalars['Boolean']>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  nfts?: Maybe<Array<Nft>>;
  notification?: Maybe<Array<Notification>>;
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
  user_bonus?: Maybe<UserBonus>;
  user_ticket?: Maybe<Array<UserTicket>>;
  withdraws?: Maybe<Array<WithdrawTransaction>>;
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

export type BalanceCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<BalanceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BalanceCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<BalanceCreateWithoutUserInput>;
};

export type BalanceCreateOrConnectWithoutUserInput = {
  create: BalanceCreateWithoutUserInput;
  where: BalanceWhereUniqueInput;
};

export type BalanceCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  lucis_point?: InputMaybe<Scalars['Int']>;
  lucis_token?: InputMaybe<Scalars['Decimal']>;
  lucis_token_lock?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BalanceHistory = {
  __typename?: 'BalanceHistory';
  created_at: Scalars['DateTime'];
  decs?: Maybe<Scalars['String']>;
  lucis_point?: Maybe<Scalars['Int']>;
  lucis_token?: Maybe<Scalars['Decimal']>;
  reference?: Maybe<Scalars['String']>;
  type: BalanceHistoryType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type BalanceHistoryCreateManyUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  decs?: InputMaybe<Scalars['String']>;
  lucis_point?: InputMaybe<Scalars['Int']>;
  lucis_token?: InputMaybe<Scalars['Decimal']>;
  reference?: InputMaybe<Scalars['String']>;
  type: BalanceHistoryType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BalanceHistoryCreateManyUserInputEnvelope = {
  data: Array<BalanceHistoryCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BalanceHistoryCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<BalanceHistoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BalanceHistoryCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<BalanceHistoryCreateWithoutUserInput>>;
  createMany?: InputMaybe<BalanceHistoryCreateManyUserInputEnvelope>;
};

export type BalanceHistoryCreateOrConnectWithoutUserInput = {
  create: BalanceHistoryCreateWithoutUserInput;
  where: BalanceHistoryWhereUniqueInput;
};

export type BalanceHistoryCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  decs?: InputMaybe<Scalars['String']>;
  lucis_point?: InputMaybe<Scalars['Int']>;
  lucis_token?: InputMaybe<Scalars['Decimal']>;
  reference?: InputMaybe<Scalars['String']>;
  type: BalanceHistoryType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export enum BalanceHistoryType {
  Addition = 'ADDITION',
  Buyraffleticket = 'BUYRAFFLETICKET',
  Claimraffle = 'CLAIMRAFFLE',
  Dailymission = 'DAILYMISSION',
  Dailymissionbox = 'DAILYMISSIONBOX',
  Equip = 'EQUIP',
  Joindiscord = 'JOINDISCORD',
  Lucismission = 'LUCISMISSION',
  Match = 'MATCH',
  Referfriend = 'REFERFRIEND',
  Reroll = 'REROLL',
  Staked = 'STAKED'
}

export type BalanceHistoryWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type BalanceWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['Int']>;
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

export type BracketCreateManyTournamentInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  start_at: Scalars['DateTime'];
  status?: InputMaybe<BracketStatus>;
  type: BracketType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketCreateManyTournamentInputEnvelope = {
  data: Array<BracketCreateManyTournamentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BracketCreateNestedManyWithoutTournamentInput = {
  connect?: InputMaybe<Array<BracketWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BracketCreateOrConnectWithoutTournamentInput>>;
  create?: InputMaybe<Array<BracketCreateWithoutTournamentInput>>;
  createMany?: InputMaybe<BracketCreateManyTournamentInputEnvelope>;
};

export type BracketCreateNestedOneWithoutBracketMatchsInput = {
  connect?: InputMaybe<BracketWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BracketCreateOrConnectWithoutBracketMatchsInput>;
  create?: InputMaybe<BracketCreateWithoutBracketMatchsInput>;
};

export type BracketCreateNestedOneWithoutBracketRoundsInput = {
  connect?: InputMaybe<BracketWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BracketCreateOrConnectWithoutBracketRoundsInput>;
  create?: InputMaybe<BracketCreateWithoutBracketRoundsInput>;
};

export type BracketCreateOrConnectWithoutBracketMatchsInput = {
  create: BracketCreateWithoutBracketMatchsInput;
  where: BracketWhereUniqueInput;
};

export type BracketCreateOrConnectWithoutBracketRoundsInput = {
  create: BracketCreateWithoutBracketRoundsInput;
  where: BracketWhereUniqueInput;
};

export type BracketCreateOrConnectWithoutTournamentInput = {
  create: BracketCreateWithoutTournamentInput;
  where: BracketWhereUniqueInput;
};

export type BracketCreateWithoutBracketMatchsInput = {
  bracketRounds?: InputMaybe<BracketRoundCreateNestedManyWithoutBracketInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  start_at: Scalars['DateTime'];
  status?: InputMaybe<BracketStatus>;
  tournament: TournamentCreateNestedOneWithoutBracketsInput;
  type: BracketType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketCreateWithoutBracketRoundsInput = {
  bracketMatchs?: InputMaybe<BracketMatchCreateNestedManyWithoutBracketInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  start_at: Scalars['DateTime'];
  status?: InputMaybe<BracketStatus>;
  tournament: TournamentCreateNestedOneWithoutBracketsInput;
  type: BracketType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketCreateWithoutTournamentInput = {
  bracketMatchs?: InputMaybe<BracketMatchCreateNestedManyWithoutBracketInput>;
  bracketRounds?: InputMaybe<BracketRoundCreateNestedManyWithoutBracketInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  start_at: Scalars['DateTime'];
  status?: InputMaybe<BracketStatus>;
  type: BracketType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketGql = {
  __typename?: 'BracketGql';
  bracketRounds?: Maybe<Array<BracketRound>>;
  created_at: Scalars['DateTime'];
  playTeams?: Maybe<Array<PlayTeamGql>>;
  start_at: Scalars['DateTime'];
  status: BracketStatus;
  tournament_uid: Scalars['String'];
  type: BracketType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
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

export type BracketMatchCreateManyBracketInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  first_match_uid?: InputMaybe<Scalars['String']>;
  link_stream?: InputMaybe<Scalars['String']>;
  link_stream_enable?: InputMaybe<Scalars['Boolean']>;
  lower_match_uid?: InputMaybe<Scalars['String']>;
  playteam1_uid: Scalars['String'];
  playteam2_uid: Scalars['String'];
  round_uid: Scalars['String'];
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_uid?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  upper_match_uid?: InputMaybe<Scalars['String']>;
};

export type BracketMatchCreateManyBracketInputEnvelope = {
  data: Array<BracketMatchCreateManyBracketInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BracketMatchCreateManyRoundInput = {
  bracket_uid: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  first_match_uid?: InputMaybe<Scalars['String']>;
  link_stream?: InputMaybe<Scalars['String']>;
  link_stream_enable?: InputMaybe<Scalars['Boolean']>;
  lower_match_uid?: InputMaybe<Scalars['String']>;
  playteam1_uid: Scalars['String'];
  playteam2_uid: Scalars['String'];
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_uid?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  upper_match_uid?: InputMaybe<Scalars['String']>;
};

export type BracketMatchCreateManyRoundInputEnvelope = {
  data: Array<BracketMatchCreateManyRoundInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BracketMatchCreateNestedManyWithoutBracketInput = {
  connect?: InputMaybe<Array<BracketMatchWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BracketMatchCreateOrConnectWithoutBracketInput>>;
  create?: InputMaybe<Array<BracketMatchCreateWithoutBracketInput>>;
  createMany?: InputMaybe<BracketMatchCreateManyBracketInputEnvelope>;
};

export type BracketMatchCreateNestedManyWithoutRoundInput = {
  connect?: InputMaybe<Array<BracketMatchWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BracketMatchCreateOrConnectWithoutRoundInput>>;
  create?: InputMaybe<Array<BracketMatchCreateWithoutRoundInput>>;
  createMany?: InputMaybe<BracketMatchCreateManyRoundInputEnvelope>;
};

export type BracketMatchCreateOrConnectWithoutBracketInput = {
  create: BracketMatchCreateWithoutBracketInput;
  where: BracketMatchWhereUniqueInput;
};

export type BracketMatchCreateOrConnectWithoutRoundInput = {
  create: BracketMatchCreateWithoutRoundInput;
  where: BracketMatchWhereUniqueInput;
};

export type BracketMatchCreateWithoutBracketInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  first_match_uid?: InputMaybe<Scalars['String']>;
  link_stream?: InputMaybe<Scalars['String']>;
  link_stream_enable?: InputMaybe<Scalars['Boolean']>;
  lower_match_uid?: InputMaybe<Scalars['String']>;
  playteam1_uid: Scalars['String'];
  playteam2_uid: Scalars['String'];
  round: BracketRoundCreateNestedOneWithoutBracketMatchsInput;
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_uid?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  upper_match_uid?: InputMaybe<Scalars['String']>;
};

export type BracketMatchCreateWithoutRoundInput = {
  bracket: BracketCreateNestedOneWithoutBracketMatchsInput;
  created_at?: InputMaybe<Scalars['DateTime']>;
  first_match_uid?: InputMaybe<Scalars['String']>;
  link_stream?: InputMaybe<Scalars['String']>;
  link_stream_enable?: InputMaybe<Scalars['Boolean']>;
  lower_match_uid?: InputMaybe<Scalars['String']>;
  playteam1_uid: Scalars['String'];
  playteam2_uid: Scalars['String'];
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_uid?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  upper_match_uid?: InputMaybe<Scalars['String']>;
};

export enum BracketMatchStatus {
  Complete = 'COMPLETE',
  Pending = 'PENDING'
}

export type BracketMatchUpdateInputGql = {
  /** Finish match */
  finish_match?: InputMaybe<Scalars['Boolean']>;
  /** Link stream */
  link_stream?: InputMaybe<Scalars['String']>;
  /** Link stream enable */
  link_stream_enable?: InputMaybe<Scalars['Boolean']>;
  /** Score of team 1 */
  score_1: Scalars['Int'];
  /** Score of team 2 */
  score_2: Scalars['Int'];
  uid: Scalars['String'];
};

export type BracketMatchWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

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

export type BracketRoundCreateInputGql = {
  bracketMatchs?: InputMaybe<BracketMatchCreateNestedManyWithoutRoundInput>;
  start_at: Scalars['DateTime'];
  title: Scalars['String'];
  type?: InputMaybe<BracketRoundType>;
};

export type BracketRoundCreateManyBracketInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  start_at: Scalars['DateTime'];
  title: Scalars['String'];
  type?: InputMaybe<BracketRoundType>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketRoundCreateManyBracketInputEnvelope = {
  data: Array<BracketRoundCreateManyBracketInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BracketRoundCreateNestedManyWithoutBracketInput = {
  connect?: InputMaybe<Array<BracketRoundWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BracketRoundCreateOrConnectWithoutBracketInput>>;
  create?: InputMaybe<Array<BracketRoundCreateWithoutBracketInput>>;
  createMany?: InputMaybe<BracketRoundCreateManyBracketInputEnvelope>;
};

export type BracketRoundCreateNestedOneWithoutBracketMatchsInput = {
  connect?: InputMaybe<BracketRoundWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BracketRoundCreateOrConnectWithoutBracketMatchsInput>;
  create?: InputMaybe<BracketRoundCreateWithoutBracketMatchsInput>;
};

export type BracketRoundCreateOrConnectWithoutBracketInput = {
  create: BracketRoundCreateWithoutBracketInput;
  where: BracketRoundWhereUniqueInput;
};

export type BracketRoundCreateOrConnectWithoutBracketMatchsInput = {
  create: BracketRoundCreateWithoutBracketMatchsInput;
  where: BracketRoundWhereUniqueInput;
};

export type BracketRoundCreateWithoutBracketInput = {
  bracketMatchs?: InputMaybe<BracketMatchCreateNestedManyWithoutRoundInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  start_at: Scalars['DateTime'];
  title: Scalars['String'];
  type?: InputMaybe<BracketRoundType>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketRoundCreateWithoutBracketMatchsInput = {
  bracket: BracketCreateNestedOneWithoutBracketRoundsInput;
  created_at?: InputMaybe<Scalars['DateTime']>;
  start_at: Scalars['DateTime'];
  title: Scalars['String'];
  type?: InputMaybe<BracketRoundType>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export enum BracketRoundType {
  Lower = 'LOWER',
  Upper = 'UPPER'
}

export type BracketRoundWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

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

export type BracketWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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
  created_at?: InputMaybe<Scalars['DateTime']>;
  team_participated: Scalars['Int'];
  total_donation?: InputMaybe<Scalars['Decimal']>;
  total_prize_pool?: InputMaybe<Scalars['Decimal']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type CacheTournamentWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  tournament_uid?: InputMaybe<Scalars['String']>;
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

export type ChainCreateNestedOneWithoutCurrenciesInput = {
  connect?: InputMaybe<ChainWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChainCreateOrConnectWithoutCurrenciesInput>;
  create?: InputMaybe<ChainCreateWithoutCurrenciesInput>;
};

export type ChainCreateOrConnectWithoutCurrenciesInput = {
  create: ChainCreateWithoutCurrenciesInput;
  where: ChainWhereUniqueInput;
};

export type ChainCreateWithoutCurrenciesInput = {
  chain_id?: InputMaybe<Scalars['Int']>;
  contracts?: InputMaybe<ContractCreateNestedManyWithoutChainInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  explorer?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  poolWallet?: InputMaybe<PoolWalletCreateNestedManyWithoutChainInput>;
  rpc_url?: InputMaybe<Scalars['String']>;
  symbol: ChainSymbol;
  updated_at?: InputMaybe<Scalars['DateTime']>;
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

export type ChainWhereUniqueInput = {
  symbol?: InputMaybe<ChainSymbol>;
};

export type ClaimRaffleTransaction = {
  __typename?: 'ClaimRaffleTransaction';
  created_at: Scalars['DateTime'];
  lucis_point?: Maybe<Scalars['Int']>;
  lucis_token?: Maybe<Scalars['Decimal']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
  user_ticket: UserTicket;
  user_ticket_uid: Scalars['String'];
};

export type ClaimRaffleTransactionCreateManyUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  lucis_point?: InputMaybe<Scalars['Int']>;
  lucis_token?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_ticket_uid: Scalars['String'];
};

export type ClaimRaffleTransactionCreateManyUserInputEnvelope = {
  data: Array<ClaimRaffleTransactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ClaimRaffleTransactionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ClaimRaffleTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ClaimRaffleTransactionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ClaimRaffleTransactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<ClaimRaffleTransactionCreateManyUserInputEnvelope>;
};

export type ClaimRaffleTransactionCreateNestedOneWithoutUser_TicketInput = {
  connect?: InputMaybe<ClaimRaffleTransactionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ClaimRaffleTransactionCreateOrConnectWithoutUser_TicketInput>;
  create?: InputMaybe<ClaimRaffleTransactionCreateWithoutUser_TicketInput>;
};

export type ClaimRaffleTransactionCreateOrConnectWithoutUserInput = {
  create: ClaimRaffleTransactionCreateWithoutUserInput;
  where: ClaimRaffleTransactionWhereUniqueInput;
};

export type ClaimRaffleTransactionCreateOrConnectWithoutUser_TicketInput = {
  create: ClaimRaffleTransactionCreateWithoutUser_TicketInput;
  where: ClaimRaffleTransactionWhereUniqueInput;
};

export type ClaimRaffleTransactionCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  lucis_point?: InputMaybe<Scalars['Int']>;
  lucis_token?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_ticket: UserTicketCreateNestedOneWithoutClaim_TransactionInput;
};

export type ClaimRaffleTransactionCreateWithoutUser_TicketInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  lucis_point?: InputMaybe<Scalars['Int']>;
  lucis_token?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutClaim_RaffleInput;
};

export type ClaimRaffleTransactionWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
  user_ticket_uid?: InputMaybe<Scalars['String']>;
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

export type ClaimStakedTransactionCreateManyStakedInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
  user_id: Scalars['Int'];
};

export type ClaimStakedTransactionCreateManyStakedInputEnvelope = {
  data: Array<ClaimStakedTransactionCreateManyStakedInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ClaimStakedTransactionCreateManyUserInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  fee?: InputMaybe<Scalars['Decimal']>;
  staked_uid: Scalars['String'];
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type ClaimStakedTransactionCreateManyUserInputEnvelope = {
  data: Array<ClaimStakedTransactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ClaimStakedTransactionCreateNestedManyWithoutStakedInput = {
  connect?: InputMaybe<Array<ClaimStakedTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ClaimStakedTransactionCreateOrConnectWithoutStakedInput>>;
  create?: InputMaybe<Array<ClaimStakedTransactionCreateWithoutStakedInput>>;
  createMany?: InputMaybe<ClaimStakedTransactionCreateManyStakedInputEnvelope>;
};

export type ClaimStakedTransactionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ClaimStakedTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ClaimStakedTransactionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ClaimStakedTransactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<ClaimStakedTransactionCreateManyUserInputEnvelope>;
};

export type ClaimStakedTransactionCreateOrConnectWithoutStakedInput = {
  create: ClaimStakedTransactionCreateWithoutStakedInput;
  where: ClaimStakedTransactionWhereUniqueInput;
};

export type ClaimStakedTransactionCreateOrConnectWithoutUserInput = {
  create: ClaimStakedTransactionCreateWithoutUserInput;
  where: ClaimStakedTransactionWhereUniqueInput;
};

export type ClaimStakedTransactionCreateWithoutStakedInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
  user: UserCreateNestedOneWithoutClaim_StakedInput;
};

export type ClaimStakedTransactionCreateWithoutUserInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  fee?: InputMaybe<Scalars['Decimal']>;
  staked: StakedCreateNestedOneWithoutClaim_StakedInput;
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type ClaimStakedTransactionWhereUniqueInput = {
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
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

export type ClaimTransactionCreateManyTournamentsInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  type: ClaimType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
  user_id: Scalars['Int'];
};

export type ClaimTransactionCreateManyTournamentsInputEnvelope = {
  data: Array<ClaimTransactionCreateManyTournamentsInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ClaimTransactionCreateManyUserInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  tournament_uid: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  type: ClaimType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type ClaimTransactionCreateManyUserInputEnvelope = {
  data: Array<ClaimTransactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ClaimTransactionCreateNestedManyWithoutTournamentsInput = {
  connect?: InputMaybe<Array<ClaimTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ClaimTransactionCreateOrConnectWithoutTournamentsInput>>;
  create?: InputMaybe<Array<ClaimTransactionCreateWithoutTournamentsInput>>;
  createMany?: InputMaybe<ClaimTransactionCreateManyTournamentsInputEnvelope>;
};

export type ClaimTransactionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ClaimTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ClaimTransactionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ClaimTransactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<ClaimTransactionCreateManyUserInputEnvelope>;
};

export type ClaimTransactionCreateOrConnectWithoutTournamentsInput = {
  create: ClaimTransactionCreateWithoutTournamentsInput;
  where: ClaimTransactionWhereUniqueInput;
};

export type ClaimTransactionCreateOrConnectWithoutUserInput = {
  create: ClaimTransactionCreateWithoutUserInput;
  where: ClaimTransactionWhereUniqueInput;
};

export type ClaimTransactionCreateWithoutTournamentsInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  type: ClaimType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
  user: UserCreateNestedOneWithoutClaim_TournamentInput;
};

export type ClaimTransactionCreateWithoutUserInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  tournaments: TournamentCreateNestedOneWithoutClaim_TransactionsInput;
  tx_hash?: InputMaybe<Scalars['String']>;
  type: ClaimType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type ClaimTransactionWhereUniqueInput = {
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};

export enum ClaimType {
  Donate = 'DONATE',
  PrizePool = 'PRIZE_POOL',
  PrizeSystem = 'PRIZE_SYSTEM',
  RefereeFee = 'REFEREE_FEE'
}

export type Config = {
  __typename?: 'Config';
  id: Scalars['ID'];
  p2e_withdraw: Scalars['Decimal'];
  tn_claim_fee: Scalars['Decimal'];
  tn_lucis_fee: Scalars['Decimal'];
  tn_referee_fee: Scalars['Decimal'];
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

export type ContractCreateManyChainInput = {
  abi?: InputMaybe<Scalars['JSON']>;
  address: Scalars['String'];
  admin?: InputMaybe<Scalars['String']>;
  admin_prv_key?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_transfered?: InputMaybe<Scalars['Int']>;
  owner?: InputMaybe<Scalars['String']>;
  type: ContractType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type ContractCreateManyChainInputEnvelope = {
  data: Array<ContractCreateManyChainInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ContractCreateNestedManyWithoutChainInput = {
  connect?: InputMaybe<Array<ContractWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ContractCreateOrConnectWithoutChainInput>>;
  create?: InputMaybe<Array<ContractCreateWithoutChainInput>>;
  createMany?: InputMaybe<ContractCreateManyChainInputEnvelope>;
};

export type ContractCreateOrConnectWithoutChainInput = {
  create: ContractCreateWithoutChainInput;
  where: ContractWhereUniqueInput;
};

export type ContractCreateWithoutChainInput = {
  abi?: InputMaybe<Scalars['JSON']>;
  address: Scalars['String'];
  admin?: InputMaybe<Scalars['String']>;
  admin_prv_key?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_transfered?: InputMaybe<Scalars['Int']>;
  owner?: InputMaybe<Scalars['String']>;
  type: ContractType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export enum ContractType {
  Donate = 'DONATE',
  LucisToken = 'LUCIS_TOKEN',
  Prize = 'PRIZE'
}

export type ContractWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export enum CostType {
  LucisPoint = 'LUCIS_POINT',
  LucisToken = 'LUCIS_TOKEN'
}

export type CreateFavorite = {
  game_uid?: InputMaybe<Array<Scalars['String']>>;
};

export type CsgoLucisMission = {
  __typename?: 'CsgoLucisMission';
  created_at: Scalars['DateTime'];
  csgo_mission: CsgoMission;
  csgo_mission_uid: Scalars['String'];
  group: Scalars['Int'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type CsgoLucisMissionCreateNestedOneWithoutCsgo_MissionInput = {
  connect?: InputMaybe<CsgoLucisMissionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CsgoLucisMissionCreateOrConnectWithoutCsgo_MissionInput>;
  create?: InputMaybe<CsgoLucisMissionCreateWithoutCsgo_MissionInput>;
};

export type CsgoLucisMissionCreateOrConnectWithoutCsgo_MissionInput = {
  create: CsgoLucisMissionCreateWithoutCsgo_MissionInput;
  where: CsgoLucisMissionWhereUniqueInput;
};

export type CsgoLucisMissionCreateWithoutCsgo_MissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  group: Scalars['Int'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type CsgoLucisMissionWhereUniqueInput = {
  csgo_mission_uid?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
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

export type CsgoMatchCreateNestedOneWithoutPlayersInput = {
  connect?: InputMaybe<CsgoMatchWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CsgoMatchCreateOrConnectWithoutPlayersInput>;
  create?: InputMaybe<CsgoMatchCreateWithoutPlayersInput>;
};

export type CsgoMatchCreateOrConnectWithoutPlayersInput = {
  create: CsgoMatchCreateWithoutPlayersInput;
  where: CsgoMatchWhereUniqueInput;
};

export type CsgoMatchCreateWithoutPlayersInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  end_at: Scalars['DateTime'];
  loser_team?: InputMaybe<Scalars['String']>;
  map?: InputMaybe<Scalars['String']>;
  match_statistic?: InputMaybe<Scalars['JSON']>;
  score?: InputMaybe<Scalars['String']>;
  uid: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
  winner_team?: InputMaybe<Scalars['String']>;
};

export type CsgoMatchWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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

export type CsgoMissionCreateNestedOneWithoutMissionInput = {
  connect?: InputMaybe<CsgoMissionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CsgoMissionCreateOrConnectWithoutMissionInput>;
  create?: InputMaybe<CsgoMissionCreateWithoutMissionInput>;
};

export type CsgoMissionCreateOrConnectWithoutMissionInput = {
  create: CsgoMissionCreateWithoutMissionInput;
  where: CsgoMissionWhereUniqueInput;
};

export type CsgoMissionCreateWithoutMissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  csgo_lucis_misison?: InputMaybe<CsgoLucisMissionCreateNestedOneWithoutCsgo_MissionInput>;
  map?: InputMaybe<Scalars['String']>;
  type: CsgoMissionType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export enum CsgoMissionType {
  Aces = 'Aces',
  Assists = 'Assists',
  AverageHeadshot = 'AverageHeadshot',
  CurrentWinStreak = 'CurrentWinStreak',
  Deaths = 'Deaths',
  Kda = 'Kda',
  Kills = 'Kills',
  Kr = 'Kr',
  LongestWinStreak = 'LongestWinStreak',
  Matches = 'Matches',
  Mvps = 'Mvps',
  QuadraKill = 'QuadraKill',
  TotalHeadshots = 'TotalHeadshots',
  Triplekill = 'Triplekill',
  Wins = 'Wins'
}

export type CsgoMissionWhereUniqueInput = {
  mission_uid?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
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
  withdrawTransactions?: Maybe<Array<WithdrawTransaction>>;
};

export type CurrencyCount = {
  __typename?: 'CurrencyCount';
  donateTransactions: Scalars['Int'];
  sponsorTransactions: Scalars['Int'];
  tournaments: Scalars['Int'];
  withdrawTransactions: Scalars['Int'];
};

export type CurrencyCreateNestedOneWithoutDonateTransactionsInput = {
  connect?: InputMaybe<CurrencyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CurrencyCreateOrConnectWithoutDonateTransactionsInput>;
  create?: InputMaybe<CurrencyCreateWithoutDonateTransactionsInput>;
};

export type CurrencyCreateNestedOneWithoutSponsorTransactionsInput = {
  connect?: InputMaybe<CurrencyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CurrencyCreateOrConnectWithoutSponsorTransactionsInput>;
  create?: InputMaybe<CurrencyCreateWithoutSponsorTransactionsInput>;
};

export type CurrencyCreateNestedOneWithoutTournamentsInput = {
  connect?: InputMaybe<CurrencyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CurrencyCreateOrConnectWithoutTournamentsInput>;
  create?: InputMaybe<CurrencyCreateWithoutTournamentsInput>;
};

export type CurrencyCreateNestedOneWithoutWithdrawTransactionsInput = {
  connect?: InputMaybe<CurrencyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CurrencyCreateOrConnectWithoutWithdrawTransactionsInput>;
  create?: InputMaybe<CurrencyCreateWithoutWithdrawTransactionsInput>;
};

export type CurrencyCreateOrConnectWithoutDonateTransactionsInput = {
  create: CurrencyCreateWithoutDonateTransactionsInput;
  where: CurrencyWhereUniqueInput;
};

export type CurrencyCreateOrConnectWithoutSponsorTransactionsInput = {
  create: CurrencyCreateWithoutSponsorTransactionsInput;
  where: CurrencyWhereUniqueInput;
};

export type CurrencyCreateOrConnectWithoutTournamentsInput = {
  create: CurrencyCreateWithoutTournamentsInput;
  where: CurrencyWhereUniqueInput;
};

export type CurrencyCreateOrConnectWithoutWithdrawTransactionsInput = {
  create: CurrencyCreateWithoutWithdrawTransactionsInput;
  where: CurrencyWhereUniqueInput;
};

export type CurrencyCreateWithoutDonateTransactionsInput = {
  address?: InputMaybe<Scalars['String']>;
  chain?: InputMaybe<ChainCreateNestedOneWithoutCurrenciesInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  decimals?: InputMaybe<Scalars['Int']>;
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutCurrencyInput>;
  symbol?: InputMaybe<Scalars['String']>;
  tournaments?: InputMaybe<TournamentCreateNestedManyWithoutCurrencyInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Float']>;
  withdrawTransactions?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutCurrencyInput>;
};

export type CurrencyCreateWithoutSponsorTransactionsInput = {
  address?: InputMaybe<Scalars['String']>;
  chain?: InputMaybe<ChainCreateNestedOneWithoutCurrenciesInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  decimals?: InputMaybe<Scalars['Int']>;
  donateTransactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutCurrencyInput>;
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  tournaments?: InputMaybe<TournamentCreateNestedManyWithoutCurrencyInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Float']>;
  withdrawTransactions?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutCurrencyInput>;
};

export type CurrencyCreateWithoutTournamentsInput = {
  address?: InputMaybe<Scalars['String']>;
  chain?: InputMaybe<ChainCreateNestedOneWithoutCurrenciesInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  decimals?: InputMaybe<Scalars['Int']>;
  donateTransactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutCurrencyInput>;
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutCurrencyInput>;
  symbol?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Float']>;
  withdrawTransactions?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutCurrencyInput>;
};

export type CurrencyCreateWithoutWithdrawTransactionsInput = {
  address?: InputMaybe<Scalars['String']>;
  chain?: InputMaybe<ChainCreateNestedOneWithoutCurrenciesInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  decimals?: InputMaybe<Scalars['Int']>;
  donateTransactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutCurrencyInput>;
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutCurrencyInput>;
  symbol?: InputMaybe<Scalars['String']>;
  tournaments?: InputMaybe<TournamentCreateNestedManyWithoutCurrencyInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Float']>;
};

export type CurrencyGql = {
  __typename?: 'CurrencyGql';
  address?: Maybe<Scalars['String']>;
  chain_symbol?: Maybe<ChainSymbol>;
  created_at: Scalars['DateTime'];
  decimals?: Maybe<Scalars['Int']>;
  donateTransactions?: Maybe<Array<DonateTransaction>>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  sponsorTransactions?: Maybe<Array<SponsorTransaction>>;
  symbol?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  usd_value?: Maybe<Scalars['Float']>;
  withdrawTransactions?: Maybe<Array<WithdrawTransaction>>;
};

export type CurrencyWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type DonateHistory = {
  __typename?: 'DonateHistory';
  amount?: Maybe<Scalars['Float']>;
  donor_avatar?: Maybe<Scalars['String']>;
  donor_display_name?: Maybe<Scalars['String']>;
  donor_id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  receiver_avatar?: Maybe<Scalars['String']>;
  receiver_display_name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  tx_hash?: Maybe<Scalars['String']>;
  type?: Maybe<DonateTransactionsType>;
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

export type DonateTransactionCreateManyCurrencyInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  from: Scalars['String'];
  message?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TransactionStatus>;
  to: Scalars['String'];
  tournament_uid: Scalars['String'];
  tx_hash: Scalars['String'];
  type: DonateTransactionsType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type DonateTransactionCreateManyCurrencyInputEnvelope = {
  data: Array<DonateTransactionCreateManyCurrencyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type DonateTransactionCreateManyTournamentsInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  from: Scalars['String'];
  message?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TransactionStatus>;
  to: Scalars['String'];
  tx_hash: Scalars['String'];
  type: DonateTransactionsType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type DonateTransactionCreateManyTournamentsInputEnvelope = {
  data: Array<DonateTransactionCreateManyTournamentsInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type DonateTransactionCreateNestedManyWithoutCurrencyInput = {
  connect?: InputMaybe<Array<DonateTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DonateTransactionCreateOrConnectWithoutCurrencyInput>>;
  create?: InputMaybe<Array<DonateTransactionCreateWithoutCurrencyInput>>;
  createMany?: InputMaybe<DonateTransactionCreateManyCurrencyInputEnvelope>;
};

export type DonateTransactionCreateNestedManyWithoutTournamentsInput = {
  connect?: InputMaybe<Array<DonateTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DonateTransactionCreateOrConnectWithoutTournamentsInput>>;
  create?: InputMaybe<Array<DonateTransactionCreateWithoutTournamentsInput>>;
  createMany?: InputMaybe<DonateTransactionCreateManyTournamentsInputEnvelope>;
};

export type DonateTransactionCreateOrConnectWithoutCurrencyInput = {
  create: DonateTransactionCreateWithoutCurrencyInput;
  where: DonateTransactionWhereUniqueInput;
};

export type DonateTransactionCreateOrConnectWithoutTournamentsInput = {
  create: DonateTransactionCreateWithoutTournamentsInput;
  where: DonateTransactionWhereUniqueInput;
};

export type DonateTransactionCreateWithoutCurrencyInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  from: Scalars['String'];
  message?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TransactionStatus>;
  to: Scalars['String'];
  tournaments: TournamentCreateNestedOneWithoutDonate_TransactionsInput;
  tx_hash: Scalars['String'];
  type: DonateTransactionsType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type DonateTransactionCreateWithoutTournamentsInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutDonateTransactionsInput;
  from: Scalars['String'];
  message?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TransactionStatus>;
  to: Scalars['String'];
  tx_hash: Scalars['String'];
  type: DonateTransactionsType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type DonateTransactionWhereUniqueInput = {
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};

export enum DonateTransactionsType {
  Player = 'PLAYER',
  Referee = 'REFEREE',
  Team = 'TEAM',
  Tournament = 'TOURNAMENT'
}

export type EarningHistory = {
  __typename?: 'EarningHistory';
  amount?: Maybe<Scalars['Float']>;
  symbol?: Maybe<Scalars['String']>;
  tournament_name?: Maybe<Scalars['String']>;
  tx_hash?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GBracketTeamInput = {
  member?: InputMaybe<Array<GBracketTeamMemberInput>>;
  team_uid?: InputMaybe<Scalars['String']>;
  tournament_password?: InputMaybe<Scalars['String']>;
  tournament_uid?: InputMaybe<Scalars['String']>;
};

export type GBracketTeamMemberInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_in_game?: InputMaybe<Scalars['String']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  prize_alloc?: InputMaybe<Scalars['Float']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

export enum GBracketType {
  All = 'ALL',
  BattleRoyale = 'BATTLE_ROYALE',
  Double = 'DOUBLE',
  RoundRobin = 'ROUND_ROBIN',
  Single = 'SINGLE',
  Swiss = 'SWISS'
}

export type GContract = {
  __typename?: 'GContract';
  abi?: Maybe<Scalars['JSON']>;
  address: Scalars['String'];
  admin?: Maybe<Scalars['String']>;
  chain: Chain;
  chain_symbol: ChainSymbol;
  created_at: Scalars['DateTime'];
  owner?: Maybe<Scalars['String']>;
  type: ContractType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GDonateTransaction = {
  amount?: InputMaybe<Scalars['Float']>;
  block?: InputMaybe<Scalars['Int']>;
  message?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TransactionStatus>;
  to: Scalars['String'];
  tournament_uid?: InputMaybe<Scalars['String']>;
  tx_hash: Scalars['String'];
  type: DonateTransactionsType;
};

export type GMember = {
  member_id?: InputMaybe<Array<Scalars['Int']>>;
  team_uid?: InputMaybe<Scalars['String']>;
};

export type GTopEarning = {
  __typename?: 'GTopEarning';
  avatar?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  total_earning?: Maybe<Scalars['Float']>;
  user_name?: Maybe<Scalars['String']>;
};

export type GTournament = {
  __typename?: 'GTournament';
  _count: TournamentCount;
  additionPrize: Scalars['Decimal'];
  annoucement?: Maybe<Array<SpotlightAnnouncement>>;
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
  is_auto_checkin: Scalars['Boolean'];
  join_fee?: Maybe<Scalars['Decimal']>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  name: Scalars['String'];
  participants: Scalars['Int'];
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
  systemSponsors?: Maybe<Array<SystemSponsor>>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  totalDonation?: Maybe<Scalars['Float']>;
  totalPrizePool?: Maybe<Scalars['Float']>;
  tournamentDeposit?: Maybe<TournamentDeposit>;
  tournament_subscribes?: Maybe<Array<TournamentSubscriber>>;
  turns?: Maybe<Scalars['Int']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type GTournamentRank = {
  __typename?: 'GTournamentRank';
  lose?: Maybe<Scalars['Int']>;
  player_team_uid?: Maybe<Scalars['String']>;
  rank: Scalars['Int'];
  round?: Maybe<Scalars['String']>;
  team_avatar?: Maybe<Scalars['String']>;
  team_name?: Maybe<Scalars['String']>;
  win?: Maybe<Scalars['Int']>;
};

export type GUser = {
  __typename?: 'GUser';
  total?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<User>>;
};

export type GUserProfile = {
  __typename?: 'GUserProfile';
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
  user_id?: Maybe<Scalars['Int']>;
  user_name?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
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

export type GameCreateNestedOneWithoutFavorite_UserInput = {
  connect?: InputMaybe<GameWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GameCreateOrConnectWithoutFavorite_UserInput>;
  create?: InputMaybe<GameCreateWithoutFavorite_UserInput>;
};

export type GameCreateNestedOneWithoutNftInput = {
  connect?: InputMaybe<GameWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GameCreateOrConnectWithoutNftInput>;
  create?: InputMaybe<GameCreateWithoutNftInput>;
};

export type GameCreateNestedOneWithoutPlatformInput = {
  connect?: InputMaybe<GameWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GameCreateOrConnectWithoutPlatformInput>;
  create?: InputMaybe<GameCreateWithoutPlatformInput>;
};

export type GameCreateNestedOneWithoutTournamentsInput = {
  connect?: InputMaybe<GameWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GameCreateOrConnectWithoutTournamentsInput>;
  create?: InputMaybe<GameCreateWithoutTournamentsInput>;
};

export type GameCreateOrConnectWithoutFavorite_UserInput = {
  create: GameCreateWithoutFavorite_UserInput;
  where: GameWhereUniqueInput;
};

export type GameCreateOrConnectWithoutNftInput = {
  create: GameCreateWithoutNftInput;
  where: GameWhereUniqueInput;
};

export type GameCreateOrConnectWithoutPlatformInput = {
  create: GameCreateWithoutPlatformInput;
  where: GameWhereUniqueInput;
};

export type GameCreateOrConnectWithoutTournamentsInput = {
  create: GameCreateWithoutTournamentsInput;
  where: GameWhereUniqueInput;
};

export type GameCreateWithoutFavorite_UserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nft?: InputMaybe<PlayerNftCreateNestedManyWithoutGameInput>;
  nft_limit?: InputMaybe<Scalars['Int']>;
  platform?: InputMaybe<GamePlatformCreateNestedManyWithoutGameInput>;
  tournaments?: InputMaybe<TournamentCreateNestedManyWithoutGameInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type GameCreateWithoutNftInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  favorite_user?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutGameInput>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nft_limit?: InputMaybe<Scalars['Int']>;
  platform?: InputMaybe<GamePlatformCreateNestedManyWithoutGameInput>;
  tournaments?: InputMaybe<TournamentCreateNestedManyWithoutGameInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type GameCreateWithoutPlatformInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  favorite_user?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutGameInput>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nft?: InputMaybe<PlayerNftCreateNestedManyWithoutGameInput>;
  nft_limit?: InputMaybe<Scalars['Int']>;
  tournaments?: InputMaybe<TournamentCreateNestedManyWithoutGameInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type GameCreateWithoutTournamentsInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  favorite_user?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutGameInput>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nft?: InputMaybe<PlayerNftCreateNestedManyWithoutGameInput>;
  nft_limit?: InputMaybe<Scalars['Int']>;
  platform?: InputMaybe<GamePlatformCreateNestedManyWithoutGameInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type GamePlatform = {
  __typename?: 'GamePlatform';
  created_at: Scalars['DateTime'];
  game: Game;
  game_uid: Scalars['String'];
  id: Scalars['ID'];
  platform: Platform;
  platform_id: Scalars['Int'];
  updated_at: Scalars['DateTime'];
};

export type GamePlatformCreateManyGameInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  platform_id: Scalars['Int'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type GamePlatformCreateManyGameInputEnvelope = {
  data: Array<GamePlatformCreateManyGameInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type GamePlatformCreateManyPlatformInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game_uid: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type GamePlatformCreateManyPlatformInputEnvelope = {
  data: Array<GamePlatformCreateManyPlatformInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type GamePlatformCreateNestedManyWithoutGameInput = {
  connect?: InputMaybe<Array<GamePlatformWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GamePlatformCreateOrConnectWithoutGameInput>>;
  create?: InputMaybe<Array<GamePlatformCreateWithoutGameInput>>;
  createMany?: InputMaybe<GamePlatformCreateManyGameInputEnvelope>;
};

export type GamePlatformCreateNestedManyWithoutPlatformInput = {
  connect?: InputMaybe<Array<GamePlatformWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GamePlatformCreateOrConnectWithoutPlatformInput>>;
  create?: InputMaybe<Array<GamePlatformCreateWithoutPlatformInput>>;
  createMany?: InputMaybe<GamePlatformCreateManyPlatformInputEnvelope>;
};

export type GamePlatformCreateOrConnectWithoutGameInput = {
  create: GamePlatformCreateWithoutGameInput;
  where: GamePlatformWhereUniqueInput;
};

export type GamePlatformCreateOrConnectWithoutPlatformInput = {
  create: GamePlatformCreateWithoutPlatformInput;
  where: GamePlatformWhereUniqueInput;
};

export type GamePlatformCreateWithoutGameInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  platform: PlatformCreateNestedOneWithoutGameInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type GamePlatformCreateWithoutPlatformInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game: GameCreateNestedOneWithoutPlatformInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type GamePlatformWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type GameWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type GetRefereeInput = {
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
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

export type LolLucisMissionCreateNestedOneWithoutLol_MissionInput = {
  connect?: InputMaybe<LolLucisMissionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LolLucisMissionCreateOrConnectWithoutLol_MissionInput>;
  create?: InputMaybe<LolLucisMissionCreateWithoutLol_MissionInput>;
};

export type LolLucisMissionCreateOrConnectWithoutLol_MissionInput = {
  create: LolLucisMissionCreateWithoutLol_MissionInput;
  where: LolLucisMissionWhereUniqueInput;
};

export type LolLucisMissionCreateWithoutLol_MissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  group: Scalars['Int'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type LolLucisMissionWhereUniqueInput = {
  lol_mission_uid?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
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
  type: LolRegime;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type LolMatchCount = {
  __typename?: 'LolMatchCount';
  players: Scalars['Int'];
};

export type LolMatchCreateNestedOneWithoutPlayersInput = {
  connect?: InputMaybe<LolMatchWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LolMatchCreateOrConnectWithoutPlayersInput>;
  create?: InputMaybe<LolMatchCreateWithoutPlayersInput>;
};

export type LolMatchCreateOrConnectWithoutPlayersInput = {
  create: LolMatchCreateWithoutPlayersInput;
  where: LolMatchWhereUniqueInput;
};

export type LolMatchCreateWithoutPlayersInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  end_at: Scalars['DateTime'];
  map?: InputMaybe<Scalars['String']>;
  match_statistic?: InputMaybe<Scalars['JSON']>;
  region?: InputMaybe<Scalars['String']>;
  type: LolRegime;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type LolMatchWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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

export type LolMissionCreateNestedOneWithoutMissionInput = {
  connect?: InputMaybe<LolMissionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LolMissionCreateOrConnectWithoutMissionInput>;
  create?: InputMaybe<LolMissionCreateWithoutMissionInput>;
};

export type LolMissionCreateOrConnectWithoutMissionInput = {
  create: LolMissionCreateWithoutMissionInput;
  where: LolMissionWhereUniqueInput;
};

export type LolMissionCreateWithoutMissionInput = {
  champion?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  lane?: InputMaybe<LolLane>;
  lucis_mission?: InputMaybe<LolLucisMissionCreateNestedOneWithoutLol_MissionInput>;
  number_match?: InputMaybe<Scalars['Int']>;
  regime?: InputMaybe<LolRegime>;
  type: LolMissionType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export enum LolMissionType {
  Assist = 'Assist',
  Baron = 'Baron',
  DamageToChampion = 'DamageToChampion',
  DestroyTurret = 'DestroyTurret',
  DoubleKill = 'DoubleKill',
  DragonElemental = 'DragonElemental',
  DragonThousandYears = 'DragonThousandYears',
  FirstBlood = 'FirstBlood',
  FirstBloodTeam = 'FirstBloodTeam',
  Gold = 'Gold',
  Kill = 'Kill',
  MagicDameToChampion = 'MagicDameToChampion',
  Match = 'Match',
  MinionKill = 'MinionKill',
  PentalKill = 'PentalKill',
  PhysicalDamageToChampion = 'PhysicalDamageToChampion',
  QuadraKill = 'QuadraKill',
  TripleKill = 'TripleKill',
  WardKill = 'WardKill',
  WardPlace = 'WardPlace',
  Win = 'Win',
  WinStreak = 'WinStreak'
}

export type LolMissionWhereUniqueInput = {
  mission_uid?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
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
  mission_status: MissionStatus;
  player_mission?: Maybe<Array<PlayerMission>>;
  title?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_daily_mission?: Maybe<Array<UserDailyMission>>;
};

export type MissionCount = {
  __typename?: 'MissionCount';
  player_mission: Scalars['Int'];
  user_daily_mission: Scalars['Int'];
};

export type MissionCreateNestedOneWithoutPlayer_MissionInput = {
  connect?: InputMaybe<MissionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MissionCreateOrConnectWithoutPlayer_MissionInput>;
  create?: InputMaybe<MissionCreateWithoutPlayer_MissionInput>;
};

export type MissionCreateNestedOneWithoutUser_Daily_MissionInput = {
  connect?: InputMaybe<MissionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MissionCreateOrConnectWithoutUser_Daily_MissionInput>;
  create?: InputMaybe<MissionCreateWithoutUser_Daily_MissionInput>;
};

export type MissionCreateOrConnectWithoutPlayer_MissionInput = {
  create: MissionCreateWithoutPlayer_MissionInput;
  where: MissionWhereUniqueInput;
};

export type MissionCreateOrConnectWithoutUser_Daily_MissionInput = {
  create: MissionCreateWithoutUser_Daily_MissionInput;
  where: MissionWhereUniqueInput;
};

export type MissionCreateWithoutPlayer_MissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  csgo_mission?: InputMaybe<CsgoMissionCreateNestedOneWithoutMissionInput>;
  game_uid: Scalars['String'];
  goal?: InputMaybe<Scalars['Decimal']>;
  img?: InputMaybe<Scalars['String']>;
  is_daily_mission?: InputMaybe<Scalars['Boolean']>;
  level: MissionLevelCreateNestedOneWithoutMissionInput;
  lol_mission?: InputMaybe<LolMissionCreateNestedOneWithoutMissionInput>;
  mission_status?: InputMaybe<MissionStatus>;
  title?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_daily_mission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutMissionInput>;
};

export type MissionCreateWithoutUser_Daily_MissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  csgo_mission?: InputMaybe<CsgoMissionCreateNestedOneWithoutMissionInput>;
  game_uid: Scalars['String'];
  goal?: InputMaybe<Scalars['Decimal']>;
  img?: InputMaybe<Scalars['String']>;
  is_daily_mission?: InputMaybe<Scalars['Boolean']>;
  level: MissionLevelCreateNestedOneWithoutMissionInput;
  lol_mission?: InputMaybe<LolMissionCreateNestedOneWithoutMissionInput>;
  mission_status?: InputMaybe<MissionStatus>;
  player_mission?: InputMaybe<PlayerMissionCreateNestedManyWithoutMissionInput>;
  title?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
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

export type MissionHistoryCreateManyPlayer_MissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type MissionHistoryCreateManyPlayer_MissionInputEnvelope = {
  data: Array<MissionHistoryCreateManyPlayer_MissionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MissionHistoryCreateManyUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  player_mission_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type MissionHistoryCreateManyUserInputEnvelope = {
  data: Array<MissionHistoryCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MissionHistoryCreateNestedManyWithoutPlayer_MissionInput = {
  connect?: InputMaybe<Array<MissionHistoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MissionHistoryCreateOrConnectWithoutPlayer_MissionInput>>;
  create?: InputMaybe<Array<MissionHistoryCreateWithoutPlayer_MissionInput>>;
  createMany?: InputMaybe<MissionHistoryCreateManyPlayer_MissionInputEnvelope>;
};

export type MissionHistoryCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<MissionHistoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MissionHistoryCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<MissionHistoryCreateWithoutUserInput>>;
  createMany?: InputMaybe<MissionHistoryCreateManyUserInputEnvelope>;
};

export type MissionHistoryCreateOrConnectWithoutPlayer_MissionInput = {
  create: MissionHistoryCreateWithoutPlayer_MissionInput;
  where: MissionHistoryWhereUniqueInput;
};

export type MissionHistoryCreateOrConnectWithoutUserInput = {
  create: MissionHistoryCreateWithoutUserInput;
  where: MissionHistoryWhereUniqueInput;
};

export type MissionHistoryCreateWithoutPlayer_MissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutDaily_HistoryInput;
};

export type MissionHistoryCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  player_mission: PlayerMissionCreateNestedOneWithoutHistoryInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type MissionHistoryWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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

export type MissionLevelCreateNestedOneWithoutMissionInput = {
  connect?: InputMaybe<MissionLevelWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MissionLevelCreateOrConnectWithoutMissionInput>;
  create?: InputMaybe<MissionLevelCreateWithoutMissionInput>;
};

export type MissionLevelCreateOrConnectWithoutMissionInput = {
  create: MissionLevelCreateWithoutMissionInput;
  where: MissionLevelWhereUniqueInput;
};

export type MissionLevelCreateWithoutMissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game_uid?: InputMaybe<Scalars['String']>;
  is_lucis_mission?: InputMaybe<Scalars['Boolean']>;
  level: Scalars['Int'];
  lucis_point?: InputMaybe<Scalars['Int']>;
  lucis_token?: InputMaybe<Scalars['Decimal']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type MissionLevelWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export enum MissionStatus {
  Finish = 'FINISH',
  Ongoing = 'ONGOING',
  Upcoming = 'UPCOMING'
}

export type MissionWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavoriteGame?: Maybe<Scalars['Boolean']>;
  addMember?: Maybe<Scalars['Boolean']>;
  becomeOurSponsor?: Maybe<Scalars['Boolean']>;
  changePassword?: Maybe<Scalars['Boolean']>;
  checkInTournament?: Maybe<Scalars['Boolean']>;
  claimDonation?: Maybe<Scalars['Boolean']>;
  claimPrizePool?: Maybe<Scalars['Boolean']>;
  claimPrizeSystem?: Maybe<Scalars['Boolean']>;
  claimRefereeFee?: Maybe<Scalars['Boolean']>;
  confirmResult?: Maybe<Scalars['Boolean']>;
  createTeam?: Maybe<Scalars['Boolean']>;
  createTournament?: Maybe<TournamentGql>;
  deleteAllNotification?: Maybe<Scalars['Boolean']>;
  deleteFavoriteGame?: Maybe<Scalars['Boolean']>;
  deleteMember?: Maybe<Scalars['Boolean']>;
  deleteNotification?: Maybe<Scalars['Boolean']>;
  deleteTeam?: Maybe<Scalars['Boolean']>;
  /** Host deposit into pool when create tournament */
  depositTournament?: Maybe<Scalars['String']>;
  donate?: Maybe<Scalars['Boolean']>;
  editTeam?: Maybe<Scalars['Boolean']>;
  /** Forgot password */
  forgotPassword: Scalars['Boolean'];
  /** Generate nonce for user login */
  generateNonce: Scalars['String'];
  joinTournament?: Maybe<Scalars['Boolean']>;
  leaveTeam?: Maybe<Scalars['Boolean']>;
  leaveTournament?: Maybe<Scalars['Boolean']>;
  /** Login with username and password */
  login: AuthGraphql;
  /** Facebook login */
  loginFacebook: AuthGraphql;
  /** Google login */
  loginGoogle: AuthGraphql;
  reactToTournament?: Maybe<Scalars['Boolean']>;
  /**
   *
   *     Reset password:
   *     - Error code:
   *     + TOKEN_INVALID:
   *     + TOKEN_EXPIRED:
   *     + NEW_PASS_INVALID: not strong password
   *     + BAD_REQUEST: User not found
   *     + NEW_PASS_SAME_OLD_PASS:
   *
   */
  resetPassword: Scalars['Boolean'];
  seenNotification?: Maybe<Scalars['Boolean']>;
  subscribeToTournament?: Maybe<Scalars['Boolean']>;
  /**
   *
   *     Arrangemetn tournament
   *     Error:
   *     + BAD_REQUEST: Caller not owner
   *     + CAN_NOT_UPDATE_NOW: can not update ongoing bracket
   *     + PLAY_TEAM_NOT_EXIST
   *     + PLAY_TEAM_JOINED_OTHER_MATCH: can not create new when team joined other match
   *     + MATCH_NOT_FOUND: matchUid not valid
   *
   */
  teamArrangement?: Maybe<Scalars['String']>;
  unsubscribeToTournament?: Maybe<Scalars['Boolean']>;
  /** Only referee can update match result */
  updateMatchResult?: Maybe<Scalars['String']>;
  updateProfile?: Maybe<UserProfile>;
};


export type MutationAddFavoriteGameArgs = {
  input: CreateFavorite;
};


export type MutationAddMemberArgs = {
  input: GMember;
};


export type MutationBecomeOurSponsorArgs = {
  data: SponsorCreateInputGql;
};


export type MutationChangePasswordArgs = {
  newPass: Scalars['String'];
  oldPass: Scalars['String'];
};


export type MutationCheckInTournamentArgs = {
  tournament_uid: Scalars['String'];
};


export type MutationClaimDonationArgs = {
  address: Scalars['String'];
  tournament_uid: Scalars['String'];
};


export type MutationClaimPrizePoolArgs = {
  address: Scalars['String'];
  tournament_uid: Scalars['String'];
};


export type MutationClaimPrizeSystemArgs = {
  address: Scalars['String'];
  tournament_uid: Scalars['String'];
};


export type MutationClaimRefereeFeeArgs = {
  address: Scalars['String'];
  tournament_uid: Scalars['String'];
};


export type MutationConfirmResultArgs = {
  tournament_uid: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  input: TeamInput;
};


export type MutationCreateTournamentArgs = {
  input: TournamentCreateInputGql;
};


export type MutationDeleteFavoriteGameArgs = {
  game_uid: Scalars['String'];
};


export type MutationDeleteMemberArgs = {
  member_id: Scalars['Float'];
  team_uid: Scalars['String'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteTeamArgs = {
  team_uid: Scalars['String'];
};


export type MutationDepositTournamentArgs = {
  block?: InputMaybe<Scalars['Int']>;
  tournamentUid: Scalars['String'];
  txHash: Scalars['String'];
};


export type MutationDonateArgs = {
  input: GDonateTransaction;
};


export type MutationEditTeamArgs = {
  input: TeamInput;
  team_uid: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  username: Scalars['String'];
};


export type MutationGenerateNonceArgs = {
  address: Scalars['String'];
};


export type MutationJoinTournamentArgs = {
  data: GBracketTeamInput;
};


export type MutationLeaveTeamArgs = {
  team_uid: Scalars['String'];
};


export type MutationLeaveTournamentArgs = {
  tournament_uid: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginFacebookArgs = {
  accessToken: Scalars['String'];
  code?: InputMaybe<Scalars['String']>;
};


export type MutationLoginGoogleArgs = {
  code?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};


export type MutationReactToTournamentArgs = {
  data: ReactionInput;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSeenNotificationArgs = {
  id: Scalars['Float'];
};


export type MutationSubscribeToTournamentArgs = {
  tournament_uid: Scalars['String'];
};


export type MutationTeamArrangementArgs = {
  firstPlayTeamUid: Scalars['String'];
  matchUid?: InputMaybe<Scalars['String']>;
  roundUid: Scalars['String'];
  secondPlayTeamUid: Scalars['String'];
};


export type MutationUnsubscribeToTournamentArgs = {
  tournament_uid: Scalars['String'];
};


export type MutationUpdateMatchResultArgs = {
  input: BracketMatchUpdateInputGql;
};


export type MutationUpdateProfileArgs = {
  data: ProfileUpdateInput;
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

export type NftCreateManyUserInput = {
  contract?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  img?: InputMaybe<Scalars['String']>;
  mission_value?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  tier?: InputMaybe<Scalars['Int']>;
  token_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<NftType>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type NftCreateManyUserInputEnvelope = {
  data: Array<NftCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type NftCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<NftWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NftCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<NftCreateWithoutUserInput>>;
  createMany?: InputMaybe<NftCreateManyUserInputEnvelope>;
};

export type NftCreateNestedOneWithoutPlay_NftInput = {
  connect?: InputMaybe<NftWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NftCreateOrConnectWithoutPlay_NftInput>;
  create?: InputMaybe<NftCreateWithoutPlay_NftInput>;
};

export type NftCreateNestedOneWithoutStaked_NftInput = {
  connect?: InputMaybe<NftWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NftCreateOrConnectWithoutStaked_NftInput>;
  create?: InputMaybe<NftCreateWithoutStaked_NftInput>;
};

export type NftCreateOrConnectWithoutPlay_NftInput = {
  create: NftCreateWithoutPlay_NftInput;
  where: NftWhereUniqueInput;
};

export type NftCreateOrConnectWithoutStaked_NftInput = {
  create: NftCreateWithoutStaked_NftInput;
  where: NftWhereUniqueInput;
};

export type NftCreateOrConnectWithoutUserInput = {
  create: NftCreateWithoutUserInput;
  where: NftWhereUniqueInput;
};

export type NftCreateWithoutPlay_NftInput = {
  contract?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  img?: InputMaybe<Scalars['String']>;
  mission_value?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  staked_nft?: InputMaybe<StakedCreateNestedOneWithoutNftInput>;
  tier?: InputMaybe<Scalars['Int']>;
  token_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<NftType>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutNftsInput;
};

export type NftCreateWithoutStaked_NftInput = {
  contract?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  img?: InputMaybe<Scalars['String']>;
  mission_value?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  play_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutNftInput>;
  tier?: InputMaybe<Scalars['Int']>;
  token_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<NftType>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutNftsInput;
};

export type NftCreateWithoutUserInput = {
  contract?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  img?: InputMaybe<Scalars['String']>;
  mission_value?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  play_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutNftInput>;
  staked_nft?: InputMaybe<StakedCreateNestedOneWithoutNftInput>;
  tier?: InputMaybe<Scalars['Int']>;
  token_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<NftType>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export enum NftType {
  Equip = 'EQUIP',
  Staked = 'STAKED'
}

export type NftWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

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

export type NotificationCreateManyUserInput = {
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  is_seen?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  tournament_uid?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type NotificationCreateManyUserInputEnvelope = {
  data: Array<NotificationCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type NotificationCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<NotificationCreateWithoutUserInput>>;
  createMany?: InputMaybe<NotificationCreateManyUserInputEnvelope>;
};

export type NotificationCreateOrConnectWithoutUserInput = {
  create: NotificationCreateWithoutUserInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationCreateWithoutUserInput = {
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  image?: InputMaybe<Scalars['String']>;
  is_seen?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  tournament_uid?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type NotificationWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type Participant = {
  __typename?: 'Participant';
  participant?: Maybe<Scalars['Int']>;
  playTeamMembers?: Maybe<Array<PlayTeamMember>>;
  team?: Maybe<Array<Team>>;
  tournament_uid?: Maybe<Scalars['String']>;
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

export type PlatformAccountCreateManyPlatformInput = {
  access_token?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  country_code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_token?: InputMaybe<Scalars['String']>;
  nick_name?: InputMaybe<Scalars['String']>;
  player_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type PlatformAccountCreateManyPlatformInputEnvelope = {
  data: Array<PlatformAccountCreateManyPlatformInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlatformAccountCreateManyUserInput = {
  access_token?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  country_code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_token?: InputMaybe<Scalars['String']>;
  nick_name?: InputMaybe<Scalars['String']>;
  platform_id: Scalars['Int'];
  player_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlatformAccountCreateManyUserInputEnvelope = {
  data: Array<PlatformAccountCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlatformAccountCreateNestedManyWithoutPlatformInput = {
  connect?: InputMaybe<Array<PlatformAccountWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlatformAccountCreateOrConnectWithoutPlatformInput>>;
  create?: InputMaybe<Array<PlatformAccountCreateWithoutPlatformInput>>;
  createMany?: InputMaybe<PlatformAccountCreateManyPlatformInputEnvelope>;
};

export type PlatformAccountCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<PlatformAccountWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlatformAccountCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PlatformAccountCreateWithoutUserInput>>;
  createMany?: InputMaybe<PlatformAccountCreateManyUserInputEnvelope>;
};

export type PlatformAccountCreateNestedOneWithoutPlayer_GameInput = {
  connect?: InputMaybe<PlatformAccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PlatformAccountCreateOrConnectWithoutPlayer_GameInput>;
  create?: InputMaybe<PlatformAccountCreateWithoutPlayer_GameInput>;
};

export type PlatformAccountCreateOrConnectWithoutPlatformInput = {
  create: PlatformAccountCreateWithoutPlatformInput;
  where: PlatformAccountWhereUniqueInput;
};

export type PlatformAccountCreateOrConnectWithoutPlayer_GameInput = {
  create: PlatformAccountCreateWithoutPlayer_GameInput;
  where: PlatformAccountWhereUniqueInput;
};

export type PlatformAccountCreateOrConnectWithoutUserInput = {
  create: PlatformAccountCreateWithoutUserInput;
  where: PlatformAccountWhereUniqueInput;
};

export type PlatformAccountCreateWithoutPlatformInput = {
  access_token?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  country_code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_token?: InputMaybe<Scalars['String']>;
  nick_name?: InputMaybe<Scalars['String']>;
  player_game?: InputMaybe<PlayerGameCreateNestedManyWithoutPlatform_AccountInput>;
  player_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPlatform_AccountInput;
};

export type PlatformAccountCreateWithoutPlayer_GameInput = {
  access_token?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  country_code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_token?: InputMaybe<Scalars['String']>;
  nick_name?: InputMaybe<Scalars['String']>;
  platform: PlatformCreateNestedOneWithoutAccountsInput;
  player_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPlatform_AccountInput;
};

export type PlatformAccountCreateWithoutUserInput = {
  access_token?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  country_code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_token?: InputMaybe<Scalars['String']>;
  nick_name?: InputMaybe<Scalars['String']>;
  platform: PlatformCreateNestedOneWithoutAccountsInput;
  player_game?: InputMaybe<PlayerGameCreateNestedManyWithoutPlatform_AccountInput>;
  player_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlatformAccountWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type PlatformCount = {
  __typename?: 'PlatformCount';
  accounts: Scalars['Int'];
  game: Scalars['Int'];
};

export type PlatformCreateNestedOneWithoutAccountsInput = {
  connect?: InputMaybe<PlatformWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PlatformCreateOrConnectWithoutAccountsInput>;
  create?: InputMaybe<PlatformCreateWithoutAccountsInput>;
};

export type PlatformCreateNestedOneWithoutGameInput = {
  connect?: InputMaybe<PlatformWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PlatformCreateOrConnectWithoutGameInput>;
  create?: InputMaybe<PlatformCreateWithoutGameInput>;
};

export type PlatformCreateOrConnectWithoutAccountsInput = {
  create: PlatformCreateWithoutAccountsInput;
  where: PlatformWhereUniqueInput;
};

export type PlatformCreateOrConnectWithoutGameInput = {
  create: PlatformCreateWithoutGameInput;
  where: PlatformWhereUniqueInput;
};

export type PlatformCreateWithoutAccountsInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game?: InputMaybe<GamePlatformCreateNestedManyWithoutPlatformInput>;
  name: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlatformCreateWithoutGameInput = {
  accounts?: InputMaybe<PlatformAccountCreateNestedManyWithoutPlatformInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlatformWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
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

export type PlayTeamCreateManyTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_checkin?: InputMaybe<Scalars['Boolean']>;
  tournament_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayTeamCreateManyTeamInputEnvelope = {
  data: Array<PlayTeamCreateManyTeamInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlayTeamCreateManyTournamentInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_checkin?: InputMaybe<Scalars['Boolean']>;
  team_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayTeamCreateManyTournamentInputEnvelope = {
  data: Array<PlayTeamCreateManyTournamentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlayTeamCreateNestedManyWithoutTeamInput = {
  connect?: InputMaybe<Array<PlayTeamWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlayTeamCreateOrConnectWithoutTeamInput>>;
  create?: InputMaybe<Array<PlayTeamCreateWithoutTeamInput>>;
  createMany?: InputMaybe<PlayTeamCreateManyTeamInputEnvelope>;
};

export type PlayTeamCreateNestedManyWithoutTournamentInput = {
  connect?: InputMaybe<Array<PlayTeamWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlayTeamCreateOrConnectWithoutTournamentInput>>;
  create?: InputMaybe<Array<PlayTeamCreateWithoutTournamentInput>>;
  createMany?: InputMaybe<PlayTeamCreateManyTournamentInputEnvelope>;
};

export type PlayTeamCreateNestedOneWithoutPlayTeamMembersInput = {
  connect?: InputMaybe<PlayTeamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PlayTeamCreateOrConnectWithoutPlayTeamMembersInput>;
  create?: InputMaybe<PlayTeamCreateWithoutPlayTeamMembersInput>;
};

export type PlayTeamCreateOrConnectWithoutPlayTeamMembersInput = {
  create: PlayTeamCreateWithoutPlayTeamMembersInput;
  where: PlayTeamWhereUniqueInput;
};

export type PlayTeamCreateOrConnectWithoutTeamInput = {
  create: PlayTeamCreateWithoutTeamInput;
  where: PlayTeamWhereUniqueInput;
};

export type PlayTeamCreateOrConnectWithoutTournamentInput = {
  create: PlayTeamCreateWithoutTournamentInput;
  where: PlayTeamWhereUniqueInput;
};

export type PlayTeamCreateWithoutPlayTeamMembersInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_checkin?: InputMaybe<Scalars['Boolean']>;
  team: TeamCreateNestedOneWithoutPlayTeamsInput;
  tournament: TournamentCreateNestedOneWithoutPlayTeamsInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayTeamCreateWithoutTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_checkin?: InputMaybe<Scalars['Boolean']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutPlayTeamInput>;
  tournament: TournamentCreateNestedOneWithoutPlayTeamsInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayTeamCreateWithoutTournamentInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_checkin?: InputMaybe<Scalars['Boolean']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutPlayTeamInput>;
  team: TeamCreateNestedOneWithoutPlayTeamsInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayTeamGql = {
  __typename?: 'PlayTeamGql';
  created_at: Scalars['DateTime'];
  is_checkin?: Maybe<Scalars['Boolean']>;
  playTeamMembers?: Maybe<Array<PlayTeamMemberGql>>;
  team: Team;
  team_uid: Scalars['String'];
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
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

export type PlayTeamMemberCreateManyPlayTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_in_game?: InputMaybe<Scalars['String']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  prize_alloc: Scalars['Decimal'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type PlayTeamMemberCreateManyPlayTeamInputEnvelope = {
  data: Array<PlayTeamMemberCreateManyPlayTeamInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlayTeamMemberCreateManyUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_in_game?: InputMaybe<Scalars['String']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  play_team_uid: Scalars['String'];
  prize_alloc: Scalars['Decimal'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayTeamMemberCreateManyUserInputEnvelope = {
  data: Array<PlayTeamMemberCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlayTeamMemberCreateNestedManyWithoutPlayTeamInput = {
  connect?: InputMaybe<Array<PlayTeamMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlayTeamMemberCreateOrConnectWithoutPlayTeamInput>>;
  create?: InputMaybe<Array<PlayTeamMemberCreateWithoutPlayTeamInput>>;
  createMany?: InputMaybe<PlayTeamMemberCreateManyPlayTeamInputEnvelope>;
};

export type PlayTeamMemberCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<PlayTeamMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlayTeamMemberCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PlayTeamMemberCreateWithoutUserInput>>;
  createMany?: InputMaybe<PlayTeamMemberCreateManyUserInputEnvelope>;
};

export type PlayTeamMemberCreateOrConnectWithoutPlayTeamInput = {
  create: PlayTeamMemberCreateWithoutPlayTeamInput;
  where: PlayTeamMemberWhereUniqueInput;
};

export type PlayTeamMemberCreateOrConnectWithoutUserInput = {
  create: PlayTeamMemberCreateWithoutUserInput;
  where: PlayTeamMemberWhereUniqueInput;
};

export type PlayTeamMemberCreateWithoutPlayTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_in_game?: InputMaybe<Scalars['String']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  prize_alloc: Scalars['Decimal'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPlayTeamMembersInput;
};

export type PlayTeamMemberCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_in_game?: InputMaybe<Scalars['String']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  playTeam: PlayTeamCreateNestedOneWithoutPlayTeamMembersInput;
  prize_alloc: Scalars['Decimal'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayTeamMemberGql = {
  __typename?: 'PlayTeamMemberGql';
  created_at: Scalars['DateTime'];
  id_in_game?: Maybe<Scalars['String']>;
  is_leader?: Maybe<Scalars['Boolean']>;
  play_team_uid: Scalars['String'];
  prize_alloc: Scalars['Decimal'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type PlayTeamMemberWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type PlayTeamWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type Player = {
  is_leader?: InputMaybe<Scalars['Boolean']>;
  user_id?: InputMaybe<Scalars['Int']>;
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

export type PlayerCsgoMatchCreateManyPlayerInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  is_win?: InputMaybe<Scalars['Boolean']>;
  lucis_point?: InputMaybe<Scalars['Int']>;
  match_uid: Scalars['String'];
  player_statistic?: InputMaybe<Scalars['JSON']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerCsgoMatchCreateManyPlayerInputEnvelope = {
  data: Array<PlayerCsgoMatchCreateManyPlayerInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlayerCsgoMatchCreateNestedManyWithoutPlayerInput = {
  connect?: InputMaybe<Array<PlayerCsgoMatchWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlayerCsgoMatchCreateOrConnectWithoutPlayerInput>>;
  create?: InputMaybe<Array<PlayerCsgoMatchCreateWithoutPlayerInput>>;
  createMany?: InputMaybe<PlayerCsgoMatchCreateManyPlayerInputEnvelope>;
};

export type PlayerCsgoMatchCreateOrConnectWithoutPlayerInput = {
  create: PlayerCsgoMatchCreateWithoutPlayerInput;
  where: PlayerCsgoMatchWhereUniqueInput;
};

export type PlayerCsgoMatchCreateWithoutPlayerInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_win?: InputMaybe<Scalars['Boolean']>;
  lucis_point?: InputMaybe<Scalars['Int']>;
  match: CsgoMatchCreateNestedOneWithoutPlayersInput;
  player_statistic?: InputMaybe<Scalars['JSON']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerCsgoMatchPlayer_MatchCompoundUniqueInput = {
  match_uid: Scalars['String'];
  player_game_uid: Scalars['String'];
};

export type PlayerCsgoMatchWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  player_match?: InputMaybe<PlayerCsgoMatchPlayer_MatchCompoundUniqueInput>;
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

export type PlayerGameCreateManyPlatform_AccountInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game_uid: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Scalars['Int']>;
  puuid?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerGameCreateManyPlatform_AccountInputEnvelope = {
  data: Array<PlayerGameCreateManyPlatform_AccountInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlayerGameCreateNestedManyWithoutPlatform_AccountInput = {
  connect?: InputMaybe<Array<PlayerGameWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlayerGameCreateOrConnectWithoutPlatform_AccountInput>>;
  create?: InputMaybe<Array<PlayerGameCreateWithoutPlatform_AccountInput>>;
  createMany?: InputMaybe<PlayerGameCreateManyPlatform_AccountInputEnvelope>;
};

export type PlayerGameCreateNestedOneWithoutPlayer_MissionInput = {
  connect?: InputMaybe<PlayerGameWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PlayerGameCreateOrConnectWithoutPlayer_MissionInput>;
  create?: InputMaybe<PlayerGameCreateWithoutPlayer_MissionInput>;
};

export type PlayerGameCreateOrConnectWithoutPlatform_AccountInput = {
  create: PlayerGameCreateWithoutPlatform_AccountInput;
  where: PlayerGameWhereUniqueInput;
};

export type PlayerGameCreateOrConnectWithoutPlayer_MissionInput = {
  create: PlayerGameCreateWithoutPlayer_MissionInput;
  where: PlayerGameWhereUniqueInput;
};

export type PlayerGameCreateWithoutPlatform_AccountInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  csgo_matches?: InputMaybe<PlayerCsgoMatchCreateNestedManyWithoutPlayerInput>;
  game_uid: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Scalars['Int']>;
  lol_matches?: InputMaybe<PlayerLolMatchCreateNestedManyWithoutPlayerInput>;
  player_mission?: InputMaybe<PlayerMissionCreateNestedManyWithoutPlayer_GameInput>;
  puuid?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerGameCreateWithoutPlayer_MissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  csgo_matches?: InputMaybe<PlayerCsgoMatchCreateNestedManyWithoutPlayerInput>;
  game_uid: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Scalars['Int']>;
  lol_matches?: InputMaybe<PlayerLolMatchCreateNestedManyWithoutPlayerInput>;
  platform_account: PlatformAccountCreateNestedOneWithoutPlayer_GameInput;
  puuid?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerGameWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type PlayerLolMatch = {
  __typename?: 'PlayerLolMatch';
  aces?: Maybe<Scalars['Int']>;
  assist?: Maybe<Scalars['Int']>;
  champion_id: Scalars['Int'];
  created_at: Scalars['DateTime'];
  damage_dealt?: Maybe<Scalars['Int']>;
  damage_taken?: Maybe<Scalars['Int']>;
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

export type PlayerLolMatchCreateManyPlayerInput = {
  aces?: InputMaybe<Scalars['Int']>;
  assist?: InputMaybe<Scalars['Int']>;
  champion_id: Scalars['Int'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  damage_dealt?: InputMaybe<Scalars['Int']>;
  damage_taken?: InputMaybe<Scalars['Int']>;
  double_kill?: InputMaybe<Scalars['Int']>;
  eye_killed?: InputMaybe<Scalars['Int']>;
  eye_placed?: InputMaybe<Scalars['Int']>;
  gold_earned?: InputMaybe<Scalars['Int']>;
  is_most_assist?: InputMaybe<Scalars['Boolean']>;
  is_most_damage_dealt?: InputMaybe<Scalars['Boolean']>;
  is_most_damage_taken?: InputMaybe<Scalars['Boolean']>;
  is_most_eye_killed?: InputMaybe<Scalars['Boolean']>;
  is_most_eye_placed?: InputMaybe<Scalars['Boolean']>;
  is_most_gold_earned?: InputMaybe<Scalars['Boolean']>;
  is_most_minion_killed?: InputMaybe<Scalars['Boolean']>;
  is_mvp?: InputMaybe<Scalars['Boolean']>;
  is_win?: InputMaybe<Scalars['Boolean']>;
  kill?: InputMaybe<Scalars['Int']>;
  lane?: InputMaybe<LolLane>;
  match_uid: Scalars['String'];
  minion_killed?: InputMaybe<Scalars['Int']>;
  most_kill?: InputMaybe<Scalars['Boolean']>;
  pental_kill?: InputMaybe<Scalars['Int']>;
  player_statistic?: InputMaybe<Scalars['JSON']>;
  point?: InputMaybe<Scalars['Int']>;
  quadra_kill?: InputMaybe<Scalars['Int']>;
  triple_kill?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerLolMatchCreateManyPlayerInputEnvelope = {
  data: Array<PlayerLolMatchCreateManyPlayerInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlayerLolMatchCreateNestedManyWithoutPlayerInput = {
  connect?: InputMaybe<Array<PlayerLolMatchWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlayerLolMatchCreateOrConnectWithoutPlayerInput>>;
  create?: InputMaybe<Array<PlayerLolMatchCreateWithoutPlayerInput>>;
  createMany?: InputMaybe<PlayerLolMatchCreateManyPlayerInputEnvelope>;
};

export type PlayerLolMatchCreateOrConnectWithoutPlayerInput = {
  create: PlayerLolMatchCreateWithoutPlayerInput;
  where: PlayerLolMatchWhereUniqueInput;
};

export type PlayerLolMatchCreateWithoutPlayerInput = {
  aces?: InputMaybe<Scalars['Int']>;
  assist?: InputMaybe<Scalars['Int']>;
  champion_id: Scalars['Int'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  damage_dealt?: InputMaybe<Scalars['Int']>;
  damage_taken?: InputMaybe<Scalars['Int']>;
  double_kill?: InputMaybe<Scalars['Int']>;
  eye_killed?: InputMaybe<Scalars['Int']>;
  eye_placed?: InputMaybe<Scalars['Int']>;
  gold_earned?: InputMaybe<Scalars['Int']>;
  is_most_assist?: InputMaybe<Scalars['Boolean']>;
  is_most_damage_dealt?: InputMaybe<Scalars['Boolean']>;
  is_most_damage_taken?: InputMaybe<Scalars['Boolean']>;
  is_most_eye_killed?: InputMaybe<Scalars['Boolean']>;
  is_most_eye_placed?: InputMaybe<Scalars['Boolean']>;
  is_most_gold_earned?: InputMaybe<Scalars['Boolean']>;
  is_most_minion_killed?: InputMaybe<Scalars['Boolean']>;
  is_mvp?: InputMaybe<Scalars['Boolean']>;
  is_win?: InputMaybe<Scalars['Boolean']>;
  kill?: InputMaybe<Scalars['Int']>;
  lane?: InputMaybe<LolLane>;
  match: LolMatchCreateNestedOneWithoutPlayersInput;
  minion_killed?: InputMaybe<Scalars['Int']>;
  most_kill?: InputMaybe<Scalars['Boolean']>;
  pental_kill?: InputMaybe<Scalars['Int']>;
  player_statistic?: InputMaybe<Scalars['JSON']>;
  point?: InputMaybe<Scalars['Int']>;
  quadra_kill?: InputMaybe<Scalars['Int']>;
  triple_kill?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerLolMatchPlayer_Lol_MatchCompoundUniqueInput = {
  match_uid: Scalars['String'];
  player_game_uid: Scalars['String'];
};

export type PlayerLolMatchWhereUniqueInput = {
  player_lol_match?: InputMaybe<PlayerLolMatchPlayer_Lol_MatchCompoundUniqueInput>;
  uid?: InputMaybe<Scalars['String']>;
};

export type PlayerMission = {
  __typename?: 'PlayerMission';
  _count: PlayerMissionCount;
  achieved?: Maybe<Scalars['Decimal']>;
  created_at: Scalars['DateTime'];
  daily_mission?: Maybe<Array<UserDailyMission>>;
  history?: Maybe<Array<MissionHistory>>;
  is_claim: Scalars['Boolean'];
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
};

export type PlayerMissionCreateManyMissionInput = {
  achieved?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_claim?: InputMaybe<Scalars['Boolean']>;
  player_game_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerMissionCreateManyMissionInputEnvelope = {
  data: Array<PlayerMissionCreateManyMissionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlayerMissionCreateManyPlayer_GameInput = {
  achieved?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_claim?: InputMaybe<Scalars['Boolean']>;
  mission_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerMissionCreateManyPlayer_GameInputEnvelope = {
  data: Array<PlayerMissionCreateManyPlayer_GameInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlayerMissionCreateNestedManyWithoutMissionInput = {
  connect?: InputMaybe<Array<PlayerMissionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlayerMissionCreateOrConnectWithoutMissionInput>>;
  create?: InputMaybe<Array<PlayerMissionCreateWithoutMissionInput>>;
  createMany?: InputMaybe<PlayerMissionCreateManyMissionInputEnvelope>;
};

export type PlayerMissionCreateNestedManyWithoutPlayer_GameInput = {
  connect?: InputMaybe<Array<PlayerMissionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlayerMissionCreateOrConnectWithoutPlayer_GameInput>>;
  create?: InputMaybe<Array<PlayerMissionCreateWithoutPlayer_GameInput>>;
  createMany?: InputMaybe<PlayerMissionCreateManyPlayer_GameInputEnvelope>;
};

export type PlayerMissionCreateNestedOneWithoutDaily_MissionInput = {
  connect?: InputMaybe<PlayerMissionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PlayerMissionCreateOrConnectWithoutDaily_MissionInput>;
  create?: InputMaybe<PlayerMissionCreateWithoutDaily_MissionInput>;
};

export type PlayerMissionCreateNestedOneWithoutHistoryInput = {
  connect?: InputMaybe<PlayerMissionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PlayerMissionCreateOrConnectWithoutHistoryInput>;
  create?: InputMaybe<PlayerMissionCreateWithoutHistoryInput>;
};

export type PlayerMissionCreateOrConnectWithoutDaily_MissionInput = {
  create: PlayerMissionCreateWithoutDaily_MissionInput;
  where: PlayerMissionWhereUniqueInput;
};

export type PlayerMissionCreateOrConnectWithoutHistoryInput = {
  create: PlayerMissionCreateWithoutHistoryInput;
  where: PlayerMissionWhereUniqueInput;
};

export type PlayerMissionCreateOrConnectWithoutMissionInput = {
  create: PlayerMissionCreateWithoutMissionInput;
  where: PlayerMissionWhereUniqueInput;
};

export type PlayerMissionCreateOrConnectWithoutPlayer_GameInput = {
  create: PlayerMissionCreateWithoutPlayer_GameInput;
  where: PlayerMissionWhereUniqueInput;
};

export type PlayerMissionCreateWithoutDaily_MissionInput = {
  achieved?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  history?: InputMaybe<MissionHistoryCreateNestedManyWithoutPlayer_MissionInput>;
  is_claim?: InputMaybe<Scalars['Boolean']>;
  mission: MissionCreateNestedOneWithoutPlayer_MissionInput;
  player_game: PlayerGameCreateNestedOneWithoutPlayer_MissionInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerMissionCreateWithoutHistoryInput = {
  achieved?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  daily_mission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutPlayer_MissionInput>;
  is_claim?: InputMaybe<Scalars['Boolean']>;
  mission: MissionCreateNestedOneWithoutPlayer_MissionInput;
  player_game: PlayerGameCreateNestedOneWithoutPlayer_MissionInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerMissionCreateWithoutMissionInput = {
  achieved?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  daily_mission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutPlayer_MissionInput>;
  history?: InputMaybe<MissionHistoryCreateNestedManyWithoutPlayer_MissionInput>;
  is_claim?: InputMaybe<Scalars['Boolean']>;
  player_game: PlayerGameCreateNestedOneWithoutPlayer_MissionInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerMissionCreateWithoutPlayer_GameInput = {
  achieved?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  daily_mission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutPlayer_MissionInput>;
  history?: InputMaybe<MissionHistoryCreateNestedManyWithoutPlayer_MissionInput>;
  is_claim?: InputMaybe<Scalars['Boolean']>;
  mission: MissionCreateNestedOneWithoutPlayer_MissionInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerMissionWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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

export type PlayerNftCreateManyGameInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  nft_uid: Scalars['String'];
  slot?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type PlayerNftCreateManyGameInputEnvelope = {
  data: Array<PlayerNftCreateManyGameInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PlayerNftCreateNestedManyWithoutGameInput = {
  connect?: InputMaybe<Array<PlayerNftWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PlayerNftCreateOrConnectWithoutGameInput>>;
  create?: InputMaybe<Array<PlayerNftCreateWithoutGameInput>>;
  createMany?: InputMaybe<PlayerNftCreateManyGameInputEnvelope>;
};

export type PlayerNftCreateNestedOneWithoutNftInput = {
  connect?: InputMaybe<PlayerNftWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PlayerNftCreateOrConnectWithoutNftInput>;
  create?: InputMaybe<PlayerNftCreateWithoutNftInput>;
};

export type PlayerNftCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<PlayerNftWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PlayerNftCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<PlayerNftCreateWithoutUserInput>;
};

export type PlayerNftCreateOrConnectWithoutGameInput = {
  create: PlayerNftCreateWithoutGameInput;
  where: PlayerNftWhereUniqueInput;
};

export type PlayerNftCreateOrConnectWithoutNftInput = {
  create: PlayerNftCreateWithoutNftInput;
  where: PlayerNftWhereUniqueInput;
};

export type PlayerNftCreateOrConnectWithoutUserInput = {
  create: PlayerNftCreateWithoutUserInput;
  where: PlayerNftWhereUniqueInput;
};

export type PlayerNftCreateWithoutGameInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  nft: NftCreateNestedOneWithoutPlay_NftInput;
  slot?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPlayer_NftInput;
};

export type PlayerNftCreateWithoutNftInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game: GameCreateNestedOneWithoutNftInput;
  slot?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPlayer_NftInput;
};

export type PlayerNftCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game: GameCreateNestedOneWithoutNftInput;
  nft: NftCreateNestedOneWithoutPlay_NftInput;
  slot?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PlayerNftWhereUniqueInput = {
  nft_uid?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['Int']>;
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

export type PoolWalletCreateManyChainInput = {
  address: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  private_key: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PoolWalletCreateManyChainInputEnvelope = {
  data: Array<PoolWalletCreateManyChainInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PoolWalletCreateNestedManyWithoutChainInput = {
  connect?: InputMaybe<Array<PoolWalletWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PoolWalletCreateOrConnectWithoutChainInput>>;
  create?: InputMaybe<Array<PoolWalletCreateWithoutChainInput>>;
  createMany?: InputMaybe<PoolWalletCreateManyChainInputEnvelope>;
};

export type PoolWalletCreateOrConnectWithoutChainInput = {
  create: PoolWalletCreateWithoutChainInput;
  where: PoolWalletWhereUniqueInput;
};

export type PoolWalletCreateWithoutChainInput = {
  address: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  private_key: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type PoolWalletWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type Prize = {
  __typename?: 'Prize';
  currency?: Maybe<Currency>;
  percentage?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
  reward?: Maybe<Scalars['Float']>;
};

export type PrizeAllocation = {
  /** Percent allocation */
  percent: Scalars['Float'];
  /** Level of team */
  position: Scalars['Int'];
  /** Number of teams */
  qty: Scalars['Int'];
};

export enum PrizeClaimStatus {
  Claim = 'CLAIM',
  Notclaim = 'NOTCLAIM'
}

export type ProfileUpdateInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  biography?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country_code?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  discord?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  display_name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  facebook?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  telegram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  twitch?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  user_name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  youtube?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type Query = {
  __typename?: 'Query';
  IsSubscribeToTournament?: Maybe<Scalars['Boolean']>;
  checkJoiningAnyTournament?: Maybe<Array<GTournament>>;
  checkUserName?: Maybe<Scalars['Boolean']>;
  currencies?: Maybe<Array<CurrencyGql>>;
  donateHistory?: Maybe<Array<DonateHistory>>;
  getAllConfig?: Maybe<Array<Config>>;
  getAllTeam?: Maybe<Array<UserTeam>>;
  getAllTournament: Array<TournamentGql>;
  getBracket?: Maybe<BracketGql>;
  getClosedTournament?: Maybe<Array<TournamentGql>>;
  getContracts: Array<GContract>;
  getEarningHistory?: Maybe<Array<EarningHistory>>;
  getFavoriteGame?: Maybe<Array<UserFavoriteGame>>;
  getGame?: Maybe<Array<Game>>;
  getJoinedTournament?: Maybe<Array<TTournament>>;
  getMyTeam?: Maybe<Array<UserTeam>>;
  getNotification?: Maybe<Array<Notification>>;
  getOnGoingTournament?: Maybe<Array<TournamentGql>>;
  getOwnedTournament?: Maybe<Array<TTournament>>;
  getReferee?: Maybe<GUser>;
  getSponsorSlot?: Maybe<Array<SponsorSlot>>;
  getSpotlightAnnouncement?: Maybe<Array<SpotlightAnnouncementType>>;
  getSpotlightTournament?: Maybe<Array<GTournament>>;
  getTeam?: Maybe<Array<PlayTeamMember>>;
  getTopEarningPlayer?: Maybe<Array<GTopEarning>>;
  getTotalEarning?: Maybe<Scalars['Float']>;
  getTournamentDetail?: Maybe<TournamentGql>;
  getTournamentListRank?: Maybe<Array<TournamentListRank>>;
  getTournamentParticipants?: Maybe<Array<PlayTeam>>;
  getTournamentPrizing?: Maybe<Array<Prize>>;
  getTournamentReferees?: Maybe<Array<User>>;
  getTournamentResult: Array<GTournamentRank>;
  getTournamentReward?: Maybe<Array<Reward>>;
  getTournamentSubscriber?: Maybe<Scalars['Int']>;
  getUpComingTournament?: Maybe<Array<TournamentGql>>;
  getUserProfile?: Maybe<UserGraphql>;
  isCheckInTournament?: Maybe<Scalars['Boolean']>;
  isConfirmTournamentResult?: Maybe<Scalars['Boolean']>;
  isJoinedTournament?: Maybe<Scalars['Boolean']>;
  me?: Maybe<UserGraphql>;
  regions?: Maybe<Array<Region>>;
  search?: Maybe<Array<TournamentGql>>;
  searchJoinedTournament?: Maybe<Array<TTournament>>;
  searchMember?: Maybe<Array<GUserProfile>>;
  searchOwnerTournament?: Maybe<Array<TTournament>>;
  searchTeam?: Maybe<Array<UserTeam>>;
  verifyEmail?: Maybe<Scalars['Boolean']>;
};


export type QueryIsSubscribeToTournamentArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryCheckUserNameArgs = {
  value: Scalars['String'];
};


export type QueryDonateHistoryArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryGetAllTeamArgs = {
  user_id: Scalars['String'];
};


export type QueryGetBracketArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryGetClosedTournamentArgs = {
  data: TournamentFilterInput;
};


export type QueryGetEarningHistoryArgs = {
  user_id: Scalars['String'];
};


export type QueryGetFavoriteGameArgs = {
  user_id: Scalars['String'];
};


export type QueryGetGameArgs = {
  name: Scalars['String'];
};


export type QueryGetJoinedTournamentArgs = {
  user_id: Scalars['String'];
};


export type QueryGetMyTeamArgs = {
  user_id: Scalars['String'];
};


export type QueryGetOnGoingTournamentArgs = {
  data: TournamentFilterInput;
};


export type QueryGetOwnedTournamentArgs = {
  user_id: Scalars['String'];
};


export type QueryGetRefereeArgs = {
  input: GetRefereeInput;
};


export type QueryGetSponsorSlotArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryGetSpotlightAnnouncementArgs = {
  tournament_uid?: InputMaybe<Scalars['String']>;
};


export type QueryGetTeamArgs = {
  team_uid: Scalars['String'];
  tournament_uid: Scalars['String'];
};


export type QueryGetTotalEarningArgs = {
  user_id: Scalars['String'];
};


export type QueryGetTournamentDetailArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryGetTournamentListRankArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryGetTournamentParticipantsArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryGetTournamentPrizingArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryGetTournamentRefereesArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryGetTournamentResultArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryGetTournamentRewardArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryGetTournamentSubscriberArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryGetUpComingTournamentArgs = {
  data: TournamentFilterInput;
};


export type QueryGetUserProfileArgs = {
  input: UserProfileInput;
};


export type QueryIsCheckInTournamentArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryIsConfirmTournamentResultArgs = {
  tournament_uid: Scalars['String'];
};


export type QueryIsJoinedTournamentArgs = {
  tournament_uid: Scalars['String'];
};


export type QuerySearchArgs = {
  data: TournamentFilterInput;
  input: TournamentSearchInput;
};


export type QuerySearchJoinedTournamentArgs = {
  user_id: Scalars['String'];
  value: Scalars['String'];
};


export type QuerySearchMemberArgs = {
  team_uid: Scalars['String'];
  value: Scalars['String'];
};


export type QuerySearchOwnerTournamentArgs = {
  user_id: Scalars['String'];
  value: Scalars['String'];
};


export type QuerySearchTeamArgs = {
  name: Scalars['String'];
  user_id: Scalars['String'];
};


export type QueryVerifyEmailArgs = {
  email: Scalars['String'];
};

export type Raffle = {
  __typename?: 'Raffle';
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  end_at: Scalars['DateTime'];
  img?: Maybe<Scalars['String']>;
  lucis_point_reward?: Maybe<Scalars['Int']>;
  lucis_token_reward?: Maybe<Scalars['Decimal']>;
  name?: Maybe<Scalars['String']>;
  nft_reward?: Maybe<Scalars['String']>;
  raffle_sponsors?: Maybe<Scalars['String']>;
  regions?: Maybe<Scalars['String']>;
  status?: Maybe<RaffleStatus>;
  ticket?: Maybe<Ticket>;
  type?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  valued_at?: Maybe<Scalars['String']>;
  winner_total?: Maybe<Scalars['Int']>;
  won_tickets?: Maybe<Scalars['String']>;
};

export type RaffleCreateNestedOneWithoutTicketInput = {
  connect?: InputMaybe<RaffleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RaffleCreateOrConnectWithoutTicketInput>;
  create?: InputMaybe<RaffleCreateWithoutTicketInput>;
};

export type RaffleCreateOrConnectWithoutTicketInput = {
  create: RaffleCreateWithoutTicketInput;
  where: RaffleWhereUniqueInput;
};

export type RaffleCreateWithoutTicketInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  end_at: Scalars['DateTime'];
  img?: InputMaybe<Scalars['String']>;
  lucis_point_reward?: InputMaybe<Scalars['Int']>;
  lucis_token_reward?: InputMaybe<Scalars['Decimal']>;
  name?: InputMaybe<Scalars['String']>;
  nft_reward?: InputMaybe<Scalars['String']>;
  raffle_sponsors?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<RaffleStatus>;
  type?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  valued_at?: InputMaybe<Scalars['String']>;
  winner_total?: InputMaybe<Scalars['Int']>;
  won_tickets?: InputMaybe<Scalars['String']>;
};

export enum RaffleStatus {
  Closed = 'CLOSED',
  Disabled = 'DISABLED',
  Enabled = 'ENABLED'
}

export type RaffleWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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

export type ReactionCreateManyTournamentInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  type: ReactionType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type ReactionCreateManyTournamentInputEnvelope = {
  data: Array<ReactionCreateManyTournamentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ReactionCreateManyUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  tournament_uid: Scalars['String'];
  type: ReactionType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type ReactionCreateManyUserInputEnvelope = {
  data: Array<ReactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ReactionCreateNestedManyWithoutTournamentInput = {
  connect?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReactionCreateOrConnectWithoutTournamentInput>>;
  create?: InputMaybe<Array<ReactionCreateWithoutTournamentInput>>;
  createMany?: InputMaybe<ReactionCreateManyTournamentInputEnvelope>;
};

export type ReactionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReactionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ReactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<ReactionCreateManyUserInputEnvelope>;
};

export type ReactionCreateOrConnectWithoutTournamentInput = {
  create: ReactionCreateWithoutTournamentInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionCreateOrConnectWithoutUserInput = {
  create: ReactionCreateWithoutUserInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionCreateWithoutTournamentInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  type: ReactionType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutReactionInput;
};

export type ReactionCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  tournament: TournamentCreateNestedOneWithoutReactionInput;
  type: ReactionType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type ReactionInput = {
  tournament_uid?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ReactionType>;
};

export enum ReactionType {
  Dislike = 'DISLIKE',
  Hear = 'HEAR',
  Like = 'LIKE'
}

export type ReactionWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type Region = {
  __typename?: 'Region';
  created_at: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type Reward = {
  __typename?: 'Reward';
  amount?: Maybe<Scalars['Float']>;
  currency_uid?: Maybe<Scalars['String']>;
  is_claim?: Maybe<Scalars['Boolean']>;
  rank?: Maybe<Scalars['Int']>;
  reward_type?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

export enum SortType {
  Asc = 'ASC',
  Desc = 'DESC',
  None = 'NONE'
}

export type SponsorCreateExistingInputGql = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Float'];
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  referee_fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  system_fee?: InputMaybe<Scalars['Decimal']>;
};

export type SponsorCreateInputGql = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Float'];
  block?: InputMaybe<Scalars['Int']>;
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  referee_fee?: InputMaybe<Scalars['Decimal']>;
  sponsor_slot_uid: Scalars['String'];
  status?: InputMaybe<TransactionStatus>;
  system_fee?: InputMaybe<Scalars['Decimal']>;
  tx_hash: Scalars['String'];
};

export type SponsorRaffle = {
  __typename?: 'SponsorRaffle';
  created_at: Scalars['DateTime'];
  img?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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

export type SponsorSlotCreateInputGql = {
  cover?: InputMaybe<Scalars['String']>;
  max: Scalars['Int'];
  min: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  show_ads?: InputMaybe<Scalars['Boolean']>;
  show_logo?: InputMaybe<Scalars['Boolean']>;
  show_name?: InputMaybe<Scalars['Boolean']>;
  sponsor_transactions?: InputMaybe<SponsorTransactionCreateNestedWithoutSponsorInputGql>;
};

export type SponsorSlotCreateManyTournamentInput = {
  cover?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  max: Scalars['Int'];
  min: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  show_ads?: InputMaybe<Scalars['Boolean']>;
  show_logo?: InputMaybe<Scalars['Boolean']>;
  show_name?: InputMaybe<Scalars['Boolean']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type SponsorSlotCreateManyTournamentInputEnvelope = {
  data: Array<SponsorSlotCreateManyTournamentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SponsorSlotCreateNestedManyWithoutTournamentInput = {
  connect?: InputMaybe<Array<SponsorSlotWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SponsorSlotCreateOrConnectWithoutTournamentInput>>;
  create?: InputMaybe<Array<SponsorSlotCreateWithoutTournamentInput>>;
  createMany?: InputMaybe<SponsorSlotCreateManyTournamentInputEnvelope>;
};

export type SponsorSlotCreateNestedOneWithoutSponsor_TransactionsInput = {
  connect?: InputMaybe<SponsorSlotWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SponsorSlotCreateOrConnectWithoutSponsor_TransactionsInput>;
  create?: InputMaybe<SponsorSlotCreateWithoutSponsor_TransactionsInput>;
};

export type SponsorSlotCreateOrConnectWithoutSponsor_TransactionsInput = {
  create: SponsorSlotCreateWithoutSponsor_TransactionsInput;
  where: SponsorSlotWhereUniqueInput;
};

export type SponsorSlotCreateOrConnectWithoutTournamentInput = {
  create: SponsorSlotCreateWithoutTournamentInput;
  where: SponsorSlotWhereUniqueInput;
};

export type SponsorSlotCreateWithoutSponsor_TransactionsInput = {
  cover?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  max: Scalars['Int'];
  min: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  show_ads?: InputMaybe<Scalars['Boolean']>;
  show_logo?: InputMaybe<Scalars['Boolean']>;
  show_name?: InputMaybe<Scalars['Boolean']>;
  tournament: TournamentCreateNestedOneWithoutSponsorSlotInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type SponsorSlotCreateWithoutTournamentInput = {
  cover?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  max: Scalars['Int'];
  min: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  show_ads?: InputMaybe<Scalars['Boolean']>;
  show_logo?: InputMaybe<Scalars['Boolean']>;
  show_name?: InputMaybe<Scalars['Boolean']>;
  sponsor_transactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutSponsor_SlotInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type SponsorSlotWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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

export type SponsorTransactionCreateManyCurrencyInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  referee_fee?: InputMaybe<Scalars['Decimal']>;
  sponsor_slot_uid: Scalars['String'];
  sponsor_type?: InputMaybe<SponsorTransactionType>;
  status?: InputMaybe<TransactionStatus>;
  system_fee?: InputMaybe<Scalars['Decimal']>;
  tournament_uid: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type SponsorTransactionCreateManyCurrencyInputEnvelope = {
  data: Array<SponsorTransactionCreateManyCurrencyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SponsorTransactionCreateManySponsorGql = {
  data: Array<SponsorCreateExistingInputGql>;
};

export type SponsorTransactionCreateManySponsor_SlotInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  referee_fee?: InputMaybe<Scalars['Decimal']>;
  sponsor_type?: InputMaybe<SponsorTransactionType>;
  status?: InputMaybe<TransactionStatus>;
  system_fee?: InputMaybe<Scalars['Decimal']>;
  tournament_uid: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type SponsorTransactionCreateManySponsor_SlotInputEnvelope = {
  data: Array<SponsorTransactionCreateManySponsor_SlotInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SponsorTransactionCreateManyUserInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  referee_fee?: InputMaybe<Scalars['Decimal']>;
  sponsor_slot_uid: Scalars['String'];
  sponsor_type?: InputMaybe<SponsorTransactionType>;
  status?: InputMaybe<TransactionStatus>;
  system_fee?: InputMaybe<Scalars['Decimal']>;
  tournament_uid: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type SponsorTransactionCreateManyUserInputEnvelope = {
  data: Array<SponsorTransactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SponsorTransactionCreateNestedManyWithoutCurrencyInput = {
  connect?: InputMaybe<Array<SponsorTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SponsorTransactionCreateOrConnectWithoutCurrencyInput>>;
  create?: InputMaybe<Array<SponsorTransactionCreateWithoutCurrencyInput>>;
  createMany?: InputMaybe<SponsorTransactionCreateManyCurrencyInputEnvelope>;
};

export type SponsorTransactionCreateNestedManyWithoutSponsor_SlotInput = {
  connect?: InputMaybe<Array<SponsorTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SponsorTransactionCreateOrConnectWithoutSponsor_SlotInput>>;
  create?: InputMaybe<Array<SponsorTransactionCreateWithoutSponsor_SlotInput>>;
  createMany?: InputMaybe<SponsorTransactionCreateManySponsor_SlotInputEnvelope>;
};

export type SponsorTransactionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<SponsorTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SponsorTransactionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<SponsorTransactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<SponsorTransactionCreateManyUserInputEnvelope>;
};

export type SponsorTransactionCreateNestedWithoutSponsorInputGql = {
  createMany?: InputMaybe<SponsorTransactionCreateManySponsorGql>;
};

export type SponsorTransactionCreateOrConnectWithoutCurrencyInput = {
  create: SponsorTransactionCreateWithoutCurrencyInput;
  where: SponsorTransactionWhereUniqueInput;
};

export type SponsorTransactionCreateOrConnectWithoutSponsor_SlotInput = {
  create: SponsorTransactionCreateWithoutSponsor_SlotInput;
  where: SponsorTransactionWhereUniqueInput;
};

export type SponsorTransactionCreateOrConnectWithoutUserInput = {
  create: SponsorTransactionCreateWithoutUserInput;
  where: SponsorTransactionWhereUniqueInput;
};

export type SponsorTransactionCreateWithoutCurrencyInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  referee_fee?: InputMaybe<Scalars['Decimal']>;
  sponsor_slot: SponsorSlotCreateNestedOneWithoutSponsor_TransactionsInput;
  sponsor_type?: InputMaybe<SponsorTransactionType>;
  status?: InputMaybe<TransactionStatus>;
  system_fee?: InputMaybe<Scalars['Decimal']>;
  tournament_uid: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutSponsorTransactionsInput;
};

export type SponsorTransactionCreateWithoutSponsor_SlotInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutSponsorTransactionsInput;
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  referee_fee?: InputMaybe<Scalars['Decimal']>;
  sponsor_type?: InputMaybe<SponsorTransactionType>;
  status?: InputMaybe<TransactionStatus>;
  system_fee?: InputMaybe<Scalars['Decimal']>;
  tournament_uid: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutSponsorTransactionsInput;
};

export type SponsorTransactionCreateWithoutUserInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutSponsorTransactionsInput;
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  referee_fee?: InputMaybe<Scalars['Decimal']>;
  sponsor_slot: SponsorSlotCreateNestedOneWithoutSponsor_TransactionsInput;
  sponsor_type?: InputMaybe<SponsorTransactionType>;
  status?: InputMaybe<TransactionStatus>;
  system_fee?: InputMaybe<Scalars['Decimal']>;
  tournament_uid: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export enum SponsorTransactionType {
  Become = 'BECOME',
  Existing = 'EXISTING'
}

export type SponsorTransactionWhereUniqueInput = {
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};

export type SpotlightAnnouncement = {
  __typename?: 'SpotlightAnnouncement';
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type SpotlightAnnouncementCreateManyTournamentInput = {
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type SpotlightAnnouncementCreateManyTournamentInputEnvelope = {
  data: Array<SpotlightAnnouncementCreateManyTournamentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SpotlightAnnouncementCreateNestedManyWithoutTournamentInput = {
  connect?: InputMaybe<Array<SpotlightAnnouncementWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SpotlightAnnouncementCreateOrConnectWithoutTournamentInput>>;
  create?: InputMaybe<Array<SpotlightAnnouncementCreateWithoutTournamentInput>>;
  createMany?: InputMaybe<SpotlightAnnouncementCreateManyTournamentInputEnvelope>;
};

export type SpotlightAnnouncementCreateOrConnectWithoutTournamentInput = {
  create: SpotlightAnnouncementCreateWithoutTournamentInput;
  where: SpotlightAnnouncementWhereUniqueInput;
};

export type SpotlightAnnouncementCreateWithoutTournamentInput = {
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type SpotlightAnnouncementType = {
  __typename?: 'SpotlightAnnouncementType';
  content?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['DateTime']>;
};

export type SpotlightAnnouncementWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
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

export type StakedCreateManyUserInput = {
  apr?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  ntf_uid: Scalars['String'];
  total_reward?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type StakedCreateManyUserInputEnvelope = {
  data: Array<StakedCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type StakedCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<StakedWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StakedCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<StakedCreateWithoutUserInput>>;
  createMany?: InputMaybe<StakedCreateManyUserInputEnvelope>;
};

export type StakedCreateNestedOneWithoutClaim_StakedInput = {
  connect?: InputMaybe<StakedWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StakedCreateOrConnectWithoutClaim_StakedInput>;
  create?: InputMaybe<StakedCreateWithoutClaim_StakedInput>;
};

export type StakedCreateNestedOneWithoutNftInput = {
  connect?: InputMaybe<StakedWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StakedCreateOrConnectWithoutNftInput>;
  create?: InputMaybe<StakedCreateWithoutNftInput>;
};

export type StakedCreateOrConnectWithoutClaim_StakedInput = {
  create: StakedCreateWithoutClaim_StakedInput;
  where: StakedWhereUniqueInput;
};

export type StakedCreateOrConnectWithoutNftInput = {
  create: StakedCreateWithoutNftInput;
  where: StakedWhereUniqueInput;
};

export type StakedCreateOrConnectWithoutUserInput = {
  create: StakedCreateWithoutUserInput;
  where: StakedWhereUniqueInput;
};

export type StakedCreateWithoutClaim_StakedInput = {
  apr?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  nft: NftCreateNestedOneWithoutStaked_NftInput;
  total_reward?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutStaked_NftInput;
};

export type StakedCreateWithoutNftInput = {
  apr?: InputMaybe<Scalars['Decimal']>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutStakedInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  total_reward?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutStaked_NftInput;
};

export type StakedCreateWithoutUserInput = {
  apr?: InputMaybe<Scalars['Decimal']>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutStakedInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  nft: NftCreateNestedOneWithoutStaked_NftInput;
  total_reward?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type StakedWhereUniqueInput = {
  ntf_uid?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};

export enum Status {
  Closed = 'CLOSED',
  Ongoing = 'ONGOING',
  Reviewing = 'REVIEWING',
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
  getSpotlightAnnouncement: AnnouncementType;
  pushNotification: Notification;
  updateParticipant: Participant;
  updateTotalDonation: TotalDonation;
  updateTotalPrizePool: TotalPrizePool;
};


export type SubscriptionPushNotificationArgs = {
  user_id: Scalars['Float'];
};


export type SubscriptionUpdateParticipantArgs = {
  tournament_uid: Scalars['String'];
};


export type SubscriptionUpdateTotalDonationArgs = {
  tournament_uid: Scalars['String'];
};


export type SubscriptionUpdateTotalPrizePoolArgs = {
  tournament_uid: Scalars['String'];
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

export type SystemSponsorCreateManyTournamentInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<TransactionStatus>;
  tx_hash: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type SystemSponsorCreateManyTournamentInputEnvelope = {
  data: Array<SystemSponsorCreateManyTournamentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SystemSponsorCreateNestedManyWithoutTournamentInput = {
  connect?: InputMaybe<Array<SystemSponsorWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SystemSponsorCreateOrConnectWithoutTournamentInput>>;
  create?: InputMaybe<Array<SystemSponsorCreateWithoutTournamentInput>>;
  createMany?: InputMaybe<SystemSponsorCreateManyTournamentInputEnvelope>;
};

export type SystemSponsorCreateOrConnectWithoutTournamentInput = {
  create: SystemSponsorCreateWithoutTournamentInput;
  where: SystemSponsorWhereUniqueInput;
};

export type SystemSponsorCreateWithoutTournamentInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<TransactionStatus>;
  tx_hash: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type SystemSponsorWhereUniqueInput = {
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};

export type TTournament = {
  __typename?: 'TTournament';
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
  is_auto_checkin: Scalars['Boolean'];
  is_claim?: Maybe<PrizeClaimStatus>;
  join_fee?: Maybe<Scalars['Decimal']>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  name: Scalars['String'];
  participants: Scalars['Int'];
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
  start_at?: Maybe<Scalars['DateTime']>;
  systemSponsors?: Maybe<Array<SystemSponsor>>;
  team_participated?: Maybe<Scalars['Int']>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: Maybe<TournamentDeposit>;
  tournament_status?: Maybe<Status>;
  tournament_subscribes?: Maybe<Array<TournamentSubscriber>>;
  turns?: Maybe<Scalars['Int']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
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

export type TeamCreateNestedOneWithoutPlayTeamsInput = {
  connect?: InputMaybe<TeamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeamCreateOrConnectWithoutPlayTeamsInput>;
  create?: InputMaybe<TeamCreateWithoutPlayTeamsInput>;
};

export type TeamCreateNestedOneWithoutTeam_MembersInput = {
  connect?: InputMaybe<TeamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeamCreateOrConnectWithoutTeam_MembersInput>;
  create?: InputMaybe<TeamCreateWithoutTeam_MembersInput>;
};

export type TeamCreateOrConnectWithoutPlayTeamsInput = {
  create: TeamCreateWithoutPlayTeamsInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutTeam_MembersInput = {
  create: TeamCreateWithoutTeam_MembersInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateWithoutPlayTeamsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  created_by: Scalars['Int'];
  name: Scalars['String'];
  team_members?: InputMaybe<TeamMemberCreateNestedManyWithoutTeamInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TeamCreateWithoutTeam_MembersInput = {
  avatar?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  created_by: Scalars['Int'];
  name: Scalars['String'];
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTeamInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TeamInput = {
  avatar?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  team_member?: InputMaybe<Array<Player>>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
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

export type TeamMemberCreateManyTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type TeamMemberCreateManyTeamInputEnvelope = {
  data: Array<TeamMemberCreateManyTeamInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TeamMemberCreateManyUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  team_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TeamMemberCreateManyUserInputEnvelope = {
  data: Array<TeamMemberCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TeamMemberCreateNestedManyWithoutTeamInput = {
  connect?: InputMaybe<Array<TeamMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TeamMemberCreateOrConnectWithoutTeamInput>>;
  create?: InputMaybe<Array<TeamMemberCreateWithoutTeamInput>>;
  createMany?: InputMaybe<TeamMemberCreateManyTeamInputEnvelope>;
};

export type TeamMemberCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<TeamMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TeamMemberCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<TeamMemberCreateWithoutUserInput>>;
  createMany?: InputMaybe<TeamMemberCreateManyUserInputEnvelope>;
};

export type TeamMemberCreateOrConnectWithoutTeamInput = {
  create: TeamMemberCreateWithoutTeamInput;
  where: TeamMemberWhereUniqueInput;
};

export type TeamMemberCreateOrConnectWithoutUserInput = {
  create: TeamMemberCreateWithoutUserInput;
  where: TeamMemberWhereUniqueInput;
};

export type TeamMemberCreateWithoutTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTeamMembersInput;
};

export type TeamMemberCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  team: TeamCreateNestedOneWithoutTeam_MembersInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TeamMemberWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type TeamWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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

export type TicketCreateNestedOneWithoutUser_TicketInput = {
  connect?: InputMaybe<TicketWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TicketCreateOrConnectWithoutUser_TicketInput>;
  create?: InputMaybe<TicketCreateWithoutUser_TicketInput>;
};

export type TicketCreateOrConnectWithoutUser_TicketInput = {
  create: TicketCreateWithoutUser_TicketInput;
  where: TicketWhereUniqueInput;
};

export type TicketCreateWithoutUser_TicketInput = {
  bought_count?: InputMaybe<Scalars['Int']>;
  cost?: InputMaybe<Scalars['Decimal']>;
  cost_type?: InputMaybe<CostType>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  raffle: RaffleCreateNestedOneWithoutTicketInput;
  total_limit?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_limit?: InputMaybe<Scalars['Int']>;
};

export type TicketWhereUniqueInput = {
  raffle_uid?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};

export enum TnmStatus {
  Checkin = 'CHECKIN',
  Closed = 'CLOSED',
  EditBracket = 'EDIT_BRACKET',
  Finish = 'FINISH',
  Prepare = 'PREPARE',
  Registration = 'REGISTRATION',
  Running = 'RUNNING'
}

export type TotalDonation = {
  __typename?: 'TotalDonation';
  total_donation?: Maybe<Scalars['Float']>;
  tournament_uid?: Maybe<Scalars['String']>;
};

export type TotalPrizePool = {
  __typename?: 'TotalPrizePool';
  total_prize_pool?: Maybe<Scalars['Float']>;
  tournament_uid?: Maybe<Scalars['String']>;
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

export type TournamentCreateInputGql = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  bracket_type: BracketType;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  game_uid: Scalars['String'];
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Float']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTournamentInput>;
  pool_size: Scalars['Float'];
  prize_allocation: Array<PrizeAllocation>;
  referees?: InputMaybe<Array<Scalars['Int']>>;
  regions?: InputMaybe<Array<Scalars['String']>>;
  rounds: Array<BracketRoundCreateInputGql>;
  rules?: InputMaybe<Scalars['String']>;
  sponsor_slots: Array<SponsorSlotCreateInputGql>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  start_at: Scalars['DateTime'];
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  turns?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentCreateManyCurrencyInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  game_uid: Scalars['String'];
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type TournamentCreateManyCurrencyInputEnvelope = {
  data: Array<TournamentCreateManyCurrencyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TournamentCreateManyGameInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type TournamentCreateManyGameInputEnvelope = {
  data: Array<TournamentCreateManyGameInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TournamentCreateManyUserInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  game_uid: Scalars['String'];
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentCreateManyUserInputEnvelope = {
  data: Array<TournamentCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TournamentCreateNestedManyWithoutCurrencyInput = {
  connect?: InputMaybe<Array<TournamentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TournamentCreateOrConnectWithoutCurrencyInput>>;
  create?: InputMaybe<Array<TournamentCreateWithoutCurrencyInput>>;
  createMany?: InputMaybe<TournamentCreateManyCurrencyInputEnvelope>;
};

export type TournamentCreateNestedManyWithoutGameInput = {
  connect?: InputMaybe<Array<TournamentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TournamentCreateOrConnectWithoutGameInput>>;
  create?: InputMaybe<Array<TournamentCreateWithoutGameInput>>;
  createMany?: InputMaybe<TournamentCreateManyGameInputEnvelope>;
};

export type TournamentCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<TournamentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TournamentCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<TournamentCreateWithoutUserInput>>;
  createMany?: InputMaybe<TournamentCreateManyUserInputEnvelope>;
};

export type TournamentCreateNestedOneWithoutBracketsInput = {
  connect?: InputMaybe<TournamentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TournamentCreateOrConnectWithoutBracketsInput>;
  create?: InputMaybe<TournamentCreateWithoutBracketsInput>;
};

export type TournamentCreateNestedOneWithoutClaim_TransactionsInput = {
  connect?: InputMaybe<TournamentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TournamentCreateOrConnectWithoutClaim_TransactionsInput>;
  create?: InputMaybe<TournamentCreateWithoutClaim_TransactionsInput>;
};

export type TournamentCreateNestedOneWithoutDonate_TransactionsInput = {
  connect?: InputMaybe<TournamentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TournamentCreateOrConnectWithoutDonate_TransactionsInput>;
  create?: InputMaybe<TournamentCreateWithoutDonate_TransactionsInput>;
};

export type TournamentCreateNestedOneWithoutLeader_BoardInput = {
  connect?: InputMaybe<TournamentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TournamentCreateOrConnectWithoutLeader_BoardInput>;
  create?: InputMaybe<TournamentCreateWithoutLeader_BoardInput>;
};

export type TournamentCreateNestedOneWithoutPlayTeamsInput = {
  connect?: InputMaybe<TournamentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TournamentCreateOrConnectWithoutPlayTeamsInput>;
  create?: InputMaybe<TournamentCreateWithoutPlayTeamsInput>;
};

export type TournamentCreateNestedOneWithoutReactionInput = {
  connect?: InputMaybe<TournamentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TournamentCreateOrConnectWithoutReactionInput>;
  create?: InputMaybe<TournamentCreateWithoutReactionInput>;
};

export type TournamentCreateNestedOneWithoutSponsorSlotInput = {
  connect?: InputMaybe<TournamentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TournamentCreateOrConnectWithoutSponsorSlotInput>;
  create?: InputMaybe<TournamentCreateWithoutSponsorSlotInput>;
};

export type TournamentCreateNestedOneWithoutTournament_SubscribesInput = {
  connect?: InputMaybe<TournamentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TournamentCreateOrConnectWithoutTournament_SubscribesInput>;
  create?: InputMaybe<TournamentCreateWithoutTournament_SubscribesInput>;
};

export type TournamentCreateOrConnectWithoutBracketsInput = {
  create: TournamentCreateWithoutBracketsInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateOrConnectWithoutClaim_TransactionsInput = {
  create: TournamentCreateWithoutClaim_TransactionsInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateOrConnectWithoutCurrencyInput = {
  create: TournamentCreateWithoutCurrencyInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateOrConnectWithoutDonate_TransactionsInput = {
  create: TournamentCreateWithoutDonate_TransactionsInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateOrConnectWithoutGameInput = {
  create: TournamentCreateWithoutGameInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateOrConnectWithoutLeader_BoardInput = {
  create: TournamentCreateWithoutLeader_BoardInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateOrConnectWithoutPlayTeamsInput = {
  create: TournamentCreateWithoutPlayTeamsInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateOrConnectWithoutReactionInput = {
  create: TournamentCreateWithoutReactionInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateOrConnectWithoutSponsorSlotInput = {
  create: TournamentCreateWithoutSponsorSlotInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateOrConnectWithoutTournament_SubscribesInput = {
  create: TournamentCreateWithoutTournament_SubscribesInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateOrConnectWithoutUserInput = {
  create: TournamentCreateWithoutUserInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateWithoutBracketsInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTournamentInput>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsors?: InputMaybe<SystemSponsorCreateNestedManyWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutClaim_TransactionsInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTournamentInput>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsors?: InputMaybe<SystemSponsorCreateNestedManyWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutCurrencyInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTournamentInput>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsors?: InputMaybe<SystemSponsorCreateNestedManyWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutDonate_TransactionsInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTournamentInput>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsors?: InputMaybe<SystemSponsorCreateNestedManyWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutGameInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTournamentInput>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsors?: InputMaybe<SystemSponsorCreateNestedManyWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutLeader_BoardInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTournamentInput>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsors?: InputMaybe<SystemSponsorCreateNestedManyWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutPlayTeamsInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsors?: InputMaybe<SystemSponsorCreateNestedManyWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutReactionInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTournamentInput>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsors?: InputMaybe<SystemSponsorCreateNestedManyWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutSponsorSlotInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTournamentInput>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsors?: InputMaybe<SystemSponsorCreateNestedManyWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutTournament_SubscribesInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTournamentInput>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsors?: InputMaybe<SystemSponsorCreateNestedManyWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutUserInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  annoucement?: InputMaybe<SpotlightAnnouncementCreateNestedManyWithoutTournamentInput>;
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  is_auto_checkin?: InputMaybe<Scalars['Boolean']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  playTeams?: InputMaybe<PlayTeamCreateNestedManyWithoutTournamentInput>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsors?: InputMaybe<SystemSponsorCreateNestedManyWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
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

export type TournamentDepositCreateNestedOneWithoutTournamentInput = {
  connect?: InputMaybe<TournamentDepositWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TournamentDepositCreateOrConnectWithoutTournamentInput>;
  create?: InputMaybe<TournamentDepositCreateWithoutTournamentInput>;
};

export type TournamentDepositCreateOrConnectWithoutTournamentInput = {
  create: TournamentDepositCreateWithoutTournamentInput;
  where: TournamentDepositWhereUniqueInput;
};

export type TournamentDepositCreateWithoutTournamentInput = {
  amount?: InputMaybe<Scalars['Decimal']>;
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  created_by?: InputMaybe<Scalars['Int']>;
  referee_fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  system_fee?: InputMaybe<Scalars['Decimal']>;
  tx_hash: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentDepositWhereUniqueInput = {
  tournament_uid?: InputMaybe<Scalars['String']>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};

export type TournamentFilterInput = {
  bracket?: InputMaybe<GBracketType>;
  game_uid?: InputMaybe<Scalars['String']>;
  /** ASC OR DESC */
  prize_pool?: InputMaybe<SortType>;
  size?: InputMaybe<Scalars['String']>;
  /** ASC OR DESC */
  time?: InputMaybe<SortType>;
};

export type TournamentGql = {
  __typename?: 'TournamentGql';
  _count: TournamentCount;
  additionPrize: Scalars['Decimal'];
  annoucement?: Maybe<Array<SpotlightAnnouncement>>;
  brackets?: Maybe<Array<Bracket>>;
  cache_tournament?: Maybe<CacheTournament>;
  cover: Scalars['String'];
  created_at: Scalars['DateTime'];
  currency: Currency;
  currency_uid: Scalars['String'];
  desc?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  donate_transactions?: Maybe<Array<DonateTransaction>>;
  game: Game;
  game_uid: Scalars['String'];
  has_password?: Maybe<Scalars['Boolean']>;
  invite_link?: Maybe<Scalars['String']>;
  isConfirmTournamentResult?: Maybe<Scalars['Boolean']>;
  is_auto_checkin: Scalars['Boolean'];
  join_fee?: Maybe<Scalars['Decimal']>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  playTeams?: Maybe<Array<PlayTeam>>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: Maybe<Array<TournamentRank>>;
  reaction?: Maybe<Array<Reaction>>;
  referees?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  rules?: Maybe<Scalars['String']>;
  sponsorSlot?: Maybe<Array<SponsorSlot>>;
  spotlight_position?: Maybe<Scalars['Int']>;
  systemSponsors?: Maybe<Array<SystemSponsor>>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  totalDonation?: Maybe<Scalars['Float']>;
  totalPrizePool?: Maybe<Scalars['Float']>;
  tournamentDeposit?: Maybe<TournamentDeposit>;
  tournament_status?: Maybe<TnmStatus>;
  tournament_subscribes?: Maybe<Array<TournamentSubscriber>>;
  turns?: Maybe<Scalars['Int']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
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

export type TournamentLeaderBoardCreateManyTournamentInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  total_donation?: InputMaybe<Scalars['Decimal']>;
  total_earning?: InputMaybe<Scalars['Decimal']>;
  total_prize?: InputMaybe<Scalars['Decimal']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type TournamentLeaderBoardCreateManyTournamentInputEnvelope = {
  data: Array<TournamentLeaderBoardCreateManyTournamentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TournamentLeaderBoardCreateManyUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  total_donation?: InputMaybe<Scalars['Decimal']>;
  total_earning?: InputMaybe<Scalars['Decimal']>;
  total_prize?: InputMaybe<Scalars['Decimal']>;
  tournament_uid: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentLeaderBoardCreateManyUserInputEnvelope = {
  data: Array<TournamentLeaderBoardCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TournamentLeaderBoardCreateNestedManyWithoutTournamentInput = {
  connect?: InputMaybe<Array<TournamentLeaderBoardWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TournamentLeaderBoardCreateOrConnectWithoutTournamentInput>>;
  create?: InputMaybe<Array<TournamentLeaderBoardCreateWithoutTournamentInput>>;
  createMany?: InputMaybe<TournamentLeaderBoardCreateManyTournamentInputEnvelope>;
};

export type TournamentLeaderBoardCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<TournamentLeaderBoardWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TournamentLeaderBoardCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<TournamentLeaderBoardCreateWithoutUserInput>>;
  createMany?: InputMaybe<TournamentLeaderBoardCreateManyUserInputEnvelope>;
};

export type TournamentLeaderBoardCreateOrConnectWithoutTournamentInput = {
  create: TournamentLeaderBoardCreateWithoutTournamentInput;
  where: TournamentLeaderBoardWhereUniqueInput;
};

export type TournamentLeaderBoardCreateOrConnectWithoutUserInput = {
  create: TournamentLeaderBoardCreateWithoutUserInput;
  where: TournamentLeaderBoardWhereUniqueInput;
};

export type TournamentLeaderBoardCreateWithoutTournamentInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  total_donation?: InputMaybe<Scalars['Decimal']>;
  total_earning?: InputMaybe<Scalars['Decimal']>;
  total_prize?: InputMaybe<Scalars['Decimal']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutLeader_BoardInput>;
};

export type TournamentLeaderBoardCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  total_donation?: InputMaybe<Scalars['Decimal']>;
  total_earning?: InputMaybe<Scalars['Decimal']>;
  total_prize?: InputMaybe<Scalars['Decimal']>;
  tournament: TournamentCreateNestedOneWithoutLeader_BoardInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentLeaderBoardWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type TournamentListRank = {
  __typename?: 'TournamentListRank';
  donated?: Maybe<Scalars['Float']>;
  playTeam?: Maybe<PlayTeam>;
  playTeamMembers?: Maybe<Array<PlayTeamMember>>;
  prize?: Maybe<Scalars['Float']>;
  rank?: Maybe<Scalars['Int']>;
  team: Team;
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

export type TournamentRankCreateManyTournamentInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  rank: Scalars['Int'];
  team_uid: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentRankCreateManyTournamentInputEnvelope = {
  data: Array<TournamentRankCreateManyTournamentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TournamentRankCreateNestedManyWithoutTournamentInput = {
  connect?: InputMaybe<Array<TournamentRankWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TournamentRankCreateOrConnectWithoutTournamentInput>>;
  create?: InputMaybe<Array<TournamentRankCreateWithoutTournamentInput>>;
  createMany?: InputMaybe<TournamentRankCreateManyTournamentInputEnvelope>;
};

export type TournamentRankCreateOrConnectWithoutTournamentInput = {
  create: TournamentRankCreateWithoutTournamentInput;
  where: TournamentRankWhereUniqueInput;
};

export type TournamentRankCreateWithoutTournamentInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  rank: Scalars['Int'];
  team_uid: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentRankWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type TournamentSearchInput = {
  type?: InputMaybe<Status>;
  value?: InputMaybe<Scalars['String']>;
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

export type TournamentSubscriberCreateManyTournamentsInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_subscribed?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type TournamentSubscriberCreateManyTournamentsInputEnvelope = {
  data: Array<TournamentSubscriberCreateManyTournamentsInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TournamentSubscriberCreateManyUsersInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_subscribed?: InputMaybe<Scalars['Int']>;
  tournament_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentSubscriberCreateManyUsersInputEnvelope = {
  data: Array<TournamentSubscriberCreateManyUsersInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TournamentSubscriberCreateNestedManyWithoutTournamentsInput = {
  connect?: InputMaybe<Array<TournamentSubscriberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TournamentSubscriberCreateOrConnectWithoutTournamentsInput>>;
  create?: InputMaybe<Array<TournamentSubscriberCreateWithoutTournamentsInput>>;
  createMany?: InputMaybe<TournamentSubscriberCreateManyTournamentsInputEnvelope>;
};

export type TournamentSubscriberCreateNestedManyWithoutUsersInput = {
  connect?: InputMaybe<Array<TournamentSubscriberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TournamentSubscriberCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<TournamentSubscriberCreateWithoutUsersInput>>;
  createMany?: InputMaybe<TournamentSubscriberCreateManyUsersInputEnvelope>;
};

export type TournamentSubscriberCreateOrConnectWithoutTournamentsInput = {
  create: TournamentSubscriberCreateWithoutTournamentsInput;
  where: TournamentSubscriberWhereUniqueInput;
};

export type TournamentSubscriberCreateOrConnectWithoutUsersInput = {
  create: TournamentSubscriberCreateWithoutUsersInput;
  where: TournamentSubscriberWhereUniqueInput;
};

export type TournamentSubscriberCreateWithoutTournamentsInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_subscribed?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  users: UserCreateNestedOneWithoutTournamentSubscriberInput;
};

export type TournamentSubscriberCreateWithoutUsersInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_subscribed?: InputMaybe<Scalars['Int']>;
  tournaments: TournamentCreateNestedOneWithoutTournament_SubscribesInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentSubscriberWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type TournamentWhereUniqueInput = {
  spotlight_position?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
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
  claim_raffle?: Maybe<Array<ClaimRaffleTransaction>>;
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
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
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
  user_bonus?: Maybe<UserBonus>;
  user_ticket?: Maybe<Array<UserTicket>>;
  withdraws?: Maybe<Array<WithdrawTransaction>>;
};

export type UserBonus = {
  __typename?: 'UserBonus';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  is_join_discord: Scalars['Boolean'];
  is_refer_friend: Scalars['Boolean'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type UserBonusCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<UserBonusWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserBonusCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<UserBonusCreateWithoutUserInput>;
};

export type UserBonusCreateOrConnectWithoutUserInput = {
  create: UserBonusCreateWithoutUserInput;
  where: UserBonusWhereUniqueInput;
};

export type UserBonusCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_join_discord?: InputMaybe<Scalars['Boolean']>;
  is_refer_friend?: InputMaybe<Scalars['Boolean']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserBonusWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

export type UserCount = {
  __typename?: 'UserCount';
  balace_history: Scalars['Int'];
  claim_raffle: Scalars['Int'];
  claim_staked: Scalars['Int'];
  claim_tournament: Scalars['Int'];
  dailyMission: Scalars['Int'];
  daily_history: Scalars['Int'];
  favorite_game: Scalars['Int'];
  leader_board: Scalars['Int'];
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

export type UserCreateNestedOneWithoutClaim_RaffleInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutClaim_RaffleInput>;
  create?: InputMaybe<UserCreateWithoutClaim_RaffleInput>;
};

export type UserCreateNestedOneWithoutClaim_StakedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutClaim_StakedInput>;
  create?: InputMaybe<UserCreateWithoutClaim_StakedInput>;
};

export type UserCreateNestedOneWithoutClaim_TournamentInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutClaim_TournamentInput>;
  create?: InputMaybe<UserCreateWithoutClaim_TournamentInput>;
};

export type UserCreateNestedOneWithoutDailyMissionInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutDailyMissionInput>;
  create?: InputMaybe<UserCreateWithoutDailyMissionInput>;
};

export type UserCreateNestedOneWithoutDaily_HistoryInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutDaily_HistoryInput>;
  create?: InputMaybe<UserCreateWithoutDaily_HistoryInput>;
};

export type UserCreateNestedOneWithoutFavorite_GameInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutFavorite_GameInput>;
  create?: InputMaybe<UserCreateWithoutFavorite_GameInput>;
};

export type UserCreateNestedOneWithoutLeader_BoardInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutLeader_BoardInput>;
  create?: InputMaybe<UserCreateWithoutLeader_BoardInput>;
};

export type UserCreateNestedOneWithoutNftsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutNftsInput>;
  create?: InputMaybe<UserCreateWithoutNftsInput>;
};

export type UserCreateNestedOneWithoutPlatform_AccountInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPlatform_AccountInput>;
  create?: InputMaybe<UserCreateWithoutPlatform_AccountInput>;
};

export type UserCreateNestedOneWithoutPlayTeamMembersInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPlayTeamMembersInput>;
  create?: InputMaybe<UserCreateWithoutPlayTeamMembersInput>;
};

export type UserCreateNestedOneWithoutPlayer_NftInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPlayer_NftInput>;
  create?: InputMaybe<UserCreateWithoutPlayer_NftInput>;
};

export type UserCreateNestedOneWithoutReactionInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutReactionInput>;
  create?: InputMaybe<UserCreateWithoutReactionInput>;
};

export type UserCreateNestedOneWithoutSponsorTransactionsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutSponsorTransactionsInput>;
  create?: InputMaybe<UserCreateWithoutSponsorTransactionsInput>;
};

export type UserCreateNestedOneWithoutStaked_NftInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutStaked_NftInput>;
  create?: InputMaybe<UserCreateWithoutStaked_NftInput>;
};

export type UserCreateNestedOneWithoutTeamMembersInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutTeamMembersInput>;
  create?: InputMaybe<UserCreateWithoutTeamMembersInput>;
};

export type UserCreateNestedOneWithoutTournamentInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutTournamentInput>;
  create?: InputMaybe<UserCreateWithoutTournamentInput>;
};

export type UserCreateNestedOneWithoutTournamentSubscriberInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutTournamentSubscriberInput>;
  create?: InputMaybe<UserCreateWithoutTournamentSubscriberInput>;
};

export type UserCreateNestedOneWithoutUser_TicketInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUser_TicketInput>;
  create?: InputMaybe<UserCreateWithoutUser_TicketInput>;
};

export type UserCreateNestedOneWithoutWithdrawsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutWithdrawsInput>;
  create?: InputMaybe<UserCreateWithoutWithdrawsInput>;
};

export type UserCreateOrConnectWithoutClaim_RaffleInput = {
  create: UserCreateWithoutClaim_RaffleInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutClaim_StakedInput = {
  create: UserCreateWithoutClaim_StakedInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutClaim_TournamentInput = {
  create: UserCreateWithoutClaim_TournamentInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutDailyMissionInput = {
  create: UserCreateWithoutDailyMissionInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutDaily_HistoryInput = {
  create: UserCreateWithoutDaily_HistoryInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutFavorite_GameInput = {
  create: UserCreateWithoutFavorite_GameInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutLeader_BoardInput = {
  create: UserCreateWithoutLeader_BoardInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutNftsInput = {
  create: UserCreateWithoutNftsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutPlatform_AccountInput = {
  create: UserCreateWithoutPlatform_AccountInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutPlayTeamMembersInput = {
  create: UserCreateWithoutPlayTeamMembersInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutPlayer_NftInput = {
  create: UserCreateWithoutPlayer_NftInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutReactionInput = {
  create: UserCreateWithoutReactionInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutSponsorTransactionsInput = {
  create: UserCreateWithoutSponsorTransactionsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutStaked_NftInput = {
  create: UserCreateWithoutStaked_NftInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutTeamMembersInput = {
  create: UserCreateWithoutTeamMembersInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutTournamentInput = {
  create: UserCreateWithoutTournamentInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutTournamentSubscriberInput = {
  create: UserCreateWithoutTournamentSubscriberInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutUser_TicketInput = {
  create: UserCreateWithoutUser_TicketInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutWithdrawsInput = {
  create: UserCreateWithoutWithdrawsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutClaim_RaffleInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutClaim_StakedInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutClaim_TournamentInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutDailyMissionInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutDaily_HistoryInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutFavorite_GameInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutLeader_BoardInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutNftsInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutPlatform_AccountInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutPlayTeamMembersInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutPlayer_NftInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutReactionInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutSponsorTransactionsInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutStaked_NftInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutTeamMembersInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutTournamentInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutTournamentSubscriberInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutUser_TicketInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  withdraws?: InputMaybe<WithdrawTransactionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutWithdrawsInput = {
  balace_history?: InputMaybe<BalanceHistoryCreateNestedManyWithoutUserInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutUserInput>;
  claim_raffle?: InputMaybe<ClaimRaffleTransactionCreateNestedManyWithoutUserInput>;
  claim_staked?: InputMaybe<ClaimStakedTransactionCreateNestedManyWithoutUserInput>;
  claim_tournament?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  dailyMission?: InputMaybe<UserDailyMissionCreateNestedManyWithoutUserInput>;
  daily_history?: InputMaybe<MissionHistoryCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  nfts?: InputMaybe<NftCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  platform_account?: InputMaybe<PlatformAccountCreateNestedManyWithoutUserInput>;
  platform_uid?: InputMaybe<Scalars['String']>;
  playTeamMembers?: InputMaybe<PlayTeamMemberCreateNestedManyWithoutUserInput>;
  player_nft?: InputMaybe<PlayerNftCreateNestedOneWithoutUserInput>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  staked_nft?: InputMaybe<StakedCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_bonus?: InputMaybe<UserBonusCreateNestedOneWithoutUserInput>;
  user_ticket?: InputMaybe<UserTicketCreateNestedManyWithoutUserInput>;
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

export type UserDailyMissionCreateManyMissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game_uid?: InputMaybe<Scalars['String']>;
  player_mission_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type UserDailyMissionCreateManyMissionInputEnvelope = {
  data: Array<UserDailyMissionCreateManyMissionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserDailyMissionCreateManyPlayer_MissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game_uid?: InputMaybe<Scalars['String']>;
  mission_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type UserDailyMissionCreateManyPlayer_MissionInputEnvelope = {
  data: Array<UserDailyMissionCreateManyPlayer_MissionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserDailyMissionCreateManyUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game_uid?: InputMaybe<Scalars['String']>;
  mission_uid: Scalars['String'];
  player_mission_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserDailyMissionCreateManyUserInputEnvelope = {
  data: Array<UserDailyMissionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserDailyMissionCreateNestedManyWithoutMissionInput = {
  connect?: InputMaybe<Array<UserDailyMissionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserDailyMissionCreateOrConnectWithoutMissionInput>>;
  create?: InputMaybe<Array<UserDailyMissionCreateWithoutMissionInput>>;
  createMany?: InputMaybe<UserDailyMissionCreateManyMissionInputEnvelope>;
};

export type UserDailyMissionCreateNestedManyWithoutPlayer_MissionInput = {
  connect?: InputMaybe<Array<UserDailyMissionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserDailyMissionCreateOrConnectWithoutPlayer_MissionInput>>;
  create?: InputMaybe<Array<UserDailyMissionCreateWithoutPlayer_MissionInput>>;
  createMany?: InputMaybe<UserDailyMissionCreateManyPlayer_MissionInputEnvelope>;
};

export type UserDailyMissionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserDailyMissionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserDailyMissionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserDailyMissionCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserDailyMissionCreateManyUserInputEnvelope>;
};

export type UserDailyMissionCreateOrConnectWithoutMissionInput = {
  create: UserDailyMissionCreateWithoutMissionInput;
  where: UserDailyMissionWhereUniqueInput;
};

export type UserDailyMissionCreateOrConnectWithoutPlayer_MissionInput = {
  create: UserDailyMissionCreateWithoutPlayer_MissionInput;
  where: UserDailyMissionWhereUniqueInput;
};

export type UserDailyMissionCreateOrConnectWithoutUserInput = {
  create: UserDailyMissionCreateWithoutUserInput;
  where: UserDailyMissionWhereUniqueInput;
};

export type UserDailyMissionCreateWithoutMissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game_uid?: InputMaybe<Scalars['String']>;
  player_mission: PlayerMissionCreateNestedOneWithoutDaily_MissionInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutDailyMissionInput;
};

export type UserDailyMissionCreateWithoutPlayer_MissionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game_uid?: InputMaybe<Scalars['String']>;
  mission: MissionCreateNestedOneWithoutUser_Daily_MissionInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutDailyMissionInput;
};

export type UserDailyMissionCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  game_uid?: InputMaybe<Scalars['String']>;
  mission: MissionCreateNestedOneWithoutUser_Daily_MissionInput;
  player_mission: PlayerMissionCreateNestedOneWithoutDaily_MissionInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserDailyMissionUser_Player_MissionCompoundUniqueInput = {
  player_mission_uid: Scalars['String'];
  user_id: Scalars['Int'];
};

export type UserDailyMissionWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
  user_player_mission?: InputMaybe<UserDailyMissionUser_Player_MissionCompoundUniqueInput>;
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

export type UserFavoriteGameCreateManyGameInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  enable_favorite?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type UserFavoriteGameCreateManyGameInputEnvelope = {
  data: Array<UserFavoriteGameCreateManyGameInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserFavoriteGameCreateManyUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  enable_favorite?: InputMaybe<Scalars['Boolean']>;
  game_uid: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserFavoriteGameCreateManyUserInputEnvelope = {
  data: Array<UserFavoriteGameCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserFavoriteGameCreateNestedManyWithoutGameInput = {
  connect?: InputMaybe<Array<UserFavoriteGameWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserFavoriteGameCreateOrConnectWithoutGameInput>>;
  create?: InputMaybe<Array<UserFavoriteGameCreateWithoutGameInput>>;
  createMany?: InputMaybe<UserFavoriteGameCreateManyGameInputEnvelope>;
};

export type UserFavoriteGameCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserFavoriteGameWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserFavoriteGameCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserFavoriteGameCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserFavoriteGameCreateManyUserInputEnvelope>;
};

export type UserFavoriteGameCreateOrConnectWithoutGameInput = {
  create: UserFavoriteGameCreateWithoutGameInput;
  where: UserFavoriteGameWhereUniqueInput;
};

export type UserFavoriteGameCreateOrConnectWithoutUserInput = {
  create: UserFavoriteGameCreateWithoutUserInput;
  where: UserFavoriteGameWhereUniqueInput;
};

export type UserFavoriteGameCreateWithoutGameInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  enable_favorite?: InputMaybe<Scalars['Boolean']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutFavorite_GameInput;
};

export type UserFavoriteGameCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  enable_favorite?: InputMaybe<Scalars['Boolean']>;
  game: GameCreateNestedOneWithoutFavorite_UserInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserFavoriteGameWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type UserGraphql = {
  __typename?: 'UserGraphql';
  _count: UserCount;
  balace_history?: Maybe<Array<BalanceHistory>>;
  balance?: Maybe<Balance>;
  claim_raffle?: Maybe<Array<ClaimRaffleTransaction>>;
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
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  nfts?: Maybe<Array<Nft>>;
  notification?: Maybe<Array<Notification>>;
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
  user_bonus?: Maybe<UserBonus>;
  user_ticket?: Maybe<Array<UserTicket>>;
  withdraws?: Maybe<Array<WithdrawTransaction>>;
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

export type UserProfileCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<UserProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserProfileCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<UserProfileCreateWithoutUserInput>;
};

export type UserProfileCreateOrConnectWithoutUserInput = {
  create: UserProfileCreateWithoutUserInput;
  where: UserProfileWhereUniqueInput;
};

export type UserProfileCreateWithoutUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  biography?: InputMaybe<Scalars['String']>;
  country_code?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  discord?: InputMaybe<Scalars['String']>;
  display_name?: InputMaybe<Scalars['String']>;
  facebook?: InputMaybe<Scalars['String']>;
  family_name?: InputMaybe<Scalars['String']>;
  given_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  telegram?: InputMaybe<Scalars['String']>;
  twitch?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_name?: InputMaybe<Scalars['String']>;
  youtube?: InputMaybe<Scalars['String']>;
};

export type UserProfileInput = {
  user_id?: InputMaybe<Scalars['Int']>;
  user_name?: InputMaybe<Scalars['String']>;
};

export type UserProfileWhereUniqueInput = {
  user_id?: InputMaybe<Scalars['Int']>;
  user_name?: InputMaybe<Scalars['String']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum UserStatus {
  Active = 'ACTIVE',
  Banned = 'BANNED'
}

export type UserTeam = {
  __typename?: 'UserTeam';
  participant?: Maybe<Scalars['Int']>;
  team?: Maybe<Array<Member>>;
  team_avatar?: Maybe<Scalars['String']>;
  team_name?: Maybe<Scalars['String']>;
  team_uid?: Maybe<Scalars['String']>;
};

export type UserTicket = {
  __typename?: 'UserTicket';
  claim_transaction?: Maybe<ClaimRaffleTransaction>;
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

export type UserTicketCreateManyUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_claimed?: InputMaybe<Scalars['Boolean']>;
  is_winner?: InputMaybe<Scalars['Boolean']>;
  ticket_number?: InputMaybe<Scalars['String']>;
  ticket_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserTicketCreateManyUserInputEnvelope = {
  data: Array<UserTicketCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserTicketCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserTicketWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserTicketCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserTicketCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserTicketCreateManyUserInputEnvelope>;
};

export type UserTicketCreateNestedOneWithoutClaim_TransactionInput = {
  connect?: InputMaybe<UserTicketWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserTicketCreateOrConnectWithoutClaim_TransactionInput>;
  create?: InputMaybe<UserTicketCreateWithoutClaim_TransactionInput>;
};

export type UserTicketCreateOrConnectWithoutClaim_TransactionInput = {
  create: UserTicketCreateWithoutClaim_TransactionInput;
  where: UserTicketWhereUniqueInput;
};

export type UserTicketCreateOrConnectWithoutUserInput = {
  create: UserTicketCreateWithoutUserInput;
  where: UserTicketWhereUniqueInput;
};

export type UserTicketCreateWithoutClaim_TransactionInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_claimed?: InputMaybe<Scalars['Boolean']>;
  is_winner?: InputMaybe<Scalars['Boolean']>;
  ticket: TicketCreateNestedOneWithoutUser_TicketInput;
  ticket_number?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutUser_TicketInput;
};

export type UserTicketCreateWithoutUserInput = {
  claim_transaction?: InputMaybe<ClaimRaffleTransactionCreateNestedOneWithoutUser_TicketInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_claimed?: InputMaybe<Scalars['Boolean']>;
  is_winner?: InputMaybe<Scalars['Boolean']>;
  ticket: TicketCreateNestedOneWithoutUser_TicketInput;
  ticket_number?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
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

export type UserTicketWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  google_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
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

export type WithdrawTransactionCreateManyCurrencyInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
  user_id: Scalars['Int'];
};

export type WithdrawTransactionCreateManyCurrencyInputEnvelope = {
  data: Array<WithdrawTransactionCreateManyCurrencyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type WithdrawTransactionCreateManyUserInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type WithdrawTransactionCreateManyUserInputEnvelope = {
  data: Array<WithdrawTransactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type WithdrawTransactionCreateNestedManyWithoutCurrencyInput = {
  connect?: InputMaybe<Array<WithdrawTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WithdrawTransactionCreateOrConnectWithoutCurrencyInput>>;
  create?: InputMaybe<Array<WithdrawTransactionCreateWithoutCurrencyInput>>;
  createMany?: InputMaybe<WithdrawTransactionCreateManyCurrencyInputEnvelope>;
};

export type WithdrawTransactionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<WithdrawTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WithdrawTransactionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<WithdrawTransactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<WithdrawTransactionCreateManyUserInputEnvelope>;
};

export type WithdrawTransactionCreateOrConnectWithoutCurrencyInput = {
  create: WithdrawTransactionCreateWithoutCurrencyInput;
  where: WithdrawTransactionWhereUniqueInput;
};

export type WithdrawTransactionCreateOrConnectWithoutUserInput = {
  create: WithdrawTransactionCreateWithoutUserInput;
  where: WithdrawTransactionWhereUniqueInput;
};

export type WithdrawTransactionCreateWithoutCurrencyInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
  user: UserCreateNestedOneWithoutWithdrawsInput;
};

export type WithdrawTransactionCreateWithoutUserInput = {
  amount: Scalars['Decimal'];
  block?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutWithdrawTransactionsInput;
  fee?: InputMaybe<Scalars['Decimal']>;
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type WithdrawTransactionWhereUniqueInput = {
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};
