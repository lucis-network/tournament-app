import GradientButton from "components/ui/common/button/GradientButton";
import LoginBoxStore from "./LoginBoxStore";
import LoginModal from "./LoginModal";
import s from "./Login.module.sass"
import {Spin} from "antd";
import React from "react";

export default function Login(props: any) {
  const showModal = () => {
    LoginBoxStore.connectModalVisible = true;
  };

  return (
    <div className={s.loginSection}>
      <div
        className={s.overviewBtn}
        onClick={() => showModal()}
      >
        <div>SIGN IN</div>
      </div>
      {/*<GradientButton*/}
      {/*  onClick={showModal}*/}
      {/*  type={1}*/}
      {/*  small={!!props.small}*/}
      {/*  className={`${s.btn} `}*/}
      {/*  style={{ whiteSpace: "nowrap", fontWeight: "600", color: '#FFF' }}*/}
      {/*>*/}
      {/*  Sign in*/}
      {/*</GradientButton>*/}
      <LoginModal />
    </div>
  );
}
