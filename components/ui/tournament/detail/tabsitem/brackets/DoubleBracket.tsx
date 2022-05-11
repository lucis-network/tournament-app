import FinalBracket from "components/ui/common/bracket/double-bracket/FinalBracket";
import LosingBracket from "components/ui/common/bracket/double-bracket/LosingBracket";
import WiningBracket from "components/ui/common/bracket/double-bracket/WiningBracket";
// import RoundStore from "src/store/RoundStore";
import { observer } from "mobx-react-lite";

type Props = {
  // upper: any;
  // lower: any;
  // openModal: any;
  canEdit: boolean
};


const DoubleBracket = (props: Props) => {
  // const upperRounds = [...upper].splice(0, upper.length - 1);
  // const finalRound = [...upper].splice(upper.length - 1, 1);

  // const {winRounds, loseRounds, finalRound} = RoundStore;

  return (
    <div
      style={{
        // position: "relative",
        display: "flex",
        gap: "20px",
        // overflow: "scroll",
        // color: "white"
      }}
    >
      <p>TODO</p>
      {/*<div>*/}
      {/*  <WiningBracket rounds={winRounds} />*/}
      {/*  <div style={{ height: "50px" }} />*/}
      {/*  <LosingBracket rounds={loseRounds} />*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <FinalBracket rounds={finalRound}  />*/}
      {/*</div>*/}
    </div>
  );
};

export default observer(DoubleBracket);
