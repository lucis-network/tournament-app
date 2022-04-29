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

export type BracketCreateNestedOneWithoutBracketTeamsInput = {
  connect?: InputMaybe<BracketWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BracketCreateOrConnectWithoutBracketTeamsInput>;
  create?: InputMaybe<BracketCreateWithoutBracketTeamsInput>;
};

export type BracketCreateOrConnectWithoutBracketMatchsInput = {
  create: BracketCreateWithoutBracketMatchsInput;
  where: BracketWhereUniqueInput;
};

export type BracketCreateOrConnectWithoutBracketRoundsInput = {
  create: BracketCreateWithoutBracketRoundsInput;
  where: BracketWhereUniqueInput;
};

export type BracketCreateOrConnectWithoutBracketTeamsInput = {
  create: BracketCreateWithoutBracketTeamsInput;
  where: BracketWhereUniqueInput;
};

export type BracketCreateOrConnectWithoutTournamentInput = {
  create: BracketCreateWithoutTournamentInput;
  where: BracketWhereUniqueInput;
};

export type BracketCreateWithoutBracketMatchsInput = {
  bracketRounds?: InputMaybe<BracketRoundCreateNestedManyWithoutBracketInput>;
  bracketTeams?: InputMaybe<BracketTeamCreateNestedManyWithoutBracketInput>;
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
  bracketTeams?: InputMaybe<BracketTeamCreateNestedManyWithoutBracketInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  start_at: Scalars['DateTime'];
  status?: InputMaybe<BracketStatus>;
  tournament: TournamentCreateNestedOneWithoutBracketsInput;
  type: BracketType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketCreateWithoutBracketTeamsInput = {
  bracketMatchs?: InputMaybe<BracketMatchCreateNestedManyWithoutBracketInput>;
  bracketRounds?: InputMaybe<BracketRoundCreateNestedManyWithoutBracketInput>;
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
  bracketTeams?: InputMaybe<BracketTeamCreateNestedManyWithoutBracketInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  start_at: Scalars['DateTime'];
  status?: InputMaybe<BracketStatus>;
  type: BracketType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketMatch = {
  __typename?: "BracketMatch";
  bracket: Bracket;
<<<<<<< HEAD
  bracket_uid: Scalars["String"];
  created_at: Scalars["DateTime"];
  link_stream?: Maybe<Scalars["String"]>;
  lower_match_id?: Maybe<Scalars["String"]>;
  next_match_id?: Maybe<Scalars["String"]>;
  pre_match_id?: Maybe<Scalars["String"]>;
  round_uid: Scalars["String"];
  score_1?: Maybe<Scalars["Int"]>;
  score_2?: Maybe<Scalars["Int"]>;
=======
  bracket_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  first_match_id?: Maybe<Scalars['String']>;
  link_stream?: Maybe<Scalars['String']>;
  lower_match_id?: Maybe<Scalars['String']>;
  round: BracketRound;
  round_uid: Scalars['String'];
  score_1?: Maybe<Scalars['Int']>;
  score_2?: Maybe<Scalars['Int']>;
  second_match_id?: Maybe<Scalars['String']>;
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
  status: BracketMatchStatus;
  team_1?: Maybe<Scalars["String"]>;
  team_2?: Maybe<Scalars["String"]>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  uper_match_id?: Maybe<Scalars["String"]>;
};

export type BracketMatchCreateManyBracketInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  first_match_id?: InputMaybe<Scalars['String']>;
  link_stream?: InputMaybe<Scalars['String']>;
  lower_match_id?: InputMaybe<Scalars['String']>;
  round_uid: Scalars['String'];
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  team_1?: InputMaybe<Scalars['String']>;
  team_2?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  uper_match_id?: InputMaybe<Scalars['String']>;
};

export type BracketMatchCreateManyBracketInputEnvelope = {
  data: Array<BracketMatchCreateManyBracketInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BracketMatchCreateManyRoundInput = {
  bracket_uid: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  first_match_id?: InputMaybe<Scalars['String']>;
  link_stream?: InputMaybe<Scalars['String']>;
  lower_match_id?: InputMaybe<Scalars['String']>;
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  team_1?: InputMaybe<Scalars['String']>;
  team_2?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  uper_match_id?: InputMaybe<Scalars['String']>;
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
  first_match_id?: InputMaybe<Scalars['String']>;
  link_stream?: InputMaybe<Scalars['String']>;
  lower_match_id?: InputMaybe<Scalars['String']>;
  round: BracketRoundCreateNestedOneWithoutBracketMatchsInput;
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  team_1?: InputMaybe<Scalars['String']>;
  team_2?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  uper_match_id?: InputMaybe<Scalars['String']>;
};

export type BracketMatchCreateWithoutRoundInput = {
  bracket: BracketCreateNestedOneWithoutBracketMatchsInput;
  created_at?: InputMaybe<Scalars['DateTime']>;
  first_match_id?: InputMaybe<Scalars['String']>;
  link_stream?: InputMaybe<Scalars['String']>;
  lower_match_id?: InputMaybe<Scalars['String']>;
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  team_1?: InputMaybe<Scalars['String']>;
  team_2?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  uper_match_id?: InputMaybe<Scalars['String']>;
};

export enum BracketMatchStatus {
  Complete = "COMPLETE",
  Pending = "PENDING",
}

export type BracketMatchUpdateInputGql = {
  /** Finish match */
  finish_match?: InputMaybe<Scalars['Boolean']>;
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
<<<<<<< HEAD
  __typename?: "BracketRound";
  bracket: Bracket;
  bracket_uid: Scalars["String"];
  created_at: Scalars["DateTime"];
  start_at: Scalars["DateTime"];
  title: Scalars["String"];
=======
  __typename?: 'BracketRound';
  _count: BracketRoundCount;
  bracket: Bracket;
  bracketMatchs?: Maybe<Array<BracketMatch>>;
  bracket_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  start_at: Scalars['DateTime'];
  title: Scalars['String'];
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
  type: BracketRoundType;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type BracketRoundCount = {
  __typename?: 'BracketRoundCount';
  bracketMatchs: Scalars['Int'];
};

export type BracketRoundCreateInputGql = {
<<<<<<< HEAD
  start_at: Scalars["DateTime"];
  title: Scalars["String"];
=======
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
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
  type?: InputMaybe<BracketRoundType>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export enum BracketRoundType {
<<<<<<< HEAD
  Lower = "LOWER",
  Upper = "UPPER",
=======
  Final = 'FINAL',
  Lower = 'LOWER',
  Upper = 'UPPER'
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
}

export type BracketRoundWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

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

export type BracketTeamCreateManyBracketInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  team_uid: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketTeamCreateManyBracketInputEnvelope = {
  data: Array<BracketTeamCreateManyBracketInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BracketTeamCreateManyTeamInput = {
  bracket_uid: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketTeamCreateManyTeamInputEnvelope = {
  data: Array<BracketTeamCreateManyTeamInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BracketTeamCreateNestedManyWithoutBracketInput = {
  connect?: InputMaybe<Array<BracketTeamWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BracketTeamCreateOrConnectWithoutBracketInput>>;
  create?: InputMaybe<Array<BracketTeamCreateWithoutBracketInput>>;
  createMany?: InputMaybe<BracketTeamCreateManyBracketInputEnvelope>;
};

export type BracketTeamCreateNestedManyWithoutTeamInput = {
  connect?: InputMaybe<Array<BracketTeamWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BracketTeamCreateOrConnectWithoutTeamInput>>;
  create?: InputMaybe<Array<BracketTeamCreateWithoutTeamInput>>;
  createMany?: InputMaybe<BracketTeamCreateManyTeamInputEnvelope>;
};

export type BracketTeamCreateOrConnectWithoutBracketInput = {
  create: BracketTeamCreateWithoutBracketInput;
  where: BracketTeamWhereUniqueInput;
};

export type BracketTeamCreateOrConnectWithoutTeamInput = {
  create: BracketTeamCreateWithoutTeamInput;
  where: BracketTeamWhereUniqueInput;
};

export type BracketTeamCreateWithoutBracketInput = {
  bracketTeamMembers?: InputMaybe<BracketTeamMembersCreateNestedManyWithoutBracketTeamInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  team: TeamCreateNestedOneWithoutBracketTeamInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketTeamCreateWithoutTeamInput = {
  bracket: BracketCreateNestedOneWithoutBracketTeamsInput;
  bracketTeamMembers?: InputMaybe<BracketTeamMembersCreateNestedManyWithoutBracketTeamInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
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

export type BracketTeamMembersCreateManyBracketTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_in_game?: InputMaybe<Scalars['String']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  prize_alloc?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type BracketTeamMembersCreateManyBracketTeamInputEnvelope = {
  data: Array<BracketTeamMembersCreateManyBracketTeamInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BracketTeamMembersCreateNestedManyWithoutBracketTeamInput = {
  connect?: InputMaybe<Array<BracketTeamMembersWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BracketTeamMembersCreateOrConnectWithoutBracketTeamInput>>;
  create?: InputMaybe<Array<BracketTeamMembersCreateWithoutBracketTeamInput>>;
  createMany?: InputMaybe<BracketTeamMembersCreateManyBracketTeamInputEnvelope>;
};

export type BracketTeamMembersCreateOrConnectWithoutBracketTeamInput = {
  create: BracketTeamMembersCreateWithoutBracketTeamInput;
  where: BracketTeamMembersWhereUniqueInput;
};

export type BracketTeamMembersCreateWithoutBracketTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_in_game?: InputMaybe<Scalars['String']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  prize_alloc?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type BracketTeamMembersWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type BracketTeamWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export enum BracketType {
  BattleRoyale = "BATTLE_ROYALE",
  Double = "DOUBLE",
  RoundRobin = "ROUND_ROBIN",
  Single = "SINGLE",
  Swiss = "SWISS",
}

export type BracketWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

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

export type ChainCreateNestedOneWithoutCurrencyInput = {
  connect?: InputMaybe<ChainWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChainCreateOrConnectWithoutCurrencyInput>;
  create?: InputMaybe<ChainCreateWithoutCurrencyInput>;
};

export type ChainCreateOrConnectWithoutCurrencyInput = {
  create: ChainCreateWithoutCurrencyInput;
  where: ChainWhereUniqueInput;
};

export type ChainCreateWithoutCurrencyInput = {
  Contracts?: InputMaybe<ContractsCreateNestedManyWithoutChainInput>;
  chain_id?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  rpc_url?: InputMaybe<Scalars['String']>;
  symbol: ChainSymbol;
  updated_at?: InputMaybe<Scalars['DateTime']>;
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

export type ChainWhereUniqueInput = {
  symbol?: InputMaybe<ChainSymbol>;
};

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

export type ClaimTransactionsCreateManyTournamentsInput = {
  amount?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
  user_id: Scalars['Int'];
};

export type ClaimTransactionsCreateManyTournamentsInputEnvelope = {
  data: Array<ClaimTransactionsCreateManyTournamentsInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ClaimTransactionsCreateManyUserInput = {
  amount?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  tournament_uid: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type ClaimTransactionsCreateManyUserInputEnvelope = {
  data: Array<ClaimTransactionsCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ClaimTransactionsCreateNestedManyWithoutTournamentsInput = {
  connect?: InputMaybe<Array<ClaimTransactionsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ClaimTransactionsCreateOrConnectWithoutTournamentsInput>>;
  create?: InputMaybe<Array<ClaimTransactionsCreateWithoutTournamentsInput>>;
  createMany?: InputMaybe<ClaimTransactionsCreateManyTournamentsInputEnvelope>;
};

export type ClaimTransactionsCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ClaimTransactionsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ClaimTransactionsCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ClaimTransactionsCreateWithoutUserInput>>;
  createMany?: InputMaybe<ClaimTransactionsCreateManyUserInputEnvelope>;
};

export type ClaimTransactionsCreateOrConnectWithoutTournamentsInput = {
  create: ClaimTransactionsCreateWithoutTournamentsInput;
  where: ClaimTransactionsWhereUniqueInput;
};

export type ClaimTransactionsCreateOrConnectWithoutUserInput = {
  create: ClaimTransactionsCreateWithoutUserInput;
  where: ClaimTransactionsWhereUniqueInput;
};

export type ClaimTransactionsCreateWithoutTournamentsInput = {
  amount?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
  user: UserCreateNestedOneWithoutClaimInput;
};

export type ClaimTransactionsCreateWithoutUserInput = {
  amount?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  tournaments: TournamentCreateNestedOneWithoutClaim_TransactionsInput;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type ClaimTransactionsWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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

<<<<<<< HEAD
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
=======
export type ContractsCreateManyChainInput = {
  address?: InputMaybe<Scalars['String']>;
  admin?: InputMaybe<Scalars['String']>;
  admin_prv_key?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_symbol?: InputMaybe<Scalars['String']>;
  is_transfered?: InputMaybe<Scalars['Int']>;
  owner?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type ContractsCreateManyChainInputEnvelope = {
  data: Array<ContractsCreateManyChainInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ContractsCreateNestedManyWithoutChainInput = {
  connect?: InputMaybe<Array<ContractsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ContractsCreateOrConnectWithoutChainInput>>;
  create?: InputMaybe<Array<ContractsCreateWithoutChainInput>>;
  createMany?: InputMaybe<ContractsCreateManyChainInputEnvelope>;
};

export type ContractsCreateOrConnectWithoutChainInput = {
  create: ContractsCreateWithoutChainInput;
  where: ContractsWhereUniqueInput;
};

export type ContractsCreateWithoutChainInput = {
  address?: InputMaybe<Scalars['String']>;
  admin?: InputMaybe<Scalars['String']>;
  admin_prv_key?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_symbol?: InputMaybe<Scalars['String']>;
  is_transfered?: InputMaybe<Scalars['Int']>;
  owner?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type ContractsWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type Currency = {
  __typename?: 'Currency';
  _count: CurrencyCount;
  address?: Maybe<Scalars['String']>;
  chain?: Maybe<Chain>;
  chain_symbol?: Maybe<ChainSymbol>;
  created_at: Scalars['DateTime'];
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
  tournaments?: Maybe<Array<Tournament>>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type CurrencyCount = {
  __typename?: "CurrencyCount";
  tournaments: Scalars["Int"];
};

export type CurrencyCreateNestedOneWithoutTournamentsInput = {
  connect?: InputMaybe<CurrencyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CurrencyCreateOrConnectWithoutTournamentsInput>;
  create?: InputMaybe<CurrencyCreateWithoutTournamentsInput>;
};

export type CurrencyCreateOrConnectWithoutTournamentsInput = {
  create: CurrencyCreateWithoutTournamentsInput;
  where: CurrencyWhereUniqueInput;
};

export type CurrencyCreateWithoutTournamentsInput = {
  address?: InputMaybe<Scalars['String']>;
  chain?: InputMaybe<ChainCreateNestedOneWithoutCurrencyInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
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

export type CurrencyWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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

export type DonateTransactionCreateManyTournamentsInput = {
  amount?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  from: Scalars['String'];
  to: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<DonateTransactionsType>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type DonateTransactionCreateManyTournamentsInputEnvelope = {
  data: Array<DonateTransactionCreateManyTournamentsInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type DonateTransactionCreateNestedManyWithoutTournamentsInput = {
  connect?: InputMaybe<Array<DonateTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DonateTransactionCreateOrConnectWithoutTournamentsInput>>;
  create?: InputMaybe<Array<DonateTransactionCreateWithoutTournamentsInput>>;
  createMany?: InputMaybe<DonateTransactionCreateManyTournamentsInputEnvelope>;
};

export type DonateTransactionCreateOrConnectWithoutTournamentsInput = {
  create: DonateTransactionCreateWithoutTournamentsInput;
  where: DonateTransactionWhereUniqueInput;
};

export type DonateTransactionCreateWithoutTournamentsInput = {
  amount?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  from: Scalars['String'];
  to: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<DonateTransactionsType>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type DonateTransactionWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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

export type GameCreateNestedOneWithoutFavorite_UserInput = {
  connect?: InputMaybe<GameWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GameCreateOrConnectWithoutFavorite_UserInput>;
  create?: InputMaybe<GameCreateWithoutFavorite_UserInput>;
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

export type GameCreateOrConnectWithoutTournamentsInput = {
  create: GameCreateWithoutTournamentsInput;
  where: GameWhereUniqueInput;
};

export type GameCreateWithoutFavorite_UserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
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
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type GameWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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
  /** Only referee can update match result */
  updateMatchResult?: Maybe<Scalars['String']>;
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

<<<<<<< HEAD
=======

export type MutationUpdateMatchResultArgs = {
  input: BracketMatchUpdateInputGql;
};


>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
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
  getJoinedTournament?: Maybe<Array<TTournament>>;
  getOnGoingTournament?: Maybe<Array<Tournament>>;
  getOwnerTournament?: Maybe<Array<TTournament>>;
  getReferee?: Maybe<Array<Referee>>;
  getTeam?: Maybe<Array<UserTeam>>;
  getUpComingTournament?: Maybe<Array<Tournament>>;
  me?: Maybe<UserGraphql>;
  regions?: Maybe<Array<Region>>;
  search?: Maybe<Array<Tournament>>;
  searchJoinedTeam?: Maybe<Array<TTournament>>;
  searchTeam?: Maybe<Array<UserTeam>>;
  verifyEmail?: Maybe<Scalars['Boolean']>;
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

<<<<<<< HEAD
=======

export type QuerySearchJoinedTeamArgs = {
  value: Scalars['String'];
};


>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
export type QuerySearchTeamArgs = {
  name: Scalars["String"];
};


export type QueryVerifyEmailArgs = {
  email: Scalars['String'];
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

export enum ReactionType {
  Dislike = "DISLIKE",
  Hear = "HEAR",
  Like = "LIKE",
}

export type ReactionWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type Referee = {
  __typename?: "Referee";
  created_at: Scalars["DateTime"];
  desc?: Maybe<Scalars["String"]>;
  updated_at: Scalars["DateTime"];
  user?: Maybe<User>;
  user_id: Scalars["ID"];
};

export type RefereeCreateManyUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type RefereeCreateManyUserInputEnvelope = {
  data: Array<RefereeCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type RefereeCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<RefereeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RefereeCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RefereeCreateWithoutUserInput>>;
  createMany?: InputMaybe<RefereeCreateManyUserInputEnvelope>;
};

export type RefereeCreateOrConnectWithoutUserInput = {
  create: RefereeCreateWithoutUserInput;
  where: RefereeWhereUniqueInput;
};

export type RefereeCreateWithoutUserInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type RefereeWhereUniqueInput = {
  user_id?: InputMaybe<Scalars['Int']>;
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
<<<<<<< HEAD
  cover?: InputMaybe<Scalars["String"]>;
  max: Scalars["Int"];
  min: Scalars["Int"];
  name?: InputMaybe<Scalars["String"]>;
  show_ads?: InputMaybe<Scalars["Boolean"]>;
  show_logo?: InputMaybe<Scalars["Boolean"]>;
  show_name?: InputMaybe<Scalars["Boolean"]>;
  uid?: InputMaybe<Scalars["String"]>;
=======
  cover?: InputMaybe<Scalars['String']>;
  max: Scalars['Int'];
  min: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  show_ads?: InputMaybe<Scalars['Boolean']>;
  show_logo?: InputMaybe<Scalars['Boolean']>;
  show_name?: InputMaybe<Scalars['Boolean']>;
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
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
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

export type SponsorTransactionCreateManySponsor_SlotInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid: Scalars['String'];
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
  created_at?: InputMaybe<Scalars['DateTime']>;
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  sponsor_slot_uid: Scalars['String'];
  tx_hash?: InputMaybe<Scalars['String']>;
  uid: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type SponsorTransactionCreateManyUserInputEnvelope = {
  data: Array<SponsorTransactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
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

export type SponsorTransactionCreateOrConnectWithoutSponsor_SlotInput = {
  create: SponsorTransactionCreateWithoutSponsor_SlotInput;
  where: SponsorTransactionWhereUniqueInput;
};

export type SponsorTransactionCreateOrConnectWithoutUserInput = {
  create: SponsorTransactionCreateWithoutUserInput;
  where: SponsorTransactionWhereUniqueInput;
};

export type SponsorTransactionCreateWithoutSponsor_SlotInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutSponsorTransactionInput;
};

export type SponsorTransactionCreateWithoutUserInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  sponsor_slot: SponsorSlotCreateNestedOneWithoutSponsor_TransactionsInput;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type SponsorTransactionWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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
<<<<<<< HEAD
  game_uid: Scalars["String"];
  join_fee?: Maybe<Scalars["Decimal"]>;
  name: Scalars["String"];
  participants: Scalars["Int"];
  pool_size: Scalars["Decimal"];
  prize_allocation: Scalars["JSON"];
=======
  game_uid: Scalars['String'];
  join_fee?: Maybe<Scalars['Decimal']>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
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
<<<<<<< HEAD
  tournament_type?: Maybe<TournamentType>;
  turns?: Maybe<Scalars["Int"]>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
  user_id: Scalars["Int"];
=======
  turns?: Maybe<Scalars['Int']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
};

export type Team = {
  __typename?: "Team";
  BracketTeam?: Maybe<Array<BracketTeam>>;
  _count: TeamCount;
<<<<<<< HEAD
  avatar?: Maybe<Scalars["String"]>;
  created_at: Scalars["DateTime"];
  created_by: Scalars["Int"];
  name: Scalars["String"];
=======
  avatar?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  created_by: Scalars['Int'];
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  name: Scalars['String'];
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
  team_members?: Maybe<Array<TeamMember>>;
  uid: Scalars["ID"];
  updated_at: Scalars["DateTime"];
};

export type TeamCount = {
<<<<<<< HEAD
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
=======
  __typename?: 'TeamCount';
  BracketTeam: Scalars['Int'];
  leader_board: Scalars['Int'];
  team_members: Scalars['Int'];
};

export type TeamCreateNestedOneWithoutBracketTeamInput = {
  connect?: InputMaybe<TeamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeamCreateOrConnectWithoutBracketTeamInput>;
  create?: InputMaybe<TeamCreateWithoutBracketTeamInput>;
};

export type TeamCreateNestedOneWithoutLeader_BoardInput = {
  connect?: InputMaybe<TeamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeamCreateOrConnectWithoutLeader_BoardInput>;
  create?: InputMaybe<TeamCreateWithoutLeader_BoardInput>;
};

export type TeamCreateNestedOneWithoutTeam_MembersInput = {
  connect?: InputMaybe<TeamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeamCreateOrConnectWithoutTeam_MembersInput>;
  create?: InputMaybe<TeamCreateWithoutTeam_MembersInput>;
};

export type TeamCreateOrConnectWithoutBracketTeamInput = {
  create: TeamCreateWithoutBracketTeamInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutLeader_BoardInput = {
  create: TeamCreateWithoutLeader_BoardInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutTeam_MembersInput = {
  create: TeamCreateWithoutTeam_MembersInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateWithoutBracketTeamInput = {
  avatar?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  created_by: Scalars['Int'];
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTeamInput>;
  name: Scalars['String'];
  team_members?: InputMaybe<TeamMemberCreateNestedManyWithoutTeamInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TeamCreateWithoutLeader_BoardInput = {
  BracketTeam?: InputMaybe<BracketTeamCreateNestedManyWithoutTeamInput>;
  avatar?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  created_by: Scalars['Int'];
  name: Scalars['String'];
  team_members?: InputMaybe<TeamMemberCreateNestedManyWithoutTeamInput>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TeamCreateWithoutTeam_MembersInput = {
  BracketTeam?: InputMaybe<BracketTeamCreateNestedManyWithoutTeamInput>;
  avatar?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  created_by: Scalars['Int'];
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTeamInput>;
  name: Scalars['String'];
  uid?: InputMaybe<Scalars['String']>;
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
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
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
<<<<<<< HEAD
  game_uid: Scalars["String"];
  invite_link?: Maybe<Scalars["String"]>;
  join_fee?: Maybe<Scalars["Decimal"]>;
  name: Scalars["String"];
  participants: Scalars["Int"];
  password?: Maybe<Scalars["String"]>;
  pool_size: Scalars["Decimal"];
  prize_allocation: Scalars["JSON"];
=======
  game_uid: Scalars['String'];
  invite_link?: Maybe<Scalars['String']>;
  join_fee?: Maybe<Scalars['Decimal']>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: Maybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
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
<<<<<<< HEAD
  __typename?: "TournamentCount";
  brackets: Scalars["Int"];
  claim_transactions: Scalars["Int"];
  donate_transactions: Scalars["Int"];
  reaction: Scalars["Int"];
  sponsorSlot: Scalars["Int"];
  tournament_subscribes: Scalars["Int"];
=======
  __typename?: 'TournamentCount';
  brackets: Scalars['Int'];
  claim_transactions: Scalars['Int'];
  donate_transactions: Scalars['Int'];
  leader_board: Scalars['Int'];
  reaction: Scalars['Int'];
  sponsorSlot: Scalars['Int'];
  tournament_subscribes: Scalars['Int'];
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
};

export type TournamentCreateInputGql = {
  bracket_type: BracketType;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
<<<<<<< HEAD
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
=======
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  desc?: InputMaybe<Scalars['String']>;
  game_uid: Scalars['String'];
  join_fee?: InputMaybe<Scalars['Float']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Float'];
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
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

export type TournamentCreateManyGameInput = {
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  desc?: InputMaybe<Scalars['String']>;
  invite_link?: InputMaybe<Scalars['String']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
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
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  desc?: InputMaybe<Scalars['String']>;
  game_uid: Scalars['String'];
  invite_link?: InputMaybe<Scalars['String']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
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

export type TournamentCreateNestedOneWithoutLeader_BoardInput = {
  connect?: InputMaybe<TournamentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TournamentCreateOrConnectWithoutLeader_BoardInput>;
  create?: InputMaybe<TournamentCreateWithoutLeader_BoardInput>;
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

export type TournamentCreateOrConnectWithoutGameInput = {
  create: TournamentCreateWithoutGameInput;
  where: TournamentWhereUniqueInput;
};

export type TournamentCreateOrConnectWithoutLeader_BoardInput = {
  create: TournamentCreateWithoutLeader_BoardInput;
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
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  status?: InputMaybe<TournamentStatus>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutClaim_TransactionsInput = {
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  status?: InputMaybe<TournamentStatus>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutGameInput = {
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  invite_link?: InputMaybe<Scalars['String']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  status?: InputMaybe<TournamentStatus>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutLeader_BoardInput = {
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  status?: InputMaybe<TournamentStatus>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutReactionInput = {
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  status?: InputMaybe<TournamentStatus>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutSponsorSlotInput = {
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TournamentStatus>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutTournament_SubscribesInput = {
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  status?: InputMaybe<TournamentStatus>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutTournamentInput;
};

export type TournamentCreateWithoutUserInput = {
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutTournamentsInput>;
  cover: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency: CurrencyCreateNestedOneWithoutTournamentsInput;
  desc?: InputMaybe<Scalars['String']>;
  donate_transactions?: InputMaybe<DonateTransactionCreateNestedManyWithoutTournamentsInput>;
  game: GameCreateNestedOneWithoutTournamentsInput;
  invite_link?: InputMaybe<Scalars['String']>;
  join_fee?: InputMaybe<Scalars['Decimal']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutTournamentInput>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  status?: InputMaybe<TournamentStatus>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournament_subscribes?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutTournamentsInput>;
  turns?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
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

export type TournamentLeaderBoard = {
  __typename?: 'TournamentLeaderBoard';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  rank: Scalars['Int'];
  team: Team;
  team_uid: Scalars['String'];
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type TournamentLeaderBoardCreateManyTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  rank: Scalars['Int'];
  tournament_uid: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentLeaderBoardCreateManyTeamInputEnvelope = {
  data: Array<TournamentLeaderBoardCreateManyTeamInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TournamentLeaderBoardCreateManyTournamentInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  rank: Scalars['Int'];
  team_uid: Scalars['String'];
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentLeaderBoardCreateManyTournamentInputEnvelope = {
  data: Array<TournamentLeaderBoardCreateManyTournamentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TournamentLeaderBoardCreateNestedManyWithoutTeamInput = {
  connect?: InputMaybe<Array<TournamentLeaderBoardWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TournamentLeaderBoardCreateOrConnectWithoutTeamInput>>;
  create?: InputMaybe<Array<TournamentLeaderBoardCreateWithoutTeamInput>>;
  createMany?: InputMaybe<TournamentLeaderBoardCreateManyTeamInputEnvelope>;
};

export type TournamentLeaderBoardCreateNestedManyWithoutTournamentInput = {
  connect?: InputMaybe<Array<TournamentLeaderBoardWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TournamentLeaderBoardCreateOrConnectWithoutTournamentInput>>;
  create?: InputMaybe<Array<TournamentLeaderBoardCreateWithoutTournamentInput>>;
  createMany?: InputMaybe<TournamentLeaderBoardCreateManyTournamentInputEnvelope>;
};

export type TournamentLeaderBoardCreateOrConnectWithoutTeamInput = {
  create: TournamentLeaderBoardCreateWithoutTeamInput;
  where: TournamentLeaderBoardWhereUniqueInput;
};

export type TournamentLeaderBoardCreateOrConnectWithoutTournamentInput = {
  create: TournamentLeaderBoardCreateWithoutTournamentInput;
  where: TournamentLeaderBoardWhereUniqueInput;
};

export type TournamentLeaderBoardCreateWithoutTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  rank: Scalars['Int'];
  tournament: TournamentCreateNestedOneWithoutLeader_BoardInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentLeaderBoardCreateWithoutTournamentInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  rank: Scalars['Int'];
  team: TeamCreateNestedOneWithoutLeader_BoardInput;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentLeaderBoardWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
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

<<<<<<< HEAD
export enum TournamentType {
  Joined = "JOINED",
  Owner = "OWNER",
}
=======
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
  uid?: InputMaybe<Scalars['String']>;
};
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0

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

export type UserCreateNestedOneWithoutClaimInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutClaimInput>;
  create?: InputMaybe<UserCreateWithoutClaimInput>;
};

export type UserCreateNestedOneWithoutFavorite_GameInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutFavorite_GameInput>;
  create?: InputMaybe<UserCreateWithoutFavorite_GameInput>;
};

export type UserCreateNestedOneWithoutReactionInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutReactionInput>;
  create?: InputMaybe<UserCreateWithoutReactionInput>;
};

export type UserCreateNestedOneWithoutSponsorTransactionInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutSponsorTransactionInput>;
  create?: InputMaybe<UserCreateWithoutSponsorTransactionInput>;
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

export type UserCreateOrConnectWithoutClaimInput = {
  create: UserCreateWithoutClaimInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutFavorite_GameInput = {
  create: UserCreateWithoutFavorite_GameInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutReactionInput = {
  create: UserCreateWithoutReactionInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutSponsorTransactionInput = {
  create: UserCreateWithoutSponsorTransactionInput;
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

export type UserCreateWithoutClaimInput = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransaction?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutFavorite_GameInput = {
  claim?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  google_id?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransaction?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutReactionInput = {
  claim?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransaction?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutSponsorTransactionInput = {
  claim?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutTeamMembersInput = {
  claim?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransaction?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutTournamentInput = {
  claim?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransaction?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutTournamentSubscriberInput = {
  claim?: InputMaybe<ClaimTransactionsCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransaction?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
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
  __typename?: "UserGraphql";
  _count: UserCount;
  claim?: Maybe<Array<ClaimTransactions>>;
  code?: Maybe<Scalars["String"]>;
  created_at: Scalars["DateTime"];
  earningHistory?: Maybe<Array<EarningHistory>>;
  email?: Maybe<Scalars["String"]>;
  facebook_id?: Maybe<Scalars["String"]>;
  favorite_game?: Maybe<Array<UserFavoriteGame>>;
<<<<<<< HEAD
  google_id?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  playedTournament?: Maybe<Array<TTournament>>;
=======
  google_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
>>>>>>> baed4b7dec334af5b65186f380220b51b42aa7e0
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
  cover?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  discord?: InputMaybe<Scalars['String']>;
  display_name?: InputMaybe<Scalars['String']>;
  facebook?: InputMaybe<Scalars['String']>;
  family_name?: InputMaybe<Scalars['String']>;
  given_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  telegram?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_name?: InputMaybe<Scalars['String']>;
};

export type UserProfileWhereUniqueInput = {
  user_id?: InputMaybe<Scalars['Int']>;
  user_name?: InputMaybe<Scalars['String']>;
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

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  google_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};
