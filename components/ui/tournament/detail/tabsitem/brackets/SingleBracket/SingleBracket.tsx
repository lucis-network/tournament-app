import React from "react";
import { RoundProps } from "react-brackets";
import { observer } from "mobx-react-lite";

import RoundStore, { RoundMatch, Team } from "src/store/SingleRoundStore";
import SingleBracketStateless from "./SingleBracketStateless";
import { UpdateScoreModalStateless } from "../../../popup/updateScore/UpdateScoreModalStateless";

interface Props {
  canEdit: boolean
}

const SingleBracket = (props: Props) => {
  const {canEdit} = props;
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
    };
  }



  // ============= FOR EDIT MODAL =================
  const currentMatch = RoundStore.currentMatch;
  console.log('{.SingleBracket} currentMatch: ', currentMatch);

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

  // const updateScore = (score: number, teamIdx: number) => {
  //   console.log('{.updateScore} score teamIdx: ', score, teamIdx);
  //   RoundStore.updateCurrentMatchScore(score, teamIdx);
  // }
  const onUpdateCompleted = (data?: string) => {
    console.log('{.onUpdateCompleted} data: ', data);
    RoundStore.reflectCurrentMatchToStore(roundIndex, seedIndex);
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
      // onScoreChanged={updateScore}
      onUpdateCompleted={onUpdateCompleted}
    />}
  />;
};

// For display bracket in tour detail screen
export default observer(SingleBracket);
