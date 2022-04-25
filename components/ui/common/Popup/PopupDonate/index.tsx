import { Button, Col, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { AppEmitter } from "services/emitter";
import s from "./PopupDonate.module.sass";

type Props = {
  datas?: object;
};

const { TextArea } = Input;

export default function PopupDonate(props: Props) {
  const { datas } = props;
  const [modalVisible, setModalVisible] = useState(Boolean);
  const [titleMessage, setTitleMessage] = useState("");
  const [values, setValues] = useState("");

  const showModal = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    const subscription = AppEmitter.addListener(
      "setPopupDonate",
      (visible: boolean) => {
        if (visible) {
          showModal();
        }
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const handleBlur = () => {
    if (values === "") {
      setTitleMessage("Chưa nhập money kìa mài");
    }
  };
  const handleChange = (e: any) => {
    const value = e.target.value;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      setValues(value);
      if (value <= 0) {
        setTitleMessage("sao ít vậy mày");
      } else if (value !== "") {
        setTitleMessage("");
      }
    }
  };

  useEffect(() => {
    if (modalVisible) {
      setTitleMessage('')
      setValues('')
    }
  }, [modalVisible])
  return (
    <Modal
      centered
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
      className={s.content_modal}
    >
      {Object.values([datas]).map((e: any) => (
        <Row key={e}>
          <Col span={10}>Donate to</Col>
          <Col className={s.information}>
            <div className={s.avt_member}>avt</div>
            <p>{e.name}</p>
          </Col>
        </Row>
      ))}
      <div>
        <Row className={`${s.amount} ${s.input}`}>
          <Col>Amount</Col>
          <Col span={13}>
            <Input
              style={titleMessage !== '' ? { borderColor: "#cb3636" } : {}}
              onBlur={handleBlur}
              value={values}
              onChange={handleChange}
              placeholder="Amount"
            />
          </Col>
        </Row>

        {/* Message Error */}
        <Row>
          <Col span={11}></Col>
          <Col span={13} className={s.message_error}>
            {titleMessage}
          </Col>
        </Row>

        <Row className={`${s.message} ${s.input}`}>
          <Col>Message</Col>
          <Col span={13}>
            <TextArea
              showCount
              maxLength={100}
              placeholder="Enter Message"
              className={s.editable}
            />
          </Col>
        </Row>
        <Row className={s.btn}>
          <Col>
            <Button type="primary">Donate</Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
