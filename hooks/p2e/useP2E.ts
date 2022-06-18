import { ApolloError, ApolloQueryResult, gql, useQuery } from "@apollo/client";
import { GMatch, PlatformAccount } from "../../src/generated/graphql_p2e";

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

export const useGetRecentMatches = ({ game_uid, offset, limit, platform_id }: UseGetRecentMatchesProps): {
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
  mutation ($game_uid: String!, $platform_id: Int!) {
    getOrSetDailyMission(game_uid: $game_uid, platform_id: $platform_id) {
      achieved
      mission_uid
      is_claim
      updated_at
      mission {
        level {
          lucis_point
          level
          lucis_token
        }
        uid
        title
        game_uid
        img
        goal
        type
        map
      }
    }
  }
`

export const UPDATE_DAILY_MISSION = gql`
  mutation ($game_uid: String!, $platform_id: Int!) {
    updateDailyMission(game_uid: $game_uid, platform_id: $platform_id) {
      achieved
      updated_at 
      mission_uid
      mission {
        level {
          lucis_point
          level
          lucis_token
        }
        uid
        title
        game_uid
        img
        goal
        type
      }
      is_claim
    }
  }
`

export const UPDATE_RECENTLY_MATCH = gql`
  mutation ($game_uid: String!, $platform_id: Int!) {
    updateRecentlyMatch(game_uid: $game_uid, platform_id: $platform_id) {
        id
        match_uid
        player_game_uid
        is_win
        map_img
        lucis_point
        player_statistic
        match {
          uid
          game_uid
          winner_team
          loser_team
          score
          end_at
          map
        }
    }
  }
`

export const CLAIM_MISSION = gql`
  mutation ($mission_uid: String!) {
    claimMission(mission_uid: $mission_uid)
  }
`

export const REROLL_MISSION = gql`
  mutation ($player_mission_uid: String!) {
    rerollMission(player_mission_uid: $player_mission_uid) {
      uid
      player_game_uid
      achieved
      mission_uid
      mission {
        game_uid
        goal
        img
        title
        type
        uid
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
      platform_id
      platform {
        id
        name
        accounts {
          uid
          user_id
          player_uid
          avatar
          nick_name
          country_code
          platform_id
          access_token
          id_token
        }
      }
      created_at
      updated_at
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
        lucis_point
        player_statistic
        match {
          uid
          game_uid
          winner_team
          loser_team
          score
          end_at
          map
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