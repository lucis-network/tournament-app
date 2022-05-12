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

export type AuthGraphql = {
  __typename?: 'AuthGraphql';
  token: Scalars['String'];
  user?: Maybe<UserGraphql>;
};

export type Bracket = {
  __typename?: 'Bracket';
  _count: BracketCount;
  bracketMatchs?: Maybe<Array<BracketMatch>>;
  bracketRounds?: Maybe<Array<BracketRound>>;
  bracketTeams?: Maybe<Array<BracketTeam>>;
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
  bracketTeams: Scalars['Int'];
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

export type BracketGql = {
  __typename?: 'BracketGql';
  bracketRounds?: Maybe<Array<BracketRound>>;
  bracketTeams?: Maybe<Array<GBracketTeam>>;
  created_at: Scalars['DateTime'];
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
  lower_match_uid?: Maybe<Scalars['String']>;
  round: BracketRound;
  round_uid: Scalars['String'];
  score_1?: Maybe<Scalars['Int']>;
  score_2?: Maybe<Scalars['Int']>;
  second_match_uid?: Maybe<Scalars['String']>;
  status: BracketMatchStatus;
  team1_uid?: Maybe<Scalars['String']>;
  team2_uid?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  upper_match_uid?: Maybe<Scalars['String']>;
};

export type BracketMatchCreateManyBracketInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  first_match_uid?: InputMaybe<Scalars['String']>;
  link_stream?: InputMaybe<Scalars['String']>;
  lower_match_uid?: InputMaybe<Scalars['String']>;
  round_uid: Scalars['String'];
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_uid?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  team1_uid?: InputMaybe<Scalars['String']>;
  team2_uid?: InputMaybe<Scalars['String']>;
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
  lower_match_uid?: InputMaybe<Scalars['String']>;
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_uid?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  team1_uid?: InputMaybe<Scalars['String']>;
  team2_uid?: InputMaybe<Scalars['String']>;
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
  lower_match_uid?: InputMaybe<Scalars['String']>;
  round: BracketRoundCreateNestedOneWithoutBracketMatchsInput;
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_uid?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  team1_uid?: InputMaybe<Scalars['String']>;
  team2_uid?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  upper_match_uid?: InputMaybe<Scalars['String']>;
};

export type BracketMatchCreateWithoutRoundInput = {
  bracket: BracketCreateNestedOneWithoutBracketMatchsInput;
  created_at?: InputMaybe<Scalars['DateTime']>;
  first_match_uid?: InputMaybe<Scalars['String']>;
  link_stream?: InputMaybe<Scalars['String']>;
  lower_match_uid?: InputMaybe<Scalars['String']>;
  score_1?: InputMaybe<Scalars['Int']>;
  score_2?: InputMaybe<Scalars['Int']>;
  second_match_uid?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BracketMatchStatus>;
  team1_uid?: InputMaybe<Scalars['String']>;
  team2_uid?: InputMaybe<Scalars['String']>;
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

export type BracketTeam = {
  __typename?: 'BracketTeam';
  _count: BracketTeamCount;
  bracket: Bracket;
  bracketTeamMembers?: Maybe<Array<BracketTeamMember>>;
  bracket_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  is_checkin?: Maybe<Scalars['Boolean']>;
  team: Team;
  team_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type BracketTeamCount = {
  __typename?: 'BracketTeamCount';
  bracketTeamMembers: Scalars['Int'];
};

export type BracketTeamCreateManyBracketInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_checkin?: InputMaybe<Scalars['Boolean']>;
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
  is_checkin?: InputMaybe<Scalars['Boolean']>;
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

export type BracketTeamCreateNestedOneWithoutBracketTeamMembersInput = {
  connect?: InputMaybe<BracketTeamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BracketTeamCreateOrConnectWithoutBracketTeamMembersInput>;
  create?: InputMaybe<BracketTeamCreateWithoutBracketTeamMembersInput>;
};

export type BracketTeamCreateOrConnectWithoutBracketInput = {
  create: BracketTeamCreateWithoutBracketInput;
  where: BracketTeamWhereUniqueInput;
};

export type BracketTeamCreateOrConnectWithoutBracketTeamMembersInput = {
  create: BracketTeamCreateWithoutBracketTeamMembersInput;
  where: BracketTeamWhereUniqueInput;
};

export type BracketTeamCreateOrConnectWithoutTeamInput = {
  create: BracketTeamCreateWithoutTeamInput;
  where: BracketTeamWhereUniqueInput;
};

export type BracketTeamCreateWithoutBracketInput = {
  bracketTeamMembers?: InputMaybe<BracketTeamMemberCreateNestedManyWithoutBracketTeamInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_checkin?: InputMaybe<Scalars['Boolean']>;
  team: TeamCreateNestedOneWithoutBracketTeamInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketTeamCreateWithoutBracketTeamMembersInput = {
  bracket: BracketCreateNestedOneWithoutBracketTeamsInput;
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_checkin?: InputMaybe<Scalars['Boolean']>;
  team: TeamCreateNestedOneWithoutBracketTeamInput;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketTeamCreateWithoutTeamInput = {
  bracket: BracketCreateNestedOneWithoutBracketTeamsInput;
  bracketTeamMembers?: InputMaybe<BracketTeamMemberCreateNestedManyWithoutBracketTeamInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  is_checkin?: InputMaybe<Scalars['Boolean']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketTeamMember = {
  __typename?: 'BracketTeamMember';
  bracketTeam: BracketTeam;
  bracket_team_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  id_in_game?: Maybe<Scalars['String']>;
  is_leader?: Maybe<Scalars['Boolean']>;
  prize_alloc?: Maybe<Scalars['Decimal']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type BracketTeamMemberCreateManyBracketTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_in_game?: InputMaybe<Scalars['String']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  prize_alloc?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id: Scalars['Int'];
};

export type BracketTeamMemberCreateManyBracketTeamInputEnvelope = {
  data: Array<BracketTeamMemberCreateManyBracketTeamInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BracketTeamMemberCreateManyUserInput = {
  bracket_team_uid: Scalars['String'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_in_game?: InputMaybe<Scalars['String']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  prize_alloc?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketTeamMemberCreateManyUserInputEnvelope = {
  data: Array<BracketTeamMemberCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BracketTeamMemberCreateNestedManyWithoutBracketTeamInput = {
  connect?: InputMaybe<Array<BracketTeamMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BracketTeamMemberCreateOrConnectWithoutBracketTeamInput>>;
  create?: InputMaybe<Array<BracketTeamMemberCreateWithoutBracketTeamInput>>;
  createMany?: InputMaybe<BracketTeamMemberCreateManyBracketTeamInputEnvelope>;
};

export type BracketTeamMemberCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<BracketTeamMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BracketTeamMemberCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<BracketTeamMemberCreateWithoutUserInput>>;
  createMany?: InputMaybe<BracketTeamMemberCreateManyUserInputEnvelope>;
};

export type BracketTeamMemberCreateOrConnectWithoutBracketTeamInput = {
  create: BracketTeamMemberCreateWithoutBracketTeamInput;
  where: BracketTeamMemberWhereUniqueInput;
};

export type BracketTeamMemberCreateOrConnectWithoutUserInput = {
  create: BracketTeamMemberCreateWithoutUserInput;
  where: BracketTeamMemberWhereUniqueInput;
};

export type BracketTeamMemberCreateWithoutBracketTeamInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_in_game?: InputMaybe<Scalars['String']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  prize_alloc?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutBracketTeamMembersInput;
};

export type BracketTeamMemberCreateWithoutUserInput = {
  bracketTeam: BracketTeamCreateNestedOneWithoutBracketTeamMembersInput;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id_in_game?: InputMaybe<Scalars['String']>;
  is_leader?: InputMaybe<Scalars['Boolean']>;
  prize_alloc?: InputMaybe<Scalars['Decimal']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type BracketTeamMemberWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type BracketTeamWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

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

export type CacheCurrency = {
  __typename?: 'CacheCurrency';
  created_at: Scalars['DateTime'];
  currency?: Maybe<Currency>;
  currency_uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  usd_value?: Maybe<Scalars['Float']>;
};

export type CacheCurrencyCreateNestedOneWithoutCurrencyInput = {
  connect?: InputMaybe<CacheCurrencyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CacheCurrencyCreateOrConnectWithoutCurrencyInput>;
  create?: InputMaybe<CacheCurrencyCreateWithoutCurrencyInput>;
};

export type CacheCurrencyCreateOrConnectWithoutCurrencyInput = {
  create: CacheCurrencyCreateWithoutCurrencyInput;
  where: CacheCurrencyWhereUniqueInput;
};

export type CacheCurrencyCreateWithoutCurrencyInput = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Float']>;
};

export type CacheCurrencyWhereUniqueInput = {
  currency_uid?: InputMaybe<Scalars['String']>;
};

export type CacheTournament = {
  __typename?: 'CacheTournament';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  team_participated: Scalars['Int'];
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
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
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

export type ClaimTransaction = {
  __typename?: 'ClaimTransaction';
  amount?: Maybe<Scalars['Decimal']>;
  created_at: Scalars['DateTime'];
  currency_uid: Scalars['String'];
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
  amount?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
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
  amount?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
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
  amount?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  type: ClaimType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
  user: UserCreateNestedOneWithoutClaimInput;
};

export type ClaimTransactionCreateWithoutUserInput = {
  amount?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_uid: Scalars['String'];
  status?: InputMaybe<TransactionStatus>;
  tournaments: TournamentCreateNestedOneWithoutClaim_TransactionsInput;
  tx_hash?: InputMaybe<Scalars['String']>;
  type: ClaimType;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  usd_value?: InputMaybe<Scalars['Decimal']>;
};

export type ClaimTransactionWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
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
  currency_symbol?: Maybe<Scalars['String']>;
  is_transfered?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['String']>;
  type: ContractType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type ContractCreateManyChainInput = {
  address: Scalars['String'];
  admin?: InputMaybe<Scalars['String']>;
  admin_prv_key?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_symbol?: InputMaybe<Scalars['String']>;
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
  address: Scalars['String'];
  admin?: InputMaybe<Scalars['String']>;
  admin_prv_key?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  currency_symbol?: InputMaybe<Scalars['String']>;
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

export type CreateFavorite = {
  game_uid?: InputMaybe<Array<Scalars['String']>>;
};

export type Currency = {
  __typename?: 'Currency';
  _count: CurrencyCount;
  address?: Maybe<Scalars['String']>;
  cache_currency: CacheCurrency;
  chain?: Maybe<Chain>;
  chain_symbol?: Maybe<ChainSymbol>;
  created_at: Scalars['DateTime'];
  decimals?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  tournaments?: Maybe<Array<Tournament>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type CurrencyCount = {
  __typename?: 'CurrencyCount';
  tournaments: Scalars['Int'];
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
  cache_currency?: InputMaybe<CacheCurrencyCreateNestedOneWithoutCurrencyInput>;
  chain?: InputMaybe<ChainCreateNestedOneWithoutCurrenciesInput>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  decimals?: InputMaybe<Scalars['Int']>;
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type CurrencyGql = {
  __typename?: 'CurrencyGql';
  address?: Maybe<Scalars['String']>;
  cache_currency: CacheCurrency;
  chain_symbol?: Maybe<ChainSymbol>;
  created_at: Scalars['DateTime'];
  decimals?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
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
  receiver_avatar?: Maybe<Scalars['String']>;
  receiver_display_name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  tx_hash?: Maybe<Scalars['String']>;
  type?: Maybe<DonateTransactionsType>;
};

export type DonateTransaction = {
  __typename?: 'DonateTransaction';
  amount?: Maybe<Scalars['Decimal']>;
  created_at: Scalars['DateTime'];
  from: Scalars['String'];
  has_claim?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  to: Scalars['String'];
  tournament_uid: Scalars['String'];
  tournaments: Tournament;
  tx_hash?: Maybe<Scalars['String']>;
  type?: Maybe<DonateTransactionsType>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  usd_value?: Maybe<Scalars['Decimal']>;
};

export type DonateTransactionCreateManyTournamentsInput = {
  amount?: InputMaybe<Scalars['Decimal']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  from: Scalars['String'];
  has_claim?: InputMaybe<Scalars['Boolean']>;
  message?: InputMaybe<Scalars['String']>;
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
  has_claim?: InputMaybe<Scalars['Boolean']>;
  message?: InputMaybe<Scalars['String']>;
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

export type GBracketTeam = {
  __typename?: 'GBracketTeam';
  bracket: Bracket;
  bracketTeamMembers?: Maybe<Array<GBracketTeamMembers>>;
  bracket_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  is_checkin?: Maybe<Scalars['Boolean']>;
  team: Team;
  team_uid: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
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

export type GBracketTeamMembers = {
  __typename?: 'GBracketTeamMembers';
  bracket_team_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  id_in_game?: Maybe<Scalars['String']>;
  is_leader?: Maybe<Scalars['Boolean']>;
  prize_alloc?: Maybe<Scalars['Decimal']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
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
  address: Scalars['String'];
  admin?: Maybe<Scalars['String']>;
  chain: Chain;
  chain_symbol: ChainSymbol;
  created_at: Scalars['DateTime'];
  currency_symbol?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  type: ContractType;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GDonateTransaction = {
  amount?: InputMaybe<Scalars['Float']>;
  has_claim?: InputMaybe<Scalars['Boolean']>;
  message?: InputMaybe<Scalars['String']>;
  to: Scalars['String'];
  tournamnent_uid?: InputMaybe<Scalars['String']>;
  tx_hash: Scalars['String'];
  type?: InputMaybe<DonateTransactionsType>;
};

export type GMember = {
  member_id?: InputMaybe<Array<Scalars['Int']>>;
  team_uid?: InputMaybe<Scalars['String']>;
};

export type GTopEarning = {
  __typename?: 'GTopEarning';
  avatar?: Maybe<Scalars['String']>;
  total_earning?: Maybe<Scalars['Float']>;
  user_name?: Maybe<Scalars['String']>;
};

export type GTournament = {
  __typename?: 'GTournament';
  _count: TournamentCount;
  additionPrize: Scalars['Decimal'];
  cache_tournament?: Maybe<CacheTournament>;
  claim_transactions?: Maybe<Array<ClaimTransaction>>;
  cover: Scalars['String'];
  created_at: Scalars['DateTime'];
  currency: Currency;
  currency_uid: Scalars['String'];
  desc?: Maybe<Scalars['String']>;
  donate_transactions?: Maybe<Array<DonateTransaction>>;
  game: Game;
  game_uid: Scalars['String'];
  join_fee?: Maybe<Scalars['Decimal']>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: Maybe<Array<TournamentRank>>;
  reaction?: Maybe<Array<Reaction>>;
  referees: Scalars['String'];
  regions?: Maybe<Scalars['String']>;
  rules?: Maybe<Scalars['String']>;
  sponsorSlot?: Maybe<Array<SponsorSlot>>;
  spotlight_position?: Maybe<Scalars['Int']>;
  systemSponsor?: Maybe<SystemSponsor>;
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
  bracket_team_uid?: Maybe<Scalars['String']>;
  lose?: Maybe<Scalars['Int']>;
  rank: Scalars['Int'];
  round?: Maybe<Scalars['String']>;
  team_avatar?: Maybe<Scalars['String']>;
  team_name?: Maybe<Scalars['String']>;
  win?: Maybe<Scalars['Int']>;
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
  tournaments?: Maybe<Array<Tournament>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GameCount = {
  __typename?: 'GameCount';
  favorite_user: Scalars['Int'];
  tournaments: Scalars['Int'];
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
  __typename?: 'Member';
  avatar?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  is_leader?: Maybe<Scalars['Boolean']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavoriteGame?: Maybe<Scalars['Boolean']>;
  addMember?: Maybe<Scalars['Boolean']>;
  becomeOurSponsor?: Maybe<Scalars['Boolean']>;
  checkInTournament?: Maybe<Scalars['Boolean']>;
  claimDonation?: Maybe<Scalars['Boolean']>;
  claimPrizePool?: Maybe<Scalars['Boolean']>;
  claimPrizeSystem?: Maybe<Scalars['Boolean']>;
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
  /** Generate nonce for user login */
  generateNonce: Scalars['String'];
  getNotification?: Maybe<Array<NotificationType>>;
  joinTournament?: Maybe<Scalars['Boolean']>;
  leaveTeam?: Maybe<Scalars['Boolean']>;
  leaveTournament?: Maybe<Scalars['Boolean']>;
  /** Facebook login */
  loginFacebook: AuthGraphql;
  /** Google login */
  loginGoogle: AuthGraphql;
  reactToTournament?: Maybe<Scalars['Boolean']>;
  subscribeToTournament?: Maybe<Scalars['Boolean']>;
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
  data: SponsorInput;
};


export type MutationCheckInTournamentArgs = {
  team_uid: Scalars['String'];
  tournament_uid: Scalars['String'];
};


export type MutationClaimDonationArgs = {
  address: Scalars['String'];
  tournamnent_uid: Scalars['String'];
};


export type MutationClaimPrizePoolArgs = {
  address: Scalars['String'];
  tournament_uid: Scalars['String'];
};


export type MutationClaimPrizeSystemArgs = {
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
  team_uid: Scalars['String'];
  tournament_uid: Scalars['String'];
};


export type MutationLoginFacebookArgs = {
  accessToken: Scalars['String'];
};


export type MutationLoginGoogleArgs = {
  token: Scalars['String'];
};


export type MutationReactToTournamentArgs = {
  data: ReactionInput;
};


export type MutationSubscribeToTournamentArgs = {
  tournament_uid: Scalars['String'];
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

export type NotificationCreateManyUserInput = {
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  is_seen?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
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
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type NotificationType = {
  __typename?: 'NotificationType';
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  is_seen?: Maybe<Scalars['Boolean']>;
  time?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
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
  tournament_uid?: Maybe<Scalars['String']>;
};

export type Player = {
  is_leader?: InputMaybe<Scalars['Boolean']>;
  user_id?: InputMaybe<Scalars['Int']>;
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
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  telegram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  twitch?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  user_name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type Query = {
  __typename?: 'Query';
  checkJoiningAnyTournament?: Maybe<Array<GTournament>>;
  checkUserName?: Maybe<Scalars['Boolean']>;
  currencies?: Maybe<Array<CurrencyGql>>;
  donateHistory?: Maybe<Array<DonateHistory>>;
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
  getOnGoingTournament?: Maybe<Array<TournamentGql>>;
  getOwnedTournament?: Maybe<Array<TTournament>>;
  getReferee?: Maybe<Array<Referee>>;
  getSponsorSlot?: Maybe<Array<SponsorSlot>>;
  getSpotlightTournament?: Maybe<Array<GTournament>>;
  getTeam?: Maybe<Array<BracketTeamMember>>;
  getTopEarningPlayer?: Maybe<Array<GTopEarning>>;
  getTotalEarning?: Maybe<Scalars['Float']>;
  getTournamentDetail?: Maybe<TournamentGql>;
  getTournamentListRank?: Maybe<Array<TournamentListRank>>;
  getTournamentParticipants?: Maybe<Array<BracketTeam>>;
  getTournamentPrizing?: Maybe<Array<Prize>>;
  getTournamentReferees?: Maybe<Array<Referee>>;
  getTournamentResult: Array<GTournamentRank>;
  getTournamentReward?: Maybe<Array<Reward>>;
  getUpComingTournament?: Maybe<Array<TournamentGql>>;
  getUserProfile?: Maybe<UserGraphql>;
  isCheckInTournament?: Maybe<Scalars['Boolean']>;
  me?: Maybe<UserGraphql>;
  regions?: Maybe<Array<Region>>;
  search?: Maybe<Array<TournamentGql>>;
  searchJoinedTournament?: Maybe<Array<TTournament>>;
  searchMember?: Maybe<Array<GUserProfile>>;
  searchOwnerTournament?: Maybe<Array<TTournament>>;
  searchTeam?: Maybe<Array<UserTeam>>;
  verifyEmail?: Maybe<Scalars['Boolean']>;
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
  name: Scalars['String'];
};


export type QueryGetSponsorSlotArgs = {
  tournament_uid: Scalars['String'];
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


export type QueryGetUpComingTournamentArgs = {
  data: TournamentFilterInput;
};


export type QueryGetUserProfileArgs = {
  user_id: Scalars['String'];
};


export type QueryIsCheckInTournamentArgs = {
  tournament_uid: Scalars['String'];
};


export type QuerySearchArgs = {
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

export type Referee = {
  __typename?: 'Referee';
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user?: Maybe<User>;
  user_id: Scalars['ID'];
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
  __typename?: 'Region';
  created_at: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type Reward = {
  __typename?: 'Reward';
  amount?: Maybe<Scalars['Float']>;
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

export type SponsorInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Float'];
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  sponsor_slot_uid?: InputMaybe<Scalars['String']>;
  tx_hash: Scalars['String'];
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
  tournaments_uid: Scalars['String'];
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
  created_at: Scalars['DateTime'];
  home_page?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  sponsor_slot: SponsorSlot;
  sponsor_slot_uid: Scalars['String'];
  sponsor_type?: Maybe<SponsorTransactionType>;
  tx_hash?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['Int']>;
};

export type SponsorTransactionCreateInputGql = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Float'];
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
};

export type SponsorTransactionCreateManySponsorGql = {
  data: Array<SponsorTransactionCreateInputGql>;
};

export type SponsorTransactionCreateManySponsor_SlotInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  sponsor_type?: InputMaybe<SponsorTransactionType>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user_id?: InputMaybe<Scalars['Int']>;
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
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  sponsor_slot_uid: Scalars['String'];
  sponsor_type?: InputMaybe<SponsorTransactionType>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
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

export type SponsorTransactionCreateNestedWithoutSponsorInputGql = {
  createMany?: InputMaybe<SponsorTransactionCreateManySponsorGql>;
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
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  sponsor_type?: InputMaybe<SponsorTransactionType>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutSponsorTransactionsInput>;
};

export type SponsorTransactionCreateWithoutUserInput = {
  ads_link?: InputMaybe<Scalars['String']>;
  amount: Scalars['Decimal'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  home_page?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  sponsor_slot: SponsorSlotCreateNestedOneWithoutSponsor_TransactionsInput;
  sponsor_type?: InputMaybe<SponsorTransactionType>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export enum SponsorTransactionType {
  Become = 'BECOME',
  Existing = 'EXISTING'
}

export type SponsorTransactionWhereUniqueInput = {
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
  pushNotification: NotificationType;
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
  created_at: Scalars['DateTime'];
  status: TransactionStatus;
  tournament: Tournament;
  tournament_uid: Scalars['String'];
  tx_hash?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type SystemSponsorCreateNestedOneWithoutTournamentInput = {
  connect?: InputMaybe<SystemSponsorWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SystemSponsorCreateOrConnectWithoutTournamentInput>;
  create?: InputMaybe<SystemSponsorCreateWithoutTournamentInput>;
};

export type SystemSponsorCreateOrConnectWithoutTournamentInput = {
  create: SystemSponsorCreateWithoutTournamentInput;
  where: SystemSponsorWhereUniqueInput;
};

export type SystemSponsorCreateWithoutTournamentInput = {
  amount: Scalars['Decimal'];
  created_at?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<TransactionStatus>;
  tx_hash?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type SystemSponsorWhereUniqueInput = {
  tournament_uid?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};

export type TTournament = {
  __typename?: 'TTournament';
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
  donate_transactions?: Maybe<Array<DonateTransaction>>;
  game: Game;
  game_uid: Scalars['String'];
  is_claim?: Maybe<PrizeClaimStatus>;
  join_fee?: Maybe<Scalars['Decimal']>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: Maybe<Array<TournamentRank>>;
  reaction?: Maybe<Array<Reaction>>;
  referees: Scalars['String'];
  regions?: Maybe<Scalars['String']>;
  rules?: Maybe<Scalars['String']>;
  sponsorSlot?: Maybe<Array<SponsorSlot>>;
  spotlight_position?: Maybe<Scalars['Int']>;
  start_at?: Maybe<Scalars['DateTime']>;
  systemSponsor?: Maybe<SystemSponsor>;
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
  BracketTeam?: Maybe<Array<BracketTeam>>;
  _count: TeamCount;
  avatar?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  created_by: Scalars['Int'];
  name: Scalars['String'];
  team_members?: Maybe<Array<TeamMember>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type TeamCount = {
  __typename?: 'TeamCount';
  BracketTeam: Scalars['Int'];
  team_members: Scalars['Int'];
};

export type TeamCreateNestedOneWithoutBracketTeamInput = {
  connect?: InputMaybe<TeamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeamCreateOrConnectWithoutBracketTeamInput>;
  create?: InputMaybe<TeamCreateWithoutBracketTeamInput>;
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

export type TeamCreateOrConnectWithoutTeam_MembersInput = {
  create: TeamCreateWithoutTeam_MembersInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateWithoutBracketTeamInput = {
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
  name: Scalars['String'];
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

export enum TnmStatus {
  Checkin = 'CHECKIN',
  Closed = 'CLOSED',
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
  total_prize?: Maybe<Scalars['Float']>;
  tournament_uid?: Maybe<Scalars['String']>;
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
  donate_transactions?: Maybe<Array<DonateTransaction>>;
  game: Game;
  game_uid: Scalars['String'];
  invite_link?: Maybe<Scalars['String']>;
  join_fee?: Maybe<Scalars['Decimal']>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: Maybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: Maybe<Array<TournamentRank>>;
  reaction?: Maybe<Array<Reaction>>;
  referees: Scalars['String'];
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
  ranks: Scalars['Int'];
  reaction: Scalars['Int'];
  sponsorSlot: Scalars['Int'];
  tournament_subscribes: Scalars['Int'];
};

export type TournamentCreateInputGql = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  bracket_type: BracketType;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
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
  prize_allocation: Array<PrizeAllocation>;
  referees: Array<Scalars['Int']>;
  regions?: InputMaybe<Array<Scalars['String']>>;
  rounds: Array<BracketRoundCreateInputGql>;
  rules?: InputMaybe<Scalars['String']>;
  sponsor_slots: Array<SponsorSlotCreateInputGql>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  start_at: Scalars['DateTime'];
  systemSponsor?: InputMaybe<SystemSponsorCreateNestedOneWithoutTournamentInput>;
  team_size: Scalars['Int'];
  thumbnail: Scalars['String'];
  tournamentDeposit?: InputMaybe<TournamentDepositCreateNestedOneWithoutTournamentInput>;
  turns?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type TournamentCreateManyGameInput = {
  additionPrize?: InputMaybe<Scalars['Decimal']>;
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
  additionPrize?: InputMaybe<Scalars['Decimal']>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
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
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsor?: InputMaybe<SystemSponsorCreateNestedOneWithoutTournamentInput>;
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
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsor?: InputMaybe<SystemSponsorCreateNestedOneWithoutTournamentInput>;
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
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
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
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsor?: InputMaybe<SystemSponsorCreateNestedOneWithoutTournamentInput>;
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
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
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
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsor?: InputMaybe<SystemSponsorCreateNestedOneWithoutTournamentInput>;
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
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
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
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsor?: InputMaybe<SystemSponsorCreateNestedOneWithoutTournamentInput>;
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
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
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
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsor?: InputMaybe<SystemSponsorCreateNestedOneWithoutTournamentInput>;
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
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
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
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsor?: InputMaybe<SystemSponsorCreateNestedOneWithoutTournamentInput>;
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
  brackets?: InputMaybe<BracketCreateNestedManyWithoutTournamentInput>;
  cache_tournament?: InputMaybe<CacheTournamentCreateNestedOneWithoutTournamentInput>;
  claim_transactions?: InputMaybe<ClaimTransactionCreateNestedManyWithoutTournamentsInput>;
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
  ranks?: InputMaybe<TournamentRankCreateNestedManyWithoutTournamentInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutTournamentInput>;
  referees: Scalars['String'];
  regions?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
  sponsorSlot?: InputMaybe<SponsorSlotCreateNestedManyWithoutTournamentInput>;
  spotlight_position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<TournamentStatus>;
  systemSponsor?: InputMaybe<SystemSponsorCreateNestedOneWithoutTournamentInput>;
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
  created_at: Scalars['DateTime'];
  status: TransactionStatus;
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
  created_at?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<TransactionStatus>;
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
  brackets?: Maybe<Array<Bracket>>;
  cache_tournament?: Maybe<CacheTournament>;
  cover: Scalars['String'];
  created_at: Scalars['DateTime'];
  currency: Currency;
  currency_uid: Scalars['String'];
  desc?: Maybe<Scalars['String']>;
  donate_transactions?: Maybe<Array<DonateTransaction>>;
  game: Game;
  game_uid: Scalars['String'];
  invite_link?: Maybe<Scalars['String']>;
  join_fee?: Maybe<Scalars['Decimal']>;
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  name: Scalars['String'];
  participants: Scalars['Int'];
  password?: Maybe<Scalars['String']>;
  pool_size: Scalars['Decimal'];
  prize_allocation: Scalars['JSON'];
  ranks?: Maybe<Array<TournamentRank>>;
  reaction?: Maybe<Array<Reaction>>;
  referees: Scalars['String'];
  region?: Maybe<Scalars['String']>;
  rules?: Maybe<Scalars['String']>;
  sponsorSlot?: Maybe<Array<SponsorSlot>>;
  spotlight_position?: Maybe<Scalars['Int']>;
  systemSponsor?: Maybe<SystemSponsor>;
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
  bracket_team_uid?: Maybe<Scalars['String']>;
  donated?: Maybe<Scalars['Float']>;
  prize?: Maybe<Scalars['Float']>;
  rank?: Maybe<Scalars['Int']>;
  team_avatar?: Maybe<Scalars['String']>;
  team_name?: Maybe<Scalars['String']>;
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
  tournament_uid?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Status>;
  value?: InputMaybe<Scalars['String']>;
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
  FaiLd = 'FAILd',
  Pending = 'PENDING',
  Succeed = 'SUCCEED'
}

export type User = {
  __typename?: 'User';
  _count: UserCount;
  bracketTeamMembers?: Maybe<Array<BracketTeamMember>>;
  claim?: Maybe<Array<ClaimTransaction>>;
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  facebook_id?: Maybe<Scalars['String']>;
  favorite_game?: Maybe<Array<UserFavoriteGame>>;
  google_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  notification?: Maybe<Array<Notification>>;
  password?: Maybe<Scalars['String']>;
  profile?: Maybe<UserProfile>;
  reaction?: Maybe<Array<Reaction>>;
  ref_code?: Maybe<Scalars['String']>;
  referee?: Maybe<Array<Referee>>;
  role: UserRole;
  sponsorTransactions?: Maybe<Array<SponsorTransaction>>;
  status: UserStatus;
  teamMembers?: Maybe<Array<TeamMember>>;
  tournament?: Maybe<Array<Tournament>>;
  tournamentSubscriber?: Maybe<Array<TournamentSubscriber>>;
  updated_at: Scalars['DateTime'];
};

export type UserCount = {
  __typename?: 'UserCount';
  bracketTeamMembers: Scalars['Int'];
  claim: Scalars['Int'];
  favorite_game: Scalars['Int'];
  leader_board: Scalars['Int'];
  notification: Scalars['Int'];
  reaction: Scalars['Int'];
  referee: Scalars['Int'];
  sponsorTransactions: Scalars['Int'];
  teamMembers: Scalars['Int'];
  tournament: Scalars['Int'];
  tournamentSubscriber: Scalars['Int'];
};

export type UserCreateNestedOneWithoutBracketTeamMembersInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutBracketTeamMembersInput>;
  create?: InputMaybe<UserCreateWithoutBracketTeamMembersInput>;
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

export type UserCreateNestedOneWithoutLeader_BoardInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutLeader_BoardInput>;
  create?: InputMaybe<UserCreateWithoutLeader_BoardInput>;
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

export type UserCreateOrConnectWithoutBracketTeamMembersInput = {
  create: UserCreateWithoutBracketTeamMembersInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutClaimInput = {
  create: UserCreateWithoutClaimInput;
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

export type UserCreateOrConnectWithoutReactionInput = {
  create: UserCreateWithoutReactionInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutSponsorTransactionsInput = {
  create: UserCreateWithoutSponsorTransactionsInput;
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

export type UserCreateWithoutBracketTeamMembersInput = {
  claim?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutClaimInput = {
  bracketTeamMembers?: InputMaybe<BracketTeamMemberCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutFavorite_GameInput = {
  bracketTeamMembers?: InputMaybe<BracketTeamMemberCreateNestedManyWithoutUserInput>;
  claim?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutLeader_BoardInput = {
  bracketTeamMembers?: InputMaybe<BracketTeamMemberCreateNestedManyWithoutUserInput>;
  claim?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutReactionInput = {
  bracketTeamMembers?: InputMaybe<BracketTeamMemberCreateNestedManyWithoutUserInput>;
  claim?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutSponsorTransactionsInput = {
  bracketTeamMembers?: InputMaybe<BracketTeamMemberCreateNestedManyWithoutUserInput>;
  claim?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
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
  bracketTeamMembers?: InputMaybe<BracketTeamMemberCreateNestedManyWithoutUserInput>;
  claim?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutTournamentInput = {
  bracketTeamMembers?: InputMaybe<BracketTeamMemberCreateNestedManyWithoutUserInput>;
  claim?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournamentSubscriber?: InputMaybe<TournamentSubscriberCreateNestedManyWithoutUsersInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateWithoutTournamentSubscriberInput = {
  bracketTeamMembers?: InputMaybe<BracketTeamMemberCreateNestedManyWithoutUserInput>;
  claim?: InputMaybe<ClaimTransactionCreateNestedManyWithoutUserInput>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  favorite_game?: InputMaybe<UserFavoriteGameCreateNestedManyWithoutUserInput>;
  google_id?: InputMaybe<Scalars['String']>;
  leader_board?: InputMaybe<TournamentLeaderBoardCreateNestedManyWithoutUserInput>;
  notification?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<UserProfileCreateNestedOneWithoutUserInput>;
  reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  ref_code?: InputMaybe<Scalars['String']>;
  referee?: InputMaybe<RefereeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<UserRole>;
  sponsorTransactions?: InputMaybe<SponsorTransactionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  teamMembers?: InputMaybe<TeamMemberCreateNestedManyWithoutUserInput>;
  tournament?: InputMaybe<TournamentCreateNestedManyWithoutUserInput>;
  updated_at?: InputMaybe<Scalars['DateTime']>;
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
  bracketTeamMembers?: Maybe<Array<BracketTeamMember>>;
  claim?: Maybe<Array<ClaimTransaction>>;
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  facebook_id?: Maybe<Scalars['String']>;
  favorite_game?: Maybe<Array<UserFavoriteGame>>;
  google_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  leader_board?: Maybe<Array<TournamentLeaderBoard>>;
  notification?: Maybe<Array<Notification>>;
  profile?: Maybe<UserProfile>;
  reaction?: Maybe<Array<Reaction>>;
  ref_code?: Maybe<Scalars['String']>;
  referee?: Maybe<Array<Referee>>;
  role: UserRole;
  sponsorTransactions?: Maybe<Array<SponsorTransaction>>;
  status: UserStatus;
  teamMembers?: Maybe<Array<TeamMember>>;
  tournament?: Maybe<Array<Tournament>>;
  tournamentSubscriber?: Maybe<Array<TournamentSubscriber>>;
  updated_at: Scalars['DateTime'];
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

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  facebook_id?: InputMaybe<Scalars['String']>;
  google_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};
