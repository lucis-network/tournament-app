import {
  Bracket,
  Seed,
  SeedItem,
  SeedTeam,
  RoundProps,
  RenderSeedProps,
} from "react-brackets";
import LosingBracket from "./LosingBracket";
import WiningBracket from "./WiningBracket";
import s from "../index.module.sass";
import FinalBracket from "./FinalBracket";
import { DatePicker } from "antd";
import TournamentStore from "src/store/TournamentStore";
import { round } from "lodash";

type Props = {
  numWinRounds: number | string;
  numLoseRounds: number | string;
  handleSelectDate: any;
};

const createSeed = () => {
  return {
    teams: [{ name: null }, { name: null }],
  };
};

const createWinRounds = ({
  numWinRounds,
  numParticipants,
  handleSelectDate,
}: any) => {
  const temp = [];
  let numGames = numParticipants / 2;

  for (let i = 1; i <= numWinRounds; i++) {
    const title = (
      <div style={{marginBottom: 20}}>
        <p className="m-0 text-white text-[24px]">{`Round ${i}`}</p>
        <DatePicker
          // disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime
          onChange={(date, dateString) =>
            handleSelectDate(date, dateString, i, "upper")
          }
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

const createLoseRounds = ({
  numLoseRounds,
  numParticipants,
  handleSelectDate,
}: any) => {
  const temp = [];

  let numGames = numParticipants / 4;

  for (let i = 1; i <= numLoseRounds; i++) {
    const title = (
      <div style={{marginBottom: 20}}>
        <p className="m-0 text-white text-[24px]">{`Loser Round ${i}`}</p>
        <DatePicker
          // disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime
          onChange={(date, dateString) =>
            handleSelectDate(date, dateString, i, "lower")
          }
        />
      </div>
    );

    const seeds = [];
    for (let j = 0; j < numGames; j++) {
      const tempSeed = createSeed();
      seeds.push(tempSeed);
    }

    if (i > 0 && i % 2 === 0) {
      numGames = numGames / 2;
    }

    temp.push({ title, seeds });
  }

  return temp as any;
};

const DoubleBracket = ({
  numWinRounds,
  numLoseRounds,
  handleSelectDate,
}: Props) => {
  const numParticipants = TournamentStore.participants ?? 0;

  const winRoundsTemp = createWinRounds({
    numWinRounds,
    numParticipants,
    handleSelectDate,
  });

  const loseRoundsTemp = createLoseRounds({
    numLoseRounds,
    numParticipants,
    handleSelectDate,
  });

  const final: any[] = [
    {
      title: (
        <div style={{marginBottom: 20}}>
          <p className="m-0 text-[24px] text-white">Final Round</p>
          <DatePicker
            showTime
            onChange={(date, dateString) =>
              handleSelectDate(date, dateString, "Final")
            }
          />
        </div>
      ),
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [{}, {}],
        },
      ],
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: "20px",
        overflow: "auto",
        padding: "30px 0",
      }}
      className="has-scrollbar"
    >
      <div>
        <WiningBracket rounds={winRoundsTemp} />
        <div style={{height: 30}} />
        <LosingBracket rounds={loseRoundsTemp} />
      </div>

      <div>
        <FinalBracket rounds={final} />
      </div>
    </div>
  );
};

export default DoubleBracket;
