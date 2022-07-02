import {useEffect, useState} from "react";
import s from './index.module.sass'
// import DigitRoll from "digit-roll-react";
import DigitRoll from "components/digit-roll-react/src";
import { randInt } from "../../../../../utils/Number";
import { replaceAt } from "../../../../../utils/String";


const Digit = function (props: {
  value: number,
  rolling: boolean,
}) {
  const {value, rolling} = props;

  return (
    <DigitRoll
      className={s.digit}
      length={1} divider=""
      num={value}
      rolling={rolling}
      rollingDuration={5000}
      oneRoundDuration={1000}
    />
  )
}

const RollingRaffles = () => {

  const [currentTicket, setCurrentTicket] = useState('000000');
  const [currentRollingIdx, setCurrentRollingIdx] = useState(5);

  useEffect(() => {
    const rollInterval = setInterval(() => {
      const new_digit_n = randInt(0, 9).toString();
      setCurrentTicket(replaceAt(currentTicket, currentRollingIdx, new_digit_n))
    }, 6000);

    return () => {
      clearInterval(rollInterval)
    }
  }, [currentTicket, currentRollingIdx])

  useEffect(() => {
    const changeIdxInterval = setInterval(() => {
      setCurrentRollingIdx(randInt(0, 5));
    }, 20000);

    return () => {
      clearInterval(changeIdxInterval)
    }
  }, [])


  return (
    <div className={s.rafflesWrapper}>
      <section className={s.sectionRecentWinners}>
        <div className="lucis-container-2">
          <h2 className={s.sectionTitle}>Raffle Rooling</h2>


          <div>
            <p className={s.digit}>currentTicket: {currentTicket}</p>

            <div className={s.digits}>
              <Digit value={parseInt(currentTicket[0])} rolling={currentRollingIdx === 0} />
              <Digit value={parseInt(currentTicket[1])} rolling={currentRollingIdx === 1} />
              <Digit value={parseInt(currentTicket[2])} rolling={currentRollingIdx === 2} />
              <Digit value={parseInt(currentTicket[3])} rolling={currentRollingIdx === 3} />
              <Digit value={parseInt(currentTicket[4])} rolling={currentRollingIdx === 4} />
              <Digit value={parseInt(currentTicket[5])} rolling={currentRollingIdx === 5} />
            </div>

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