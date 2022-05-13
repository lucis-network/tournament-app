import { observer } from "mobx-react-lite";

import RoundStore, { ISingleRoundStore, Team } from "src/store/SingleRoundStore";
import { UpdateScoreModalStateless } from "./UpdateScoreModalStateless";

type Props = {
  datas?: object;
  status?: boolean;
  roundIdx?: number;
  seedIdx?: number;
  teams?: any[];
};

const UpdateScoreModal = (props: Props) => {
  const currentMatch = RoundStore.currentMatch;
  const visible = RoundStore.updateScoreModalVisible;

  let seedIndex = -1,
    roundIndex = -1,
    teams: Team[] = [];
  if (currentMatch) {
    seedIndex = currentMatch.seedIndex;
    roundIndex = currentMatch.roundIndex;
    teams = currentMatch.teams;
  }

  const closeModal = () => {
    RoundStore.updateScoreModalVisible = false;
  };

  const updateScore = (score: number, teamIdx: number) => {
    RoundStore.updateCurrentMatchScore(score, teamIdx);
  }
  const onUpdateCompleted = (data?: string) => {
    RoundStore.reflectCurrentMatchToStore(roundIndex, seedIndex);
  }


  return <UpdateScoreModalStateless
    visible={visible}
    seedIndex={seedIndex}
    roundIndex={roundIndex}
    // teams={teams}
    currentMatch={currentMatch}
    doCloseModal={closeModal}
    // onScoreChanged={updateScore}
    onUpdateCompleted={onUpdateCompleted}
  />
};



export default observer(UpdateScoreModal);
