import { observer } from "mobx-react-lite";

import RoundStore, { ISingleRoundStore, Team } from "src/store/SingleRoundStore";
import { UpdateScoreModalStateless } from "./UpdateScoreModalStateless";
import {ApolloQueryResult} from "@apollo/client";

type Props = {
  datas?: object;
  status?: boolean;
  roundIdx?: number;
  seedIdx?: number;
  teams?: any[];
  refetchBracket: () => Promise<ApolloQueryResult<any>>
};

const UpdateScoreModal = (props: Props) => {
  const {refetchBracket} = props
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

  const onUpdateCompleted = (score0: number, score1: number) => {
    RoundStore.setMatchScore(roundIndex, seedIndex, score0, score1);
  }


  return <UpdateScoreModalStateless
    visible={visible}
    seedIndex={seedIndex}
    roundIndex={roundIndex}
    // teams={teams}
    currentMatch={currentMatch}
    doCloseModal={closeModal}
    onUpdateCompleted={onUpdateCompleted}
    refetchBracket={refetchBracket}
  />
};



export default observer(UpdateScoreModal);
