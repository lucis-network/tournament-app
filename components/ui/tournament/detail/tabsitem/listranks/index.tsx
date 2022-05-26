import s from "./ListRank.module.sass";
import { Image, Table } from "antd";
import { useState } from "react";
import { fomatNumber, format, currency as currencyFomat } from "utils/Number";
import { useGetListRank } from "hooks/tournament/useTournamentDetail";
import { isEmpty } from "lodash";
import { AppEmitter } from "services/emitter";
import ModalDonateTeam from "components/ui/common/button/buttonDonateTeam";
import PopupDonate from "../../popup/popupDonate";

type Props = {
  tournamentId: string;
  currency?: any;
  tournament_status?: string;
};

export default function ListRanks(props: Props) {
  const { currency, tournamentId, tournament_status } = props;
  const [isCheck, setIsCheck] = useState(false);
  const [isPopupDonate, setIsPopupDonate] = useState(false);
  const [datas, setDatas] = useState({});
  const { data, loading, refetch } = useGetListRank({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  console.log("data", data)
  if (loading) {
    return <></>;
  }

  const handleClick = (e: object) => {
    setDatas(e);
    //@ts-ignore
    if (e?.playTeamMembers?.length == 1) {
      setIsPopupDonate(true);
    } else {
      AppEmitter.emit("showPopupDonate", true);
    }
  };

  const closeModal = () => {
    setIsPopupDonate(false);
  };

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: "15%",
      render: (_: any, item: any, index: number) => {
        return <>{item.rank}</>;
      },
    },
    {
      title: "Participants",
      dataIndex: "team_name",
      key: "team_name",
      width: "35%",
      render: (_: any, item: any, index: number) => {
        console.log(item);
        return (
          <div className="text-left">
            {item?.playTeamMembers?.length == 1 ? (
              <div>
                {item?.playTeamMembers[0]?.user?.profile?.avatar && (
                  <Image
                    className={s.avatar}
                    src={`${item?.playTeamMembers[0]?.user?.profile?.avatar}`}
                    preview={false}
                    alt={`${item?.playTeamMembers[0]?.user?.profile?.avatar}`}
                  />
                )}
                <a
                  style={{ color: "white" }}
                  href={`/profile/${item?.playTeamMembers[0]?.user?.profile?.user_name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.team?.name}
                </a>
              </div>
            ) : (
              <div>
                {item?.team?.avatar && (
                  <Image
                    className={s.avatar}
                    src={`${item?.team?.avatar}`}
                    preview={false}
                    alt={`${item?.team?.avatar}`}
                  />
                )}
                <a
                  style={{ color: "white" }}
                  onClick={() => {
                    handleClick(item);
                    setIsCheck(false);
                  }}
                >
                  {item?.team?.name}
                </a>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Earning",
      dataIndex: "prize",
      key: "prize",
      width: "25%",
      render: (_: any, item: any) => {
        return (
          <>
            {currencyFomat(item.prize)} {currency.symbol}
          </>
        );
      },
    },
    {
      title: "Be donated",
      dataIndex: "donate",
      key: "donate",
      width: "25%",
      render: (_: any, item: any) => {
        return (
          <>
            {currencyFomat(item.donated, 2)} {currency.symbol}
          </>
        );
      },
    },
  ];
  return (
    <div className={s.wrapper}>
      <div className={s.containerTab}>
        <Table
          dataSource={data}
          columns={columns}
          bordered
          className={s.container_table}
          rowKey={(record) => `${record?.rank}`}
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
