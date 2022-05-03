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
import EthersService from "../../../../../services/blockchain/Ethers";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "components/Auth/ConnectWalletStore";
import { BUSD } from "utils/Enum";
import NotifyModal from "../notify/notifyModal";

type Props = {};

export default observer(function DepositModal(props: Props) {
  const [txs, setTxs] = useState([]);
  const router = useRouter();

  const isModalVisible = TournamentStore.depositModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.depositModalVisible = v);

  const handleOk = async () => {
    console.log(ConnectWalletStore);
    if (!ConnectWalletStore.address) {
      AuthBoxStore.connectModalVisible = true;
      message.info("You need connect wallet");
    } else {
      let txHash = await deposit();
      console.log(txHash);
      if (txHash) TournamentStore.notifyModalVisible = true;
      else {
        setIsModalVisible(false);
        TournamentStore.resetStates();
        clearLocalCreateTournament();
        router.push("/");
      }
    }
  };

  const fomatNumber = (value: number) => {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const deposit = async () => {
    if (
      ConnectWalletStore_NonReactiveData.web3Provider &&
      TournamentStore.pool_size
    ) {
      //throw makeError("Need to connect your wallet first");
      const ethersService = new EthersService(
        ConnectWalletStore_NonReactiveData.web3Provider
      );
      const total = getTotalAmount();
      const txHash = await ethersService.transferFT(
        "0x948d6D28D396Eae2F8c3459b092a85268B1bD96B",
        BUSD,
        total
      );
      return txHash;
    }
  };

  const getTotalAmount = () => {
    if (TournamentStore.pool_size)
      return (TournamentStore.pool_size * 111) / 100;
    return 0;
  };

  return (
    <div style={{ width: "400px" }}>
      <Modal
        title={<span className="font-[600]">Deposit to Prize Pool</span>}
        visible={isModalVisible}
        onOk={handleOk}
        className={`${s.container}`}
        cancelButtonProps={{ style: { display: "none" } }}
        okText="Confirm"
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
                    
            <Row style={{borderTop: "1px solid", paddingTop: "5px"}}>
              <Col span={10}>
                <p>Total</p>
              </Col>
              <Col span={2}></Col>
              <Col span={12}>
                <p>{getTotalAmount()} {TournamentStore.currency_uid}</p> 
              </Col>
            </Row>
          </div>
        </div>
        <ConnectWalletModal />
        <NotifyModal />
      </Modal>
    </div>
  );
});
