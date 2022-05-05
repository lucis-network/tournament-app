import { Modal } from "antd";
import s from "./PopupShare.module.sass";

type Props = {
  datas?: object;
  status: boolean;
  closeModal: () => void;
};

const PopupShare = (props: Props) => {
  const { status, closeModal } = props;

  return (
    <Modal
      centered
      visible={status}
      onOk={closeModal}
      onCancel={closeModal}
      className={s.content_modal}
      //   title="Share to"
      footer=""
    >
      <p className="m-0">Share to:</p>
    </Modal>
  );
};

export default PopupShare;
