import {ApolloError, ApolloQueryResult, gql, useApolloClient, useQuery} from "@apollo/client";
import {RaffleDetail, TicketList} from "../../../src/generated/graphql_p2e";
import {isEmpty} from "lodash";

type BuyRaffleTicketProps = {
  raffle_ticket_uid?: string,
  quantity?: number,
  onError?: (error: ApolloError) => void,
  onCompleted?: (data: any) => void,
}

type GetAllTicketsProps = {
  raffle_uid?: string,
  page?: number,
  limit?: number,
  display_name?: string,
}

type GetMyTicketsProps = {
  raffle_uid?: string,
  limit?: number,
  page?: number
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
    //skip: isEmpty(raffle_uid),
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache",
  })

  return {
    getRaffleDetailLoading,
    getRaffleDetailError,
    refetchRaffleDetail,
    getRaffleDetailData,
  }
}

export const useGetMyTicket = ({raffle_uid, limit, page}: GetMyTicketsProps): {
  getMyTicketsLoading: boolean,
  getMyTicketsError: ApolloError | undefined,
  refetchMyTickets: () => Promise<ApolloQueryResult<any>>,
  getMyTicketsData: {
    getMyTickets: TicketList
  },
} => {
  const {
    loading: getMyTicketsLoading,
    error: getMyTicketsError,
    refetch: refetchMyTickets,
    data: getMyTicketsData,
  } = useQuery(GET_MY_TICKET, {
    variables: {
      raffle_uid: raffle_uid,
      limit: limit,
      page: page,
    },
    skip: isEmpty(raffle_uid),
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache",
  })

  return {
    getMyTicketsLoading,
    getMyTicketsError,
    refetchMyTickets,
    getMyTicketsData,
  }
}

export const useGetAllTicket = ({raffle_uid, page, limit, display_name}: GetAllTicketsProps): {
  getAllTicketsLoading: boolean,
  getAllTicketsError: ApolloError | undefined,
  refetchAllTickets: () => Promise<ApolloQueryResult<any>>,
  getAllTicketsData: {
    getAllTickets: TicketList
  },
} => {
  const {
    loading: getAllTicketsLoading,
    error: getAllTicketsError,
    refetch: refetchAllTickets,
    data: getAllTicketsData,
  } = useQuery(GET_ALL_TICKET, {
    variables: {
      raffle_uid: raffle_uid,
      page: page,
      limit: limit,
      display_name: display_name,
    },
    skip: isEmpty(raffle_uid),
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache",
  })

  return {
    getAllTicketsLoading,
    getAllTicketsError,
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
      prize_type
      prize_amount
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
  query($raffle_uid: String!, $page: Int!, $limit: Int!) {
    getMyTickets(raffle_uid: $raffle_uid, page: $page, limit: $limit) {
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
  query($raffle_uid: String!, $page: Int!, $limit: Int!, $display_name: String) {
    getAllTickets(raffle_uid: $raffle_uid, page: $page, limit: $limit, display_name: $display_name) {
      count
      user_tickets {
        uid
        user_id
        ticket_number
        is_winner
        user {
          profile {
            display_name
            avatar
            user_name
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