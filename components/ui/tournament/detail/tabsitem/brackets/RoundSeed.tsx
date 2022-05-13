import React from "react";
import { RenderSeedProps, Seed, SeedItem, SeedTeam } from "react-brackets";
import { Tooltip } from "antd";

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
  showFinalMatchRank: boolean = false,
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
    const matchCompleted = match.status === BracketMatchStatus.Complete;
    const showRankIco = showFinalMatchRank && isFinalRound && matchCompleted;

    let finalRankIcoTeam0 = null;
    let finalRankIcoTeam1 = null;
    if (showRankIco && team0 && team1) {
      const champion = <img className={ss.rankIco} src={`/assets/home/im_top1.png`} alt="" />
      const secondary = <img className={ss.rankIco} src={`/assets/home/im_top2.png`} alt="" />
      finalRankIcoTeam0 = team0.score > team1.score ? champion : secondary;
      finalRankIcoTeam1 = team0.score < team1.score ? champion : secondary;
    }

    const teamName0 = team0 && team0.name ? team0.name : `bye`;
    const teamName1 = team1 && team1.name ? team1.name : `bye`;

    return (
      <>
        <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 16 }}>
          <SeedItem>
            <div>
              <SeedTeam className={s.topSeed} style={{ padding: 0 }}>
                <Tooltip title={teamName0} color="#4e89a3" placement="left" trigger="click">
                  <div className={ss.team}>
                    {teamName0}
                  </div>
                </Tooltip>
                <div
                  className={`${ss.score} ${canEdit ? '' : ss.disabled }`}
                  onClick={(e) =>
                    handleOpenModal(e, match, seedIndex, roundIndex)
                  }
                >
                  {team0 ? team0.score : "--"}
                </div>
                {showRankIco && <div className={ss.rank}>{finalRankIcoTeam0}</div>}
              </SeedTeam>
              <SeedTeam className={s.bottomSeed} style={{ padding: 0 }}>
                <Tooltip title={teamName1} color="#4e89a3" placement="left" trigger="click">
                  <div className={`${ss.team} ${ss.team2}`}>
                    {teamName1}
                  </div>
                </Tooltip>
                <div
                  className={`${ss.score} ${ss.score2} ${canEdit ? '' : ss.disabled}`}
                  onClick={(e) => {
                    // console.log('{handleOpenModal} seedIndex, roundIndex: ', seedIndex, roundIndex);
                    handleOpenModal(e, match, seedIndex, roundIndex)
                  }}
                >
                  {team1 ? team1.score : "--"}
                </div>
                {showRankIco && <div className={ss.rank}>{finalRankIcoTeam1}</div>}
              </SeedTeam>
            </div>
          </SeedItem>
        </Seed>
      </>
    );
  };

  return RenderSeed
}