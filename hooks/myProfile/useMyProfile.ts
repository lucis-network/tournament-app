import {
  ApolloError,
  ApolloQueryResult,
  gql,
  LazyQueryResult,
  useLazyQuery,
  useQuery
} from "@apollo/client";
import {TTournament, UserFavoriteGame} from "../../src/generated/graphql";

type UseSearchProps = {
  user_id: string,
  value: string,
};

type UseGetJoinedTournamentProps = {
  user_id: string,
};

type UseGetFavoriteGameProps = {
  user_id: string,
};

type UseVerifyEmailProps = {
  email: string
}

export function useGetOwnedTournament(): {
  loading: boolean;
  error: ApolloError | undefined;
  ownedTournamentData: {
    getOwnedTournament: TTournament[];
  };
} {
  const {
    loading,
    error,
    data: ownedTournamentData,
  } = useQuery(GET_OWNED_TOURNAMENT, {
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log("error useGetOwnedTournament: ", error);
    },
  });

  return {
    loading,
    error,
    ownedTournamentData,
  };
}

export function useGetJoinedTournament({ user_id }: UseGetJoinedTournamentProps): {
  loading: boolean;
  error: ApolloError | undefined;
  joinedTournamentData: {
    getJoinedTournament: TTournament[];
  };
} {
  const {
    loading,
    error,
    data: joinedTournamentData,
  } = useQuery(GET_JOINED_TOURNAMENT, {
    variables: {
      user_id: user_id
    },
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log("error useGetOwnedTournament: ", error);
    },
  });

  return {
    loading,
    error,
    joinedTournamentData,
  };
}

export function useSearchOwnedTournament({ user_id, value }: UseSearchProps): {
  loading: boolean;
  error: ApolloError | undefined;
  ownedTournamentData: {
    searchOwnerTournament: TTournament[];
  };
} {
  const {
    loading,
    error,
    data: ownedTournamentData,
  } = useQuery(SEARCH_OWNED_TOURNAMENT, {
    variables: {
      user_id: user_id,
      value: value
    },
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log("error useSearchOwnedTournament: ", error);
    },
  });

  return {
    loading,
    error,
    ownedTournamentData,
  };
}

export function useSearchJoinedTournament({ user_id, value }: UseSearchProps): {
  loading: boolean;
  error: ApolloError | undefined;
  joinedTournamentData: {
    searchJoinedTournament: TTournament[];
  };
} {
  const {
    loading,
    error,
    data: joinedTournamentData,
  } = useQuery(SEARCH_JOINED_TOURNAMENT, {
    variables: {
      user_id: user_id,
      value: value,
    },
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log("error useSearchJoinedTournament: ", error);
    },
  });

  return {
    loading,
    error,
    joinedTournamentData,
  };
}

export function useGetFavoriteGame({ user_id }: UseGetFavoriteGameProps): {
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => Promise<ApolloQueryResult<any>>;
  getFavoriteGameData: {
    getFavoriteGame: UserFavoriteGame[];
  };
} {
  const {
    loading,
    error,
    refetch,
    data: getFavoriteGameData
  } = useQuery(GET_FAVORITE_GAME, {
    variables: {
      user_id: user_id
    }
  });

  return {
    loading,
    error,
    refetch,
    getFavoriteGameData
  }
}

export function useVerifyEmail({ email }: UseVerifyEmailProps): {
  verifyEmail: () => Promise<LazyQueryResult<any, {email: string}>>;
} {
  const [
    verifyEmail,
  ] = useLazyQuery(VERIFY_EMAIL, {
    variables: {
      email: email
    }
  });

  return {
    verifyEmail,
  }
}

export const SEARCH_OWNED_TOURNAMENT = gql`
	query ($user_id: String!, $value: String!) {
		searchOwnerTournament(
		  user_id: $user_id,
		  value: $value
		) {
			uid
        name
        thumbnail
        start_at
        participants
        team_participated
        tournament_status
		}
	}
`;

export const SEARCH_JOINED_TOURNAMENT = gql`
	query ($user_id: String!, $value: String!) {
		searchJoinedTournament(user_id: $user_id, value: $value) {
			uid
        name
        thumbnail
        start_at
        participants
        team_participated
        tournament_status
        claim_prize_pool_status
		}
	}
`;

export const GET_OWNED_TOURNAMENT = gql`
  query {
    getOwnedTournament {
      uid
      name
      thumbnail
      start_at
      participants
      team_participated
      tournament_status
    }
  }
`;

export const GET_JOINED_TOURNAMENT = gql`
  query ($user_id: String!) {
    getJoinedTournament(user_id: $user_id) {
      uid
      name
      thumbnail
      start_at
      participants
      team_participated
      tournament_status
    }
  }
`;

export const GET_FAVORITE_GAME = gql`
  query ($user_id: String!) {
    getFavoriteGame(user_id: $user_id) {
      id
      user_id
      game {
        uid
        name
        created_at
        updated_at
      }
    }
  }
`

export const ADD_FAVORITE_GAME = gql`
  mutation AddFavoriteGame($input: CreateFavorite!) {
    addFavoriteGame(input: $input)
  }
`

export const VERIFY_EMAIL = gql`
  query ($email: String!) {
    verifyEmail(email: $email)
  }
`