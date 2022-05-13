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
                <div
                  style={{
                    width: "100%",
                    background: "#d8d899",
                    height: "100%",
                    padding: "5px 0",
                    color: "black",
                  }}
                >
                  {seed.teams[0]?.name ?? `Team ...`}
                </div>
                <div
                  style={{
                    background: "yellow",
                    color: "black",
                    padding: "5px",
                    width: "50px",
                    // cursor: "pointer",
                  }}
                  // onClick={() => openModal(seedIndex, roundIndex, seed.teams)}
                >
                  {seed.teams[0]?.score ?? "0"}
                </div>
              </SeedTeam>
              <SeedTeam className={s.bottomSeed} style={{ padding: 0 }}>
                <div
                  style={{
                    width: "100%",
                    background: "#4e89a3",
                    height: "100%",
                    padding: "5px 0",
                    color: "white",
                  }}
                >
                  {seed.teams[1]?.name ?? `Team ...`}
                </div>
                <div
                  style={{
                    background: "#306882",
                    color: "white",
                    padding: "5px",
                    width: "50px",
                    // cursor: "pointer",
                  }}
                  // onClick={() => openModal(seedIndex, roundIndex, seed.teams)}
                >
                  {seed.teams[1]?.score ?? "0"}
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
        mobileBreakpoint={360}
        swipeableProps={{
          enableMouseEvents: true,
          animateHeight: true,
          style: {
            padding: "0 50px 0 0",
          },
        }}
      />
    </>
  );
};

export default WiningBracket;
