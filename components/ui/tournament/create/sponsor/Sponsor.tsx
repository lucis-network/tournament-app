import { observer } from "mobx-react-lite";
import { Button, Col, Collapse, Input, Row, Space, Switch, Modal } from "antd";
import s from "./index.module.sass";
import { useEffect, useState } from "react";
import { SponsorTierType } from "src/store/TournamentStore";
import SponsorTier from "./SponsorTier";
const { Panel } = Collapse;
import TournamentStore from "../../../../../src/store/TournamentStore"
import { uniqueId } from "lodash"

type Props = {};

const tiersDataInit: SponsorTierType[] = [
  {
    tierId: uniqueId('tier_'),
    name: 'Diamond',
    min: 1000,
    max: 1,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    sponsor_transactions: {
      createMany: {
        data: [],
      },
    },
  },
  {
    tierId: uniqueId('tier_'),
    name: 'Gold',
    min: 700,
    max: 2,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    sponsor_transactions: {
      createMany: {
        data: [],
      },
    },
  },
  {
    tierId: uniqueId('tier_'),
    name: 'Silver',
    min: 500,
    max: 3,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    sponsor_transactions: {
      createMany: {
        data: [],
      },
    },
  },
  {
    tierId: uniqueId('tier_'),
    name: 'Enthusiated',
    min: 300,
    max: 5,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    sponsor_transactions: {
      createMany: {
        data: [],
      },
    },
  },
];

export default observer(function Sponsor(props: Props) {
  let { sponsor_slots } = TournamentStore;
  const [tiersData, setTiersData] = useState(sponsor_slots)
  const saveTier = () => {
    console.log('saveTier')
  }

  useEffect(() => {
    sponsor_slots = tiersDataInit
    console.log('Sponsor.tsx: sponsor_slots: ', sponsor_slots)
  }, [])

  useEffect(() => {
    setTiersData(sponsor_slots)
  }, [sponsor_slots])
  
  return (
    <div className={s.sponsorContainer}>
      {tiersData.length > 0 && tiersData.map((item, index) => {
        return (
          <SponsorTier data={item} saveTier={saveTier} key={item.name} />
        );
      })}
    </div>
  );
});
