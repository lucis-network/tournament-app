import { Modal } from "antd";
import { LuckyChestPrize, LuckyChestPrizeGql } from "src/generated/graphql_p2e";
import s from "./index.module.sass";
import Img from "../../../../common/Img";
import React from "react";

type Props = {
  closePopupRewardChest: () => void;
  status: boolean;
  prize?: LuckyChestPrize;
  closePopupRollingChest: () => void;
  rarity: string;
  resetAutoRolling: () => void;
};

const PopupRewardChest = (props: Props) => {
  const {
    status,
    closePopupRewardChest,
    closePopupRollingChest,
    prize,
    resetAutoRolling,
  } = props;

  function getPrizeTitle(item: LuckyChestPrize) {
    if (!item) {
      return "";
    }
    return `${item.title}`;
    // return `${
    //   item.amount_of_currency != null && item.amount_of_currency > 0
    //     ? item.amount_of_currency
    //     : item.number_of_prize != null && item.number_of_prize > 1
    //     ? item.number_of_prize
    //     : item.number_of_prize
    // } ${item.title}`;
  }

  return (
    <div className={s.wrapper_popup_reward_chest}>
      <Modal
        visible={status}
        centered
        wrapClassName={s.content_modal}
        footer={null}
        onCancel={() => {
          closePopupRollingChest();
          closePopupRewardChest();
          resetAutoRolling();
        }}
        width={"100%"}
      >
        <div className={s.container}>
          <div className={s.wrapper}>
            <div className={s.reward_title}>{getPrizeTitle(prize!)}</div>
            <div className={`${s.reward_img} ${props?.rarity ?? ""}`}>
              <Img
                src={prize?.img as string}
                srcFallback="/assets/Raffles/imageReward.png"
              />
            </div>
            <div className={s.reward_des}>{prize?.desc}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopupRewardChest;
