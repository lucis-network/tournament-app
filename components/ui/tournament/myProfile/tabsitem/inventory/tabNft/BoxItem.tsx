import React, {useState} from "react";
import s from "./nftTab.module.sass";

import {KButton} from "components/ui/common/button";
import AuthBoxStore from "../../../../../../Auth/components/AuthBoxStore";

type Props = {
  amount?: number;
  isOwner?: boolean;
  openBox: () => void;
  isConnectedWallet?: boolean;

};

const BoxItem = (props: Props) => {
  const isConnectedWallet = props.isConnectedWallet;

  const showModal = () => {
    AuthBoxStore.connectModalVisible = true;
  };
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

          </div>
          <div className={s.connectWallet}>
            {!isConnectedWallet ?
                <KButton onClick={() => showModal()} title={"Connect wallet"} fontSize={"15px"} width="140px"
                         height={"40px"}/>
            : <KButton
                title="Open box"
                width="130px"
                disabled={!props?.amount}
                onClick={() => props.openBox()}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default  BoxItem;
