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
};

export type AuthGraphql = {
  __typename?: 'AuthGraphql';
  token: Scalars['String'];
  user?: Maybe<UserGraphql>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Generate nonce for user login */
  generateNonce: Scalars['String'];
  /** Facebook login */
  loginFacebook: AuthGraphql;
  /** Google login */
  loginGoogle: AuthGraphql;
  updateEmail?: Maybe<Scalars['Boolean']>;
  updateProfile?: Maybe<UserProfile>;
  verifyEmail?: Maybe<Scalars['Boolean']>;
};


export type MutationGenerateNonceArgs = {
  address: Scalars['String'];
};


export type MutationLoginFacebookArgs = {
  accessToken: Scalars['String'];
};


export type MutationLoginGoogleArgs = {
  token: Scalars['String'];
};


export type MutationUpdateEmailArgs = {
  email: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  data: ProfileUpdateInput;
};


export type MutationVerifyEmailArgs = {
  email: Scalars['String'];
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type ProfileUpdateInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  cover?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  discord?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  facebook?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  full_name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  telegram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<UserGraphql>;
};

export type User = {
  __typename?: 'User';
  code: Scalars['String'];
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  facebook_id?: Maybe<Scalars['String']>;
  google_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  profile?: Maybe<UserProfile>;
  ref_code?: Maybe<Scalars['String']>;
  role: UserRole;
  status: UserStatus;
  updated_at: Scalars['DateTime'];
};

export type UserGraphql = {
  __typename?: 'UserGraphql';
  code: Scalars['String'];
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  facebook_id?: Maybe<Scalars['String']>;
  google_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<UserProfile>;
  ref_code?: Maybe<Scalars['String']>;
  role: UserRole;
  status: UserStatus;
  updated_at: Scalars['DateTime'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  avatar?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  discord?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  family_name?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  telegram?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['ID'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER'
}

export enum UserStatus {
  Active = 'ACTIVE',
  Banned = 'BANNED'
}
