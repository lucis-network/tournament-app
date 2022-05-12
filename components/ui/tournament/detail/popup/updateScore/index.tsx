import { Button, Col, Modal, Popconfirm, Row } from "antd";
import { ChangeEvent, FormEvent } from "react";
import s from "./UpdateScore.module.sass";
import RoundStore, { Team } from "src/store/SingleRoundStore";
import { observer } from "mobx-react-lite";
import { isClientDevMode } from "../../../../../../utils/Env";
import { useMutation } from "@apollo/client";
import { UPDATE_MATCH_RESULT } from "../../../../common/tabsItem/myTeamDetail/myTeamService";
import { BracketMatchUpdateInputGql } from "../../../../../../src/generated/graphql";

type Props = {
  datas?: object;
  status?: boolean;
  roundIdx?: number;
  seedIdx?: number;
  teams?: any[];
};

const UpdateScoreModal = (props: Props) => {
  const [setMatchResult] = useMutation(UPDATE_MATCH_RESULT);

  let seedIndex = -1,
    roundIndex = -1,
    teams: Team[] = [];
  if (RoundStore.currentMatch) {
    seedIndex = RoundStore.currentMatch.seedIndex;
    roundIndex = RoundStore.currentMatch.roundIndex;
    teams = RoundStore.currentMatch.teams;
  }

  const closeModal = () => {
    RoundStore.updateScoreModalVisible = false;
  };

  const handleUpdateScore = (
    e: ChangeEvent<HTMLInputElement>,
    teamIdx: number
  ) => {
    const score = parseInt(e.target.value);
    RoundStore.updateCurrentMatchScore(score, teamIdx);
  };

  const updateMatchResult = () => {
    if (!RoundStore.currentMatch) {
      console.error('{updateMatchResult} currentMatch is null');
      return
    }

    RoundStore.reflectCurrentMatchToStore(roundIndex, seedIndex);
    const m = RoundStore.currentMatch;
    const variables: BracketMatchUpdateInputGql  = {
      uid: m.uid,
      score_1: m.teams[0].score,
      score_2: m.teams[1].score,
      finish_match: false,
    }

    setMatchResult({
      variables,
      onCompleted(data: string) {
        console.log('{onCompleted} data: ', data);
      }
    }).then((a) => {
      console.log('{} fetch result: ', a);
    })


    closeModal();
  };

  const updateFinishMatchResult = () => {
    RoundStore.reflectCurrentMatchToStore(roundIndex, seedIndex);

    // TODO: update to server


    closeModal();
  };

  return (
    <Modal
      centered
      visible={RoundStore.updateScoreModalVisible}
      onOk={closeModal}
      onCancel={closeModal}
      title="Update match result"
      footer={[
        <Button key="back" onClick={closeModal}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={updateMatchResult}>
          Update current result
        </Button>,
        <Popconfirm
          key="finish"
          title="In case of find out the winner, this will update the final result"
          okText="Finish" cancelText="Cancel"
          placement="bottomRight"
          onConfirm={updateFinishMatchResult}
        >
          <Button type="ghost" className={"danger"}>
            Update and finish
          </Button>
        </Popconfirm>,
      ]}
    >
      {/* <p className="text-center">Round {roundIdx + 1}</p> */}
      <div style={{ padding: "15px 0" }}>
        <Row justify="center">
          <Col span={8} style={{ textAlign: "center" }}>
            <p className="text-center">{teams && teams[0] ? teams[0].name : ""}</p>
            <input
              className={s.inputScore}
              value={teams && teams[0] ? teams[0].score : "0"}
              onChange={(e) => handleUpdateScore(e, 0)}
            />
          </Col>
          <Col span={6}>
            <p className="text-center">VS</p>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <p className="text-center">{teams && teams[1] ? teams[1].name : ""}</p>

            <input
              className={s.inputScore}
              value={teams && teams[1] ? teams[1].score : "0"}
              onChange={(e) => handleUpdateScore(e, 1)}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default observer(UpdateScoreModal);
