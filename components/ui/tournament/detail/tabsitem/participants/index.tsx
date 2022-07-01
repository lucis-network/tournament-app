import s from "./Participants.module.sass";
import { AppEmitter } from "services/emitter";
import { Image, Button, message, Table, Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import ModalDonateTeam from "components/ui/common/button/buttonDonateTeam";
import { Team } from "src/generated/graphql";
import PopupDonate from "../../popup/popupDonate";
import AuthStore from "components/Auth/AuthStore";
import { useUpdateParticipant } from "hooks/tournament/useTournamentDetail";
import { debounce, isEmpty } from "lodash";
import SearchComplete from "components/ui/common/searchs";

type Props = {
  dataParticipants: Team[];
  loading: any;
  tournamentId: string;
  currency?: any;
  tournament_status: string;
  refetch: any;
  dataBracket?: any;
  is_auto_checkin?: boolean,
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
    is_auto_checkin
  } = props;

  const [datas, setDatas] = useState({});
  const [isPopupDonate, setIsPopupDonate] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isCheckBtnDonate, setIsCheckBtnDonate] = useState(false);
  const [name, setName] = useState("");
  const [dataParticipantsFilter, setDataParticipantsFilter] = useState<Team[]>([] as Team[]);

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

  const onSearch = (e: any) => {
		delayedSearch(e.target.value);
	};

  const delayedSearch = useCallback(
		debounce((value: string) => {
			setName(value);
		}, 600),
		[]
	);
  
  useEffect(() => {
    const dataFilter = dataParticipants.filter((item: any) => {
      if (item?.team && item?.team?.name.toLowerCase().includes(name?.toLowerCase())) return item;
    })
    setDataParticipantsFilter(dataFilter);
  }, [name, dataParticipants])

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "id",
      width: 60,
      render: (_: any, item: any, index: number) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Participant",
      dataIndex: "Participant",
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
      //width: 250,
    },
    {
      title: "Was donated",
      dataIndex: "donate",
      key: "donate",
    },
    {
      title: "Checked in",
      dataIndex: "checkin",
      key: "donate",
      hidden: is_auto_checkin,
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
          {isCheckBtnDonate && !is_auto_checkin && ["REGISTRATION", "CHECKIN", "EDIT_BRACKET", "PREPARE"].includes(tournament_status) &&
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
          }

          {isCheckBtnDonate && is_auto_checkin && ["EDIT_BRACKET", "PREPARE"].includes(tournament_status) &&
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
          }

        </div>
      ),
    },
  ].filter(item => !item.hidden);

  if (loading) {
    return <></>;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.containerTab}>
        <div
          className={s.search}
        >
          <div className={s.searchInput}>
            <Input.Search
              size="large"
              placeholder="Search by name"
              enterButton
              onChange={onSearch}
            />
          </div>
        </div>
        <Table
          // dataSource={
          //   dataUpdateParticipant ? dataUpdateParticipant : dataParticipants
          // }
          dataSource={dataParticipantsFilter}
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
