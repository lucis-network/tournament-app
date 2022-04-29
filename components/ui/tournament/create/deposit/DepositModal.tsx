import { observer } from "mobx-react-lite";
import { Col, Modal, Radio, Row } from "antd";
import TournamentStore from "src/store/TournamentStore";
import Input from "antd/lib/input/Input";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./index.module.sass";
import { useChooseGame } from "hooks/tournament/useCreateTournament";
import debounce from "lodash/debounce";

type Props = {};

export default observer(function DepositModal(props: Props) {
  const isModalVisible = TournamentStore.depositModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.depositModalVisible = v);

  // const value = TournamentStore.game_uid,
  //   setValue = (v: string) => (TournamentStore.game_uid = v);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {};

  return (
    <Modal
      title={<span className="font-[600]">Deposit to Prize Pool</span>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className={`${s.container}`}
    >
      <div className="">
        <p>Payment detail</p>
        <div style={{padding: "20px"}}>
          <Row>
            <Col span={10}>
              <p>Prize Pool</p>
            </Col>
            <Col span={14}>
              <p>20000 USDT</p>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <p>Lucis fee(10%)</p>
            </Col>
            <Col span={14}>
              <p>2000 USDT</p>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <p>Lucis fee(10%)</p>
            </Col>
            <Col span={14}>
              <p>2000 USDT</p>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
});
