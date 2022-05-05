import { gql, useQuery } from "@apollo/client";

type Props = {
  tournament_uid?: string;
};

export function useTournamentDetail(props: Props) {
  const {
    loading,
    error,
    data: dataTournamentDetail,
  } = useQuery(GET_TOURNAMENT_DETAIL, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "cache-and-network",
  });

  const {
    loading: loadingParticipant,
    error: errorParticipant,
    data: dataParticipants,
  } = useQuery(GET_PARTICIPANTS_DETAIL, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "no-cache",
  });
  const {
    loading: loadingReferees,
    error: errorReferees,
    data: dataRefereesDetail,
  } = useQuery(GET_REFEREES_DETAIL, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "cache-and-network",
  });
  const {
    loading: loadingPrizing,
    error: errorPrizing,
    data: dataPrizing,
  } = useQuery(GET_PRIZING_DETAIL, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "cache-and-network",
  });

  const {
    loading: loadingBracket,
    error: errorBracket,
    data: dataBracket,
  } = useQuery(GET_BRACKET, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    loadingParticipant,
    loadingReferees,
    loadingPrizing,
    loadingBracket,

    error,
    errorParticipant,
    errorReferees,
    errorPrizing,
    errorBracket,

    dataTournamentDetail: dataTournamentDetail?.getTournamentDetail,
    dataParticipants: dataParticipants?.getTournamentParticipants,
    dataRefereesDetail: dataRefereesDetail?.getTournamentReferees,
    dataPrizing: dataPrizing?.getTournamentPrizing,
    dataBracket: dataBracket?.getBracket,
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
  query ($tournament_uid: String!) {
    getTournamentParticipants(tournament_uid: $tournament_uid) {
      uid
      name
      avatar
      team_members {
        uid
        is_leader
        user {
          profile {
            display_name
            avatar
          }
        }
      }
    }
  }
`;

const GET_REFEREES_DETAIL = gql`
  query ($tournament_uid: String!) {
    getTournamentReferees(tournament_uid: $tournament_uid) {
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
  query ($tournament_uid: String!) {
    getTournamentPrizing(tournament_uid: $tournament_uid) {
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
      start_at
      status

      bracketRounds {
        type
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
