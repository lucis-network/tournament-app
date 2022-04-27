import s from "./Participants.module.sass";
import ModalDonateTeam from "../../button/ButtonDonate/index";
import { AppEmitter } from "services/emitter";

import { Button, Table } from "antd";
import { useState } from "react";

export default function TableParticipant() {
  const [datas, setDatas] = useState({});

  const handleClick = (e: object) => {
    setDatas(e);
    AppEmitter.emit("showPopupDonate", true);
  };
  const dataSource = [
    {
      id: 34,
      key: "1",
      name: "Viet Nam",
      address: "10 Downing Street",
      position: "rank",
      member: [
        { id: 1, name: "NonCaiTay", room_master: true },
        { id: 2, name: "BestTop" },
        { id: 3, name: "BestSp" },
      ],
    },
    {
      id: 654,
      key: "2",
      name: "Cai Nit",
      address: "10 Downing Street",
      position: "rank",
      member: [
        { id: 4, name: "Mid~pro", room_master: true },
        { id: 5, name: "Mid~pro" },
        { id: 6, name: "Mid~pro" },
      ],
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      width: "5%",
    },
    {
      title: "Participant",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: "Ingame",
      dataIndex: "address",
      key: "address",
      width: "20%",
    },
    {
      title: "",
      dataIndex: "position",
      key: "position",
      width: "10%",
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
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        className={s.container_table}
      />
      <ModalDonateTeam nameTeam={datas} />  
    </div>
  );
}
