import {ApolloError, ApolloQueryResult, gql, useMutation, useQuery} from "@apollo/client";
import boolean from "async-validator/dist-types/validator/boolean";
import {Mission, PlatformAccount, Match} from "../../src/generated/graphql";

type UseGetDailyMissionProp = {
  game_uid: string,
  skip?: boolean
}

export const useGetPlatformAccount = (): {
  getPlatformAccountLoading: boolean,
  getPlatformAccountError: ApolloError | undefined,
  refetchPlatformAccount: () => Promise<ApolloQueryResult<any>>,
  getPlatformAccountData: {
    getPlatformAccount: PlatformAccount
  },
} => {
  const {
    loading: getPlatformAccountLoading,
    error: getPlatformAccountError,
    refetch: refetchPlatformAccount,
    data: getPlatformAccountData,
  } = useQuery(GET_PLATFORM_ACCOUNT)

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
  } = useQuery(GET_RECENT_MATCHES)

  return {
    getRecentMatchesLoading,
    getRecentMatchesError,
    refetchRecentMatches,
    getRecentMatchesData,
  }
}

export const CONNECT_FACEIT = gql`
  mutation ($accessToken: String!, $IdToken: String!) {
    connectFaceit (accessToken: $accessToken, IdToken: $IdToken) {
      player_uid
      avatar
      nick_name
    }
  }
`

export const GET_DAILY_MISSION = gql`
  mutation ($game_uid: String!) {
    getDailyMission(game_uid: $game_uid) {
      game_uid
      title
      img
      goal
      type
      lucis_point
      lucis_token
      player_mission {
        player_game_uid
        achived
        mission_uid
      }
    }
  }
`

export const UPDATE_DAILY_MISSION = gql`
  mutation ($game_uid: String!) {
    updateDailyMission(game_uid: $game_uid) {
      game_uid
      title
      img
      goal
      type
      lucis_point
      lucis_token
      player_mission {
        player_game_uid
        achived
        mission_uid
      }
    }
  }
`

const GET_PLATFORM_ACCOUNT = gql`
  query {
    getPlatformAccount {
      uid
      user_id
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