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
    //uid: "diamond",
    name: 'Diamond',
    min: 1000,
    max: 1,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    // slots: [
    //   {
    //     id: "sponsor1",
    //     name: "Sponsor 1",
    //     logo: ""
    //   },
    // ]
  },
  {
    //uid: "gold",
    name: 'Gold',
    min: 1000,
    max: 2,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    // slots: [
    //   {
    //     id: "sponsor2",
    //     name: "Sponsor 2",
    //     logo: ""
    //   },
    //   {
    //     id: "sponsor3",
    //     name: "Sponsor 3",
    //     logo: ""
    //   },
    // ]
  },
  {
    //uid: "silver",
    name: 'Silver',
    min: 1000,
    max: 3,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    // slots: [
    //   {
    //     id: "sponsor4",
    //     name: "Sponsor 4",
    //     logo: ""
    //   },
    //   {
    //     id: "sponsor5",
    //     name: "Sponsor 5",
    //     logo: ""
    //   },
    //   {
    //     id: "sponsor6",
    //     name: "Sponsor 6",
    //     logo: ""
    //   },
    // ]
  },
  {
    //uid: "enthusiated",
    name: 'Enthusiated',
    min: 1000,
    max: 5,
    show_ads: true,
    show_logo: true,
    show_name: true,
    cover: "",
    // slots: [
    //   {
    //     id: "sponsor7",
    //     name: "Sponsor 7",
    //     logo: ""
    //   },
    //   {
    //     id: "sponsor8",
    //     name: "Sponsor 8",
    //     logo: ""
    //   },
    //   {
    //     id: "sponsor9",
    //     name: "Sponsor 9",
    //     logo: ""
    //   },
    //   {
    //     id: "sponsor10",
    //     name: "Sponsor 10",
    //     logo: ""
    //   },
    //   {
    //     id: "sponsor11",
    //     name: "Sponsor 11",
    //     logo: ""
    //   },
    // ]
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
