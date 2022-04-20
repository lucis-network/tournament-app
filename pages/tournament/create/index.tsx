import DocHead from "components/DocHead";
import s from "./index.module.sass";
import { Row, Col } from "antd";
import { Input } from "antd";
import { observer } from "mobx-react-lite";

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
                <Input placeholder="Basic usage" />
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
                <Input placeholder="Basic usage" />
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Teamsize</p>
              </Col>
              <Col span={8}>
                <Input placeholder="Basic usage" />
              </Col>
              <Col span={4}>
                <p className="ml-[10px]">Numbers of participants</p>
              </Col>
              <Col span={8}>
                <Input placeholder="Basic usage" />
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={12}></Col>
              <Col span={4}>
                <p className="ml-[10px]">Best of for all rounds</p>
              </Col>
              <Col span={8}>
                <Input placeholder="Basic usage" />
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Timeline</p>
              </Col>
              <Col span={8}>
                <Input placeholder="Basic usage" />
              </Col>
              <Col span={4}>
                <p className="ml-[10px]">Region</p>
              </Col>
              <Col span={8}>
                <Input placeholder="Basic usage" />
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Entry</p>
              </Col>
              <Col span={8}>
                <Input placeholder="Basic usage" />
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
