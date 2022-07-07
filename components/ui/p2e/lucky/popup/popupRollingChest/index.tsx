 import { Modal } from "antd";
import s from "./index.module.sass";

type Props = {
  closePopupRollingChest: () => void;
  status: boolean;
};

const PopupRollingChest = (props: Props) => {
  const { status, closePopupRollingChest } = props;

  return (
    <Modal
      visible={status}
      centered
      wrapClassName={s.content_modal}
      footer={null}
      onCancel={closePopupRollingChest}
      width={1920}
    >
      <div className={s.wrapper}>
        <div className={s.rolling}>
        </div>
      </div>

    </Modal>
  );
};

export default PopupRollingChest;
