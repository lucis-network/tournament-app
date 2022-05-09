import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";

type Props = {
  game: string;
  bracket: string;
  team_size: string;
  prize_pool: string;
  time: string;
};
export function useHomePage(props: Props) {
  const {
    loading: loadingUpcoming,
    error: errorUpcoming,
    data: dataUpcoming,
  } = useQuery(GET_UPCOMING, {
    fetchPolicy: "cache-and-network",
    variables: {
      game: props?.game,
      bracket: props?.bracket,
      team_size: props?.team_size,
      prize_pool: props?.prize_pool,
      time: props?.time,
    },
  });

  return {
    loadingUpcoming,
    errorUpcoming,
    dataUpcoming: dataUpcoming?.getUpComingTournament,
  };
}

const GET_UPCOMING = gql`
  query (
    $game: String!
    $bracket: String!
    $team_size: String!
    $prize_pool: String!
    $time: String!
  ) {
    getUpComingTournament(
      data: {
        game: $game
        bracket: $bracket
        team_size: $team_size
        prize_pool: $prize_pool
        time: $time
      }
    ) {
      uid
      name
      cover
      pool_size
      participants
      team_size
      thumbnail
      join_fee
      currency {
        symbol
        icon
      }
      cache_tournament {
        team_participated
      }
      game {
        logo
      }
      user {
        profile {
          display_name
          avatar
        }
      }
      totalPrizePool
    }
  }
`;
