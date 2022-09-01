import s from "./banner.module.sass";
import SilderBanner from "../slider";
import { useEffect, useState } from "react";
import useBanner from "../hooks/useBanner";
import { useGetSpotlightAnnouncement } from "hooks/tournament/useTournamentDetail";
import moment from "moment";
import TextyAnim from "rc-texty";
import "rc-texty/assets/index.css";

export default function BannerPage() {
  const { dataBanner } = useBanner();
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
    <div className={s.wrapper_banner}>
      <div className={`${s.container} lucis-container`}>
        <SilderBanner data={dataBanner} />
        {timer ? (
          <div className={s.marquee}>
            <img src="/assets/Banner/ic_loudspeaker.png" alt="" />
            <div className={s.time}>
              <div></div>
              <div className={s.line}></div>
              {moment(timer).format("MMMM Do hh:mm:ss")}
            </div>
            <div className={s.title_spotlight}>
              {show && (
                <TextyAnim delay={0} interval={12}>
                  {titleSpotlight}
                </TextyAnim>
              )}
            </div>
          </div>
        ) : (
          <div className={s.marquee}></div>
        )}
      </div>
    </div>
  );
}
