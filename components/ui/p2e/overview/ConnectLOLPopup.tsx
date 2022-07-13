import { Form, Input, message, Modal, Image, Spin, Button, Row, Col, Tooltip } from "antd";
import { AuthLMSSGameUser } from "components/Auth/AuthGameStore";
import KYCLmssService from "components/service/p2e/KYCLmssService";
import React from "react";
import { handleGraphqlErrors } from "utils/apollo_client";
import s from "./P2EOverview.module.sass";

interface IProps {
  onCancel: () => void;
  onConnectLOL: (lmssUser: AuthLMSSGameUser) => void;
}

export const ConnectLOLPopup = (props: IProps) => {
  const refInput = React.useRef<HTMLInputElement>()
  const [summonerName, setSummonerName] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [lmssUser, setLmssUser] = React.useState<{ avatar: string, nickName: string }>({ avatar: "", nickName: "" });
  const [hasFind, setHasFind] = React.useState(false);
  const [generateRoomNameLoading, setGenerateRoomNameLoading] = React.useState(false);
  const [kycLoading, setKycLoading] = React.useState(false);
  const [isCopy, setIsCopy] = React.useState(false);
  const [roomName, setRoomName] = React.useState<string>("");
  const [expireAt, setExpireAt] = React.useState(new Date().getTime() + 5 * 60 * 1000);

  const onSearch = async () => {
    if (!summonerName) {
      setStatus("error");
      message.error("You can enter summoner name to continue!");
    }
    try {
      setHasFind(false);
      setLoadingSearch(true)
      const res = await KYCLmssService.searchBySummonerName(summonerName);
      setLmssUser({ avatar: res?.data?.searchBySummonerName?.avatar, nickName: res?.data?.searchBySummonerName?.nick_name })
      const roomNameResponse = await KYCLmssService.generateToken();
      setExpireAt(new Date().getTime() + 5 * 60 * 1000);
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
        message.error("KYC failed!");
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
        title="Connect account League of Legends"
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
                <Form.Item label={<span style={{ color: "#fff" }}>Summoner Name:</span>}>
                  <Input.Search
                    autoFocus
                    placeholder="Enter summoner name ..."
                    onChange={(e) => { setSummonerName(e.currentTarget.value); setStatus("") }}
                    enterButton="Search"
                    status={status as any}
                    onSearch={() => onSearch()}
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
                        <Form.Item label={<span style={{ color: "#fff" }}>Room Name (Click to copy): {isCopy ? "Copied" : ""}</span>}>
                          <Input
                            value={roomName}
                            ref={refInput as any}
                            onClick={() => {
                              (refInput.current as any)?.focus({ cursor: "all" })
                              setIsCopy(true);
                              navigator.clipboard.writeText(roomName);
                            }}
                            onBlur={() => setIsCopy(false)}
                          />
                        </Form.Item>
                        <p>Expire at: {new Date(expireAt).toLocaleTimeString()}</p>
                      </Form>
                    </Col>
                    <Col span={24}>
                      <Button type="primary" onClick={() => generateNewRoomName()} loading={generateRoomNameLoading}>Refresh room name</Button>
                      <Button type="primary" onClick={() => KYC()} style={{ marginLeft: 20 }} >Created Room</Button>
                    </Col>
                    <Col span={24} style={{ textAlign: 'center', marginTop: 20 }}>
                      {kycLoading && <Spin tip="Wait to verify..." size="large" />}
                    </Col>


                  </Row>
                </div>}

            </Col>
            <Col span={16}>
              <div className={s.tutorial}>
                <h1>KYC tutorial:</h1>
                <div className={s.step1}>
                  Step 1: Search your summoner name
                </div>
                <div className={s.step2}>
                  Step 2: Create a custom room with the room name just created
                  <img src="/assets/P2E/overview/tutorial.png" alt="" />
                  <img className={s.arrow} src="/assets/P2E/overview/arrow.svg" alt="" />
                  <img src="/assets/P2E/overview/tutorial-p2.png" alt="" />
                </div>
                <div className={s.step3}>
                  Step 3: Click button created room to verify
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}