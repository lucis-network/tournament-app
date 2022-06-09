import { useCallback, useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Bracket, OrderType, StatusGameType } from "utils/Enum";
import { debounce } from "lodash";

export type FilterGame = {
  type: StatusGameType;
  search: string;
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
  const [datas, setDatas] = useState()
  const [filter, setFilter] = useState<FilterGame>({
    type: StatusGameType.UPCOMING,
    search: "",
    game_uid: "",
    bracket: Bracket.ALL,
    prize_pool: OrderType.NONE,
    size: "",
    time: OrderType.NONE,
  });

  const { data: gameData } = useQuery(GET_GAME);

  const [getData, { loading, error, data }] = useLazyQuery(SEARCH);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce(
      (value: string) =>
        getData({
          variables: {
            input: {
              value: value,
              type: filter.type,
            },
            data: {
              game_uid: filter.game_uid,
              bracket: filter.bracket,
              size: filter.size,
              prize_pool: filter.prize_pool,
              time: filter.time,
            },
          },
        }),
      1000
    ),
    [filter]
  );

  const handleChangeFilter = useCallback(
    (type: keyof FilterGame, value: string) => {
      const valueFilter = {
        ...filter,
        [type]:
          type === "bracket" && value === ""
            ? Bracket.ALL
            : value === ""
              ? ""
              : value,
      };
      setFilter(valueFilter);
      const updateData = () => {
        getData({
          variables: {
            input: {
              value: valueFilter.search,
              type: valueFilter.type,
            },
            data: {
              game_uid: valueFilter.game_uid,
              bracket: valueFilter.bracket,
              size: valueFilter.size,
              prize_pool: valueFilter.prize_pool,
              time: valueFilter.time,
            },
          },
        });
      };

      type === "search" ? debounceSearch(value) : updateData();
    },
    [debounceSearch, filter, getData]
  );

  const handleOrder = useCallback(
    (value: OrderType, id?: any) => {
      handleChangeFilter(id, value);
    },
    [handleChangeFilter]
  );

  useEffect(() => {
    getData({
      variables: {
        input: {
          value: filter.search,
          type: filter.type,
        },
        data: {
          game_uid: filter.game_uid,
          bracket: filter.bracket,
          size: filter.size,
          prize_pool: filter.prize_pool,
          time: filter.time,
        },
      },
    });
  }, []);

  useEffect(() => {
    const getDataTab = data?.search.length
    if (filter.type === "UPCOMING" && getDataTab <= 0) {
      const valueActiveTab = {
        ...filter,
        type: StatusGameType.ONGOING,
      };
      setFilter(valueActiveTab);
      getData({
        variables: {
          input: {
            value: filter.search,
            type: "ONGOING",
          },
          data: {
            game_uid: filter.game_uid,
            bracket: filter.bracket,
            size: filter.size,
            prize_pool: filter.prize_pool,
            time: filter.time,
          },
        },
      });
    }
    if (filter.type === "ONGOING" && getDataTab <= 0) {
      const valueActiveTab = {
        ...filter,
        type: StatusGameType.CLOSED,
      };
      setFilter(valueActiveTab);
      getData({
        variables: {
          input: {
            value: filter.search,
            type: "CLOSED",
          },
          data: {
            game_uid: filter.game_uid,
            bracket: filter.bracket,
            size: filter.size,
            prize_pool: filter.prize_pool,
            time: filter.time,
          },
        },
      });
    } if (filter.type === "CLOSED" && getDataTab <= 0) {
      const valueActiveTab = {
        ...filter,
        type: StatusGameType.UPCOMING,
      };
      setFilter(valueActiveTab);
      getData({
        variables: {
          input: {
            value: filter.search,
            type: "UPCOMING",
          },
          data: {
            game_uid: filter.game_uid,
            bracket: filter.bracket,
            size: filter.size,
            prize_pool: filter.prize_pool,
            time: filter.time,
          },
        },
      });
    }
  }, [loading]);

  return {
    filter,
    listTabs,
    gameData: gameData?.getGame,
    loading,
    error,
    data: data?.search,
    handleChangeFilter,
    handleOrder,
  };
}

const SEARCH = gql`
  query search($input: TournamentSearchInput!, $data: TournamentFilterInput!) {
    search(input: $input, data: $data) {
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
          user_name
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
