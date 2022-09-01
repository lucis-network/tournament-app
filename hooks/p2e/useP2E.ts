import { ApolloError, ApolloQueryResult, gql, useQuery } from "@apollo/client";
import { CsgoMatch, CsgoMatchStatistics, GCsgoMatch, InventoryItem, InventoryPieceGroup, LolMatchStatisticGql, PiecesFilter, PlatformAccount, ReferFriendGql } from "../../src/generated/graphql_p2e";

type UseGetRecentMatchesProps = {
  offset: number
  limit: number
  platform_id: number
}

export const useGetPlatformAccount = (skip: boolean = true): {
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
    },
    skip: skip
  })

  return {
    getPlatformAccountLoading,
    getPlatformAccountError,
    refetchPlatformAccount,
    getPlatformAccountData,
  }
}

export const useGetRecentCsgoMatches = ({ offset, limit, platform_id }: UseGetRecentMatchesProps): {
  getRecentMatchesLoading: boolean,
  getRecentMatchesError: ApolloError | undefined,
  refetchRecentMatches: (v: UseGetRecentMatchesProps) => Promise<ApolloQueryResult<any>>,
  getRecentMatchesData: {
    getRecentlyCsgoMatch: GCsgoMatch
  },
} => {
  const {
    loading: getRecentMatchesLoading,
    error: getRecentMatchesError,
    refetch: refetchRecentMatches,
    data: getRecentMatchesData,
  } = useQuery(GET_CSGO_RECENT_MATCHES, {
    context: {
      endpoint: 'p2e'
    },
    variables: {
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


// export const useGetRecentLOLMatches = ({ offset, limit, platform_id }: UseGetRecentMatchesProps): {
//   getRecentMatchesLoading: boolean,
//   getRecentMatchesError: ApolloError | undefined,
//   refetchRecentMatches: (v: UseGetRecentMatchesProps) => Promise<ApolloQueryResult<any>>,
//   getRecentMatchesData: {
//     getRecentlyLolMatch: GCsgoMatch
//   },
// } => {
//   const {
//     loading: getRecentMatchesLoading,
//     error: getRecentMatchesError,
//     refetch: refetchRecentMatches,
//     data: getRecentMatchesData,
//   } = useQuery(GET_CSGO_RECENT_MATCHES, {
//     context: {
//       endpoint: 'p2e'
//     },
//     variables: {
//       offset: offset,
//       limit: limit,
//       platform_id: platform_id,
//     }
//   })

//   return {
//     getRecentMatchesLoading,
//     getRecentMatchesError,
//     refetchRecentMatches,
//     getRecentMatchesData,
//   }
// }

export const useGetStatisticMatch = (player_match_id: number, skip: boolean = true): {
  getStatisticMatchLoading: boolean,
  getStatisticMatchError: ApolloError | undefined,
  refetchStatisticMatch: () => Promise<ApolloQueryResult<any>>,
  getStatisticMatchData: {
    getCsgoMatchStatistic: CsgoMatchStatistics
  },
} => {
  const {
    loading: getStatisticMatchLoading,
    error: getStatisticMatchError,
    refetch: refetchStatisticMatch,
    data: getStatisticMatchData,
  } = useQuery(GET_CSGO_MATCH_STATISTIC, {
    context: {
      endpoint: 'p2e'
    },
    variables: {
      player_match_id,
    },
    skip: skip
  })

  return {
    getStatisticMatchLoading,
    getStatisticMatchError,
    refetchStatisticMatch,
    getStatisticMatchData,
  }
}


export const useGetLOLStatisticMatch = (player_match_id: string, skip: boolean = true): {
  getStatisticMatchLoading: boolean,
  getStatisticMatchError: ApolloError | undefined,
  refetchStatisticMatch: () => Promise<ApolloQueryResult<any>>,
  getStatisticMatchData: {
    getLolMatchStatistic: LolMatchStatisticGql
  },
} => {
  const {
    loading: getStatisticMatchLoading,
    error: getStatisticMatchError,
    refetch: refetchStatisticMatch,
    data: getStatisticMatchData,
  } = useQuery(GET_LOL_MATCH_STATISTIC, {
    context: {
      endpoint: 'p2e'
    },
    variables: {
      player_match_id,
    },
    skip: skip
  })

  return {
    getStatisticMatchLoading,
    getStatisticMatchError,
    refetchStatisticMatch,
    getStatisticMatchData,
  }
}

export function useGetReferHistory(): {
  loading: boolean,
  errorDataReferHistory: ApolloError | undefined,
  refetchDataReferHistory: () => Promise<ApolloQueryResult<any>>;
  dataReferHistory: ReferFriendGql[] | undefined
} {
  const { loading, error, data, refetch } = useQuery(GET_INVITED_FRIENTD, {
    variables: {},
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "network-only",
  });

  return {
    loading,
    errorDataReferHistory: error,
    refetchDataReferHistory: refetch,
    dataReferHistory: data?.getInvitedFriend,
  };
}

 type PropsInventoryPieces = {
   user_id?: number,
   group_filter?: string,
   search_name?: string,
}
export function useGetMyInventoryPieces(props: PropsInventoryPieces): {
  loading: boolean,
  errorMyInventoryPieces: ApolloError | undefined,
  refetchMyInventoryPieces: () => Promise<ApolloQueryResult<any>>;
  dataMyInventoryPieces: InventoryPieceGroup[] | undefined
} {
  const { loading, error, data, refetch } = useQuery(GET_MY_INVENTORY_PIECES, {
    variables: {
      user_id: props.user_id,
      group_filter: props?.group_filter == "" ? null : props?.group_filter,
      search_name: props?.search_name,
    },
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "network-only",
  });

  return {
    loading,
    errorMyInventoryPieces: error,
    refetchMyInventoryPieces: refetch,
    dataMyInventoryPieces: data?.inventoryPieces,
  };
}

export function useGetMyInventoryItems(props: PropsInventoryPieces): {
  loading: boolean,
  errorMyInventoryItems: ApolloError | undefined,
  refetchMyInventoryItems: () => Promise<ApolloQueryResult<any>>;
  dataMyInventoryItems: InventoryItem[] | undefined
} {
  const { loading, error, data, refetch } = useQuery(GET_MY_INVENTORY_ITEMS, {
    variables: {
      user_id: props.user_id,
      group_filter: props?.group_filter == "" ? null : props?.group_filter,
      search_name: props?.search_name,
    },
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "network-only",
  });

  return {
    loading,
    errorMyInventoryItems: error,
    refetchMyInventoryItems: refetch,
    dataMyInventoryItems: data?.inventoryItems,
  };
}

export function useGetMyInventoryPiecesConfig(): {
  loading: boolean,
  errorMyInventoryPiecesConfig: ApolloError | undefined,
  refetchMyInventoryPiecesConfig: () => Promise<ApolloQueryResult<any>>;
  dataMyInventoryPiecesConfig: PiecesFilter[] | undefined
} {
  const { loading, error, data, refetch } = useQuery(GET_MY_INVENTORY_PIECES_CONFIG, {
    variables: {
    },
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "network-only",
  });

  return {
    loading,
    errorMyInventoryPiecesConfig: error,
    refetchMyInventoryPiecesConfig: refetch,
    dataMyInventoryPiecesConfig: data?.piecesFilter,
  };
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

export const CONNECT_LMSS = gql`
  mutation ($summoner_name: String!) {
    connectLmss (summoner_name: $summoner_name) {
      player_uid
      avatar
      nick_name
    }
  }
`

export const CLAIM_BOX = gql`
  mutation ($platform_id: Int!, $game_uid: String!) {
    claimBox (platform_id: $platform_id, game_uid: $game_uid) 
  }
`

export const GET_OR_SET_DAILY_MISSION = gql`
  mutation ($game_uid: String!, $platform_id: Int!) {
    getOrSetDailyMission(game_uid: $game_uid, platform_id: $platform_id) {
      achieved
      uid
      mission_uid
      is_claim
      updated_at
      mission {
        level {
          lucis_point
          level
          lucis_token
        }
        csgo_mission {
          type
          map
        }
        uid
        title
        game_uid
        img
        goal
      }
    }
  }
`

export const UPDATE_DAILY_MISSION = gql`
  mutation ($game_uid: String!, $platform_id: Int!) {
    updateDailyMission(game_uid: $game_uid, platform_id: $platform_id) {
      achieved
      uid
      updated_at 
      mission_uid
      mission {
        level {
          lucis_point
          level
          lucis_token
        }
        csgo_mission {
          type
          map
        }
        uid
        title
        game_uid
        img
        goal
      }
      is_claim
    }
  }
`

export const UPDATE_CSGO_RECENTLY_MATCH = gql`
  mutation ($platform_id: Int!) {
    updateCsgoRecentlyMatch(platform_id: $platform_id) {
        id
        match_uid
        player_game_uid
        is_win
        map_img
        lucis_point
        player_statistic
        match {
          uid
          winner_team
          loser_team
          score
          end_at
          map
        }
    }
  }
`

export const UPDATE_LOL_RECENTLY_MATCH = gql`
  mutation ($platform_id: Int!) {
    updateLolRecentlyMatch(platform_id: $platform_id) {
        uid
        match_uid
        player_game_uid
        is_win
        kill
        assist
        map_img
        point
        gold_earned
        minion_killed
        deaths
        match {
          uid
          type
          end_at
          map
        }
    }
  }
`

export const CLAIM_MISSION = gql`
  mutation ($player_mission_uid: String!) {
    claimMission(player_mission_uid: $player_mission_uid)
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

export const GET_CSGO_RECENT_MATCHES = gql`
  query ($offset: Int!, $limit: Int!, $platform_id: Int!) {
    getRecentlyCsgoMatch(offset: $offset, limit: $limit, platform_id: $platform_id) {
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


export const GET_LOL_RECENT_MATCHES = gql`
  query ($offset: Int!, $limit: Int!, $platform_id: Int!) {
    getRecentlyLolMatch(offset: $offset, limit: $limit, platform_id: $platform_id) {
      matches {
        uid
        match_uid
        player_game_uid
        is_win
        kill
        assist
        map_img
        point
        gold_earned
        minion_killed
        deaths
        match {
          uid
          type
          end_at
          map
        }
      }
      total
    }
  }
`


export const GET_CSGO_MATCH_STATISTIC = gql`
  query ($player_match_id: Int!) {
    getCsgoMatchStatistic(player_match_id: $player_match_id) {
        match_uid,
        match_earning {
          id,
          win,
          kill,
          assist,
          most_kill,
          mvp,
          most_support,
          triple_kill,
          quadra_kill,
          pental_kill,
          headshot,
          most_headshot,
          least_died,
          highest_kda,
          highest_kr
        }
        map {
          name, 
          img_lg,
          img_sm
        }
        score,
        is_win,
        most_support,
        most_headshot,
        least_died,
        highest_kda,
        highest_kr,
        current_win_streak,
        player_statistic,
        end_at,
        most_kill,
        point
    }
  }
`


export const GET_LOL_MATCH_STATISTIC = gql`
  query ($player_match_id: String!) {
    getLolMatchStatistic(player_match_id: $player_match_id) {
        match_uid
        point
        is_win
        kill
        deaths
        assist
        is_most_assist
        most_kill
        eye_placed
        is_most_eye_placed
        eye_killed
        is_most_eye_killed
        double_kill
        triple_kill
        quadra_kill
        pental_kill
        aces
        minion_killed
        is_most_minion_killed
        is_mvp
        damage_taken
        is_most_damage_taken
        damage_dealt
        is_most_damage_dealt
        gold_earned
        is_most_gold_earned
        player_statistic
        match {
          end_at
          map
          type
          score
        }
    }
  }
`

export const GET_LUCIS_MISSION = gql`
  query ($game_uid: String!, $platform_id: Int!) {
    getLucisMission(game_uid: $game_uid, platform_id: $platform_id) {
      achieved
      uid
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
      }
    }
  }
`


export const UPGRADE_LUCIS_MISSION = gql`
  mutation ($player_mission_uid: String!, $platform_id: Int!) {
    upgradeLucisMission(player_mission_uid: $player_mission_uid, platform_id: $platform_id) {
      achieved
      uid
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
        img
        goal
      }
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

export const HAS_JOINED_DISCORD = gql`
  query {
    hasJoinedDiscord
  }
`

export const CREATE_INVITE_LINK_DISCORD = gql`
  query {
    createInviteLinkDiscord
  }
`


export const GET_DAILY_POINT = gql`
query ($game_uid: String!, $platform_id: Int!) {
  getDailyPoint(game_uid: $game_uid, platform_id: $platform_id)
}
`

export const IS_CLAIM_BOX = gql`
query ($game_uid: String!, $platform_id: Int!) {
  isClaimBox(game_uid: $game_uid, platform_id: $platform_id)
}
`

export const GET_NUMBER_CONNECTED_USER = gql`
query {
  getNumberConnectedUser {
    game,
    platform,
    number_user
  }
}
`

export const GET_INVITED_FRIENTD = gql`
query {
  getInvitedFriend {
    invited_user_id,
    status,
    user {
      code
      email
      profile {
        display_name
      }
    }
  }
}
`

export const GET_MY_INVENTORY_PIECES = gql`
query ($user_id: Int!, $group_filter: String, $search_name: String) {
  inventoryPieces (user_id: $user_id, group_filter: $group_filter, search_name: $search_name) {
    pieces { 
        uid 
        user_id
        prize {
          title
          desc
          img
          rarity
          quantity_in_stock
        }
        quantity
     }
    type
    achieved
  }
}
`

export const GET_MY_INVENTORY_ITEMS = gql`
query ($user_id: Int!, $group_filter: ItemGroup, $search_name: String) {
  inventoryItems (user_id: $user_id, group_filter: $group_filter, search_name: $search_name) {
   prize {
    id
    title
    desc
    img
    rarity
    quantity_in_stock
    category {
      item_group
      piece_group
      prize_type
      currency_type    
    }
   }
   quantity
  }
}
`

export const GET_MY_INVENTORY_PIECES_CONFIG = gql`
query {
  piecesFilter {
    piece_group
  }
}
`

export const ASSEMBLE_INVENTORY_PIECE = gql`
  mutation ($piece_group: String!) {
    assemble (piece_group: $piece_group) {
      uid
      prize_id
      prize {
        title
        desc
        img
      }
    }
  }
`

export const CLAIM_CSGO_ITEM = gql`
  mutation ($input: ClaimCSGOInput!) {
    claimCSGOItem (input: $input)
  }
`

export const CLAIM_PHYSICAL_ITEM = gql`
  mutation ($input: ClaimPhysicalInput!) {
    claimPhysicalItem (input: $input)
  }
`