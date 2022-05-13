import React from "react";
import { RoundProps } from "react-brackets";
import { observer } from "mobx-react-lite";

import RoundStore, { RoundMatch } from "src/store/SingleRoundStore";
import SingleBracketStateless from "../RoundCommonBracket";

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

  return <SingleBracketStateless
    canEdit={canEdit}
    rounds={rounds}
    openMatchEditModal={openMatchEditModal}
  />;
};

// For display bracket in tour detail screen
export default observer(SingleBracket);
