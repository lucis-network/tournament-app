import { ChangeEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Input, Row, Switch, Select, Typography } from "antd";
import { SponsorTierType } from "src/store/TournamentStore";
import s from "./index.module.sass";
import SponsorSlot from "./SponsorSlot";
import TournamentStore from "../../../../../src/store/TournamentStore"

type SponsorTierProps = {
  data: SponsorTierType;
  saveData: (newData: SponsorTierType) => void;
}

type EditTierProps = {
  data: SponsorTierType;
  saveData: (...args: any[]) => void;
  currencyUid?: string;
};

const { Option } = Select;
const { Text } = Typography;

export default observer(function SponsorTier(props: SponsorTierProps) {
  const { data, saveData } = props
  const [showEdit, setShowEdit] = useState(false);

  const changeShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const slots = [];
  for (let i = 1; i <= data.max; i++) {
    slots.push(
      <SponsorSlot
        key={i}
        showName={data.show_name}
        tier={data.name}
        slot={{
          logo: "",
          name: "Sponsor name",
          home_page: "",
          ads_video: ""
        }}
      />
    )
  }

  return (
    <div className={s.tierRow}>
      <Row align="middle">
        <Col xs={{ span: 8, order: 1 }} lg={{ span: 3 }}>
          <div className={s.tierTitle}>{data.name}</div>
        </Col>
        <Col xs={{ span: 24, order: 3 }} lg={{ span: 13, order: 2 }}>
          <div className={s.slotWrap}>
            {slots}
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
            <EditTier
              data={data}
              saveData={saveData}
              currencyUid={TournamentStore.currency_uid}
            ></EditTier>
          </Col>
        </Row>
      )}
    </div>
  );
});

const EditTier = (props: EditTierProps) => {
  const { data, saveData, currencyUid } = props;

  const maxSponsorOptions = [];
  for (let i = 1; i <= 20; i++) {
    maxSponsorOptions.push(<Option value={i} key={i}>{i}</Option>);
  }
  
  const handleSwitchChange = (checked: boolean, event: any) => {
    const button = event.target.closest("button");
    switch (button.title) {
      case "Name":
        saveData({
          ...data,
          show_name: checked
        })
        break;
      case "Ads":
        saveData({
          ...data,
          show_ads: checked
        })
        break;
      default:
        break;
    }
  };

  const handleMaxSponsorChange = (value: string) => {
    saveData({
      ...data,
      max: +value
    })
  }
  
  const handleMinSponsorAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    saveData({
      ...data,
      min: +event.target.value
    })
  }

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
              min={1000}
              defaultValue={data.min}
              onChange={handleMinSponsorAmountChange}
              addonAfter={currencyUid}
              placeholder="1000"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};