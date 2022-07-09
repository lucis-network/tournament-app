import React from 'react';
import { useWindowSize } from '../../../../../hooks/useWindowSize'

import s from './RewardBox.module.sass'
import {ChestDetail} from "../../../../../src/generated/graphql_p2e";

type Props = {
  chestDetail: ChestDetail;
};

export default function SliderBox (props: Props)  {
  const [ width ] = useWindowSize()
  const { chestDetail } = props;
  const prizeShuffled = chestDetail.prizes;

  return (
    <div className={s.wrapper}>
      <div className={s.block_reward_box} style={{width : width - 40}}>
        {prizeShuffled.map((prize, index) => {
          return (
            <div className={s.item} key={'k' + index + prize?.id}>
              <img src={prize.img ? prize.img : "/assets/P2E/lucky-chest/im_box.png"} alt=""/>
              <div className={s.title}>
                <p>{prize?.title}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};
