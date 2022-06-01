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
import moment from "moment";
import { range } from "lodash";

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

  function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }

  for (let i = 1; i <= numRounds; i++) {
    const roundName = i === numRounds ? `Final` : `Round ${i}`
    const title = (
      <div style={{marginBottom: 20}}>
        <p className="m-0 text text-white">
          {roundName}
        </p>
        <DatePicker
          // disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime
          onChange={(date, dateString) => handleSelectDate('single', date, dateString, i, roundName)}
        />
      </div>
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
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 16 }}>
      <SeedItem>
        <div>
          <SeedTeam className={s.topSeed} style={{ padding: 0, opacity: 0.6 }}>
            <div
              style={{
                width: "100%",
                background: "#d8d899",
                height: "100%",
                padding: "5px 0",
                color: "black",
              }}
            >
              {seed.teams[0]?.name || `--`}
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
              {seed.teams[1]?.name || `--`}
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
        mobileBreakpoint={768}
      />
    </div>
  );
};

// For timeline setup when creating tour
export default SingleBracket;
