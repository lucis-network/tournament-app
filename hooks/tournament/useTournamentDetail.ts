import {
  ApolloError,
  ApolloQueryResult,
  gql,
  useMutation,
  useQuery,
} from "@apollo/client";
import { SponsorSlot } from "src/generated/graphql";

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

  const [joinTournament] = useMutation(JOIN_TOURNAMENT);

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

    joinTournament,
  };
}

export function useSponsors(props: Props): {
  loading: boolean;
  error: ApolloError | undefined;
  dataSponsors: {
    getSponsorSlot: SponsorSlot[];
  };
  refetch: () => Promise<ApolloQueryResult<any>>;
} {
  const {
    loading,
    error,
    data: dataSponsors,
    refetch,
  } = useQuery(GET_SPONSOR_DETAIL, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  return {
    loading,
    error,
    dataSponsors,
    refetch,
  };
}

export function useClaimReward(props: Props) {
  const { loading, error, data } = useQuery(CLAIM_REWARD, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    data: data?.getTournamentReward,
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
        logo
      }
      user {
        profile {
          display_name
          avatar
        }
      }
      sponsorSlot {
        sponsor_transactions {
          amount
        }
      }
      currency_uid
      totalDonation
      totalPrizePool
      regions
      currency {
        symbol
        chain_symbol
      }
      tournament_status
      additionPrize
      cache_tournament {
        team_participated
        tournament_uid
      }
      brackets {
        start_at
        status
      }
    }
  }
`;

const GET_PARTICIPANTS_DETAIL = gql`
  query ($tournament_uid: String!) {
    getTournamentParticipants(tournament_uid: $tournament_uid) {
      uid
      name
      avatar
      BracketTeam {
        bracket_uid
        bracketTeamMembers {
          uid
          is_leader
          user {
            id
            profile {
              display_name
              avatar
            }
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

const GET_SPONSOR_DETAIL = gql`
  query ($tournament_uid: String!) {
    getSponsorSlot(tournament_uid: $tournament_uid) {
      uid
      name
      max
      min
      show_name
      sponsor_transactions {
        uid
        order
        logo
        name
      }
    }
  }
`;

const CLAIM_REWARD = gql`
  query ($tournament_uid: String!) {
    getTournamentReward(tournament_uid: $tournament_uid) {
      reward_type
      rank
      amount
      symbol
    }
  }
`;

const JOIN_TOURNAMENT = gql`
  mutation joinTournament($data: GBracketTeamInput!) {
    joinTournament(data: $data)
  }
`;
