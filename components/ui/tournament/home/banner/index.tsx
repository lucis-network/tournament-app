import s from "./banner.module.sass";
import GradientButton from "../../../common/button/GradientButton";
import Marquee from "react-fast-marquee";

const dataBanner = {
  title:
    "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
};
export default function BannerPage() {
  const textLength = dataBanner.title;
  const element =
    textLength.length > 42 ? textLength.substring(0, 42) + "..." : textLength;
  return (
    <div className={s.wrapper_banner}>
      <div className={`${s.container} lucis-container`}>
        <div className={s.im_conver}>
          <div className={s.title}>
            <p>{element}</p>
            <div className={s.detail}>
              <div>
                <p>Prize pool</p>
                <div className={s.total}>
                  <img src="/assets/home/ic_nft.png" alt="icon" />
                  <span>10,000 USDT</span>
                </div>
              </div>
              <GradientButton
                type={1}
                className={`text-white text-16px leading-28px py-2 ${s.btn}`}
                style={{ whiteSpace: "nowrap", fontWeight: "600" }}
              >
                JOIN NOW
              </GradientButton>
            </div>
          </div>
        </div>

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
