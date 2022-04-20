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

const { Option } = Select;

type Props = {};

export default observer(function CreateTournament(props: Props) {
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
                <Input placeholder="Basic usage" />
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Cover (Banner)</p>
              </Col>
              <Col span={8}>
                <UploadImage></UploadImage>
              </Col>
              <Col span={4} className="text-center">
                <p>Thumbnail</p>
              </Col>
              <Col span={8}>
                <Input placeholder="Basic usage" />
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Choose game</p>
              </Col>
              <Col span={8}>
                <Input placeholder="Basic usage" />
              </Col>
              <Col span={4}>
                <p className="ml-[10px]">Bracket type</p>
              </Col>
              <Col span={8}>
                <Radio.Group className={s.bracketType}>
                  {BracketType.map((item, index) => {
                    return (
                      <Radio
                        value={item.value}
                        key={index}
                        className={s.textColor}
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
              <Col span={8}>
                <Select defaultValue={Teamsize[0]} style={{ width: 150 }}>
                  {Teamsize.map((item, index) => {
                    return (
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col span={4}>
                <p className="ml-[10px]">Numbers of participants</p>
              </Col>
              <Col span={8}>
                <Select defaultValue="0" style={{ width: 150 }}>
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
                <Select defaultValue="0" style={{ width: 150 }}>
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
                <Select defaultValue={Region[0].value} style={{ width: 150 }}>
                  {Region.map((item, index) => {
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
              </Col>
            </Row>
          </div>
          <div>
            <p className="text-30px mt-20px">Prizing</p>
          </div>

          <div>
            <p className="text-30px mt-20px">Tournament Overview</p>
          </div>

          <div>
            <p className="text-30px mt-20px">Rules</p>
          </div>

          <div>
            <p className="text-25px mt-20px">Sponsor</p>
          </div>

          <div>
            <Row>
              <Col span={6}>
                <p>Tournament password</p>
              </Col>
              <Col span={18}>
                <Input placeholder="Password" />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
});
