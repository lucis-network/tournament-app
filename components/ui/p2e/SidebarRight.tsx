import { Row, Col } from "antd";
import s from "./p2e.module.sass";
import ButtonWrapper from "components/common/button/Button";
import React from "react";
import { Balance } from "src/generated/graphql_p2e";


interface IProps {
  balance?: Balance;
  onlyWallet?: boolean;

}
const SidebarRight = ({ balance, onlyWallet = false }: IProps) => {
  return (
    <>
      {onlyWallet ?
        <Row>
          <Col lg={0} xs={24}>
            <div className={s.walletTitle}>
              <h2>
                Lucis Wallet
              </h2>
            </div>
            <div className={s.wallet}>
              <Row gutter={24}>
                <Col span={12}>
                  <div className={s.lucisPointWallet}>
                    Lucis Point
                    <img src="/assets/P2E/lucis-point.svg" alt="" width="48" height="48" />
                    {balance?.lucis_point}
                  </div>
                </Col>
                <Col span={12}>
                  <div >
                    <div className={s.BUSDWallet}>
                      Lucis Token
                      <img src="/assets/P2E/lucis-token.svg" alt="" width="48" height="48" />
                      --
                    </div>
                    <div className={s.busdClaim}>
                      <ButtonWrapper type="primary" disabled>Claim</ButtonWrapper>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        :
        <div className={s.sidebarRight}>
          <Row gutter={[0, 32]}>
            <Col xs={0} lg={24}>
              <div className={s.walletTitle}>
                <h2>
                  Lucis Wallet
                </h2>
              </div>
              <div className={s.wallet}>
                <Row gutter={24}>
                  <Col span={12}>
                    <div className={s.lucisPointWallet}>
                      Lucis Point
                      <img src="/assets/P2E/lucis-point.svg" alt="" width="48" height="48" />
                      {balance?.lucis_point ?? "-"}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div >
                      <div className={s.BUSDWallet}>
                        Lucis Token
                        <img src="/assets/P2E/lucis-token.svg" alt="" width="48" height="48" />
                        --
                      </div>
                      <div className={s.busdClaim}>
                        <ButtonWrapper type="primary" disabled>Claim</ButtonWrapper>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <div className={s.share}>
                <div>
                  <h2>
                    Join our Discord
                  </h2>
                </div>
                <div className={s.shareDiscordContent}>
                  <div className={s.shareDiscordText}>
                    <img src="/assets/P2E/discord.svg" alt="" width="36" height="36" />
                    <p>Connect your Discord account and join our server!</p>
                    <ButtonWrapper width={59} onClick={() => window.open("https://discord.gg/Y3E4x4U38k")}>Join</ButtonWrapper>
                  </div>
                  <div className={s.shareBonus}>
                    <p>Join bonus:</p>
                    <div className={s.rewardItem}>
                      <span className={s.lucisPoint}>+50</span>
                      <img src="/assets/P2E/lucis-point.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className={s.share} style={{ marginBottom: 48 }}>
                <div>
                  <h2>
                    Refer a friend
                  </h2>
                </div>
                <div className={s.shareDiscordContent}>
                  <div className={s.shareDiscordText}>
                    <img src="/assets/P2E/friend.svg" alt="" width="36" height="36" />
                    <p style={{ display: "flex", alignItems: "center" }}>https://lucis.network</p>
                    <img src="/assets/P2E/link.png" alt="" />
                  </div>
                  <div className={s.shareBonus}>
                    <p>Join bonus:</p>
                    <div className={s.rewardItem}>
                      <span className={s.lucisPoint}>+50</span>
                      <img src="/assets/P2E/lucis-point.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      }
    </>
  );
}

export default SidebarRight;