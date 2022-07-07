import {useEffect, useState} from "react";
import s from './index.module.sass'
import DigitRoll from "components/digit-roll-react/src";
import {b64DecodeUnicode, replaceCharAt} from "../../../../../utils/String";
import {useGetWonTickets, useMyWonTickets} from "../../../../../hooks/p2e/useRaffleDetail";
import {isEmpty, parseInt} from "lodash";
import moment from "moment";
import CountdownTimeEnd from "../timeEnd";
import {RaffleDetail} from "../../../../../src/generated/graphql_p2e";
import RafflesStore from "src/store/RafflesStore";
import CountdownTimeBefore from "../timeBefore";
import PopupClaimTicket from "../popup/popupClaimTickets";


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
  const {dataWonTickets, refetch} = useGetWonTickets({
    raffle_uid: raffleUid,
    skip: isEmpty(raffleUid)
  },);
  const {dataMyWonTickets, refetchMyWonTickets} = useMyWonTickets({
    raffle_uid: raffleUid,
    skip: isEmpty(raffleUid)
  },);

  const [currentTicket, setCurrentTicket] = useState('000000');
  const [targetTicket, setTargetTicket] = useState('');
  const [currentRollingIdx, setCurrentRollingIdx] = useState(0);
  const [currentDataIdx, setCurrentDataIdx] = useState(0);
  const [checkDisplayTimeEnd, setCheckDisplayTimeEnd] = useState(false);
  const [checkDisplayEndAt, setCheckDisplayEndAt] = useState(false);
  const [isPopupClaim, setIsPopupClaim] = useState(false);
  const [isCheckHasData, setIsCheckHasData] = useState(false);

  useEffect(() => {
    if(dataRaffleDetail?.status === "CLOSED" && dataWonTickets){
      RafflesStore.dataWinTicket = dataWonTickets;
    }
  }, [dataRaffleDetail, dataWonTickets]);

  useEffect(() => {
    if(dataMyWonTickets &&  dataRaffleDetail?.status === "CLOSED"){
      dataMyWonTickets.forEach((item) => {
        if(!item?.is_claimed) setIsPopupClaim(true);
      })
    }
  }, [dataMyWonTickets, dataRaffleDetail]);
  const timeEnd = moment(dataRaffleDetail?.end_at)
    .add(dataRaffleDetail?.winner_total ? dataRaffleDetail?.winner_total : 0, "minutes")
    .valueOf();

  const endAtBefore = moment(dataRaffleDetail?.end_at)
    .valueOf();

  useEffect(() => {
    const checkDateInterval =  setInterval(() => {
      if(dataRaffleDetail?.end_at <=  (new Date()).toISOString()) {
        setCheckDisplayTimeEnd(true);
      }
    }, 1000)

    if(checkDisplayTimeEnd) {
      clearInterval(checkDateInterval);
      setCheckDisplayEndAt(false);
    };
    return () => {
      clearInterval(checkDateInterval)
    }
  }, [dataRaffleDetail])

  useEffect(() => {
    const checkDateInterval =  setInterval(() => {
      const dateNow = moment(new Date()).valueOf();
      const endAt = moment(dataRaffleDetail?.end_at)
        .subtract(5, "minutes")
        .valueOf()
      ;
      const timeBefore = (endAtBefore - dateNow)/(1000 * 60);

      if(timeBefore <= 5) {
        setCheckDisplayEndAt(true);
      }
    }, 1000)
    if(checkDisplayEndAt)  clearInterval(checkDateInterval);
    return () => {
      clearInterval(checkDateInterval)
    }
  }, [dataRaffleDetail])

  useEffect(() => {
    if (dataWonTickets && RafflesStore.dataWinTicket.length === 0) {
      RafflesStore.dataWinTicket = Array.from({length: dataWonTickets.length}, (_, i) => undefined);
    }
  }, [dataWonTickets])

  useEffect(() => {
    let rollInterval: NodeJS.Timer;
    if (targetTicket.length == 6 && checkDisplayTimeEnd && isCheckHasData && dataRaffleDetail?.status === "ENABLED") {
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
      }, currentRollingIdx === 0 ? 5000 : 5000);
    }

    return () => {
      clearInterval(rollInterval)
    }
  }, [currentTicket, currentRollingIdx, checkDisplayTimeEnd, isCheckHasData, dataRaffleDetail])

  //@ts-ignore
  if (typeof window !== "undefined") window.tmp__setTest = setCurrentTicket

  useEffect(() => {
    let changeIdxInterval: NodeJS.Timer;
    if (targetTicket.length == 6 && checkDisplayTimeEnd && isCheckHasData && dataRaffleDetail?.status === "ENABLED") {
      changeIdxInterval = setInterval(() => {
        setCurrentRollingIdx(currentRollingIdx + 1);
        if (currentRollingIdx == 6) {
          let data = RafflesStore.dataWinTicket;

          if (currentDataIdx > 0) {
            data[currentDataIdx-1] = dataWonTickets![currentDataIdx - 1];
          }
          RafflesStore.dataWinTicket = data;
        }
      }, currentRollingIdx === 6 ? 0 : 5100);
    }
    return () => {
      clearInterval(changeIdxInterval)
    }
  }, [currentRollingIdx, targetTicket, currentDataIdx, dataWonTickets, RafflesStore.dataWinTicket, checkDisplayTimeEnd, isCheckHasData, dataRaffleDetail])

  // rolling new ticket
  useEffect(() => {
    let currentDataInterval: NodeJS.Timer;
    if (dataWonTickets && checkDisplayTimeEnd && dataRaffleDetail?.status === "ENABLED") {
      currentDataInterval = setInterval(() => {
        const ticketNumber = b64DecodeUnicode(dataWonTickets[currentDataIdx]?.ticket_number ?? '000000');
        setTargetTicket(ticketNumber);
        setCurrentRollingIdx(0);
        setCurrentDataIdx(currentDataIdx + 1);
        //setCurrentTicket('000000');
        setIsCheckHasData(true);
      }, currentDataIdx == 0 ? 0 : 60000) // xu li lan dau wait 0s. lan tiep theo wait 1m vi moi ticket quay trong 1m

      if (dataWonTickets.length <= currentDataIdx) clearInterval(currentDataInterval);
    }
    return () => {
      clearInterval(currentDataInterval)
    }
  }, [dataWonTickets, currentDataIdx, checkDisplayTimeEnd, dataRaffleDetail])

  const closePopupClaimTicket = () => {
    setIsPopupClaim(false);
  }
  return (
    <div className={s.rafflesWrapper}>
      <h2 className={s.sectionTitle}>Raffle Rolling</h2>

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
      {
        dataRaffleDetail?.status !== "CLOSED" &&
          <>
              <div className={s.calender}>
                {
                  checkDisplayEndAt && !checkDisplayTimeEnd &&
                    <>
                        <div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className={s.rolling}
                                src={`/assets/Raffles/calender.svg`}
                                alt=""
                            />
                        </div>
                        <div className={s.rollingEnd}>
                            <span>Rolling at</span>
                        </div>
                        <div className={s.rollingTime}>
                            <CountdownTimeBefore targetDate={endAtBefore}/>
                        </div>
                    </>
                }
                {
                  checkDisplayTimeEnd &&
                    <>
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
                            <CountdownTimeEnd targetDate={timeEnd}/>
                        </div>
                    </>
                }
              </div>
          </>
      }

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

    <PopupClaimTicket status={isPopupClaim} dataMyWonTickets={dataMyWonTickets} raffleUid={raffleUid} closePopupClaimTicket={closePopupClaimTicket}/>
    </div>
  )
}
export default RollingRaffles

