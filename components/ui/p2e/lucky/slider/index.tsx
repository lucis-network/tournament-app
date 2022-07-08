import React from 'react';
import { useWindowSize } from '../../../../../hooks/useWindowSize'

import s from './RewardBox.module.sass'
const SliderBox: React.FC = () => {
    const [ width ] = useWindowSize()

  return (
    <div className={s.wrapper}>
      <div className={s.block_reward_box} style={{width : width - 40}}>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
        <div className={s.item}>
            <img src="/assets/P2E/luckychest/im_box.png" alt="" />
            <div className={s.title}>
                <p>Good luck!</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SliderBox;