import { Col, Row } from "antd";
import { Maybe } from "graphql/jsutils/Maybe";
import { SponsorSlot, SponsorTransaction } from "src/generated/graphql";
import TournamentDetailSponsorSlot from "./TournamentDetailSponsorSlot";
import s from "../../../../../styles/tournament/sponsor/index.module.sass";
import { isEmpty, uniqueId } from "lodash";
import { useEffect, useState } from "react";

type TournamentDetailSponsorTierProps = {
  tier: SponsorSlot;
  index: number;
  type?: string;
};

export default function TournamentDetailSponsorTier(
  props: TournamentDetailSponsorTierProps
) {
  const { tier, index, type } = props;
  const { name: tierName, max: maxSponsorSlot, sponsor_transactions } = tier;

  const [checkBanner, setCheckBanner] = useState(false);
  const [checkBlankLogo, setCheckBlankLogo] = useState(false);

  const newSlots: SponsorTransaction[] = [
    {
      uid: uniqueId("sponsor_"),
      logo: "",
      name: "",
    } as SponsorTransaction
  ];

  // for (let i = 0; i < maxSponsorSlot; i++) {
  //   newSlots.push({
  //     uid: uniqueId("sponsor_"),
  //     logo: "",
  //     name: "",
  //   } as SponsorTransaction);
  // }

  if (sponsor_transactions) {
    sponsor_transactions.map((item: SponsorTransaction) => {
      const { order } = item;
      newSlots[order as number] = { ...item };
    });
  }

  useEffect(() => {
    if (newSlots && index === 0) {
      newSlots.forEach((slot) => {
        if (slot?.logo !== "") {
          setCheckBanner(true);
        }
      });
    }
  }, [newSlots]);

  useEffect(() => {
    if (newSlots) {
      newSlots.forEach((slot) => {
        if (slot?.logo !== "") {
          setCheckBlankLogo(true);
        }
      });
    }
  }, [newSlots]);

  return (
    <div
      key={tier.uid}
      className={`${s.tierRow} ${
        !checkBanner && index === 0 && type === "banner" ? `hidden` : ""
      }`}
    >
      <Row align="middle" justify="center">
        <Col span={24}>
          <div className={s.slotWrap}>
            {newSlots.length > 0 &&
              type !== "banner" &&
              newSlots.map((slot) => {
                return (
                  <div key={slot.uid}>
                    <TournamentDetailSponsorSlot
                      tier={tier}
                      slot={slot}
                      checkBanner={checkBanner}
                      index={index}
                      checkBlankLogo={checkBlankLogo}
                    />
                  </div>
                );
              })}
            {newSlots.length > 0 &&
              type === "banner" &&
              index === 0 &&
              newSlots.map((slot) => {
                return (
                  <div key={slot.uid}>
                    <TournamentDetailSponsorSlot
                      tier={tier}
                      slot={slot}
                      //index={index}
                    />
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>
    </div>
  );
}
