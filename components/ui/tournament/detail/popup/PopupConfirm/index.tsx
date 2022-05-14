import React from "react";
import { message, Modal, Table } from "antd";
import s from "./PopupConfirm.module.sass";
import { useConfirmTournamentResult } from "hooks/tournament/useTournamentDetail";
import TournamentService from "components/service/tournament/TournamentService";

interface Props {
  show: boolean;
  onCancel: () => void;
  onOk: () => void;
  tournamentId: string;
}

export default function PopupConfirm(props: Props) {
  const { show, onOk, onCancel, tournamentId } = props;
  const { error, loading, data } = useConfirmTournamentResult({
    tournament_uid: tournamentId,
  });

  if (loading) return null;

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: "15%",
      render: (_: any, item: any) => {
        return <>{item.rank}</>;
      },
    },
    {
      title: "Participants",
      dataIndex: "team_name",
      key: "team_name",
      width: "35%",
      render: (_: any, item: any) => {
        return <>{item.team_name}</>;
      },
    },
  ];

  const handOk = () => {
    const tournamentService = new TournamentService();
    const res = tournamentService
      .confirmTournamentResult(tournamentId)
      .then((res) => {
        if (res) {
          message.success("Success");
          onCancel();
        } else {
          message.success("Fail. Plesase try again.");
        }
      });
  };

  return (
    <Modal
      centered
      title={<h3 className="text-20px text-white">Tournament result</h3>}
      visible={show}
      wrapClassName={s.mdl}
      okText="Confirm"
      onCancel={onCancel}
      onOk={handOk}
    >
      <div className={s.wrapper}>
        <Table
          dataSource={data}
          columns={columns}
          bordered
          className={s.container_table}
          rowKey={(record) => `${record?.rank}`}
        />
      </div>
      <div className={s.text}>
        Please review the tournament result first. If you do not agree with
        result, please contact to the referee(s) to resolve your problem
      </div>
    </Modal>
  );
}
