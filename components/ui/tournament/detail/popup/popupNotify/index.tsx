import { Modal } from "antd";
import { fomatNumber } from "utils/Number";
import s from "./index.module.sass";

type Props = {
  closeModalNotify: () => void;
  currency?: any;
  status?: boolean;
  values: string;
  name?: string;
};

const PopupNotify = (props: Props) => {
  const { status, closeModalNotify, values, currency, name } = props;

  const closeModal = () => {};

  return (
    <Modal
      visible={status}
      centered
      className={s.content_modal}
      footer={null}
      title="Success"
      onCancel={closeModalNotify}
      style={{ textAlign: "center" }}
    >
      <div style={{ fontSize: 25 }}>
        {fomatNumber(Number.parseFloat(values))} {currency?.symbol}
      </div>
      <div>
        We&apos;ve received {fomatNumber(Number.parseFloat(values))}{" "}
        {currency?.symbol} and will transfer it to &quot;{name}&quot; after the
        tournament finish
      </div>
      <p>Thanks for your donation</p>
    </Modal>
  );
};

export default PopupNotify;
