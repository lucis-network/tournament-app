import s from "components/Auth/AuthStore";
import UpdateScore from "components/ui/tournament/detail/popup/updateScore";
import React, { useState } from "react";
import {
  Bracket,
  Seed,
  SingleLineSeed,
  SeedItem,
  SeedTeam,
  RoundProps,
  RenderSeedProps,
} from "react-brackets";

import style from "../index.module.sass";

interface LosingProps {
  rounds: RoundProps[];
  openModal?: any;
}

const LosingBracket: React.FC<LosingProps> = ({
  rounds: losing,
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

  const RenderLosingSeed = ({
    breakpoint,
    roundIndex,
    seedIndex,
    seed,
  }: RenderSeedProps) => {
    const isLineConnector = losing[roundIndex].seeds.length === losing[roundIndex + 1]?.seeds.length;

    const Wrapper = isLineConnector ? SingleLineSeed : Seed;

    return (
      <Wrapper mobileBreakpoint={breakpoint} className={style.seedLose}>
        <SeedItem>
          <div>
            <SeedTeam className={style.topSeed} style={{ padding: 0 }}>
              <div className={`${style.team} ${style.teamWin}`}>
                {seed.teams[0]?.name ?? `Team ...`}
              </div>
              <div className={`${style.score} ${style.scoreWin}`}
                // onClick={() => openModal(seedIndex, roundIndex, seed.teams)}
              >
                {seed.teams[0]?.score ?? "--"}
              </div>
            </SeedTeam>
            <SeedTeam className={style.bottomSeed} style={{ padding: 0 }}>
              <div className={`${style.team} ${style.teamJoined}`}>
                {seed.teams[1]?.name ?? `Team ...`}
              </div>
              <div className={`${style.score} ${style.scoreJoined}`}
                // onClick={() => openModal(seedIndex, roundIndex, seed.teams)}
              >
                {seed.teams[1]?.score ?? "--"}
              </div>
            </SeedTeam>
          </div>
        </SeedItem>
      </Wrapper>
    );
  };

  return (
    <>
      <Bracket
        rounds={losing}
        mobileBreakpoint={0}
        renderSeedComponent={RenderLosingSeed}
        swipeableProps={{
          enableMouseEvents: true,
          animateHeight: false,
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

export default LosingBracket;
