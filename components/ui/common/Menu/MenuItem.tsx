import * as React from "react";
import { ReactElement, useCallback } from "react";
import s from "./MenuMobile.module.sass"

import { motion } from "framer-motion";
import { AppEmitter } from "services/emitter";
import Link from "next/link";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export type MenuItemType = {
  color: string,
  src?: string,
  text: string | ReactElement,
  scrollTarget?: string, // CSS selector of target scroll
  onClick?: () => void,
  subMenu?: string | ReactElement,
  disable?: boolean,
  class?: object
}

export const MenuItem = (props: { item: MenuItemType }) => {
  const click = useCallback(() => {
    // if (props.item.scrollTarget) {
    //   scrollToSection(props.item.scrollTarget ?? '', true, -90)
    // 
    if (props.item.onClick) {
      props.item.onClick()
    }
    if (props.item.subMenu == undefined) {
      AppEmitter.emit("setMbMenuVisible", false)
    }
  }, [])

  const disable = props.item.disable && s.disable
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }}
      // whileTap={{ scale: 0.95 }}
      onClick={click}
      style={props.item.class}
    >
      <div className={`text-placeholder font-saira text-white px-3 py-3 ${disable}`} style={{ fontSize: "16px", lineHeight: '22px' }}>
        <a href={props.item.src ?? '/'} target="_blank" rel="noopener noreferrer">{props.item.text}</a>
      </div>
    </motion.li>
  );
};
