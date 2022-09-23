// @ts-nocheck
import React, { useEffect } from "react";
import s from "./ButtonBorder.module.sass";

type Props = {
  height?: string;
  onClick?: () => void;
  width?: string;
  children?: React.ReactNode;
  name?: string;
};

const ButtonBorder: React.FC<Props> = (props: Props) => {
  const {onClick, children, name} = props;

    useEffect(() => {
    let btn = document.querySelector('.btn_hover_common');
    if(btn) {
      btn.addEventListener('mousemove', e => {
        if(e) {
          let rect = e.target.getBoundingClientRect();
          let x = e.clientX - rect.left;
          let y = e.clientY - rect.top;
          const span = btn.querySelector('.btn_glow_common');
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

