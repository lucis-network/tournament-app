import {Button, Modal } from "antd";
import s from "./index.module.sass";
import ButtonWrapper from "../../../../../common/button/Button";
import React from "react";

type Props = {
  closePopupContact: () => void;
  status: boolean;

};

const PopupContactRaffles = (props: Props) => {
  const { status, closePopupContact} = props;

  return (
    <Modal
      visible={status}
      centered
      //className={s.content_modal}
      wrapClassName={s.content_modal}
      footer={null}
      onCancel={closePopupContact}
    >
      <div className={s.container}>
        <div className={s.logo}>
          <img src="/assets/Raffles/LucisLogo.svg"/>
        </div>
        <div className={s.wrapContainer}>
          <div className={s.desc}>
            Congratulations on your lucky win from Lucis. It is not sent to you right away, please contact Lucis Support for instructions on receiving the prize.
          </div>
          <div>
            <ButtonWrapper className={s.button} width={236} onClick={() => window.open("https://discord.gg/7SdtYpGENT")}>CHAT WITH US</ButtonWrapper>
          </div>
          <div className={`${s.thankTo} ${s.desc}`}>
            Thank you for joining us!
          </div>
        </div>

      </div>

    </Modal>
  );
};

export default PopupContactRaffles;
