import { Input, Modal } from "antd";
import { LINK_URL } from "utils/Enum";
import s from "./PopupShare.module.sass";

type Props = {
  datas?: object;
  status: boolean;
  closeModal: () => void;
  asPath: string;
};

const PopupShare = (props: Props) => {
  const { status, closeModal, asPath } = props;

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
        <div className={s.ic_item}>
          <a
            href="https://www.facebook.com/lucis.network"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/footer/fb.svg" alt="" />
          </a>
        </div>
        <div className={s.ic_item}>
          <a
            href="https://www.facebook.com/lucis.network"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/footer/tele.svg" alt="" />
          </a>
        </div>
        <div className={s.ic_item}>
          <a
            href="https://www.youtube.com/lucisnetwork"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/footer/ytb.svg" alt="" />
          </a>
        </div>
        <div className={s.ic_item}>
          <a
            href="https://twitter.com/LucisNetwork"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/footer/tw.svg" alt="" />
          </a>
        </div>
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
      <input
        readOnly
        value={`${LINK_URL}${asPath}`}
        style={{ background: "#1890ff", color: "white", width: "100%" }}
      ></input>
    </Modal>
  );
};

export default PopupShare;
