import { Image } from "antd";
import { Select } from "components/common/select";
import { UserInventoryCoupon } from "src/generated/graphql";
import { RaffleDetail } from "src/generated/graphql_p2e";
import s from "./coupon.module.sass";

type Props = {
  raffle: RaffleDetail;
  coupons?: UserInventoryCoupon[];
  onSelect?: (code: UserInventoryCoupon) => void;
};
export function CouponInput(props: Props) {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    if (!props.coupons) {
      return;
    }
    let result = props.coupons.find((item) => item.uid === value);
    if (!result) {
      return;
    }
    props.onSelect && props.onSelect(result);
  };
  if (!props.coupons || props.coupons.length == 0) {
    return <div></div>;
  }
  return (
    <div className={s.container}>
      <div className={s.prefix}>
        <Image src="/assets/Raffles/ic_coupon.svg" alt="" />
        <div className={s.left_text}>Add Voucher</div>
      </div>

      {/* {!loading && dataMyInventoryCoupons && dataMyInventoryCoupons.length > 0 && } */}
      <Select
        datas={
          props.coupons?.map((item) => ({
            id: item.uid,
            title: item.prize?.title ?? "",
          })) ?? []
        }
        onSelect={handleChange}
      />
    </div>
  );
}
