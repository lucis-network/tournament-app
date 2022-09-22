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
          <a href="https://bizverse.io/" target="_blank" rel="noopener noreferrer">
          <div className={`${s.itemLg} ${s.lgBizverse}`}>
            <img srcSet="/assets/lg_partner/bizverse.png" alt="" />
          </div>
          </a>
          <a href="https://animverse.com/" target="_blank" rel="noopener noreferrer">
          <div className={`${s.itemLg} ${s.lgAnimverse}`}>
            <img srcSet="/assets/lg_partner/animverse.png" alt="" />
          </div>
          </a>
          <a href="https://mones.io/" target="_blank" rel="noopener noreferrer">
          <div className={s.itemLg}>
            <img srcSet="/assets/lg_partner/mones.png" alt="" />
          </div>
          </a>
          <a href="https://www.galaxysurvivor.io/" target="_blank" rel="noopener noreferrer">
          <div className={`${s.itemLg} ${s.lgGalaxy}`}>
            <img srcSet="/assets/lg_partner/galaxy.png" alt="" />
          </div>
          </a>
          <a href="https://aizaworld.com/" target="_blank" rel="noopener noreferrer">
          <div className={`${s.itemLg} ${s.lgAiza}`}>
            <img srcSet="/assets/lg_partner/aiza.png" alt="" />
          </div>
          </a>
          <a href="https://coinbay.io/vi/home/" target="_blank" rel="noopener noreferrer">
          <div className={`${s.itemLg} ${s.lgCoinbay}`}>
            <img srcSet="/assets/lg_partner/coinbay.png" alt="" />
          </div>
          </a>
          <a href="https://followtrend.net/" target="_blank" rel="noopener noreferrer">
          <div className={`${s.itemLg} ${s.lgFltrend}`}>
            <img srcSet="/assets/lg_partner/fl_trend.png" alt="" />
          </div>
          </a>
          <a href="https://www.metawork.com/" target="_blank" rel="noopener noreferrer">
          <div className={`${s.itemLg} ${s.lgMetawork}`}>
            <img srcSet="/assets/lg_partner/metawork.png" alt="" />
          </div>
          </a>
          <a href="https://mifu.asia/" target="_blank" rel="noopener noreferrer">
          <div className={`${s.itemLg} ${s.lgMifu}`}>
            <img srcSet="/assets/lg_partner/mifu.png" alt="" />
          </div>
          </a>
          <a href="https://www.spac3ship.com/" target="_blank" rel="noopener noreferrer">
          <div className={`${s.itemLg} ${s.lgSpac3ship}`}>
            <img srcSet="/assets/lg_partner/spac3ship.png" alt="" />
          </div>
          </a>
        </div>
      </div>
      </>
  );
};
