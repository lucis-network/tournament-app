import { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Collapse, Input, Row, Space, Switch, Select } from "antd";
import { SponsorTierType } from "src/store/TournamentStore";
import s from "./index.module.sass";
import CircleImage from "components/ui/common/images/CircleImage";
import SponsorSlot from "./SponsorSlot";

type SponsorTierProps = {
  data: SponsorTierType;
  saveData: (newData: SponsorTierType) => void;
}

type EditTierProps = {
  data: SponsorTierType;
  saveData: (...args: any[]) => void;
};

const { Option } = Select;

export default observer(function SponsorTier(props: SponsorTierProps) {
  const { data, saveData } = props
  const [showEdit, setShowEdit] = useState(false);

  const changeShowEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <>
      <Row>
        <Col span={2}>
          <p>{data.name}</p>
        </Col>
        <Col span={18}>
          {}
        </Col>
        <Col span={4}>
          <Button onClick={changeShowEdit}>
            Edit this tier requirement
          </Button>
        </Col>
      </Row>
      <div className={`${!showEdit ? "hidden" : ""}  ${s.collapse}`}>
        <EditTier
          data={data}
          saveData={saveData}
        ></EditTier>
      </div>
    </>
  );
});

const EditTier = (props: EditTierProps) => {
  const { data, saveData } = props;

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
    <>
      <Row>
        <Col span={4}>
          <p>Show logo</p>
        </Col>
        <Col span={2}>
          <Switch
            defaultChecked={data.show_logo}
            onChange={handleSwitchChange}
            title="Logo"
            disabled
          />
        </Col>
        <Col span={2}></Col>
        <Col span={4}>
          <p>Max sponpor slot for this tier</p>
        </Col>
        <Col span={2}>
          <Select defaultValue={`${data.max}`} style={{ width: 120 }} onChange={handleMaxSponsorChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <p>Show Name</p>
        </Col>
        <Col span={2}>
          <Switch
            defaultChecked={data.show_name}
            onChange={handleSwitchChange}
            title="Name"
          />
        </Col>
        <Col span={2}></Col>
        <Col span={4}>
          <p>Min sponsor amount</p>
        </Col>
        <Col span={2}>
          <Input
            type="number"
            min={1000}
            defaultValue={data.min}
            onChange={handleMinSponsorAmountChange}
          />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <p>Sponsor ads video</p>
        </Col>
        <Col span={2}>
          <Switch
            defaultChecked={data.show_ads}
            onChange={handleSwitchChange}
            title="Ads"
          />
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <p>
            This ads video will be display on the tournament detail screen {">"}{" "}
            Cover Section
          </p>
        </Col>
      </Row>
    </>
  );
};