import { observer } from "mobx-react-lite";
import { message, Modal, Table } from "antd";
import TournamentStore from "src/store/TournamentStore";
import s from "./index.module.sass";
import ConnectWalletStore from "components/Auth/ConnectWalletStore";
import { fomatNumber } from "utils/Number";
import TournamentService from "components/service/tournament/TournamentService";
import AuthBoxStore from "components/Auth/components/AuthBoxStore";
import AuthService from "components/Auth/AuthService";
import { to_hex_str } from "utils/String";
import { useState } from "react";

type Props = {
  tournamentId?: string;
  dataDonation?: any;
};

export type ClaimDonation = {
  tournamnent_uid?: string;
  address?: any;
};

export default observer(function ClaimDonationModal(props: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { tournamentId, dataDonation } = props;
  const isModalVisible = TournamentStore.claimDonationModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.claimDonationModalVisible = v);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async (item: any) => {
    if (!ConnectWalletStore.address) {
      AuthBoxStore.connectModalVisible = true;
    } else {
      setIsLoading(true);

      const claim: ClaimDonation = {
        tournamnent_uid: tournamentId,
        address: ConnectWalletStore.address,
      };
      const authService = new AuthService();
      const msg = `0x${to_hex_str(`Lucis verification`)}`;
      console.log(msg);
      let tournamentService = new TournamentService();
      const response = tournamentService.claimDonation(claim).then(
        (res) => {
          setIsLoading(false);
          if (res) {
            message.success("You claim success");
            authService.sign([msg, ConnectWalletStore.address]);
          }
        },
        (error) => {
          setIsLoading(false);
          message.warning("You have received this donation");
        }
      );
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
      title: "Donated",
      dataIndex: "donated",
      key: "donated",
      width: "40%",
      render: (_: any, item: any) => {
        return (
          <>
            {fomatNumber(item.amount)} {item.symbol}
          </>
        );
      },
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
        okText="Claim"
      >
        <Table
          dataSource={dataDonation}
          columns={columns}
          bordered
          rowKey={(record) => `${record?.reward_type}`}
          className={s.container_table}
        />
        <div style={{ marginTop: "10px" }}>
          Lucis will take 5% each donation as fee
        </div>
      </Modal>
    </div>
  );
});
