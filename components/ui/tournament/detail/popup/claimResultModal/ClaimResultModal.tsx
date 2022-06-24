import { observer } from "mobx-react-lite";
import { Modal } from "antd";
import s from "./index.module.sass";
import { fomatNumber } from "utils/Number";

type Props = {
  totalPrizePool: number;
  currency?: string;
  name: string;
  claim?: boolean;
  status?: boolean;
  onCancel?: () => void;
};

export default observer(function ClaimResultModal(props: Props) {
  const { totalPrizePool, currency, name, claim, status, onCancel } = props;

  return (
    <div style={{ width: "400px" }}>
      <Modal visible={status} onCancel={onCancel} footer={null}>
        <div className={`${s.container}`}>
          <p>Claim success</p>
          <p>
            {fomatNumber(totalPrizePool ? (totalPrizePool * 95) / 100 : 0)}{" "}
            {currency}
          </p>
          <div>
            You&apos;ve successfully claimed the{" "}
            {claim == true ? "donation reward" : "prize"} <br />
            from {name} tournament
          </div>
        </div>
      </Modal>
    </div>
  );
});
