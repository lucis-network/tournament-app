import Link from "next/link";
import s from "./Header.module.sass";
import Image from "../common/images/Image";
import Logo from "assets/icon/logo.png";
import Login from "components/Auth/Login/Login";
import AuthStore from "components/Auth/AuthStore";
import User from "components/Auth/components/User";
import {observer} from "mobx-react-lite";
import {useWindowSize} from "hooks/useWindowSize";
import {Button, Col, Row} from "antd";
import SignupInfoModal from "../../Auth/Login/SignupInfoModal"
import {isEmpty} from "lodash";
import LoginBoxStore from "../../Auth/Login/LoginBoxStore";
import {useRouter} from "next/router";
import {MenuMobile} from "../common/Menu/MenuMobile";
import React, {useEffect} from "react";
import {getLocalAuthInfo} from "components/Auth/AuthLocal";
import AlertInAppModal from "../../Auth/Login/AlertInAppModal";
import {useQuery} from "@apollo/client";
import {GET_STATISTICS} from "../../../hooks/p2e/useP2E";
import ConnectWalletStore from "../../Auth/ConnectWalletStore";
import MissionService from "../../service/p2e/MissionService";

type Props = {
  handleMenuOpen: Function;
};

export default observer(function Header(props: Props) {
  const router = useRouter();
  const [width] = useWindowSize();
  const {profile} = AuthStore;
  const {address} = ConnectWalletStore;
  const [balance, setBalance] = React.useState<{lucis_point: number, lucis_token: number}>({lucis_point: 0, lucis_token: 0});
  const usernameCheck = async () => {
    const localUserInfo = getLocalAuthInfo();
    const isUsernameEmpty = (): boolean | null => (localUserInfo && isEmpty(localUserInfo?.profile?.user_name))
    LoginBoxStore.signupInfoModalVisible = false;
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (isUsernameEmpty()) {
      LoginBoxStore.signupInfoModalVisible = true;
    }
  }

  React.useEffect(() => {
    if (AuthStore.isLoggedIn) {
      MissionService.getStatisticBalance().then(res => {
        setBalance(res.data?.getBalance);
      });
    }
  }, [AuthStore.isLoggedIn])

  useEffect(() => {
    usernameCheck();
    router.events.on("routeChangeStart", usernameCheck);
    return () => {
      router.events.off("routeChangeStart", usernameCheck);
    };
  }, []);

  return (
    <>
      <div className={`${s.pcMenu} bg-nav`}>
        {width >= 1200 ? (
          <div className={`${s.menu_container}`}>
            <div className={s.logoSection}>
              <Link href="/" passHref>
                <a>
                  <img src="/assets/home/logo.png" className={s.logo} alt="logo"/>
                </a>
              </Link>
              {
                // @ts-ignore
                ("IS_TESTNET" == "true") && <p>Testnet</p>
              }
            </div>
            <Row
              justify="space-between"
              className="lucis-container-2 items-center px-0 relative z-10"
            >
              <Col span={18}>
                <ul className={s.block_item_menu}>
                  <li className={s.logoTab}>
                    <Link href="/">
                      <img src="/assets/home/logo.png" className={s.logo} alt="logo"/>
                    </Link>
                  </li>
                  <li><Link href="/">PLAYCORE</Link></li>
                  <li><Link href="/arena">ARENA</Link></li>
                  <li><a href="https://tournament-lucis.gitbook.io/lucis-tournament/" target="_blank"
                         rel="noopener noreferrer">RANKING</a></li>
                  <li><a href="https://insight.lucis.network/" target="_blank"
                         rel="noopener noreferrer">INSIGHT</a></li>
                  <li className={s.default}><a>SCHORLARSHIP</a><span>Coming Soon</span></li>
                  <li className={s.default}>SOCIAL <span>Coming Soon</span></li>
                </ul>
              </Col>
              <Col span={6}>
                <ul className="flex gap-4 justify-end items-center m-0">
                  <li>
                    {AuthStore.isLoggedIn ? (
                      <>
                        <div className={s.profileUser}>
                          <div className={s.address}>
                              <div title={address}>
                              {address}
                            </div>
                          </div>
                          <div className={s.profileInfo}>
                            <div className={s.profileName}>
                              {profile?.display_name}
                            </div>
                            <div className={s.profileBalance}>
                              <div className={s.rewardItem}>
                                <img src="/assets/P2E/lucis-point.svg" alt=""/>
                                <span
                                  className={s.lucisPoint}>{balance?.lucis_point ?? 0}</span>
                              </div>
                              <div className={s.rewardItem}>
                                <img src="/assets/P2E/lucis-token.svg" alt=""/>
                                <span
                                  style={{color: "#16DADF"}}>{balance?.lucis_token ?? 0}</span>
                              </div>
                            </div>
                          </div>
                          <User>
                            <div className={s.avatar}>
                              <img
                                src={profile?.avatar ? profile?.avatar : "/assets/avatar.jpg"}
                                alt=""
                              />
                            </div>
                          </User>

                        </div>
                      </>
                    ) : (
                      <Login/>
                    )}
                  </li>
                </ul>
              </Col>
            </Row>
            {/* <InfiniteList /> */}
          </div>
        ) : (
          <MenuMobile/>
        )}
      </div>
      {LoginBoxStore.signupInfoModalVisible && <SignupInfoModal/>}
      {LoginBoxStore.alertInAppModalVisible && <AlertInAppModal/>}
    </>
  );
});
