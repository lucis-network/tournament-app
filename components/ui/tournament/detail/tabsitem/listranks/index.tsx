import s from "./ListRank.module.sass";
import { Table } from "antd";
import { useState } from "react";
import { fomatNumber, format, currency as currencyFomat } from "utils/Number";

type Props = {
  tournamentId: string;
  currency?: any;
  dataListRank?: any;
  loading?: any;
};

export default function ListRanks(props: Props) {
  const { currency, dataListRank, loading } = props;

  if (loading) {
    return <></>;
  }

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: "15%",
      render: (_: any, item: any) => {
        return <>{item.rank}</>;
      },
    },
    {
      title: "Participants",
      dataIndex: "team_name",
      key: "team_name",
      width: "35%",
      render: (_: any, item: any) => {
        return <>{item.team_name}</>;
      },
    },
    {
      title: "Earning",
      dataIndex: "prize",
      key: "prize",
      width: "25%",
      render: (_: any, item: any) => {
        return (
          <>
            {currencyFomat(item.prize)} {currency.symbol}
          </>
        );
      },
    },
    {
      title: "Be donated",
      dataIndex: "donate",
      key: "donate",
      width: "25%",
      render: (_: any, item: any) => {
        return (
          <>
            {currencyFomat(item.donated, 2)} {currency.symbol}
          </>
        );
      },
    },
  ];
  return (
    <div className={s.wrapper}>
      <div className={s.containerTab}>
        <Table
          dataSource={dataListRank?.getTournamentListRank}
          columns={columns}
          bordered
          className={s.container_table}
          rowKey={(record) => `${record?.rank}`}
        />
      </div>
    </div>
  );
}
