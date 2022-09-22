import {ApolloError, ApolloQueryResult, gql, useQuery} from "@apollo/client";
import {UserRanking} from "../../src/generated/graphql_p2e";

type GetRankingProps = {
  seasonId?: string,
  skip?: boolean,
}

type GetUserRankingProps = {
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  year: number,
  user_id: number,
}

export const usePlaycoreRanking = ({seasonId, skip}: GetRankingProps): {
  getPlaycoreRankingLoading: boolean,
  getPlaycoreRankingError: ApolloError | undefined,
  refetchPlaycoreRanking: () => Promise<ApolloQueryResult<any>>,
  dataPlaycoreRanking: {
    getPlaycoreRanking: UserRanking[]
  },
} => {
  const {
    loading: getPlaycoreRankingLoading,
    error: getPlaycoreRankingError,
    refetch: refetchPlaycoreRanking,
    data: dataPlaycoreRanking,
  } = useQuery(GET_PLAYCORE_RANKING, {
    variables: {
      seasonId: seasonId,
    },
    skip: skip,
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  return {
    getPlaycoreRankingLoading,
    getPlaycoreRankingError,
    refetchPlaycoreRanking,
    dataPlaycoreRanking
  }
}

export const useArenaRanking = ({seasonId, skip}: GetRankingProps): {
  getArenaRankingLoading: boolean,
  getArenaRankingError: ApolloError | undefined,
  refetchArenaRanking: () => Promise<ApolloQueryResult<any>>,
  dataArenaRanking: {
    getTournamentRanking: UserRanking[]
  },
} => {
  const {
    loading: getArenaRankingLoading,
    error: getArenaRankingError,
    refetch: refetchArenaRanking,
    data: dataArenaRanking,
  } = useQuery(GET_ARENA_RANKING, {
    variables: {
      seasonId: seasonId,
    },
    skip: skip,
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  return {
    getArenaRankingLoading,
    getArenaRankingError,
    refetchArenaRanking,
    dataArenaRanking
  }
}

export const useRaffleRanking = ({seasonId, skip}: GetRankingProps): {
  getRaffleRankingLoading: boolean,
  getRaffleRankingError: ApolloError | undefined,
  refetchRaffleRanking: () => Promise<ApolloQueryResult<any>>,
  dataRaffleRanking: {
    getRaffleRanking: UserRanking[]
  },
} => {
  const {
    loading: getRaffleRankingLoading,
    error: getRaffleRankingError,
    refetch: refetchRaffleRanking,
    data: dataRaffleRanking,
  } = useQuery(GET_RAFFLE_RANKING, {
    variables: {
      seasonId: seasonId,
    },
    skip: skip,
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  return {
    getRaffleRankingLoading,
    getRaffleRankingError,
    refetchRaffleRanking,
    dataRaffleRanking
  }
}

const GET_PLAYCORE_RANKING = gql`
  query ($seasonId: String!) {
    getPlaycoreRanking (seasonId: $seasonId) {
      id
      code
      email
      profile {
        user_name
        display_name
        avatar
      }
      total_earning
      rank
    }
  }
`

const GET_ARENA_RANKING = gql`
  query ($seasonId: String) {
    getTournamentRanking (seasonId: $seasonId) {
      id
      code
      email
      profile {
        user_name
        display_name
        avatar
      }
      total_earning
      rank
    }
  }
`

const GET_RAFFLE_RANKING = gql`
  query ($seasonId: String!) {
    getRaffleRanking (seasonId: $seasonId) {
      id
      code
      email
      profile {
        user_name
        display_name
        avatar
      }
      total_earning
      rank
    }
  }
`

export const GET_USER_RANK_PLAYCORE = gql`
    query ($user_id: Int!, $seasonId: String!) {
        getUserPlaycoreRanking (user_id: $user_id, seasonId: $seasonId) {
            id
            code
            email
            profile {
                user_name
                display_name
                avatar
            }
            total_earning
            rank
        }
    }
`

export const GET_USER_RANK_TOURNAMENT = gql`
    query ($user_id: Int!, $seasonId: String!) {
        getUserTournamentRanking (user_id: $user_id, seasonId: $seasonId) {
            id
            code
            email
            profile {
                user_name
                display_name
                avatar
            }
            total_earning
            rank
        }
    }
`

export const GET_USER_RANK_RAFFLE = gql`
    query ($user_id: Int!, $seasonId: String!) {
        getUserRaffleRanking (user_id: $user_id, seasonId: $seasonId) {
            id
            code
            email
            profile {
                user_name
                display_name
                avatar
            }
            total_earning
            rank
        }
    }
`