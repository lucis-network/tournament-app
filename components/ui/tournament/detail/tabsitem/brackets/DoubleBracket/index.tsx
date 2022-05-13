import { observer } from "mobx-react-lite";
import { RoundProps } from "react-brackets";

import FinalBracket from "components/ui/common/bracket/double-bracket/FinalBracket";
import LosingBracket from "components/ui/common/bracket/double-bracket/LosingBracket";
import WiningBracket from "components/ui/common/bracket/double-bracket/WiningBracket";
import SingleBracket from "../SingleBracket/SingleBracket";
import DoubleBracketStore from "./DoubleBracketStore";


type Props = {
  canEdit: boolean
};

const Index = (props: Props) => {
  const {canEdit} = props;
  const {winRounds, loseRounds, finalRounds} = DoubleBracketStore;

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
      }}
    >
      <div>
        <WiningBracket rounds={winRounds as RoundProps[]} />
        <div style={{ height: "50px" }} />
        <LosingBracket rounds={loseRounds as RoundProps[]} />
      </div>
      <div>
        <FinalBracket rounds={finalRounds as RoundProps[]}  />
      </div>
    </div>
  );
};

export default observer(Index);
