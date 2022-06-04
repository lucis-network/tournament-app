import React, {ReactElement, useCallback, useEffect, useMemo} from "react";
import { Bracket, RoundProps } from "react-brackets";

import {CurrentMatch, RoundMatch} from "src/store/SingleRoundStore";
import s from "../index.module.sass";
import { makeSeedComponent } from "../RoundSeed";
import {UpdateScoreModalStateless} from "../../../popup/updateScore/UpdateScoreModalStateless";


interface Props {
  canEdit: boolean
  rounds: RoundProps[]
  openMatchEditModal: (
    e: any,
    seed: RoundMatch,
    seedIndex: number,
    roundIndex: number
  ) => void,
  showFinalMatchRank?: boolean
  modalVisible: boolean
  seedIndex: number
  roundIndex: number
  currentMatch?: CurrentMatch
  doCloseModal: () => void
  onUpdateCompleted: (score0: number, score1: number) => void
}


export default function SingleBracketStateless(props: Props) {
  const {
    canEdit,
    rounds,
    openMatchEditModal,
    showFinalMatchRank,
    modalVisible,
    seedIndex,
    roundIndex,
    currentMatch,
    doCloseModal,
    onUpdateCompleted,
  } = props;

  const roundCount = rounds.length;

  const handleOpenModal = useCallback((e: any, seed: RoundMatch, seedIndex: number, roundIndex: number) => {
    if (canEdit) {
      openMatchEditModal(e, seed, seedIndex, roundIndex)
    } else {
      console.warn("User don't have perm to edit")
    }
  }, []);

  const RenderSeed = useMemo(
    () => makeSeedComponent(roundCount, canEdit, handleOpenModal, showFinalMatchRank),
    [roundCount, canEdit, handleOpenModal]
  );

  return (
    <>
      <Bracket
        rounds={rounds}
        roundClassName={s.wining}
        renderSeedComponent={RenderSeed}
        mobileBreakpoint={450}
        swipeableProps={{
          enableMouseEvents: true,
          animateHeight: true,
          style: {
            padding: "0 50px 0 0",
          },
        }}
      />

      {canEdit && <UpdateScoreModalStateless
          visible={modalVisible}
          seedIndex={seedIndex}
          roundIndex={roundIndex}
          currentMatch={currentMatch}
          doCloseModal={doCloseModal}
          onUpdateCompleted={onUpdateCompleted}
      />}
    </>
  );
};
