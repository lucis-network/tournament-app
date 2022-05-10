import Link from "next/link";
import s from "./Header.module.sass";
import Image from "../common/images/Image";
import Logo from "assets/icon/logo.png";
import Login from "components/Auth/Login/Login";
import AuthStore from "components/Auth/AuthStore";
import User from "components/Auth/components/User";
import { observer } from "mobx-react-lite";
import { useWindowSize } from "hooks/useWindowSize";
import { Col, Row } from "antd";
import SignupInfoModal from "../../Auth/Login/SignupInfoModal"
import { isEmpty } from "lodash";
import LoginBoxStore from "../../Auth/Login/LoginBoxStore";
import { useRouter } from "next/router";
import { MenuMobile } from "../common/Menu/MenuMobile";
import { useEffect } from "react";
import { getLocalAuthInfo } from "components/Auth/AuthLocal";

type Props = {
  handleMenuOpen: Function;
};

export default observer(function Header(props: Props) {
  const router = useRouter();
  const [width] = useWindowSize();

  const usernameCheck = async () => {
    const localUserInfo = getLocalAuthInfo();
    const isUsernameEmpty = (): boolean | null => (localUserInfo && isEmpty(localUserInfo?.profile?.user_name))
    LoginBoxStore.signupInfoModalVisible = false;
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (isUsernameEmpty()) {
      LoginBoxStore.signupInfoModalVisible = true;
    }
  }

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
        {width >= 1024 ? (
          <div className={`${s.menu_container}`}>
            <Row
              className={`container lucis-container items-center py-20px px-0 relative z-10 `}
            >
              <Col span={4} className={s.logo}>
                <Link href="/" passHref>
                  <a>
                    <Image src={Logo} alt="logo" priority />
                  </a>
                </Link>
                {
                  // @ts-ignore
                  ("IS_TESTNET" == "true") && <p>Testnet</p>
                }
              </Col>
              <Col span={16}>
                <ul className={s.block_item_menu}>
                  <li>TOURNAMENT</li>
                  <li>FAQ</li>
                  <li>INSIGHT</li>
                  <li>RANKING</li>
                  <li>SOCIAL</li>
                </ul>
              </Col>
              <Col span={4}>
                <ul className="flex gap-4 justify-between items-center m-0">
                  <li>
                    {AuthStore.isLoggedIn ? (
                      <>
                        <User></User>
                      </>
                    ) : (
                      <Login />
                    )}
                  </li>
                </ul>
              </Col>
            </Row>
            {/* <InfiniteList /> */}
          </div>
        ) : (
          <MenuMobile />
        )}
      </div>
      {LoginBoxStore.signupInfoModalVisible && <SignupInfoModal />}
    </>
  );
});
