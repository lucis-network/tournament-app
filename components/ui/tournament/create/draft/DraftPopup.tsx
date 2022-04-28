import { observer } from "mobx-react-lite";
import { Button, Popconfirm } from "antd";
import TournamentStore from "src/store/TournamentStore";

type Props = {
  handCallbackChooseGame?: any;
};

export default observer(function DraftPopup(props: Props) {
  const isModalVisible = TournamentStore.draftPopupVisible,
    setIsModalVisible = (v: boolean) => (TournamentStore.draftPopupVisible = v);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const confirm = () => {
    alert("Confirm popup");
    setIsModalVisible(false);
  };

  return (
    <Popconfirm
      title="Title"
      onConfirm={confirm}
      onVisibleChange={() => console.log("visible change")}
      visible={isModalVisible}
    >
      <Button type="primary">Open Popconfirm with Promise</Button>
    </Popconfirm>
  );
});
