import {ApolloError, ApolloQueryResult, gql, useQuery} from "@apollo/client"
import {PlatformAccount, Raffle, RecentWinner, SponsorRaffle, UserTicket} from "../../../src/generated/graphql_p2e";
import {isEmpty} from "lodash";

export const useGetRecentWinners = (): {
  getRecentWinnersLoading: boolean,
  getRecentWinnersError: ApolloError | undefined,
  refetchRecentWinners: () => Promise<ApolloQueryResult<any>>,
  getRecentWinnersData: {
    getRecentWinners: RecentWinner[]
  },
} => {
  const {
    loading: getRecentWinnersLoading,
    error: getRecentWinnersError,
    refetch: refetchRecentWinners,
    data: getRecentWinnersData,
  } = useQuery(GET_RECENT_WINNERS, {
    context: {
      endpoint: 'p2e'
    }
  })

  return {
    getRecentWinnersLoading,
    getRecentWinnersError,
    refetchRecentWinners,
    getRecentWinnersData,
  }
}

export const useGetFeaturedRaffle = (): {
  getFeaturedRaffleLoading: boolean,
  getFeaturedRaffleError: ApolloError | undefined,
  refetchFeaturedRaffle: () => Promise<ApolloQueryResult<any>>,
  getFeaturedRaffleData: {
    rafflesInCurrentMonth: Raffle[]
  },
} => {
  const {
    loading: getFeaturedRaffleLoading,
    error: getFeaturedRaffleError,
    refetch: refetchFeaturedRaffle,
    data: getFeaturedRaffleData,
  } = useQuery(GET_RAFFLE_IN_CURRENT_MONTH, {
    context: {
      endpoint: 'p2e'
    }
  })

  return {
    getFeaturedRaffleLoading,
    getFeaturedRaffleError,
    refetchFeaturedRaffle,
    getFeaturedRaffleData,
  }
}

export const useGetSponsorRaffle = (): {
  getSponsorRaffleLoading: boolean,
  getSponsorRaffleError: ApolloError | undefined,
  refetchSponsorRaffle: () => Promise<ApolloQueryResult<any>>,
  getSponsorRaffleData: {
    getSponsorRaffles: SponsorRaffle[]
  },
} => {
  const {
    loading: getSponsorRaffleLoading,
    error: getSponsorRaffleError,
    refetch: refetchSponsorRaffle,
    data: getSponsorRaffleData,
  } = useQuery(GET_SPONSOR_RAFFLE, {
    context: {
      endpoint: 'p2e'
    }
  })

  return {
    getSponsorRaffleLoading,
    getSponsorRaffleError,
    refetchSponsorRaffle,
    getSponsorRaffleData,
  }
}

export const useSearchRaffles = (name: string, skipRaflleUid?: string): {
  searchRafflesLoading: boolean,
  searchRafflesError: ApolloError | undefined,
  refetchSearchRafflesRaffle: () => Promise<ApolloQueryResult<any>>,
  searchRafflesData: {
    searchRaffle: Raffle[]
  },
} => {
  const {
    loading: searchRafflesLoading,
    error: searchRafflesError,
    refetch: refetchSearchRafflesRaffle,
    data: searchRafflesData,
  } = useQuery(SEARCH_RAFFLE, {
    variables: {
      filter: {
        name: name,
        skip_raffle_uid: skipRaflleUid
      }
    },
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  return {
    searchRafflesLoading,
    searchRafflesError,
    refetchSearchRafflesRaffle,
    searchRafflesData,
  }
}

const GET_RECENT_WINNERS = gql`
  query {
    getRecentWinners {
      user {
        id
        profile {
          user_name
          display_name
          avatar
        }
      }
      raffle {
        uid
        img
        valued_at
      }
    }
  }
`

const GET_RAFFLE_IN_CURRENT_MONTH = gql`
  query {
    rafflesInCurrentMonth {
      uid
      name
      valued_at
      lucis_point_reward
      img
      type
      end_at
    }
  }
`

const GET_SPONSOR_RAFFLE = gql`
  query {
    getSponsorRaffles {
      uid
      name
      img
      link
      created_at
      updated_at
    }
  }
`

const SEARCH_RAFFLE = gql`
  query($filter: RaffleFilter!) {
    searchRaffle(filter: $filter) {
      uid
      name
      img
      type
      valued_at
      lucis_point_reward
    }
  }
`