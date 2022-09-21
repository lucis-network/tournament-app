import s from "./index.module.sass";
import React from "react";

export default function TopSponsors() {

  return (
    <>
      <div className={s.titleTopSponsors}>
        <div className={s.imgTitle}>
          <img srcSet="/assets/lg_partner/lg_sponsor.png" alt=""/>
        </div>
        <div className={s.textTitle}>
          <h2>TOP SPONSOR</h2>
        </div>
      </div>

      <div className={s.wrapper}>
        <div className={`${s.container}`}>
          <div className={`${s.itemLg} ${s.lgBizverse}`} onClick={() => window.open("https://bizverse.io/", '_blank')}>
            <img srcSet="/assets/lg_partner/bizverse.png" alt="" />
          </div>
          <div className={`${s.itemLg} ${s.lgAnimverse}`} onClick={() => window.open("https://animverse.com/", '_blank')}>
            <img srcSet="/assets/lg_partner/animverse.png" alt="" />
          </div>
          <div className={s.itemLg} onClick={() => window.open("https://mones.io/", '_blank')}>
            <img srcSet="/assets/lg_partner/mones.png" alt="" />
          </div>
          <div className={`${s.itemLg} ${s.lgGalaxy}`} onClick={() => window.open("https://www.galaxysurvivor.io/", '_blank')}>
            <img srcSet="/assets/lg_partner/galaxy.png" alt="" />
          </div>
          <div className={`${s.itemLg} ${s.lgAiza}`} onClick={() => window.open("https://aizaworld.com/", '_blank')}>
            <img srcSet="/assets/lg_partner/aiza.png" alt="" />
          </div>
          <div className={`${s.itemLg} ${s.lgCoinbay}`} onClick={() => window.open("https://coinbay.io/vi/home/", '_blank')}>
            <img srcSet="/assets/lg_partner/coinbay.png" alt="" />
          </div>
          <div className={`${s.itemLg} ${s.lgFltrend}`} onClick={() => window.open("https://followtrend.net/", '_blank')}>
            <img srcSet="/assets/lg_partner/fl_trend.png" alt="" />
          </div>
          <div className={`${s.itemLg} ${s.lgMetawork}`} onClick={() => window.open("https://www.metawork.com/", '_blank')}>
            <img srcSet="/assets/lg_partner/metawork.png" alt="" />
          </div>
          <div className={`${s.itemLg} ${s.lgMifu}`} onClick={() => window.open("https://mifu.asia/", '_blank')}>
            <img srcSet="/assets/lg_partner/mifu.png" alt="" />
          </div>
          <div className={`${s.itemLg} ${s.lgSpac3ship}`} onClick={() => window.open("https://www.spac3ship.com/", '_blank')}>
            <img srcSet="/assets/lg_partner/spac3ship.png" alt="" />
          </div>
        </div>
      </div>
      </>
  );
};
