import {ApolloError, ApolloQueryResult, gql, useQuery} from "@apollo/client";
import {RankingSeasonDto, TopRanking} from "../../src/generated/graphql_p2e";

export type AcceptedMonths = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type GetTopRankingProps = {
  seasonId: string,
}

export const useTopRanking = ({seasonId}: GetTopRankingProps): {
  getTopRankingLoading: boolean,
  getTopRankingError: ApolloError | undefined,
  refetchTopRanking: () => Promise<ApolloQueryResult<any>>,
  dataTopRanking: {
    getTopRanking: TopRanking
  },
} => {
  const {
    loading: getTopRankingLoading,
    error: getTopRankingError,
    refetch: refetchTopRanking,
    data: dataTopRanking,
  } = useQuery(GET_TOP_RANKING, {
    variables: {
      seasonId: seasonId,
    },
    skip: !seasonId,
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  return {
    getTopRankingLoading,
    getTopRankingError,
    refetchTopRanking,
    dataTopRanking
  }
}

export const useRankingSeason = (): {
  getRankingSeasonLoading: boolean,
  getRankingSeasonError: ApolloError | undefined,
  refetchRankingSeason: () => Promise<ApolloQueryResult<any>>,
  dataRankingSeason: {
    getRankingSeasons: RankingSeasonDto[]
  },
} => {
  const {
    loading: getRankingSeasonLoading,
    error: getRankingSeasonError,
    refetch: refetchRankingSeason,
    data: dataRankingSeason,
  } = useQuery(GET_RANKING_SEASON, {
    context: {
      endpoint: 'p2e'
    },
  })

  return {
    getRankingSeasonLoading,
    getRankingSeasonError,
    refetchRankingSeason,
    dataRankingSeason,
  }
}

const GET_TOP_RANKING = gql`
  query ($seasonId: String!) {
    getTopRanking (seasonId: $seasonId) {
      raffle {
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
      playcore {
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
      tournament {
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
  }
`

const GET_RANKING_SEASON = gql`
  query {
    getRankingSeasons {
      uid
      name
      description
      fromDate
      toDate
      status
    }
  }
`