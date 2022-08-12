import React from "react";
import s from "./index.module.sass";
import {Button} from "antd";
import {InventoryItem} from "src/generated/graphql_p2e";
import PrizePopover from "../../../../p2e/lucky/prize/popover";
import sChestPrize from "../../../../p2e/lucky/prize/ChestPrize.module.sass"
import ButtonWrapper from "../../../../../common/button/Button";
type Props = {
  item: InventoryItem;
  isOwner?: boolean;
};

const ItemsTabItem = (props: Props) => {
  const {item, isOwner} = props
  return (
    <>
      <PrizePopover
        image={item?.prize?.img ?? ""}
        title={item?.prize?.title ?? ""}
        description={item?.prize?.desc ?? ""}
        rarity={item?.prize?.rarity ?? ""}
      >
        <div className={`${sChestPrize.chestPrize} ${item?.prize?.rarity ?? ''} ${s.chestPrize}`}>
          <div className={sChestPrize.prizeImg}>
            <img src={item?.prize?.img ?? '/assets/P2E/lucky-chest/defaultPrizeImage.png'} alt=""/>
          </div>
          <div className={`${sChestPrize.prizeTitle} ${s.prizeTitle}`}>
            {item?.prize?.title ?? ''}
          </div>
            {
              item?.quantity && isOwner &&
                <div className={s.prizeAmount}>
                    <div className={s.prizeAmountQty}>
                        Amount:{" "}{item?.quantity}
                    </div>
                    <div>
                        <ButtonWrapper width={80}>Claim</ButtonWrapper>
                    </div>
                </div>
            }
        </div>
      </PrizePopover>
    </>
  );
};

export default ItemsTabItem;
