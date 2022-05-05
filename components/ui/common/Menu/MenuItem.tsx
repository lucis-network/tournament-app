import * as React from "react";
import {ReactElement, useCallback} from "react";

import { motion } from "framer-motion";
import {AppEmitter} from "services/emitter";
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
}

export const MenuItem = (props: {item: MenuItemType}) => {
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

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }}
      // whileTap={{ scale: 0.95 }}
      onClick={click}
    >
      <div className="text-placeholder font-saira text-white px-3 py-3" style={{fontSize: "20px",lineHeight: '22px'}}>
        <Link href={props.item.src ?? '#'}>{props.item.text}</Link>
      </div>
    </motion.li>
  );
};
