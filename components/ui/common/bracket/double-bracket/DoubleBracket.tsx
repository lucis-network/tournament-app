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
import {isClient} from "../../../../../utils/Env";

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

export const handleDatepickerScroll = (open: boolean) => {
  if (!isClient) return
  const modal = document.querySelector<HTMLElement>('.ant-modal-wrap')
  const modalBodyOffset = document.querySelector<HTMLElement>('.ant-modal-body')?.getBoundingClientRect()
  if (!modal) return
  if (open) {
    if (modalBodyOffset && modalBodyOffset.top > 100) {
      modal.scrollBy(0, 150)
    }
    modal.style.overflow = 'hidden'
  } else {
    modal.style.overflow = 'auto'
  }
}

const createWinRounds = ({
  numWinRounds,
  numParticipants,
  handleSelectDate,
}: any) => {
  const temp = [];
  let numGames = numParticipants / 2;

  for (let i = 1; i <= numWinRounds; i++) {
    const roundName = `Round ${i}`
    const title = (
      <div style={{marginBottom: 20}}>
        <p className="m-0 text-white text-[24px]">{roundName}</p>
        {/* @ts-ignore */}
        <DatePicker
          // disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime
          onChange={(date, dateString) =>
            handleSelectDate('double', date, dateString, i, roundName, "upper")
          }
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

const createLoseRounds = ({
  numLoseRounds,
  numParticipants,
  handleSelectDate,
}: any) => {
  const temp = [];

  let numGames = numParticipants / 4;

  for (let i = 1; i <= numLoseRounds; i++) {
    const roundName = `Loser round ${i}`
    const title = (
      <div style={{marginBottom: 20}}>
        <p className="m-0 text-white text-[24px]">{roundName}</p>
        {/* @ts-ignore */}
        <DatePicker
          // disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime
          onChange={(date, dateString) =>
            handleSelectDate('double', date, dateString, i, roundName, "lower")
          }
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
          {/* @ts-ignore */}
          <DatePicker
            showTime
            onChange={(date, dateString) =>
              handleSelectDate('double', date, dateString, 0, "Final")
            }
            inputReadOnly={true}
            onOpenChange={(open: boolean) => handleDatepickerScroll(open)}
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
