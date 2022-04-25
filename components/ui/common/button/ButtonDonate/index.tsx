import { Modal, Button, Row, Col } from "antd";
import { useCallback, useState } from "react";
import s from "./Button.module.sass";
import PopupDonate from "../../Popup/PopupDonate/index";
import { AppEmitter } from "services/emitter";

type Props = {
  nameTeam?: object;
};
export default function ButtonDonate(props: Props) {
  const { nameTeam } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [dataMember, setDataMember] = useState({});

  const handleClick = () => {
    setModalVisible(true);
  };
  const handlButton = useCallback((datas) => {
    AppEmitter.emit("setPopupDonate", true);
    setDataMember(datas)
  }, []);

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
        {Object.values([nameTeam]).map((e: any) => (
          <div key={e.key}>
            <Row className={s.top}>
              <Col span={4} className={s.avt}>
                avt
              </Col>
              <Col span={10} className={s.name_team}>
                <p>{e.name}</p>
                <span>3</span>
              </Col>
              <Col span={10}>
                <Button
                  type="primary"
                  onClick={() => {
                    handlButton(e);
                  }}
                >
                  Donate for team
                </Button>
              </Col>
            </Row>

            <div className={s.Member}>
              <h1>Member</h1>
              {e.member.map((item: any) => (
                <Row key={item.id} className={s.container}>
                  <Col span={18} className={s.item_member}>
                    <div className={s.avt_member}>avt</div>
                    <div className={s.name_member}>{item.name}</div>
                    {item.room_master && (
                      <div className={s.rank_member}>rank</div>
                    )}
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => {
                        handlButton(item);
                      }}
                    >
                      Donate
                    </Button>
                  </Col>
                </Row>
              ))}
            </div>
          </div>
        ))}
        <PopupDonate datas={dataMember} />
      </Modal>
    </div>
  );
}
