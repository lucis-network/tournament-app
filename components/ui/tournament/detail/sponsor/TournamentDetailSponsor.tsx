import {Button, Col, Image, Row} from "antd";
import { Maybe } from "graphql/jsutils/Maybe";
import { useSponsors } from "hooks/tournament/useTournamentDetail";
import { useState } from "react";
import { SponsorSlot, SponsorTransaction } from "src/generated/graphql";
import s from "../../../../../styles/tournament/sponsor/index.module.sass";
import TournamentDetailBecomeSponsor from "./TournamentDetailBecomeSponsor";
import TournamentDetailSponsorTier from "./TournamentDetailSponsorTier";

export type TiersSelectType = {
  uid: string;
  name?: Maybe<string> | undefined;
  min_deposit: number;
  show_ads?: Maybe<boolean> | undefined;
  show_name?: Maybe<boolean> | undefined;
  is_full?: boolean;
};

type Props = {
  tournamentId?: string;
  tournament_status: string;
};

export default function TournamentDetailSponsor(props: Props) {
  const { tournamentId, tournament_status } = props;
  const [isBecome, setIsBecome] = useState(false);
  const { loading, dataSponsors, refetch } = useSponsors({
    tournament_uid: tournamentId,
  });

  let tiersSelect: TiersSelectType[] = [];

  if (dataSponsors?.getSponsorSlot) {
    tiersSelect = dataSponsors.getSponsorSlot.map((tier: SponsorSlot) => {
      let slotsAvailable = tier.max;
      tier.sponsor_transactions?.map(
        (slot: SponsorTransaction) =>
          (slot.order || slot.order === 0) && (slotsAvailable -= 1)
      );

      return {
        name: tier.name,
        uid: tier.uid,
        min_deposit: tier.min,
        show_ads: tier.show_ads,
        show_name: tier.show_name,
        is_full: slotsAvailable <= 0,
      };
    });
  }

  return (
    <div className="lucis-container-2">
      <div className={s.sponsorContainer}>
        <Row>
          <Col xs={{ span: 24, order: 2 }} md={{ span: 16, order: 1 }} lg={{ span: 18 }}>
            {dataSponsors?.getSponsorSlot.length > 0 &&
              dataSponsors.getSponsorSlot.map((tier: SponsorSlot) => {
                const { uid: tierUid } = tier;
                return (
                  <TournamentDetailSponsorTier key={tierUid} tier={tier} />
                );
              })}
          </Col>
          <Col xs={{ span: 24, order: 1 }} md={{ span: 8, order: 2 }} lg={{ span: 6 }} className="text-left">
            {tournament_status !== "CLOSED" ? (
              <Button onClick={() => setIsBecome(true)} className="btn-cyan">
                <Image src="/assets/TournamentDetail/iconBecomeSponsor.svg" preview={false} alt="" />
                Become our sponsor
              </Button>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div>
      {isBecome && (
        <TournamentDetailBecomeSponsor
          isBecome={isBecome}
          setIsBecome={setIsBecome}
          tiersSelect={tiersSelect}
          refetch={refetch}
          tournamentId={tournamentId}
        />
      )}
    </div>
  );
}
