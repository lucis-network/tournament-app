import { Image } from "antd";
import { Select } from "components/common/select";
import { useInput } from "hooks/common/use_input";
import { useMyCoupon } from "hooks/myProfile/useCoupon";
import { UserInventoryCoupon } from "src/generated/graphql";
import { RaffleDetail } from "src/generated/graphql_p2e";
import s from "./coupon.module.sass";

type Props = {
  raffle: RaffleDetail;
  onSelect?: (code: UserInventoryCoupon) => void;
};
export function CouponInput(props: Props) {
  const input = useInput();
  const { dataMyInventoryCoupons, loading, refetchMyInventoryCoupon } =
    useMyCoupon({
      type: "Raffle",
      currency_type: props.raffle.ticket?.cost_type ?? undefined,
    });

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    if (!dataMyInventoryCoupons) {
      return;
    }
    let result = dataMyInventoryCoupons.find((item) => item.uid === value);
    if (!result) {
      return;
    }
    props.onSelect && props.onSelect(result);
  };
  if (!dataMyInventoryCoupons || dataMyInventoryCoupons.length == 0) {
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
          dataMyInventoryCoupons?.map((item) => ({
            id: item.uid,
            title: item.prize?.title ?? "",
          })) ?? []
        }
        onSelect={handleChange}
      />
    </div>
  );
}
