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
