import {
	CREATE_TEAM,
	GET_MY_TEAM,
	SEARCH_MEMBER,
} from "../../../common/tabsItem/myTeamDetail/myTeamService";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";

export interface TeamType extends Record<any, any> {
	user_id: number;
	user_name: string;
	display_name: string;
	avatar: string;
	is_leader?: boolean;
}

export interface MyTeamType {
	team_uid: string;
	team_name: string;
	team_avatar: string;
	participant: number;
	team?: TeamType[];
}

const UseCreateNewTeam = (profile: any) => {
	const [draftData, setDraftData] = useState<MyTeamType>();
	const [reset, setReset] = useState<boolean>(false);
	const [teamId, setTeamId] = useState<string>("");
	const [searchMemberValue, setSearchMemberValue] = useState<string>("");
	const [error, setError] = useState<Record<string, string>>({});

	const [searchMember, { data: rawSearchMember, loading: memberLoading }] =
		useLazyQuery(SEARCH_MEMBER, {
			variables: {
				teamId: "",
				value: "",
			},
		});

	const {
		data: rawSearchTeam,
		loading: teamLoading,
		refetch,
	} = useQuery(GET_MY_TEAM, {
		variables: {
			user_id: profile?.user_id,
		},
	});

	const [createTeam] = useMutation(CREATE_TEAM);

	const convertMemberId = draftData?.team?.reduce(
		(acc, value) => {
			acc.push(value.user_id as never);
			return acc;
		},
		[profile?.user_id] as string[]
	);
	const teamList = rawSearchTeam?.getMyTeam as MyTeamType[];
	const memberList = (rawSearchMember?.searchMember as TeamType[])?.filter(
		(member) => !convertMemberId?.some((key: any) => key === member.user_id)
	);
	const handleRemove = (team_uid: string, user_id: Number) => {
		setTeamId(team_uid);
		setDraftData({
			...draftData!,
			team: draftData?.team?.filter((member) => member.user_id !== user_id),
		});
		setError({
			...error,
			["team"]:
				(draftData?.team?.filter((member) => member.user_id !== user_id)
					?.length as any) > 1
					? ""
					: "Your team must have at least 2 members",
		});
	};

	const handleSearchMember = (e: React.FormEvent<HTMLInputElement>) => {
		const searchValue = e.currentTarget.value;
		setSearchMemberValue(searchValue);
		searchMember({
			variables: {
				teamId,
				value: searchValue,
			},
		});
	};

	const handleCreateTeam = () => {
		setDraftData({
			team_avatar: "",
			team_name: "",
			participant: 1,
			team: [
				{
					user_id: profile?.user_id,
					display_name: profile?.display_name,
					avatar: profile?.avatar,
					is_leader: true,
				},
			],
		} as any);
		setReset(false);
		setError({});
	};

	const handleCloseCreateEditTeam = () => {
		setDraftData(undefined);
		setError({});
		setReset(true);
	};

	const handleChangeAvatar = useCallback(
		(childData: string, file: any) => {
			if (childData && file) {
				setDraftData({
					...draftData,
					team_avatar: childData,
				} as MyTeamType);
				setError({
					...error,
					["team_avatar"]: "",
				});
			} else if (!file) {
				setError({
					...error,
					["team_avatar"]: "Team avatar is required",
				});
			} else {
				setError({
					...error,
					["team_avatar"]: "File is not valid",
				});
			}
		},
		[draftData, error]
	);

	const handleChangeTeamName = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setDraftData({ ...draftData, team_name: value } as MyTeamType);

		if (value.length <= 0) {
			setError({ ...error, ["team_name"]: "Team name is required" });
		} else if (value.length > 45) {
			setError({
				...error,
				["team_name"]: "Team name must be maximum 45 characters",
			});
		} else {
			setError({ ...error, ["team_name"]: "" });
		}
	};

	const handleSaveTeam = () => {
		setError({
			...error,
			["team_name"]: draftData?.team_name ? "" : "Team name is required",
			["team_avatar"]: draftData?.team_avatar ? "" : "Team avatar is required",
			["team"]:
				(draftData?.team?.length as any) > 1
					? ""
					: "Your team must have at least 2 members",
		});

		if (
			draftData?.team_avatar &&
			draftData?.team_name &&
			draftData?.team &&
			draftData?.team?.length > 1
		) {
			const filterDataMember = draftData?.team
				?.filter((team) => +team.user_id !== +profile?.user_id!)
				?.map((item) => ({
					user_id: +item.user_id,
					is_leader: false,
				}));

			createTeam({
				variables: {
					input: {
						name: draftData?.team_name,
						avatar: draftData?.team_avatar,
						team_member: [
							{
								user_id: +profile?.user_id!,
								is_leader: true,
							},
							...(filterDataMember || []),
						],
					},
				},
				onCompleted: () => {
					refetch();
				},
			});
			setReset(true);
		}
	};

	const handleAddMember = (member: TeamType) => {
		setDraftData({
			...draftData!,
			team: draftData?.team ? [...draftData?.team, member] : [member],
		});
		setError({
			...error,
			["team"]:
				((draftData?.team ? [...draftData?.team, member] : [member])
					?.length as any) > 1
					? ""
					: "Your team must have at least 2 members",
		});
	};

	useEffect(() => {
		if (profile?.user_id) {
			searchMember();
			refetch();
		}
	}, [profile?.user_id, refetch, searchMember]);

	const loading = memberLoading && teamLoading;

	return {
		loading,
		reset,
		error,
		searchMemberValue,
		teamList,
		memberList,
		draftData,
		handleCloseCreateEditTeam,
		handleCreateTeam,
		handleChangeTeamName,
		handleChangeAvatar,
		handleSaveTeam,
		handleSearchMember,
		handleAddMember,
		handleRemove,
	};
};

export default UseCreateNewTeam;
