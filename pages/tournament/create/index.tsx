import DocHead from "components/DocHead";
import s from "./index.module.sass";
import { Row, Col } from "antd";
import { Input } from "antd";
import { observer } from "mobx-react-lite";
import { Radio } from "antd";
import { Select } from "antd";
import {
  BracketType,
  Participants,
  Region,
  Rounds,
  Teamsize,
} from "utils/Enum";
import { Button } from "antd";
import UploadImage from "components/ui/common/upload/UploadImage";
import dynamic from "next/dynamic";
import ChooseGameModal from "components/ui/tournament/create/chooseGame/ChooseGameModal";
import { useState } from "react";
import TournamentStore from "src/store/TournamentStore";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const { Option } = Select;

type Props = {};
type CrT = {
  name?: string;
  cover?: string;
  thumbnail?: string;
};
export default observer(function CreateTournament(props: Props) {
  const callbackFunction = (childData: string) => {
    console.log("childData", childData);
  };

  const openModal = (value: string) => {
    if (value === "choosegame") TournamentStore.chooseGameModalVisible = true;
  };

  return (
    <>
      {/* <DocHead />
      <div className="pt-28 min-h-screen"></div>
      <Footer /> */}
      <DocHead title="Apply for INO" />
      <div className="container">
        <div className={s.containerApp}>
          <p className="text-30px">Create your tournament</p>
          <div className="">
            <Row>
              <Col span={4}>
                <p>Name</p>
              </Col>
              <Col span={20}>
                <Input placeholder="Tournament name" />
              </Col>
            </Row>
            <Row className="pt-6">
              <Col span={4}>
                <p>Cover (Banner)</p>
              </Col>
              <Col span={10}>
                <UploadImage
                  parentCallback={callbackFunction}
                  heigh="450"
                  width="1200"
                ></UploadImage>
                <p>Recommended size: 1200x300</p>
              </Col>
              <Col span={4} className="text-center">
                <p>Thumbnail</p>
              </Col>
              <Col span={6}>
                <UploadImage
                  parentCallback={callbackFunction}
                  heigh="200"
                  width="300"
                ></UploadImage>
                <p>Recommended size: 300x200</p>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Choose game</p>
              </Col>
              <Col span={8}>
                <Button onClick={() => openModal("choosegame")}>
                  Choose game
                </Button>
              </Col>
              <Col span={4}>
                <p className="ml-[10px]">Bracket type</p>
              </Col>
              <Col span={8}>
                <Radio.Group className={s.bracketType}>
                  {BracketType.map((item, index) => {
                    return item.value !== "battle" ? (
                      <Radio
                        value={item.value}
                        key={index}
                        className={s.textColor}
                      >
                        {item.label}
                      </Radio>
                    ) : (
                      <Radio
                        value={item.value}
                        key={index}
                        className={s.textColor}
                        disabled
                      >
                        {item.label}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Teamsize</p>
              </Col>
              <Col span={4}>
                <Input placeholder="Input Teamsize" width="120px" />
              </Col>
              <Col span={4}></Col>
              <Col span={4}>
                <p className="ml-[10px]">Numbers of participants</p>
              </Col>
              <Col span={8}>
                <Select defaultValue="8" style={{ width: 150 }}>
                  {Participants.map((item, index) => {
                    return (
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={12}></Col>
              <Col span={4}>
                <p className="ml-[10px]">Best of for all rounds</p>
              </Col>
              <Col span={8}>
                <Select defaultValue="1" style={{ width: 150 }}>
                  {Rounds.map((item, index) => {
                    return (
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Timeline</p>
              </Col>
              <Col span={8}>
                <Button>Setup Timeline</Button>
              </Col>
              <Col span={4}>
                <p className="ml-[10px]">Region</p>
              </Col>
              <Col span={8}>
                <Select defaultValue="VN" style={{ width: 150 }}>
                  {Region.map((item, index) => {
                    return (
                      <Option value={item.value} key={index}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Entry</p>
              </Col>
              <Col span={8}>
                <Radio.Group className={s.bracketType}>
                  <Radio value="0" className={s.textColor}>
                    Free
                  </Radio>
                  <Radio value="1" className={`${s.textColor} ${s.textColor1}`}>
                    <div className={`${s.radioFee}`}>
                      <p className="">With Fee</p>
                      <Input placeholder="Input Fee" />
                    </div>
                  </Radio>
                </Radio.Group>
              </Col>
              <Col span={12}>
                <p className="ml-[10px]">Referee(s)</p>
                <div className="flex flex-row">
                  <div className="flex flex-col items-center mr-15px">
                    <img
                      src="/assets/avatar.jpg"
                      width="50"
                      height="50"
                      alt=""
                    />
                    <p className="mt-5px">Luciz</p>
                  </div>
                  <div className="flex flex-col items-center mr-15px">
                    <img
                      src="/assets/avatar.jpg"
                      width="50"
                      height="50"
                      alt=""
                    />
                    <p className="mt-5px">Luciz</p>
                  </div>

                  <Button>+ Add</Button>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <p className="text-30px mt-20px">Prizing</p>
          </div>

          <div>
            <p className="text-30px mt-20px">Tournament Overview</p>
            <div>
              <ReactQuill
              // value={this.state.text}
              // onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <p className="text-30px mt-20px">Rules</p>
            <div>
              <ReactQuill
              // value={this.state.text}
              // onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <p className="text-25px mt-20px">Sponsor</p>
          </div>

          <div className="mt-20px">
            <Row>
              <Col span={4}>
                <p>Tournament password</p>
              </Col>
              <Col span={20}>
                <Input placeholder="Password" />
              </Col>
            </Row>
          </div>

          <div className="mt-20px text-center pb-20px">
            <Button>Save Draft</Button>
            <Button className="ml-10px">Create tournament</Button>
          </div>
        </div>

        <ChooseGameModal />
      </div>

      {/* <Footer /> */}
    </>
  );
});
