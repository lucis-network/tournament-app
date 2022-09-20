import React, { useCallback, useState } from "react";
import s from "../index.module.sass";
import { Input, Select } from "antd";
import debounce from "lodash/debounce";
import CouponItem from "./couponItem";
import AuthStore, { AuthUser } from "../../../../../../Auth/AuthStore";
import { useMyCoupon } from "hooks/myProfile/useCoupon";

type Props = {
  isOwner?: boolean;
  userInfo: AuthUser;
};

const { Option } = Select;

const CouponTabInventory = (props: Props) => {
  const { isOwner, userInfo } = props;
  const [searchName, setSearchName] = useState<string>("");

  const { dataMyInventoryCoupons, loading, refetchMyInventoryCoupon } =
    useMyCoupon({
      user_id: isOwner ? AuthStore.id || undefined : Number(userInfo.id),
      search_name: searchName,
    });

  const onSearch = (e: any) => {
    delayedSearch(e.target.value);
  };

  const delayedSearch = useCallback(
    debounce((value: string) => {
      setSearchName(value);
    }, 600),
    []
  );

  return (
    <>
      <div className={s.groupSearch}>
        <div>
          {/*<img src="/assets/home/ic_member.svg" alt="" />*/}
          <Input
            placeholder="Search"
            onChange={onSearch}
            className={`${s.searchText}`}
          />
        </div>
      </div>
      <div className={s.listItemsInventory}>
        {dataMyInventoryCoupons &&
          dataMyInventoryCoupons.map((item, index) => (
            <>
              <div className={s.item} key={`${index}${item?.prize_id}`}>
                <CouponItem
                  item={item}
                  isOwner={isOwner}
                  refetch={refetchMyInventoryCoupon}
                ></CouponItem>
              </div>
            </>
          ))}
      </div>
      {!dataMyInventoryCoupons && <div className={s.emptyItem}>No items</div>}
    </>
  );
};

export default CouponTabInventory;
