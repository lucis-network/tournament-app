import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useWindowSize } from "../../../../../hooks/useWindowSize";
import s from "./PopupBox.module.sass";
import SliderBox from "../slider";
import PopupRollingChest from "./popupRollingChest";
import ButtonOpenBox from "../button/buttonOpen";
import { getChestDetailResponse, openChestResponse } from "./mock/getChestDetail";

type Props = {
  status: boolean;
  closePopupOpenBox: () => void;
};
export default function PopUpOpenBox(props: Props) {
  const { status, closePopupOpenBox } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rollingChestPopupVisible, setRollingChestPopupVisible] = useState(false);
  const [width] = useWindowSize();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const chestDetail = getChestDetailResponse;



  return (
    <div className={s.wrapper}>
      <Modal
        className={s.modal}
        width={"100%"}
        visible={status}
        onOk={closePopupOpenBox}
        onCancel={closePopupOpenBox}
      >
        <div>
          <div className={s.content_box}>
            <div className={s.content_left}>
              <h3>OPEN BOX !</h3>
              <p>Open the box to receive many attractive gifts</p>
              <div className={s.im_box}>
                <img src="/assets/P2E/lucky-chest/im_box.png" alt="" />
                <div className={s.btn_open}>
                  <div onClick={() => setRollingChestPopupVisible(true)}>
                    <ButtonOpenBox>Open</ButtonOpenBox>
                  </div>
                  <div className={s.number_coin}>
                    <p>5.000</p>
                    <img
                      src="/assets/P2E/lucky-chest/ic_lucis_coin.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={s.content_right}>
              <div className={s.line}>
                {width >= 1024 ? (
                  <img src="/assets/P2E/lucky-chest/ic_line.svg" alt="" />
                ) : (
                  <img src="/assets/P2E/lucky-chest/ic_line_top.png" alt="" />
                )}
              </div>
              <div className={s.block_item}>
                <div className={s.item}>
                  <img src="/assets/P2E/lucky-chest/im_box.png" alt="" />
                </div>
                <div className={s.item}>
                  <img src="/assets/P2E/lucky-chest/im_box.png" alt="" />
                </div>
                <div className={s.item}>
                  <img src="/assets/P2E/lucky-chest/im_box.png" alt="" />
                </div>
                <div className={s.item}>
                  <img src="/assets/P2E/lucky-chest/im_box.png" alt="" />
                </div>
                <div className={s.item}>
                  <img src="/assets/P2E/lucky-chest/im_box.png" alt="" />
                </div>
                <div className={s.item}>
                  <img src="/assets/P2E/lucky-chest/im_box.png" alt="" />
                </div>
                <div className={s.item}>
                  <img src="/assets/P2E/lucky-chest/im_box.png" alt="" />
                </div>
                <div className={s.item}>
                  <img src="/assets/P2E/lucky-chest/im_box.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className={s.reward_box}>
            <h3>Items that might be in this Box:</h3>
            <SliderBox />
          </div>

          <div>
            <PopupRollingChest
              visible={rollingChestPopupVisible}
              closePopupRollingChest={() => setRollingChestPopupVisible(false)}
              chestDetail={chestDetail}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
