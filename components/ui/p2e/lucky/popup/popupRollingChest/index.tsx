import { Modal } from "antd";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import s from "./index.module.sass";
import {
  ChestDetail,
  LuckyChestPrize,
} from "../../../../../../src/generated/graphql_p2e";
import Img from "../../../../common/Img";
import PopupRewardChest from "../popupRewardChest";
import {AppEmitter} from "../../../../../../services/emitter";
import {shuffle} from "lodash";
import {isClient} from "../../../../../../utils/Env";

function randOffset(itemWidth: number) {
  let percent = Math.floor(Math.random() * 100);

  // translate from 10 to 95% of item with
  percent = Math.max(10, Math.min(95, percent));

  return itemWidth / 100 * percent;
}

//TODO: resolve memory leak
const duplications = new Array(10).fill(true);

type Props = {
  closePopupRollingChest: () => void;
  visible: boolean;
  chestDetail: ChestDetail;
  chestPrize?: LuckyChestPrize;
};

const PopupRollingChest = (props: Props) => {
  const { visible, closePopupRollingChest, chestDetail, chestPrize: prize } = props;
  const [autoRolling, setAutoRolling] = useState(false)
  const [isPopupRewardChest, setIsPopupRewardChest] = useState(false);

  const prizeShuffled = useMemo(() => {
    return shuffle(chestDetail.prizes)
  }, [chestDetail.prizes]);

  const styles = useMemo(() => {
    if (!isClient) {
      return {
        transform: 'translateX(0)'
      }
    }

    const sliderContainer = document.querySelector('.rollingContainer')
    if (!sliderContainer) {
      return {
        transform: 'translateX(0)'
      }
    }

    const sliderMaxWidth = sliderContainer!.getBoundingClientRect().width
    const itemGap = 8; // 8px on CSS
    const itemElement: Element | null = sliderContainer!.querySelector('.rollingItem')
    const itemWidth = itemElement ? itemElement!.getBoundingClientRect().width : 0
    let prizeIdx = prizeShuffled.findIndex((i) => i.id == prize?.id);
    if (prizeIdx < 0) {
      prizeIdx = 0
    }

    const offset: number = randOffset(itemWidth);
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

    return {
      transform: autoRolling ? `translateX(-${tx}px)` : 'translateX(0px)'
    }
  }, [autoRolling, prize?.id, prizeShuffled])

  useEffect(() => {
    let setAutoRollingTimeout: any
    if (visible) {
      setAutoRolling(false)
      // Start new rolling, need to wait 500ms for browser painting
      setAutoRollingTimeout = setTimeout(() => {
        setAutoRolling(true)
      }, 1000);
    }
    return () => {
      clearTimeout(setAutoRollingTimeout)
    }
  }, [visible])

  useEffect(() => {
    if (visible) {
      const transition = document.querySelector('.rollingEvent');
      //@ts-ignore
      transition.addEventListener('transitionend', () => {
        setTimeout(() => {
          setIsPopupRewardChest(true);
          AppEmitter.emit('refresh_history')
        }, 1000);
      });
    }
  }, [visible])

  const resetAutoRolling = useCallback(() => {
    // Reset rolling if we have prev rolling
    setAutoRolling(false)
  }, [])

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
            <img src="/assets/P2E/lucky-chest/bg_rolling.png" alt="" className={s.bg_rolling_pc} />
            <img src="/assets/P2E/lucky-chest/bg_rolling_mobile.png" alt="" className={s.bg_rolling_mobile} />
            <div
              className="rollingContainer"
            >
              <div
                className={`${s.rolling} rollingEvent`}
                style={styles}
              >
                {
                  duplications.map((i, idx) => {
                    return prizeShuffled.map((prize) => (
                      <div className={`${s.box_item} ${prize?.rarity ?? ''} rollingItem`} key={'k' + idx + prize?.id}>
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
        </div>
        {
          isPopupRewardChest && (
            <PopupRewardChest
              status={isPopupRewardChest}
              closePopupRewardChest={() => setIsPopupRewardChest(false)}
              prize={prize}
              closePopupRollingChest={closePopupRollingChest}
              rarity={prize?.rarity ?? ''}
              resetAutoRolling={resetAutoRolling}
            />
          )
        }
      </Modal>
    </div>
  );
}

export default React.memo(PopupRollingChest);
