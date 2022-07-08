import { Modal } from "antd";
import { useWindowSize } from "hooks/useWindowSize";
import { useEffect, useState } from "react";
import s from "./index.module.sass";

type Props = {
  closePopupRollingChest?: () => void;
  status: boolean;
};


const PopupRollingChest = (props: Props) => {
  const { status, closePopupRollingChest } = props;
  const [width] = useWindowSize();
  const [autoRolling, setAutoRolling] = useState(false)
  
  const styles = {
    transform: autoRolling ? 'translateX(-6000px)': 'translateX(0px)'
  }
  const styleWidth = {
    maxWidth:
      width < 768 ? width - 50 : width < 1280 ? width - 100 : width - 220,
      overflow: "hidden",
      margin: "0 auto",
    };

    const datas = [
      {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]

  useEffect(() => {
    if (status == true) {
      setAutoRolling(false)
    }
  }, [status])

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
            <button onClick={() => setAutoRolling(true)}>run</button>
        <div className={s.container}>
          <div className={s.bg_rolling}>
            <img src="/assets/P2E/luckychest/bg_rolling.png" alt="" />
          </div>
          <div style={styleWidth}>
          <div
            className={s.rolling}
            style={styles}
          >
              {
                datas.map((e: any, i: any) => {
                  return (
                    <>
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
                    </>
                  );
                })
              }
          </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopupRollingChest;
