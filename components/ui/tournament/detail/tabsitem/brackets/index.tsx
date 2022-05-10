import { DatePicker } from "antd";
// import { useBracket } from "hooks/tournament/useTournamentDetail";
import { Moment } from "moment-timezone";
import {
  Bracket,
  RenderSeedProps,
  Seed,
  SeedItem,
  SeedTeam,
} from "react-brackets";
import { BracketRound } from "src/generated/graphql";
import DoubleBracket from "./DoubleBracket";
import s from "./index.module.sass";
import UpdateScore from "components/ui/tournament/detail/popup/updateScore";
import { useState } from "react";
import SingleBracket from "./SingleBracket";
import RoundStore from "src/store/RoundStore";
import FormItemLabel from "antd/lib/form/FormItemLabel";
import { observer } from "mobx-react-lite";

type RoundProps = {
  //   numRounds: number;
  //   numGames: number;
  bracketRounds?: BracketRound[];
  dataBracket?: any;
  loadingBracket?: any;
  listTeam?: any;
};

const createSeed = (item: any, idx: number, listTeam: any[]) => {
  const team1 = listTeam.find((i) => i.uid == item.team1_uid);
  const team2 = listTeam.find((i) => i.uid == item.team2_uid);

  return {
    teams: [
      {
        id: item.team1_uid !== "bye" ? item.team1_uid : null,
        name: item.team1_uid !== "bye" ? team1?.team.name : null,
        score: item.score_1,
      },
      {
        id: item.team2_uid !== "bye" ? item.team2_uid : null,
        name: item.team2_uid !== "bye" ? team2?.team.name : null,
        score: item.score_2,
      },
    ],
  };
};

const createRound = (item: any, idx: any, listTeam: any[]) => {
  return {
    title: <p className="m-0 text text-white text-[24px]">{item.title}</p>,
    seeds: item.bracketMatchs?.map((item: any, idx: any) =>
      createSeed(item, idx, listTeam)
    ),
  };
};

const createRounds = ({ bracketRounds, listTeam }: RoundProps): any => {
  const rounds = bracketRounds?.map((item, idx) =>
    createRound(item, idx, listTeam)
  );

  return rounds;
};

const BracketUI = ({ dataBracket, loadingBracket }: RoundProps) => {
  // const [modalVisible, setModalVisible] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [seedIndex, setSeedIndex] = useState(0);
  const [teams, setTeams] = useState([]);
  const listTeam = dataBracket.bracketTeams;

  if (loadingBracket) {
    return <></>;
  }

  const singleRounds =
    dataBracket.type === "SINGLE" &&
    createRounds({
      bracketRounds: dataBracket.bracketRounds,
      listTeam,
    });

  const filterUpper = dataBracket.bracketRounds.filter(
    (item: any) => item.type === "UPPER"
  );
  const filterLower = dataBracket.bracketRounds.filter(
    (item: any) => item.type === "LOWER"
  );

  const upperRounds = createRounds({
    bracketRounds: filterUpper,
    listTeam,
  });
  const lowerRounds = createRounds({
    bracketRounds: filterLower,
    listTeam,
  });

  RoundStore.singleRounds = singleRounds;
  RoundStore.loseRounds = lowerRounds;
  RoundStore.winRounds = upperRounds;
  RoundStore.finalRound = [...upperRounds].splice(upperRounds.length - 1, 1);

  const doubleProps = {
    upper: upperRounds,
    lower: lowerRounds,
    // openModal: openModalUpdateScore,
  };

  const singleProps = {
    rounds: singleRounds,
    // openModal: openModalUpdateScore,
  };

  return (
    <div className={s.bracketContainer}>
      {dataBracket.type === "SINGLE" ? (
        <SingleBracket {...singleProps} />
      ) : (
        <DoubleBracket {...doubleProps} />
      )}
    </div>
  );
};

export default observer(BracketUI);
