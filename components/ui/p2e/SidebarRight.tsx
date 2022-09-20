import { Row, Col, Button, message } from "antd";
import s from "./p2e.module.sass";
import ButtonWrapper from "components/common/button/Button";
import React, { useEffect, useState } from "react";
import AuthStore from "../../Auth/AuthStore";
import { useRouter } from "next/router";
import PopupShareRefer from "./dashboard/popup/popupShare";
import { useQuery } from "@apollo/client";
import {
  CREATE_INVITE_LINK_DISCORD,
  HAS_JOINED_DISCORD,
} from "../../../hooks/p2e/useP2E";
import missionService from "../../service/p2e/MissionService";
import { KButton } from "../common/button";

interface IProps {
  lucisPoint?: string | number;
  lucisToken?: string | number;
  onlyWallet?: boolean;
}
const BONUS = 50;
const SidebarRight = React.memo(
  ({ lucisPoint, lucisToken, onlyWallet = false }: IProps) => {
    const route = useRouter();
    const [linkRef, setLinkRef] = useState("");
    const [isShowPopupShare, setIsShowPopupShare] = useState(false);
    const [isCheckJoinDiscord, setIsCheckJoinDiscord] = useState(false);
    const [linkInviteDiscord, setLinkInviteDiscord] = useState("");

    const getJoinDiscord = async () => {
      const res = await missionService.hasJoinDiscord();

      if (res.data?.hasJoinedDiscord) {
        setIsCheckJoinDiscord(true);
      } else {
        const resLinkDiscord = await missionService.createInviteLinkDiscord();
        setLinkInviteDiscord(resLinkDiscord?.data?.createInviteLinkDiscord);
      }
    };

    useEffect(() => {
      getJoinDiscord();
    }, []);
    useEffect(() => {
      let linkUrlRef = window.location.origin;
      if (AuthStore.code) {
        linkUrlRef = `${window.location.origin}/?ref=${AuthStore.code}&utm_source=playcore-dashboard&utm_medium=r-menu&utm_campaign=lucis-refer-friend`;
      }
      setLinkRef(linkUrlRef);
    }, [AuthStore?.code, linkRef]);

    const joinDiscord = () => {
      if (isCheckJoinDiscord) {
        message.warn("You had joined discord!", 10);
        return;
      } else {
        window.open(linkInviteDiscord);
      }
    };

    if (onlyWallet) {
      return (
        <Row>
          <Col lg={0} xs={24}>
            <div className={s.walletTitle}>
              <h2>Lucis Wallet</h2>
            </div>
            <div className={s.wallet}>
              <Row gutter={24}>
                <Col span={12}>
                  <div className={s.lucisPointWallet}>
                    Lucis Point
                    <img
                      src="/assets/P2E/lucis-point.svg"
                      alt=""
                      width="48"
                      height="48"
                    />
                    {lucisPoint ?? "--"}
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <div className={s.BUSDWallet}>
                      Lucis Token
                      <img
                        src="/assets/P2E/lucis-token.svg"
                        alt=""
                        width="48"
                        height="48"
                      />
                      --
                    </div>
                    <div className={s.busdClaim}>
                      {/* <ButtonWrapper type="primary" disabled>
                        Claim
                      </ButtonWrapper> */}
                      <KButton title="Claim" width="88px" disabled />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      );
    }
    return (
      <>
        <div className={s.sidebarRight}>
          <Row gutter={[0, 32]}>
            <Col xs={0} lg={24}>
              <div className={s.walletTitle}>
                <h2>Lucis Wallet</h2>
              </div>
              <div className={s.wallet}>
                <Row gutter={24}>
                  <Col span={12}>
                    <div className={s.lucisPointWallet}>
                      Lucis Point
                      <img
                        src="/assets/P2E/lucis-point.svg"
                        alt=""
                        width="48"
                        height="48"
                      />
                      {lucisPoint ?? "-"}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <div className={s.BUSDWallet}>
                        Lucis Token
                        <img
                          src="/assets/P2E/lucis-token.svg"
                          alt=""
                          width="48"
                          height="48"
                        />
                        --
                      </div>
                      <div className={s.busdClaim}>
                        {/* <ButtonWrapper type="primary" disabled>
                          Claim
                        </ButtonWrapper> */}
                        <KButton title="Claim" width="88px" disabled />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <div className={s.share}>
                <div>
                  <h2>Join our Discord</h2>
                </div>
                <div className={s.shareDiscordContent}>
                  <div className={s.shareDiscordText}>
                    <img
                      src="/assets/P2E/discord.svg"
                      alt=""
                      width="36"
                      height="36"
                    />
                    <p style={{ flex: "1" }}>
                      Connect your Discord account and join our server!
                    </p>
                    {
                      isCheckJoinDiscord ? (
                        <img src="/assets/P2E/overview/check-icon.svg" alt="" />
                      ) : (
                        <KButton
                          title="Join"
                          width="58px"
                          onClick={joinDiscord}
                        />
                        // <ButtonWrapper width={59} onClick={joinDiscord}>
                        //   Join
                        // </ButtonWrapper>
                      )
                      // <ButtonWrapper width={59} onClick={joinDiscord}>Join</ButtonWrapper>
                    }
                  </div>
                  <div className={s.shareBonus}>
                    <p>Join bonus:</p>
                    <div className={s.rewardItem}>
                      <span className={s.lucisPoint}>+{BONUS}</span>
                      <img src="/assets/P2E/lucis-point.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className={s.share} style={{ marginBottom: 48 }}>
                <div>
                  <h2>Refer a friend</h2>
                </div>
                <div className={s.shareDiscordContent}>
                  <div className={s.shareDiscordText}>
                    <img
                      src="/assets/P2E/friend.svg"
                      alt=""
                      width="36"
                      height="36"
                    />
                    <p>{linkRef}</p>
                    <img
                      src="/assets/P2E/link-share.svg"
                      style={{ cursor: "pointer" }}
                      alt=""
                      onClick={() => setIsShowPopupShare(true)}
                    />
                  </div>
                  <div className={s.shareBonus}>
                    <p>Join bonus:</p>
                    <div className={s.rewardItem}>
                      <span className={s.lucisPoint}>+{BONUS}</span>
                      <img src="/assets/P2E/lucis-point.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {isShowPopupShare && (
            <PopupShareRefer
              status={isShowPopupShare}
              closeModal={() => setIsShowPopupShare(false)}
              linkRef={linkRef}
            />
          )}
        </div>
      </>
    );
  }
);
SidebarRight.displayName = "SidebarRight";
export default SidebarRight;
