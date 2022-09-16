import React, { useState } from "react";
import s from "../index.module.sass";
import PrizePopover from "../../../../../p2e/lucky/prize/popover";
import sChestPrize from "../../../../../p2e/lucky/prize/ChestPrize.module.sass";
import ButtonWrapper from "../../../../../../common/button/Button";
import { ApolloQueryResult } from "@apollo/client";
import { UserInventoryCoupon } from "src/generated/graphql";
import Link from "next/link";
import { useCopy } from "hooks/common/useCopy";
import { KButton } from "components/ui/common/button";
type Props = {
  item: UserInventoryCoupon;
  isOwner?: boolean;
  refetch: () => Promise<ApolloQueryResult<any>>;
};

const CouponItem = (props: Props) => {
  const { item, isOwner, refetch } = props;
  const [isShowCode, setShowCode] = useState<boolean>(false);
  const { isCopied, setCopied, onCopy } = useCopy();

  const showCode = () => {
    setShowCode(true);
  };

  return (
    <>
      <PrizePopover
        image={item?.prize?.img ?? ""}
        title={item?.prize?.title ?? ""}
        description={item?.prize?.desc ?? ""}
        rarity={item?.prize?.rarity ?? ""}
      >
        <div
          className={`${sChestPrize.chestPrize} ${item?.prize?.rarity ?? ""} ${
            s.chestPrize
          }`}
        >
          <div className={sChestPrize.prizeImg}>
            <img
              src={
                item?.prize?.img ??
                "/assets/P2E/lucky-chest/defaultPrizeImage.png"
              }
              alt=""
            />
          </div>
          <div className={`${sChestPrize.prizeTitle} ${s.prizeTitle}`}>
            {item?.prize?.title ?? ""}
          </div>
          <div className={s.prizeAmount}>
            {isShowCode ? (
              <div style={{ display: "flex" }}>
                {item.code}
                <span className={s.iconCopy}>
                  <img
                    onClick={() => {
                      setCopied(true);
                      onCopy(item.code);
                    }}
                    src={
                      isCopied
                        ? "/assets/P2E/overview/copied.svg"
                        : "/assets/P2E/overview/copy-icon.svg"
                    }
                  />
                </span>
              </div>
            ) : (
              <div>
                <KButton title="Show code" onClick={showCode} />
              </div>
            )}
          </div>
        </div>
      </PrizePopover>
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

export default CouponItem;
