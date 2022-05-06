import FinalBracket from "components/ui/common/bracket/double-bracket/FinalBracket";
import LosingBracket from "components/ui/common/bracket/double-bracket/LosingBracket";
import WiningBracket from "components/ui/common/bracket/double-bracket/WiningBracket";

type Props = {
  upper: any;
  lower: any;
  openModal: any;
};

const DoubleBracket = ({ upper, lower, openModal }: Props) => {
  const upperRounds = [...upper].splice(0, upper.length - 1);
  const finalRound = [...upper].splice(upper.length - 1, 1);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: "20px",
        overflow: "scroll",
      }}
    >
      <div>
        <WiningBracket rounds={upperRounds} openModal={openModal} />
        <div style={{ height: "50px" }}></div>
        <LosingBracket rounds={lower} openModal={openModal} />
      </div>

      <div>
        <FinalBracket rounds={finalRound} openModal={openModal} />
      </div>
    </div>
  );
};

export default DoubleBracket;
