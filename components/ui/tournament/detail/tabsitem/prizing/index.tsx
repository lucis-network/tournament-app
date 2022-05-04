import { message, Table } from "antd";
import { useEffect, useState } from "react";
import { usePrizing } from "hooks/tournament/useTournamentDetail";

import s from "./Prizing.module.sass";

type Props = {};

export default function Prizing(props: Props) {
  const [dataPrize, setDataPrize] = useState<any[]>([]);

  const { dataPrizing } = usePrizing({ uid: "cl2ek8le201060jn6tzuoo7nv" });

  const fetchData = async () => {
    try {
      const newData = await dataPrizing;
      const dataLenght = newData?.getTournamentDetailPrizing.length;
      for (let i = 0; i < dataLenght; i++) {
        setDataPrize((prev) => [
          ...prev,
          {
            key: newData?.getTournamentDetailPrizing[i]?.position,
            place: `${newData?.getTournamentDetailPrizing[i]?.position}st place`,
            prizeAllocation: `${
              newData?.getTournamentDetailPrizing[i]?.percentage * 100
            }%`,
            thirdPrize: newData?.getTournamentDetailPrizing[i]?.reward,
          },
        ]);
      }
    } catch {
      message.error("Error fetch data");
    }
  };
  useEffect(() => {
    fetchData();
  }, [dataPrizing]);

  const columnsPrize = [
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
      width: 50,
    },
    {
      title: "Prize allocation",
      dataIndex: "prizeAllocation",
      key: "prizeAllocation",
      // width: "35%",
      width: 250,
    },
    {
      title: "Prize",
      dataIndex: "thirdPrize",
      key: "thirdPrize",
      // width: "35%",
    },
  ];
  return (
    <div className={s.container}>
      <h1>Prize distribution</h1>
      <Table
        dataSource={dataPrize}
        columns={columnsPrize}
        bordered
        className={s.container_table}
      />
    </div>
  );
}
