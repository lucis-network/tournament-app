import React from "react";
import { Modal } from "antd";
import s from "./PopupConfirm.module.sass";

interface PopupConfirmProps {
	show: boolean;
	onCancel: () => void;
	onOk: () => void;
}

export const PopupConfirm: React.FC<PopupConfirmProps> = ({
	show,
	onCancel,
	onOk,
}) => {
	return (
		<Modal
			centered
			title={<h3 className="text-16px text-white">Tournament result</h3>}
			visible={show}
			wrapClassName={s.mdl}
			okText="Confirm"
			onCancel={onCancel}
			onOk={onOk}
		>
			Please review the tournament result first. If you do not agree with
			result, please contact to the referee(s) to resolve your problem
		</Modal>
	);
};
