import { observer } from "mobx-react-lite";
import { Button, Modal } from "antd";
import TournamentStore from "src/store/TournamentStore";
import s from "./index.module.sass";

type Props = {};

export default observer(function ClaimResultModal(props: Props) {
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
      >
        <div className={`${s.container}`}>
          <p>Claim success</p>
          <p>1234 USDT</p>
          <div>
            You&apos;ve got a THIRD PRIZE <br />
            from Thetan + Lucis Mid Summer Tournament
          </div>
          <Button>Share my victory</Button>
        </div>
      </Modal>
    </div>
  );
});
