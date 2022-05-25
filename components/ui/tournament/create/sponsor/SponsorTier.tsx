import { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Input, Row, Switch, Select, Typography } from "antd";
import { SponsorSlotType, SponsorTierType } from "src/store/TournamentStore";
import s from "./index.module.sass";
import SponsorSlot from "./SponsorSlot";
import TournamentStore from "../../../../../src/store/TournamentStore"
import SponsorTierEdit from "./SponsorTierEdit";
import { SponsorTierStore } from "./SponsorStore";

type SponsorTierProps = {
  data: SponsorTierStore;
  tier_ids: string[];
  minAmountInit: number;
}

export default observer(function SponsorTier(props: SponsorTierProps) {
  const { data: tierStore, tier_ids, minAmountInit } = props
  const [showEdit, setShowEdit] = useState(false);
  const { currency_uid, currency_symbol} = TournamentStore

  const {
    tier_id,
    name,
    show_logo,
    show_name,
    show_ads,
    max_slot,
    min_deposit,
    slots,
  } = tierStore;

  const changeShowEdit = () => {
    setShowEdit(!showEdit);
  };
  
  return (
    <div className={s.tierRow}>
      <Row align="middle">
        <Col xs={{ span: 8, order: 1 }} lg={{ span: 3 }}>
          <div className={s.tierTitle}>{name}</div>
          <div>(Min {`${min_deposit} ${currency_symbol}`})</div>
        </Col>

        <Col xs={{ span: 24, order: 3 }} lg={{ span: 13, order: 2 }}>
          <div className={s.slotWrap}>
            {slots.length > 0 && slots.map((slot, index) => (
              <SponsorSlot
                key={index}
                slot={slot}
                tier_ids={tier_ids}
                tier={tierStore}
                show_name={show_name}
                min_deposit={min_deposit}
                show_ads={show_ads}
                minAmountInit={minAmountInit}
              />
            ))}
          </div>
        </Col>
        <Col xs={{ span: 16, order: 2 }} lg={{ span: 8 }} className="text-right">
          <Button
            className={s.editTier}
            onClick={changeShowEdit}
          >
            Edit this tier requirement
          </Button>
        </Col>
      </Row>

      {showEdit && (
        <Row className={s.collapse}>
          <Col xl={{ span: 18, offset: 3 }}>
            <SponsorTierEdit
              data={tierStore}
              currencyUid={currency_uid}
              minAmountInit={minAmountInit}
              currency_symbol={currency_symbol}
            />
          </Col>
        </Row>
      )}
    </div>
  );
});
