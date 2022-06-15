import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {ApolloQueryResult, useMutation} from "@apollo/client";
import {Button, Col, Form, Input, InputRef, message as antd_message, message, Modal, Popconfirm, Row, Switch} from "antd";

import { CurrentMatch, Team } from "src/store/SingleRoundStore";
import { UPDATE_MATCH_RESULT } from "../../../../common/tabsItem/myTeamDetail/myTeamService";
import { BracketMatchUpdateInputGql } from "src/generated/graphql";
import { CommonError, handleGraphqlErrors } from "utils/apollo_client";
import s from "./UpdateScore.module.sass";
import {useForm} from "antd/lib/form/Form";
import SpinLoading from "../../../../common/Spin";


export type UpdateScoreModalStatelessProps = {
  visible: boolean,
  seedIndex?: number,
  roundIndex?: number,
  currentMatch?: CurrentMatch,
  doCloseModal: () => void,
  onUpdateCompleted: (score0: number, score1: number) => void,
  refetchBracket: () => Promise<ApolloQueryResult<any>>
}
export const UpdateScoreModalStateless = (props: UpdateScoreModalStatelessProps) => {
  const {
    visible,
    // seedIndex,
    // roundIndex,
    currentMatch,
    doCloseModal,
    onUpdateCompleted,
    refetchBracket
  } = props;
  const teams = currentMatch ? currentMatch.teams : [];

  const [setMatchResult] = useMutation(UPDATE_MATCH_RESULT);
  const [isLoading, setIsLoading] = useState(false);

  const teamName0 = teams && teams[0] ? teams[0].name : "";
  const teamName1 = teams && teams[1] ? teams[1].name : "";
  const teamScore0 = teams && teams[0] ? teams[0].score : "0";
  const teamScore1 = teams && teams[1] ? teams[1].score : "0";


  const [score0, setScore0] = useState(teamScore0);
  const [score1, setScore1] = useState(teamScore1);
  const [enableLinkStream, setEnableLinkStream] = useState<boolean>(currentMatch?.linkStreamEnabled ?? false);
  const [linkStream, setLinkStream] = useState<string>(currentMatch?.linkStream ?? '');
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
      setEnableLinkStream(currentMatch?.linkStreamEnabled ?? false)
      setLinkStream(currentMatch?.linkStream ?? '')
    }
    return () => {
      const input: HTMLInputElement = document.getElementById('link-stream') as HTMLInputElement
      // input.value = ''
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
      link_stream: linkStream,
      link_stream_enable: enableLinkStream,
    }
    if(input.score_1 === input.score_2) {
      message.warn("Unable to update draw score")
      return;
    }
    
    setIsLoading(true)
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
      setIsLoading(false)
      refetchBracket()
      doCloseModal();
    })
  }

  const persistMatchResult = () => {
    if (enableLinkStream) {
      form.validateFields()
        .then((result) => {
          updateMatchResult(false)
        })
        .catch(error => {
          console.log(error);
        })
    } else {
      updateMatchResult(false)
    }
  };

  const finishMatchResult = () => {
    if (enableLinkStream) {
      form.validateFields()
        .then((result) => {
          updateMatchResult(true)
        })
        .catch(error => {
          console.log(error);
        })
    } else {
      updateMatchResult(true)
    }
  };

  const [form] = useForm()

  const handleEnableLinkStream = (value: boolean) => {
    if (!value) {
      form.validateFields()
    }
    setEnableLinkStream(value)
  }

  const handleLinkStreamChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setLinkStream(event.currentTarget.value)
  }

  useEffect(() => {
    if (enableLinkStream) {
      document.getElementById('link-stream')?.focus()
    }
  }, [linkStream, enableLinkStream])

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
      <div style={{ padding: "15px 0 0" }}>
        <Row justify="center">
          <Col span={8} style={{ textAlign: "center" }}>
            <p className="text-center">{teamName0}</p>
          </Col>

          <Col span={6}>
            <p className="text-center">VS</p>
          </Col>

          <Col span={8} style={{ textAlign: "center" }}>
            <p className="text-center">{teamName1}</p>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={8} style={{ textAlign: "center" }}>
            <input
              className={s.inputScore}
              type="number"
              value={score0}
              onChange={(e) => onScoreChanged(e.target.value, 0)}
            />
          </Col>
          <Col span={6} />
          <Col span={8} style={{ textAlign: "center" }}>
            <input
              className={s.inputScore}
              type="number"
              value={score1}
              onChange={(e) => onScoreChanged(e.target.value, 1)}
            />
          </Col>
        </Row>
        <Row className="mt-5" align="middle">
          <Col xs={{ span: 24 }} sm={{ span: 10 }} className="mb-3">
            <span className="pr-3">Livestream link:</span>
            <Switch checked={enableLinkStream} onChange={handleEnableLinkStream} />
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 14 }} className="mb-3">
            <Form
              form={form}
              validateTrigger="onSubmit"
              initialValues={{
                link_stream: linkStream
              }}
            >
              <Form.Item
                style={{ marginBottom: 0 }}
                name="link_stream"
                rules={
                  [
                    {
                      required: enableLinkStream,
                      message: "Livestream link is required."
                    },
                    {
                      type: "url",
                      message: "Not a valid url.",
                    },
                  ]
                }
              >
                <Input
                  onChange={handleLinkStreamChange}
                  disabled={!enableLinkStream}
                  id="link-stream"
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        {isLoading && (
          <div className={s.loaderWrapper}>
            <SpinLoading className={s.loader} />
          </div>
        )}
      </div>
    </Modal>
  );
}
