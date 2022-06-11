import React, {useEffect} from "react";
import { RoundProps } from "react-brackets";
import { observer } from "mobx-react-lite";

import RoundStore, { RoundMatch, Team } from "src/store/SingleRoundStore";
import SingleBracketStateless from "./SingleBracketStateless";
import { UpdateScoreModalStateless } from "../../../popup/updateScore/UpdateScoreModalStateless";
import {ApolloQueryResult} from "@apollo/client";
import {message} from "antd";

type Props =  {
  canEdit: boolean
  refetchBracket: () => Promise<ApolloQueryResult<any>>
}

const SingleBracket = (props: Props) => {
  const {canEdit, refetchBracket} = props;
  const rounds = RoundStore.rounds as RoundProps[]
  const openMatchEditModal = (
    e: any,
    seed: RoundMatch,
    seedIndex: number,
    roundIndex: number
  ) => {
    RoundStore.updateScoreModalVisible = true;
    RoundStore.currentMatch = {
      uid: seed.uid,
      teams: seed.teams,
      seedIndex,
      roundIndex,
      linkStreamEnabled: seed.linkStreamEnable,
      linkStream: seed.linkStream,
    };
  }



  // ============= FOR EDIT MODAL =================
  const currentMatch = RoundStore.currentMatch;
  // console.log('{.SingleBracket} currentMatch: ', currentMatch);

  const updateScoreModalVisible = RoundStore.updateScoreModalVisible;

  let seedIndex = -1,
    roundIndex = -1
  ;
  if (currentMatch) {
    seedIndex = currentMatch.seedIndex;
    roundIndex = currentMatch.roundIndex;
  }

  const closeModal = () => {
    RoundStore.updateScoreModalVisible = false;
  };

  const onUpdateCompleted = (score0: number, score1: number) => {
    RoundStore.setMatchScore(roundIndex, seedIndex, score0, score1);
    message.success('Success')
  }
  // ============= END EDIT MODAL =================


  return <SingleBracketStateless
    canEdit={canEdit}
    rounds={rounds}
    openMatchEditModal={openMatchEditModal}
    updateScoreModal={<UpdateScoreModalStateless
      visible={updateScoreModalVisible}
      seedIndex={seedIndex}
      roundIndex={roundIndex}
      currentMatch={currentMatch}
      doCloseModal={closeModal}
      onUpdateCompleted={onUpdateCompleted}
      refetchBracket={refetchBracket}
    />}
  />;
};

// For display bracket in tour detail screen
export default observer(SingleBracket);
