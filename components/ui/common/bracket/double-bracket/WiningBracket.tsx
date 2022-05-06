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
  openModal: any;
  // renderSeedComponent: any;
}

const WiningBracket: React.FC<LosingProps> = ({
  rounds: wining,
  openModal,
}) => {
  // const [modalVisible, setModalVisible] = useState(false);
  // const [roundIndex, setRoundIndex] = useState(0);
  // const [teams, setTeams] = useState([]);

  // const openModalUpdateScore = (e: any, roundIdx: number, teams: any) => {
  //   setRoundIndex(roundIdx);
  //   setTeams(teams);

  //   setModalVisible(true);
  // };

  // const closeModal = () => {
  //   setModalVisible(false);
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
                  {seed.teams[0]?.id ?? `bye`}
                </div>
                <div
                  style={{
                    background: "yellow",
                    color: "black",
                    padding: "5px",
                    width: "50px",
                    cursor: "pointer",
                  }}
                  onClick={() => openModal(seed.teams, roundIndex, seed.teams)}
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
                  {seed.teams[1]?.id ?? `bye`}
                </div>
                <div
                  style={{
                    background: "#306882",
                    color: "white",
                    padding: "5px",
                    width: "50px",
                    cursor: "pointer",
                  }}
                  onClick={() => openModal(seedIndex, roundIndex, seed.teams)}
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
        mobileBreakpoint={360}
        swipeableProps={{
          enableMouseEvents: true,
          animateHeight: true,
          style: {
            padding: "0 50px 0 0",
          },
        }}
      />
      {/* <UpdateScore
        status={modalVisible}
        closeModal={closeModal}
        roundIdx={roundIndex}
        teams={teams}
      /> */}
    </>
  );
};

export default WiningBracket;
