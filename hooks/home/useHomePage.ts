import { useCallback, useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Bracket, OrderType, StatusGameType } from "utils/Enum";
import { debounce } from "lodash";
import { message } from "antd";

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
    handleActiveData();
  }, []);

  const handleActiveData = async () => {
    try {
      const dataUpcoming = await getData({
        variables: {
          input: {
            value: filter.search,
            type: StatusGameType.UPCOMING,
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
      if (dataUpcoming && dataUpcoming?.data?.search.length > 0) {
        const activeTab = {
          ...filter,
          type: StatusGameType.UPCOMING,
        };
        setFilter(activeTab);
        getData({
          variables: {
            input: {
              value: filter.search,
              type: StatusGameType.UPCOMING,
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

        return;
      }
      const dataOngoing = await getData({
        variables: {
          input: {
            value: filter.search,
            type: StatusGameType.ONGOING,
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
      if (dataOngoing && dataOngoing?.data?.search.length > 0) {
        const activeTab = {
          ...filter,
          type: StatusGameType.ONGOING,
        };
        setFilter(activeTab);
        getData({
          variables: {
            input: {
              value: filter.search,
              type: StatusGameType.ONGOING,
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

        return;
      }
      const dataClosed = await getData({
        variables: {
          input: {
            value: filter.search,
            type: StatusGameType.CLOSED,
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
      if (dataClosed && dataClosed?.data?.search.length > 0) {
        const activeTab = {
          ...filter,
          type: StatusGameType.CLOSED,
        };
        setFilter(activeTab);
        getData({
          variables: {
            input: {
              value: filter.search,
              type: StatusGameType.CLOSED,
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

        return;
      } else {
        const activeTab = {
          ...filter,
          type: StatusGameType.UPCOMING,
        };
        setFilter(activeTab);
        getData({
          variables: {
            input: {
              value: filter.search,
              type: StatusGameType.UPCOMING,
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

        return;
      }
    } catch {
      message.error("no data");
    }
  };
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
