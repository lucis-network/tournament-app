import React, {useState} from "react";
import s from "./nftTab.module.sass";

import {KButton} from "components/ui/common/button";

type Props = {
  amount?: number;
  isOwner?: boolean;
  openBox: () => void;

};

const BoxItem = (props: Props) => {

  return (
    <>
      <div className={s.boxItem}>
        <div className={s.boxImage}>
          <img
            src={"/assets/lucis-box.png"}
            alt="lucis box"
          />
        </div>
        <div className={s.boxItemTitle}>
          {"Lucis Box"}
        </div>
        <div className={s.boxItemAction}>
          <div className={s.boxItemAmount}>Amount: {props?.amount ?? "--"}</div>
          <div>
            <KButton
              title="Open box"
              width="130px"
              disabled={!props?.amount}
              onClick={() => props.openBox()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default  BoxItem;
