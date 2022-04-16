import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import s from "./ConnectWallet.module.sass";
import GradientButton from "../../Button/GradientButton";
import AuthBoxStore from "./AuthBoxStore";
import { Modal } from 'antd';
type Props = {
  small?: boolean;
};
export default function ConnectWalletBtn(props: Props) {

  const showModal = () => {
    AuthBoxStore.connectModalVisible = true;
  };
  return (
    <>
      <div className={s.container}>
        <GradientButton
          onClick={showModal}
          type={1}
          small={!!props.small}
          className={`text-white text-24px leading-28px px-40px py-15px `}
          style={{ whiteSpace: "nowrap", fontWeight: "600" }}
        >
          Connect wallet
        </GradientButton>
      </div>
    </>
  );
}
