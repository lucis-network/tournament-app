import React, {ReactNode} from "react";
import { Button, Modal, ModalProps } from "antd";
import s from "./index.module.sass";

type Props = ModalProps;

const StyledModal = (props: Props) => {
  const { className, children, ...rest} = props;

  return (
    <Modal
      className={s.content_modal}
      {...rest}
    >
      <div className={s.container}>
        <div className={s.logo}>
          <img src="/assets/Raffles/LucisLogo.svg"/>
        </div>
        <div className={s.wrapContainer}>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default StyledModal;
