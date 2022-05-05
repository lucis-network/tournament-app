import { Modal, Button, Row, Col } from "antd";
import { useEffect, useState, useRef } from "react";
import s from "./Button.module.sass";

import { AppEmitter } from "services/emitter";
import PopupDonate from "components/ui/tournament/detail/popup/popupDonate";

type Props = {
  nameTeam?: object;
};
export default function ModalDonateTeam(props: Props) {
  const { nameTeam } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [newData, setNewData] = useState({});

  const handlButtonMember = (datas: any) => {
    setIsPopUp(true);
    setNewData(datas.user?.profile);
  };
  const handlButtonTeam = (datas: any) => {
    setIsPopUp(true);
    setNewData(datas);
  };
  const click = () => {
    setIsPopUp(false);
  };

  useEffect(() => {
    const subscription = AppEmitter.addListener(
      "showPopupDonate",
      (visible: boolean) => {
        if (visible) {
          setModalVisible(true);
        }
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <div className={s.container_button_donate}>
      <Modal
        centered
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        className={s.content_modal}
      >
        {Object.values([nameTeam]).map((e: any) => (
          <div key={e}>
            <Row className={s.top}>
              <Col span={4} className={s.avt}>
                <img
                  className={s.avt}
                  src={`${e.avatar || "/assets/MyProfile/defaultAvatar.png"}`}
                  alt=""
                />
              </Col>
              <Col span={10} className={s.name_team}>
                <p>{e.name}</p>
                <span>3</span>
              </Col>
              <Col span={10}>
                <Button
                  type="primary"
                  onClick={() => {
                    handlButtonTeam(e);
                  }}
                >
                  Donate for team
                </Button>
              </Col>
            </Row>

            <div className={s.Member}>
              <h1>Member</h1>
              {e.team_members?.map((item: any) => (
                <Row key={item.id} className={s.container}>
                  <Col span={18} className={s.item_member}>
                    <div className={s.avt_member}>
                      <img
                        className={s.avt}
                        src={`${
                          item.user?.profile?.avatar ??
                          "/assets/MyProfile/defaultAvatar.png"
                        }`}
                        alt=""
                      />
                    </div>
                    <div className={s.name_member}>
                      {item.user?.profile?.display_name}
                    </div>
                    {item.is_leader && (
                      <div className={s.rank_member}>rank</div>
                    )}
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => {
                        handlButtonMember(item);
                      }}
                    >
                      Donate
                    </Button>
                  </Col>
                </Row>
              ))}
              <PopupDonate
                closeModal={click}
                status={isPopUp}
                datas={newData}
              />
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
}
