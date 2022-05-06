import s from "./sliderBanner.module.sass";
import GradientButton from "../../../common/button/GradientButton";
import { Carousel } from "antd";

const dataBanner = {
  title:
    "DAILY TOURNAMENT the axie summer 2022 DAILY TOURNAMENT the axie summer 2022",
};

export default function SilderBanner() {
  const textLength = dataBanner.title;
  const element =
    textLength.length > 42 ? textLength.substring(0, 42) + "..." : textLength;
  return (
    <Carousel autoplay>
      <div>
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
      </div>
      {/* slider 2 */}
      <div>
        <div>
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
        </div>
      </div>
      {/* slider 3 */}
      <div>
        <div>
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
        </div>
      </div>
      {/* slider 4 */}
      <div>
        <div>
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
        </div>
      </div>
    </Carousel>
  );
}
