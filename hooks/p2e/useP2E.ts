import { ApolloError, ApolloQueryResult, gql, useQuery } from "@apollo/client";
import { Match, PlatformAccount } from "../../src/generated/graphql_p2e";

export const useGetPlatformAccount = (): {
  getPlatformAccountLoading: boolean,
  getPlatformAccountError: ApolloError | undefined,
  refetchPlatformAccount: () => Promise<ApolloQueryResult<any>>,
  getPlatformAccountData: {
    getPlatformAccount: PlatformAccount[]
  },
} => {
  const {
    loading: getPlatformAccountLoading,
    error: getPlatformAccountError,
    refetch: refetchPlatformAccount,
    data: getPlatformAccountData,
  } = useQuery(GET_PLATFORM_ACCOUNT, {
    context: {
      endpoint: 'p2e'
    }
  })

  return {
    getPlatformAccountLoading,
    getPlatformAccountError,
    refetchPlatformAccount,
    getPlatformAccountData,
  }
}

export const useGetRecentMatches = (): {
  getRecentMatchesLoading: boolean,
  getRecentMatchesError: ApolloError | undefined,
  refetchRecentMatches: () => Promise<ApolloQueryResult<any>>,
  getRecentMatchesData: {
    getRecentlyMatch: Match[]
  },
} => {
  const {
    loading: getRecentMatchesLoading,
    error: getRecentMatchesError,
    refetch: refetchRecentMatches,
    data: getRecentMatchesData,
  } = useQuery(GET_RECENT_MATCHES, {
    context: {
      endpoint: 'p2e'
    }
  })

  return {
    getRecentMatchesLoading,
    getRecentMatchesError,
    refetchRecentMatches,
    getRecentMatchesData,
  }
}

export const CONNECT_FACEIT = gql`
  mutation ($accessToken: String!, $idToken: String!) {
    connectFaceit (accessToken: $accessToken, idToken: $idToken) {
      player_uid
      avatar
      nick_name
    }
  }
`

export const GET_DAILY_MISSION = gql`
  mutation ($game_uid: String!) {
    getDailyMission(game_uid: $game_uid) {
      achieved
      mission_uid
      mission {
        uid
        title
        game_uid
        img
        goal
        type
        lucis_point
        lucis_token
      }
    }
  }
`

export const UPDATE_DAILY_MISSION = gql`
  mutation ($game_uid: String!) {
    updateDailyMission(game_uid: $game_uid) {
      achieved
      mission_uid
      mission {
        uid
        title
        game_uid
        img
        goal
        type
        lucis_point
        lucis_token
      }
    }
  }
`

const GET_PLATFORM_ACCOUNT = gql`
  query {
    getPlatformAccount {
      player_uid
      avatar
      nick_name
      platform
    }
  }
`

const GET_RECENT_MATCHES = gql`
  query {
    getRecentlyMatch {
      match_uid
      winner_team
      loser_team
      score
      is_win
      end_at
    }
  }
`

export const GET_STATISTICS = gql`
  query {
    getBalance {
      lucis_point
      lucis_token
    }
  }
`