import s from "./Marquee.module.sass";
import Marquee from "react-fast-marquee";
import {useEffect, useState} from "react";

const Spotlight = [
  {
    id: 1,
    title:
      "Spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spolihjt an...",
  },
  {
    id: 2,
    title:
      "Spotlight2  Spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spolihjt an...",
  },
  {
    id: 3,
    title:
      "Spotlight3  Spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spolihjt an...",
  },
  {
    id: 4,
    title:
      "Spotlight4  Spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spolihjt an...",
  },
];

const TournamentDetailMarquee = () => {
  const [titleSpotlight, setTitleSpotlight] = useState(Spotlight[0].title);
  const [arr, setArr] = useState(0);

  useEffect(() => {
    const length = Spotlight.length;
    const interval = setInterval(() => {
      if (arr >= length) {
        setArr(0);
      } else {
        setArr((prve) => prve + 1);
        const title = Spotlight[arr].title;
        setTitleSpotlight(title);
      }
    }, 20000);
    return () => {
      clearInterval(interval);
    };
  }, [arr]);

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
  )
}

export default TournamentDetailMarquee;
