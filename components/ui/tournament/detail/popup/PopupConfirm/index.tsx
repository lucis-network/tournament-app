import React, { useState } from "react";
import { message, Modal, Table, Image, Button } from "antd";
import s from "./PopupConfirm.module.sass";
import { useConfirmTournamentResult } from "hooks/tournament/useTournamentDetail";
import TournamentService from "components/service/tournament/TournamentService";
import { isEmpty } from "lodash";
interface Props {
  show: boolean;
  onCancel: () => void;
  tournamentId: string;
  refetchConfirmResult: any;
  tournament_status?: string;
  refetchTounament: any;
}

export default function PopupConfirm(props: Props) {
  const {
    show,
    onCancel,
    tournamentId,
    refetchConfirmResult,
    tournament_status,
    refetchTounament,
  } = props;

  const { error, loading, data } = useConfirmTournamentResult({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  const [loadingBtn, setLoadingBtn] = useState(false);

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
        return (
          <div className="text-left">
            {item?.team_avatar && (
              <Image
                className={s.avatar}
                src={`${item?.team_avatar}`}
                preview={false}
                alt={`${item?.team_avatar}`}
              />
            )}
            {item?.team_name}
          </div>
        );
      },
    },
  ];

  const handOk = () => {
    setLoadingBtn(true);
    const tournamentService = new TournamentService();
    const res = tournamentService
      .confirmTournamentResult(tournamentId)
      .then((res) => {
        if (res) {
          message.success("Success");
          setLoadingBtn(false);
          onCancel();
          refetchConfirmResult();
          refetchTounament();
        } else {
          message.success("Fail. Plesase try again.");
          setLoadingBtn(false);
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
      footer={null}
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
        Please review the tournament result first. If you do not agree with this
        result, please contact to the referee(s) to resolve your problem
      </div>
      <div className={s.btnContainter}>
        <Button onClick={onCancel} className="mr-2">Cancel</Button>
        <Button onClick={handOk} className={s.btnConfirm} loading={loadingBtn}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
