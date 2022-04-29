import s from "./Participants.module.sass";
import ModalDonateTeam from "../../button/buttonDonateTeam/index";

import { AppEmitter } from "services/emitter";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import { useParticipant } from "hooks/tournament/useTournamentDetail";
import SearchComplete from "../../searchs";

export default function TableParticipant() {
  const [datas, setDatas] = useState({});
  const [dataParticipant, setDataParticipant] = useState<any[]>([]);
  const { dataParticipants } = useParticipant({
    uid: "cl2be7tze0019qyvclmlbvvoa",
  });

  const fetchDataParticipant = async () => {
    try {
      const newData = await dataParticipants;

      const dataLenght = newData?.getTournamentDetailParticipants?.length;
      for (let i = 0; i < dataLenght; i++) {
        const type = newData?.getTournamentDetailParticipants[i];
        setDataParticipant((prev) => [
          ...prev,
          {
            id: i + 1,
            key: type?.uid,
            name: type?.name,
            position: "rank",
            donate: "2.000$",
            member: [
              { id: 1, name: "NonCaiTay", room_master: true },
              { id: 2, name: "BestTop" },
              { id: 3, name: "BestSp" },
            ],
          },
        ]);
      }
    } catch {
      message.error("Error fetch data");
    }
  };

  useEffect(() => {
    fetchDataParticipant();
  }, [dataParticipants]);

  const handleClick = (e: object) => {
    setDatas(e);
    AppEmitter.emit("showPopupDonate", true);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Participant",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: "Earning",
      dataIndex: "position",
      key: "position",
      width: "15%",
    },
    {
      title: "Donated",
      dataIndex: "donate",
      key: "donate",
      width: "15%",
    },
    {
      title: "",
      width: "15%",
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
        dataSource={dataParticipant}
        columns={columns}
        bordered
        className={s.container_table}
      />
      <ModalDonateTeam nameTeam={datas} />
    </div>
  );
}
