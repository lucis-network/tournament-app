import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { RoundProps } from "react-brackets";
// import FinalBracket from "components/ui/common/bracket/double-bracket/FinalBracket";
// import LosingBracket from "components/ui/common/bracket/double-bracket/LosingBracket";
// import WiningBracket from "components/ui/common/bracket/double-bracket/WiningBracket";
// import SingleBracket from "../SingleBracket/SingleBracket";
import DoubleBracketStore from "./DoubleBracketStore";
import { UpdateScoreModalStateless } from "../../../popup/updateScore/UpdateScoreModalStateless";
import SingleBracketStateless from "../SingleBracket/SingleBracketStateless";
import { CurrentMatch, RoundMatch } from "src/store/SingleRoundStore";
import s from '../index.module.sass'
import {ApolloQueryResult} from "@apollo/client";

type Props = {
  canEdit: boolean
  refetchBracket: () => Promise<ApolloQueryResult<any>>
};

const Index = (props: Props) => {
  const {canEdit, refetchBracket} = props;
  const {
    winRounds, loseRounds, finalRounds,
    updateScoreModalVisible,
  } = DoubleBracketStore;

  const [currentMatch, setCurrentMatch] = useState<CurrentMatch | undefined>(undefined);

  const openMatchEditModal = (
    e: any,
    seed: RoundMatch,
    seedIndex: number,
    roundIndex: number
  ) => {
    DoubleBracketStore.setState({updateScoreModalVisible: true});
    setCurrentMatch({
      uid: seed.uid,
      teams: seed.teams,
      seedIndex,
      roundIndex,
    });
  }

  let seedIndex = -1, roundIndex = -1;
  if (currentMatch) {
    seedIndex = currentMatch.seedIndex;
    roundIndex = currentMatch.roundIndex;
  }
  const closeModal = () => {
    DoubleBracketStore.setState({updateScoreModalVisible: false});
  };

  const onWinnerRoundUpdateCompleted = (score0: number, score1: number) => {
    DoubleBracketStore.setWinnerRoundMatchScore(roundIndex, seedIndex, score0, score1);
  }
  const onLoserRoundWinUpdateCompleted = (score0: number, score1: number) => {
    DoubleBracketStore.setLoserRoundMatchScore(roundIndex, seedIndex, score0, score1);
  }
  const onFinalRoundWinUpdateCompleted = (score0: number, score1: number) => {
    DoubleBracketStore.setFinalRoundMatchScore(roundIndex, seedIndex, score0, score1);
  }



  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       gap: "20px",
  //     }}
  //   >
  //     <div>
  //       <WiningBracket rounds={winRounds as RoundProps[]} />
  //       <div style={{ height: "50px" }} />
  //       <LosingBracket rounds={loseRounds as RoundProps[]} />
  //     </div>
  //     <div>
  //       <FinalBracket rounds={finalRounds as RoundProps[]}  />
  //     </div>
  //   </div>
  // );
  return (
    <div className={s.lucisDoubleBracket}>
      <div>
        <SingleBracketStateless
          canEdit={canEdit}
          rounds={winRounds as RoundProps[]}
          openMatchEditModal={openMatchEditModal}
          updateScoreModal={<UpdateScoreModalStateless
            visible={updateScoreModalVisible}
            seedIndex={seedIndex}
            roundIndex={roundIndex}
            currentMatch={currentMatch}
            doCloseModal={closeModal}
            onUpdateCompleted={onWinnerRoundUpdateCompleted}
            refetchBracket={refetchBracket}
          />}
        />
        <div className={s.loseRoundSpacer} />
        <SingleBracketStateless
          canEdit={canEdit}
          rounds={loseRounds as RoundProps[]}
          openMatchEditModal={openMatchEditModal}
          updateScoreModal={<UpdateScoreModalStateless
            visible={updateScoreModalVisible}
            seedIndex={seedIndex}
            roundIndex={roundIndex}
            currentMatch={currentMatch}
            doCloseModal={closeModal}
            onUpdateCompleted={onLoserRoundWinUpdateCompleted}
            refetchBracket={refetchBracket}
          />}
        />
      </div>
      <div className={s.lucisFinalRounds}>
        <div className={s.rbg}>
          <img src="/assets/bracket/dragon.jpg" alt="" />
        </div>
        <SingleBracketStateless
          canEdit={canEdit}
          rounds={finalRounds as RoundProps[]}
          openMatchEditModal={openMatchEditModal}
          updateScoreModal={<UpdateScoreModalStateless
            visible={updateScoreModalVisible}
            seedIndex={seedIndex}
            roundIndex={roundIndex}
            currentMatch={currentMatch}
            doCloseModal={closeModal}
            onUpdateCompleted={onFinalRoundWinUpdateCompleted}
            refetchBracket={refetchBracket}
          />}
          showFinalMatchRank={true}
        />
      </div>
    </div>
  );
};

export default observer(Index);
