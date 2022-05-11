import { useCallback, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { debounce } from "lodash";
import { Bracket, OrderType, StatusGameType } from "utils/Enum";

export type FilterGame = {
	game: "";
	bracket: Bracket;
	team_size?: string;
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
		game: "",
		bracket: Bracket.EMPTY,
		prize_pool: OrderType.DESC,
		team_size: "",
		time: OrderType.DESC,
	});

	const [getData, { loading, error, data, refetch }] = useLazyQuery(
		type === StatusGameType.UPCOMING
			? GET_UPCOMING
			: type === StatusGameType.ONGOING
			? GET_ONGOING
			: GET_ONCLOSE,
		{
			fetchPolicy: "cache-and-network",
			variables: {
				game: filter?.game,
				bracket: filter?.bracket,
				team_size: filter?.team_size,
				prize_pool: filter?.prize_pool,
				time: filter?.time,
			},
		}
	);

	const handleChangeFilter = useCallback(
		(type: keyof FilterGame, value: string) => {
			setFilter({
				...filter,
				[type]: value,
			});

			type === "game"
				? debounce(() => refetch({ ...filter, [type as any]: value }), 500)
				: refetch({ ...filter, [type]: value });
		},
		[filter, refetch]
	);

	useEffect(() => {
		getData();
	}, []);

	return {
		type,
		filter,
		listTabs,
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
	};
}

const GET_UPCOMING = gql`
	query getUpComingTournament(
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
			brackets {
				uid
				type
			}
			team_size
			pool_size
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
		}
	}
`;

const GET_ONGOING = gql`
	query getOnGoingTournament(
		$game: String!
		$bracket: String!
		$team_size: String!
		$prize_pool: String!
		$time: String!
	) {
		getOnGoingTournament(
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
			brackets {
				uid
				type
			}
			team_size
			pool_size
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
		}
	}
`;

const GET_ONCLOSE = gql`
	query getClosedTournament(
		$game: String!
		$bracket: String!
		$team_size: String!
		$prize_pool: String!
		$time: String!
	) {
		getClosedTournament(
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
			brackets {
				uid
				type
			}
			team_size
			pool_size
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
		}
	}
`;
