import { ApolloError, ApolloQueryResult, gql, useQuery } from "@apollo/client";
import {GMatch, PlatformAccount} from "../../src/generated/graphql_p2e";

type UseGetRecentMatchesProps = {
  game_uid: string
  offset: number
  limit: number
  platform_id: number
}

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

export const useGetRecentMatches = ({game_uid, offset, limit, platform_id}: UseGetRecentMatchesProps): {
  getRecentMatchesLoading: boolean,
  getRecentMatchesError: ApolloError | undefined,
  refetchRecentMatches: () => Promise<ApolloQueryResult<any>>,
  getRecentMatchesData: {
    getRecentlyMatch: GMatch
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
    },
    variables: {
      game_uid: game_uid,
      offset: offset,
      limit: limit,
      platform_id: platform_id,
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

export const GET_OR_SET_DAILY_MISSION = gql`
  mutation ($game_uid: String!) {
    getOrSetDailyMission(game_uid: $game_uid) {
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

export const CLAIM_MISSION = gql`
  mutation ($mission_uid: String!) {
    claimMission(mission_uid: $mission_uid)
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

export const GET_RECENT_MATCHES = gql`
  query ($game_uid: String!, $offset: Int!, $limit: Int!, $platform_id: Int!) {
    getRecentlyMatch(game_uid: $game_uid, offset: $offset, limit: $limit, platform_id: $platform_id) {
      matches {
        id
        match_uid
        player_game_uid
        is_win
        map_img
        match {
          uid
          game_uid
          winner_team
          loser_team
          score
          end_at
        }
      }
      total
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