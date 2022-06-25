import { observer } from "mobx-react-lite";
import { Button, message, Modal, Table } from "antd";
import TournamentStore from "src/store/TournamentStore";
import s from "./index.module.sass";
import ConnectWalletStore from "components/Auth/ConnectWalletStore";
import { fomatNumber } from "utils/Number";
import TournamentService from "components/service/tournament/TournamentService";
import AuthBoxStore from "components/Auth/components/AuthBoxStore";
import { useEffect, useState } from "react";
import { LUCIS_FEE_DONATION } from "utils/Enum";
import ClaimResultModal from "../claimResultModal/ClaimResultModal";

type Props = {
  tournamentId?: string;
  dataDonation?: any;
  totalFromDonation?: number;
  currency?: any;
  name?: string;
  isCheckUserReferee?: boolean;
};

export type ClaimDonation = {
  tournament_uid?: string;
  address?: any;
};

export default observer(function ClaimDonationModal(props: Props) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [symbol, setSymbol] = useState("");
  const {
    tournamentId,
    dataDonation,
    totalFromDonation,
    name,
    isCheckUserReferee,
  } = props;
  const isModalVisible = TournamentStore.claimDonationModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.claimDonationModalVisible = v);

  const [claimStatus, setClaimStatus] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancelClaim = () => {
    setClaimStatus(false);
  };

  useEffect(() => {
    if (dataDonation) {
      let totalObj = dataDonation.filter((item: any) => {
        return item.reward_type === "Total";
      });

      setSymbol(totalObj[0]?.symbol);

      let objFee = {
        reward_type: "LUCISFEE",
        symbol: totalObj[0]?.symbol,
        amount: totalFromDonation
          ? (totalFromDonation * LUCIS_FEE_DONATION) / 100
          : 0,
      };

      dataDonation.push(objFee);
      let objReceived = {
        reward_type: "RECEIVED",
        symbol: dataDonation[0]?.symbol,
        amount: totalFromDonation
          ? (totalFromDonation * (100 - LUCIS_FEE_DONATION)) / 100
          : 0,
      };
      dataDonation.push(objReceived);
    }
  }, [dataDonation]);

  const handleOk = async (item: any) => {
    if (!ConnectWalletStore.address) {
      AuthBoxStore.connectModalVisible = true;
    } else {
      setLoadingBtn(true);

      const claim: ClaimDonation = {
        tournament_uid: tournamentId,
        address: ConnectWalletStore.address,
      };

      let tournamentService = new TournamentService();
      if (isCheckUserReferee) {
        const response = tournamentService.claimRefereeFee(claim).then(
          (res) => {
            console.log(res);
          },
          (error) => {}
        );
      }

      const response = tournamentService.claimDonation(claim).then(
        (res) => {
          setLoadingBtn(false);
          if (res) {
            setClaimStatus(true);
            handleCancel();
          }
        },
        (error) => {
          setLoadingBtn(false);
          message.warning("You have received this donation", 10);
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
        return (
          <>
            {item.reward_type == "DONATEFORTOURNAMENT" && (
              <>For our tournament</>
            )}
            {item.reward_type == "DONATEFORPLAYER" && <>For you</>}
            {item.reward_type == "REFEREE_FEE" && <>From referee fee</>}
            {item.reward_type == "DONATE_FOR_REFEREE" && <>From donation</>}
            {item.reward_type == "DONATEFORTEAM" && <>For your team</>}
            {item.reward_type == "Total" && <>Total</>}
            {item.reward_type == "LUCISFEE" && <>Lucis Fee (5%)</>}
            {item.reward_type == "RECEIVED" && <>You received</>}
          </>
        );
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
        title={
          <span className="font-[600]">
            {isCheckUserReferee
              ? "Reward for referee"
              : "Your reward from donation"}
          </span>
        }
        visible={isModalVisible}
        onOk={handleOk}
        className={`${s.container}`}
        onCancel={handleCancel}
        okText="Claim"
        footer={null}
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
        <div className={s.btnContainter}>
          <Button onClick={handleCancel} className="mr-2">
            Cancel
          </Button>
          <Button
            onClick={handleOk}
            className={s.btnConfirm}
            loading={loadingBtn}
          >
            Confirm
          </Button>
        </div>
      </Modal>

      <ClaimResultModal
        totalPrizePool={totalFromDonation as number}
        currency={symbol}
        name={name as string}
        claim={true}
        status={claimStatus}
        onCancel={handleCancelClaim}
      />
    </div>
  );
});
