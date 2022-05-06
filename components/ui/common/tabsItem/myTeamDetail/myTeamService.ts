import { gql } from "@apollo/client";

export const GET_MY_TEAM = gql`
	query getMyTeam {
		getMyTeam {
			team_uid
			team_name
			team_avatar
			team {
				user_id
				display_name
				avatar
				is_leader
			}
		}
	}
`;

export const CREATE_TEAM = gql`
	mutation createTeam($input: TeamInput!) {
		createTeam(input: $input)
	}
`;

export const EDIT_TEAM = gql`
	mutation editTeam($input: TeamInput!, $teamId: String!) {
		editTeam(input: $input, team_uid: $teamId)
	}
`;

export const DELETE_TEAM = gql`
	mutation deleteTeam($teamId: String!) {
		deleteTeam(team_uid: $teamId)
	}
`;

export const LEAVE_TEAM = gql`
	mutation leaveTeam($teamId: String!) {
		leaveTeam(team_uid: $teamId)
	}
`;

export const DELETE_PLAYER = gql`
	mutation deleteMember($teamId: String!, $memberId: Float!) {
		deleteMember(team_uid: $teamId, member_id: $memberId)
	}
`;
export const ADD_PLAYER = gql`
	mutation addMember($input: GMember!) {
		addMember(input: $input)
	}
`;

export const MY_PROFILE = gql`
	query me {
		me {
			id
			role
			profile {
				user_id
				display_name
				user_name
				avatar
			}
		}
	}
`;

export const SEARCH_MEMBER = gql`
	query searchMember($teamId: String!, $value: String!) {
		searchMember(team_uid: $teamId, value: $value) {
			user_id
			user_name
			display_name
			avatar
		}
	}
`;

export const SEARCH_TEAM = gql`
	query searchTeam($name: String!) {
		searchTeam(name: $name) {
			team_uid
			team_name
			team_avatar
			participant
			team {
				user_id
				display_name
				is_leader
				avatar
			}
		}
	}
`;
