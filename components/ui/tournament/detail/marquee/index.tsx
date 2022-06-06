import s from "./Marquee.module.sass";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import { useGetSpotlightAnnouncement } from "hooks/tournament/useTournamentDetail";
import moment from "moment";

const TournamentDetailMarquee = () => {
  const { loading, error, data, refetch } = useGetSpotlightAnnouncement();

  const [titleSpotlight, setTitleSpotlight] = useState("");
  const [arr, setArr] = useState(0);
  const [timer, setTimer] = useState({});

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (data) {
      const length = data.length;
      interval = setInterval(() => {
        if (arr >= length) {
          setArr(0);
        } else {
          setArr((prve) => prve + 1);
          const title = data[arr];
          setTitleSpotlight(title);
        }
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [arr, data]);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTimer(date);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <div className={`lucis-container-2 ${s.marquee_section}`}>
      <div className={s.marquee}>
        <img src="/assets/Banner/ic_loudspeaker.png" alt="" />
        <div className={s.time}>
          <div></div>
          <div className={s.line}></div>
          {moment(timer).format("MMMM Do h:mm:ss")}
        </div>
        <div className={s.marquee_title}>{titleSpotlight}</div>
      </div>
    </div>
  );
};

export default TournamentDetailMarquee;
