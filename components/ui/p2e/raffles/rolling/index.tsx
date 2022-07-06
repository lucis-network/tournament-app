import {useEffect, useState} from "react";
import s from './index.module.sass'
import DigitRoll from "components/digit-roll-react/src";
import {b64DecodeUnicode, replaceCharAt} from "../../../../../utils/String";
import {useGetWonTickets} from "../../../../../hooks/p2e/useRaffleDetail";
import {isEmpty, parseInt} from "lodash";
import moment from "moment";
import CountdownTimeEnd from "../timeEnd";
import Countdown from "antd/lib/statistic/Countdown";
import {RaffleDetail, UserTicketGql} from "../../../../../src/generated/graphql_p2e";
import RafflesStore from "src/store/RafflesStore";


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
type Props = {
  raffleUid?: string;
  dataRaffleDetail?: RaffleDetail;
}
const RollingRaffles = (props: Props) => {
  const {raffleUid, dataRaffleDetail} = props;
  const {dataWonTickets} = useGetWonTickets({
    raffle_uid: raffleUid,
    skip: isEmpty(raffleUid)
  },);

  const [currentTicket, setCurrentTicket] = useState('000000');
  const [targetTicket, setTargetTicket] = useState('');
  const [currentRollingIdx, setCurrentRollingIdx] = useState(0);
  const [currentDataIdx, setCurrentDataIdx] = useState(0);
  const [dataWinTicket, setDataWinTicket] = useState<Array<UserTicketGql | undefined>>([]);
  const [checkDisplayTimeEnd, setCheckDisplayTimeEnd] = useState(false);
  const [checkDataWinStore, setCheckDataWinStore] = useState(false);

  const timeEnd = moment(dataRaffleDetail?.end_at)
    .add(dataRaffleDetail?.winner_total ? dataRaffleDetail?.winner_total : 0, "minutes")
    .valueOf();

  useEffect(() => {
    const checkDateInterval =  setInterval(() => {
      if(dataRaffleDetail?.end_at <=  (new Date()).toISOString()) {
        setCheckDisplayTimeEnd(true);
      }
    }, 1000)

    if(checkDisplayTimeEnd)  clearInterval(checkDateInterval);
    return () => {
      clearInterval(checkDateInterval)
    }
  }, [dataRaffleDetail])

  useEffect(() => {
    if (dataWonTickets && RafflesStore.dataWinTicket.length === 0) {
      //setDataWinTicket(Array.from({length: dataWonTickets.length}, (_, i) => undefined))
      RafflesStore.dataWinTicket = Array.from({length: dataWonTickets.length}, (_, i) => undefined);
      console.log("vao day khong");
    }
  }, [dataWonTickets])

  useEffect(() => {
    let rollInterval: NodeJS.Timer;
    if (targetTicket.length == 6) {
      rollInterval = setInterval(() => {
        const new_digit_n = targetTicket[currentRollingIdx];
        if (currentRollingIdx <= 5) {
          if (currentTicket[currentRollingIdx] == new_digit_n) {
            setCurrentTicket(replaceCharAt(currentTicket, currentRollingIdx, ((parseInt(new_digit_n) + 1) % 10).toString()));

            setTimeout(() => {
              setCurrentTicket(replaceCharAt(currentTicket, currentRollingIdx, new_digit_n));
            }, 20)
          } else {
            setCurrentTicket(replaceCharAt(currentTicket, currentRollingIdx, new_digit_n));
          }
        }
      }, 5000);
    }

    return () => {
      clearInterval(rollInterval)
    }
  }, [currentTicket, currentRollingIdx])

  //@ts-ignore
  if (typeof window !== "undefined") window.tmp__setTest = setCurrentTicket

  useEffect(() => {
    let changeIdxInterval: NodeJS.Timer;
    if (targetTicket.length == 6) {
      changeIdxInterval = setInterval(() => {
        setCurrentRollingIdx(currentRollingIdx + 1);
        if (currentRollingIdx == 6) {
          let data = RafflesStore.dataWinTicket;

          if (currentDataIdx > 0) {
            data[currentDataIdx-1] = dataWonTickets![currentDataIdx - 1];
          }
          RafflesStore.dataWinTicket = data;
        }
      }, currentRollingIdx === 6 ? 500 : 5100);

      // if(currentRollingIdx > 6) clearInterval(changeIdxInterval);
    }
    return () => {
      clearInterval(changeIdxInterval)
    }
  }, [currentRollingIdx, targetTicket, currentDataIdx, dataWonTickets, RafflesStore.dataWinTicket])


  useEffect(() => {
    console.log("RafflesStore.dataWinTicket", RafflesStore.dataWinTicket);
  }, [RafflesStore.dataWinTicket])
  // rolling new ticket
  useEffect(() => {
    let currentDataInterval: NodeJS.Timer;
    if (dataWonTickets) {
      currentDataInterval = setInterval(() => {
        const ticketNumber = b64DecodeUnicode(dataWonTickets[currentDataIdx]?.ticket_number ?? '000000');
        setTargetTicket(ticketNumber);
        setCurrentRollingIdx(0);
        setCurrentDataIdx(currentDataIdx + 1);
        setCurrentTicket('000000');
      }, currentDataIdx == 0 ? 5000 : 60000) // xu li lan dau wait 5s. lan tiep theo wait 1m vi moi ticket quay trong 1m

      if (dataWonTickets.length <= currentDataIdx) clearInterval(currentDataInterval);
    }
    return () => {
      clearInterval(currentDataInterval)
    }
  }, [dataWonTickets, currentDataIdx])

  return (
    <div className={s.rafflesWrapper}>
      <h2 className={s.sectionTitle}>Raffle Rolling</h2>
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
          {checkDisplayTimeEnd &&
              <CountdownTimeEnd targetDate={timeEnd}/>
          }
        </div>
      </div>

      <div className={s.recentWin}>
        <span className={s.recentWinTitle}>Recent Win Ticket ID</span>
        <div className={s.recentWinTable}>
          {RafflesStore.dataWinTicket ? RafflesStore.dataWinTicket?.map((item, index: number) => {
            return (
              <>
                <div className={s.recentWinItem} key={`${item?.ticket_number}`}>
                  <span className={s.recentWinItemId}>#{item?.ticket_number ? b64DecodeUnicode(item?.ticket_number) : '------'}</span>
                  <span className={s.recentWinItemName}>{item && `(${item?.user?.profile?.user_name})`}</span>
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

