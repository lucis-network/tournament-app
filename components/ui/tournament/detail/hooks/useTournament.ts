import { gql, useMutation } from "@apollo/client";

const useTournament = () => {
	const [leaveTournament] = useMutation(LEAVE_TOURNAMENT);

	const handleLeaveTournament = (team_uid: string, tournament_uid: string) => {
		leaveTournament({
			variables: {
				team_uid,
				tournament_uid,
			},
		});
	};

	return {
		handleLeaveTournament,
	};
};

export default useTournament;

const LEAVE_TOURNAMENT = gql`
	mutation leaveTournament($team_uid: String!, $tournament_uid: String!) {
		leaveTournament(team_uid: $team_uid, tournament_uid: $tournament_uid)
	}
`;
