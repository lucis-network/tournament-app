import {
  ApolloError,
  ApolloQueryResult,
  gql,
  useMutation,
  useQuery,
} from "@apollo/client";
import { SponsorSlot, TournamentGql } from "src/generated/graphql";

type Props = {
  tournament_uid?: string;
  skip?: boolean;
};

export function useTournamentDetail(props: Props) {
  const {
    loading,
    error,
    data: dataTournamentDetail,
    refetch,
  } = useQuery(GET_TOURNAMENT_DETAIL, {
    variables: { tournament_uid: props?.tournament_uid },
    skip: props?.skip,
    fetchPolicy: "network-only",
  });

  const {
    loading: loadingParticipant,
    error: errorParticipant,
    data: dataParticipants,
    refetch: refreshParticipant,
  } = useQuery(GET_PARTICIPANTS_DETAIL, {
    variables: { tournament_uid: props?.tournament_uid },
    skip: props?.skip,
    fetchPolicy: "no-cache",
  });

  const {
    loading: loadingReferees,
    error: errorReferees,
    data: dataRefereesDetail,
  } = useQuery(GET_REFEREES_DETAIL, {
    variables: { tournament_uid: props?.tournament_uid },
    skip: props?.skip,
    fetchPolicy: "cache-and-network",
  });
  const {
    loading: loadingPrizing,
    error: errorPrizing,
    data: dataPrizing,
  } = useQuery(GET_PRIZING_DETAIL, {
    variables: { tournament_uid: props?.tournament_uid },
    skip: props?.skip,
    fetchPolicy: "cache-and-network",
  });

  const {
    loading: loadingBracket,
    error: errorBracket,
    data: dataBracket,
  } = useQuery(GET_BRACKET, {
    variables: { tournament_uid: props?.tournament_uid },
    skip: props?.skip,
    fetchPolicy: "cache-and-network",
  });

  const {
    loading: loadingIsJoin,
    error: errorIsJoin,
    data: dataIsJoin,
    refetch: refreshIsJoin,
  } = useQuery(IS_JOIN_TOURNAMENT, {
    variables: { tournament_uid: props?.tournament_uid },
    skip: props?.skip,
  });

  const {
    loading: loadingIsCheckin,
    error: errorIsCheckin,
    data: dataIsCheckin,
    refetch: refreshIsCheckin,
  } = useQuery(IS_CHECKIN_TOURNAMENT, {
    variables: { tournament_uid: props?.tournament_uid },
    skip: props?.skip,
  });

  const {
    loading: loadingDonation,
    error: errorDonation,
    data: dataDonation,
  } = useQuery(GET_DONATION_HISTORY, {
    variables: { tournament_uid: props?.tournament_uid },
    skip: props?.skip,
    fetchPolicy: "network-only",
  });

  const [joinTournament, { loading: loadingJoinTournament }] =
    useMutation(JOIN_TOURNAMENT);

  //const [confirmResult] = useMutation(CONFIRM_RESULT);

  const { data: dataIsubscribeToTournament, refetch: refetchSubTournament } =
    useQuery(IS_SUBSCRIBE_TOURNAMENT, {
      variables: { tournament_uid: props?.tournament_uid },
      skip: props?.skip,
    });

  const {
    loading: loadingConfirmResult,
    data: isCheckConfirmResult,
    refetch: refetchConfirmResult,
  } = useQuery(CHECK_CONFIRM_RESULT, {
    variables: { tournament_uid: props?.tournament_uid },
    skip: props?.skip,
    fetchPolicy: "network-only",
  });
  return {
    loading,
    loadingParticipant,
    loadingReferees,
    loadingPrizing,
    loadingBracket,
    loadingIsJoin,
    loadingDonation,
    loadingIsCheckin,

    error,
    errorParticipant,
    errorReferees,
    errorPrizing,
    errorBracket,
    errorIsJoin,
    errorIsCheckin,
    errorDonation,

    dataTournamentDetail: dataTournamentDetail?.getTournamentDetail,
    dataParticipants: dataParticipants?.getTournamentParticipants,
    dataRefereesDetail: dataRefereesDetail?.getTournamentReferees,
    dataPrizing: dataPrizing?.getTournamentPrizing,
    dataBracket: dataBracket?.getBracket,
    dataIsJoin: dataIsJoin?.isJoinedTournament,
    dataDonation: dataDonation?.donateHistory,
    dataIsCheckin: dataIsCheckin?.isCheckInTournament,
    dataIsubscribeToTournament: dataIsubscribeToTournament,
    loadingJoinTournament: loadingJoinTournament,
    isCheckConfirmResult: isCheckConfirmResult?.isConfirmTournamentResult,
    joinTournament,
    refreshIsJoin,
    refreshIsCheckin,
    refetch,
    refreshParticipant,
    refetchSubTournament,
    refetchConfirmResult,
  };
}

export function useTournamentBracket(tournament_uid: string) {
  const {
    loading: loadingBracket,
    error: errorBracket,
    data: dataBracket,
  } = useQuery(GET_BRACKET, {
    variables: { tournament_uid: tournament_uid },
    fetchPolicy: "cache-and-network",
  });

  return {
    loadingBracket,
    errorBracket,
    dataBracket: dataBracket?.getBracket,
  };
}

export function useSponsors(props: Props): {
  loading: boolean;
  error: ApolloError | undefined;
  dataSponsors: {
    getSponsorSlot: SponsorSlot[];
  };
  refetchSponsor: () => Promise<ApolloQueryResult<any>>;
} {
  const {
    loading,
    error,
    data: dataSponsors,
    refetch: refetchSponsor,
  } = useQuery(GET_SPONSOR_DETAIL, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "network-only",
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  return {
    loading,
    error,
    dataSponsors,
    refetchSponsor,
  };
}

export function useClaimReward(props: Props) {
  const { loading, error, data, refetch } = useQuery(CLAIM_REWARD, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "cache-and-network",
    skip: props?.skip,
  });

  return {
    loading,
    error,
    data: data?.getTournamentReward,
    refetch,
  };
}

export function useConfirmTournamentResult(props: Props) {
  const { loading, error, data, refetch } = useQuery(
    CONFIRM_TOURNAMENT_RESULT,
    {
      variables: { tournament_uid: props?.tournament_uid },
      fetchPolicy: "cache-and-network",
      skip: props?.skip,
    }
  );

  return {
    loading,
    error,
    data: data?.getTournamentResult,
    refetch,
  };
}

export function useGetListRank(props: Props) {
  const { loading, error, data, refetch } = useQuery(GET_LIST_RANKS, {
    variables: { tournament_uid: props?.tournament_uid },
    fetchPolicy: "cache-and-network",
    skip: props?.skip,
  });

  return {
    loading,
    error,
    data: data?.getTournamentListRank,
    refetch,
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
      has_password
      referees
      turns
      game {
        name
        logo
      }
      user {
        id
        profile {
          display_name
          user_name
          avatar
        }
      }
      sponsorSlot {
        sponsor_transactions {
          amount
        }
      }
      brackets {
        uid
        start_at
      }
      currency_uid
      totalDonation
      totalPrizePool
      region
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
    }
  }
`;

const GET_PARTICIPANTS_DETAIL = gql`
  query ($tournament_uid: String!) {
    getTournamentParticipants(tournament_uid: $tournament_uid) {
      uid
      tournament_uid
      is_checkin
      playTeamMembers {
        uid
        is_leader
        user {
          id
          profile {
            display_name
            avatar
            user_name
          }
        }
      }
      team {
        uid
        name
        avatar
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
          user_name
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
        start_at
        type
        title
        bracketMatchs {
          uid
          playteam1_uid
          playteam2_uid
          score_1
          score_2
          status
        }
      }

      playTeams {
        uid
        team {
          uid
          name
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
      is_claim
    }
  }
`;

const JOIN_TOURNAMENT = gql`
  mutation joinTournament($data: GBracketTeamInput!) {
    joinTournament(data: $data)
  }
`;

const IS_JOIN_TOURNAMENT = gql`
  query isJoinedTournament($tournament_uid: String!) {
    isJoinedTournament(tournament_uid: $tournament_uid)
  }
`;

const IS_CHECKIN_TOURNAMENT = gql`
  query isCheckInTournament($tournament_uid: String!) {
    isCheckInTournament(tournament_uid: $tournament_uid)
  }
`;

const GET_DONATION_HISTORY = gql`
  query ($tournament_uid: String!) {
    donateHistory(tournament_uid: $tournament_uid) {
      donor_id
      donor_display_name
      donor_avatar
      receiver_display_name
      tx_hash
      receiver_avatar
      type
      amount
      symbol
      time
      message
    }
  }
`;

const GET_LIST_RANKS = gql`
  query ($tournament_uid: String!) {
    getTournamentListRank(tournament_uid: $tournament_uid) {
      team_name
      team_avatar
      rank
      bracket_team_uid
      prize
      donated
    }
  }
`;

const IS_SUBSCRIBE_TOURNAMENT = gql`
  query ($tournament_uid: String!) {
    IsSubscribeToTournament(tournament_uid: $tournament_uid)
  }
`;

const CHECK_CONFIRM_RESULT = gql`
  query isConfirmTournamentResult($tournament_uid: String!) {
    isConfirmTournamentResult(tournament_uid: $tournament_uid)
  }
`;

const CONFIRM_TOURNAMENT_RESULT = gql`
  query getTournamentResult($tournament_uid: String!) {
    getTournamentResult(tournament_uid: $tournament_uid) {
      rank
      team_name
      team_avatar
      round
      win
      bracket_team_uid
    }
  }
`;
