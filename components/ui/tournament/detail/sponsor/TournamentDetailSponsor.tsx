import { Button, Col, Row } from "antd";
import { Maybe } from "graphql/jsutils/Maybe";
import { useSponsors } from "hooks/tournament/useTournamentDetail";
import { useState } from "react";
import { SponsorSlot } from "src/generated/graphql";
import s from "../../../../../styles/tournament/sponsor/index.module.sass";
import TournamentDetailBecomeSponsor from "./TournamentDetailBecomeSponsor";
import TournamentDetailSponsorTier from "./TournamentDetailSponsorTier";

export type TiersSelectType = {
  uid: string,
  name?: Maybe<string> | undefined,
  min_deposit: number,
  show_ads?: Maybe<boolean> | undefined,
  show_name?: Maybe<boolean> | undefined,
}

export default function TournamentDetailSponsor() {
  const [isBecome, setIsBecome] = useState(false);
  const { dataSponsors } = useSponsors({
    tournament_uid: "cl2kk1jtj40610lpwk9dtfim7",
  });

  let tiersSelect: TiersSelectType[] = [];

  if (dataSponsors?.getSponsorSlot) {
    tiersSelect = dataSponsors.getSponsorSlot.map((tier: SponsorSlot, index: number) => ({
      name: tier.name,
      uid: tier.uid,
      min_deposit: tier.min,
      show_ads: index % 2 === 0 ? true : false, // todo update by tier show_ads
      show_name: tier.show_name,
    }))
  }

  console.log('dataSponsors: ', dataSponsors)

  return (
    <>
      <div className={s.sponsorContainer}>
        <Row>
          <Col md={{ span: 18 }}>
            {
              (dataSponsors?.getSponsorSlot.length > 0) && 
                dataSponsors.getSponsorSlot.map((tier: SponsorSlot) => {
                const { sponsor_transactions, uid: tierUid } = tier;
                return (
                  <TournamentDetailSponsorTier key={tierUid} tier={tier} sponsor_transactions={sponsor_transactions} />
                )
              })
            }
          </Col>
          <Col md={{ span: 6 }}>
            <Button onClick={() => setIsBecome(true)}>Become our sponsor</Button>
          </Col>
        </Row>
      </div>
      {isBecome && <TournamentDetailBecomeSponsor isBecome={isBecome} setIsBecome={setIsBecome} tiersSelect={tiersSelect} />}
    </>
   );
}
