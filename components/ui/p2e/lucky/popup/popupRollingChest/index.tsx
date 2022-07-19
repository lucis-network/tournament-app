import { Modal } from "antd";
import { useWindowSize } from "hooks/useWindowSize";
import React, { useEffect, useState } from "react";
import s from "./index.module.sass";
import {
  ChestDetail,
  LuckyChestTier,
  LuckyChestType,
  OpenChestResponse
} from "../../../../../../src/generated/graphql_p2e";
import Img from "../../../../common/Img";
import PopupRewardChest from "../popupRewardChest";
import {ApolloQueryResult} from "@apollo/client";
import {useGetLuckyChestUserInfo} from "../../../../../../hooks/p2e/luckyChest/useLuckyChest";
import {AppEmitter} from "../../../../../../services/emitter";

type Props = {
  closePopupRollingChest: () => void;
  visible: boolean;
  chestDetail: ChestDetail;
  chestResponse?: any;
};

const PopupRollingChest = (props: Props) => {
  const { visible, closePopupRollingChest, chestDetail, chestResponse } = props;
  const [viewportWidth] = useWindowSize();
  const [autoRolling, setAutoRolling] = useState(false)
  const [isPopupRewardChest, setIsPopupRewardChest] = useState(false);

  const prize = chestResponse?.prize!;

  console.log("chestResponse", chestResponse);
  const duplications = new Array(10).fill(true);

  // Follow CSS
  function getItemWidth(screenWidth: number) {
    if (screenWidth >= 1280) {
      return 214
    } else if (screenWidth >= 768) {
      return 160
    } else {
      return 100
    }
  }
  function getSliderPadding(screenWidth: number) {
    if (screenWidth >= 1280) {
      return 110
    } else if (screenWidth >= 768) {
      return 50
    } else {
      return 25
    }
  }

  function randOffset() {
    let percent = Math.floor(Math.random() * 100);

    // translate from 10 to 95% of item with
    percent = Math.max(10, Math.min(95, percent));
    console.log('{randOffset} percent: ', percent);

    return itemWidth / 100 * percent;
  }

  const sliderContainerPadding = getSliderPadding(viewportWidth);
  const sliderMaxWidth = viewportWidth - sliderContainerPadding * 2;

  const styleWidth = {
    maxWidth: sliderMaxWidth,
    overflow: "hidden",
    margin: "0 auto",
  };

  const itemGap = 8; // 8px on CSS
  const itemWidth = getItemWidth(viewportWidth);
  const prizeShuffled = chestDetail.prizes; // TODO: shuffle this arr

  let prizeIdx = prizeShuffled.findIndex((i) => i.id == prize.id);
  if (prizeIdx < 0) {
    prizeIdx = 0
  }

  const offset: number = randOffset();
  const rollOverBlockCount = 6; // How many block of duplications we rollover
  const halfOfSliderWidth = sliderMaxWidth / 2;

  /*
  The beginning of item block
   */
  const totalItemWidth = itemWidth + itemGap;
  const txOfItemSelf = totalItemWidth * prizeIdx;
  const txOfRollingBlock = rollOverBlockCount * prizeShuffled.length * totalItemWidth;
  const txOfItem = txOfItemSelf + txOfRollingBlock;
  const tx = txOfItem + offset - halfOfSliderWidth + itemGap / 2;
  const styles = {
    transform: autoRolling ? `translateX(-${tx}px)` : 'translateX(0px)'
  }

  // console.log('{PopupRollingChest} : tx', {
  //   sliderContainerPadding,
  //   halfOfSliderWidth,
  //   prizeShuffled,
  //   totalItemWidth,
  //   txOfItemSelf,
  //   txOfRollingBlock,
  //   txOfItem,
  //   tx,
  // });

  useEffect(() => {
    if (visible) {
      // Reset rolling if we have prev rolling
      setAutoRolling(false)

      // Start new rolling, need to wait 500ms for browser painting
      setTimeout(() => {
        setAutoRolling(true)
      }, 1000);
    }

  }, [visible])

  useEffect(() => {
    if(visible) {
      const transition = document.querySelector('.rollingEvent');
      //@ts-ignore
      transition.addEventListener('transitionend', () => {
        setIsPopupRewardChest(true);
        AppEmitter.emit('refresh_history')
      });
    }
  }, [visible])

  return (
    <div className={s.wrapper_popup_rolling_chest}>
      <Modal
        visible={visible}
        centered
        wrapClassName={s.content_modal}
        footer={null}
        closable={false}
        width={"100%"}
      >
        <div className={s.container}>
          <div className={s.bg_rolling}>
            <img src="/assets/P2E/lucky-chest/bg_rolling.png" alt="" />
          </div>
          <div
            style={styleWidth}
          >
          <div
            className={`${s.rolling} rollingEvent`}
            style={styles}
          >
            {
              duplications.map((i, idx) => {
                return prizeShuffled.map((prize) => (
                  <div className={`${s.box_item} ${prize?.rarity ?? ''}`} key={'k' + idx + prize?.id}>
                    <div className={s.prizeImg}>
                      <Img src={prize?.img as string} srcFallback="/assets/P2E/lucky-chest/im_box.png" />
                    </div>
                    <div className={s.title}>
                      <p>{prize?.title}</p>
                    </div>
                  </div>
                ))
              })
            }
          </div>
          </div>
        </div>
        {
          isPopupRewardChest && <PopupRewardChest
                status={isPopupRewardChest}
                closePopupRewardChest={() => setIsPopupRewardChest(false)}
                prize={prize}
                closePopupRollingChest={closePopupRollingChest}
                rarity={prize.rarity}
            />
        }
      </Modal>
    </div>
  );
};

export default PopupRollingChest;
