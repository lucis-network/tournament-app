import { Form, Input, Modal } from "antd";
import React from "react";

interface IProps {
  onCancel: () => void;
}
export const ConnectLOLPopup = (props: IProps) => {

  // const connectLOL = () => {

  // }
  return (
    <>
      <Modal
        title="Connect account League of Legends"
        visible={true}
        onCancel={() => props.onCancel()}
        okText="Connect"
        // onOk={}

      >
        <Form 
          layout="vertical"
        >
          <Form.Item label={<span style={{color: "#fff"}}>Summoner Name</span>}>
            <Input autoFocus placeholder="Enter summoner name ..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}