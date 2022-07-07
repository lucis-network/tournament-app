import {ApolloError, ApolloQueryResult, gql, useQuery} from "@apollo/client";
import {UserTicketGql, UserWonTicketGql} from "../../src/generated/graphql_p2e";

type Props = {
  raffle_uid?: string;
  skip?: boolean;
};

export function useGetWonTickets(props: Props): {
  loading: boolean,
  error: ApolloError | undefined,
  refetch: () => Promise<ApolloQueryResult<any>>;
  dataWonTickets: UserTicketGql[] | undefined
} {
  const { loading, error, data, refetch } = useQuery(GET_WON_TICKETS, {
    variables: { raffle_uid: props?.raffle_uid },
    context: {
      endpoint: 'p2e'
    },
    skip: props?.skip,
    fetchPolicy: "network-only",
  });

  return {
    loading,
    error,
    refetch,
    dataWonTickets: data?.getWonTickets,
  };
}

export function useMyWonTickets(props: Props): {
  loading: boolean,
  error: ApolloError | undefined,
  refetchMyWonTickets: () => Promise<ApolloQueryResult<any>>;
  dataMyWonTickets: UserWonTicketGql[] | undefined
} {
  const { loading, error, data, refetch } = useQuery(GET_MY_WON_TICKETS, {
    variables: { raffle_uid: props?.raffle_uid },
    context: {
      endpoint: 'p2e'
    },
    skip: props?.skip,
    fetchPolicy: "network-only",
  });

  return {
    loading,
    error,
    refetchMyWonTickets: refetch,
    dataMyWonTickets: data?.myWonTickets,
  };
}

const GET_WON_TICKETS = gql`
  query ($raffle_uid: String!) {
    getWonTickets(raffle_uid: $raffle_uid) {
      uid
      user_id
      ticket_number
      user {
        id
        code
        profile {
          display_name
          avatar
          user_name
        }
      }
    }
  }
`;

const GET_MY_WON_TICKETS = gql`
  query ($raffle_uid: String!) {
    myWonTickets(raffle_uid: $raffle_uid) {
      uid
      user_id
      ticket_number
      is_winner
      is_claimed
    }
  }
`;

export const CLAIM_RAFFLE_TICKETS = gql`
  mutation ($raffle_uid: String!, $ticket_number: String!) {
    claimRaffle (raffle_uid: $raffle_uid, ticket_number: $ticket_number) 
  }
`