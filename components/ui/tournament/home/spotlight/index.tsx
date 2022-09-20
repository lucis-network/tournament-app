import s from "./index.module.sass";
import {useEffect, useState } from "react";
import { useGetSpotlightAnnouncement } from "hooks/tournament/useTournamentDetail";
import TextyAnim from "rc-texty";
import moment from "moment";

export default function  SpotLightHome() {
  const { loading, error, data, refetch } = useGetSpotlightAnnouncement({});
  const [titleSpotlight, setTitleSpotlight] = useState("");
  const [arr, setArr] = useState(0);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (data) {
      const length = data.length;
      interval = setInterval(() => {
        if (arr == 0) {
          setTitleSpotlight(data[0]?.content);
          setTimer(data[0]?.time);
        } else {
          const title = data[arr]?.content;
          if (title) {
            setTitleSpotlight(title);
            setTimer(data[arr]?.time);
          }
        }
        setArr((prve) => prve + 1);
        if (arr == length) {
          setTitleSpotlight(data[0]?.content);
          setTimer(data[0]?.time);
          setArr(1);
        }
        setShow(true);
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [arr, data]);

  useEffect(() => {
    setShow(false);
  }, [titleSpotlight]);

  return (
      <div className={`lucis-container-2  ${s.container}`}>
        {timer ? (
          <div className={s.marquee}>
            <img src="/assets/ic_speaker.svg" alt="" />
            <div className={s.time_pc}>
              <span>[{moment(timer).format("hh:mm MMMM Do")}]</span>
            </div>
            <div className={s.title_spotlight}>
              {show && (
                <TextyAnim delay={0} interval={12}>
                  {titleSpotlight}
                </TextyAnim>
              )}
            </div>
            <div className={s.marquee_ml}>
              <div className={s.title_spotlight_ml}>
                <span className={s.time_ml}>[{moment(timer).format("hh:mm MMMM Do")}]</span>
                {show &&
                    <>{titleSpotlight}</>
                }
              </div>
            </div>

          </div>
        ) : (
          <></>
        )}
      </div>
  );
}
