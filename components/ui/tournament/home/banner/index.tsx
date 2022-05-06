import s from "./banner.module.sass";
import GradientButton from "../../../common/button/GradientButton";
import Marquee from "react-fast-marquee";
import SilderBanner from "../slider";

const dataBanner = {
  title:
    "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
};
export default function BannerPage() {
  return (
    <div className={s.wrapper_banner}>
      <div className={`${s.container} lucis-container`}>
        <SilderBanner />
        <div className={s.marquee}>
          <img src="/assets/Banner/ic_loudspeaker.png" alt="" />
          <Marquee loop={0} speed={100} gradientColor={[16, 24, 71]}>
            I can be a React component, multiple React components, or just some
            text.
          </Marquee>
        </div>
      </div>
    </div>
  );
}
