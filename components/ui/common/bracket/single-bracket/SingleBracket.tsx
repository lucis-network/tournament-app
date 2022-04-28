import { DatePicker } from "antd";
import {
  Bracket,
  RoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
} from "react-brackets";

import s from "../Bracket.module.sass";

const rounds: RoundProps[] = [
  {
    title: "Round one",
    seeds: [
      {
        teams: [
          { name: "Team 1", score: "10", winner: true },
          { name: "Team 2", score: "10", winner: false },
        ],
      },
      {
        teams: [{ name: "Team 3" }, { name: "Team 4" }],
      },
      {
        teams: [{ name: "Team 5" }, { name: "Team 6" }],
      },
      {
        teams: [{ name: "Team C" }, { name: "Team D" }],
      },
    ],
  },
  {
    title: "Round Two",
    seeds: [
      {
        // id: 5,
        // date: new Date().toDateString(),
        teams: [{ name: "Team A" }, { name: "Team C" }],
      },
      {
        // id: 6,
        // date: new Date().toDateString(),
        teams: [{ name: "Team A" }, { name: "Team C" }],
      },
    ],
  },
  {
    title: "Final",
    seeds: [
      {
        // id: 5,
        // date: new Date().toDateString(),
        teams: [{ name: null }, { name: null }],
      },
    ],
  },
];

const createSeed = () => {
  return {
    teams: [{ name: null }, { name: null }],
  };
};

const calculateNumberRounds = (numTeam: number) => {
  return Math.round(Math.log(numTeam) / Math.log(2));
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

  return (
    <Seed
      className={s.seedItem}
      mobileBreakpoint={breakpoint}
      style={{ fontSize: 16 }}
    >
      <SeedItem>
        <div>
          <SeedTeam className={s.topSeed}>
            <div
              style={{
                width: "100%",
                background: "#d8d899",
                height: "100%",
                padding: "5px 0",
                color: "black",
              }}
            >
              {seed.teams[0]?.name || "Waiting"}
            </div>
            <div
              style={{
                background: "yellow",
                color: "black",
                padding: "5px",
                width: "50px",
              }}
            >
              {seed.teams[0]?.score || "-"}
            </div>
          </SeedTeam>
          <SeedTeam className={s.bottomSeed}>
            <div
              style={{
                width: "100%",
                background: "#4e89a3",
                height: "100%",
                padding: "5px 0",
                color: "white",
              }}
            >
              {seed.teams[1]?.name || "Waiting"}
            </div>
            <div
              style={{
                background: "#306882",
                color: "white",
                padding: "5px",
                width: "50px",
              }}
            >
              {seed.teams[1]?.score || "-"}
            </div>
          </SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

const SingleBracket = () => {
  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
};

export default SingleBracket;
