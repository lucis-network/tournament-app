import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const useTournament = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [status, setStatus] = useState<"unjoin" | "">("");
	const [leaveTournament] = useMutation(LEAVE_TOURNAMENT);
	const [checkinTournament] = useMutation(CHECKIN_TOURNAMENT);

	const handleOpenLeaveTournament = () => {
		setStatus("unjoin");
		setOpenModal(true);
	};

	const handleLeaveTournament = (team_uid: string, tournament_uid: string) => {
		leaveTournament({
			variables: {
				team_uid,
				tournament_uid,
			},
			onError: (err) => {
				console.log(err);
			},
		});
	};

	const handleCheckinTournament = (
		team_uid: string,
		tournament_uid: string
	) => {
		checkinTournament({
			variables: {
				team_uid,
				tournament_uid,
			},
			onError: (err) => {
				console.log(err);
			},
		});
	};

	const handleCloseTourModal = () => {
		setOpenModal(false);
	};

	return {
		openModal,
		status,
		handleOpenLeaveTournament,
		handleCloseTourModal,
		handleLeaveTournament,
		handleCheckinTournament,
	};
};

export default useTournament;

const LEAVE_TOURNAMENT = gql`
	mutation leaveTournament($team_uid: String!, $tournament_uid: String!) {
		leaveTournament(team_uid: $team_uid, tournament_uid: $tournament_uid)
	}
`;

const CHECKIN_TOURNAMENT = gql`
	mutation checkInTournament($team_uid: String!, $tournament_uid: String!) {
		checkInTournament(team_uid: $team_uid, tournament_uid: $tournament_uid)
	}
`;
