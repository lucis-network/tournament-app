import { message, Table } from "antd";
import { Prize } from "src/generated/graphql";
import { fomatNumber } from "utils/Number";

import s from "./Prizing.module.sass";

type Props = {
  dataPrizing: Prize[];
  loadingPrizing: any;
  currency: any;
};

export default function Prizing(props: Props) {
  const { dataPrizing, loadingPrizing, currency } = props;
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
        return (
          <>
            {fomatNumber(item.reward)} {currency.symbol}
          </>
        );
      },
    },
  ];
  return (
    <div className={s.wrapper}>
      <div className={s.containerTab}>
        <Table
          dataSource={dataPrizing}
          columns={columnsPrize}
          bordered
          className={s.container_table}
          rowKey={(record) => `${record?.position}`}
        />
      </div>
    </div>
  );
}
