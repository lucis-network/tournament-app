import { gql, useMutation } from "@apollo/client";
import { useTournamentDetail } from "hooks/tournament/useTournamentDetail";
import { useState } from "react";
import { message as antd_message } from "antd";

const useTournament = (tournamentId: string) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [status, setStatus] = useState<"unjoin" | "">("");
	const [leaveTournament] = useMutation(LEAVE_TOURNAMENT);
	const [checkinTournament] = useMutation(CHECKIN_TOURNAMENT);

	const { refreshIsJoin, refreshIsCheckin } = useTournamentDetail({
		tournament_uid: tournamentId,
	});

	const handleOpenLeaveTournament = () => {
		setStatus("unjoin");
		setOpenModal(true);
	};

	const handleLeaveTournament = () => {
		leaveTournament({
			variables: {
				tournament_uid: tournamentId,
			},
			onCompleted: () => {
				setOpenModal(false);
				refreshIsJoin();
				antd_message.success("Success", 10);
			},
			onError: (err) => {
				antd_message.error(err, 10);
			},
		});
	};

	const handleCheckinTournament = () => {
		checkinTournament({
			variables: {
				tournament_uid: tournamentId,
			},
			onCompleted: () => {
				refreshIsCheckin();
				antd_message.success("Success", 10);
			},
			onError: (err) => {
				antd_message.error(err, 10);
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
	mutation leaveTournament($tournament_uid: String!) {
		leaveTournament(tournament_uid: $tournament_uid)
	}
`;

const CHECKIN_TOURNAMENT = gql`
	mutation checkInTournament($tournament_uid: String!) {
		checkInTournament(tournament_uid: $tournament_uid)
	}
`;
