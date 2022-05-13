import s from "./ListRank.module.sass";
import { Table } from "antd";
import { useState } from "react";
import { fomatNumber } from "utils/Number";

type Props = {
  tournamentId: string;
  currency?: any;
  dataListRank?: any;
  loading?: any;
};

export default function ListRanks(props: Props) {
  const { tournamentId, currency, dataListRank, loading } = props;

  const [datas, setDatas] = useState({});
  const [isPopupDonate, setIsPopupDonate] = useState(false);
  const closeModal = () => {
    setIsPopupDonate(false);
  };

  console.log("currency", currency);

  if (loading) {
    return <></>;
  }

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: 50,
      render: (_: any, item: any) => {
        return <>{item.rank}</>;
      },
    },
    {
      title: "Participants",
      dataIndex: "team_name",
      key: "team_name",
      width: 250,
      render: (_: any, item: any) => {
        return <>{item.team_name}</>;
      },
    },
    {
      title: "Earning",
      dataIndex: "position",
      key: "position",
      width: 250,
      render: (_: any, item: any) => {
        return (
          <>
            {item.prize} {currency.symbol}
          </>
        );
      },
    },
    {
      title: "Be donated",
      dataIndex: "donate",
      key: "donate",
      render: (_: any, item: any) => {
        return (
          <>
            {fomatNumber(item.donated)} {currency.symbol}
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        dataSource={dataListRank?.getTournamentListRank}
        columns={columns}
        bordered
        className={s.container_table}
        rowKey={(record) => `${record?.rank}`}
      />
    </div>
  );
}
