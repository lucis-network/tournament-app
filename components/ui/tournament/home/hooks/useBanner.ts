import { gql, useQuery } from "@apollo/client";
import { GTournament } from "src/generated/graphql";

const useBanner = () => {
	const { data, loading } = useQuery(GET_SPOTLIGHT_TOURNAMENT, {
		fetchPolicy: "cache-and-network",
	});

	return {
		dataBanner: data?.getSpotlightTournament as GTournament[],
		loading,
	};
};

export default useBanner;

const GET_SPOTLIGHT_TOURNAMENT = gql`
	query {
		getSpotlightTournament {
			uid
			name
			cover
			thumbnail
			prize_allocation
			spotlight_position
			currency {
				uid
				symbol
				icon
			}
		}
	}
`;

// totalPrizePool
// currency {
// 	symbol
// 	icon
// }
