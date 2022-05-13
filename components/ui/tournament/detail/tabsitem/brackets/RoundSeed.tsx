import React from "react";
import { RenderSeedProps, Seed, SeedItem, SeedTeam } from "react-brackets";

import { RoundMatch } from "src/store/SingleRoundStore";
import { BracketMatchStatus } from "src/generated/graphql";
import s from "./index.module.sass";
import ss from "./SingleBracket/SingleBracket.module.sass";

export function makeSeedComponent(
  roundCount: number,
  canEdit: boolean,
  handleOpenModal: (
    e: any,
    seed: RoundMatch,
    seedIndex: number,
    roundIndex: number
  ) => void,
) {
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

  return RenderSeed
}