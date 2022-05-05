import { Modal, Button, Row, Col } from "antd";
import { useEffect, useState, useRef } from "react";
import s from "./Button.module.sass";

import { AppEmitter } from "services/emitter";
import PopupDonate from "components/ui/tournament/detail/popup/popupDonate";

type Props = {
  nameTeam?: any;
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
  const getDataMember = nameTeam?.team_members
  const quantityMember = getDataMember?.length

  return (
    <div className={s.container_button_donate}>
      <Modal
        centered
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        className={s.content_modal}
      >
        {
          <div>
            <Row className={s.top}>
              <Col span={4} className={s.avt}>
                <img
                  className={s.avt}
                  src={`${
                    nameTeam?.avatar || "/assets/MyProfile/defaultAvatar.png"
                  }`}
                  alt=""
                />
              </Col>
              <Col span={10} className={s.name_team}>
                <p>{nameTeam?.name}</p>
                <span>{quantityMember}</span>
              </Col>
              <Col span={10}>
                <Button
                  type="primary"
                  onClick={() => {
                    handlButtonTeam(nameTeam);
                  }}
                >
                  Donate for team
                </Button>
              </Col>
            </Row>

            <div className={s.Member}>
              <h1>Member</h1>
              {nameTeam?.team_members?.map((item: any) => (
                <Row key={item?.uid} className={s.container}>
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
              <PopupDonate onClick={click} status={isPopUp} datas={newData} />
            </div>
          </div>
        }

        {/* {nameTeam.name}

        {nameTeam?.team_members.map((item: any) => {
          console.log(item);
        })} */}
      </Modal>
    </div>
  );
}
