import {
  ApolloError,
  ApolloQueryResult,
  gql,
  LazyQueryResult,
  useLazyQuery, useMutation,
  useQuery
} from "@apollo/client";
import {ProfileUpdateInput, TTournament, UserFavoriteGame, UserGraphql} from "../../src/generated/graphql";

type UseSearchProps = {
  user_id: string,
  value: string,
};

type UseGetJoinedTournamentProps = {
  user_id: string,
  skip?: boolean,
};

type UseGetFavoriteGameProps = {
  user_id: string,
  skip?: boolean,
};

type UseDeleteFavoriteGameProps = Partial<{
  game_uid: string,
}>;

type UseVerifyEmailProps = {
  email: string
}

type UseGetUserProfileProps = {
  user_id: string
}

type UseUpdateProfileProps = {
  data: ProfileUpdateInput
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

export function useGetJoinedTournament({ user_id, skip }: UseGetJoinedTournamentProps): {
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
    skip: skip,
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

export function useGetFavoriteGame({ user_id, skip }: UseGetFavoriteGameProps): {
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
    },
    skip: skip
  });

  return {
    loading,
    error,
    refetch,
    getFavoriteGameData
  }
}

export function useDeleteFavoriteGame({ game_uid }: UseDeleteFavoriteGameProps): {
  deleteFavoriteGame: () => Promise<any>;
} {
  const options = game_uid ? {
    variables: {
      game_uid: game_uid
    }
  } : undefined;

  const [deleteFavoriteGame] = useMutation(DELETE_FAVORITE_GAME, options);

  return {
    deleteFavoriteGame
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

export function useGetUserProfile({ user_id }: UseGetUserProfileProps): {
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => Promise<ApolloQueryResult<any>>;
  getUserProfileData: {
    getUserProfile: UserGraphql;
  };
} {
  const {
    loading,
    error,
    refetch,
    data: getUserProfileData
  } = useQuery(GET_USER_PROFILE, {
    variables: {
      user_id: user_id
    }
  });

  return {
    loading,
    error,
    refetch,
    getUserProfileData
  }
}

export function useUpdateProfile({ data }: UseUpdateProfileProps): {
  updateProfile: () => Promise<any>;
} {
  const options = data ? {
    variables: {
      data: data
    }
  } : undefined;

  const [updateProfile] = useMutation(UPDATE_PROFILE, options);

  return {
    updateProfile
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
        is_claim
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
        logo
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

export const DELETE_FAVORITE_GAME = gql`
  mutation ($game_uid: String!) {
    deleteFavoriteGame(game_uid: $game_uid)
  }
`

export const VERIFY_EMAIL = gql`
  query ($email: String!) {
    verifyEmail(email: $email)
  }
`

export const GET_USER_PROFILE = gql`
  query ($user_id: String!){
    getUserProfile(user_id: $user_id) {
      id
      email
      profile {
        user_id
        user_name
        display_name
        twitter
        facebook
        telegram
        youtube
        twitch
        discord
        phone
        avatar
        cover
        biography
        country_code
      }
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation ($data: ProfileUpdateInput!) {
    updateProfile(data: $data) {
      user_id
      user_name
      display_name
      twitter
      facebook
      telegram
      twitch
      discord
      phone
      avatar
      cover
      biography
      country_code
    }
  }
`