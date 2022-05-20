import s from "./Participants.module.sass";

import { AppEmitter } from "services/emitter";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import ModalDonateTeam from "components/ui/common/button/buttonDonateTeam";
import { Team } from "src/generated/graphql";
import SearchComplete from "components/ui/common/searchs";
import PopupDonate from "../../popup/popupDonate";
import AuthStore from "components/Auth/AuthStore";

type Props = {
  dataParticipants: Team[];
  loading: any;
  tournamentId: string;
  currency?: any;
  tournament_status: string;
  refetch: any;
};

export default function TableParticipant(props: Props) {
  const {
    dataParticipants,
    loading,
    tournamentId,
    currency,
    tournament_status,
    refetch,
  } = props;

  const [datas, setDatas] = useState({});
  const [isPopupDonate, setIsPopupDonate] = useState(false);
  const closeModal = () => {
    setIsPopupDonate(false);
  };

  const handleClick = (e: object) => {
    console.log('e: ', e)
    setDatas(e);
    //@ts-ignore
    if (e?.playTeamMembers?.length == 1) {
      setIsPopupDonate(true);
    } else {
      AppEmitter.emit("showPopupDonate", true);
    }
  };
  if (loading) {
    return <></>;
  }

  const columns = [
    {
      title: "No",
      dataIndex: "getTournamentParticipants",
      key: "id",
      width: 60,
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
        return <>{item.team.name}</>;
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
          {tournament_status !== "CLOSED" ? (
            <Button
              onClick={() => {
                if (!AuthStore.isLoggedIn) {
                  message.info("Please sign in first");
                  return;
                }
                handleClick(item);
              }}
              type="primary"
            >
              Donate
            </Button>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  console.log("dataParticipants", dataParticipants)
  
  return (
    <div className={s.wrapper}>
      <div className={s.containerTab}>
        {/* <div style={{ display: "flex", justifyContent: "end" }}>
        <SearchComplete />
      </div> */}
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
          refetch={refetch}
        />
        <PopupDonate
          closeModal={() => closeModal()}
          status={isPopupDonate}
          tournamentId={tournamentId}
          currency={currency}
          types={"TEAM"}
          datas={datas}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
