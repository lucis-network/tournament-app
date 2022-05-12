import { Modal } from "antd";
import { fomatNumber } from "utils/Number";
import s from "./index.module.sass";

type Props = {
  closeModalNotify: () => void;
  currency?: any;
  status?: boolean;
  values: string;
};

const PopupNotify = (props: Props) => {
  const { status, closeModalNotify, values, currency } = props;
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
        {currency?.symbol} and will transfer it to &lt;RECEIVE&gt; after the tournament
        finish
      </div>
      <p>Thanks you your donation</p>
    </Modal>
  );
};

export default PopupNotify;
