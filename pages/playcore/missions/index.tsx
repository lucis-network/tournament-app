import Mission from "components/ui/p2e/missions";
import P2EWrapper from "components/ui/p2e/p2eWrapper";
import React from "react"
import DocHeadPlaycore from "../../../components/DocHeadPlaycore";


const MissionPage = () => {
  return (
    <>
      <P2EWrapper>
        <DocHeadPlaycore
          title="MISSIONS - PlayCore | Play your Game | Earn your Fame | Win Crypto"
          description={"Join Lucis PlayCore; Complete Lucis missions to increase your achievements and earnings!"}
          thumb={"/assets/P2E/seo/lucis-mission.png"}
        />
        <Mission />
      </P2EWrapper>
    </>
  );
}

export default MissionPage;