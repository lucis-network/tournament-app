import { Button, Col, Input, message, Modal, Row, Spin } from "antd";
import TournamentService from "components/service/tournament/TournamentService";
import { memo, useEffect, useRef, useState } from "react";
import PopupNotify from "../popupNotify";
import s from "./PopupDonate.module.sass";
import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData,
} from "components/Auth/ConnectWalletStore";
import EthersService from "../../../../../../services/blockchain/Ethers";
import AuthBoxStore from "components/Auth/components/AuthBoxStore";
import { useGetContract } from "hooks/tournament/useCreateTournament";
import BigNumber from "bignumber.js";
import { useTournamentDetail } from "hooks/tournament/useTournamentDetail";
import { isEmpty } from "lodash";

type Props = {
  datas?: any;
  status: boolean;
  closeModal: () => void;
  tournamentId?: string;
  types?: string;
  currency?: any;
  name?: string;
  thumbnail?: string;
  refetch?: any;
};

export type GDonateTransaction = {
  to: string;
  type: string;
  tournament_uid: string;
  amount: number;
  message: string;
  tx_hash: string;
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
    refetch,
  } = props;
  const { getContract } = useGetContract({});

  const { refetchDataDonation } = useTournamentDetail({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });
  const [titleMessage, setTitleMessage] = useState("");
  const [values, setValues] = useState("");
  const [desc, setDesc] = useState("");
  const [isPopupNotify, setIsPopupNotify] = useState(false);
  const [teamUid, setTeamUid] = useState("");
  const inputRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nameReceive, setNameReceive] = useState("");

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
    if (types == "PLAYER") setNameReceive(datas?.user?.profile?.display_name);
    if (types == "TEAM") {
      setNameReceive(datas?.team?.name);
      setTeamUid(datas?.uid);
    }
    if (types == "TOURNAMENT") setNameReceive(name as string);
    if (types == "REFEREE") setNameReceive(datas?.display_name);
  }, [datas]);

  useEffect(() => {
    if (status) {
      setTitleMessage("");
      setValues("");
      setDesc("");
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
  const donate = async () => {
    if (!checkValidation()) return;
    let dnt: GDonateTransaction = {
      to: "",
      type: types ? types : "",
      tournament_uid: tournamentId ? tournamentId : "",
      amount: Number.parseFloat(values),
      message: desc,
      tx_hash: "",
    };

    if (types == "PLAYER") dnt.to = datas?.user?.id;
    if (types == "TEAM") {
      //setTeamUid(datas?.uid);
      dnt.to = datas?.uid;

    }
    if (types == "TOURNAMENT") dnt.to = tournamentId ? tournamentId : "";
    if (types == "REFEREE") {
      dnt.to = datas.user_id;
    }

    const txHash = await donationContract();

    setIsLoading(false);

    if (txHash) {
      dnt.tx_hash = txHash;
      let tournamentService = new TournamentService();
      const response = tournamentService.donateService(dnt).then((res) => {
        if (res) {
          setIsPopupNotify(true);
          refetch();
          refetchDataDonation();
        }
      });
    }
  };

  const donationContract = async () => {
    if (!ConnectWalletStore.address) {
      AuthBoxStore.connectModalVisible = true;
    } else {
      let result = await donation();
      if (!result?.error) {
        return result?.txHash;
      } else {
        //@ts-ignore
        message.error(result?.error?.data?.message);
      }
    }
  };

  const donation = async () => {
    setIsLoading(true);
    let token_address = currency?.address;

    if (ConnectWalletStore_NonReactiveData.web3Provider) {
      const ethersService = new EthersService(
        ConnectWalletStore_NonReactiveData.web3Provider
      );

      const contractAddress = getContract.filter(
        (item: any) => item.type === "DONATE"
      );

      const getMyAllowance = await ethersService.getMyAllowanceOf(
        contractAddress[0]?.address,
        token_address
      );

      let bool = false;

      const amount = new BigNumber(Number(values))
        .multipliedBy(Math.pow(10, 18))
        .toFormat({ groupSeparator: "" });

      if (getMyAllowance && getMyAllowance < Number(amount)) {
        bool = await ethersService.requestApproval(
          contractAddress[0]?.address,
          token_address
        );
      } else {
        bool = true;
      }

      if (bool) {
        const response = await ethersService.donate(
          tournamentId as string,
          datas?.user?.id,
          teamUid,
          datas?.user_id,
          Number(values),
          token_address,
          contractAddress[0]?.address,
          types
        );
        return response;
      }
    }
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
          <Col xs={{ span: 24 }} md={{ span: 7 }}>
            Donate to
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 17 }} className={s.information}>
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
                            e?.team?.avatar ||
                            "/assets/MyProfile/defaultAvatar.png"
                          }`}
                          alt=""
                        />
                      </div>
                      <p>{e?.team?.name}</p>
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
                case "REFEREE":
                  return (
                    <>
                      <div className={s.avt_member}>
                        <img
                          className={s.avt}
                          src={`${
                            e.avatar || "/assets/MyProfile/defaultAvatar.png"
                          }`}
                          alt=""
                        />
                      </div>
                      <p>{e.display_name}</p>
                    </>
                  );
                case "TOPPLAYER":
                  return (
                    <>
                      <div className={s.avt_member}>
                        <img
                          className={s.avt}
                          src={`${e.avatar || "/assets/home/avt_null.jpg"}`}
                          alt=""
                        />
                      </div>
                      <p>{e?.display_name || "_ _"}</p>
                    </>
                  );
                default:
                  return null;
              }
            })()}
          </Col>
        </Row>
      ))}
      <Row className={`${s.amount} ${s.input}`}>
        <Col xs={{ span: 24 }} md={{ span: 7 }} style={{ fontSize: 16 }}>
          Amount
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 17 }}>
          <Row align={"middle"}>
            <Col span={18}>
              <Input
                style={titleMessage !== "" ? { borderColor: "#cb3636" } : {}}
                onBlur={handleBlur}
                value={values}
                onChange={handleChange}
                ref={inputRef}
                placeholder="Enter amount"
              />
            </Col>
            <Col span={6} className="pl-2">
              {currency?.symbol}
            </Col>
          </Row>
          {/* Message Error */}
          <div className={s.message_error}>{titleMessage}</div>
        </Col>
      </Row>
      <Row className={`${s.message} ${s.input}`}>
        <Col xs={{ span: 24 }} md={{ span: 7 }} style={{ fontSize: 16 }}>
          Message
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 17 }}>
          <TextArea
            placeholder="Enter message"
            className={s.editable}
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            maxLength={125}
          />
        </Col>
      </Row>
      <Row className={s.btn}>
        <Col>
          <Spin spinning={isLoading}>
            <Button type="primary" onClick={donate}>
              Donate
            </Button>
          </Spin>
        </Col>
      </Row>
      {/* ===== Modal ===== */}
      <PopupNotify
        closeModalNotify={() => closeModalNotify()}
        status={isPopupNotify}
        currency={currency}
        values={values}
        name={nameReceive}
        desc={desc}
      />
    </Modal>
  );
};

export default memo(PopupDonate);
