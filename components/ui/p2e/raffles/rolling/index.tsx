import s from './index.module.sass'
// @ts-ignore
import AnimatedNumber from 'react-animated-number';
import {useEffect, useState} from "react";
// @ts-ignore
import DigitRoll from "digit-roll-react";

import {Image} from "antd";

const RollingRaffles = () => {
  const [value, setValue] = useState(0);

  const getRandomInt = (min: number, max: number) => (Math.floor(Math.random() * (max - min + 1)) + min);

  useEffect(() => {
    setInterval(() => {
      setValue(value == 0 ? 9 : 0)
    }, 1000);
  })

  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  // @ts-ignore
  return (
    <div className={s.rafflesWrapper}>
      <section className={s.sectionRecentWinners}>
        <div className="lucis-container-2">
          <h2 className={s.sectionTitle}>Raffle Rooling</h2>
          {/*<AnimatedNumber*/}
          {/*  style={{*/}
          {/*    // transition: '5s ease-out',*/}
          {/*    // transitionProperty: 'background-color, color',*/}
          {/*    fontSize: 40,*/}

          {/*  }}*/}
          {/*  // frameStyle={(perc: any) => (*/}
          {/*  //   perc === 100 ? {} : {backgroundColor: '#ffeb3b'}*/}
          {/*  // )}*/}
          {/*  stepPrecision={0}*/}
          {/*  value={value}*/}
          {/*  formatValue={(n: any) => `${n}`}/>*/}
          {/*<div><DigitRoll length={9} divider="" delay="1" /></div>*/}
          <div className={s.rolling}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/assets/Raffles/rolling.svg`}
              alt=""
            />
            <div className={s.rollingNumber}>
              <div>
                1
              </div>
              <div>
                0
              </div>
              <div>
                1
              </div>
              <div>
                0
              </div>
              <div>
                9
              </div>
              <div>
                8
              </div>
            </div>
          </div>

          <div className={s.calender}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={s.rolling}
                src={`/assets/Raffles/calender.svg`}
                alt=""
              />
            </div>
            <div className={s.rollingEnd}>
              <span>End rolling at</span>
            </div>
            <div className={s.rollingTime}>
              <span>00:09:54</span>
            </div>
          </div>

          <div className={s.recentWin}>
            <span className={s.recentWinTitle}>Recent Win Ticket ID</span>
            <div className={s.recentWinTable}>
              <div className={s.recentWinItem}>
                <span className={s.recentWinItemId}>#11123</span>
                <span className={s.recentWinItemName}>(Helenngo)</span>
              </div>
              <div className={s.recentWinItem}>
                <span className={s.recentWinItemId}>#11123</span>
                <span className={s.recentWinItemName}>(Helenngo)</span>
              </div>
              <div className={s.recentWinItem}>
                <span className={s.recentWinItemId}>#11123</span>
                <span className={s.recentWinItemName}>(Helenngo)</span>
              </div>
              <div className={s.recentWinItem}>
                <span className={s.recentWinItemId}>#11123</span>
                <span className={s.recentWinItemName}>(Helenngo)</span>
              </div>
            </div>
          </div>

        </div>
        <div>

        </div>
      </section>
    </div>
  )
}
export default RollingRaffles