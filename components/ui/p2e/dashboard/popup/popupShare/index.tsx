import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import s from "./PopupShare.module.sass";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import { isClient } from "utils/DOM";

type Props = {
  status: boolean;
  closeModal: () => void;
  linkRef: string;
};

const PopupShareRefer = (props: Props) => {
  const { status, closeModal, linkRef } = props;
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setIsCopy(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopy]);

  const handleCopy = () => {
    if (linkRef) {
      if (isClient) {
        setIsCopy(true);
        message.success("Copied to clipboard");
        navigator.clipboard.writeText(linkRef);
      }
    }
  };

  return (
    <Modal
      centered
      visible={status}
      onOk={closeModal}
      onCancel={closeModal}
      className={s.content_modal}
      footer=""
    >
      <div className={s.content}>
        <p>1. Get your friend to sign up with the link above.</p>
        <p>2. They will have to connect game and play at least one match.</p>
        <p>3. You both will get rewarded with 50 Lucis points.</p>
      </div>
      <div className={s.group_ic}>
        <FacebookShareButton url={linkRef} className={s.ic_item}>
          <a target="_blank" rel="noopener noreferrer">
            <img src={"/assets/P2E/share/fb.svg"} alt="icon" />
          </a>
        </FacebookShareButton>
        <TelegramShareButton url={linkRef} className={s.ic_item}>
          <a target="_blank" rel="noopener noreferrer">
            <img src={"/assets/P2E/share/telegram.svg"} alt="icon" />
          </a>
        </TelegramShareButton>
        <TwitterShareButton url={linkRef} className={s.ic_item}>
          <a target="_blank" rel="noopener noreferrer">
            <img src={"/assets/P2E/share/twitter.svg"} alt="icon" />
          </a>
        </TwitterShareButton>
        <FacebookMessengerShareButton
            url={linkRef}
            appId={"1023048308650581"}
            className={s.ic_item}
          >
            <a target="_blank" rel="noopener noreferrer">
              <img src={"/assets/P2E/share/message.svg"} alt="icon" />
            </a>
          </FacebookMessengerShareButton>
      </div>
      <div className={`${s.info} sm:mt-2 lg:mt-5 `}>
        <div
          className={`${s.name} flex font-[400] text-[14px] sm:text-[16px] md:text-[18px]`}
        >
          <input
            readOnly
            value={linkRef}
            className={s.inputUrl}
          ></input>
          <button style={{marginLeft: "16px"}} disabled={isCopy} onClick={handleCopy}>
            <img width={26} src={"/assets/P2E/overview/content-copy.svg"} alt="" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PopupShareRefer;
