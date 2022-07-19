import {
	ADD_PLAYER,
	CREATE_TEAM,
	DELETE_PLAYER,
	DELETE_TEAM,
	EDIT_TEAM,
	LEAVE_TEAM,
	SEARCH_MEMBER,
	SEARCH_TEAM,
} from "./../myTeamService";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { Item } from "components/ui/tournament/detail/hooks/useTeamModal";
import { getLocalAuthInfo } from "components/Auth/AuthLocal";
import { useRouter } from "next/router";
import { useGetUserProfile } from "../../../../../../hooks/myProfile/useMyProfile";
import TournamentStore from "src/store/TournamentStore";
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
	team?: Item[];
}

const UseControlTeam = () => {
	const [draftData, setDraftData] = useState<MyTeamType>();
	const [reset, setReset] = useState<boolean>(false);
	const [teamId, setTeamId] = useState<string>("");
	const [memberId, setMemberId] = useState<Number>();
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchMemberValue, setSearchMemberValue] = useState<string>("");
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [openAdd, setOpenAdd] = useState<boolean>(false);
	const [openCreateTem, setOpenCreateTeam] = useState<boolean>(false);
	const [openRemove, setOpenRemove] = useState<boolean>(false);
	const [isSaveDraft, setIsSaveDraft] = useState<boolean>(false);
	const [status, setStatus] = useState<"remove" | "delete" | "leave">("remove");
	const [error, setError] = useState<Record<string, string>>({});
	const router = useRouter();
	const { getUserProfileData } = useGetUserProfile({
		user_name:
			router.pathname === "/profile/[username]"
				? `${router.query.username}`
				: "",
		skip: router.pathname !== "/profile/[username]",
	});
	let user: any = {};
	if (router.pathname === "/profile/[username]") {
		user = getUserProfileData.getUserProfile;
	} else {
		user = getLocalAuthInfo();
	}

	const [searchMember, { data: rawSearchMember, loading: memberLoading }] =
		useLazyQuery(SEARCH_MEMBER, {
			variables: {
				teamId: "",
				value: "",
			},
			fetchPolicy: "cache-and-network",
		});

	const {
		data: rawSearchTeam,
		loading: teamLoading,
		refetch: searchTeam,
	} = useQuery(SEARCH_TEAM, {
		variables: {
			name: "",
			user_id: user?.profile?.user_id,
		},
		fetchPolicy: "cache-and-network",
	});

	const [createTeam] = useMutation(CREATE_TEAM);
	const [deleteTeam] = useMutation(DELETE_TEAM);
	const [leaveTeam] = useMutation(LEAVE_TEAM);
	const [editTeam] = useMutation(EDIT_TEAM);
	const [addPlayer] = useMutation(ADD_PLAYER);
	const [deletePlayer] = useMutation(DELETE_PLAYER);

	const convertMemberId = draftData?.team?.reduce(
		(acc, value) => {
			acc.push(value.user_id as never);
			return acc;
		},
		[user?.profile?.user_id] as any[]
	);
	const teamList = rawSearchTeam?.searchTeam as MyTeamType[];
	const memberList = isSaveDraft
		? (rawSearchMember?.searchMember as TeamType[])?.filter(
				(member) => !convertMemberId?.some((key: any) => key === member.user_id)
		  )
		: (rawSearchMember?.searchMember as TeamType[]);

	const handleRemove = () => {
		switch (status) {
			case "remove":
				if (!isSaveDraft) {
					deletePlayer({
						variables: {
							teamId,
							memberId,
						},
						onCompleted: () => searchTeam(),
					});
				}
				break;
			case "delete":
				deleteTeam({
					variables: {
						teamId,
					},
					onCompleted: () => searchTeam(),
				});
				break;
			case "leave":
				leaveTeam({
					variables: {
						teamId,
					},
					onCompleted: () => searchTeam(),
				});
				break;
			default:
				break;
		}

		setOpenRemove(false);
	};

	const handleCloseRemove = useCallback(() => {
		setOpenRemove(false);
	}, []);

	const handleOpenRemove = (
		team_uid: string,
		user_id: number,
		status: "remove" | "delete" | "leave",
		isSaveDraft?: boolean
	) => {
		setMemberId(user_id);
		setTeamId(team_uid);
		setStatus(status);

		if (isSaveDraft) {
			setIsSaveDraft(true);
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
		} else {
			setIsSaveDraft(false);
			setOpenRemove(true);
		}
	};

	const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
		const searchValue = e.currentTarget.value;
		setSearchValue(searchValue);
		searchTeam({
			name: searchValue,
			user_id: user?.profile?.user_id,
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

	const handleCreateEditTeam = (isEdit: boolean, team?: MyTeamType) => {
		team
			? setDraftData(team)
			: setDraftData({
					team_avatar: "",
					team_name: "",
					participant: 1,
					team: [
						{
							user_id: user?.profile?.user_id,
							display_name: user?.profile?.display_name,
							avatar: user?.profile?.avatar,
							is_leader: true,
						},
					],
			  } as MyTeamType);
		setIsEdit(isEdit);
		setOpenCreateTeam(true);
		setReset(false);
		setError({});
	};

	const handleCloseCreateEditTeam = () => {
		setDraftData(undefined);
		setOpenCreateTeam(false);
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

	const handleSaveTeam = (id?: string) => {
		setError({
			...error,
			["team_name"]: draftData?.team_name ? "" : "Team name is required",
			["team_avatar"]: draftData?.team_avatar ? "" : "Team avatar is required",
			["team"]:
				(draftData?.team?.length as any) > 1
					? ""
					: "Your team must have at least 2 members",
		});
		TournamentStore.loadingCeateTeam = false;
		if (
			draftData?.team_avatar &&
			draftData?.team_name &&
			draftData?.team &&
			draftData?.team?.length > 1
		) {
			TournamentStore.loadingCeateTeam = true;
			const filterDataMember = draftData?.team
				?.filter((team) => +team.user_id !== +user?.profile?.user_id!)
				?.map((item) => ({
					user_id: +item.user_id,
					is_leader: false,
				}));

			id
				? editTeam({
						variables: {
							input: {
								name: draftData?.team_name,
								avatar: draftData?.team_avatar,
								team_member: [
									{
										user_id: +user?.profile?.user_id!,
										is_leader: true,
									},
									...(filterDataMember || []),
								],
							},
							teamId: id,
						},
						onCompleted: () => {
							searchTeam();
							setOpenCreateTeam(false);
							TournamentStore.loadingCeateTeam = false;
						},
				  })
				: createTeam({
						variables: {
							input: {
								name: draftData?.team_name,
								avatar: draftData?.team_avatar,
								team_member: [
									{
										user_id: +user?.profile?.user_id!,
										is_leader: true,
									},
									...(filterDataMember || []),
								],
							},
						},
						onCompleted: () => {
							searchTeam();
							setOpenCreateTeam(false);
							TournamentStore.loadingCeateTeam = false;
						},
				  });
			setReset(true);
			//setOpenCreateTeam(false);
		}

	};

	const handleAddMember = (member: TeamType) => {
		if (isSaveDraft) {
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
			setOpenCreateTeam(true);
		} else {
			addPlayer({
				variables: {
					input: {
						team_uid: teamId,
						member_id: member.user_id,
					},
				},
				onCompleted: () => searchTeam(),
			});
		}
		setOpenAdd(false);
	};

	const handleOpenAddMember = (team_uid: string, isSaveDraft?: boolean) => {
		searchMember({
			variables: {
				teamId: team_uid || "",
				value: "",
			},
		});
		setTeamId(team_uid || "");
		setOpenAdd(true);
		setOpenCreateTeam(false);
		isSaveDraft ? setIsSaveDraft(true) : setIsSaveDraft(false);
	};

	const handleCloseAdd = useCallback(() => {
		if (isSaveDraft) setOpenCreateTeam(true);
		setOpenAdd(false);
	}, [isSaveDraft]);

	const loading = memberLoading && teamLoading;

	return {
		profile: user?.profile,
		loading,
		reset,
		error,
		status,
		isEdit,
		searchValue,
		searchMemberValue,
		teamList,
		memberList,
		draftData,
		openAdd,
		openCreateTem,
		openRemove,
		handleCloseCreateEditTeam,
		handleCreateEditTeam,
		handleRemove,
		handleSearch,
		handleChangeTeamName,
		handleChangeAvatar,
		handleSaveTeam,
		handleSearchMember,
		handleAddMember,
		handleOpenAddMember,
		handleCloseAdd,
		handleOpenRemove,
		handleCloseRemove,
	};
};

export default UseControlTeam;
