import { getLocalAuthInfo } from "components/Auth/AuthLocal";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect, ReactElement, useMemo } from "react";
import { PlusOutlined, ShareAltOutlined } from "@ant-design/icons";
import s from "../popup/chooseTeamModal/TeamModal.module.sass";
import { MyTeamType } from "components/ui/common/tabsItem/myTeamDetail/hooks/useControlTeam";
import TeamSelect from "../popup/chooseTeamModal/TeamSelect";
import {
	JoinTournamentTeamType,
	JoinTournamentType,
	StepModalComponent,
	StepModalTournament,
} from "components/ui/common/types";
import CreateTeamModal from "components/ui/common/createTeamModal";
import UseUploadAvatar from "components/ui/common/tabsItem/myTeamDetail/hooks/useUploadAvatar";
import UseCreateNewTeam, { TeamType } from "./useCreateNewTeam";
import AddUserTeamModal from "components/ui/common/addUserTeamModal";
import TeamPrizing from "../popup/chooseTeamModal/TeamPrizing";
import ChoosePlayer from "../popup/chooseTeamModal/ChoosePlayer";
import { checkEmptyArrayValue, checkTotalPercent, dataTeam } from "./helper";

export interface Item extends TeamType {
	prize?: number;
	game_member_id?: string;
}

export type ErrorTourKey =
	| Record<"prize" | "user" | "size", string>
	| undefined;

const UseTeamModal = (tournamentData: any) => {
	const router = useRouter();
	const user = getLocalAuthInfo();
	const {
		name,
		team_size,
		password: tourPassword,
	} = tournamentData?.tournament;
	const { tournamentId } = tournamentData;
	const { joinTournament } = tournamentData;
	const isSoloVersion = useMemo(() => team_size === 1, [team_size]);
	const [show, setShow] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [step, setStep] = useState<StepModalTournament>("step-1");
	const [selectedTeam, setSelectedTeam] = useState<MyTeamType>();
	const [draftSelectedTeam, setDraftSelectedTeam] = useState<MyTeamType>();
	const [errorTour, setErrorTour] = useState<ErrorTourKey>();

	const {
		reset,
		draftData,
		error,
		memberList,
		teamList,
		searchMemberValue,
		searchTeam,
		searchMember,
		handleAddMember,
		handleChangeAvatar,
		handleChangeTeamName,
		handleCloseCreateEditTeam,
		handleCloseAddMember,
		handleCreateTeam,
		handleRemove,
		handleSaveTeam,
		handleSearchMember,
	} = UseCreateNewTeam(user?.profile, team_size);

	const { url, inputKey, handleFileInput } = UseUploadAvatar(
		handleChangeAvatar,
		reset
	);

	const handleRoutes = (route: string) => {
		router.push(route);
	};

	const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};

	const checkEmptyUserId = checkEmptyArrayValue(
		selectedTeam?.team || [],
		"game_member_id"
	);
	const checkEmptyPrize = checkEmptyArrayValue(
		selectedTeam?.team || [],
		"prize"
	);

	const checkTotalPrize = checkTotalPercent(selectedTeam?.team || [], "prize");

	console.log(checkTotalPrize);

	const handleChangeStep = (step: StepModalTournament) => {
		setStep(step);
	};

	const handleAddMemberToTeam = (member: TeamType) => {
		setStep("create-team");
		handleAddMember(member);
	};
	const handleChooseTeamConfirm = (team: TeamType[]) => {
		setErrorTour({} as any);
		setSelectedTeam({ ...selectedTeam!, team: dataTeam(team, true) });
		setStep("step-2");
	};

	const handleSelectTeam = (team: MyTeamType) => {
		const checkOverSize = (team.team?.length || 0) > team_size;
		setStep("step-2");
		setSelectedTeam({
			...team!,
			team: dataTeam(
				checkOverSize
					? [
							{
								avatar: user?.profile?.avatar || "",
								display_name: user?.profile?.display_name || "",
								user_id: +user?.id!,
								is_leader: true,
								user_name: user?.profile?.user_name || "",
								prize: 100,
							} as any,
					  ]
					: team?.team,
				true
			),
		});

		setDraftSelectedTeam(team);
		setErrorTour({} as any);
	};

	const handleSetFormData = (team: Item[]) => {
		setSelectedTeam({ ...selectedTeam!, team: dataTeam(team) });

		const checkEmptyUserId = checkEmptyArrayValue(team, "game_member_id");
		const checkEmptyPrize = checkEmptyArrayValue(team, "prize");
		const checkTotalPrize = checkTotalPercent(team, "prize");

		if (checkEmptyPrize || checkTotalPrize || checkEmptyUserId) {
			setErrorTour({
				...errorTour,
				size: team_size !== team.length ? "Invalid team size to join" : "",
				prize: checkEmptyPrize
					? "Prize allocation must not be empty"
					: checkTotalPrize
					? "Total Allocation must be 100%"
					: "",
				user: checkEmptyUserId ? "ID in game must not be empty" : "",
			});
		} else {
			setErrorTour({} as any);
		}
	};

	const handleOpenAddMember = () => {
		searchMember();
		setStep("add-team");
	};

	const handleJoinTournament = () => {
		if (checkEmptyPrize || checkTotalPrize || checkEmptyUserId) {
			setErrorTour({
				...errorTour,
				size:
					team_size !== selectedTeam?.team?.length
						? "Invalid team size to join"
						: "",
				prize: checkEmptyPrize
					? "Prize allocation must not be empty"
					: checkTotalPrize
					? "Total Allocation must be 100%"
					: "",
				user: checkEmptyUserId ? "ID in game must not be empty" : "",
			});
		} else {
			setErrorTour({} as any);
			const convertTeamMember = selectedTeam?.team?.map((member) => ({
				id_in_game: member.game_member_id,
				is_leader: member.is_leader,
				user_id: member.user_id,
				prize_alloc: member.prize,
			})) as JoinTournamentTeamType[];

			joinTournament({
				variables: {
					data: {
						tournament_uid: tournamentId,
						tournament_password: password,
						team_uid: selectedTeam?.team_uid,
						member: convertTeamMember,
					} as JoinTournamentType,
				},
				onCompleted: () => {
					setPassword("");
					setStep("success");
				},
				onError: (err: any) => {
					console.log(err);
				},
			});
		}
	};

	const handleCreateNewTeam = () => {
		setStep("step-1");
		handleSaveTeam();
	};

	const handleOpenCreateNewTeam = () => {
		setStep("create-team");
		handleCreateTeam();
	};

	const handleChooseTeam = () => {
		setStep("choose-player");
	};

	const handleCloseCreateNewTeam = () => {
		setStep("step-1");
		handleCloseCreateEditTeam();
	};

	const handleCloseAdd = () => {
		setStep("create-team");
		handleCloseAddMember();
	};

	const handleBack = () => {
		setStep("step-1");
	};

	const handleCloseModal = () => {
		switch (step) {
			case "step-2":
				isSoloVersion ? setShow(false) : setStep("step-1");
				break;
			case "choose-player":
				setStep("step-2");
				break;
			default:
				setShow(false);
				break;
		}
	};

	const handleOpenModal = useCallback(() => {
		setShow(true);
		searchTeam();
		if (isSoloVersion) {
			setStep("step-2");
			setSelectedTeam({
				team: [
					{
						user_id: user?.id,
						display_name: user?.profile?.display_name,
						avatar: user?.profile?.avatar,
						is_leader: true,
						prize: 100,
					},
				] as Item[],
			} as MyTeamType);
		}
	}, [
		isSoloVersion,
		searchTeam,
		user?.id,
		user?.profile?.avatar,
		user?.profile?.display_name,
	]);

	useEffect(() => {
		if (selectedTeam && (selectedTeam?.team?.length || 0) > team_size) {
			setSelectedTeam({
				...selectedTeam,
				team: selectedTeam?.team?.slice(0, -(selectedTeam?.team.length - 1)),
			});
		}
	}, [selectedTeam, team_size]);

	const stepConfiguration = (
		step: StepModalTournament
	): StepModalComponent | ReactElement => {
		const description1 = (
			<p className="text-24px font-semibold text-white">
				Select a valid team to join: <br />
				{`${name}`}
			</p>
		);
		const description2 = (
			<p className="text-24px font-semibold text-white">
				Configure your team Prize for this tournament: <br />
				{`${name}`}
			</p>
		);
		const stepModifier = {
			["step-1"]: {
				titleModal: "Join step 1: Choosing team",
				description: description1,
				component: (
					<div>
						<div className="flex align-top justify-between w-full mb-4">
							<p>
								{teamList?.length > 0
									? "Team you've lead:"
									: "You are not the leader of any team"}
							</p>
							<div>
								<button
									className={s.button}
									onClick={() => handleRoutes("/profile")}
								>
									Manage your team
								</button>
								<button className={s.button} onClick={handleOpenCreateNewTeam}>
									<PlusOutlined className="mr-2" />
									Create a new team
								</button>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-4">
							{teamList?.map((team, i) => (
								<TeamSelect
									key={i}
									team={team}
									isValid={team.team?.length! >= team_size}
									onSelect={() => handleSelectTeam(team)}
								/>
							))}
						</div>
					</div>
				),
				modalWidth: 780,
			},
			["step-2"]: {
				titleModal: isSoloVersion
					? "Prize Allocation"
					: "Join step 2: Prize Allocation",
				description: description2,
				component: selectedTeam ? (
					<TeamPrizing
						isSolo={isSoloVersion}
						error={errorTour}
						tourPassword={tourPassword}
						password={password}
						teamSize={team_size}
						selectedTeam={selectedTeam}
						draftSelectedTeam={draftSelectedTeam}
						onChooseTeam={handleChooseTeam}
						onJoinTournament={handleJoinTournament}
						onChangePassword={handleChangePassword}
						onBack={handleBack}
						onSetDataForm={handleSetFormData}
					/>
				) : (
					<></>
				),
				modalWidth: 980,
			},
			["create-team"]: (
				<CreateTeamModal
					url={url}
					inputKey={inputKey}
					reset={reset}
					error={error}
					isEdit={false}
					draftData={draftData}
					showModal={true}
					onChangeAvatar={handleFileInput}
					onChangeTeamName={handleChangeTeamName}
					onAddOpen={handleOpenAddMember}
					onOpenRemove={handleRemove}
					onSave={handleCreateNewTeam}
					onCancel={handleCloseCreateNewTeam}
				/>
			),
			["add-team"]: (
				<AddUserTeamModal
					searchValue={searchMemberValue}
					memberList={memberList}
					showModal={true}
					onSearch={handleSearchMember}
					onAdd={handleAddMemberToTeam}
					onCancel={handleCloseAdd}
				/>
			),
			["choose-player"]: {
				titleModal: "Choose player",
				description: (
					<p className="text-16px font-semibold text-white">
						The tournament team size is {team_size}. Your team exceeds of team
						size. You need choose more {team_size - 1} members to join
					</p>
				),
				component: (
					<ChoosePlayer
						draftTeam={draftSelectedTeam?.team || []}
						teamSize={team_size}
						onConfirm={handleChooseTeamConfirm}
					/>
				),
			},
			["success"]: {
				titleModal: "You'v successfully join this tournament",
				description: <p></p>,
				component: (
					<div className="flex justify-center align-middle items-center mt-8">
						<button
							className={`${s.button} mr-4 !w-max`}
							onClick={() =>
								handleRoutes(`/tournament/${tournamentId}/${name}`)
							}
						>
							Back to tournament
						</button>
						{/* <button className={`${s.button} !w-max`} onClick={() => {}}>
							<ShareAltOutlined className="mr-2" />
							Share
						</button> */}
					</div>
				),
				modalWidth: 540,
			},
		};

		return stepModifier[step];
	};

	useEffect(() => {
		if (!user) router.push("/");
	}, [router, user]);

	return {
		step,
		show,
		handleOpenModal,
		handleCloseModal,
		handleChangeStep,
		stepConfiguration,
	};
};

export default UseTeamModal;
