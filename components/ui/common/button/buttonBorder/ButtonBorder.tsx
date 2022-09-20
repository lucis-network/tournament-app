// @ts-nocheck
import React, { useEffect } from "react";
import s from "./ButtonBorder.module.sass";

type Props = {
  height?: string;
  onClick?: () => void;
  width?: string;
  children?: React.ReactNode;
};

const ButtonBorder: React.FC<Props> = (props: Props) => {
  const {onClick, children} = props;

  useEffect(() => {
    let btn = document.querySelector('.btn_hover_common');
    console.log(btn);
    if(btn) {
      btn.addEventListener('mousemove', e => {
        console.log("e", e);
        if(e) {
          let rect = e.target.getBoundingClientRect();
          let x = e.clientX - rect.left;
          let y = e.clientY - rect.top;
          const span = btn.querySelector('.btn_glow_common');
          console.log(x,y);
          if(span) {
            span.style.left = x + 'px';
            span.style.top = y + 'px';
          }
        }
      });
    }
  }, [])

  return (
    <div className={`${s.btn} btn_hover_common`} onClick={onClick}>
      {children}
      <span className={`${s.btn_hover} btn_glow_common`}></span>
    </div>
  )
}

export default ButtonBorder;

