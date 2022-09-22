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

  function getPrizeTitle(item: any) {
    if (!item) {
      return "";
    }
    // console.log("item:", item);
    let isSHowNumberOfPrize =
      item.numberOfPrize != null && item.numberOfPrize > 1;
    return `${
      item.currencyAmount != null && item.currencyAmount > 0
        ? item.currencyAmount
        : isSHowNumberOfPrize
        ? item.numberOfPrize
        : ""
    } ${item.title}${isSHowNumberOfPrize ? "s" : ""}`;
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
