import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Collapse, Input, Row, Space, Switch, Modal } from "antd";
import { uniqueId } from "lodash"
import s from "./index.module.sass";
import TournamentStore from "../../../../../src/store/TournamentStore"
import { SponsorStore, SponsorTierStore, ISponsorTierStore } from "./SponsorStore";
import { isClientDevMode } from "../../../../../utils/Env";
import SponsorTier from "./SponsorTier";

const { Panel } = Collapse;

type Props = {};

const tiersDataInit: SponsorTierStore[] = [
  {
    tier_id: uniqueId('tier_'),
    name: 'Diamond',
    min_deposit: 1000,
    max_slot: 1,
    show_ads: true,
    show_logo: true,
    show_name: true,

    slots: [],
  } as SponsorTierStore,
  {
    tier_id: uniqueId('tier_'),
    name: 'Gold',
    min_deposit: 700,
    max_slot: 2,
    show_logo: true,
    show_name: false,
    show_ads: false,

    slots: [],
  } as SponsorTierStore,
  {
    tier_id: uniqueId('tier_'),
    name: 'Silver',
    min_deposit: 500,
    max_slot: 3,
    show_logo: true,
    show_name: false,
    show_ads: false,

    slots: [],
  } as SponsorTierStore,
  {
    tier_id: uniqueId('tier_'),
    name: 'Enthusiast',
    min_deposit: 300,
    max_slot: 5,
    show_logo: true,
    show_name: false,
    show_ads: false,

    slots: [],
  } as SponsorTierStore,
];

const sponsorStore =  new SponsorStore();
if (isClientDevMode) {
  // @ts-ignore
  window.tmp__SponsorStore = sponsorStore;
}

sponsorStore.setState({
  tiers: [...tiersDataInit],
})

export default observer(function Sponsor(props: Props) {
  const { tiers } = sponsorStore;
  
  return (
    <div className={s.sponsorContainer}>
      {tiers.length > 0 && tiers.map((i) => {
        return (
          <SponsorTier data={i} key={i.tier_id} />
        );
      })}
    </div>
  );
});
