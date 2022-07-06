import {ApolloError, ApolloQueryResult, gql, useApolloClient, useQuery} from "@apollo/client";
import {RaffleDetail, TicketList, UserTicket} from "../../../src/generated/graphql_p2e";
import {isEmpty} from "lodash";

type BuyRaffleTicketProps = {
  raffle_ticket_uid?: string,
  quantity?: number,
  onError?: (error: ApolloError) => void,
  onCompleted?: (data: any) => void,
}

export const useGetRaffleDetail = (raffle_uid?: string): {
  getRaffleDetailLoading: boolean,
  getRaffleDetailError: ApolloError | undefined,
  refetchRaffleDetail: () => Promise<ApolloQueryResult<any>>,
  getRaffleDetailData: {
    getRaffleDetail: RaffleDetail
  },
} => {
  const {
    loading: getRaffleDetailLoading,
    error: getRaffleDetailError,
    refetch: refetchRaffleDetail,
    data: getRaffleDetailData,
  } = useQuery(GET_RAFFLE_DETAIL, {
    variables: {
      raffle_uid: raffle_uid
    },
    skip: isEmpty(raffle_uid),
    context: {
      endpoint: 'p2e'
    }
  })

  return {
    getRaffleDetailLoading,
    getRaffleDetailError,
    refetchRaffleDetail,
    getRaffleDetailData,
  }
}

export const useGetMyTicket = (raffle_uid: string): {
  getMyTicketsLoading: boolean,
  getMyTicketslError: ApolloError | undefined,
  refetchMyTickets: () => Promise<ApolloQueryResult<any>>,
  getMyTicketsData: {
    getMyTickets: TicketList
  },
} => {
  const {
    loading: getMyTicketsLoading,
    error: getMyTicketslError,
    refetch: refetchMyTickets,
    data: getMyTicketsData,
  } = useQuery(GET_MY_TICKET, {
    variables: {
      raffle_uid: raffle_uid
    },
    skip: isEmpty(raffle_uid),
    context: {
      endpoint: 'p2e'
    }
  })

  return {
    getMyTicketsLoading,
    getMyTicketslError,
    refetchMyTickets,
    getMyTicketsData,
  }
}

export const useGetAllTicket = (raffle_uid: string): {
  getAllTicketsLoading: boolean,
  getAllTicketslError: ApolloError | undefined,
  refetchAllTickets: () => Promise<ApolloQueryResult<any>>,
  getAllTicketsData: {
    getAllTickets: TicketList
  },
} => {
  const {
    loading: getAllTicketsLoading,
    error: getAllTicketslError,
    refetch: refetchAllTickets,
    data: getAllTicketsData,
  } = useQuery(GET_ALL_TICKET, {
    variables: {
      raffle_uid: raffle_uid
    },
    skip: isEmpty(raffle_uid),
    context: {
      endpoint: 'p2e'
    }
  })

  return {
    getAllTicketsLoading,
    getAllTicketslError,
    refetchAllTickets,
    getAllTicketsData,
  }
}

export const useBuyRaffleTicket = (): {
  buyRaffleTicket: ({raffle_ticket_uid, quantity, onError, onCompleted}: BuyRaffleTicketProps) => Promise<any>
} => {
  const client = useApolloClient()
  const buyRaffleTicket = async ({raffle_ticket_uid, quantity, onError, onCompleted}: BuyRaffleTicketProps) => {
    try {
      const result = await client.mutate({
        mutation: BUY_RAFFLE_TICKET,
        variables: {
          input: {
            raffle_ticket_uid: raffle_ticket_uid,
            quantity: quantity,
          },
        },
        context: {
          endpoint: 'p2e'
        }
      })
      onCompleted && onCompleted(result)
    } catch (error: any) {
      onError && onError(error)
    }
  }

  return {
    buyRaffleTicket
  }
}

const GET_RAFFLE_DETAIL = gql`
  query($raffle_uid: String!) {
    getRaffleDetail(raffle_uid: $raffle_uid) {
      uid
      name
      desc
      lucis_point_reward
      lucis_token_reward
      nft_reward
      winner_total
      valued_at
      img
      status
      ticket {
        uid
        raffle_uid
        cost
        cost_type
        user_limit
        total_limit
        bought_count
        user_ticket {
          uid
          user_id
          ticket_number
          ticket_uid
        }
        created_at
        updated_at
      }
      end_at
      created_at
      updated_at
      raffle_sponsors {
        uid
        name
        img
        link
      }
      regions
      type
    }
  }
`

const GET_MY_TICKET = gql`
  query($raffle_uid: String!) {
    getMyTickets(raffle_uid: $raffle_uid) {
      count
      user_tickets {
        uid
        user_id
        ticket_number
      }
    }
  }
`

const GET_ALL_TICKET = gql`
  query($raffle_uid: String!) {
    getAllTickets(raffle_uid: $raffle_uid) {
      count
      user_tickets {
        uid
        user_id
        ticket_number
        user {
          profile {
            display_name
            avatar
          }
        }
      }
    }
  }
`

const BUY_RAFFLE_TICKET = gql`
  mutation($input: UserTicketInputGql!) {
    buyRaffleTicket(input: $input)
  }
`