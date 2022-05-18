import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem, MenuItemType } from "./MenuItem";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Login from "components/Auth/Login/Login";
import AuthService from "../../../Auth/AuthService";
import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData,
} from "../../../Auth/ConnectWalletStore";
import { Button } from "antd/lib/radio";
import AuthStore from "../../../Auth/AuthStore";
import { trim_middle } from "utils/String";
import { AppEmitter } from "services/emitter";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

// const dataSubMenu = [
//   {
//     id: 1,
//     text: 'Social-Fi network platform',
//     disabled: false
//   },
//   {
//     id: 2,
//     text: 'Tournaments',
//     disabled: false
//   },
//   {
//     id: 3,
//     text: 'Lucis Insight & Game Ranking system',
//     disabled: false
//   },
//   {
//     id: 4,
//     text: 'Lucis Media',
//     disabled: false
//   },
//   {
//     id: 5,
//     text: 'Launchpad & Marketplace',
//     disabled: false
//   },
//   {
//     id: 6,
//     text: 'Gaming Guild',
//     disabled: false
//   },
//   {
//     id: 7,
//     text: 'Automation tool zone',
//     disabled: true
//   },
//   {
//     id: 8,
//     text: 'Streaming platform',
//     disabled: true
//   },
// ]
export const Navigation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { address, network: connected_network } = ConnectWalletStore;

  const onClickProfile = () => {
    router.push("/profile");
    setIsVisible(false);
  };
  const disconnectWallet = React.useCallback(async () => {
    const authService = new AuthService();
    authService.logout();

    AppEmitter.emit("onWalletDisconnect");
  }, []);

  const menuItems: MenuItemType[] = [
    {
      color: "#FF008C",
      text: "TOURNAMENT",
      src: "https://tournament-lucis.gitbook.io/lucis-tournament/",
    },
    {
      color: "#FF008C",
      text: "FAQ",
      src: "https://insight.lucis.network/"
    },
    {
      color: "#FF008C",
      text: "INSIGHT",
      src: "https://tournament-lucis.gitbook.io/lucis-tournament/"
    },
    {
      color: "#FF008C",
      text: "RANKING",
      // src: "/docs"
      disable: true
    },
    {
      color: "#FF008C",
      text: "SOCIAL",
      disable: true
      // src: "/docs"
    },
    {
      color: "#FF008C",
      text: (
        <div>
          {
            AuthStore.isLoggedIn ?
              <div onClick={onClickProfile}>
                My Profile
              </div>
              : <Login />
          }
        </div>
      ),
      class: {position: 'absolute', bottom: "180px"},
      isBlank: false
    },
    {
      color: "#FF008C",
      text: (
        <div>
          {
            AuthStore.isLoggedIn ?
              <div>
                <p>{trim_middle(address ?? "", 7, 8)}</p>
                <div onClick={disconnectWallet}>
                  Disconnect
                </div>
              </div>
              : ''
          }
        </div>
      ),
      class: {position: 'absolute', bottom: "120px"},
      isBlank: false
    },
    // {
    //   color: "#FF008C",
    //   text: (
    //     <div>
    //       <div onClick={showSubmenu}>Ecosystem</div>
    //       <ul style={{height: styleSub}} className={s.submenu}>
    //       {dataSubMenu.map((data:any) =>(
    //         <li className={`${data.disabled == true && s.disabled}`} key={data.id} onClick={hideMenu}><Link href={`${data.href}`}>{data.text}</Link></li>
    //       ))}
    //       </ul>
    //     </div>

    //   ),
    //   src: "",
    //   subMenu: ""
    // },
    // {
    //   color: "#FF008C",
    //   text: (
    //     <GradientButton
    //       onClick={() => {
    //         setIsModalVisible(true);
    //       }}
    //       type={1}
    //       className="text-white font-saira nw"
    //       style={{ whiteSpace: "nowrap",fontSize: "20px",lineHeight: '22px',padding: '10px 16px' }}
    //     >
    //       Join us
    //     </GradientButton>
    //   ),
    //   src:""
    // },
  ];

  useEffect(() => {
    const subscription = AppEmitter.addListener('setJoinUsVisible', (visible: boolean) => {
      setIsModalVisible(visible)
    });
    return () => {
      subscription.remove();
    }
  }, [])

  return (
    <div>
      <motion.ul className="nav-list" variants={variants}>
        {menuItems.map((i, idx) => (
          <MenuItem item={i} key={idx} />
        ))}
      </motion.ul>
    </div>
  );
};
