import { Button, Table } from "antd";
import { useCallback, useState } from "react";
import { AppEmitter } from "services/emitter";
import PopupDonate from "../../Popup/PopupDonate";
import s from "./Referees.module.sass";

export default function Referees() {
  const [dataReferees, setDataReferees] = useState({});
  const [isPopUp, setIsPopUp] = useState(false)

  const handleClickShowPopUp = (e: object) => {
    setDataReferees(e);
    setIsPopUp(true)
  };
  const click = () => {
    setIsPopUp(false)
  }

  const dataSource = [
    {
      avt: "1",
      name: "Viet Nam",
      contact: "10 Downing Street",
    },
    {
      avt: "2",
      name: "Cai Nit 1",
      contact: "10 Downing Street",
    },
    {
      avt: "3",
      name: "Cai Nit 2",
      contact: "10 Downing Street",
    },
    {
      avt: "4",
      name: "Cai Nit 3",
      contact: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "avt",
      key: "avt",
      width: "10%",
    },
    {
      title: "Referees",
      dataIndex: "name",
      key: "name",
      width: "40%",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      width: "40%",
    },
    {
      title: "",
      dataIndex: "referees",
      key: "referees",
      render: (_: any, item: object) => (
        <Button onClick={() => handleClickShowPopUp(item)} type="primary">
          Donate
        </Button>
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
      <PopupDonate onClick={click} status={isPopUp} datas={dataReferees} />
    </div>
  );
}
