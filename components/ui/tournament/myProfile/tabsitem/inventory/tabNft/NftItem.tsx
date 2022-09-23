import React, {useEffect, useState} from "react";
import s from "../index.module.sass";
import PrizePopover from "../../../../../p2e/lucky/prize/popover";
import sChestPrize from "../../../../../p2e/lucky/prize/ChestPrize.module.sass";
import {ApolloQueryResult} from "@apollo/client";
import {UserInventoryCoupon} from "src/generated/graphql";
import {useCopy} from "hooks/common/useCopy";
import {KButton} from "components/ui/common/button";

type Props = {
  tokenId?: number;
  isOwner?: boolean;

};

const s3Metadata = "https://image-upload-s3-demo.s3.ap-southeast-1.amazonaws.com/metadata";
const NftItem = (props: Props) => {

  const [metadata, setMetadata] = useState<any>({});


  useEffect(() => {
    fetch(`${s3Metadata}/${props.tokenId}.json`).then((res) => res.json()).then(data => setMetadata(data));
  }, []);
  // console.log(metadata)

  return (
    <>
      <div className={`${sChestPrize.chestPrize} ${s.chestPrize}`}>
        <div className={sChestPrize.prizeImg}>
          <img
            src={metadata?.image}
            alt="lucis box"
            style={{width: "100%", height: "auto"}}
          />
        </div>
        <div className={`${sChestPrize.prizeTitle} ${s.prizeTitle}`}>
          {metadata.name}
        </div>
        {/*<div className={s.prizeAmount}>*/}
        {/*  <div className={s.prizeAmountQty}>Amount: {props?.amount}</div>*/}
        {/*  <div>*/}
        {/*    <KButton*/}
        {/*      title="Open box"*/}
        {/*      width="80px"*/}
        {/*      // disabled={item?.quantity <= 0}*/}
        {/*      onClick={() => null}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
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

export default NftItem;
