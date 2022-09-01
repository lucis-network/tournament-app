import s from "./sliderBanner.module.sass";
import GradientButton from "../../../common/button/GradientButton";
import { Carousel } from "antd";
import { GTournament } from "src/generated/graphql";
import { orderBy, stubString } from "lodash";
import { useState } from "react";
import { useRouter } from "next/router";
import { slugify } from "utils/String";
import { currency } from "utils/Number";

interface SliderBannerProps {
  data: GTournament[];
}

export default function SilderBanner({ data }: SliderBannerProps) {
  const router = useRouter();
  const orderData: GTournament[] = orderBy(data, "spotlight_position", "asc");
  const [uidTournament, setUidTournament] = useState("");

  const handleJoinDetail = (dataTournament: GTournament) => {
    const { uid, name } = dataTournament;
    router.push(`/arena/${uid}/${slugify(name)}`);
  };

  return (
    <Carousel autoplay className={s.wrapper}>
      {orderData?.map((item) => {
        const getName = item?.name
        const name = item?.name.length > 40 ?  getName.slice(0, 40) + '...':  getName
        return (
          <div key={item?.uid} className={`${s.container} cursor-pointer`}>
            <div className={s.im_conver}>
              <div
                className={s.im_banner}
                onClick={() => handleJoinDetail(item)}
                style={{
                  backgroundImage: `url(${item?.cover})`,
                }}
              ></div>
              <div className={s.title}>
                <div style={{ position: "relative" }}>
                  <div className={s.line}></div>
                  <div className={s.line}></div>
                  <p className={s.name}>{name}</p>
                  <div className={s.detail}>
                    <div style={{ paddingRight: "12px" }}>
                      <p className={s.pl}>Prize pool</p>
                      <div className={s.total}>
                        <img
                          src={item?.currency?.icon || ""}
                          alt="icon"
                        />
                        <span>
                          {
                            //@ts-ignore
                            currency(item?.totalPrizePool)
                          }{" "}
                          {item?.currency?.symbol}
                        </span>
                      </div>
                    </div>
                    <GradientButton
                      type={1}
                      className={`text-white text-16px leading-28px py-2 ${s.btn}`}
                      style={{ whiteSpace: "nowrap", fontWeight: "600" }}
                      onClick={() => handleJoinDetail(item)}
                    >
                      JOIN NOW
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
