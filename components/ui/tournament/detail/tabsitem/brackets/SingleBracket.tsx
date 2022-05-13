import UpdateScoreModal from "components/ui/tournament/detail/popup/updateScore";
import React from "react";
import { observer } from "mobx-react-lite";
import RoundStore, { RoundMatch } from "src/store/SingleRoundStore";
import ss from './SingleBracket.module.sass'

import { Bracket, RenderSeedProps, RoundProps, Seed, SeedItem, SeedTeam, } from "react-brackets";

import s from "./index.module.sass";
import { BracketMatchStatus } from "../../../../../../src/generated/graphql";

interface Props {
  canEdit: boolean
}

const SingleBracket = (props: Props) => {
  const {canEdit} = props;

  const handleOpenModal = (
    e: any,
    seed: RoundMatch,
    seedIndex: number,
    roundIndex: number
  ) => {
    if (canEdit) {
      RoundStore.updateScoreModalVisible = true;
      RoundStore.currentMatch = {
        uid: seed.uid,
        teams: seed.teams,
        seedIndex,
        roundIndex,
      };
    } else {
      console.warn("User don't have perm to edit")
    }
  };

  const roundCount = RoundStore.rounds.length;

  const RenderSeed = ({
    seed,
    breakpoint,
    seedIndex,
    roundIndex,
  }: RenderSeedProps) => {
    const match = seed as RoundMatch;
    const team0 = match.teams[0];
    const team1 = match.teams[1];
    const isFinalRound = roundIndex >= roundCount - 1;

    let finalRankIcoTeam0 = null;
    let finalRankIcoTeam1 = null;
    if (isFinalRound && match.status === BracketMatchStatus.Complete && team0 && team1) {
      const champion = <img className={ss.rankIco} src={`/assets/home/im_top1.png`} alt="" />
      const secondary = <img className={ss.rankIco} src={`/assets/home/im_top2.png`} alt="" />
      finalRankIcoTeam0 = team0.score > team1.score ? champion : secondary;
      finalRankIcoTeam1 = team0.score < team1.score ? champion : secondary;
    }

    return (
      <>
        <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 16 }}>
          <SeedItem>
            <div>
              <SeedTeam className={s.topSeed} style={{ padding: 0 }}>
                <div className={ss.team}>
                  {team0 && team0.name ? team0.name : `bye`}
                </div>
                <div
                  className={`${ss.score} ${canEdit ? '' : ss.disabled }`}
                  onClick={(e) =>
                    handleOpenModal(e, match, seedIndex, roundIndex)
                  }
                >
                  {team0 ? team0.score : "--"}
                </div>
                {isFinalRound && <div className={ss.rank}>{finalRankIcoTeam0}</div>}
              </SeedTeam>
              <SeedTeam className={s.bottomSeed} style={{ padding: 0 }}>
                <div className={`${ss.team} ${ss.team2}`}>
                  {team1 && team1.name ? team1.name : `bye`}
                </div>
                <div
                  className={`${ss.score} ${ss.score2} ${canEdit ? '' : ss.disabled }`}
                  onClick={(e) =>
                    handleOpenModal(e, match, seedIndex, roundIndex)
                  }
                >
                  {team1 ? team1.score : "--"}
                </div>
                {isFinalRound && <div className={ss.rank}>{finalRankIcoTeam1}</div>}
              </SeedTeam>
            </div>
          </SeedItem>
        </Seed>
      </>
    );
  };

  return (
    <>
      <Bracket
        rounds={RoundStore.rounds as RoundProps[]}
        roundClassName={s.wining}
        renderSeedComponent={RenderSeed}
        mobileBreakpoint={360}
        swipeableProps={{
          enableMouseEvents: true,
          animateHeight: true,
          style: {
            padding: "0 50px 0 0",
          },
        }}
      />
      {canEdit && <UpdateScoreModal />}
    </>
  );
};

// For display bracket in tour detail screen
export default observer(SingleBracket);
