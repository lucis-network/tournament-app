import { observer } from "mobx-react-lite";
import { Button, Col, Collapse, Input, Row, Space, Switch } from "antd";
import s from "./index.module.sass";
import CircleImage from "components/ui/common/images/CircleImage";
import { SyntheticEvent, useEffect, useState } from "react";
const { Panel } = Collapse;
type Props = {};

let sponsorsData = [
  {
    key: "Diamond",
    with: "100",
    value: [],
  },
  {
    key: "Gold",
    with: "80",
    value: [],
  },
  {
    key: "Silver",
    with: "60",
    value: [],
  },
  {
    key: "Enthusiated",
    with: "50",
    value: [],
  },
];

export default observer(function Sponsor(props: Props) {
  const [showEdit, setShowEdit] = useState(false);

  const callbackFunction = (item: any, checked: boolean, value: string) => {
    if (value === "logo") item.showLogo = checked;
    if (value === "name") item.showName = checked;
  };

  const changeShowEdit = () => {
    setShowEdit(!showEdit);
  };
  return (
    <div className={s.container}>
      {sponsorsData.map((item, index) => {
        return (
          <div key={index}>
            {/* <Button>Edit this tier requirement</Button> */}
            {/* <Collapse defaultActiveKey={["1"]}>
              <Panel header={Header} key="1">
                <Button>Edit this tier requirement</Button>
              </Panel>
            </Collapse> */}
            <Row>
              <Col span={2}>
                <p>{item.key}</p>
              </Col>
              <Col span={18}>
                <CircleImage
                  src={"/assets/MyProfile/defaultAvatar.png"}
                  width={item.with}
                />
                {/* {item.showName ? <p>Lucis</p> : <></>} */}
              </Col>
              <Col span={4}>
                <Button onClick={changeShowEdit}>
                  Edit this tier requirement
                </Button>
              </Col>
            </Row>
            <div className={`${!showEdit ? "hidden" : ""}  ${s.collapse}`}>
              <CollapseButton
                item={item}
                parentCallback={callbackFunction}
              ></CollapseButton>
            </div>
          </div>
        );
      })}
    </div>
  );
});

type Props1 = {
  item?: any;
  parentCallback?: any;
};

let sponsor_slot = {
  name: "Tier1",
  min: 100,
  max: 10000,
  show_ads: true,
  show_logo: true,
  show_name: true,
  cover: "",
};

const CollapseButton = (props: Props1) => {
  const onChange = (checked: boolean, event: any) => {
    const button = event.target.closest("button");
    if (button.title === "logo")
      props.parentCallback(props.item, checked, "logo");
    if (button.title === "name")
      props.parentCallback(props.item, checked, "name");
  };
  return (
    <>
      <Row>
        <Col span={10}></Col>
        <Col span={4}>
          <p>Show logo</p>
        </Col>
        <Col span={2}>
          <Switch
            defaultChecked={true}
            onChange={onChange}
            title="logo"
            disabled
          />
        </Col>
        <Col span={2}></Col>
        <Col span={4}>
          <p>Max sponpor slot for this tier</p>
        </Col>
        <Col span={2}>
          <Input type="number"></Input>
        </Col>
      </Row>
      <Row>
        <Col span={10}></Col>

        <Col span={4}>
          <p>Show Name</p>
        </Col>
        <Col span={2}>
          <Switch
            defaultChecked={props.item.showName}
            onChange={onChange}
            title="name"
          />
        </Col>
        <Col span={2}></Col>
        <Col span={4}>
          <p>Min sponsor amount</p>
        </Col>
        <Col span={2}>
          <Input type="number"></Input>
        </Col>
      </Row>
      <Row>
        <Col span={10}></Col>
        <Col span={4}>
          <p>Sponsor ads video</p>
        </Col>
        <Col span={2}>
          <Switch defaultChecked onChange={onChange} />
        </Col>
      </Row>
      <Row>
        <Col span={14}></Col>
        <Col span={10}>
          <p>
            This ads video will be display on the tournament detail screen {">"}{" "}
            Cover Section
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={20}></Col>
        <Col span={4}>
          <Button>Update</Button>
        </Col>
      </Row>
    </>
  );
};
