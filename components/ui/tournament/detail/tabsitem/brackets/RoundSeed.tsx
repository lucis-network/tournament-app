import React from "react";
import { RenderSeedProps, Seed, SeedItem, SeedTeam } from "react-brackets";
import {Image, Tooltip} from "antd";

import { RoundMatch } from "src/store/SingleRoundStore";
import { BracketMatchStatus } from "src/generated/graphql";
import s from "./index.module.sass";
import ss from "./SingleBracket/SingleBracket.module.sass";
import {isEmpty} from "lodash";
import Link from "next/link";

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
    const team0Logo = team0?.logo ? team0?.logo : '';
    const team1Logo = team1?.logo ? team1?.logo : '';
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

    const teamName0 = ((team1 && team1.name) && (team0 && isEmpty(team0.name))) ? 'bye' : (team0 && team0.name ? team0.name : 'TBD')
    const teamName1 = ((team0 && team0.name) && (team1 && isEmpty(team1.name))) ? 'bye' : (team1 && team1.name ? team1.name : 'TBD')
    const notStartedYet = (isEmpty(team0.id) || isEmpty(team1.id));
    const canUpdate = canEdit && !notStartedYet && (!matchCompleted);
    const team0joined = !isEmpty(team0.id) && (team0.id !== 'bye');
    const team1joined = !isEmpty(team1.id) && (team1.id !== 'bye');
    const team0score =
      teamName0 === 'bye' ? 0 :
        teamName1 === 'bye' ? 1 :
          ((team0 && !notStartedYet) ? team0.score : "--");
    const team1score =
      teamName1 === 'bye' ? 0 :
        teamName0 === 'bye' ? 1 :
          ((team1 && !notStartedYet) ? team1.score : "--");
    const team0win = team0.score > team1.score;
    const team1win = team0.score < team1.score;
    return (
      <>
        <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 16, paddingBottom: '25px', paddingTop: '25px' }}>
          <SeedItem>
            <div>
              <SeedTeam className={s.topSeed} style={{ padding: 0, marginBottom: '1px' }}>
                <Tooltip title={teamName0} color="#4e89a3" placement="left" trigger="click">
                  <div className={`${ss.team} ${team0joined ? ss.teamJoined : ''} ${team0win ? ss.teamWin : ''}`}>
                    <Image src={team0Logo} preview={false} alt="" fallback="/assets/avatar.jpg" />
                    <span className={ss.teamName}>{teamName0}</span>
                  </div>
                </Tooltip>
                <div
                  className={`${ss.score} ${teamName0 !== 'bye' ? (team0joined ? ss.scoreJoined : '') : ''} ${teamName0 !== 'bye' ? (team0win ? ss.scoreWin : '') : ''} ${canUpdate ? '' : ss.disabled }`}
                  onClick={(e) =>
                    canUpdate ?
                      handleOpenModal(e, match, seedIndex, roundIndex) :
                      undefined
                  }
                >
                  {team0score}
                </div>
                {showRankIco && <div className={ss.rank}>{finalRankIcoTeam0}</div>}
              </SeedTeam>
              <SeedTeam className={s.bottomSeed} style={{ padding: 0 }}>
                <Tooltip title={teamName1} color="#4e89a3" placement="left" trigger="click">
                  <div className={`${ss.team} ${team1joined ? ss.teamJoined : ''} ${team1win ? ss.teamWin : ''}`}>
                    <Image src={team1Logo} preview={false} alt="" fallback="/assets/avatar.jpg" />
                    <span className={ss.teamName}>{teamName1}</span>
                  </div>
                </Tooltip>
                <div
                  className={`${ss.score} ${teamName1 !== 'bye' ? (team0joined ? ss.scoreJoined : '') : ''} ${teamName1 !== 'bye' ? (team1win ? ss.scoreWin : '') : ''} ${canUpdate ? '' : ss.disabled}`}
                  onClick={(e) =>
                    canUpdate ?
                      handleOpenModal(e, match, seedIndex, roundIndex) :
                      undefined
                  }
                >
                  {team1score}
                </div>
                {showRankIco && <div className={ss.rank}>{finalRankIcoTeam1}</div>}
              </SeedTeam>
            </div>
            {(match.linkStreamEnable && match.linkStream) && (
              <Link href={match.linkStream ? match.linkStream : '#'} passHref>
                <a className={`${s.liveStream} ${matchCompleted ? s.liveStreamEnded : '' }`} target="_blank">
                  {!matchCompleted ? (
                    <>
                      <Image src="/assets/TournamentDetail/iconBroadcast.svg" preview={false} alt="" />
                      Live
                    </>
                  ) : (
                    <Image src="/assets/TournamentDetail/iconOpenNewtab.svg" preview={false} alt="" className={s.imgLiveEnded} />
                  )}
                </a>
              </Link>
            )}
          </SeedItem>
        </Seed>
      </>
    );
  };

  return RenderSeed
}