import * as React from "react";
import s from "./MenuMobile.module.sass";
import {useRef, useEffect, useState} from "react";
import {motion, useCycle} from "framer-motion";
import {useDimensions} from "./useDimensions";
import {MenuToggle} from "./MenuToggle";
import Navigation from "./Navigation";
import {AppEmitter} from "services/emitter";
import Link from "next/link";

import AuthService from "../../../Auth/AuthService";
import Notification from "../../../Auth/components/notification";
import {useWindowSize} from "../../../../hooks/useWindowSize";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height + 200}px at 260px 33px)`,
    transition: {
      type: "spring",
      stiffness: 40,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(1px at 260px 30px)",
    transition: {
      delay: 0.5, // delay before hide to wait menu item hidden first
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const nav = {
  open: {
    display: "block",
    transition: {
      staggerChildren: 0.17,
      delayChildren: 0.2,
    },
  },
  closed: {
    display: "none",
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};
export const MenuMobile = (props: any) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [width] = useWindowSize()
  // const containerRef = useRef(null);
  // const {height} = useDimensions(containerRef);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
  }, [isOpen]);

  useEffect(() => {
    const subscription = AppEmitter.addListener(
      "setMbMenuVisible",
      (visible: boolean) => {
        toggleOpen(visible ? 1 : 0);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <div className="overlay" onClick={() => toggleOpen()}/>

      {/* Header bar */}
      <div
        className={`${s.mobileMenu} fixed top-0 left-0 right-0 z-[101] bg-nav backdrop-blur-sm`}
      >
        <div className={`${s.menuMobile} flex justify-between items-center`}>
          <div style={{width: 120, height: 52}}>
            <Link href={"/"}>
              <img src="/assets/home/logo.png" alt=""/>
            </Link>
          </div>
          <motion.div initial={false} animate={"closed"} style={{display: "flex", alignItems: "center", marginBottom: 3}}>
            {width < 1024 && <Notification/>}
            <MenuToggle toggle={() => toggleOpen()}/>
          </motion.div>
        </div>
      </div>

      {/* menubar */}
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        // custom={height}
        // ref={containerRef}
        variants={nav}
        className="mobile-nav z-[101]"
      >
        <motion.div variants={sidebar}/>

        <Navigation balance={props.balance}/>

        <MenuToggle toggle={() => toggleOpen()} className={s.mHumber}/>
      </motion.nav>
    </>
  );
};
