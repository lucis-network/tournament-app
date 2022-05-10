import FinalBracket from "components/ui/common/bracket/double-bracket/FinalBracket";
import LosingBracket from "components/ui/common/bracket/double-bracket/LosingBracket";
import WiningBracket from "components/ui/common/bracket/double-bracket/WiningBracket";

type Props = {
  // upper: any;
  // lower: any;
  // openModal: any;
};

const DoubleBracket = (props: Props) => {
  // const upperRounds = [...upper].splice(0, upper.length - 1);
  // const finalRound = [...upper].splice(upper.length - 1, 1);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: "20px",
        overflow: "scroll",
      }}
    >
      <h1>TODO</h1>
      {/* <div>
        <WiningBracket rounds={upperRounds} />
        <div style={{ height: "50px" }}></div>
        <LosingBracket rounds={lower} />
      </div>

      <div>
        <FinalBracket rounds={finalRound}  />
      </div> */}
    </div>
  );
};

export default DoubleBracket;
