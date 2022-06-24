import { Modal } from "antd";
import GoogleLogin from "react-google-login";
import LoginBoxStore from "./LoginBoxStore";
import FacebookLogin from "@greatsumini/react-facebook-login";
import Logo from "../../../assets/icon/logo.png";
import Image from "../../ui/common/images/Image";
import {Image as AntImage} from "antd";

import s from "./Login.module.sass"

type Props = {};

const AlertInAppModal = (props: Props) => {
  const isModalVisible = LoginBoxStore.alertInAppModalVisible,
    setIsModalVisible = (v: boolean) => (LoginBoxStore.alertInAppModalVisible = v);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className={`flex justify-center ${s.loginModal}`}
      >
        <div className="text-center mb-10">
          <div className="mb-5">
            <Image src={Logo} alt="" />
          </div>
          <h2 className="mb-1">Welcome to Lucis tournament</h2>
          <h4 style={{ marginBottom: '36px' }}>Play to relax, but earn</h4>
          <AntImage src="/assets/iconBlock.svg" alt="" width={40} height={40} preview={false} />
          <p style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'rgba(255, 145, 83, 1)',
            lineHeight: '1.5',
            textAlign: 'center',
            marginTop: '20px'
          }}>
            Sorry, we currently do not support in-app browser as it lack of user experience and supports.<br />
            For a full set of features, please open our app in the official browser instead such as Chrome, Safari, etc.
          </p>
        </div>
      </Modal>

    </>
  );
};

export default AlertInAppModal;