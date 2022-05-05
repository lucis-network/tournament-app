import { gql, useQuery } from "@apollo/client";

type Props = {
  uid?: string;
  tournament_uid?: string;
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

export function useTournamentDetail(props: Props) {
  const {
    loading,
    error,
    data: dataTournamentDetail,
  } = useQuery(GET_TOURNAMENT_DETAIL, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    dataTournamentDetail: dataTournamentDetail?.getTournamentDetail,
  };
}

export function useBracket(props: Props) {
  const {
    loading,
    error,
    data: dataTournamentDetail,
  } = useQuery(GET_BRACKET, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    dataBracket: dataTournamentDetail?.getBracket,
  };
}

// ======= GET DATA GRAPQL

const GET_TOURNAMENT_DETAIL = gql`
  query ($tournament_uid: String!) {
    getTournamentDetail(tournament_uid: $tournament_uid) {
      name
      cover
      thumbnail
      team_size
      participants
      desc
      rules
      brackets {
        type
        start_at
        status
      }
      game {
        name
      }
      user {
        profile {
          display_name
        }
      }
      sponsorSlot {
        sponsor_transactions {
          amount
        }
      }
      currency_uid
    }
  }
`;

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

const GET_BRACKET = gql`
  query ($tournament_uid: String!) {
    getBracket(tournament_uid: $tournament_uid) {
      type
      bracketTeams {
        uid
      }
      bracketRounds {
        title
        bracketMatchs {
          team1_uid
          team2_uid
          score_1
          score_2
        }
      }
    }
  }
`;
