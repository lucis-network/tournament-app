import { Button, Col, Modal, Row } from "antd";
import { ChangeEvent, FormEvent } from "react";
import s from "./UpdateScore.module.sass";
import RoundStore from "src/store/SingleRoundStore";
import { observer } from "mobx-react-lite";

type Props = {
  datas?: object;
  status?: boolean;
  roundIdx?: number;
  seedIdx?: number;
  teams?: any[];
};

const UpdateScore = (props: Props) => {
  const { seedIndex, roundIndex, teams } = RoundStore.currentMatch;

  const handleCloseModal = () => {
    RoundStore.updateScoreModalVisible = false;
  };

  const handleUpdateScore = (
    e: ChangeEvent<HTMLInputElement>,
    teamIdx: number
  ) => {
    // RoundStore.rounds[roundIndex].seeds[seedIndex]
    // RoundStore.currentMatch.teams[teamIdx].score = e.target.value;
    const score = e.target.value;

    RoundStore.updateScoreCurrentMatch(score, seedIndex, roundIndex, teamIdx);
  };

  const updateButton = () => {
    RoundStore.updateScoreMatch(roundIndex, seedIndex);
    handleCloseModal();

    // @ts-ignore
    window.roundStore = RoundStore;
  };

  return (
    <Modal
      centered
      visible={RoundStore.updateScoreModalVisible}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      title="Update match result"
      footer={[
        <Button key="back" onClick={handleCloseModal}>
          Cancel
        </Button>,
        <Button key="submit" type="ghost" onClick={updateButton}>
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
            <p className="text-center">{teams ? teams[0].name : ""}</p>
            <input
              className={s.inputScore}
              value={teams ? teams[0].score : "0"}
              onChange={(e) => handleUpdateScore(e, 0)}
            />
          </Col>
          <Col span={6}>
            <p className="text-center">VS</p>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <p className="text-center">{teams ? teams[1].name : ""}</p>

            <input
              className={s.inputScore}
              value={teams ? teams[1].score : "0"}
              onChange={(e) => handleUpdateScore(e, 1)}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default observer(UpdateScore);
