import { observer } from "mobx-react-lite";
import { Button, Modal } from "antd";
import TournamentStore from "src/store/TournamentStore";
import s from "./index.module.sass";
import { fomatNumber } from "utils/Number";

type Props = {
  totalPrizePool: number;
  currency?: string;
  name: string;
  claim?: boolean;
};

export default observer(function ClaimResultModal(props: Props) {
  const { totalPrizePool, currency, name, claim } = props;
  const isModalVisible = TournamentStore.claimResultModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.claimResultModalVisible = v);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ width: "400px" }}>
      <Modal
        //title={<span className="font-[600]">Your reward from donation</span>}
        visible={isModalVisible}
        onOk={handleOk}
        //className={`${s.container}`}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={`${s.container}`}>
          <p>Claim success</p>
          <p>
            {fomatNumber(totalPrizePool ? (totalPrizePool * 95) / 100 : 0)}{" "}
            {currency}
          </p>
          <div>
            You&apos;ve successfully claimed the {" "}
            {claim ? "donation reward" : "prize"} <br />
            from {name} tournament
          </div>
          {/* <Button>Share my victory</Button> */}
        </div>
      </Modal>
    </div>
  );
});
