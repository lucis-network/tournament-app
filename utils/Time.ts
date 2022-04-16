import moment from "moment";
import { useEffect, useState } from "react";

/**
 * convert seconds count to time string in mm:ss
 * @param secs
 */
export function secondsToTimeStr(secs: number): string {
  return secs < 0
    ? ""
    : `${Math.floor(secs / 60)
        .toString()
        .padStart(2, "0")}:${(secs % 60).toString().padStart(2, "0")}`;
}

/**
 * Compare date Current date with 2 date (UTC)
 * @param start
 * @param end
 * @returns string
 */
export function compareDate(startTime: string, endTime: string) {
  const currUTC = moment.utc();
  const startUTC = moment.utc(startTime);
  const endUTC = moment.utc(endTime);
  const isBefore = moment.duration(currUTC.diff(startUTC)).asMilliseconds() < 0;
  const isAfter = moment.duration(endUTC.diff(currUTC)).asMilliseconds() < 0;
  return isBefore ? "before" : isAfter ? "after" : "ontime";
}

export function useCountDown(timeCountDown: any) {
  const [totalTime, setTotalTime] = useState(0);
  const [timer, setTimer] = useState<{ [name: string]: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimer((item) => ({
      ...item,
      days: Math.floor(totalTime / (60 * 60 * 24)),
      hours: Math.floor((totalTime / (60 * 60)) % 24),
      minutes: Math.floor((totalTime / 60) % 60),
      seconds: Math.floor(totalTime % 60),
    }));
  }, [totalTime]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    interval = setInterval(() => {
      if (totalTime < 0) {
        clearInterval(interval);
      } else {
        countTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [totalTime]);

  useEffect(() => {
    setTotalTime(timeCountDown);
  }, [timeCountDown]);

  const countTime = () => {
    if (
      totalTime > 0 &&
      (timer.days !== 0 ||
        timer.hours !== 0 ||
        timer.minutes !== 0 ||
        timer.seconds !== 0)
    ) {
      setTimer((item) => ({ ...item, seconds: item.seconds - 1 }));
      if (timer.minutes >= 0 && timer.seconds - 1 < 0) {
        setTimer((item) => ({ ...item, seconds: 59 }));
        setTimer((item) => ({ ...item, minutes: item.minutes - 1 }));
        if (timer.hours >= 0 && timer.minutes - 1 < 0) {
          setTimer((item) => ({ ...item, minutes: 59 }));
          setTimer((item) => ({ ...item, hours: item.hours - 1 }));
          if (timer.days >= 0 && timer.hours - 1 < 0) {
            setTimer((item) => ({ ...item, hours: 23 }));
            if (timer.days - 1 > 0) {
              setTimer((item) => ({ ...item, days: item.days - 1 }));
            }
          }
        }
      }
    }
    setTotalTime((totalTime) => totalTime - 1);
  };

  // const newDate = new Date();
  // const [totalTime, setTotalTime] = useState(0);
  // const [timer, setTimer] = useState<{ [name: string]: number }>({
  //   days: 0,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });
  // useEffect(() => {
  //   const newTimeStartCampaign = new Date(time);
  //   const days =
  //     (newTimeStartCampaign.getDate() - newDate.getDate() - 1) * 86400;
  //   const hours =
  //     (24 - newDate.getHours() + newTimeStartCampaign.getHours() - 1) * 3600;
  //   const minutes =
  //     (60 - newTimeStartCampaign.getMinutes() - newDate.getMinutes()) * 60;
  //   const seconds =
  //     60 - newTimeStartCampaign.getSeconds() - newDate.getSeconds();
  //   const totalSeconds = days + hours + minutes + seconds;
  //   setTotalTime(totalSeconds);
  // }, []);
  // useEffect(() => {
  //   if (totalTime < 0) {
  //     setTimer({
  //       days: 0,
  //       hours: 0,
  //       minutes: 0,
  //       seconds: 0,
  //     });
  //   } else {
  //     setTimer((item) => ({
  //       ...item,
  //       days: Math.floor(totalTime / (60 * 60 * 24)),
  //       hours: Math.floor((totalTime / (60 * 60)) % 24),
  //       minutes: Math.floor((totalTime / 60) % 60),
  //       seconds: Math.floor(totalTime % 60),
  //     }));
  //   }
  // }, [totalTime]);
  // useEffect(() => {
  //   let interval: NodeJS.Timer;
  //   interval = setInterval(() => {
  //     if (totalTime < 0) {
  //       clearInterval(interval);
  //     } else {
  //       countTime();
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [totalTime]);
  // const countTime = () => {
  //   setTimer((item) => ({ ...item, seconds: item.seconds - 1 }));
  //   if (timer.minutes >= 0 && timer.seconds - 1 < 0) {
  //     setTimer((item) => ({ ...item, seconds: 59 }));
  //     setTimer((item) => ({ ...item, minutes: item.minutes - 1 }));
  //     if (timer.hours >= 0 && timer.minutes - 1 < 0) {
  //       setTimer((item) => ({ ...item, minutes: 59 }));
  //       setTimer((item) => ({ ...item, hours: item.hours - 1 }));
  //       if (timer.days >= 0 && timer.hours - 1 < 0) {
  //         setTimer((item) => ({ ...item, hours: 23 }));
  //         if (timer.days - 1 > 0) {
  //           setTimer((item) => ({ ...item, days: item.days - 1 }));
  //         }
  //       }
  //     }
  //   }
  //   setTotalTime((totalTime: any) => totalTime - 1);
  // };
  return timer;
}
