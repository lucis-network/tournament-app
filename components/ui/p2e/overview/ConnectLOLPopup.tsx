import { Form, Input, message, Modal } from "antd";
import React from "react";

interface IProps {
  onCancel: () => void;
  onConnectLOL: (summonerName: string) => void;
}
export const ConnectLOLPopup = (props: IProps) => {

  const [summonerName, setSummonerName] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");

  const connectLOL = () => {
    if (!summonerName) {
      setStatus("error");
      message.error("You can enter summoner name to continue!");
    }

    props.onConnectLOL(summonerName);
  }
  return (
    <>
      <Modal
        title="Connect account League of Legends"
        visible={true}
        onCancel={() => props.onCancel()}
        okText="Connect"
        onOk={() => connectLOL()}

      >
        <Form
          layout="vertical"
        >
          <Form.Item label={<span style={{ color: "#fff" }}>Summoner Name</span>}>
            <Input
              autoFocus
              placeholder="Enter summoner name ..."
              onChange={(e) => { setSummonerName(e.currentTarget.value); setStatus("") }}
              status={status as any}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}