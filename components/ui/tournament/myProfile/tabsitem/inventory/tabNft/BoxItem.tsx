import React, {useState} from "react";
import s from "../index.module.sass";
import PrizePopover from "../../../../../p2e/lucky/prize/popover";
import sChestPrize from "../../../../../p2e/lucky/prize/ChestPrize.module.sass";
import {ApolloQueryResult} from "@apollo/client";
import {UserInventoryCoupon} from "src/generated/graphql";
import {useCopy} from "hooks/common/useCopy";
import {KButton} from "components/ui/common/button";

type Props = {
  amount?: number;
  isOwner?: boolean;
  openBox: () => void;

};

const BoxItem = (props: Props) => {

  return (
    <>
      <div className={`${sChestPrize.chestPrize} ${s.chestPrize}`}>
        <div className={sChestPrize.prizeImg}>
          <img
            src={"/assets/lucis_box.png"}
            alt="lucis box"
            style={{width: "100%", height: "auto"}}
          />
        </div>
        <div className={`${sChestPrize.prizeTitle} ${s.prizeTitle}`}>
          {"Lucis Box"}
        </div>
        <div className={s.prizeAmount}>
          <div className={s.prizeAmountQty}>Amount: {props?.amount}</div>
          <div>
            <KButton
              title="Open box"
              width="80px"
              // disabled={item?.quantity <= 0}
              onClick={() => props.openBox()}
            />
          </div>
        </div>
      </div>
      {/* {statusCsgo && (
        <PopupConfirmItemsCsgo
          item={item}
          status={statusCsgo}
          refetchMyInventoryItems={refetch}
          onClosePopup={() => setStatusCsgo(false)}
        ></PopupConfirmItemsCsgo>
      )}
      {statusPhysical && (
        <PopupConfirmItemsPhysical
          item={item}
          status={statusPhysical}
          refetchMyInventoryItems={refetch}
          onClosePopup={() => setStatusPhysical(false)}
        ></PopupConfirmItemsPhysical>
      )}
      {statusPopupContact && (
        <PopupContactRaffles
          status={statusPopupContact}
          closePopupContact={() => setStatusPopupContact(false)}
          contactURL="https://discord.gg/7SdtYpGENT"
          description="Congratulations on your lucky win from Lucis. It is not sent to you right away, please contact Lucis Support for instructions on receiving the prize."
        />
      )} */}
    </>
  );
};

export default BoxItem;
