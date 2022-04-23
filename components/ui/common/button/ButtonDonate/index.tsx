import { Modal, Button } from "antd";
import { useState } from "react";
import s from "./Button.module.sass";

type Props = {
  name?: object;
};
export default function ButtonDonate(props: Props) {
  const { name } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const handleClick = () => {
    setModalVisible(true);
  };
  return (
    <div className={s.container_button_donate}>
      <Button onClick={handleClick} type="primary">
        Donate
      </Button>

      <Modal
        centered
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        className={s.content_modal}
      >
        {
          Object.values([name]).map((e: any) => (
            <p key={e.key}>{e.name}</p>
          ))
        }
      </Modal>
    </div>
  );
}
