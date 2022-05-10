import { Button, Col, Modal, Row } from "antd";
import { ChangeEvent, FormEvent } from "react";
import s from "./UpdateScore.module.sass";
import RoundStore from "src/store/RoundStore";
import { observer } from "mobx-react-lite";

type Props = {
  datas?: object;
  status?: boolean;
  roundIdx?: number;
  seedIdx?: number;
  teams?: any[];
};

export default observer(function UpdateScore(props: Props) {
  const updateScoreModalVisible = RoundStore.updateScoreModal;
  const handleCloseModal = () => {
    RoundStore.updateScoreModal = false;
  };

  const handleUpdateScore = (e: FormEvent) => {
    console.log(e.currentTarget.textContent);
    console.log(RoundStore.singleRounds[3].seeds);
  };

  const team0 = RoundStore.currentMatch[0];
  const team1 = RoundStore.currentMatch[1];

  return (
    <Modal
      centered
      visible={updateScoreModalVisible}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      title="Update match result"
      footer={[
        <Button key="back" onClick={handleCloseModal}>
          Cancel
        </Button>,
        <Button key="submit" type="ghost" onClick={() => {}}>
          Update
        </Button>,
        <Button key="link" type="primary" onClick={() => {}}>
          Update and finish the match
        </Button>,
      ]}
    >
      {/* <p className="text-center">Round {roundIdx + 1}</p> */}
      <div style={{ padding: "15px 0" }}>
        <Row justify="center">
          <Col span={8} style={{ textAlign: "center" }}>
            <p className="text-center">{team0?.name}</p>

            <span
              className={`text-center ${s.score}`}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(e) => handleUpdateScore(e)}
            >
              {team0?.score}
            </span>
          </Col>
          <Col span={6}>
            <p className="text-center">VS</p>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <p className="text-center">{team1?.name}</p>

            <span
              className={`text-center ${s.score}`}
              contentEditable={true}
              suppressContentEditableWarning={true}
            >
              {team1?.score}
            </span>
          </Col>
        </Row>
      </div>
    </Modal>
  );
});
