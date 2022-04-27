import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";

type Props = {
  name?: string;
};

export function useChooseGame(props: Props) {
  const { loading, error, data } = useQuery(CHOOSE_GAME, {
    variables: { name: props?.name },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    getDataChooseGame: data?.getGame,
  };
}

export function useReferees(props: Props) {
  const { loading, error, data } = useQuery(REFEREES, {
    variables: { name: props?.name },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    getDataReferees: data?.getReferee,
  };
}

export function useRegion(props: Props) {
  const { loading, error, data } = useQuery(REGION, {
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    getDataRegions: data?.regions,
  };
}

const CHOOSE_GAME = gql`
  query ($name: String!) {
    getGame(name: $name) {
      uid
      name
      logo
      desc
    }
  }
`;

const REFEREES = gql`
  query ($name: String!) {
    getReferee(name: $name) {
      user_id
      user {
        code
        name
        email
        profile {
          full_name
          avatar
        }
      }
      desc
    }
  }
`;

const REGION = gql`
  query {
    regions {
      uid
      name
    }
  }
`;
