import DoubleBracket from "./DoubleBracket";
import s from "./index.module.sass";
import UpdateScore from "components/ui/tournament/detail/popup/updateScore";
import { useEffect, useState } from "react";
import { Alert } from "antd";

import SingleBracket from "./SingleBracket";
import RoundStore from "src/store/SingleRoundStore";
import FormItemLabel from "antd/lib/form/FormItemLabel";
import { observer } from "mobx-react-lite";
import { BracketUiProps, createRounds } from "./BracketUtil";
import { BracketRound } from "../../../../../../src/generated/graphql";




const BracketUI = ({ dataBracket, loadingBracket }: BracketUiProps) => {
  console.log('{BracketUI} dataBracket: ', dataBracket);

  useEffect(() => {
    if (!dataBracket) {
      return;
    }
    console.log('{useEffect} dataBracket: ', dataBracket);

    const bracketTeams = dataBracket.bracketTeams;
    const isSingleBracket = dataBracket.type === "SINGLE";

    if (isSingleBracket) {
      if (!bracketTeams || !dataBracket.bracketRounds) {
        return
      }

      const singleRounds = createRounds({
        bracketRounds: dataBracket.bracketRounds,
        bracketTeams,
      });
      RoundStore.rounds = singleRounds;
    } else {
      if (!bracketTeams || !dataBracket.bracketRounds) {
        return
      }

      const upper: BracketRound[] = dataBracket.bracketRounds.filter((i: BracketRound) => i.type === "UPPER");
      const lower: BracketRound[] = dataBracket.bracketRounds.filter((i: BracketRound) => i.type === "LOWER");

      const upperRounds = createRounds({
        bracketRounds: upper,
        bracketTeams,
      });
      const lowerRounds = createRounds({
        bracketRounds: lower,
        bracketTeams,
      });

      console.log('{.} upperRounds, lowerRounds: ', upperRounds, lowerRounds);
      // RoundStore.finalRound = upperRounds.splice(upperRounds.length - 1, 1);
      // RoundStore.loseRounds = lowerRounds;
      // RoundStore.winRounds = upperRounds;
    }
  }, [dataBracket])

  if (!dataBracket || loadingBracket) {
    return <></>;
  }

  const isSingleBracket = dataBracket.type === "SINGLE";

  // isRefereeOfThisTour
  const canEditMatch = true;

  return (
    <div className={s.bracketContainer}>
      {canEditMatch && <Alert
        className={s.refereeNotice}
        type="warning" showIcon
        message="NOTE: You are selected to be a referee of this match so you can update the match results"
      />}

      {isSingleBracket ? (
        <SingleBracket canEdit={true} />
      ) : (
        <DoubleBracket canEdit={true} />
      )}
    </div>
  );
};

export default observer(BracketUI);
