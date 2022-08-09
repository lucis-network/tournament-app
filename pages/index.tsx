import Overview from "components/ui/p2e/overview";
import P2EWrapper from "components/ui/p2e/p2eWrapper";
import React, { useEffect } from "react"
import {useRouter} from "next/router";
import DocHeadPlaycore from "../components/DocHeadPlaycore";


const P2eOverviewPage = () => {
  return (
    <>
      <P2EWrapper>
        <DocHeadPlaycore
          title="[LUCIS PLAYCORE] - Play your Game | Earn your Fame | Win Crypto"
          description={"Join Lucis PlayCore Now!! Get reward from playing your favourite traditional games. SIGN IN - PLAY - ENJOY - EARN - REPEAT. "}
          thumb={"/assets/P2E/ceo/home-Playcore.png"}
        />
        <Overview />
      </P2EWrapper>
    </>
  );
}

export default P2eOverviewPage;