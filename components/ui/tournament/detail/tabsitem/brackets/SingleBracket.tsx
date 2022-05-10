import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Bracket,
  Seed,
  SeedItem,
  SeedTeam,
  RoundProps,
  RenderSeedProps,
} from "react-brackets";

import RoundStore from "src/store/RoundStore";
import UpdateScore from "components/ui/tournament/detail/popup/updateScore";

import s from "./index.module.sass";


interface Props {
  // rounds: RoundProps[];
  // openModal: any;
}


const RenderSeed = ({
  seed,
  breakpoint,
  seedIndex,
  roundIndex,
}: RenderSeedProps) => {

  const handleOpenModal = (e: any, seed: any) => {
    RoundStore.updateScoreModal = true;
    RoundStore.currentMatch = seed.teams;
  };

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
                {seed.teams[0]?.name ?? `bye`}
              </div>
              <div
                style={{
                  background: "yellow",
                  color: "black",
                  padding: "5px",
                  width: "50px",
                  cursor: "pointer",
                }}
                // onClick={() => openModal(seedIndex, roundIndex, seed.teams)}
                onClick={(e) => handleOpenModal(e, seed)}
              >
                {seed.teams[0]?.score ?? "--"}
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
                {seed.teams[1]?.name ?? `bye`}
              </div>
              <div
                style={{
                  background: "#306882",
                  color: "white",
                  padding: "5px",
                  width: "50px",
                  cursor: "pointer",
                }}
                // onClick={() => openModal(seedIndex, roundIndex, seed.teams)}
                onClick={(e) => handleOpenModal(e, seed)}
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

const SingleBracket = (props: Props) => {
  return (
    <>
      <Bracket
        rounds={RoundStore.singleRounds}
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
      <UpdateScore />
    </>
  );
};

export default observer(SingleBracket);
