import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Alert } from "antd";

import DoubleBracket from "./DoubleBracket";
import s from "./index.module.sass";
import SingleBracket from "./SingleBracket/SingleBracket";
import RoundStore from "src/store/SingleRoundStore";
import { BracketUiProps, createRounds } from "./BracketUtil";
import { BracketRound } from "src/generated/graphql";
import AuthStore from "../../../../../Auth/AuthStore";
import DoubleBracketStore from "./DoubleBracket/DoubleBracketStore";




const BracketUI = ({ dataBracket, loadingBracket, refereeIds }: BracketUiProps) => {
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

      console.log('{.} upperRounds, lowerRounds: ', {...upperRounds}, {...lowerRounds});

      DoubleBracketStore.finalRounds = upperRounds.splice(upperRounds.length - 1, 1);
      DoubleBracketStore.winRounds = upperRounds;
      DoubleBracketStore.loseRounds = lowerRounds;
    }
  }, [dataBracket])

  if (!dataBracket || loadingBracket) {
    return <></>;
  }

  const isSingleBracket = dataBracket.type === "SINGLE";

  // isRefereeOfThisTour
  const canEditMatch = refereeIds.includes((AuthStore.id ? AuthStore.id.toString() : ''));
  console.log('{BracketUI} refereeIds, AuthStore.id, canEditMatch: ', refereeIds, AuthStore.id, canEditMatch);

  return (
    <div className="bracket-wrapper">
      {canEditMatch && <Alert
        className={s.refereeNotice}
        type="warning" showIcon
        message="NOTE: You are selected to be a referee of this match so you can update the match results"
      />}

      <div className={`${s.bracketContainer} has-scrollbar`}>
        {isSingleBracket ? (
          <SingleBracket canEdit={canEditMatch} />
        ) : (
          <DoubleBracket canEdit={canEditMatch} />
        )}
      </div>
    </div>
  );
};

export default observer(BracketUI);
