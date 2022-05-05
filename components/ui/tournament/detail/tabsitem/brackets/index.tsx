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
  bracketRounds: BracketRound[];
};

const calculateGames = (bracketRounds: any) => {
  let totalGames = 0;
  for (let i = 0; i < bracketRounds.length; i++) {
    totalGames += bracketRounds[i].bracketMatchs.length;
  }

  return totalGames;
};

const createSeed = (item: any, idx: any) => {
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
};

const createRound = (item: any, idx: any) => {
  return {
    title: <p className="m-0 text text-white">{item.title}</p>,
    seeds: item.bracketMatchs?.map((item: any, idx: any) =>
      createSeed(item, idx)
    ),
  };
};

const createRounds = ({ bracketRounds }: RoundProps): any => {
  const rounds = bracketRounds.map((item, idx) => createRound(item, idx));

  return rounds;
};

const CustomSeed = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
}: RenderSeedProps) => {
  return (
    <Seed
      // className={"seedItem"}
      mobileBreakpoint={breakpoint}
      style={{ fontSize: 16 }}
    >
      <SeedItem>
        <div>
          <SeedTeam
            className={s.topSeed}
            style={{ padding: 0 }}
            onMouseEnter={() => console.log(seed.teams[0]?.id)}
          >
            <div
              style={{
                width: "100%",
                background: "#d8d899",
                height: "100%",
                padding: "5px 0",
                color: "black",
              }}
            >
              {seed.teams[0]?.id || `bye`}
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
              {seed.teams[1]?.id || `bye`}
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

  // console.log(dataBracket.type);

  const rounds = createRounds({
    bracketRounds: dataBracket.bracketRounds,
  });

  return (
    <div className={s.bracketContainer}>
      <Bracket
        rounds={rounds}
        renderSeedComponent={CustomSeed}
        mobileBreakpoint={0}
      />
    </div>
  );
};

export default BracketUI;
