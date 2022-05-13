import React, { useCallback, useMemo } from "react";
import { Bracket, RoundProps } from "react-brackets";

import UpdateScoreModal from "components/ui/tournament/detail/popup/updateScore";
import { RoundMatch } from "src/store/SingleRoundStore";
import s from "./index.module.sass";
import { makeSeedComponent } from "./RoundSeed";


interface Props {
  canEdit: boolean
  rounds: RoundProps[]
  openMatchEditModal: (
    e: any,
    seed: RoundMatch,
    seedIndex: number,
    roundIndex: number
  ) => void,
}


export default function SingleBracketStateless(props: Props) {
  const {
    canEdit,
    rounds,
    openMatchEditModal,
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
    () => makeSeedComponent(roundCount, canEdit, handleOpenModal),
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

      {/* TODO: Make stateless */}
      {canEdit && <UpdateScoreModal />}
    </>
  );
};
