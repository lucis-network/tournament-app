import React, {useEffect, useMemo, useRef, useState} from "react";
import s from "./index.module.sass";
import Tabs from "antd/lib/tabs";
import TabItemsInventory from "./tabItems/tabItems";
import TabPiecesInventory from "./tabPieces/tabPieces";
import { AuthUser } from "../../../../../Auth/AuthStore";
import { useRouter } from "next/router";
import CouponTabInventory from "./tabCoupons/tabCoupons";
import NftTabInventory from "./tabNft/TabNft";
import {AppEmitter} from "../../../../../../services/emitter";
import Link from "next/link";

type Props = {
  isOwner?: boolean;
  userInfo: AuthUser;
};
const { TabPane } = Tabs;

const Inventory = (props: Props) => {
  const { isOwner, userInfo } = props;
  const router = useRouter();
  const selectedType = router.query.type as string;

  const [activeType, setActiveType] = useState<string>(selectedType)
  // computation key
  useEffect(() => {
    setActiveType(selectedType)
  }, [selectedType])

  const onChange = (key: string) => {
    router.push("/profile?page=inventory&type=" + key);
  };

  return (
    <div className={s.wrapper}>
      <h2>Inventory</h2>

      <Tabs activeKey={activeType ?? "items"} onChange={onChange}>
        <TabPane tab="Items" key="items">
          <TabItemsInventory
            isOwner={isOwner}
            userInfo={userInfo}
          ></TabItemsInventory>
        </TabPane>
        <TabPane tab="Pieces" key="pieces">
          <TabPiecesInventory
            isOwner={isOwner}
            userInfo={userInfo}
          ></TabPiecesInventory>
        </TabPane>
        <TabPane tab="Coupons" key="coupon">
          <CouponTabInventory
            isOwner={isOwner}
            userInfo={userInfo}
          ></CouponTabInventory>
        </TabPane>
        <TabPane tab="NFT" key="nfts">
          <NftTabInventory
            isOwner={isOwner}
            userInfo={userInfo}
          ></NftTabInventory>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Inventory;
