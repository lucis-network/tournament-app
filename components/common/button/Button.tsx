import { Button, ButtonProps } from "antd";
import React from "react";
import s from "./button.module.sass";


type IProps = ButtonProps & {
    width?: number | string;
    height?: number | string;
}
const ButtonWrapper = (props: IProps) => {
    const width = props?.width ?? "88px";
    const height = props?.height ?? "35px";
    return (
        //<div className={s.lucisButton} style={{ width: width, height: height }}>
        <Button {...props} className={`${s.customCss} ${props?.className ?? ""}`} style={{ minWidth: width, maxWidth: width, minHeight: height, maxHeight: height }} />
        //</div >
    )
}

export default ButtonWrapper;