import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem, MenuItemType } from "./MenuItem";
import GradientButton from "../button/GradientButton";
import { useEffect, useState } from "react";

import { Modal, Button, Menu } from "antd";
import { AppEmitter } from "services/emitter";
import Link from "next/link";
import s from './MenuMobile.module.sass'

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
  const [isSubMenu, setIsSubMenu] = useState(false);
  const { SubMenu } = Menu

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showSubmenu = () =>{
    setIsSubMenu(!isSubMenu)
  }
  const hideMenu = () =>{
    AppEmitter.emit("setMbMenuVisible", false)
    setIsSubMenu(false)
  }
  const styleSub = isSubMenu == false ? 0: 272
  
  const menuItems: MenuItemType[] = [
    {
      color: "#FF008C",
      text: "TOURNAMENT",
      // src: "/tournaments",
    },
    {
      color: "#FF008C",
      text: "FAQ",
      // src: "/marketplace"
    },
    {
      color: "#FF008C",
      text: "INSIGHT",
      // src: "/insight"
    },
    {
      color: "#FF008C",
      text: "RANKING",
      // src: "/docs"
    },
        {
      color: "#FF008C",
      text: "SOCIAL",
      // src: "/docs"
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
