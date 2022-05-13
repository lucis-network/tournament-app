import {
	ApolloError,
	ApolloQueryResult,
	gql,
	useMutation,
	useQuery,
} from "@apollo/client";
import { SponsorSlot, TournamentGql } from "src/generated/graphql";

type Props = {
	tournament_uid?: string;
};

export function useTournamentDetail(props: Props) {
	const {
		loading,
		error,
		data: dataTournamentDetail,
		refetch,
	} = useQuery(GET_TOURNAMENT_DETAIL, {
		variables: { tournament_uid: props?.tournament_uid },
		fetchPolicy: "no-cache",
	});

	const {
		loading: loadingParticipant,
		error: errorParticipant,
		data: dataParticipants,
		refetch: refreshParticipant,
	} = useQuery(GET_PARTICIPANTS_DETAIL, {
		variables: { tournament_uid: props?.tournament_uid },
		fetchPolicy: "no-cache",
	});

	const {
		loading: loadingReferees,
		error: errorReferees,
		data: dataRefereesDetail,
	} = useQuery(GET_REFEREES_DETAIL, {
		variables: { tournament_uid: props?.tournament_uid },
		fetchPolicy: "cache-and-network",
	});
	const {
		loading: loadingPrizing,
		error: errorPrizing,
		data: dataPrizing,
	} = useQuery(GET_PRIZING_DETAIL, {
		variables: { tournament_uid: props?.tournament_uid },
		fetchPolicy: "cache-and-network",
	});

	const {
		loading: loadingBracket,
		error: errorBracket,
		data: dataBracket,
	} = useQuery(GET_BRACKET, {
		variables: { tournament_uid: props?.tournament_uid },
		fetchPolicy: "cache-and-network",
	});

	const {
		loading: loadingIsJoin,
		error: errorIsJoin,
		data: dataIsJoin,
		refetch: refreshIsJoin,
	} = useQuery(IS_JOIN_TOURNAMENT, {
		variables: { tournament_uid: props?.tournament_uid },
	});

	const {
		loading: loadingIsCheckin,
		error: errorIsCheckin,
		data: dataIsCheckin,
		refetch: refreshIsCheckin,
	} = useQuery(IS_CHECKIN_TOURNAMENT, {
		variables: { tournament_uid: props?.tournament_uid },
	});

	const {
		loading: loadingDonation,
		error: errorDonation,
		data: dataDonation,
	} = useQuery(GET_DONATION_HISTORY, {
		variables: { tournament_uid: props?.tournament_uid },
		fetchPolicy: "network-only",
	});

	const [joinTournament, { loading: loadingJoinTournament }] =
		useMutation(JOIN_TOURNAMENT);

	const [confirmResult] = useMutation(CONFIRM_RESULT);

	const { data: dataIsubscribeToTournament, refetch: refetchSubTournament } =
		useQuery(IS_SUBSCRIBE_TOURNAMENT, {
			variables: { tournament_uid: props?.tournament_uid },
		});

	return {
		loading,
		loadingParticipant,
		loadingReferees,
		loadingPrizing,
		loadingBracket,
		loadingIsJoin,
		loadingDonation,
		loadingIsCheckin,

		error,
		errorParticipant,
		errorReferees,
		errorPrizing,
		errorBracket,
		errorIsJoin,
		errorIsCheckin,
		errorDonation,

		dataTournamentDetail: dataTournamentDetail?.getTournamentDetail,
		dataParticipants: dataParticipants?.getTournamentParticipants,
		dataRefereesDetail: dataRefereesDetail?.getTournamentReferees,
		dataPrizing: dataPrizing?.getTournamentPrizing,
		dataBracket: dataBracket?.getBracket,
		dataIsJoin: dataIsJoin?.isJoinedTournament,
		dataDonation: dataDonation?.donateHistory,
		dataIsCheckin: dataIsCheckin?.isCheckInTournament,
		dataIsubscribeToTournament: dataIsubscribeToTournament,
		loadingJoinTournament: loadingJoinTournament,
		joinTournament,
		confirmResult,
		refreshIsJoin,
		refreshIsCheckin,
		refetch,
		refreshParticipant,
		refetchSubTournament,
	};
}

export function useTournamentBracket(tournament_uid: string) {
	const {
		loading: loadingBracket,
		error: errorBracket,
		data: dataBracket,
	} = useQuery(GET_BRACKET, {
		variables: { tournament_uid: tournament_uid },
		fetchPolicy: "cache-and-network",
	});

	return {
		loadingBracket,
		errorBracket,
		dataBracket: dataBracket?.getBracket,
	};
}

export function useSponsors(props: Props): {
	loading: boolean;
	error: ApolloError | undefined;
	dataSponsors: {
		getSponsorSlot: SponsorSlot[];
	};
	refetch: () => Promise<ApolloQueryResult<any>>;
} {
	const {
		loading,
		error,
		data: dataSponsors,
		refetch,
	} = useQuery(GET_SPONSOR_DETAIL, {
		variables: { tournament_uid: props?.tournament_uid },
		fetchPolicy: "network-only",
		onError: (error) => {
			console.log("error: ", error);
		},
	});

	return {
		loading,
		error,
		dataSponsors,
		refetch,
	};
}

export function useClaimReward(props: Props) {
	const { loading, error, data } = useQuery(CLAIM_REWARD, {
		variables: { tournament_uid: props?.tournament_uid },
		fetchPolicy: "cache-and-network",
	});

	return {
		loading,
		error,
		data: data?.getTournamentReward,
	};
}

// ======= GET DATA GRAPQL

const GET_TOURNAMENT_DETAIL = gql`
	query ($tournament_uid: String!) {
		getTournamentDetail(tournament_uid: $tournament_uid) {
			name
			cover
			thumbnail
			team_size
			participants
			desc
			rules
			referees
			game {
				name
				logo
			}
			user {
				profile {
					display_name
					avatar
				}
			}
			sponsorSlot {
				sponsor_transactions {
					amount
				}
			}
			brackets {
				uid
				start_at
			}
			currency_uid
			totalDonation
			totalPrizePool
			region
			currency {
				symbol
				chain_symbol
			}
			tournament_status
			additionPrize
			cache_tournament {
				team_participated
				tournament_uid
			}
		}
	}
`;

const GET_PARTICIPANTS_DETAIL = gql`
	query ($tournament_uid: String!) {
		getTournamentParticipants(tournament_uid: $tournament_uid) {
			uid
			bracket_uid
			bracketTeamMembers {
				uid
				is_leader
				user {
					id
					profile {
						display_name
						avatar
					}
				}
			}
			team {
				uid
				name
				avatar
			}
		}
	}
`;

const GET_REFEREES_DETAIL = gql`
	query ($tournament_uid: String!) {
		getTournamentReferees(tournament_uid: $tournament_uid) {
			user {
				profile {
					user_id
					display_name
					avatar
					twitter
					facebook
					telegram
					discord
				}
			}
		}
	}
`;

const GET_PRIZING_DETAIL = gql`
	query ($tournament_uid: String!) {
		getTournamentPrizing(tournament_uid: $tournament_uid) {
			quantity
			percentage
			position
			reward
		}
	}
`;

const GET_BRACKET = gql`
	query ($tournament_uid: String!) {
		getBracket(tournament_uid: $tournament_uid) {
			type
			start_at
			status

			bracketRounds {
				type
				title
				bracketMatchs {
					uid
					team1_uid
					team2_uid
					score_1
					score_2
					status
				}
			}

			bracketTeams {
				uid
				team {
					uid
					name
				}
			}
		}
	}
`;

const GET_SPONSOR_DETAIL = gql`
	query ($tournament_uid: String!) {
		getSponsorSlot(tournament_uid: $tournament_uid) {
			uid
			name
			max
			min
			show_name
			sponsor_transactions {
				uid
				order
				logo
				name
			}
		}
	}
`;

const CLAIM_REWARD = gql`
	query ($tournament_uid: String!) {
		getTournamentReward(tournament_uid: $tournament_uid) {
			reward_type
			rank
			amount
			symbol
			is_claim
		}
	}
`;

const JOIN_TOURNAMENT = gql`
	mutation joinTournament($data: GBracketTeamInput!) {
		joinTournament(data: $data)
	}
`;

const IS_JOIN_TOURNAMENT = gql`
	query isJoinedTournament($tournament_uid: String!) {
		isJoinedTournament(tournament_uid: $tournament_uid)
	}
`;

const IS_CHECKIN_TOURNAMENT = gql`
	query isCheckInTournament($tournament_uid: String!) {
		isCheckInTournament(tournament_uid: $tournament_uid)
	}
`;

const GET_DONATION_HISTORY = gql`
	query ($tournament_uid: String!) {
		donateHistory(tournament_uid: $tournament_uid) {
			donor_id
			donor_display_name
			donor_avatar
			receiver_display_name
			tx_hash
			receiver_avatar
			type
			amount
			symbol
			time
		}
	}
`;

const IS_SUBSCRIBE_TOURNAMENT = gql`
	query ($tournament_uid: String!) {
		IsSubscribeToTournament(tournament_uid: $tournament_uid)
	}
`;

const CONFIRM_RESULT = gql`
	mutation confirmResult($tournament_uid: String!) {
		confirmResult(tournament_uid: $tournament_uid)
	}
`;
