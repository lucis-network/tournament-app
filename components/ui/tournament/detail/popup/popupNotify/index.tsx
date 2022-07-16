import { Modal } from "antd";
import { format } from "utils/Number";
import s from "./index.module.sass";

type Props = {
  closeModalNotify: () => void;
  currency?: any;
  status?: boolean;
  values: string;
  name?: string;
  desc?: string;
};

const PopupNotify = (props: Props) => {
  const { status, closeModalNotify, values, currency, name, desc } = props;

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
        {format(Number.parseFloat(values), 2, {zero_trim: true})} {currency?.symbol}
      </div>
      <div style={{ fontSize: 16, marginBottom: "10px"}}>
        &quot;{desc}&quot;
      </div>
      <div>
        We&apos;ve received {format(Number.parseFloat(values), 2, {zero_trim: true})}{" "}
        {currency?.symbol} and will transfer it to &quot;{name}&quot; after the
        tournament finish
      </div>
      <p>Thanks for your donation</p>
    </Modal>
  );
};

export default PopupNotify;
