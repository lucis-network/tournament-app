import {ApolloError, gql, useQuery} from "@apollo/client";
import {UserTicketGql} from "../../src/generated/graphql_p2e";

type Props = {
  raffle_uid?: string;
  skip?: boolean;
};

export function useGetWonTickets(props: Props): {
  loading: boolean,
  error: ApolloError | undefined,
  dataWonTickets: UserTicketGql[] | undefined
} {
  const { loading, error, data } = useQuery(GET_WON_TICKETS, {
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
    dataWonTickets: data?.getWonTickets,
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
        email
        profile {
          display_name
          avatar
          user_name
        }
      }
    }
  }
`;
