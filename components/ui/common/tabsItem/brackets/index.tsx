import { DatePicker } from "antd";
import { useBracket } from "hooks/tournament/useTournamentDetail";
import { Moment } from "moment-timezone";
import {
  Bracket,
  RenderSeedProps,
  Seed,
  SeedItem,
  SeedTeam,
} from "react-brackets";
import { BracketRound } from "src/generated/graphql";
import s from "./index.module.sass";

type RoundProps = {
  //   numRounds: number;
  //   numGames: number;
  bracketRounds: BracketRound[];
};

const calculateGames = (bracketRounds: any) => {
  let totalGames = 0;
  for (let i = 0; i < bracketRounds.length; i++) {
    totalGames += bracketRounds[i].bracketMatchs.length;
  }

  return totalGames;
};

const createSeed = () => {
  return {
    teams: [{ name: null }, { name: null }],
  };
};

const createRounds = ({ bracketRounds }: RoundProps): any => {
  const rounds = bracketRounds.map((item, idx) => {
    return {
      title: <p className="m-0 text text-white">{item.title}</p>,
      seeds: item.bracketMatchs?.map((item, idx) => {
        return {
          teams: [
            {
              id: item.team1_uid !== "bye" ? item.team1_uid : null,
              score: item.score_1,
            },
            {
              id: item.team2_uid !== "bye" ? item.team2_uid : null,
              score: item.score_2,
            },
          ],
        };
      }),
    };
  });

  return rounds;
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
  // {
  //   title: 'Round 1',
  //   seeds: [
  //     {},
  //     {
  //       id: 1,
  //       date: new Date().toDateString(),
  //       teams: [
  //         { id: 1, name: 'The Leons', score: 2 },
  //         // { id: 3, name: 'Kitties', score: 6 },
  //       ],
  //     },
  //     {},
  //     {
  //       id: 1,
  //       date: new Date().toDateString(),
  //       teams: [
  //         { id: 1, name: 'The Leons', score: 2 },
  //         // { id: 3, name: 'Kitties', score: 6 },
  //       ],
  //     },
  //   ],
  // },

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
              {seed.teams[0]?.id || `---`}
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
              {seed.teams[1]?.id || `---`}
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

const BracketUI = () => {
  const { dataBracket, loading } = useBracket({
    tournament_uid: "cl2be7tze0019qyvclmlbvvoa",
  });

  if (loading) {
    return <></>;
  }

  const rounds = createRounds({
    bracketRounds: dataBracket.bracketRounds,
  });

  console.log(rounds);

  return (
    <div>
      <Bracket
        rounds={rounds}
        renderSeedComponent={CustomSeed}
        mobileBreakpoint={0}
      />
    </div>
  );
};

export default BracketUI;
