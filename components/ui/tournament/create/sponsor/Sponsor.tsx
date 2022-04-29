import { observer } from "mobx-react-lite";
import { Collapse } from "antd";
import { uniqueId } from "lodash"
import s from "./index.module.sass";
import sponsorStore, { SponsorTierStore, SponsorSlot } from "./SponsorStore";
import SponsorTier from "./SponsorTier";

const { Panel } = Collapse;

type Props = {};

const tiersDataInit: SponsorTierStore[] = [
  new SponsorTierStore(uniqueId('tier_'), "Diamond", {
    min_deposit: 1000,
    max_slot: 1,
    show_ads: true,
    show_logo: true,
    show_name: true,
    slots: [new SponsorSlot()],
  }),
  new SponsorTierStore(uniqueId('tier_'), "Gold", {
    min_deposit: 700,
    max_slot: 2,
    show_logo: true,
    show_name: false,
    show_ads: false,
    slots: [new SponsorSlot(), new SponsorSlot()],
  }),
  new SponsorTierStore(uniqueId('tier_'), "Silver", {
    min_deposit: 500,
    max_slot: 3,
    show_logo: true,
    show_name: false,
    show_ads: false,

    slots: [new SponsorSlot(), new SponsorSlot(), new SponsorSlot()],
  }),
  new SponsorTierStore(uniqueId('tier_'), "Enthusiast", {
    min_deposit: 300,
    max_slot: 5,
    show_logo: true,
    show_name: false,
    show_ads: false,
    slots: [new SponsorSlot(), new SponsorSlot(), new SponsorSlot(), new SponsorSlot(), new SponsorSlot()],
  }),
];

sponsorStore.setState({
  tiers: [...tiersDataInit],
})

export default observer(function Sponsor(props: Props) {
  const { tiers } = sponsorStore;
  const tierIDs = tiers.map(tier => tier.tier_id)

  return (
    <div className={s.sponsorContainer}>
      {tiers.length > 0 && tiers.map((i) => {
        return (
          <SponsorTier data={i} key={i.tier_id} tier_ids={tierIDs} />
        );
      })}
    </div>
  );
});
