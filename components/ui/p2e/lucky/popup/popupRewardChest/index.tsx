import { Modal } from "antd";
import s from "./index.module.sass";

type Props = {
  closePopupRewardChest?: () => void;
  status: boolean;
};

const PopupRewardChest = (props: Props) => {
  const { status, closePopupRewardChest } = props;

  return (
    <div className={s.wrapper_popup_reward_chest}>
      <Modal
        visible={status}
        centered
        wrapClassName={s.content_modal}
        footer={null}
        onCancel={closePopupRewardChest}
        width={"100%"}
      >
        <div className={s.container}>
          <div className={s.wrapper}>
            <div className={s.reward_title}>
              Weapon drawing
            </div>
            <div className={s.reward_img}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/Raffles/imageReward.png"/>
            </div>
            <div className={s.reward_des}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </div>
          </div>

        </div>
      </Modal>
    </div>
  );
};

export default PopupRewardChest;
