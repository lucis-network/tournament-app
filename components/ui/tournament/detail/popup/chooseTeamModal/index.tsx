import { Modal } from "antd";
import React from "react";
import s from "./TeamModal.module.sass";

interface TeamModalProps {
  show: boolean;
  stepConfiguration: any;
}

const ChooseTeamModal: React.FC<TeamModalProps> = ({
  show,
  stepConfiguration,
}) => {
  const data = stepConfiguration("step-1");

  return (
    <Modal
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
