import { Form, Input, message, Modal, Image, Spin, Button, Row, Col, Tooltip } from "antd";
import { AuthLMSSGameUser } from "components/Auth/AuthGameStore";
import ButtonWrapper from "components/common/button/Button";
import KYCLmssService from "components/service/p2e/KYCLmssService";
import moment from "moment";
import React from "react";
import { handleGraphqlErrors } from "utils/apollo_client";
import CountdownTimeBefore from "../raffles/timeBefore";
import s from "./P2EOverview.module.sass";

interface IProps {
  onCancel: () => void;
  onConnectLOL: (lmssUser: AuthLMSSGameUser) => void;
}

export const ConnectLOLPopup = (props: IProps) => {
  const refInput = React.useRef<HTMLInputElement>()
  const [summonerName, setSummonerName] = React.useState<string>("");
  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [lmssUser, setLmssUser] = React.useState<{ avatar: string, nickName: string }>({ avatar: "", nickName: "" });
  const [hasFind, setHasFind] = React.useState(false);
  const [generateRoomNameLoading, setGenerateRoomNameLoading] = React.useState(false);
  const [kycLoading, setKycLoading] = React.useState(false);
  const [isCopy, setIsCopy] = React.useState(false);
  const [roomName, setRoomName] = React.useState<string>("");
  const [expireAt, setExpireAt] = React.useState(new Date().getTime() * 5 * 60 * 1000);
  const [expired, setExpired] = React.useState(false);


  React.useEffect(() => {
    const to = setTimeout(() => {
      setExpired(true);
    }, 5 * 60 * 1000);

    return () => clearTimeout(to);
  }, [expireAt])
  const onSearch = async () => {
    if (loadingSearch) {
      return;
    }
    if (!summonerName) {
      message.error("You can enter summoner name to continue!");
      return;
    }
    try {
      setHasFind(false);
      setLoadingSearch(true)
      const res = await KYCLmssService.searchBySummonerName(summonerName);
      setLmssUser({ avatar: res?.data?.searchBySummonerName?.avatar, nickName: res?.data?.searchBySummonerName?.nick_name })
      const roomNameResponse = await KYCLmssService.generateToken();
      setExpireAt(new Date().getTime() + 5 * 60 * 1000);
      setExpired(false);
      setRoomName(roomNameResponse.data?.generateToken);
      setLoadingSearch(false)
      setHasFind(true);
    } catch (e: any) {
      setLoadingSearch(false)
      setHasFind(false);
      handleGraphqlErrors(e, (code) => {
        switch (code) {
          case "BAD_REQUEST":
            message.error("Summoner name is not exist!")
            return;
          default:
            message.error("Something was wrong. Please contact to Lucis Network!")
        };
      })
    }


  }

  const generateNewRoomName = async () => {
    try {
      setGenerateRoomNameLoading(true);
      const roomNameResponse = await KYCLmssService.generateToken();
      setRoomName(roomNameResponse.data?.generateToken);
      setExpireAt(new Date().getTime() + 5 * 60 * 1000);
      setExpired(false);
      setGenerateRoomNameLoading(false);

    } catch (e: any) {
      setGenerateRoomNameLoading(false);

      handleGraphqlErrors(e, (code) => {
        switch (code) {
          default:
            message.error("Something was wrong. Please contact to Lucis Network!")
        };
      })
    }
  }

  const KYC = async () => {
    try {
      setKycLoading(true);
      const kycResponse = await KYCLmssService.kycAccount(summonerName);
      if (kycResponse.data.kycAccount) {
        const data: AuthLMSSGameUser = {
          lmss_id: "this is lmss id",
          lmss_access_token: "this is platform_id",
          lmss_id_token: "this is platform_id",
          lmss_platform_id: "this is platform_id",
          lmss_nick_name: lmssUser.nickName,
          lmss_avatar: lmssUser.avatar,
        }

        props.onConnectLOL(data);
      } else {
        message.error("Confirm failed, we can't find this room from your account. Please try again!");
      }
      setKycLoading(false);

    } catch (e: any) {
      setKycLoading(false);

      handleGraphqlErrors(e, (code) => {
        switch (code) {
          case "TOKEN_EXPIRED":
            message.error("Room name expired!");
            return;
          case "BAD_REQUEST":
            message.error("Room name is not generated.");
            return;
          default:
            message.error("Something was wrong. Please contact to Lucis Network!")
        };
      })
    }
  }

  const prefixAvatar = "https://lmssplus.com/static_image/img/profileicon/";
  return (
    <>
      <Modal
        title="Connect League of Legends account"
        visible={true}
        onCancel={() => props.onCancel()}
        wrapClassName="connect-lmss-modal"
        footer={[]}
        width={1000}
        maskClosable={false}
      >
        <div className={s.connectLmssModal}>
          <Row gutter={16}>
            <Col span={8}>
              <Form
                layout="vertical"
              >
                <Form.Item label={<span style={{ color: "#fff" }}>Your summoner Name:</span>}>
                  <Input
                    autoFocus
                    placeholder="Enter your summoner name ..."
                    onChange={(e) => { setSummonerName(e.currentTarget.value) }}
                    // onSearch={() => onSearch()}
                    suffix={<img onClick={() => onSearch()} style={{ cursor: "pointer" }} src="/assets/P2E/overview/search-icon.svg" />}
                    size="large"
                    onPressEnter={() => onSearch()}
                  />
                </Form.Item>
              </Form>
              <div>

              </div>
              <div className={s.platformUser}>
                {hasFind ?
                  <>
                    <Image src={lmssUser?.avatar ? `${prefixAvatar}${lmssUser?.avatar}` : "/assets/avatar.jpg"} preview={false} alt="" className={s.platformUserAvatar} />
                    <div className={s.platformUserName}>{lmssUser?.nickName}</div>
                  </>
                  : (loadingSearch ? <Spin /> : null)
                }
              </div>
              {hasFind &&
                <div style={{ marginTop: 20 }}>
                  <Row gutter={[0, 16]}>
                    <Col span={24}>
                      <Form
                        layout="vertical"
                      >
                        <Form.Item label={<span style={{ color: "#fff" }}>Room Name: {isCopy ? "Copied" : ""}</span>}>
                          <Input
                            value={roomName}
                            ref={refInput as any}
                            onClick={() => {
                              (refInput.current as any)?.focus({ cursor: "all" })
                              setIsCopy(true);
                              navigator.clipboard.writeText(roomName);
                            }}
                            onBlur={() => setIsCopy(false)}
                            addonAfter={<img width="20"
                              onClick={() => {
                                setIsCopy(true);
                                navigator.clipboard.writeText(roomName);
                              }}
                              style={{ cursor: "pointer" }}
                              src="/assets/P2E/overview/copy-icon.svg" />
                            }
                          />
                        </Form.Item>
                        {!expired ?
                          <p><span style={{ marginRight: 4 }}>Expire in:</span> {<CountdownTimeBefore targetDate={expireAt} />}</p>
                          : <p>Room name expired</p>
                        }
                      </Form>
                    </Col>
                    <Col span={24}>
                      <Row justify="space-between">
                        <Col span={12}>
                          <ButtonWrapper width={150} height={40} type="primary" onClick={() => generateNewRoomName()} loading={generateRoomNameLoading}>Refresh room name</ButtonWrapper>
                        </Col>
                        <Col span={12}>
                          <ButtonWrapper width={100} height={40} type="primary" onClick={() => KYC()} style={{ marginLeft: 20 }} >Confirm</ButtonWrapper>
                        </Col>
                      </Row>


                    </Col>
                    <Col span={24} style={{ textAlign: 'center', marginTop: 20 }}>
                      {kycLoading && <Spin tip="Wait to verify..." size="large" />}
                    </Col>


                  </Row>
                </div>}

            </Col>
            <Col span={16}>
              <div className={s.tutorial}>
                <h1>Connect LOL account step by step:</h1>
                <div className={s.step1}>
                  Step 1: Search your summoner name, the system will automatically generate the room name
                </div>
                <div className={s.step2}>
                  <div>Step 2: Open your game and create a custom room with the generated room name. The room name will expire within 5 minutes</div>
                  <img src="/assets/P2E/overview/tutorial.jpg" alt="" />
                  <img className={s.arrow} src="/assets/P2E/overview/arrow.svg" alt="" />
                  <img src="/assets/P2E/overview/tutorial-p2.jpg" alt="" />
                </div>
                <div className={s.step3}>
                  Step 3: After create room, click on [Confirm] button on this popup to verify your account
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}