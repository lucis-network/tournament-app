import { Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { LINK_URL } from "utils/Enum";
import s from "./PopupShare.module.sass";
import { CheckOutlined } from "@ant-design/icons";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import { isClient } from "utils/DOM";
import { useRouter } from "next/router";

type Props = {
  datas?: object;
  status: boolean;
  closeModal: () => void;
  asPath: string;
};

const PopupShare = (props: Props) => {
  const { status, closeModal, asPath } = props;
  const [isCopy, setIsCopy] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  useEffect(() => {
    let timer = setTimeout(() => setIsCopy(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopy]);

  useEffect(() => {
    const link = window.location.origin + asPath;
    setLinkUrl(link);
  }, []);

  const handleCopy = () => {
    if (linkUrl) {
      if (isClient) {
        setIsCopy(true);
        message.success("Copied to clipboard");
        navigator.clipboard.writeText(linkUrl);
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
      <p className="m-0">Share to:</p>
      <div className={s.group_ic}>
        <FacebookShareButton url={linkUrl} className={s.ic_item}>
          <a target="_blank" rel="noopener noreferrer">
            <img src={"/assets/Campaign/Banner/svg/fb.svg"} alt="icon" />
          </a>
        </FacebookShareButton>
        <TelegramShareButton url={linkUrl} className={s.ic_item}>
          <a target="_blank" rel="noopener noreferrer">
            <img src={"/assets/Campaign/Banner/svg/tele.svg"} alt="icon" />
          </a>
        </TelegramShareButton>
        <TwitterShareButton url={linkUrl} className={s.ic_item}>
          <a target="_blank" rel="noopener noreferrer">
            <img src={"/assets/Campaign/Banner/svg/tw.svg"} alt="icon" />
          </a>
        </TwitterShareButton>
        <FacebookMessengerShareButton
            url={linkUrl}
            appId={"1023048308650581"}
            className={s.ic_item}
          >
            <a target="_blank" rel="noopener noreferrer">
              <img src={"/assets/Campaign/Banner/svg/mess.svg"} alt="icon" />
            </a>
          </FacebookMessengerShareButton>
      </div>
      <div className={`${s.info} sm:mt-2 lg:mt-5 `}>
        <div
          className={`${s.name} flex font-[400] text-[14px] sm:text-[18px] md:text-[24px]`}
        >
          <input
            readOnly
            value={`${window.location.origin}${asPath}`}
            className={s.inputUrl}
          ></input>
          <button style={{marginLeft: "5px"}} disabled={isCopy} onClick={handleCopy}>
            <img src={"/assets/MyProfile/copy.svg"} alt="" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PopupShare;
