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
            fontSize: '32px',
            fontWeight: '600',
            color: 'rgba(255, 145, 83, 1)',
            lineHeight: '38.4px',
            textAlign: 'center',
            marginTop: '20px'
          }}>
            Sorry, we do not currently supports in-app browser, please use mobile browsers for fully supports.
          </p>
        </div>
      </Modal>

    </>
  );
};

export default AlertInAppModal;