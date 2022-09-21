import * as React from "react";
import {ReactElement, useCallback} from "react";
import s from "./MenuMobile.module.sass";

import {motion} from "framer-motion";
import {AppEmitter} from "services/emitter";
import Link from "next/link";
import {useRouter} from "next/router";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100},
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000},
    },
  },
};

export type MenuItemType = {
  color: string;
  src?: string;
  text: string | ReactElement;
  scrollTarget?: string; // CSS selector of target scroll
  onClick?: () => void;
  subMenu?: string | ReactElement;
  disable?: boolean;
  class?: object;
  isBlank?: boolean;
  to?: string;
  active?: boolean;
  isComingSoon?: boolean;
  isMarginTop?: boolean;
};

export const MenuItem = (props: { item: MenuItemType }) => {
  const click = useCallback(() => {
    if (props.item.onClick) {
      props.item.onClick();
    }
    if (props.item.subMenu == undefined) {
      AppEmitter.emit("setMbMenuVisible", false);
    }
  }, []);

  const disable = props.item.disable && s.disable;
  let Comp;

  if (props.item.to) {
    Comp = <Link href={props.item.to} passHref>
      <a className={`${props.item?.isComingSoon ? 'comingSoon' : ''}`} target="_blank" rel="noopener noreferrer">
        {props.item.text}
        {props.item?.isComingSoon && (
          <span>Coming Soon</span>
        )}
      </a>
    </Link>;
  } else if (props.item.src) {
    Comp = (
      <a href={props.item.src} target="_blank" rel="noopener noreferrer" className={`${props.item?.isComingSoon ? 'comingSoon' : ''}`}>
        {props.item.text}
        {props.item?.isComingSoon && (
          <span>Coming Soon</span>
        )}
      </a>
    );
  } else {
    Comp = <div className={`${disable} ${props.item?.isComingSoon ? 'comingSoon' : ''}`}>
      {props.item.text}
      {props.item?.isComingSoon && (
        <span>Coming Soon</span>
      )}
    </div>;
  }
  return (
    <motion.li
      variants={variants}
      whileHover={{scale: 1.05}}
      // whileTap={{ scale: 0.95 }}
      onClick={click}
      style={props.item.class}
      className={`text-placeholder ${s.menuMobileItem} ${props.item.active ? "tabActive" : ""} ${props.item?.isMarginTop ? s.menuMobileItemMarginTop : ''}`}
    >
      {Comp}
    </motion.li>
  );
};
