import { Modal, Button, Row, Col } from "antd";
import { useEffect, useState, useRef } from "react";
import s from "./Button.module.sass";

import { AppEmitter } from "services/emitter";
import PopupDonate from "components/ui/tournament/detail/popup/popupDonate";
import { StarFilled } from "@ant-design/icons";

type Props = {
  nameTeam?: any;
  tournamentId: string;
  currency?: any;
  refetch: any;
  isCheck?: boolean;
};
export default function ModalDonateTeam(props: Props) {
  const { nameTeam, tournamentId, currency, refetch, isCheck } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [newData, setNewData] = useState({});
  const [types, setTypes] = useState("");

  const handlButtonMember = (datas: any) => {
    setIsPopUp(true);
    setNewData(datas);
    setTypes("PLAYER");
  };

  const handlButtonTeam = (datas: any) => {
    setIsPopUp(true);
    setNewData(datas);
    setTypes("TEAM");
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
  const getDataMember = nameTeam?.team_members;
  const quantityMember = getDataMember?.length;

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
                    nameTeam?.team?.avatar ||
                    "/assets/MyProfile/defaultAvatar.png"
                  }`}
                  alt=""
                />
              </Col>
              <Col span={10} className={s.name_team}>
                <p>{nameTeam?.team?.name}</p>
                <span>{quantityMember}</span>
              </Col>
              <Col span={10}>
                {isCheck && (
                  <Button
                    type="primary"
                    onClick={() => {
                      handlButtonTeam(nameTeam);
                    }}
                  >
                    Donate for team
                  </Button>
                )}
              </Col>
            </Row>

            <div className={s.Member}>
              <h1>Member</h1>

              {nameTeam?.playTeamMembers
                ? nameTeam?.playTeamMembers?.map((item: any) => (
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
                          <a
                            style={{ color: "white" }}
                            href={`/profile/${item.user?.profile?.user_name}`}
                            target="_blank"
                            rel="snoreferrer"
                          >
                            {item.user?.profile?.display_name}
                          </a>
                        </div>
                        {item.is_leader && (
                          <div className={s.leader}><StarFilled className="text-18px"/></div>
                        )}
                      </Col>
                      <Col>
                        {isCheck && (
                          <Button
                            type="primary"
                            onClick={() => {
                              handlButtonMember(item);
                            }}
                          >
                            Donate
                          </Button>
                        )}
                      </Col>
                    </Row>
                  ))
                : ""}
              <PopupDonate
                closeModal={click}
                status={isPopUp}
                datas={newData}
                tournamentId={tournamentId}
                types={types}
                currency={currency}
                refetch={refetch}
              />
            </div>
          </div>
        }
      </Modal>
    </div>
  );
}
