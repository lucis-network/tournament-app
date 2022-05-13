import { useCallback, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Bracket, OrderType, StatusGameType } from "utils/Enum";

export type FilterGame = {
  game_uid: string;
  bracket: Bracket;
  size: string;
  prize_pool: OrderType;
  time: OrderType;
};
const listTabs: StatusGameType[] = [
  StatusGameType.UPCOMING,
  StatusGameType.ONGOING,
  StatusGameType.CLOSED,
];

export function useHomePage() {
  const [type, setType] = useState<StatusGameType>(StatusGameType.UPCOMING);
  const [filter, setFilter] = useState<FilterGame>({
    game_uid: "",
    bracket: Bracket.ALL,
    prize_pool: OrderType.NONE,
    size: "",
    time: OrderType.NONE,
  });

  const { data: gameData } = useQuery(GET_GAME);

  const {
    loading,
    error,
    data,
    refetch: getData,
  } = useQuery(
    type === StatusGameType.UPCOMING
      ? GET_UPCOMING
      : type === StatusGameType.ONGOING
      ? GET_ONGOING
      : GET_ONCLOSE,
    {
      variables: filter,
    }
  );

  const handleChangeFilter = useCallback(
    (type: keyof FilterGame, value: string) => {
      const valueConvert = {
        ...filter,
        [type]: 
		// () => {
        //   let val = "";
        //   switch (type) {
        //     case "bracket":
        //       val = value;
        //       break;
        //     case "prize_pool":
        //       val = value;
        //       break;
        //     case "time":
        //       val = value;
        //       break;
        //     default:
        //       break;
        //   }
        //   return val;
        // },
		type === "bracket" && value === ""
		? Bracket.ALL
		: type === "prize_pool" || type === "time"
		? value
		// : value === ""
		// ? ""
		: value,
      };
      console.log(valueConvert);
      console.log(value);
      setFilter(valueConvert);
      getData(valueConvert);
    },
    [filter, getData]
  );

  const handleOrder = useCallback(
    (value: OrderType, id?: any) => {
      handleChangeFilter(id, value);
    },
    [handleChangeFilter]
  );

  return {
    type,
    filter,
    listTabs,
    gameData: gameData?.getGame,
    loading,
    error,
    data:
      type === StatusGameType.UPCOMING
        ? data?.getUpComingTournament
        : type === StatusGameType.ONGOING
        ? data?.getOnGoingTournament
        : data?.getClosedTournament,
    setType,
    handleChangeFilter,
    handleOrder,
  };
}

const GET_UPCOMING = gql`
  query getUpComingTournament(
    $game_uid: String
    $bracket: GBracketType
    $size: String
    $prize_pool: SortType
    $time: SortType
  ) {
    getUpComingTournament(
      data: {
        game_uid: $game_uid
        bracket: $bracket
        size: $size
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
      brackets {
        uid
        type
      }
      team_size
      prize_allocation
      game {
        logo
        name
        tournaments {
          uid
          name
        }
      }
      currency {
        symbol
        icon
      }
      cache_tournament {
        team_participated
      }
      user {
        profile {
          display_name
          avatar
        }
      }
      totalPrizePool
      brackets {
        type
        start_at
      }
    }
  }
`;

const GET_ONGOING = gql`
  query getOnGoingTournament(
    $game_uid: String
    $bracket: GBracketType
    $size: String
    $prize_pool: SortType
    $time: SortType
  ) {
    getOnGoingTournament(
      data: {
        game_uid: $game_uid
        bracket: $bracket
        size: $size
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
      brackets {
        uid
        type
      }
      team_size
      prize_allocation
      game {
        logo
        name
        tournaments {
          uid
          name
        }
      }
      currency {
        symbol
        icon
      }
      cache_tournament {
        team_participated
      }
      user {
        profile {
          display_name
          avatar
        }
      }
      totalPrizePool
      brackets {
        type
        start_at
      }
    }
  }
`;

const GET_ONCLOSE = gql`
  query getClosedTournament(
    $game_uid: String
    $bracket: GBracketType
    $size: String
    $prize_pool: SortType
    $time: SortType
  ) {
    getClosedTournament(
      data: {
        game_uid: $game_uid
        bracket: $bracket
        size: $size
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
      brackets {
        uid
        type
      }
      team_size
      prize_allocation
      game {
        logo
        name
        tournaments {
          uid
          name
        }
      }
      currency {
        symbol
        icon
      }
      cache_tournament {
        team_participated
      }
      user {
        profile {
          display_name
          avatar
        }
      }
      totalPrizePool
      brackets {
        type
        start_at
      }
    }
  }
`;

const GET_GAME = gql`
  query {
    getGame(name: "") {
      uid
      name
      logo
      desc
    }
  }
`;
