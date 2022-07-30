import {ApolloError, ApolloQueryResult, gql, useQuery} from "@apollo/client";
import {UserRanking} from "../../src/generated/graphql_p2e";

type GetRankingProps = {
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  year: number,
  skip?: boolean,
}

type GetUserRankingProps = {
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  year: number,
  user_id: number,
}

export const usePlaycoreRanking = ({month, year, skip}: GetRankingProps): {
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
      month: month,
      year: year,
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

export const useArenaRanking = ({month, year, skip}: GetRankingProps): {
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
      month: month,
      year: year,
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

export const useRaffleRanking = ({month, year, skip}: GetRankingProps): {
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
      month: month,
      year: year,
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
  query ($month: Int!, $year: Int!) {
    getPlaycoreRanking (month: $month, year: $year) {
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
  query ($month: Int!, $year: Int!) {
    getTournamentRanking (month: $month, year: $year) {
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
  query ($month: Int!, $year: Int!) {
    getRaffleRanking (month: $month, year: $year) {
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