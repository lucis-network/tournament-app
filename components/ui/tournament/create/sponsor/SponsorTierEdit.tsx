import React, { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import { Col, InputNumber, Row, Select, Switch } from "antd";
import Text from "antd/lib/typography/Text";
import s from "./index.module.sass";
import { SponsorTierStore, SponsorSlot } from "./SponsorStore";

const { Option } = Select

type SponsorTierEditProps = {
  data: SponsorTierStore;
  currencyUid?: string;
  minAmountInit: number;
  currency_symbol?: string;
};

export default observer(function SponsorTierEdit(props: SponsorTierEditProps) {
  const { data, currencyUid, minAmountInit, currency_symbol } = props;

  const maxSponsorOptions = [];
  for (let i = 0; i <= 20; i++) {
    maxSponsorOptions.push(<Option value={i} key={i}>{i}</Option>);
  }
  
  const handleSwitchChange = (checked: boolean, event: any) => {
    const button = event.target.closest("button");
    switch (button.title) {
      case "Name":
        data.setState({
          show_name: checked,
        })
        break;
      case "Ads":
        data.setState({
          show_ads: checked,
        })
        break;
      default:
        break;
    }
  };

  const handleMaxSponsorChange = (value: string) => {
    const new_slots = [...data.slots];
    const max_slot = parseInt(value);

    /**
     * render slots base on max slot
     *  - case 1: max slot decrease => trim the end of slots array
     *  - case 2: max slot increase => push to the end of slots array
     */
    if (max_slot < new_slots.length) {
      for (let i = 0, c = new_slots.length - max_slot; i < c; i++) {
        new_slots.pop();
      }
    } else if (max_slot > new_slots.length) {
      for (let i = 0, c = max_slot - new_slots.length; i < c; i++) {
        new_slots.push(new SponsorSlot());
      }
    }

    data.setState({
      max_slot,
      slots: new_slots,
    })
  };
  
  const handleMinSponsorAmountChange = (value: number) => {
    if ((value !== null) && (value > 0)) {
      data.setState({
        min_deposit: value
      })
    } else {
      data.setState({
        min_deposit: minAmountInit
      })
    }
  };

  return (
    <Row align="top" className={s.editTierWrap}>
      <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 14 }} className="px-2 mb-5 md:mb-0">
        <Row className="mb-5">
          <Col span={16}>
            <label>Show logo</label>
          </Col>
          <Col span={8}>
            <Switch
              defaultChecked={data.show_logo}
              onChange={handleSwitchChange}
              title="Logo"
              disabled
            />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col span={16}>
            <label>Show Name</label>
          </Col>
          <Col span={8}>
            <Switch
              defaultChecked={data.show_name}
              onChange={handleSwitchChange}
              title="Name"
            />
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <label>Sponsor ads video</label>
          </Col>
          <Col span={8}>
            <Switch
              defaultChecked={data.show_ads}
              onChange={handleSwitchChange}
              title="Ads"
              disabled
            />
          </Col>
          <Col span={24} className="mt-2">
            <p className={s.adsDescription}>
              This ads video will be display on the tournament detail screen {">"} Cover Section
            </p>
          </Col>
        </Row>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 10 }} className="px-2">
        <Row className="mb-5">
          <Col xs={{ span: 12 }} md={{ span: 14 }} lg={{ span: 14 }}>
            <label>Max sponpor slot for this tier</label>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 10 }} lg={{ span: 10 }}>
            <Select
              defaultValue={`${data.max_slot}`}
              onChange={handleMaxSponsorChange}
              className={`${s.formFieldBg} ${s.formFieldSelect}`}
            >
              {maxSponsorOptions}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 12 }} md={{ span: 14 }} lg={{ span: 14 }}>
            <label>Min sponsor amount</label>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 10 }} lg={{ span: 10 }} className={s.amountCurrency}>
            <InputNumber
              defaultValue={data.min_deposit}
              min={minAmountInit}
              max={999999999999999}
              onChange={handleMinSponsorAmountChange}
              placeholder={`${minAmountInit}`}
              controls={false}
              className={`${s.formFieldBg} ${s.formFieldNumber}`}
            />
            {currency_symbol && (
              <span className={s.currencySymbol}>{currency_symbol}</span>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
})

