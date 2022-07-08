import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useWindowSize } from "../../../../../hooks/useWindowSize";
import s from "./PopupBox.module.sass";
import SliderBox from "../slider";
import PopupRollingChest from "./popupRollingChest";
import ButtonOpenBox from "../button/buttonOpen";
import PopupRewardChest from "./popupRewardChest";

type Props = {
  status: boolean;
  closePopupOpenBox: () => void;
};
export default function PopUpOpenBox(props: Props) {
  const { status, closePopupOpenBox } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPopupRollingChest, setIsPopupRollingChest] = useState(false);
  const [isPopupRewardChest, setIsPopupRewardChest] = useState(false);
  const [width] = useWindowSize();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={s.wrapper}>
      <Modal
        className={s.modal}
        width={"100%"}
        visible={status}
        onOk={closePopupOpenBox}
        onCancel={closePopupOpenBox}
      >
        <div className={s.container}>
          <div className={s.wrapper}>
            <div className={s.content_box}>
              <h3 className={s.content_box_heading}>OPEN BOX !</h3>
              <p className={s.content_box_des}>Open the box to receive many attractive gifts</p>
              <div className={s.content_box_img}>
                <img src="/assets/P2E/luckychest/im_box.png" alt=""/>
              </div>
              <div className={s.content_right}>
                <div className={s.line}>
                  {width >= 1024 ? (
                    <img src="/assets/P2E/luckychest/ic_line.svg" alt=""/>
                  ) : (
                    <img src="/assets/P2E/luckychest/ic_line_top.png" alt=""/>
                  )}
                </div>
                <div className={s.block_item}>
                  <div className={s.item}>
                    <img src="/assets/P2E/luckychest/im_box.png" alt=""/>
                  </div>
                  <div className={s.item}>
                    <img src="/assets/P2E/luckychest/im_box.png" alt=""/>
                  </div>
                  <div className={s.item}>
                    <img src="/assets/P2E/luckychest/im_box.png" alt=""/>
                  </div>
                  <div className={s.item}>
                    <img src="/assets/P2E/luckychest/im_box.png" alt=""/>
                  </div>
                  <div className={s.item}>
                    <img src="/assets/P2E/luckychest/im_box.png" alt=""/>
                  </div>
                  <div className={s.item}>
                    <img src="/assets/P2E/luckychest/im_box.png" alt=""/>
                  </div>
                  <div className={s.item}>
                    <img src="/assets/P2E/luckychest/im_box.png" alt=""/>
                  </div>
                  <div className={s.item}>
                    <img src="/assets/P2E/luckychest/im_box.png" alt=""/>
                  </div>
                </div>
              </div>
              <div className={s.im_box}>
                <div className={s.btn_open}>
                  <div onClick={() => setIsPopupRollingChest(true)}>
                    <ButtonOpenBox>Open</ButtonOpenBox>
                  </div>
                  {/*<div onClick={() => setIsPopupRewardChest(true)}>*/}
                  {/*  <ButtonOpenBox>OpenChest</ButtonOpenBox>*/}
                  {/*</div>*/}
                  <div className={s.number_coin}>
                    <p>5.000</p>
                    <img
                      src="/assets/P2E/luckychest/ic_lucis_coin.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              {/*<div className={s.content_left}>*/}
              {/*  <h3>OPEN BOX !</h3>*/}
              {/*  <p>Open the box to receive many attractive gifts</p>*/}
              {/*  <div className={s.im_box}>*/}
              {/*    <img src="/assets/P2E/luckychest/im_box.png" alt=""/>*/}
              {/*    <div className={s.btn_open}>*/}
              {/*      <div onClick={() => setIsPopupRollingChest(true)}>*/}
              {/*        <ButtonOpenBox>Open</ButtonOpenBox>*/}
              {/*      </div>*/}
              {/*      /!*<div onClick={() => setIsPopupRewardChest(true)}>*!/*/}
              {/*      /!*  <ButtonOpenBox>OpenChest</ButtonOpenBox>*!/*/}
              {/*      /!*</div>*!/*/}
              {/*      <div className={s.number_coin}>*/}
              {/*        <p>5.000</p>*/}
              {/*        <img*/}
              {/*          src="/assets/P2E/luckychest/ic_lucis_coin.png"*/}
              {/*          alt=""*/}
              {/*        />*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>

          <div className={s.reward_box}>
            <h3>Items that might be in this Box:</h3>
            <SliderBox />
          </div>
        </div>
          <div>
            <PopupRollingChest
              status={isPopupRollingChest}
              closePopupRollingChest={() => setIsPopupRollingChest(false)}
            />
            <PopupRewardChest
              status={isPopupRewardChest}
              closePopupRewardChest={() => setIsPopupRewardChest(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
