import {useEffect, useState} from "react";
import s from './index.module.sass'
// import DigitRoll from "digit-roll-react";
import DigitRoll from "components/digit-roll-react/src";


const RollingRaffles = () => {
  const [value, setValue] = useState(0);
  const getRandomInt = (min: number, max: number) => (Math.floor(Math.random() * (max - min + 1)) + min);


  const [currentTicket, setCurrentTicket] = useState('000000');

  useEffect(() => {
    const rollInterval = setInterval(() => {
      const digit6 = currentTicket[5];
      const newDigit6 = digit6 === '0' ? '9' : '0';
      setCurrentTicket(currentTicket.substring(0, currentTicket.length - 1) + newDigit6)
    }, 6000);

    return () => {
      clearInterval(rollInterval)
    }
  }, [currentTicket])

  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  // @ts-ignore
  return (
    <div className={s.rafflesWrapper}>
      <section className={s.sectionRecentWinners}>
        <div className="lucis-container-2">
          <h2 className={s.sectionTitle}>Raffle Rooling</h2>


          <div>
            <p>currentTicket: {currentTicket}</p>
            {/*Roll the last ticket digit*/}
            <DigitRoll
              className={"digit"}
              length={1} divider=""
              num={parseInt(currentTicket[5])}
              rollingDuration={5000}
              oneRoundDuration={1000}
            />
          </div>

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