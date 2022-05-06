import { ReactElement } from "react";

export type StepModalTournament =
	| "step-1"
	| "step-2"
	| "create-team"
	| "add-team"
	| "choose-player"
	| "success";

export type StepModalComponent = {
	titleModal: string;
	description: ReactElement;
	component: ReactElement;
	modalWidth?: Number;
};

export type JoinTournamentTeamType = {
	id_in_game: string;
	is_leader: boolean;
	user_id: Number;
	prize_alloc: Number;
};

export type JoinTournamentType =
	| {
			team_uid: string;
			tournament_uid: string;
			tournament_password: string;
			member: JoinTournamentTeamType[];
	  }
	| ReactElement;
