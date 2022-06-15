import { Button, ButtonProps } from "antd";
import React from "react";
import s from "./btn.module.css";


type IProps = ButtonProps & {

}
const ButtonWrapper = (props: IProps) => {
    return (
        <Button {...props} className={`${s.customCss} ${props?.className ?? ""}`} />
    )
}

export default ButtonWrapper;