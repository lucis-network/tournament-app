import { Button, message, Table } from "antd";
import { useReferees } from "hooks/tournament/useTournamentDetail";
import { useCallback, useEffect, useState } from "react";
import { AppEmitter } from "services/emitter";

import PopupDonate from "../../popUps/popupDonateDetail";
import GroupLink from "../../groupLink/index";
import s from "./Referees.module.sass";

export default function Referees() {
  const [dataReferees, setDataReferees] = useState({});
  const [dataTableReferees, setDataTableReferees] = useState<any[]>([]);
  const [isPopUp, setIsPopUp] = useState(false);

  const { dataRefereesDetail } = useReferees({
    uid: "cl2ek8le201060jn6tzuoo7nv",
  });

  useEffect(() => {
    fetchDataReferees();
  }, [dataRefereesDetail]);

  const fetchDataReferees = async () => {
    try {
      const datas = await dataRefereesDetail;
      for (let i = 0; i < datas?.getTournamentDetailReferees.length; i++) {
        const type = datas?.getTournamentDetailReferees[i]?.user?.profile;
        setDataTableReferees((prev) => [
          ...prev,
          {
            key: type?.user_id,
            avt: i + 1,
            name: (
              <div>
                <img
                  className={s.avt}
                  src={`${
                    type?.avatar ?? "/assets/MyProfile/defaultAvatar.png"
                  }`}
                  alt=""
                />
                <span style={{marginLeft: 12}}>{type?.display_name}</span>
              </div>
            ),
            contact: <GroupLink datas={type} />,
          },
        ]);
      }
    } catch {
      message.error("Error fetch data");
    }
  };

  const handleClickShowPopUp = (e: object) => {
    setDataReferees(e);
    setIsPopUp(true);
  };
  const click = () => {
    setIsPopUp(false);
  };

  const columnsReferees = [
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
        dataSource={dataTableReferees}
        columns={columnsReferees}
        bordered
        className={s.container_table}
      />
      <PopupDonate onClick={click} status={isPopUp} datas={dataReferees} />
    </div>
  );
}
