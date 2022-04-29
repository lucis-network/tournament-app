import { DatePicker } from "antd";
import {
  Bracket,
  RoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
} from "react-brackets";

import s from "../index.module.sass";
import TournamentStore from "src/store/TournamentStore";

interface RoundNewProps extends RoundProps {
  title: any;
}

type Props = {
  numRounds: number;
  numParticipants: number;
  handleSelectDate: any;
};

const createSeed = () => {
  return {
    teams: [{ name: null }, { name: null }],
  };
};

const createRounds = ({
  numRounds,
  numParticipants,
  handleSelectDate,
}: Props): RoundProps[] => {
  const temp = [];

  let numGames = numParticipants / 2;
  for (let i = 0; i < numRounds; i++) {
    const title = (
      <>
        <p className="m-0 text text-white">
          {i == numRounds - 1 ? `Final` : `Round ${i + 1}`}
        </p>
        <DatePicker
          showTime
          onChange={(date, dateString) => handleSelectDate(date, dateString, i)}
        />
      </>
    );

    const seeds = [];
    for (let j = 0; j < numGames; j++) {
      const tempSeed = createSeed();
      seeds.push(tempSeed);
    }
    numGames = numGames / 2;
    temp.push({ title, seeds });
  }

  return temp as any;
};

const CustomSeed = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
}: RenderSeedProps) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not
  // mobileBreakpoint is required to be passed down to a seed
  // console.log("seedIndex: ", seedIndex);
  // console.log(seed);

  return (
    <Seed
      // className={"seedItem"}
      mobileBreakpoint={breakpoint}
      style={{ fontSize: 16 }}
    >
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
              {seed.teams[0]?.name || `Team ---`}
            </div>
            <div
              style={{
                background: "yellow",
                color: "black",
                padding: "5px",
                width: "50px",
              }}
            >
              {seed.teams[0]?.score || "--"}
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
              {seed.teams[1]?.name || `Team ---`}
            </div>
            <div
              style={{
                background: "#306882",
                color: "white",
                padding: "5px",
                width: "50px",
              }}
            >
              {seed.teams[1]?.score || "--"}
            </div>
          </SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

const SingleBracket = ({ numRounds, handleSelectDate }: any) => {
  const numParticipants = TournamentStore.participants ?? 0;
  const roundsTemp = createRounds({
    numRounds,
    numParticipants,
    handleSelectDate,
  });

  return (
    <div className={s.bracketContainer}>
      <Bracket
        rounds={roundsTemp}
        renderSeedComponent={CustomSeed}
        mobileBreakpoint={0}
      />
    </div>
  );
};

export default SingleBracket;
