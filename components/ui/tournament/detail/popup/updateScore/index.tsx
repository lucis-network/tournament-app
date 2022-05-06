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

const UpdateScore = (props: Props) => {
  const handleCloseModal = () => {
    RoundStore.updateScoreModal = false;
  };

  const handleUpdateScore = (e: FormEvent) => {
    console.log(e.currentTarget.textContent);
    console.log(RoundStore.singleRounds[3].seeds);
  };

  return (
    <Modal
      centered
      visible={RoundStore.updateScoreModal}
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
            <p className="text-center">{RoundStore.currentMatch[0]?.name}</p>

            <span
              className={`text-center ${s.score}`}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(e) => handleUpdateScore(e)}
            >
              {RoundStore.currentMatch[0]?.score}
            </span>
          </Col>
          <Col span={6}>
            <p className="text-center">VS</p>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <p className="text-center">{RoundStore.currentMatch[1]?.name}</p>

            <span
              className={`text-center ${s.score}`}
              contentEditable={true}
              suppressContentEditableWarning={true}
            >
              {RoundStore.currentMatch[1]?.score}
            </span>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default observer(UpdateScore);
