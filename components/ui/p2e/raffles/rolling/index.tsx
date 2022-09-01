import {useEffect, useState} from "react";
import s from './index.module.sass'
import DigitRoll from "components/digit-roll-react/src";
import {fromBinary, replaceCharAt} from "../../../../../utils/String";
import {useMyWonTickets} from "../../../../../hooks/p2e/useRaffleDetail";
import {isEmpty, parseInt} from "lodash";
import moment from "moment";
import {RaffleDetail, UserTicketGql} from "../../../../../src/generated/graphql_p2e";

import {ApolloQueryResult} from "@apollo/client";
import RafflesStore from "../../../../../src/store/RafflesStore";
import CountdownTimeBefore from "../timeBefore";
import CountdownTimeEnd from "../timeEnd";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import PopupClaimTicket from "../popup/popupClaimTickets";

const Digit = function (props: {
  value: number,
  rolling: boolean,
  realtime: boolean,
}) {
  const {value, rolling, realtime} = props;

  return (
    <DigitRoll
      className={s.digit}
      length={1} divider=""
      num={value}
      rolling={rolling}
      rollingDuration={realtime ? 4900 : 1000}
      oneRoundDuration={1000}
    />
  )
}
type Props = {
  raffleUid?: string;
  dataRaffleDetail?: RaffleDetail;
  refetchRaffleDetail: () => Promise<ApolloQueryResult<any>>;
  dataWonTickets?: string[];
}

const antIcon = <LoadingOutlined style={{fontSize: 20, color: "#00F9FF"}} spin/>;

const RollingRaffles = (props: Props) => {
  const {raffleUid, dataRaffleDetail, dataWonTickets, refetchRaffleDetail} = props;

  const {dataMyWonTickets, refetchMyWonTickets} = useMyWonTickets({
    raffle_uid: raffleUid,
    skip: isEmpty(raffleUid)
  },);

  const [currentTicket, setCurrentTicket] = useState('000000');
  const [targetTicket, setTargetTicket] = useState('000000');
  const [timeLine, setTimeLine] = useState([]);
  const [currentRollingIdx, setCurrentRollingIdx] = useState(0);
  const [isCheckLoading, setIsCheckLoading] = useState(0);
  const [dataTickets, setDataTickets] = useState([]);

  const [checkDisplayEndAt, setCheckDisplayEndAt] = useState(false);
  const [checkDisplayTimeEnd, setCheckDisplayTimeEnd] = useState(false);
  const [isCheckFirstTime, setIsCheckFistTime] = useState(false);
  const [isPopupClaim, setIsPopupClaim] = useState(false);
  const [isCheckStatusClosed, setIsCheckStatusClosed] = useState(false);

  const endAtBefore = moment(dataRaffleDetail?.end_at).valueOf();
  const timeEnd = moment(dataRaffleDetail?.end_at)
    .add(dataRaffleDetail?.winner_total ? dataRaffleDetail?.winner_total : 0, "minutes")
    .valueOf();

  //Show popup claim when status = closed
  useEffect(() => {
    if (dataRaffleDetail?.status === "CLOSED" && dataTickets) {
      RafflesStore.dataWinTicket = dataTickets;
    }

    if (dataMyWonTickets && dataRaffleDetail?.status === "CLOSED") {
      dataMyWonTickets.forEach((item) => {
        if (!item?.is_claimed) setIsPopupClaim(true);
      })
    }
  }, [dataMyWonTickets, dataRaffleDetail?.status, dataTickets]);

  //Check time before end at  5 minius
  useEffect(() => {
    const checkDateInterval = setInterval(() => {
      const dateNow = moment(new Date()).valueOf();
      const timeBefore = (endAtBefore - dateNow) / (1000 * 60);

      if (timeBefore <= 5) {
        setCheckDisplayEndAt(true);
      }
    }, 1000)
    if (checkDisplayEndAt) clearInterval(checkDateInterval);
    return () => {
      clearInterval(checkDateInterval)
    }
  }, [dataRaffleDetail])

  //Rolling when new date = time end at
  useEffect(() => {
    const checkDateInterval = setInterval(() => {
      const timeStampBefore1s = moment(new Date())
        .add(1, "seconds")
        .valueOf();
      if (moment(dataRaffleDetail?.end_at).valueOf() <= timeStampBefore1s) {
        setCheckDisplayTimeEnd(true);
      }
    }, 1000);

    if (checkDisplayTimeEnd) {
      clearInterval(checkDateInterval);
      setCheckDisplayEndAt(false);
    }

    return () => {
      clearInterval(checkDateInterval)
    }
  }, [dataRaffleDetail])

  const formatDateToHMS = (date: any) => {
    return moment(date).format("YYYY-MM-DD  HH:mm:ss");
  }

  //Rolling when new date > time end at
  useEffect(() => {
    let rollingInterval: NodeJS.Timer;

    if (checkDisplayTimeEnd && timeLine && dataRaffleDetail?.status === "ENABLED") {

      rollingInterval = setInterval(async () => {
        timeLine.forEach((item, index) => {
          const dateNow = moment((new Date()).toISOString()).format("YYYY-MM-DD  HH:mm:ss");
          const targetDate = moment(item).format("YYYY-MM-DD  HH:mm:ss");
          //Check raffles realtime first time when mount component
          if (!isCheckFirstTime && dateNow > formatDateToHMS(timeLine[index]) && dateNow < formatDateToHMS(timeLine[index + 1])) {
            const dataIdxRealTime = Math.floor(index / 6);
            setRaffleRealTime(index, dataIdxRealTime);
            setDataRealTime(index, dataIdxRealTime);
            setIsCheckFistTime(true);
            return;
          }
          else {
            setIsCheckFistTime(true);
          }

          if (dateNow === targetDate) {
            const currentRollingIdxC = index % 6;
            const dataIdx = Math.floor(index / 6);
            setDataRealTime(currentRollingIdxC, dataIdx);
            setCurrentRollingIdx(currentRollingIdxC);
            setNumberRollingIdx(currentRollingIdxC, dataIdx, index);
            setListDataWinner(currentRollingIdxC, dataIdx);
            return;
          }
        })
      }, 1000);
    }

    return () => {
      clearInterval(rollingInterval)
    }
  }, [currentTicket, checkDisplayTimeEnd, timeLine, isCheckFirstTime])

  const setRaffleRealTime = (index: number, dataIdx: number) => {
    let str = targetTicket.slice(dataIdx * 6, index + 1);
    str = currentTicket.replace(currentTicket.substring(0,str.length), str);
    setCurrentTicket(str);
  }

  const setNumberRollingIdx = (currentRollingIdxC: number, dataIdx: number, index: number) => {
    const new_digit_n = targetTicket[index];
    if (currentTicket[currentRollingIdxC] == new_digit_n) {
      setCurrentTicket(replaceCharAt(currentTicket, currentRollingIdxC, ((parseInt(new_digit_n) + 1) % 10).toString()));

      setTimeout(() => {
        setCurrentTicket(replaceCharAt(currentTicket, currentRollingIdxC, new_digit_n));
      }, 20)
    } else {
      setCurrentTicket(replaceCharAt(currentTicket, currentRollingIdxC, new_digit_n));
    }
  }

  const setDataRealTime = (index: number, dataIdx: number) => {
    let data: (UserTicketGql | undefined)[] = [];
    for (let i = 0; i < dataIdx; i++) {
      data.push(dataTickets[i]);
    }
    Object.assign(RafflesStore.dataWinTicket,data);
    setIsCheckLoading(dataIdx);
  }

  const setListDataWinner = (currentRollingIdxC: number, dataIdx: number) => {
    setTimeout(function () {
      let data = RafflesStore.dataWinTicket;
      data[dataIdx] = dataTickets[dataIdx];
      RafflesStore.dataWinTicket = data;
      setIsCheckLoading(dataIdx+1);
      if(dataIdx >= dataTickets.length && dataMyWonTickets) setIsPopupClaim(true);
    }, 30000);
  }

  useEffect(() => {
    if (dataTickets && RafflesStore.dataWinTicket.length === 0) {
      RafflesStore.dataWinTicket = Array.from({length: dataTickets.length}, (_, i) => undefined);
    }
  }, [dataTickets])

  //decode data won tickets
  useEffect(() => {
    let data: any[] = [];
    if(dataWonTickets) {
      let obj = {};
      dataWonTickets.forEach((item) => {
        obj = fromBinary(item);
        // @ts-ignore
        data.push(JSON.parse(obj));
      })
    }
    // @ts-ignore
    setDataTickets(data);
    let str = "";
    data.forEach((item) => {
      str += item?.ticket_number;
    })

    //set Target ticket follow timeline
    setTargetTicket(str);
    setTimeLineTargetNumber(str);
  }, [dataWonTickets])

  const setTimeLineTargetNumber = (str: string) => {
    let arr = [];
    for (let i = 0; i < str.length; i++) {
      let date;
      if(i == 0)  date = dataRaffleDetail?.end_at;
      else {
        // @ts-ignore
        const dateIndex = arr[arr.length-1];
        if (i % 6 == 0) {
          date = moment(dateIndex).add(35, "seconds").toISOString();
        }
        else {
          date = moment(dateIndex).add(5, "seconds").toISOString();

        }
      }
      arr.push(date);
    }
    //@ts-ignore
    setTimeLine(arr);
  }

  const closePopupClaimTicket = () => {
    setIsPopupClaim(false);
  }

  useEffect(() => {
    const checkDateInterval =  setInterval(() => {
      const dateNow = moment(new Date()).valueOf();
      const endAtBefore = moment(dataRaffleDetail?.end_at).add(4, "minutes")
        .valueOf();
      const timeBefore = (endAtBefore - dateNow)/(1000 * 60 * 60);
      if(timeBefore <= 1) {
        setIsCheckStatusClosed(true);
        if(dataRaffleDetail?.status !== "CLOSED") {
          refetchRaffleDetail().then(r => {});
          refetchMyWonTickets().then(r => {});
        }
      }
    }, 1000)
    if(isCheckStatusClosed)  clearInterval(checkDateInterval);
    return () => {
      clearInterval(checkDateInterval)
    }
  }, [dataRaffleDetail?.end_at, isCheckStatusClosed])

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
            <Digit value={parseInt(currentTicket[0])} rolling={currentRollingIdx === 0} realtime={isCheckFirstTime}/>
          </div>
          <div>
            <Digit value={parseInt(currentTicket[1])} rolling={currentRollingIdx === 1} realtime={isCheckFirstTime} />
          </div>
          <div>
            <Digit value={parseInt(currentTicket[2])} rolling={currentRollingIdx === 2} realtime={isCheckFirstTime} />
          </div>
          <div>
            <Digit value={parseInt(currentTicket[3])} rolling={currentRollingIdx === 3} realtime={isCheckFirstTime} />
          </div>
          <div>
            <Digit value={parseInt(currentTicket[4])} rolling={currentRollingIdx === 4} realtime={isCheckFirstTime} />
          </div>
          <div>
            <Digit value={parseInt(currentTicket[5])} rolling={currentRollingIdx === 5} realtime={isCheckFirstTime} />
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
                            <CountdownTimeBefore targetDate={endAtBefore} />
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
                            <span>End rolling in</span>
                        </div>
                        <div className={s.rollingTime}>
                            <CountdownTimeEnd targetDate={timeEnd} status={dataRaffleDetail?.status ?? ""} refetchRaffleDetail={refetchRaffleDetail} refetchMyWonTickets={refetchMyWonTickets}/>
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
                <div className={s.recentWinItem} key={`${item?.ticket_number}${index}`}>
                  <span className={s.recentWinItemId}>#{item?.ticket_number ?? '------'}</span>
                  <span className={s.recentWinItemName}>{item && `(${item?.user?.profile?.user_name})`}</span>
                    {isCheckLoading === index && checkDisplayTimeEnd && dataRaffleDetail?.status === "ENABLED" &&
                      <>
                          <Spin indicator={antIcon}/>
                      </>
                    }
                </div>
              </>
            );
          }) : " "}
        </div>
      </div>

      {
        isPopupClaim
      &&
          <PopupClaimTicket dataRaffleDetail={dataRaffleDetail} status={isPopupClaim} dataMyWonTickets={dataMyWonTickets} raffleUid={raffleUid} closePopupClaimTicket={closePopupClaimTicket}/>
      }

    </div>
  )
}
export default RollingRaffles

