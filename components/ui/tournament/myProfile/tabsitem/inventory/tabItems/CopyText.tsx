import s from "../index.module.sass";
import React, {useState} from "react";
import {useCopy} from "../../../../../../../hooks/common/useCopy";

type Props = {
  text: string,
}
export default function (props: Props) {
  const {text} = props;
  const {isCopied, setCopied, onCopy} = useCopy();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "#ebebeb",
        fontSize: "16px",
      }}
    >
      {text}
      <span className={s.iconCopy}>
        <img
          onClick={() => {
            setCopied(true);
            onCopy(text);
          }}
          style={{
            width: "100%",
            height: "100%",
            marginBottom: "8px",
          }}
          src={isCopied
            ? "/assets/P2E/overview/copied.svg"
            : "/assets/P2E/overview/copy-icon.svg"
          }
        />
      </span>
    </div>
  )
}
