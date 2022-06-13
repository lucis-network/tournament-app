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
    const link = LINK_URL + asPath;
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
      //   title="Share to"
      footer=""
    >
      <p className="m-0">Share to:</p>
      <div className={s.group_ic}>
        <FacebookShareButton url={linkUrl} className={s.ic_item}>
          <a target="_blank" rel="noopener noreferrer">
            <img src={"/assets/footer/fb.svg"} alt="icon" />
          </a>
        </FacebookShareButton>
        <TelegramShareButton url={linkUrl} className={s.ic_item}>
          <a target="_blank" rel="noopener noreferrer">
            <img src={"/assets/footer/tele.svg"} alt="icon" />
          </a>
        </TelegramShareButton>
        <div className={s.ic_item}>
          <a
            href="https://www.youtube.com/lucisnetwork"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/footer/ytb.svg" alt="" />
          </a>
        </div>
        <TwitterShareButton url={linkUrl} className={s.ic_item}>
          <a target="_blank" rel="noopener noreferrer">
            <img src={"/assets/footer/tw.svg"} alt="icon" />
          </a>
        </TwitterShareButton>
        <div className={s.ic_item}>
          <a
            href="https://discord.gg/mnPXR3ag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/footer/dis.svg" alt="" />
          </a>
        </div>
      </div>
      {/* <Input readOnly> {LINK_URL} </Input> */}
      {/* <input
        readOnly
        value={`${LINK_URL}${asPath}`}
        style={{ background: "#1890ff", color: "white", width: "100%" }}
      ></input> */}
      <div className={`${s.info} sm:mt-2 lg:mt-5 `}>
        <div
          className={`${s.name} flex font-[400] text-[14px] sm:text-[18px] md:text-[24px]`}
        >
          <input
            readOnly
            value={`${LINK_URL}${asPath}`}
            // style={{ background: "#1890ff", color: "white", width: "100%" }
            className={s.inputUrl}
          ></input>
          <button disabled={isCopy} onClick={handleCopy}>
            {!isCopy ? (
              <img src={"/assets/MyProfile/copy.svg"} alt="" />
            ) : (
              <CheckOutlined />
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PopupShare;
