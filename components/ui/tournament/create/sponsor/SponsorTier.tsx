import { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Input, Row, Switch, Select, Typography } from "antd";
import { SponsorSlotType, SponsorTierType } from "src/store/TournamentStore";
import s from "./index.module.sass";
import SponsorSlot from "./SponsorSlot";
import TournamentStore from "../../../../../src/store/TournamentStore"
import SponsorTierEdit from "./SponsorTierEdit";

type SponsorTierProps = {
  data: SponsorTierType;
  saveTier: (newTierData: SponsorTierType) => void;
}

export default observer(function SponsorTier(props: SponsorTierProps) {
  const { data, saveTier } = props
  const [showEdit, setShowEdit] = useState(false);
  const [slotsData, setSlotsData] = useState([] as SponsorSlotType[])
  const { currency_uid, sponsor_slots } = TournamentStore

  const initSlots: SponsorSlotType[] = [];
  for (let i = 1; i <= data.max; i++) {
    initSlots.push(
      {
        logo: '',
        name: '',
        home_page: '',
        ads_link: '',
        amount: data.min,
      }
    )
  }

  const changeShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const onSponsorUpdate = (data: SponsorSlotType, index: number) => {
    console.log('onSponsorUpdate: ', data, index)
  }

  useEffect(() => {
    setSlotsData(initSlots)
  }, [])

  useEffect(() => {
    console.log('sponsor_slots: ', sponsor_slots)
    const a = sponsor_slots.filter(item => item.name === data.name)
    // setSlotsData(initSlots)
  }, [sponsor_slots])
  
  return (
    <div className={s.tierRow}>
      <Row align="middle">
        <Col xs={{ span: 8, order: 1 }} lg={{ span: 3 }}>
          <div className={s.tierTitle}>{data.name}</div>
          <div>(Min {`${data.min} ${currency_uid}`})</div>
        </Col>

        <Col xs={{ span: 24, order: 3 }} lg={{ span: 13, order: 2 }}>
          <div className={s.slotWrap}>
            {slotsData.length > 0 && slotsData.map((slot, index) => (
              <SponsorSlot
                key={index}
                showName={data.show_name}
                tier={data.name}
                onUpdate={onSponsorUpdate}
                slot={slot}
                index={index}
                minAmount={data.min}
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
          <Col lg={{ span: 18, offset: 3 }}>
            <SponsorTierEdit
              data={data}
              saveTier={saveTier}
              currencyUid={TournamentStore.currency_uid}
            ></SponsorTierEdit>
          </Col>
        </Row>
      )}
    </div>
  );
});
