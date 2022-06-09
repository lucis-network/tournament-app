import { gql, useMutation } from "@apollo/client";
import { useTournamentDetail } from "hooks/tournament/useTournamentDetail";
import { useState } from "react";
import { message as antd_message } from "antd";

const useTournament = (tournamentId: string) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [status, setStatus] = useState<"unjoin" | "">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUnjoin, setLoadingUnjoin] = useState<boolean>(false);
  const [leaveTournament] = useMutation(LEAVE_TOURNAMENT);
  const [checkinTournament] = useMutation(CHECKIN_TOURNAMENT);

  const { refreshIsJoin, refreshIsCheckin, refetch, refreshParticipant } =
    useTournamentDetail({
      tournament_uid: tournamentId,
    });

  const handleOpenLeaveTournament = () => {
    setStatus("unjoin");
    setOpenModal(true);
  };

  const handleLeaveTournament = () => {
    setLoadingUnjoin(true);
    leaveTournament({
      variables: {
        tournament_uid: tournamentId,
      },
      onCompleted: () => {
        setOpenModal(false);
        refreshIsJoin();
        antd_message.success("Success", 10);
        refetch();
        refreshParticipant();
        setLoadingUnjoin(false);
      },
      onError: (err) => {
        // antd_message.error(err.message, 10);
        antd_message.error("You are not leader team", 10);
        setLoadingUnjoin(false);
      },
    });
  };

  const handleCheckinTournament = () => {
    setLoading(true);
    checkinTournament({
      variables: {
        tournament_uid: tournamentId,
      },
      onCompleted: () => {
        refreshIsCheckin();
        antd_message.success("Success", 10);
        setLoading(false);
        refetch();
        refreshParticipant();
      },
      onError: (err) => {
        // antd_message.error(err.message, 10);
        antd_message.error("You are not leader team", 10);
        setLoading(false);
      },
    });
  };

  const handleCloseTourModal = () => {
    setOpenModal(false);
  };

  return {
    openModal,
    status,
    loadingCheckin: loading,
    loadingUnjoin,
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
