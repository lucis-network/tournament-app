import {ApolloError, ApolloQueryResult, gql, useQuery} from "@apollo/client";
import {UserRanking} from "../../src/generated/graphql_p2e";

type GetRankingProps = {
  seasonId: string,
  skip?: boolean,
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

type GetUserRankingProps = {
  userId?: number,
  seasonId: string,
  skip?: boolean,
}

export const useUserRaffleRanking = ({userId, seasonId, skip}: GetUserRankingProps): {
  getUserRaffleRankingLoading: boolean,
  getUserRaffleRankingError: ApolloError | undefined,
  refetchUserRaffleRanking: () => Promise<ApolloQueryResult<any>>,
  dataUserRaffleRanking: {
    getUserRaffleRanking: UserRanking
  },
} => {
  const {
    loading: getUserRaffleRankingLoading,
    error: getUserRaffleRankingError,
    refetch: refetchUserRaffleRanking,
    data: dataUserRaffleRanking,
  } = useQuery(GET_USER_RAFFLE_RANKING, {
    variables: {
      user_id: parseInt(userId as unknown as string),
      seasonId: seasonId,
    },
    skip: skip,
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  return {
    getUserRaffleRankingLoading,
    getUserRaffleRankingError,
    refetchUserRaffleRanking,
    dataUserRaffleRanking
  }
}

export const useUserPlaycoreRanking = ({userId, seasonId, skip}: GetUserRankingProps): {
  getUserPlaycoreRankingLoading: boolean,
  getUserPlaycoreRankingError: ApolloError | undefined,
  refetchUserPlaycoreRanking: () => Promise<ApolloQueryResult<any>>,
  dataUserPlaycoreRanking: {
    getUserPlaycoreRanking: UserRanking
  },
} => {
  const {
    loading: getUserPlaycoreRankingLoading,
    error: getUserPlaycoreRankingError,
    refetch: refetchUserPlaycoreRanking,
    data: dataUserPlaycoreRanking,
  } = useQuery(GET_USER_PLAYCORE_RANKING, {
    variables: {
      user_id: parseInt(userId as unknown as string),
      seasonId: seasonId,
    },
    skip: skip,
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  return {
    getUserPlaycoreRankingLoading,
    getUserPlaycoreRankingError,
    refetchUserPlaycoreRanking,
    dataUserPlaycoreRanking
  }
}

export const useUserArenaRanking = ({userId, seasonId, skip}: GetUserRankingProps): {
  getUserArenaRankingLoading: boolean,
  getUserArenaRankingError: ApolloError | undefined,
  refetchUserArenaRanking: () => Promise<ApolloQueryResult<any>>,
  dataUserArenaRanking: {
    getUserTournamentRanking: UserRanking
  },
} => {
  const {
    loading: getUserArenaRankingLoading,
    error: getUserArenaRankingError,
    refetch: refetchUserArenaRanking,
    data: dataUserArenaRanking,
  } = useQuery(GET_USER_ARENA_RANKING, {
    variables: {
      user_id: parseInt(userId as unknown as string),
      seasonId: seasonId,
    },
    skip: skip,
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  return {
    getUserArenaRankingLoading,
    getUserArenaRankingError,
    refetchUserArenaRanking,
    dataUserArenaRanking
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
  query ($seasonId: String!) {
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

const GET_USER_RAFFLE_RANKING = gql`
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

const GET_USER_ARENA_RANKING = gql`
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

const GET_USER_PLAYCORE_RANKING = gql`
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