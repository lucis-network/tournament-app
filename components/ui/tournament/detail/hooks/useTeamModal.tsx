import { Button } from "antd";
import { getLocalAuthInfo } from "components/Auth/AuthLocal";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect, ReactElement } from "react";
import { PlusOutlined } from "@ant-design/icons";
import s from "../popup/chooseTeamModal/TeamModal.module.sass";
import { MyTeamType } from "components/ui/common/tabsItem/myTeamDetail/hooks/useControlTeam";
import TeamSelect from "../popup/chooseTeamModal/TeamSelect";
import {
	JoinTournamentType,
	StepModalComponent,
	StepModalTournament,
} from "components/ui/common/types";
import CreateTeamModal from "components/ui/common/createTeamModal";
import UseUploadAvatar from "components/ui/common/tabsItem/myTeamDetail/hooks/useUploadAvatar";
import UseCreateNewTeam, { TeamType } from "./useCreateNewTeam";
import AddUserTeamModal from "components/ui/common/addUserTeamModal";
import TeamPrizing from "../popup/chooseTeamModal/TeamPrizing";

const UseTeamModal = (tournamentData: any) => {
	const router = useRouter();
	const user = getLocalAuthInfo();

	const [show, setShow] = useState<boolean>(false);
	const [step, setStep] = useState<StepModalTournament>("step-1");
	const { name, game } = tournamentData?.tournament;
	const [draftTournament, setDraftTournament] = useState<JoinTournamentType>();
	const [selectedTeam, setSelectedTeam] = useState<MyTeamType>();

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

	const handleManageTeam = () => {
		router.push("/profile");
	};

	const handleChangeStep = (step: StepModalTournament) => {
		setStep(step);
	};

	const handleSelectTeam = (team: MyTeamType) => {
		setStep("step-2");
		setSelectedTeam(team);
	};

	const handleOpenAddMember = () => {
		setStep("add-team");
	};

	const handleAddMemberToTeam = (member: TeamType) => {
		setStep("create-team");
		handleAddMember(member);
	};

	const handleOpenCreateNewTeam = () => {
		setStep("create-team");
		handleCreateTeam();
	};

	const handleCreateNewTeam = () => {
		setStep("step-1");
		handleSaveTeam();
	};

	const handleCloseCreateNewTeam = () => {
		setStep("step-1");
		handleCloseCreateEditTeam();
	};

	const handleCloseAddMember = () => {
		setStep("create-team");
		handleCloseCreateEditTeam();
	};

	const handleCloseModal = () => {
		setShow(false);
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
								<button className={s.button} onClick={handleManageTeam}>
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
									isValid={true}
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
				component: <TeamPrizing selectedTeam={selectedTeam!} />,
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
				titleModal: "Join step 1: Choosing team",
				description: <Button>123</Button>,
				component: <p>1</p>,
			},
			["success"]: {
				titleModal: "Join step 1: Choosing team",
				description: <Button>123</Button>,
				component: <p>1</p>,
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
