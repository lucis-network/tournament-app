import Link from "next/link";
import s from "./Header.module.sass";
import Image from "../common/images/Image";
import Logo from "assets/icon/logo.png";
import Login from "components/Auth/Login/Login";
import AuthStore from "components/Auth/AuthStore";
import User from "components/Auth/components/User";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

type Props = {
  handleMenuOpen: Function;
};

export default observer(function Header(props: Props) {

  // useEffect(() => {
  //   const user = localStorage.getItem('user')
  // }, [])

  return (
    <div className={`${s.pcMenu} bg-nav`}>
      <div className={`${s.menu_container}`}>
        <div
          className={`container lucis-container py-20px px-0 flex justify-between items-center relative z-10 `}
        >
          <div className={s.logo}>
            <Link href="/" passHref>
              <a>
                <Image src={Logo} alt="logo" priority />
              </a>
            </Link>
            {"IS_TESTNET" && <p>Testnet</p>}
          </div>
          <nav>
            <ul className="flex gap-4 justify-between items-center m-0">
              {/*<li><a href="#" className='text-white text-24px leading-28px p-15px'>Home</a></li>*/}
              {/* <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/");
                  }}
                  className="text-white text-24px leading-28px p-15px"
                >
                  Home
                </a>
              </li> */}

              <li className={s.groundSubMenu}>
                <a
                  href="https://launchpad-lucis.gitbook.io/lucis-lauchpad-docs/"
                  // onClick={(e) => e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-18px leading-28px "
                >
                  Guide
                </a>
                {/* <ul className={s.subMenu}>
                  <li>For Game Publisher</li>
                  <li>For Personal Investor</li>
                </ul> */}
              </li>

              {/* <li style={{ cursor: "pointer" }}>
                <Notification />
              </li> */}

              {/*<li><a href="#" className='text-white text-24px leading-28px p-15px'>Roadmap</a></li>*/}
              <li>
                {/* <AuthBox /> */}
              </li>
              <li>
                {
                  AuthStore.isLoggedIn ?
                    <>
                      <User></User>
                    </>
                    :
                    <Login />
                }
              </li>
              {/* TODO: Notification infinite scroll */}
              {/* <li>
                <Notification />
              </li> */}
            </ul>
          </nav>
        </div>
        {/* <InfiniteList /> */}
      </div>
    </div>
  );
}
);