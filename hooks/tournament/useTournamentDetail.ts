import { gql, useQuery } from "@apollo/client";

type Props = {
  uid?: string;
};

export function useParticipant(props: Props) {
  const {
    loading,
    error,
    data: dataParticipants,
  } = useQuery(GET_PARTICIPANTS_DETAIL, {
    variables: { uid: props?.uid },
    fetchPolicy: "no-cache",
  });

  return {
    loading,
    error,
    dataParticipants,
  };
}

export function useReferees(props: Props) {
  const {
    loading,
    error,
    data: dataRefereesDetail,
  } = useQuery(GET_REFEREES_DETAIL, {
    variables: { uid: props?.uid },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    dataRefereesDetail,
  };
}

export function usePrizing(props: Props) {
  const {
    loading,
    error,
    data: dataPrizing,
  } = useQuery(GET_PRIZING_DETAIL, {
    variables: { uid: props?.uid },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    dataPrizing,
  };
}

// GET DATA GRAPQL

const GET_PARTICIPANTS_DETAIL = gql`
  query ($uid: String!) {
    getTournamentDetailParticipants(uid: $uid) {
      uid
      name
      avatar
      team_members {
        uid
      }
    }
  }
`;

const GET_REFEREES_DETAIL = gql`
  query ($uid: String!) {
    getTournamentDetailReferees(uid: $uid) {
      user {
        profile {
          user_id
          display_name
          avatar
          twitter
          facebook
          telegram
          discord
        }
      }
    }
  }
`;

const GET_PRIZING_DETAIL = gql`
  query ($uid: String!) {
    getTournamentDetailPrizing(uid: $uid) {
      quantity
      percentage
      position
      reward
    }
  }
`;
