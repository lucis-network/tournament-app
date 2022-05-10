import { Button, Col, Input, Modal, Row } from "antd";
import TournamentService from "components/service/tournament/TournamentService";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import PopupNotify from "../popupNotify";
import s from "./PopupDonate.module.sass";

type Props = {
  datas?: any;
  status: boolean;
  closeModal: () => void;
  tournamentId?: string;
  types?: string;
  currency?: any;
  name?: string;
  thumbnail?: string;
};

export type GDonateTransaction = {
  to: string;
  type: string;
  tournamnent_uid: string;
  amount: number;
};

const { TextArea } = Input;

const PopupDonate = (props: Props) => {
  const {
    datas,
    status,
    closeModal,
    tournamentId,
    types,
    currency,
    name,
    thumbnail,
  } = props;
  const [titleMessage, setTitleMessage] = useState("");
  const [values, setValues] = useState("");
  const [isPopupNotify, setIsPopupNotify] = useState(false);
  const inputRef = useRef<any>(null);

  const handleBlur = () => {
    if (values === "") {
      setTitleMessage("Amount must be not empty");
    }
  };
  const handleChange = (e: any) => {
    const value = e.target.value;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      setValues(value);
      if (value <= 0) {
        setTitleMessage(" Amount must be greater than 0");
      } else if (value !== "") {
        setTitleMessage("");
      }
    }
  };

  useEffect(() => {
    if (status) {
      setTitleMessage("");
      setValues("");
    }
  }, [status]);

  const checkValidation = (): boolean => {
    if (!values) {
      setTitleMessage("Amount must be not empty");
      inputRef.current!.focus();
      return false;
    }
    if (Number.parseFloat(values) < 0) {
      setTitleMessage("Amount must be > 0");
      inputRef.current!.focus();
      return false;
    }
    return true;
  };
  const donate = () => {
    if (!checkValidation()) return;
    let dnt: GDonateTransaction = {
      to: "",
      type: types ? types : "",
      tournamnent_uid: tournamentId ? tournamentId : "",
      amount: Number.parseFloat(values),
    };

    if (types == "PLAYER") dnt.to = datas?.user?.id;
    if (types == "TEAM") dnt.to = datas?.uid;
    if (types == "TOURNAMENT") dnt.to = tournamentId ? tournamentId : "";
    let tournamentService = new TournamentService();
    const response = tournamentService.donateService(dnt).then((res) => {
      if (res) {
        setIsPopupNotify(true);
      }
    });
  };

  const closeModalNotify = () => {
    setIsPopupNotify(false);
    //closeModal();
  };
  return (
    <Modal
      centered
      visible={status}
      onOk={closeModal}
      onCancel={closeModal}
      cancelButtonProps={{ style: { display: "none" } }}
      className={s.content_modal}
    >
      {Object.values([datas]).map((e: any, index: number) => (
        <Row key={index}>
          <Col span={10}>Donate to</Col>
          <Col className={s.information}>
            {(() => {
              switch (types) {
                case "PLAYER":
                  return (
                    <>
                      <div className={s.avt_member}>
                        <img
                          className={s.avt}
                          src={`${
                            e?.user?.profile?.avatar ||
                            "/assets/MyProfile/defaultAvatar.png"
                          }`}
                          alt=""
                        />
                      </div>
                      <p>{e?.user?.profile?.display_name}</p>
                    </>
                  );
                case "TEAM":
                  return (
                    <>
                      <div className={s.avt_member}>
                        <img
                          className={s.avt}
                          src={`${
                            e?.avatar || "/assets/MyProfile/defaultAvatar.png"
                          }`}
                          alt=""
                        />
                      </div>
                      <p>{e?.name}</p>
                    </>
                  );
                case "TOURNAMENT":
                  return (
                    <>
                      <div className={s.avt_member}>
                        <img
                          className={s.avt}
                          src={`${
                            thumbnail || "/assets/MyProfile/defaultAvatar.png"
                          }`}
                          alt=""
                        />
                      </div>
                      <p>{name}</p>
                    </>
                  );
                default:
                  return null;
              }
            })()}
          </Col>
        </Row>
      ))}
      <div>
        <Row className={`${s.amount} ${s.input}`}>
          <Col span={9}>Amount</Col>
          <Col span={10}>
            <Input
              style={titleMessage !== "" ? { borderColor: "#cb3636" } : {}}
              onBlur={handleBlur}
              value={values}
              onChange={handleChange}
              ref={inputRef}
              placeholder="Enter amount"
            />
          </Col>
          <Col span={1}></Col>
          <Col span={4}>{currency?.symbol}</Col>
        </Row>

        {/* Message Error */}
        <Row>
          <Col span={9}></Col>
          <Col span={15} className={s.message_error}>
            {titleMessage}
          </Col>
        </Row>

        <Row className={`${s.message} ${s.input}`}>
          <Col span={9}>Message</Col>
          <Col span={15}>
            <TextArea
              showCount
              maxLength={125}
              placeholder="Enter message"
              className={s.editable}
            />
          </Col>
        </Row>

        <Row className={s.btn}>
          <Col>
            <Button type="primary" onClick={donate}>
              Donate
            </Button>
          </Col>
        </Row>
      </div>

      {/* ===== Modal ===== */}
      <PopupNotify
        closeModalNotify={() => closeModalNotify()}
        status={isPopupNotify}
        currency={currency}
        values={values}
      />
    </Modal>
  );
};

export default memo(PopupDonate);
