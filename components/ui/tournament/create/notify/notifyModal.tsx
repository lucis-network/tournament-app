import { observer } from "mobx-react-lite";
import { Button, Input, Modal } from "antd";
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
    router.push("/tournament");
    TournamentStore.depositModalVisible = false;
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    TournamentStore.resetStates();
    clearLocalCreateTournament();
    router.push("/tournament");
    TournamentStore.depositModalVisible = false;
  };

  const copy = (e: any) => {
    console.log(e.target.value);
    navigator.clipboard.writeText("https://lucis-tn.koolab.io/");
  };
  return (
    <div style={{ width: "400px" }}>
      <Modal
        title={<span className="font-[600]">Created successfully</span>}
        visible={isModalVisible}
        onOk={handleOk}
        className={`${s.container}`}
        //footer={null}
        onCancel={handleCancel}
      >
        <div style={{ textAlign: "center" }}>
          <p>
            Lucis will review and approve your tournament in less than 24h then
            your tournament can be visiable to everyone
          </p>
          {/* <p>Here your invite link to invite team to join your tournaments:</p>
          <Input
            disabled
            value="https://lucis-tn.koolab.io/"
            onClick={copy}
            style={{color: "white"}}
          ></Input>
          <div className={s.button}>
            <Button>View your tournament</Button>
            <Button>Share</Button>
          </div> */}
        </div>
        <ConnectWalletModal />
      </Modal>
    </div>
  );
});
