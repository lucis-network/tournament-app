import { Button, ButtonProps } from "antd";
import React from "react";
import s from "./button.module.sass";


type IProps = ButtonProps & {
    width?: number | string;
    height?: number | string;
}
const ButtonWrapper = (props: IProps) => {
    const width = props?.width ?? "88px";
    const height = props?.height ?? "32px";
    return (
        <div className={s.lucisButton} style={{ width: width, height: height }}>
            <div className={`${!props.disabled ? s.wrapper : s.wrapperDisabled}`}></div>
            <Button {...props} className={`${s.customCss} ${props?.className ?? ""}`} style={{ width: "inherit" }} />
        </div >
    )
}

export default ButtonWrapper;