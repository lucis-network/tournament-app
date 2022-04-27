import { observer } from "mobx-react-lite";
import { Button, Col, Collapse, Input, Row, Space, Switch } from "antd";
import s from "./index.module.sass";
import { useEffect, useState } from "react";
import { SponsorTierType } from "src/store/TournamentStore";
import SponsorTier from "./SponsorTier";
const { Panel } = Collapse;
import TournamentStore from "../../../../../src/store/TournamentStore"

type Props = {};

const sponsorsDataInit: SponsorTierType[] = [
  {
    uid: "diamond",
    name: 'Diamond',
    min: 1000,
    max: 1,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    slots: [null],
  },
  {
    uid: "gold",
    name: 'Gold',
    min: 1000,
    max: 2,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    slots: [
      {
        name: "Sponsor 2",
        logo: "",
        sponsor_amount: 5000,
        home_page: "",
        ads_video: "",
      },
      {
        name: "Sponsor 3",
        logo: "",
      },
    ],
  },
  {
    uid: "silver",
    name: 'Silver',
    min: 1000,
    max: 3,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    slots: [
      null,
      {
        name: "Sponsor 5",
        logo: "",
      },
      null,
    ],
  },
  {
    uid: "enthusiated",
    name: 'Enthusiated',
    min: 1000,
    max: 5,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    slots: [
      {
        name: "Sponsor 7",
        logo: "",
      },
      {
        name: "Sponsor 8",
        logo: "",
      },
      {
        name: "Sponsor 9",
        logo: "",
      },
      {
        name: "Sponsor 10",
        logo: "",
      },
      {
        name: "Sponsor 11",
        logo: "",
      },
    ],
  },
];

export default observer(function Sponsor(props: Props) {
  const [sponsorsData, setSponsorsData] = useState(sponsorsDataInit)
  const saveData = (newData: SponsorTierType) => {
    const tempArray = [...sponsorsData]
    tempArray[tempArray.findIndex(item => item.uid === newData.uid)] = newData
    setSponsorsData(tempArray)
  }
  
  useEffect(() => {
    TournamentStore.sponsor_slots = JSON.parse(JSON.stringify(sponsorsData))
    console.log('TournamentStore: ', TournamentStore.sponsor_slots)
  }, [sponsorsData]);
 
  return (
    <div className={s.sponsorContainer}>
      {sponsorsData.length > 0 && sponsorsData.map((item) => {
        return (
          <SponsorTier data={item} saveData={saveData} key={item.uid}/>
        );
      })}
    </div>
  );
});
