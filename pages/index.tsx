import Overview from "components/ui/p2e/overview";
import P2EWrapper from "components/ui/p2e/p2eWrapper";
import React, { useEffect } from "react"
import {useRouter} from "next/router";


const P2eOverviewPage = () => {
  return (
    <>
      <P2EWrapper>
        <Overview />
      </P2EWrapper>
    </>
  );
}

export default P2eOverviewPage;