import s from "./banner.module.sass";
import SilderBanner from "../slider";
import { useEffect, useState } from "react";
import useBanner from "../hooks/useBanner";
import { useGetSpotlightAnnouncement } from "hooks/tournament/useTournamentDetail";
import moment from "moment";
import Texty from "rc-texty";
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
        if (arr >= length) {
          setArr(0);
          setTitleSpotlight(data[0]?.content);
        } else {
          setArr((prve) => prve + 1);
          const title = data[arr]?.content;
          setTitleSpotlight(title);
          setTimer(data[arr]?.time);
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
              {show && <Texty delay={1000}>{titleSpotlight}</Texty>}
            </div>
          </div>
        ) : (
          <div className={s.marquee}></div>
        )}
      </div>
    </div>
  );
}
