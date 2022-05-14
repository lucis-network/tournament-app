import React, { ReactElement, useCallback, useMemo } from "react";
import { Bracket, RoundProps } from "react-brackets";

import { RoundMatch } from "src/store/SingleRoundStore";
import s from "../index.module.sass";
import { makeSeedComponent } from "../RoundSeed";


interface Props {
  canEdit: boolean
  rounds: RoundProps[]
  openMatchEditModal: (
    e: any,
    seed: RoundMatch,
    seedIndex: number,
    roundIndex: number
  ) => void,
  updateScoreModal: ReactElement
  showFinalMatchRank?: boolean
}


export default function SingleBracketStateless(props: Props) {
  const {
    canEdit,
    rounds,
    openMatchEditModal,
    updateScoreModal,
    showFinalMatchRank,
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

      {canEdit && <>{updateScoreModal}</>}
    </>
  );
};
