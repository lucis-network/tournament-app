import React, { ReactElement, isValidElement } from "react";
import { Modal } from "antd";
import {
	StepModalComponent,
	StepModalTournament,
} from "components/ui/common/types";
import s from "./TeamModal.module.sass";

interface TeamModalProps {
	show: boolean;
	step: StepModalTournament;
	stepConfiguration: (
		step: StepModalTournament
	) => StepModalComponent | ReactElement;
	onCancel?: () => void;
}

const ChooseTeamModal: React.FC<TeamModalProps> = ({
	show,
	step,
	stepConfiguration,
	onCancel,
}) => {
	const data = stepConfiguration(step);

	return !isValidElement(data) ? (
		<Modal
			centered
			title={<h3 className="text-16px text-white">{data?.titleModal}</h3>}
			visible={show}
			wrapClassName={s.mdl}
			okText="Confirm"
			footer={null}
			width={(data?.modalWidth! as any) || 400}
			onCancel={onCancel}
		>
			{data?.description!}
			{data?.component!}
		</Modal>
	) : (
		data
	);
};

export default ChooseTeamModal;
