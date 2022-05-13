import { Button, Col, Modal, Popconfirm, Row, message as antd_message } from "antd";
import { ChangeEvent, FormEvent } from "react";
import s from "./UpdateScore.module.sass";
import RoundStore, { Team } from "src/store/SingleRoundStore";
import { observer } from "mobx-react-lite";
import { isClientDevMode } from "../../../../../../utils/Env";
import { ApolloError, useMutation } from "@apollo/client";
import { UPDATE_MATCH_RESULT } from "../../../../common/tabsItem/myTeamDetail/myTeamService";
import { BracketMatchUpdateInputGql } from "../../../../../../src/generated/graphql";
import { CommonError, handleGraphqlErrors, onApolloError } from "../../../../../../utils/apollo_client";

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

  const updateMatchResult = (is_final: boolean) => {
    if (!RoundStore.currentMatch) {
      console.error('{updateMatchResult} currentMatch is null');
      return
    }

    const m = RoundStore.currentMatch;
    if (!m.uid) {
      console.error("Invalid currentMatch: ", m)
      return;
    }

    const input: BracketMatchUpdateInputGql = {
      uid: m.uid,
      score_1: m.teams[0].score,
      score_2: m.teams[1].score,
      finish_match: is_final,
    }

    setMatchResult({
      variables: {input},
      onCompleted(data: string) {
        console.log('{setMatchResult.onCompleted} data: ', data);
        RoundStore.reflectCurrentMatchToStore(roundIndex, seedIndex);
      }
    }).then((res) => {
      console.log('{} setMatchResult res: ', res);
    }).catch((e: any) => {
      handleGraphqlErrors(e, (code, message) => {
        switch (code) {
          case 'MATCH_COMPLETE':
            antd_message.error('Cannot update due to the match is complete');
            break;
          case CommonError.Network:
          case 'BAD_USER_INPUT':
          default:
            console.error('{setMatchResult} Unhandled e: ', code, message, e);
        }
      });
    }).finally(() => {
      closeModal();
    })
  };

  const persistMatchResult = () => {
    updateMatchResult(false)
  };
  const finishMatchResult = () => {
    updateMatchResult(true)
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
        <Button key="update" type="primary" onClick={persistMatchResult}>
          Update current result
        </Button>,
        <Popconfirm
          key="finish"
          title="In case of find out the winner, this will update the final result"
          okText="Finish" cancelText="Cancel"
          placement="bottomRight"
          onConfirm={finishMatchResult}
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
