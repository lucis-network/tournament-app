import Link from "next/link";
import s from "./Header.module.sass";
import Image from "../common/images/Image";
import Logo from "assets/icon/logo.png";
import Login from "components/Auth/Login/Login";
import AuthStore from "components/Auth/AuthStore";
import User from "components/Auth/components/User";
import {observer} from "mobx-react-lite";
import {useWindowSize} from "hooks/useWindowSize";
import {Button, Col, notification, Row} from "antd";
import SignupInfoModal from "../../Auth/Login/SignupInfoModal"
import {isEmpty} from "lodash";
import LoginBoxStore from "../../Auth/Login/LoginBoxStore";
import {useRouter} from "next/router";
import {MenuMobile} from "../common/Menu/MenuMobile";
import React, {useEffect} from "react";
import {getLocalAuthInfo} from "components/Auth/AuthLocal";
import AlertInAppModal from "../../Auth/Login/AlertInAppModal";
import ConnectWalletStore from "../../Auth/ConnectWalletStore";
import MissionService from "../../service/p2e/MissionService";
import {currency, fomatNumber, format} from "../../../utils/Number";
import AuthBoxStore from "../../Auth/components/AuthBoxStore";
import {AppEmitter} from "../../../services/emitter";
import AnimatedNumber from "../common/AnimatedNumber/index";
import LoginModal from "../../Auth/Login/LoginModal";
import Notification from "../../Auth/components/notification";
import {RealtimeService} from "../../service/RealtimeService";

type Props = {
  handleMenuOpen: Function;
};

export default observer(function Header(props: Props) {
  const router = useRouter();
  const {profile, id} = AuthStore;
  const [width] = useWindowSize()
  const {address} = ConnectWalletStore;
  const [balance, setBalance] = React.useState<{ lucis_point: number, lucis_token: number }>({
    lucis_point: 0,
    lucis_token: 0
  });
  const usernameCheck = async () => {
    const localUserInfo = getLocalAuthInfo();
    const isUsernameEmpty = (): boolean | null => (localUserInfo && isEmpty(localUserInfo?.profile?.user_name))
    const isPasswordEmpty = AuthStore.isLoggedIn && !localUserInfo?.is_exist_pass
    LoginBoxStore.signupInfoModalVisible = false;
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (isUsernameEmpty() || isPasswordEmpty) {
      LoginBoxStore.signupInfoModalVisible = true;
    }
  }

  const showModal = () => {
    AuthBoxStore.connectModalVisible = true;
  };

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


  useEffect(() => {
    const listener = AppEmitter.addListener("updateBalance", (res: any) => {
      if (res?.data && res?.data?.balance) {
        setBalance(res?.data?.balance);
      } else {
        MissionService.getStatisticBalance().then(b => {
          setBalance(b.data?.getBalance);
        });
      }
    });
    return () => {
      listener.remove();
    };
  }, [])


  const animatedNumber = (value: any, decimal: number = 0) => {
    if (value) {
      return format(value, decimal);
    }
    // return (
    //   <AnimatedNumber
    //     component="text" value={value}
    //     style={{
    //       transition: '0.8s ease-out',
    //       transitionProperty:
    //         'background-color, color, opacity'
    //     }}
    //     stepPrecision={0}
    //     duration={300}
    //     formatValue={(n: number) => format(n, decimal)}
    //   />
    // )
  }

  const subscribe = (value: any) => {
    const data = value.data?.pushNotification.new_noti;
    const countNoti = value.data?.pushNotification.unseen_count;

    AppEmitter.emit("updateNotification", {data, countNotification: countNoti});
    notification.open({
      message: data.title,
      onClick: () => router.push(data.link),
      description: (
        <div className={s.notificationItemToast}>
          <img
            // className="w-[30px] h-[30px]"
            src={data?.image ?? ""}
            alt=""
          />
          <div>
            <p>{data?.content}</p>
          </div>
        </div>
      ),
      placement: "bottomRight",
    });
  };


  useEffect(() => {
    if (id) {
      const realTimeService = new RealtimeService(id);
      realTimeService.subscriptionArena().then(res => {
        res.subscribe({
          next(value) {
            subscribe(value);
          }
        })
      });

      realTimeService.subscriptionP2e().then(res => {
        res.subscribe({
          next(value) {
            subscribe(value);
          }
        })
      });
    }
  }, [id])

  return (
    <>
      <div className={`${s.pcMenu} bg-nav`}>
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
            <Col xs={14} xl={16}>
              <ul className={s.block_item_menu}>
                <li className={s.logoTab}>
                  <Link href="/">
                    <img src="/assets/home/logo.png" className={s.logo} alt="logo"/>
                  </Link>
                </li>
                <li className={`${router.pathname === "/" || router.pathname.includes("playcore") ? s.active : ""}`}>
                  <Link href="/" passHref>
                    <a>
                      PLAYCORE
                    </a>
                  </Link></li>
                <li className={`${router.pathname.includes("/arena") ? s.active : ""}`}><Link href="/arena">ARENA</Link></li>

                <li><a href="https://insight.lucis.network/" target="_blank"
                       rel="noopener noreferrer">INSIGHT</a></li>
                <li className={`${router.pathname.includes("/ranking") ? s.active : ""}`}><Link href="/ranking">RANKING</Link></li>
                {/*<li className={s.default}><a>SCHORLARSHIP <span>Coming Soon</span></a></li>*/}
                {/*<li className={s.default}><a>SOCIAL <span>Coming Soon</span></a></li>*/}
              </ul>
            </Col>
            <Col xs={10} xl={8}>
              {AuthStore.isLoggedIn ? (
                <>
                  <div className={s.profileUser}>
                    <div className={s.profileInfo}>
                      <div className={s.profileName}>
                        <div className={s.displayName} title={profile?.display_name ?? ""}>
                          {profile?.display_name ?? ""}
                        </div>
                      </div>
                      <div className={s.profileBalance}>
                        <div>
                          {width > 1024 && <Notification/>}
                        </div>
                        {
                          !address ?
                            <div style={{display: "flex", alignItems: "center", marginRight: 8}}>
                              <div
                                className={s.overviewBtn}
                                onClick={() => showModal()}
                              >
                                <div>Connect wallet</div>
                              </div>
                            </div>
                            : null}
                        <div className={s.wrapperReward}>
                          {address ?
                            <div className={s.address}>
                              <div title={address}>
                                {address?.slice(0, 6) + "..." + address?.slice(address?.length - 6)}
                              </div>
                            </div>
                            : null}
                          <div className={s.rewardItem} style={{marginRight: 8}}>
                            <span className={s.lucisPoint}>{animatedNumber(balance?.lucis_point) ?? 0}</span>
                            <img src="/assets/P2E/lucis-point.svg" alt=""/>
                          </div>
                          <div className={s.rewardItem}>

                            <span style={{color: "#16DADF"}}>{animatedNumber(balance?.lucis_token, 2) ?? 0}</span>
                            <img src="/assets/P2E/lucis-token.svg" alt=""/>
                          </div>
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
            </Col>
          </Row>
          {/* <InfiniteList /> */}
        </div>
      </div>
      <MenuMobile balance={balance}/>
      {LoginBoxStore.signupInfoModalVisible && <SignupInfoModal/>}
      {LoginBoxStore.alertInAppModalVisible && <AlertInAppModal/>}
      <LoginModal />
    </>
  );
});
