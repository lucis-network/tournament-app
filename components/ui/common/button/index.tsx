import { Button } from "antd";
import React, { useCallback, useState } from "react";
import s from "./button.module.sass";

type KButtonProps = {
  title: string;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  fontSize?: string;
};

export function KButton(props: KButtonProps) {
  const { title, onClick, loading, disabled, padding, ...style } = props;
  return (
    <Button
      className={s.button}
      disabled={disabled}
      loading={loading}
      style={{ ...style }}
      onClick={props.onClick}
    >
      <span
        style={{
          padding: padding ?? "0px 8px",
          color: "inherit",
          fontSize: "inherit",
        }}
      >
        {props.title}
      </span>
    </Button>
  );
}
