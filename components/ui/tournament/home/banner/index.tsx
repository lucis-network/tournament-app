import s from "./banner.module.sass";
import GradientButton from "../../../common/button/GradientButton";
import Marquee from "react-fast-marquee";
import SilderBanner from "../slider";
import { useEffect, useState } from "react";

const dataBanner = {
  title:
    "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
};
export default function BannerPage() {
  const [titleSpotlight, setTitleSpotlight] = useState('')
  const [arr, setArr] = useState(0)
  const Spotlight = [
    { id: 1, title: 'Spotlight1 announcement spotlight' },
    { id: 2, title: 'Spotlight2 announcement spotlight' },
    { id: 3, title: 'Spotlight3 announcement spotlight' },
    { id: 4, title: 'Spotlight4 announcement spotlight' },
  ]

  useEffect(() => {
    const length = Spotlight.length
    const interval = setInterval(()=> {
      if (arr >= length) {
        setArr(0)
      }else{
        setArr(prve => prve + 1)
        const title = Spotlight[arr].title
        setTitleSpotlight(title)
      }
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [arr])
  
  return (
    <div className={s.wrapper_banner}>
      <div className={`${s.container} lucis-container`}>
        <SilderBanner />
        <div className={s.marquee}>
          <img src="/assets/Banner/ic_loudspeaker.png" alt="" />
          <div className={s.time}>
            <div className={s.line}></div>
            April 4th 13:30:45
          </div>
          <p>{titleSpotlight}</p>

        </div>
      </div>
    </div>
  );
}
