import { observer } from "mobx-react-lite";
import { Modal } from "antd";
import TournamentStore from "src/store/TournamentStore";
import s from "./index.module.sass";
import ConnectWalletModal from "components/Auth/components/ConnectWalletModal";
import { useRouter } from "next/router";
import { clearLocalCreateTournament } from "components/service/tournament/TournamentService";

type Props = {};

export default observer(function NotifyModal(props: Props) {
  const router = useRouter();

  const isModalVisible = TournamentStore.notifyModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.notifyModalVisible = v);

  const handleOk = () => {
    setIsModalVisible(false);
    TournamentStore.resetStates();
    clearLocalCreateTournament();
    router.push("/");
  };

  return (
    <div style={{ width: "400px" }}>
      <Modal
        title={<span className="font-[600]">Create successfully</span>}
        visible={isModalVisible}
        onOk={handleOk}
        className={`${s.container}`}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="">
          <p>
            Lucis will review and approve your tournament in less than 24h then
            your tournament can be visiable to everyone
          </p>
        </div>
        <ConnectWalletModal />
      </Modal>
    </div>
  );
});
