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
import {handleDatepickerScroll} from "../double-bracket/DoubleBracket";

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
        {/* @ts-ignore */}
        <DatePicker
          // disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime
          onChange={(date, dateString) => handleSelectDate('single', date, dateString, i, roundName)}
          inputReadOnly={true}
          onOpenChange={(open: boolean) => handleDatepickerScroll(open)}
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
          <SeedTeam className={s.topSeed} style={{ padding: 0 }}>
            <div className={`${s.team} ${s.teamWin}`}>
              {seed.teams[0]?.name || `Team ...`}
            </div>
            <div className={`${s.score} ${s.scoreWin}`}>
              {seed.teams[0]?.score || "--"}
            </div>
          </SeedTeam>
          <SeedTeam className={s.bottomSeed} style={{ padding: 0 }}>
            <div className={`${s.team} ${s.teamJoined}`}>
              {seed.teams[1]?.name || `Team ...`}
            </div>
            <div className={`${s.score} ${s.scoreJoined}`}>
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
    <div className={`${s.bracketContainer} has-scrollbar`}>
      <Bracket
        rounds={roundsTemp}
        renderSeedComponent={CustomSeed}
        mobileBreakpoint={0}
        swipeableProps={{
          enableMouseEvents: true,
          animateHeight: false,
        }}
      />
    </div>
  );
};

// For timeline setup when creating tour
export default SingleBracket;
