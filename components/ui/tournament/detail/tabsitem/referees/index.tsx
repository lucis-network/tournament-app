import { Button, message, Table } from "antd";
import GroupLink from "components/ui/common/groupLink";
import PopupDonate from "../../popup/popupDonate";

import {User} from "src/generated/graphql";
import { useState } from "react";

import s from "./Referees.module.sass";
import AuthStore from "components/Auth/AuthStore";

type Props = {
  dataRefereesDetail: User[];
  loadingReferees: any;
  tournamentId: string;
  currency?: any;
  tournament_status: string;
  refetch?: any;
  is_auto_checkin?: boolean
};
export default function Referees(props: Props) {
  const {
    dataRefereesDetail,
    loadingReferees,
    tournamentId,
    currency,
    tournament_status,
    refetch,
    is_auto_checkin
  } = props;
  const [dataReferees, setDataReferees] = useState({});
  const [isPopUp, setIsPopUp] = useState(false);

  if (loadingReferees) {
    return <></>;
  }

  const handleClickShowPopUp = (e: any) => {
    setDataReferees(e.profile);
    setIsPopUp(true);
  };
  const click = () => {
    setIsPopUp(false);
  };

  const columnsReferees = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "10%",
      render: (_: any, item: any, index: number) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Referees",
      dataIndex: "user",
      key: "user",
      width: "40%",
      render: (_: any, item: any) => {
        return (
          <div className="text-left">
            <img
              className={s.avt}
              src={`${
                item.profile.avatar ??
                "/assets/MyProfile/defaultAvatar.png"
              }`}
              alt=""
            />
            <a
              style={{ color: "white", marginLeft: "10px" }}
              href={`/profile/${item?.profile?.user_name}`}
              target="_blank"
              rel="noreferrer"
            >
              {item.profile.display_name}
            </a>
          </div>
        );
      },
    },
    {
      title: "Contact",
      dataIndex: "user",
      key: "contact",
      width: "40%",
      render: (_: any, item: any) => {
        return (
          <div className={s.contact}>
            <GroupLink datas={item.profile} />
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "user",
      key: "donate",
      render: (_: any, item: any) => (
        <div>
          {tournament_status !== "CLOSED" &&
            <Button
              onClick={() => {
                if (!AuthStore.isLoggedIn) {
                  message.info("Please sign in first");
                  return;
                }
                handleClickShowPopUp(item);
              }}
              type="primary"
            >
              Donate
            </Button>
          }
        </div>
      ),
    },
  ];
  return (
    <div className={s.wrapper}>
      <div className={s.containerTab}>
        <Table
          dataSource={dataRefereesDetail}
          columns={columnsReferees}
          bordered
          rowKey={(record) => `${record?.profile?.user_id}`}
          className={s.container_table}
        />
        <PopupDonate
          closeModal={click}
          status={isPopUp}
          datas={dataReferees}
          tournamentId={tournamentId}
          types={"REFEREE"}
          currency={currency}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
