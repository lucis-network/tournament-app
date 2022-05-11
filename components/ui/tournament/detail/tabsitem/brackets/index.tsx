import DoubleBracket from "./DoubleBracket";
import s from "./index.module.sass";
import UpdateScore from "components/ui/tournament/detail/popup/updateScore";
import { useEffect, useState } from "react";
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

    const listTeam = dataBracket.bracketTeams;
    const isSingleBracket = dataBracket.type === "SINGLE";

    if (isSingleBracket) {
      const singleRounds = createRounds({
        bracketRounds: dataBracket.bracketRounds,
        listTeam,
      });
      RoundStore.rounds = singleRounds;
    } else {
      const upper = dataBracket.bracketRounds.filter((i: BracketRound) => i.type === "UPPER");
      const lower = dataBracket.bracketRounds.filter((i: BracketRound) => i.type === "LOWER");

      const upperRounds = createRounds({
        bracketRounds: upper,
        listTeam,
      });
      const lowerRounds = createRounds({
        bracketRounds: lower,
        listTeam,
      });

      console.log('{.} upperRounds, lowerRounds: ', upperRounds, lowerRounds);
      RoundStore.finalRound = upperRounds.splice(upperRounds.length - 1, 1);
      RoundStore.loseRounds = lowerRounds;
      RoundStore.winRounds = upperRounds;
    }
  }, [dataBracket])

  if (!dataBracket || loadingBracket) {
    return <></>;
  }

  const isSingleBracket = dataBracket.type === "SINGLE";

  return (
    <div className={s.bracketContainer}>
      {isSingleBracket ? (
        <SingleBracket />
      ) : (
        <DoubleBracket />
      )}
    </div>
  );
};

export default observer(BracketUI);
