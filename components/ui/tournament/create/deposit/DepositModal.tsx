import { observer } from "mobx-react-lite";
import { Col, message, Modal, Row, Spin } from "antd";
import TournamentStore from "src/store/TournamentStore";
import s from "./index.module.sass";
import ConnectWalletModal from "components/Auth/components/ConnectWalletModal";
import AuthBoxStore from "components/Auth/components/AuthBoxStore";
import ConnectWalletStore from "components/Auth/ConnectWalletStore";
import { useState } from "react";
import EthersService from "../../../../../services/blockchain/Ethers";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "components/Auth/ConnectWalletStore";
import { BUSD } from "utils/Enum";
import NotifyModal from "../notify/notifyModal";
import { LoadingOutlined } from "@ant-design/icons";
import { fomatNumber } from "utils/Number";
import TournamentService from "components/service/tournament/TournamentService";
import { useGetDepositContract } from "hooks/tournament/useCreateTournament";

type Props = {
  tournamentModal: any;
};

export default observer(function DepositModal(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { tournamentModal } = props;
  const isModalVisible = TournamentStore.depositModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.depositModalVisible = v);

  const { getDepositContract } = useGetDepositContract({});

  console.log(getDepositContract);

  const handleOk = async () => {
    if (!ConnectWalletStore.address) {
      AuthBoxStore.connectModalVisible = true;
    } else {
      let result = await deposit();
      setIsLoading(false);
      if (!result?.error) {
        const tournamentService = new TournamentService();
        const response = tournamentService
          .createTournament(tournamentModal)
          .then(async (res) => {
            if (res.data.createTournament) {
              window.onbeforeunload = null;
              TournamentStore.notifyModalVisible = true;
              TournamentStore.depositModalVisible = false;
            } else {
              message.error("Save fail");
              return;
            }
          })
          .then(() => {});
      } else {
        //@ts-ignore
        message.error(result?.error?.message);
      }
    }
  };

  const deposit = async () => {
    setIsLoading(true);
    if (
      ConnectWalletStore_NonReactiveData.web3Provider &&
      TournamentStore.pool_size
    ) {
      //throw makeError("Need to connect your wallet first");
      const ethersService = new EthersService(
        ConnectWalletStore_NonReactiveData.web3Provider
      );
      const total = getTotalAmount();
      const result = await ethersService.initTournament(
        "",
        total,
        BUSD,
        getDepositContract?.address
      );
      return result;
    }
  };

  const getTotalAmount = () => {
    if (TournamentStore.pool_size)
      return (TournamentStore.pool_size * 111) / 100;
    return 0;
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div style={{ width: "400px" }}>
      <Modal
        title={<span className="font-[600]">Deposit to Prize Pool</span>}
        visible={isModalVisible}
        onOk={handleOk}
        className={`${s.container}`}
        cancelButtonProps={{ style: { display: "none" } }}
        okText="Deposit"
        onCancel={handleCancel}
      >
        <Spin spinning={isLoading}>
          <div className="">
            <p>Payment detail</p>
            <div style={{ padding: "0px 20px 0px 20px" }}>
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
                  <p>Lucis fee (10%)</p>
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
                  <p>Referee fee (1%)</p>
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

              <Row style={{ borderTop: "1px solid", paddingTop: "5px" }}>
                <Col span={10}>
                  <p>Total</p>
                </Col>
                <Col span={2}></Col>
                <Col span={12}>
                  <p>
                    {getTotalAmount().toFixed(2)} {TournamentStore.currency_uid}
                  </p>
                </Col>
              </Row>
            </div>
            <p style={{ textAlign: "center", margin: 0 }}>
              Next: You will need to confirm transaction on your wallet
            </p>
          </div>
          <ConnectWalletModal />
          <NotifyModal />
        </Spin>
      </Modal>
    </div>
  );
});
