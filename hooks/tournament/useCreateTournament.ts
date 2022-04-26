import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";

type Props = {
  nameGame?: string;
};

export function useChooseGame(props: Props) {
  const { loading, error, data } = useQuery(CHOOSE_GAME, {
    variables: { name: props?.nameGame },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    getDataChooseGame: data?.getGame,
  };
}

const CHOOSE_GAME = gql`
  query {
    getGame {
      name
      logo
      desc
    }
  }
`;
