import { message, Table } from "antd";
import { Prize } from "src/generated/graphql";

import s from "./Prizing.module.sass";

type Props = {
  dataPrizing: Prize[];
  loadingPrizing: any;
};

export default function Prizing(props: Props) {
  const { dataPrizing, loadingPrizing } = props;
  if (loadingPrizing) {
    return <></>;
  }

  const columnsPrize = [
    {
      title: "Place",
      dataIndex: "getTournamentPrizing",
      key: "place",
      width: "30%",
      render: (_: any, item: any) => {
        return <>{item.position}st place</>;
      },
    },
    {
      title: "Prize allocation",
      dataIndex: "getTournamentPrizing",
      key: "prizeAllocation",
      width: "35%",
      render: (_: any, item: any) => {
        return <>{item.percentage * 100}%</>;
      },
    },
    {
      title: "Prize",
      dataIndex: "thirdPrize",
      key: "thirdPrize",
      width: "35%",
      render: (_: any, item: any) => {
        return <>{item.reward}</>;
      },
    },
  ];
  return (
    <div className={s.container}>
      <h1>Prize distribution</h1>
      <Table
        dataSource={dataPrizing}
        columns={columnsPrize}
        bordered
        className={s.container_table}
        rowKey={(record) => `${record?.position}`}
      />
    </div>
  );
}
