import { Input, Modal } from "antd";
import { LINK_URL } from "utils/Enum";
import s from "./PopupShare.module.sass";

type Props = {
  datas?: object;
  status: boolean;
  closeModal: () => void;
  asPath: string;
};

const PopupShare = (props: Props) => {
  const { status, closeModal, asPath } = props;

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
      {/* <Input readOnly> {LINK_URL} </Input> */}
      <input readOnly value={`${LINK_URL}${asPath}`} style={{background: "#1890ff", color: "white", width: "100%"}}>
      </input>
    </Modal>
  );
};

export default PopupShare;
