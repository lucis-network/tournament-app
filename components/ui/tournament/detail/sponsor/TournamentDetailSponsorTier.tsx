import { Col, Row } from "antd";
import { Maybe } from "graphql/jsutils/Maybe";
import { SponsorSlot, SponsorTransaction } from "src/generated/graphql";
import TournamentDetailSponsorSlot from "./TournamentDetailSponsorSlot";
import s from "../../../../../styles/tournament/sponsor/index.module.sass";
import { uniqueId } from "lodash";

type TournamentDetailSponsorTierProps = {
  tier: SponsorSlot,
}

export default function TournamentDetailSponsorTier(props: TournamentDetailSponsorTierProps) {
  const { tier } = props;
  const { name: tierName, max: maxSponsorSlot, sponsor_transactions } = tier;

  const newSlots: SponsorTransaction[] = [];

  for (let i = 0; i < maxSponsorSlot; i++) {
    newSlots.push({
      uid: uniqueId('sponsor_'),
      logo: '',
      name: '',
    } as SponsorTransaction)
  }

  if (sponsor_transactions) {
    sponsor_transactions.map((item: SponsorTransaction) => {
      const { order } = item
      newSlots[order as number] = { ...item }
    })
  }

  return (
    <div key={tier.uid} className={s.tierRow}>
      <Row align="middle">
        <Col xs={{ span: 24 }} lg={{ span: 3 }}>
          <div className={s.tierTitle}>{tierName}</div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 21 }}>
          <div className={s.slotWrap}>
            {
              newSlots.length > 0 && 
              newSlots.map((slot) => (
                <TournamentDetailSponsorSlot key={slot.uid} tier={tier} slot={slot} />
              ))
            }
          </div>
        </Col>
      </Row>
    </div>
  )
}