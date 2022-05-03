import React from "react";
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
}

const WiningBracket: React.FC<LosingProps> = ({ rounds: wining }) => {
  const RenderSeed = ({ seed, breakpoint, seedIndex }: RenderSeedProps) => {
    console.log(wining[seedIndex]);

    return (
      <>
        <Seed
          style={{
            opacity: seed.bye_match ? 0.5 : 1,
          }}
          className={s.seedItem}
          mobileBreakpoint={breakpoint}
        >
          <SeedItem style={{ width: "100%" }}>
            <div>
              <SeedTeam>{seed.teams?.[0]?.name || "-----------"}</SeedTeam>
              <SeedTeam>{seed.teams?.[1]?.name || "-----------"}</SeedTeam>
            </div>
          </SeedItem>
        </Seed>
      </>
    );
  };

  return (
    <Bracket
      rounds={wining}
      renderSeedComponent={RenderSeed}
      swipeableProps={{
        enableMouseEvents: true,
        animateHeight: true,
        style: {
          padding: "0 50px 0 0",
        },
      }}
    />
  );
};

export default WiningBracket;
