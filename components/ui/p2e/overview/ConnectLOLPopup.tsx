import { Form, Input, message, Modal, Image, Spin, Button, Row, Col, Tooltip } from "antd";
import { AuthLMSSGameUser } from "components/Auth/AuthGameStore";
import ButtonWrapper from "components/common/button/Button";
import KYCLmssService from "components/service/p2e/KYCLmssService";
import Link from "next/link";
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
  const [inputEmpty, setInputEmpty] = React.useState(false);
  const [hasSummonerName, setHasSummonerName] = React.useState(false);
  const [connectedUser, setConnectedUser] = React.useState<string | null>(null);
  const [connectedUserDisPlayName, setConnectedUserDisPlayName] = React.useState<string | null>(null);

  React.useEffect(() => {
    const to = setTimeout(() => {
      setExpired(true);
    }, 5 * 60 * 1000);

    return () => clearTimeout(to);
  }, [expireAt])

  React.useEffect(() => {
    const to = setTimeout(() => {
      setIsCopy(false);
    }, 3000);

    return () => clearTimeout(to);
  }, [isCopy])
  const onSearch = async () => {
    if (loadingSearch) {
      return;
    }
    if (!summonerName) {
      setInputEmpty(true);
      return;
    }
    try {
      setConnectedUser(null);
      setHasFind(false);
      setLoadingSearch(true)
      const res = await KYCLmssService.searchBySummonerName(summonerName);
      setLmssUser({ avatar: res?.data?.searchBySummonerName?.avatar, nickName: res?.data?.searchBySummonerName?.nick_name })
      if (!res?.data?.searchBySummonerName?.connected_user_name) {
        const roomNameResponse = await KYCLmssService.generateToken();
        setExpireAt(new Date().getTime() + 5 * 60 * 1000);
        setRoomName(roomNameResponse.data?.generateToken);
      }
      setExpired(false);
      setLoadingSearch(false)
      setHasFind(true);
      setConnectedUser(res?.data?.searchBySummonerName?.connected_user_name);
      setConnectedUserDisPlayName(res?.data?.searchBySummonerName?.connected_display_name);
    } catch (e: any) {
      setLoadingSearch(false)
      setHasFind(false);
      handleGraphqlErrors(e, (code) => {
        switch (code) {
          case "LMSS_ERROR":
            message.error("Connection failed. Please try again after 1 minute.");
            return;
          case "LMSS_ERROR_SEARCH":
            setHasSummonerName(true);
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
          case "LMSS_ERROR":
            message.error("Connection failed. Please try again after 1 minute.");
            return;
          default:
            message.error("Something was wrong. Please contact to Lucis Network!")
        };
      })
    }
  }

  const KYC = async () => {
    try {
      setKycLoading(true);
      const res = await KYCLmssService.kycAccount(lmssUser.nickName.trim());
      const kycData = res?.data?.kycAccount;
      if (kycData) {
        const data: AuthLMSSGameUser = {
          lmss_id: kycData?.player_uid,
          lmss_access_token: "this is lmss_access_token",
          lmss_id_token: "this is lmss_id_token",
          lmss_platform_id: kycData.platform_id as unknown as string,
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
          case "NOT_FIND_ROOM":
            message.error("We can not find the room. Please ensure that the room has been created.");
            return;
          case "SERVER_ERROR":
            message.error("Server maintenance!");
            return;
          case "LMSS_ERROR":
            message.error("Connection failed. Please try again after 1 minute.");
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
            <Col md={6} lg={8} xs={24}>
              <Form
                layout="vertical"
              >
                <Form.Item label={<span style={{ color: "#fff" }}>1. Your Summoner Name:</span>}>
                  <Input
                    autoFocus
                    placeholder="Enter your summoner name ..."
                    onChange={(e) => { setSummonerName(e.currentTarget.value); setInputEmpty(false); setHasSummonerName(false); }}
                    // onSearch={() => onSearch()}
                    suffix={<img onClick={() => onSearch()} style={{ cursor: "pointer" }} src="/assets/P2E/overview/search-icon.svg" />}
                    size="large"
                    onPressEnter={() => onSearch()}
                  />
                  <div style={{ marginTop: 4 }}>
                    {inputEmpty && <span style={{ color: "#ff4d4f" }}>Summoner name must not be empty!</span>}
                    {hasSummonerName && <span style={{ color: "#ff4d4f" }}>Summoner name is not exist!</span>}
                  </div>
                </Form.Item>
              </Form>
              <div>

              </div>
              <div className={s.platformUser}>
                {hasFind ?
                  <>
                    <Image src={lmssUser?.avatar ? `${prefixAvatar}${lmssUser?.avatar}` : "/assets/avatar.jpg"} preview={false} alt="" className={s.platformUserAvatar} />
                    <div className={s.platformUserName}>{lmssUser?.nickName}</div>
                    {connectedUser &&
                      <div
                        className={s.platformUserName}
                        style={{ textAlign: 'center' }}>
                        This LOL account has been connected to <Link href={`/profile/${connectedUser}`}><span style={{ color: "#00F9FF", cursor: 'pointer' }}>{connectedUserDisPlayName}</span></Link>. Please connect to another account
                      </div>}
                  </>
                  : (loadingSearch ? <Spin /> : null)
                }
              </div>
              {hasFind && !connectedUser &&
                <div style={{ marginTop: 20 }} className={s.verify}>
                  <Row gutter={[0, 16]}>
                    <Col span={24}>
                      <Form
                        layout="vertical"

                      >
                        <Form.Item label={<span style={{ color: "#fff" }}>2. Room Name:</span>}>
                          <Input
                            value={roomName}
                            ref={refInput as any}
                            onClick={() => {
                              (refInput.current as any)?.focus({ cursor: "all" })
                              setIsCopy(true);
                              navigator.clipboard.writeText(roomName);
                            }}
                            addonAfter={<img width="20"
                              onClick={() => {
                                setIsCopy(true);
                                navigator.clipboard.writeText(roomName);
                              }}
                              style={{ cursor: "pointer" }}
                              src={isCopy ? "/assets/P2E/overview/copied.svg" : "/assets/P2E/overview/copy-icon.svg"} />
                            }
                          />
                          <div className={s.subItem}>
                            <span className={s.refresh} onClick={() => generateNewRoomName()}>Refresh {generateRoomNameLoading && <Spin size="small" />}</span>
                            {!expired ?
                              <p><span style={{ marginRight: 4 }}>Expire in:</span> {<CountdownTimeBefore targetDate={expireAt} />}</p>
                              : <p>Room name expired</p>
                            }
                          </div>
                        </Form.Item>

                      </Form>
                    </Col>
                    <Col span={24}>
                      <div style={{ fontSize: 14 }}>3. Verify your account</div>
                      <button onClick={() => KYC()} className={s.actionButton} style={{ marginTop: 8 }}>
                        <span>I created the room!</span>
                      </button>
                    </Col>
                    <Col span={24} style={{ textAlign: 'center', marginTop: 20 }}>
                      {kycLoading && <Spin tip="Wait to verify..." size="large" />}
                    </Col>


                  </Row>
                </div>}

            </Col>
            <Col md={18} lg={16} xs={24}>
              <div className={s.tutorial}>
                <h1>Connect LOL account step by step:</h1>
                <div className={s.step1}>
                  Step 1: Enter your summoner name in the search box
                </div>
                <div className={s.step2}>
                  {roomName ?
                    <div style={{ marginBottom: 8 }}>Step 2: Open your LOL game and create a custom room with the name <span style={{ color: "#00F9FF" }}>{roomName}</span><br />The room name will expire within 5 minutes</div>
                    :
                    <div style={{ marginBottom: 8 }}>Step 2: Open your LOL game and create a custom room with the generated room name<br />The room name will expire within 5 minutes</div>
                  }
                  <div className={s.step2Image}>
                    <img src="/assets/P2E/overview/tutorial-step1.png" alt="" />
                    <img className={s.arrow} src="/assets/P2E/overview/arrow.svg" alt="" />
                    <img src="/assets/P2E/overview/tutorial-step2.png" alt="" />
                  </div>

                </div>
                <div className={s.step3}>
                  Step 3: After creating room, click on [I created the room!] button on this popup to verify your account
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}