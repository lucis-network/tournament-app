import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem, MenuItemType } from "./MenuItem";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import AuthService from "../../../Auth/AuthService";
import ConnectWalletStore
 from "../../../Auth/ConnectWalletStore";
import AuthStore from "../../../Auth/AuthStore";
import { AppEmitter } from "services/emitter";
import s from "./MenuMobile.module.sass";
import ProfileMobile from "./ProfileMobile";
import LoginBoxStore from "../../../Auth/Login/LoginBoxStore";
import {observer} from "mobx-react-lite";
import LoginModal from "../../../Auth/Login/LoginModal";


const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export default observer(function Navigation ({balance}: any) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { address, network: connected_network } = ConnectWalletStore;
  const { profile } = AuthStore;

  const onClickProfile = () => {
    router.push("/profile");
    setIsVisible(false);
  };

  const disconnectWallet = React.useCallback(async () => {
    const authService = new AuthService();
    authService.logout();

    AppEmitter.emit("onWalletDisconnect");
  }, []);

  const openPopupSignIn = () => {
    console.log(1234)
    LoginBoxStore.connectModalVisible = true;
  }

  const menuItems: MenuItemType[] = [
    {
      color: "#FF008C",
      text: "PLAYCORE",
      isBlank: false,
      to: "/",
      active: router.pathname === "/"
    },
    {
      color: "#FF008C",
      text: "ARENA",
      isBlank: false,
      to: "/arena",
      active: router.pathname === "/arena"
    },
    {
      color: "#FF008C",
      text: "INSIGHT",
      src: "https://insight.lucis.network/",
    },
    {
      color: "#FF008C",
      text: "RANKING",
      class: { cursor: "context-menu" },
      to: "/ranking",
    },
    // {
    //   color: "#FF008C",
    //   text: "SCHORLARSHIP",
    //   disable: true,
    //   class: { cursor: "context-menu" },
    // },
    // {
    //   color: "#FF008C",
    //   text: "SOCIAL",
    //   disable: true,
    //   class: { cursor: "context-menu", paddingBottom: 24 },
    // },
    {
      color: "#FF008C",
      text: (
        <div style={AuthStore.isLoggedIn ? {borderBottom: "1px solid #3D475C", paddingBottom: "24px"} : undefined}>
          {AuthStore.isLoggedIn ? (
            <>
              <ProfileMobile balance={balance}/>
            </>
          ) : (
            ""
          )}
        </div>
      ),
      class: { paddingBottom: "24px" },
      isBlank: false,
      isMarginTop: true,
    },
    // {
    //   color: "#FF008C",
    //   text: (
    //     AuthStore.isLoggedIn ? (
    //       <div>
    //         <div style={{borderBottom: "1px solid #3D475C"}}></div>
    //       </div>
    //     ) : (
    //       ""
    //     )
    //   ),
    //   class: { paddingBottom: "24px" },
    //   isBlank: false,
    // },
    {
      color: "#FF008C",
      text: (
        <div>
          {AuthStore.isLoggedIn ? (
            <div onClick={onClickProfile}>My Profile</div>
          ) : (
            ""
          )}
        </div>
      ),
      isBlank: false,
    },

    {
      color: "#FF008C",
      text: (
        <div>
          {AuthStore.isLoggedIn ? (
            <div onClick={onClickProfile}>Stake</div>
          ) : (
            ""
          )}
        </div>
      ),
      isBlank: false,
      disable: true,
    },

    {
      color: "#FF008C",
      text: (
        <div>
          {AuthStore.isLoggedIn ? (
            <div onClick={onClickProfile}>NFTs</div>
          ) : (
            ""
          )}
        </div>
      ),
      class: { paddingBottom: 24 },
      isBlank: false,
      disable: true,
    },
    {
      color: "#FF008C",
      text: (
        <div>
          {AuthStore.isLoggedIn ? (
            <div className={s.headerButton} onClick={disconnectWallet}>
              <span >Sign out</span>
            </div>
          ) : (
            <div className={s.headerButton} onClick={openPopupSignIn}>
              <span>Sign in</span>
            </div>
          )}
        </div>
      ),
      isBlank: false,
    },
  ];

  useEffect(() => {
    const subscription = AppEmitter.addListener(
      "setJoinUsVisible",
      (visible: boolean) => {
        setIsModalVisible(visible);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <div>
      <motion.ul className="nav-list" variants={variants}>
        {menuItems.map((i, idx) => (
          <MenuItem item={i} key={idx} />
        ))}
      </motion.ul>
    </div>
  );
});
