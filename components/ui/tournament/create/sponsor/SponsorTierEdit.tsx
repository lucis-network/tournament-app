import React, { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import { Col, Input, Row, Select, Switch } from "antd";
import Text from "antd/lib/typography/Text";
import { SponsorTierType } from "src/store/TournamentStore";
import s from "./index.module.sass";
const { Option } = Select

type SponsorTierEditProps = {
  data: SponsorTierType;
  saveTier: (newTierData: SponsorTierType) => void;
  currencyUid?: string;
};

export default observer(function SponsorTierEdit(props: SponsorTierEditProps) {
  const { data, saveTier, currencyUid } = props;

  const maxSponsorOptions = [];
  for (let i = 1; i <= 20; i++) {
    maxSponsorOptions.push(<Option value={i} key={i}>{i}</Option>);
  }
  
  const handleSwitchChange = (checked: boolean, event: any) => {
    const button = event.target.closest("button");
    switch (button.title) {
      case "Name":
        console.log('Name ' + checked)
        break;
      case "Ads":
        console.log('Ads ' + checked)
        break;
      default:
        break;
    }
  };

  const handleMaxSponsorChange = (value: string) => {
    console.log('handleMaxSponsorChange: ', value)
  };
  
  const handleMinSponsorAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('handleMinSponsorAmountChange: ', event.target.value)
  };

  return (
    <Row align="top" className={s.editTierWrap}>
      <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} className="px-2 mb-5 md:mb-0">
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
            />
          </Col>
          <Col span={24} className="mt-2">
            <Text italic className="mb-0">
              This ads video will be display on the tournament detail screen {">"} Cover Section
            </Text>
          </Col>
        </Row>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} className="px-2">
        <Row className="mb-5">
          <Col xs={{ span: 12 }} md={{ span: 14 }} lg={{ span: 14 }}>
            <label>Max sponpor slot for this tier</label>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 10 }} lg={{ span: 10 }}>
            <Select defaultValue={`${data.max}`} style={{ width: '100%' }} onChange={handleMaxSponsorChange}>
              {maxSponsorOptions}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 12 }} md={{ span: 14 }} lg={{ span: 14 }}>
            <label>Min sponsor amount</label>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 10 }} lg={{ span: 10 }}>
            <Input
              type="number"
              min={0}
              defaultValue={data.min}
              onChange={handleMinSponsorAmountChange}
              addonAfter={currencyUid}
              placeholder={`${data.min}`}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
})

