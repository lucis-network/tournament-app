import s from "./Marquee.module.sass";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import { useGetSpotlightAnnouncement } from "hooks/tournament/useTournamentDetail";

const TournamentDetailMarquee = () => {
  const { loading, error, data, refetch } = useGetSpotlightAnnouncement();

  const [titleSpotlight, setTitleSpotlight] = useState("");
  const [arr, setArr] = useState(0);

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
      }, 10000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [arr, data]);

  return (
    <div className={`lucis-container-2 ${s.marquee_section}`}>
      <div className={s.marquee}>
        <img src="/assets/Banner/ic_loudspeaker.png" alt="" />
        <div className={s.time}>
          <div></div>
          <div className={s.line}></div>
          April 4th 13:30:45
        </div>
        <Marquee
          speed={100}
          gradientColor={[180, 180, 180]}
          className={s.marquee_title}
        >
          {titleSpotlight}
        </Marquee>
      </div>
    </div>
  );
};

export default TournamentDetailMarquee;
