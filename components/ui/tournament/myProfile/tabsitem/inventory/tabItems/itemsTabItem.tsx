import React, { useState } from "react";
import s from "../index.module.sass";
import { InventoryItem, ItemGroup } from "src/generated/graphql_p2e";
import PrizePopover from "../../../../../p2e/lucky/prize/popover";
import sChestPrize from "../../../../../p2e/lucky/prize/ChestPrize.module.sass";
import ButtonWrapper from "../../../../../../common/button/Button";
import { ApolloQueryResult } from "@apollo/client";
import PopupConfirmItemsCsgo from "../popup/popupConfirmItemsCsgo";
import PopupConfirmItemsPhysical from "../popup/popupConfirmItemsPhysical";
import PopupContactRaffles from "components/ui/p2e/raffles/popup/popupContact";
import { KButton } from "components/ui/common/button";
type Props = {
  item: InventoryItem;
  isOwner?: boolean;
  refetchMyInventoryItems: () => Promise<ApolloQueryResult<any>>;
};

const ItemsTabItem = (props: Props) => {
  const { item, isOwner, refetchMyInventoryItems } = props;
  const [statusCsgo, setStatusCsgo] = useState<boolean>(false);
  const [statusPhysical, setStatusPhysical] = useState<boolean>(false);
  const [statusPopupContact, setStatusPopupContact] = useState<boolean>(false);

  const openClaimConfirmPopup = () => {
    if (item?.prize?.category?.item_group === ItemGroup.Csgo) {
      setStatusCsgo(true);
    } else if (item?.prize?.category?.item_group === ItemGroup.Physical) {
      setStatusPhysical(true);
    } else {
      setStatusPopupContact(true);
    }
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
          {item?.quantity && isOwner && (
            <div className={s.prizeAmount}>
              {/* only show claim if not GiftCard */}
              {(item?.prize?.category?.in_game_prize_type != "GiftCard") && <div className={s.prizeAmountQty}>Amount: {item?.quantity}</div>}
              <div>
                <KButton
                  title="Claim"
                  width="80px"
                  disabled={item?.quantity <= 0}
                  onClick={openClaimConfirmPopup}
                />
              </div>
            </div>
          )}
        </div>
      </PrizePopover>
      {statusCsgo && (
        <PopupConfirmItemsCsgo
          item={item}
          status={statusCsgo}
          refetchMyInventoryItems={refetchMyInventoryItems}
          onClosePopup={() => setStatusCsgo(false)}
        ></PopupConfirmItemsCsgo>
      )}
      {statusPhysical && (
        <PopupConfirmItemsPhysical
          item={item}
          status={statusPhysical}
          refetchMyInventoryItems={refetchMyInventoryItems}
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
      )}
    </>
  );
};

export default ItemsTabItem;
