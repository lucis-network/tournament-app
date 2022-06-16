import s from "./Participants.module.sass";

import { AppEmitter } from "services/emitter";
import { Image, Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import ModalDonateTeam from "components/ui/common/button/buttonDonateTeam";
import { Team } from "src/generated/graphql";
import SearchComplete from "components/ui/common/searchs";
import PopupDonate from "../../popup/popupDonate";
import AuthStore from "components/Auth/AuthStore";
import { useUpdateParticipant } from "hooks/tournament/useTournamentDetail";
import { isEmpty } from "lodash";

type Props = {
  dataParticipants: Team[];
  loading: any;
  tournamentId: string;
  currency?: any;
  tournament_status: string;
  refetch: any;
  dataBracket?: any;
};

export default function TableParticipant(props: Props) {
  const {
    dataParticipants,
    loading,
    tournamentId,
    currency,
    tournament_status,
    refetch,
    dataBracket,
  } = props;

  const [datas, setDatas] = useState({});
  const [isPopupDonate, setIsPopupDonate] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isCheckBtnDonate, setIsCheckBtnDonate] = useState(false);

  const { dataUpdateParticipant } = useUpdateParticipant({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  const closeModal = () => {
    setIsPopupDonate(false);
  };

  useEffect(() => {
    const getDate = new Date();
    const start_at = new Date(dataBracket?.start_at);
    const inDays = start_at.getTime() - getDate.getTime();
    if (inDays / 3600000 < 1) setIsCheckBtnDonate(true);
  });

  const handleClick = (e: object) => {
    setDatas(e);
    setIsCheck(true);
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
        return (
          <div className="text-left">
            {item?.playTeamMembers?.length == 1 ? (
              <div>
                <Image
                  className={s.avatar}
                  src={`${
                    item?.playTeamMembers[0]?.user?.profile?.avatar
                      ? item?.playTeamMembers[0]?.user?.profile?.avatar
                      : "/assets/avatar.jpg"
                  }`}
                  preview={false}
                  alt=""
                />
                <a
                  style={{ color: "white" }}
                  href={`/profile/${item?.playTeamMembers[0]?.user?.profile?.user_name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.team.name}
                </a>
              </div>
            ) : (
              <div>
                <Image
                  className={s.avatar}
                  src={`${
                    item?.team?.avatar
                      ? item?.team?.avatar
                      : "/assets/avatar.jpg"
                  }`}
                  preview={false}
                  alt=""
                />
                <a
                  style={{ color: "white" }}
                  onClick={() => {
                    handleClick(item);
                    setIsCheck(false);
                  }}
                >
                  {item.team.name}
                </a>
              </div>
            )}
          </div>
        );
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
      title: "Checked in",
      dataIndex: "checkin",
      key: "donate",
      render: (_: any, item: any) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {item.is_checkin ? "Yes" : "No"}
          </div>
        );
      },
    },
    {
      title: "",
      // width: "15%",
      render: (_: any, item: object) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {isCheckBtnDonate && tournament_status !== "CLOSED" ? (
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

  console.log("dataParticipants", dataParticipants);
  console.log("dataUpdateParticipant", dataUpdateParticipant);
  return (
    <div className={s.wrapper}>
      <div className={s.containerTab}>
        {/* <div style={{ display: "flex", justifyContent: "end" }}>
        <SearchComplete />
      </div> */}
        <Table
          dataSource={
            dataUpdateParticipant ? dataUpdateParticipant : dataParticipants
          }
          //dataSource={dataParticipants}
          columns={columns}
          bordered
          className={s.container_table}
          pagination={false}
          //rowKey={(record) => `${record?.tournament_uid ? tournament_uid : ''}`}
          //rowKey={(record) => `${record?.uid}`}
        />
        <ModalDonateTeam
          nameTeam={datas}
          tournamentId={tournamentId}
          currency={currency}
          refetch={refetch}
          isCheck={isCheck}
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
