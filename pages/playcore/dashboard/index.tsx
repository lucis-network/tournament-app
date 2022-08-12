import Dashboard from "components/ui/p2e/dashboard";
import P2EWrapper from "components/ui/p2e/p2eWrapper";
import React from "react"
import DocHeadPlaycore from "../../../components/DocHeadPlaycore";


const DashboardPage = () => {
  return (
    <>
      <P2EWrapper>
        <DocHeadPlaycore
          title="[LUCIS PLAYCORE] - Play your Game | Earn your Fame | Win Crypto"
          description={"Join Lucis PlayCore Now!! Get reward from playing your favourite traditional games. SIGN IN - PLAY - ENJOY - EARN - REPEAT. "}
          thumb={"/assets/P2E/seo/dashboard.png"}
        />
        <Dashboard />
      </P2EWrapper>
    </>
  );
}

export default DashboardPage;