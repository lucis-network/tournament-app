import { Table } from "antd";
import { useEffect, useState } from "react";
import s from "./Prizing.module.sass";

import formatNumber from '../../../../../format/formatNumber/index'

type Props = {};

export default function Prizing(props: Props) {
  const [totalPrize, setTotalPrize] = useState(20000);
  const [prizePercent, setPrizePercent] = useState({
    firstPrize: 80,
    secondPrize: 15,
    thirdPrize: 5,
  });

  useEffect(() => {
    setPrizePercent((prev) => ({
      ...prev,
      firstPrize: (totalPrize * prev.firstPrize) / 100,
      secondPrize: (totalPrize * prev.secondPrize) / 100,
      thirdPrize: (totalPrize * prev.thirdPrize) / 100,
    }));
  }, [totalPrize]);

  const dataSource = [
    {
      place: "1 st place",
      prizeAllocation: `${(prizePercent.firstPrize * 100) / totalPrize}%`,
      prize: `${formatNumber(prizePercent.firstPrize)}`,
    },
    {
      place: "2 st place",
      prizeAllocation: `${(prizePercent.secondPrize * 100) / totalPrize}%`,
      prize: `${formatNumber(prizePercent.secondPrize)}`,
    },
    {
      place: "3 st place",
      prizeAllocation: `${(prizePercent.thirdPrize * 100) / totalPrize}%`,
      prize: `${formatNumber(prizePercent.thirdPrize)}`,
    },
  ];

  const columns = [
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
      width: "30%",
    },
    {
      title: "Prize allocation",
      dataIndex: "prizeAllocation",
      key: "prizeAllocation",
      width: "35%",
    },
    {
      title: "Prize",
      dataIndex: "prize",
      key: "prize",
      width: "35%",
    },
  ];
  return (
    <>
      <h1>Prize distribution</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        className={s.container_table}
      />
    </>
  );
}
