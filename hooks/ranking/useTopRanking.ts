import {ApolloError, ApolloQueryResult, gql, useQuery} from "@apollo/client";
import {TopRanking} from "../../src/generated/graphql_p2e";

type GetTopRankingProps = {
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  year: number,
}

export const useTopRanking = ({month, year}: GetTopRankingProps): {
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
      month: month,
      year: year,
    },
    skip: !month || !year,
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

const GET_TOP_RANKING = gql`
  query ($month: Int!, $year: Int!) {
    getTopRanking (month: $month, year: $year) {
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