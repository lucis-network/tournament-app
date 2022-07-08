import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useWindowSize } from '../../../../../hooks/useWindowSize'
import s from './PopupBox.module.sass';
import SliderBox from '../slider'


export default function PopUpOpenBox() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [width] = useWindowSize()
    console.log(width);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div className={s.wrapper}>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal className={s.modal} width={'100%'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <div className={s.content_box}>
                        <div className={s.content_left}>
                            <h3>OPEN BOX !</h3>
                            <p>Open the box to receive many attractive gifts</p>
                            <div className={s.im_box}>
                                <img src="/assets/P2E/luckychest/im_box.png" alt="" />
                                <div className={s.btn_open}>
                                    <button>Open</button>
                                    <div className={s.number_coin}>
                                        <p>5.000</p>
                                        <img src="/assets/P2E/luckychest/ic_lucis_coin.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.content_right}>
                            <div className={s.line}>
                                {
                                    width >= 1024 ?
                                        <img src="/assets/P2E/luckychest/ic_line.svg" alt="" />
                                        :
                                        <img src="/assets/P2E/luckychest/ic_line_top.png" alt="" />
                                }
                            </div>
                            <div className={s.block_item}>
                                <div className={s.item}>
                                    <img src="/assets/P2E/luckychest/im_box.png" alt="" />
                                </div>
                                <div className={s.item}>
                                    <img src="/assets/P2E/luckychest/im_box.png" alt="" />
                                </div>
                                <div className={s.item}>
                                    <img src="/assets/P2E/luckychest/im_box.png" alt="" />
                                </div>
                                <div className={s.item}>
                                    <img src="/assets/P2E/luckychest/im_box.png" alt="" />
                                </div>
                                <div className={s.item}>
                                    <img src="/assets/P2E/luckychest/im_box.png" alt="" />
                                </div>
                                <div className={s.item}>
                                    <img src="/assets/P2E/luckychest/im_box.png" alt="" />
                                </div>
                                <div className={s.item}>
                                    <img src="/assets/P2E/luckychest/im_box.png" alt="" />
                                </div>
                                <div className={s.item}>
                                    <img src="/assets/P2E/luckychest/im_box.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={s.reward_box}>
                        <h3>Items that might be in this Box:</h3>
                        <SliderBox />
                    </div>
                </div>
            </Modal>
        </div>
    )
}