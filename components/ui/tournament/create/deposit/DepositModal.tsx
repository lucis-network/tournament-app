import { observer } from "mobx-react-lite";
import { Col, message, Modal, Row } from "antd";
import TournamentStore from "src/store/TournamentStore";
import s from "./index.module.sass";
import ConnectWalletModal from "components/Auth/components/ConnectWalletModal";
import AuthBoxStore from "components/Auth/components/AuthBoxStore";
import ConnectWalletStore from "components/Auth/ConnectWalletStore";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { clearLocalCreateTournament } from "components/service/tournament/TournamentService";

type Props = {};

export default observer(function DepositModal(props: Props) {
  const [txs, setTxs] = useState([]);
  const router = useRouter();

  const isModalVisible = TournamentStore.depositModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.depositModalVisible = v);

  const handleOk = () => {
    console.log(ConnectWalletStore);
    if (!ConnectWalletStore.address) {
      AuthBoxStore.connectModalVisible = true;
      message.info("You need connect wallet");
    } else {
      setIsModalVisible(false);
      TournamentStore.resetStates();
      clearLocalCreateTournament();
      router.push("/");
    }
  };

  const fomatNumber = (value: number) => {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  return (
    <div style={{ width: "400px" }}>
      <Modal
        title={<span className="font-[600]">Deposit to Prize Pool</span>}
        visible={isModalVisible}
        onOk={handleOk}
        className={`${s.container}`}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="">
          <p>Payment detail</p>
          <div style={{ padding: "0px 20px 20px 20px" }}>
            <Row>
              <Col span={10}>
                <p>Prize Pool</p>
              </Col>
              <Col span={2}></Col>
              <Col span={12}>
                <p>
                  {fomatNumber(
                    TournamentStore.pool_size ? TournamentStore.pool_size : 0
                  )}{" "}
                  {TournamentStore.currency_uid}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p>Lucis fee(10%)</p>
              </Col>
              <Col span={2}></Col>
              <Col span={12}>
                <p>
                  {fomatNumber(
                    TournamentStore.pool_size
                      ? TournamentStore.pool_size / 10
                      : 0
                  )}{" "}
                  {TournamentStore.currency_uid}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p>Lucis fee(1%)</p>
              </Col>
              <Col span={2}></Col>
              <Col span={12}>
                <p>
                  {fomatNumber(
                    TournamentStore.pool_size
                      ? TournamentStore.pool_size / 100
                      : 0
                  )}{" "}
                  {TournamentStore.currency_uid}
                </p>
              </Col>
            </Row>
          </div>
        </div>
        <ConnectWalletModal />
      </Modal>
    </div>
  );
});
