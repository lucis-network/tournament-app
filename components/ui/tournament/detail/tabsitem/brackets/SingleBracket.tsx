import UpdateScoreModal from "components/ui/tournament/detail/popup/updateScore";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import RoundStore, { RoundMatch } from "src/store/SingleRoundStore";

import {
  Bracket,
  Seed,
  SeedItem,
  SeedTeam,
  RoundProps,
  RenderSeedProps,
} from "react-brackets";

import s from "./index.module.sass";

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
        uid: "",
        teams: seed.teams,
        seedIndex,
        roundIndex,
      };
    } else {
      console.warn("User don't have perm to edit")
    }
  };

  const RenderSeed = ({
    seed,
    breakpoint,
    seedIndex,
    roundIndex,
  }: RenderSeedProps) => {
    const match = seed as RoundMatch;
    const team0 = match.teams[0];
    const team1 = match.teams[1];

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
                  {team0 && team0.name ? team0.name : `bye`}
                </div>
                <div
                  style={{
                    background: "yellow",
                    color: "black",
                    padding: "5px",
                    width: "50px",
                    cursor: "pointer",
                  }}
                  // onClick={() => openModal(seedIndex, roundIndex, match.teams)}
                  onClick={(e) =>
                    handleOpenModal(e, match, seedIndex, roundIndex)
                  }
                >
                  {team0 ? team0.score : "--"}
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
                  {team1 && team1.name  ? team1.name : `bye`}
                </div>
                <div
                  style={{
                    background: "#306882",
                    color: "white",
                    padding: "5px",
                    width: "50px",
                    cursor: "pointer",
                  }}
                  // onClick={() => openModal(seedIndex, roundIndex, match.teams)}
                  onClick={(e) =>
                    handleOpenModal(e, match, seedIndex, roundIndex)
                  }
                >
                  {team1 ? team1.score : "--"}
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
