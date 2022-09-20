import s from "./banner.module.sass";
import SilderBanner from "../slider";
import { useEffect, useState } from "react";
import useBanner from "../hooks/useBanner";
import { useGetSpotlightAnnouncement } from "hooks/tournament/useTournamentDetail";
import moment from "moment";
import TextyAnim from "rc-texty";
import "rc-texty/assets/index.css";

export default function BannerPage() {
  const { dataBanner } = useBanner();
  return (
    <div className={s.wrapper_banner}>
      {/*<div className={`${s.container} lucis-container-2`}>*/}
      <div className={`${s.container}`}>
        <SilderBanner data={dataBanner}/>
      </div>
    </div>
  );
}
