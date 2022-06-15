import { observer } from "mobx-react-lite";
import { Button } from "antd";
import { uniqueId } from "lodash"
import s from "./index.module.sass";
import sponsorStore, { SponsorTierStore, SponsorSlot } from "./SponsorStore";
import SponsorTier from "./SponsorTier";

type Props = {};

const tiersDataInit: SponsorTierStore[] = [
  new SponsorTierStore(uniqueId('tier_'), "Diamond", {
    min_deposit: 0,
    max_slot: 1,
    show_ads: false,
    show_logo: true,
    show_name: true,
    slots: [new SponsorSlot()],
  }),
  new SponsorTierStore(uniqueId('tier_'), "Gold", {
    min_deposit: 0,
    max_slot: 2,
    show_logo: true,
    show_name: false,
    show_ads: false,
    slots: [new SponsorSlot(), new SponsorSlot()],
  }),
  // new SponsorTierStore(uniqueId('tier_'), "Silver", {
  //   min_deposit: 0,
  //   max_slot: 3,
  //   show_logo: true,
  //   show_name: false,
  //   show_ads: false,
  //
  //   slots: [new SponsorSlot(), new SponsorSlot(), new SponsorSlot()],
  // }),
  // new SponsorTierStore(uniqueId('tier_'), "Enthusiast", {
  //   min_deposit: 0,
  //   max_slot: 5,
  //   show_logo: true,
  //   show_name: false,
  //   show_ads: false,
  //   slots: [new SponsorSlot(), new SponsorSlot(), new SponsorSlot(), new SponsorSlot(), new SponsorSlot()],
  // }),
];

sponsorStore.setState({
  tiers: [...tiersDataInit],
})

// const minAmountInit = [1000, 700, 500, 300];
const minAmountInit = [0, 0, 0, 0];

export default observer(function Sponsor(props: Props) {
  const { tiers } = sponsorStore;
  const tierIDs = tiers.map(tier => tier.tier_id)

  return (
    <div className={s.sponsorContainer}>
      {tiers.length > 0 && tiers.map((tier, index) => {
        return (
          <SponsorTier
            data={tier}
            key={tier.tier_id}
            tier_ids={tierIDs}
            minAmountInit={minAmountInit[index]}
          />
        );
      })}
      <Button disabled className={`${s.addNewSponsorBtn} ml-auto mt-5`}>+ Add new sponsor Tier</Button>
    </div>
  );
});
