import { Modal } from "antd";
import { useWindowSize } from "hooks/useWindowSize";
import { useState } from "react";
import s from "./index.module.sass";

type Props = {
  closePopupRollingChest?: () => void;
  status: boolean;
};

const PopupRollingChest = (props: Props) => {
  const { status, closePopupRollingChest } = props;
  const [width] = useWindowSize();
  const [autoRolling, setAutoScroll] = useState(false)

  return (
    <div className={s.wrapper_popup_rolling_chest}>
      <Modal
        visible={status}
        centered
        wrapClassName={s.content_modal}
        footer={null}
        onCancel={closePopupRollingChest}
        width={"100%"}
      >
        <div className={s.container}>
          <div className={s.bg_rolling}>
            <img src="/assets/P2E/luckychest/bg_rolling.png" alt="" />
          </div>
          <div
            className={s.rolling}
            style={
              width < 768
                ? { width: width - 50 }
                : width < 1280
                ? { width: width - 100 }
                : { width: width - 220 }
            }
          >
            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>
            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>
            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>
            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>
            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>

            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>
            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>
            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>
            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>
            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>

            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>
            <div className={s.box_item}>
              <div>
                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
              </div>
              <div className={s.title}>
                <p>Good luck!</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopupRollingChest;
