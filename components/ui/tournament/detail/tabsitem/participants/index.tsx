import s from "./Participants.module.sass";

import { AppEmitter } from "services/emitter";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import ModalDonateTeam from "components/ui/common/button/buttonDonateTeam";
import { Team } from "src/generated/graphql";
import SearchComplete from "components/ui/common/searchs";

type Props = {
  dataParticipants: Team[];
  loading: any;
  tournamentId: string;
  currency?: any;
};

export default function TableParticipant(props: Props) {
  const { dataParticipants, loading, tournamentId, currency } = props;

  const [datas, setDatas] = useState({});
  const handleClick = (e: object) => {
    setDatas(e);
    AppEmitter.emit("showPopupDonate", true);
  };
  if (loading) {
    return <></>;
  }

  const columns = [
    {
      title: "No",
      dataIndex: "getTournamentParticipants",
      key: "id",
      width: 50,
      render: (_: any, item: any, index: number) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Participant",
      dataIndex: "getTournamentParticipants",
      key: "name",
      width: 250,
      render: (_: any, item: any, index: number) => {
        return <>{item.name}</>;
      },
    },
    {
      title: "Earning",
      dataIndex: "position",
      key: "position",
      width: 250,

      // width: "15%",
    },
    {
      title: "Was donated",
      dataIndex: "donate",
      key: "donate",
      // width: "15%",
    },
    {
      title: "",
      // width: "15%",
      render: (_: any, item: object) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => handleClick(item)} type="primary">
            Donate
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <SearchComplete />
      </div>
      <Table
        dataSource={dataParticipants}
        columns={columns}
        bordered
        className={s.container_table}
        rowKey={(record) => `${record?.uid}`}
      />
      <ModalDonateTeam
        nameTeam={datas}
        tournamentId={tournamentId}
        currency={currency}
      />
    </div>
  );
}
