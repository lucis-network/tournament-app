import {useEffect, useState} from "react";
import s from './index.module.sass'
import DigitRoll from "components/digit-roll-react/src";
import {replaceCharAt} from "../../../../../utils/String";
import {useGetWonTickets} from "../../../../../hooks/p2e/useRaffleDetail";
import {isEmpty, parseInt} from "lodash";


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

  const {dataWonTickets} = useGetWonTickets({
    raffle_uid: "cl56higb718860jnwey5mk5qr",
  });
  const [currentTicket, setCurrentTicket] = useState('000000');
  const [targetTicket, setTargetTicket] = useState('000000');
  const [currentRollingIdx, setCurrentRollingIdx] = useState(0);
  const [currentDataIdx, setCurrentDataIdx] = useState(0);
  const [dataWinTicket, setDataWinTicket] = useState<[]>([]);

  useEffect(() => {
    const rollInterval = setInterval(() => {
      const new_digit_n = targetTicket[currentRollingIdx];
      if (currentRollingIdx <= 5) {
        if (currentTicket[currentRollingIdx] == new_digit_n) {
          setCurrentTicket(replaceCharAt(currentTicket, currentRollingIdx, ((parseInt(new_digit_n) + 1) % 10).toString()));

          setTimeout(() => {
            setCurrentTicket(replaceCharAt(currentTicket, currentRollingIdx, new_digit_n));
          }, 20)
        }
        else {
          setCurrentTicket(replaceCharAt(currentTicket, currentRollingIdx, new_digit_n));
        }
      }
    }, 5000);

    return () => {
      clearInterval(rollInterval)
    }
  }, [currentTicket, currentRollingIdx])

  //@ts-ignore
  if (typeof window !== "undefined") window.tmp__setTest = setCurrentTicket

  useEffect(() => {
    const changeIdxInterval = setInterval(() => {
      setCurrentRollingIdx(currentRollingIdx + 1);
      console.log("currentRollingIdx", currentRollingIdx);
      if (currentRollingIdx == 6) {
        let data = dataWinTicket;
        // @ts-ignore
        data?.push(dataWonTickets[currentDataIdx-1]);
        setDataWinTicket(data);
      }
    },currentRollingIdx === 6 ? 500 : 5100);


    return () => {
      clearInterval(changeIdxInterval)
    }
  }, [currentRollingIdx, dataWinTicket])


  useEffect(() => {
    let currentDataInterval: NodeJS.Timer;
    if (dataWonTickets) {
      currentDataInterval = setInterval(() => {
        const ticketNumber = b64DecodeUnicode(dataWonTickets[currentDataIdx]?.ticket_number);
        setTargetTicket(ticketNumber);
        setCurrentRollingIdx(0);
        setCurrentDataIdx(currentDataIdx + 1);
      }, currentDataIdx == 0 ? 5000 : 60000)

      if (dataWonTickets.length <= currentDataIdx) clearInterval(currentDataInterval);
    }
    return () => {
      clearInterval(currentDataInterval)
    }
  }, [dataWonTickets, currentDataIdx])

  // Decoding base64 ⇢ UTF8
  const b64DecodeUnicode = (str: string) => {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(str), function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
  }

  return (
    <div className={s.rafflesWrapper}>
      <h2 className={s.sectionTitle}>Raffle Rooling</h2>
      {/*<div>*/}
      {/*  <p className={s.digit}>currentTicket: {currentTicket}</p>*/}
      {/*</div>*/}

      <div className={s.rolling}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/assets/Raffles/rolling.svg`}
          alt=""
        />
        <div className={s.rollingNumber}>
          <div>
            <Digit value={parseInt(currentTicket[0])} rolling={currentRollingIdx === 0}/>
          </div>
          <div>
            <Digit value={parseInt(currentTicket[1])} rolling={currentRollingIdx === 1}/>
          </div>
          <div>
            <Digit value={parseInt(currentTicket[2])} rolling={currentRollingIdx === 2}/>
          </div>
          <div>
            <Digit value={parseInt(currentTicket[3])} rolling={currentRollingIdx === 3}/>
          </div>
          <div>
            <Digit value={parseInt(currentTicket[4])} rolling={currentRollingIdx === 4}/>
          </div>
          <div>
            <Digit value={parseInt(currentTicket[5])} rolling={currentRollingIdx === 5}/>
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
          {dataWinTicket ? dataWinTicket?.map((item: any, index: number) => {
            return (
              <>
                {/*key={`${item?.ticket_number}`}*/}
                <div className={s.recentWinItem}>
                  <span className={s.recentWinItemId}>#{b64DecodeUnicode(item?.ticket_number)}</span>
                  <span className={s.recentWinItemName}>({item?.user?.profile?.user_name})</span>
                </div>
              </>
            );
          }) : " "}
        </div>
      </div>
    </div>
  )
}
export default RollingRaffles

