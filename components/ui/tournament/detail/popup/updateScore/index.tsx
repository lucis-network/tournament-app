import { Button, Col, Modal, Row } from "antd";
import s from "./UpdateScore.module.sass";

type Props = {
  datas?: object;
  status: boolean;
  closeModal: () => void;
  roundIdx: number;
  teams: any[];
};

const buttons = ["Cancel", "Update", "Update and finish the match"];

const UpdateScore = (props: Props) => {
  const { status, closeModal, roundIdx, teams } = props;
  if (teams && teams.length > 0) {
    console.log(teams[0]);
  }

  return (
    <Modal
      centered
      visible={status}
      onOk={closeModal}
      onCancel={closeModal}
      //   className={s.content_modal}
      title="Update match result"
      footer={[
        <Button key="back" onClick={() => {}}>
          Cancel
        </Button>,
        <Button key="submit" type="ghost" onClick={() => {}}>
          Update
        </Button>,
        <Button
          key="link"
          //   href="https://google.com"
          type="primary"
          onClick={() => {}}
          //   loading={loading}
          //   onClick={this.handleOk}
        >
          Update and finish the match
        </Button>,
      ]}
    >
      <p className="text-center">Round {roundIdx + 1}</p>
      <div style={{ padding: "15px 0" }}>
        <Row justify="center">
          <Col span={8} style={{ textAlign: "center" }}>
            <p className="text-center">
              {teams && teams.length > 0 && teams[0].id}
            </p>

            <span className={`text-center ${s.score}`} contentEditable={true}>
              {teams && teams.length > 0 && teams[0].score}
            </span>
          </Col>
          <Col span={6}>
            <p className="text-center">VS</p>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <p className="text-center">
              {teams && teams.length > 0 && teams[1].id}
            </p>

            <span
              className={`text-center ${s.score}`}
              contentEditable={true}
              // style={{
              //   border: "1px solid white",
              //   width: "20px",
              //   display: "block",
              //   margin:
              // }}
            >
              {teams && teams.length > 0 && teams[1].score}
            </span>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default UpdateScore;
