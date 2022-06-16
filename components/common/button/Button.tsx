import { Button, ButtonProps } from "antd";
import React from "react";
import s from "./button.module.sass";


type IProps = ButtonProps & {

}
const ButtonWrapper = (props: IProps) => {
    return (
        <div className={s.lucisButton}>
            <div className={`${!props.disabled ? s.wrapper : s.wrapperDisabled}`}></div>
            <Button {...props} className={`${s.customCss} ${props?.className ?? ""}`} />
        </div >
    )
}

export default ButtonWrapper;