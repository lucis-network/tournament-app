import s from "./sliderBanner.module.sass";
import { GTournament } from "src/generated/graphql";
import { orderBy } from "lodash";
import {memo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { slugify } from "utils/String";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Carousel } from "antd";
import React from "react";
import Img from "../../../common/Img";
import ButtonBorder from "components/ui/common/button/buttonBorder/ButtonBorder";

interface SliderBannerProps {
  data: GTournament[];
}

function SilderBanner({ data }: SliderBannerProps) {
  const router = useRouter();
  const orderData: GTournament[] = orderBy(data, "spotlight_position", "asc");

  const slider = useRef(null);

  const handleJoinDetail = (dataTournament: GTournament) => {
    const { uid, name } = dataTournament;
    router.push(`/arena/${uid}/${slugify(name)}`);
  };

  console.log("orderData", orderData);
  return (
    <div className={s.wrapper}>
      <div className={s.leftArrow}>
        <img src="/assets/home/ic_prev.svg" alt="" onClick={() => {
          // @ts-ignore
          slider.current.prev();
        }}/>
      </div>
      <Carousel ref={slider} className={`lucis-container-2 ${s.container}`}>
        {orderData && orderData?.map((item, index) => (
          <div className={`${s.banner}`} key={index}>
            <Img src={item?.cover ?? "/assets/home/bg_banner.jpg"} srcFallback="/assets/home/bg_banner.jpg" />
            <div className={s.popup}>
              <div className={s.popupContent}>
                <div className={s.popupContentName}>
                  {item.name}
                </div>
                {
                  item?.totalPrizePool && item?.totalPrizePool > 0 ?
                    <div className={s.popupContentPrize}>
                        <span>{item?.totalPrizePool} {item?.currency.symbol}</span> Prize Pool
                    </div>
                    : ""
                }
              </div>
              <ButtonBorder>
                <div className={s.btnJoin} onClick={() => handleJoinDetail(item)}>
                  Join Now
                </div>
              </ButtonBorder>
            </div>
          </div>
        ))}
      </Carousel>
      <div className={s.rightArrow}>
        <img src="/assets/home/ic_next.svg" alt="" onClick={() => {
          // @ts-ignore
          slider.current.next();
        }}/>
      </div>

    </div>
  );
}

export default memo(SilderBanner);