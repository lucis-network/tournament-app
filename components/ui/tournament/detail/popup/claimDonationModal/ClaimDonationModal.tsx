import { observer } from "mobx-react-lite";
import { Button, message, Modal, Table } from "antd";
import TournamentStore from "src/store/TournamentStore";
import s from "./index.module.sass";
import AuthBoxStore from "components/Auth/components/AuthBoxStore";
import ConnectWalletStore from "components/Auth/ConnectWalletStore";
import { useEffect, useState } from "react";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "components/Auth/ConnectWalletStore";
import { BUSD } from "utils/Enum";
import GroupLink from "components/ui/common/groupLink";
import EthersService from "../../../../../../services/blockchain/Ethers";
import { useClaimReward } from "hooks/tournament/useTournamentDetail";

type Props = {};

export default observer(function ClaimDonationModal(props: Props) {
  const isModalVisible = TournamentStore.claimDonationModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.claimDonationModalVisible = v);

  const { data } = useClaimReward({
    tournament_uid: "cl2rdu56s18150jrswgoh73lb",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const claimToken = async (item: any) => {
    if (!ConnectWalletStore.address) {
      AuthBoxStore.connectModalVisible = true;
    } else {
      let txHash = await claim();
      console.log(txHash);
      if (txHash) message.success("Claim successfully");
      else {
        message.error("Claim fail. Please try again");
      }
    }
  };

  const claim = async () => {
    if (ConnectWalletStore_NonReactiveData.web3Provider) {
      //throw makeError("Need to connect your wallet first");
      const ethersService = new EthersService(
        ConnectWalletStore_NonReactiveData.web3Provider
      );

      const txHash = await ethersService.transferFT(
        "0x948d6D28D396Eae2F8c3459b092a85268B1bD96B",
        BUSD,
        1
      );
      return txHash;
    }
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "reward_type",
      key: "reward_type",
      width: "40%",
      render: (_: any, item: any) => {
        return <>{item.reward_type}</>;
      },
    },
    {
      title: "Was donated",
      dataIndex: "donated",
      key: "donated",
      width: "40%",
      render: (_: any, item: any) => {
        return (
          <>
            {item.amount} {item.chain_symbol}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "20%",
      render: (_: any, item: any) => (
        <div>
          <Button onClick={() => claimToken(item)} type="primary">
            Donate
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "400px" }}>
      <Modal
        title={<span className="font-[600]">Your reward from donation</span>}
        visible={isModalVisible}
        onOk={handleOk}
        className={`${s.container}`}
        onCancel={handleCancel}
      >
        <Table
          dataSource={data}
          columns={columns}
          bordered
          rowKey={(record, index) => `${index}`}
          className={s.container_table}
        />
      </Modal>
    </div>
  );
});
