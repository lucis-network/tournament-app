import UpdateScore from "components/ui/tournament/detail/popup/updateScore";
import React, { useState } from "react";
import {
  Bracket,
  Seed,
  SeedItem,
  SeedTeam,
  RoundProps,
  RenderSeedProps,
} from "react-brackets";

import s from "../index.module.sass";

interface LosingProps {
  rounds: RoundProps[];
  // openModal: any;
  // renderSeedComponent: any;
}

const WiningBracket: React.FC<LosingProps> = ({
  rounds: wining,
  // openModal,
}) => {
  // const handleOpenModal = () => {
  //   console.log("Hello");
  // };

  const RenderSeed = ({
    seed,
    breakpoint,
    seedIndex,
    roundIndex,
  }: RenderSeedProps) => {
    return (
      <>
        <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 16 }}>
          <SeedItem>
            <div>
              <SeedTeam className={s.topSeed} style={{ padding: 0 }}>
                <div className={`${s.team} ${s.teamWin}`}>
                  {seed.teams[0]?.name ?? `Team ...`}
                </div>
                <div className={`${s.score} ${s.scoreWin}`}>
                  {seed.teams[0]?.score ?? "--"}
                </div>
              </SeedTeam>
              <SeedTeam className={s.bottomSeed} style={{ padding: 0 }}>
                <div className={`${s.team} ${s.teamJoined}`}>
                  {seed.teams[1]?.name ?? `Team ...`}
                </div>
                <div className={`${s.score} ${s.scoreJoined}`}
                  // onClick={() => openModal(seedIndex, roundIndex, seed.teams)}
                >
                  {seed.teams[1]?.score ?? "--"}
                </div>
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
        rounds={wining}
        roundClassName={s.wining}
        renderSeedComponent={RenderSeed}
        mobileBreakpoint={0}
        swipeableProps={{
          enableMouseEvents: true,
          animateHeight: false,
        }}
      />
    </>
  );
};

export default WiningBracket;
