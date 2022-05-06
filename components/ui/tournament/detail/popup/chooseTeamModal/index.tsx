import { Modal } from "antd";
import React from "react";
import { StepModalTournament } from "../../hooks/useTeamModal";
import s from "./TeamModal.module.sass";

interface TeamModalProps {
	show: boolean;
	step: StepModalTournament;
	stepConfiguration: any;
}

const ChooseTeamModal: React.FC<TeamModalProps> = ({
	show,
	step,
	stepConfiguration,
}) => {
	const data = stepConfiguration(step);

	return (
		<Modal
			centered
			title={<h3 className="text-16px text-white">213</h3>}
			visible={show}
			wrapClassName={s.mdl}
			okText="Confirm"
			footer={null}
		>
			{data?.description}
		</Modal>
	);
};

export default ChooseTeamModal;
