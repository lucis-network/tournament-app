import { Button, Col, Image, message, Row } from "antd";
import AuthStore from "components/Auth/AuthStore";
import { Maybe } from "graphql/jsutils/Maybe";
import { useSponsors } from "hooks/tournament/useTournamentDetail";
import { useState } from "react";
import { SponsorSlot, SponsorTransaction } from "src/generated/graphql";
import s from "../../../../../styles/tournament/sponsor/index.module.sass";
import TournamentDetailBecomeSponsor from "./TournamentDetailBecomeSponsor";
import TournamentDetailSponsorTier from "./TournamentDetailSponsorTier";
import {isEmpty} from "lodash";

export type TiersSelectType = {
  uid: string;
  name?: Maybe<string> | undefined;
  min_deposit: number;
  show_ads?: Maybe<boolean> | undefined;
  show_name?: Maybe<boolean> | undefined;
  is_full?: boolean;
  dataSponsors?: any;
  refetchSponsor?: any;
};

type Props = {
  tournamentId?: string;
  tournament_status: string;
  refetchTounament?: any;
};

export default function TournamentDetailSponsor(props: Props) {
  const { tournamentId, tournament_status, refetchTounament } = props;
  const [isBecome, setIsBecome] = useState(false);
  const {
    loading,
    dataSponsors,
    refetchSponsor: refetch,
  } = useSponsors({
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
    <>
      <div className={s.sponsorContainer}>
        {tournament_status !== "CLOSED" ? (
          <div className={s.becomeWrap}>
            <Button
              onClick={() => {
                if (!AuthStore.isLoggedIn) {
                  message.info("Please sign in first");
                  return;
                }
                setIsBecome(true);
              }}
              className="btn-cyan"
            >
              <Image
                src="/assets/TournamentDetail/iconBecomeSponsor.svg"
                preview={false}
                alt=""
              />
              Become our sponsor
            </Button>
          </div>
        ) : (
          ""
        )}
        <Row>
          <Col
            span={24}
          >
            {dataSponsors?.getSponsorSlot.length > 0 &&
              dataSponsors.getSponsorSlot.map((tier: SponsorSlot) => {
                const { uid: tierUid } = tier;
                return (
                  <TournamentDetailSponsorTier key={tierUid} tier={tier} />
                );
              })}
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
          refetchTounament={refetchTounament}
        />
      )}
    </>
  );
}
