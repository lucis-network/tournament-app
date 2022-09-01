import React from "react";
import GradientButton from "../../button/GradientButton";
import { PlusOutlined } from "@ant-design/icons";
import TeamCard from "../../teamCard";
import { Modal } from "antd";
import s from "./MyTeam.module.sass";
import CreateTeamModal from "../../createTeamModal";
import AddUserTeamModal from "../../addUserTeamModal";
import useControlTeam from "./hooks/useControlTeam";
import Search from "antd/lib/input/Search";
import UseUploadAvatar from "./hooks/useUploadAvatar";
import SpinLoading from "../../Spin";

type MyTeamDetailProps = {
	isOwnerProp?: boolean,
}

const MyTeamDetail = ({ isOwnerProp }: MyTeamDetailProps) => {
	const {
		loading,
		reset,
		profile,
		error,
		status,
		isEdit,
		searchValue,
		searchMemberValue,
		draftData,
		teamList,
		memberList,
		openAdd,
		openCreateTem,
		openRemove,
		handleCloseAdd,
		handleCloseCreateEditTeam,
		handleCreateEditTeam,
		handleRemove,
		handleSearch,
		handleChangeAvatar,
		handleChangeTeamName,
		handleSaveTeam,
		handleSearchMember,
		handleAddMember,
		handleOpenAddMember,
		handleOpenRemove,
		handleCloseRemove,
	} = useControlTeam();

	const { url, inputKey, handleFileInput } = UseUploadAvatar(
		handleChangeAvatar,
		reset
	);

	return (
		<>
			<div className="text-white pt-8">
				<div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 px-2 xl:px-8 pb-8 gap-4">
					{isOwnerProp && (
						<GradientButton
							small={true}
							className="text-white flex align-middle items-center col-span-1 col-start-auto"
							type={1}
							onClick={() => handleCreateEditTeam(false)}
						>
							<PlusOutlined className="mr-2" />
							Create a new team
						</GradientButton>
					)}
					<div className="col-span-1 col-end-auto xl:col-start-4 lg:col-start-3">
						<div className={s.content_search}>
							<Search
								placeholder={isOwnerProp ? 'Search your team' : `Search ${profile.user_name}'s team`}
								autoFocus
								value={searchValue}
								onChange={handleSearch}
							/>
						</div>
					</div>
				</div>
				{/*<div className="grid px-8 pb-4">*/}
				{/*	<h1 className="text-white">{isOwnerProp ? 'My team' : `${profile.user_name}'s team`}</h1>*/}
				{/*</div>*/}
				{loading ? (
					<SpinLoading />
				) : (
					<div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 px-2 xl:px-8 pb-4 gap-4">
						<TeamCard
							profile={profile}
							teamList={teamList}
							onOpenAdd={handleOpenAddMember}
							onEdit={handleCreateEditTeam}
							onOpenRemove={handleOpenRemove}
							isOwnerProp={isOwnerProp}
						/>
					</div>
				)}
			</div>

			<Modal
				title={
					<h3 className="text-16px text-white">
						{status === "delete"
							? "Are you sure to delete this team?"
							: status === "leave"
							? "Are you sure to leave this team?"
							: "Are you sure to delete this member?"}
					</h3>
				}
				centered
				visible={openRemove}
				wrapClassName={s.mdl}
				okText="Confirm"
				bodyStyle={{ display: "none" }}
				onOk={handleRemove}
				onCancel={handleCloseRemove}
			/>

			<CreateTeamModal
				url={url}
				inputKey={inputKey}
				reset={reset}
				error={error}
				isEdit={isEdit}
				draftData={draftData}
				showModal={openCreateTem}
				onChangeAvatar={handleFileInput}
				onChangeTeamName={handleChangeTeamName}
				onAddOpen={handleOpenAddMember}
				onOpenRemove={handleOpenRemove}
				onSave={handleSaveTeam}
				onCancel={handleCloseCreateEditTeam}
			/>

			<AddUserTeamModal
				searchValue={searchMemberValue}
				memberList={memberList}
				showModal={openAdd}
				onSearch={handleSearchMember}
				onAdd={handleAddMember}
				onCancel={handleCloseAdd}
			/>
		</>
	);
};

export default MyTeamDetail;
