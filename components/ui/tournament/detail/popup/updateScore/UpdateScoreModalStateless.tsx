import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Col, message as antd_message, Modal, Popconfirm, Row } from "antd";

import { CurrentMatch, Team } from "src/store/SingleRoundStore";
import { UPDATE_MATCH_RESULT } from "../../../../common/tabsItem/myTeamDetail/myTeamService";
import { BracketMatchUpdateInputGql } from "src/generated/graphql";
import { CommonError, handleGraphqlErrors } from "utils/apollo_client";
import s from "./UpdateScore.module.sass";


export type UpdateScoreModalStatelessProps = {
  visible: boolean,
  seedIndex?: number,
  roundIndex?: number,
  currentMatch?: CurrentMatch,
  doCloseModal: () => void,
  onUpdateCompleted: (score0: number, score1: number) => void,
}
export const UpdateScoreModalStateless = (props: UpdateScoreModalStatelessProps) => {
  const {
    visible,
    // seedIndex,
    // roundIndex,
    currentMatch,
    doCloseModal,
    onUpdateCompleted,
  } = props;

  const teams = currentMatch ? currentMatch.teams : [];

  const [setMatchResult] = useMutation(UPDATE_MATCH_RESULT);


  const teamName0 = teams && teams[0] ? teams[0].name : "";
  const teamName1 = teams && teams[1] ? teams[1].name : "";
  const teamScore0 = teams && teams[0] ? teams[0].score : "0";
  const teamScore1 = teams && teams[1] ? teams[1].score : "0";


  const [score0, setScore0] = useState(teamScore0);
  const [score1, setScore1] = useState(teamScore1);
  const onScoreChanged = (score: string, teamIdx: number) => {
    if (teamIdx == 0) {
      setScore0(score ? parseInt(score) : '')
    } else {
      setScore1(score ? parseInt(score) : '')
    }
  }
  // setup default data on modal visible
  useEffect(() => {
    if (visible) {
      setScore0(teamScore0)
      setScore1(teamScore1)
    }
  }, [visible])

  const updateMatchResult = (is_final: boolean) => {
    if (!currentMatch) {
      console.error('{updateMatchResult} currentMatch is null');
      return
    }

    if (!currentMatch.uid) {
      console.error("Invalid currentMatch: ", currentMatch)
      return;
    }

    const input: BracketMatchUpdateInputGql = {
      uid: currentMatch.uid,
      // @ts-ignore
      score_1: score0 ? parseInt(score0) : 0,
      // @ts-ignore
      score_2: score1 ? parseInt(score1) : 0,
      finish_match: is_final,
    }

    setMatchResult({
      variables: {input},
      onCompleted(data: string) {
        // console.log('{setMatchResult.onCompleted} data: ', data);
        onUpdateCompleted(input.score_1, input.score_2);
      }
    }).then((res) => {
      console.log('{} setMatchResult res: ', res);
    }).catch((e: any) => {
      handleGraphqlErrors(e, (code, message) => {
        switch (code) {
          case 'MATCH_COMPLETE':
            antd_message.error('Cannot update due to the match was completed', 10);
            break;
          case CommonError.Network:
          case 'BAD_USER_INPUT':
          default:
            console.error('{setMatchResult} Unhandled e: ', code, message, e);
        }
      });
    }).finally(() => {
      doCloseModal();
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
      visible={visible}
      onOk={doCloseModal}
      onCancel={doCloseModal}
      title="Update match result"
      footer={[
        <Button key="back" onClick={doCloseModal}>
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
            <p className="text-center">{teamName0}</p>
            <input
              className={s.inputScore}
              type="number"
              value={score0}
              onChange={(e) => onScoreChanged(e.target.value, 0)}
            />
          </Col>

          <Col span={6}>
            <p className="text-center">VS</p>
          </Col>

          <Col span={8} style={{ textAlign: "center" }}>
            <p className="text-center">{teamName1}</p>
            <input
              className={s.inputScore}
              type="number"
              value={score1}
              onChange={(e) => onScoreChanged(e.target.value, 1)}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
