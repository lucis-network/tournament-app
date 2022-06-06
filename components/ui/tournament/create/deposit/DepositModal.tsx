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
import { BUSD, LUCIS, LUCIS_FEE, REFEREES_FEE, USDT } from "utils/Enum";
import NotifyModal from "../notify/notifyModal";
import { fomatNumber } from "utils/Number";
import { useGetContract } from "hooks/tournament/useCreateTournament";
import TournamentService from "components/service/tournament/TournamentService";
import AuthStore from "../../../../Auth/AuthStore";

type Props = {
  tournamentRes?: any;
};

export default observer(function DepositModal(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { tournamentRes } = props;
  const isModalVisible = TournamentStore.depositModalVisible;

  const setIsModalVisible = (v: boolean) =>
    (TournamentStore.depositModalVisible = v);

  const { getContract } = useGetContract({});

  const handleOk = async () => {
    if (!ConnectWalletStore.address) {
      AuthBoxStore.connectModalVisible = true;
    } else {
      let result = await deposit();
      setIsLoading(false);

      if (!result?.error) {
        TournamentStore.notifyModalVisible = true;
        const tournamentService = new TournamentService();
        tournamentService.depositTournament(
          tournamentRes?.uid,
          result?.txHash as string,
          result?.blockNumber as number
        );
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
      //const total = getTotalAmount();
      const contractAddress = getContract.filter(
        (item: any) => item.type === "PRIZE"
      );

      let token_address = TournamentStore?.currency_address ? TournamentStore?.currency_address : "";

      if (!TournamentStore.checkDepositApprove) {
        TournamentStore.checkDepositApprove =
          await ethersService.requestApproval(
            contractAddress[0]?.address,
            token_address
          );
      }
      if (!AuthStore.id) {
        console.log("User not exist in sotre");
        return;
      }
      if (!TournamentStore.checkDepositApprove) {
        return;
      }

      const result = await ethersService.initTournament(
        AuthStore.id + "",
        tournamentRes?.uid,
        TournamentStore.pool_size,
        token_address,
        contractAddress[0]?.address
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
        okText={"Deposit"}
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
                    {TournamentStore.currency_symbol}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p>Lucis fee  (${LUCIS_FEE}%)</p>
                </Col>
                <Col span={2}></Col>
                <Col span={12}>
                  <p>
                    {fomatNumber(
                      TournamentStore.pool_size
                        ? TournamentStore.pool_size / 10
                        : 0
                    )}{" "}
                    {TournamentStore.currency_symbol}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p>Referee fee (${REFEREES_FEE}%)</p>
                </Col>
                <Col span={2}></Col>
                <Col span={12}>
                  <p>
                    {fomatNumber(
                      TournamentStore.pool_size
                        ? TournamentStore.pool_size / 100
                        : 0
                    )}{" "}
                    {TournamentStore.currency_symbol}
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
                    {getTotalAmount().toFixed(2)}{" "}
                    {TournamentStore.currency_symbol}
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
