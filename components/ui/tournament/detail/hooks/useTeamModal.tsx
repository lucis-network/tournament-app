import { getLocalAuthInfo } from "components/Auth/AuthLocal";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect, ReactElement } from "react";
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

export interface Item extends TeamType {
	prize: number;
	game_member_id: string;
}

const UseTeamModal = (tournamentData: any) => {
	const router = useRouter();
	const user = getLocalAuthInfo();

	const [show, setShow] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [step, setStep] = useState<StepModalTournament>("step-1");
	const { name, game, team_size } = tournamentData?.tournament;
	const { joinTournament } = tournamentData;
	const [draftTournament, setDraftTournament] = useState<JoinTournamentType>();
	const [selectedTeam, setSelectedTeam] = useState<MyTeamType>();
	const [draftSelectedTeam, setDraftSelectedTeam] = useState<MyTeamType>();
	const [dataFrom, setDataForm] = useState<Item[]>([]);

	const {
		reset,
		draftData,
		error,
		memberList,
		teamList,
		searchMemberValue,
		handleAddMember,
		handleChangeAvatar,
		handleChangeTeamName,
		handleCloseCreateEditTeam,
		handleCreateTeam,
		handleRemove,
		handleSaveTeam,
		handleSearchMember,
	} = UseCreateNewTeam(user?.profile);

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

	const handleChangeStep = (step: StepModalTournament) => {
		setStep(step);
	};

	const handleChooseTeamConfirm = (team: TeamType[]) => {
		setSelectedTeam({ ...selectedTeam!, team });
		setStep("step-2");
	};

	const handleSelectTeam = (team: MyTeamType) => {
		const dataTeam = (team?.team as Item[])?.map((member) => ({
			...member,
			prize: 100 / (team.team?.length || 1),
			game_member_id: member.game_member_id,
		}));
		setStep("step-2");
		setSelectedTeam(team);
		setDataForm(dataTeam);
		setDraftSelectedTeam(team);
	};

	const handleOpenAddMember = () => {
		setStep("add-team");
	};

	const handleAddMemberToTeam = (member: TeamType) => {
		setStep("create-team");
		handleAddMember(member);
	};

	const handleJoinTournament = () => {
		const convertTeamMember = dataFrom?.map((member) => ({
			id_in_game: member.game_member_id,
			is_leader: member.is_leader,
			user_id: member.user_id,
			prize_alloc: member.prize,
		})) as JoinTournamentTeamType[];

		joinTournament({
			variables: {
				data: {
					tournament_uid: "cl2rdu56s18150jrswgoh73lb",
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
	};

	const handleOpenCreateNewTeam = () => {
		setStep("create-team");
		handleCreateTeam();
	};

	const handleCreateNewTeam = () => {
		setStep("step-1");
		handleSaveTeam();
	};

	const handleChooseTeam = () => {
		setStep("choose-player");
	};

	const handleCloseCreateNewTeam = () => {
		setStep("step-1");
		handleCloseCreateEditTeam();
	};

	const handleCloseAddMember = () => {
		setStep("create-team");
		handleCloseCreateEditTeam();
	};

	const handleBack = () => {
		setStep("step-1");
	};

	const handleCloseModal = () => {
		switch (step) {
			case "step-2":
				setStep("step-1");
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
	}, []);

	const stepConfiguration = (
		step: StepModalTournament
	): StepModalComponent | ReactElement => {
		const description1 = (
			<p className="text-24px font-semibold text-white">
				Select a valid team to join: <br />
				{`${game?.name} + ${name}`}
			</p>
		);
		const description2 = (
			<p className="text-24px font-semibold text-white">
				Configure your team Prize for this tournament: <br />
				{`${game?.name} + ${name}`}
			</p>
		);
		const stepModifier = {
			["step-1"]: {
				titleModal: "Join step 1: Choosing team",
				description: description1,
				component: (
					<div>
						<div className="flex align-top justify-between w-full mb-4">
							<p>Team you&apos;ve lead:</p>
							<div>
								<button
									className={s.button}
									onClick={() => handleRoutes("/profile")}
								>
									Manager your team
								</button>
								<button className={s.button} onClick={handleOpenCreateNewTeam}>
									<PlusOutlined className="mr-2" />
									Create a new member
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
				titleModal: "Join step 2: Prize Allocation",
				description: description2,
				component: selectedTeam ? (
					<TeamPrizing
						dataForm={dataFrom}
						password={password}
						teamSize={team_size}
						selectedTeam={selectedTeam}
						onChooseTeam={handleChooseTeam}
						onJoinTournament={handleJoinTournament}
						onChangePassword={handleChangePassword}
						onBack={handleBack}
						onSetDataForm={setDataForm}
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
					onCancel={handleCloseAddMember}
				/>
			),
			["choose-player"]: {
				titleModal: "Choose player",
				description: (
					<p className="text-16px font-semibold text-white">
						The tournament team size is {team_size}. Your team exceeds of team
						size
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
				description: <p>Some description here</p>,
				component: (
					<div className="flex justify-center align-middle items-center mt-8">
						<button
							className={`${s.button} mr-4 !w-max`}
							onClick={() => handleRoutes("/tournament")}
						>
							Back to tournament
						</button>
						<button className={`${s.button} !w-max`} onClick={() => {}}>
							<ShareAltOutlined className="mr-2" />
							Share
						</button>
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
