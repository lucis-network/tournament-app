import React from "react";
import { Modal } from "antd";
import s from "./AddUserTeamModal.module.sass";
import Search from "antd/lib/input/Search";
import { TeamType } from "../tabsItem/myTeamDetail/hooks/useControlTeam";
import MemberBox from "./MemberBox";

interface AddUserTeamModalType {
	memberList: TeamType[];
	searchValue: string;
	showModal: boolean;
	onAdd: (member: TeamType) => void;
	onSearch: (e: React.FormEvent<HTMLInputElement>) => void;
	onCancel: () => void;
}

const AddUserTeamModal: React.FC<AddUserTeamModalType> = ({
	memberList,
	searchValue,
	showModal,
	onAdd,
	onSearch,
	onCancel,
}) => {
	return (
		<Modal
			centered
			title={<h3 className="text-16px text-white">Add member to your team</h3>}
			visible={showModal}
			wrapClassName={s.mdl}
			okText="Confirm"
			onCancel={onCancel}
			footer={null}
		>
			<div>
				<div className={s.content_search}>
					<Search
						placeholder="Search by name or username"
						autoFocus
						value={searchValue}
						onChange={onSearch}
					/>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2 mt-12">
					{memberList?.map((member, i) => (
						<MemberBox key={i} member={member} onAdd={() => onAdd(member)} />
					))}
				</div>
			</div>
		</Modal>
	);
};

export default AddUserTeamModal;
