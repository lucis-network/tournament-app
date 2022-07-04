import RecentMatchHistory from "components/ui/p2e/dashboard/RecentMatchHistory";
import P2EWrapper from "components/ui/p2e/p2eWrapper";
import React from "react"


const DashboardPage = () => {
  return (
    <>
      <P2EWrapper>
        <RecentMatchHistory />
      </P2EWrapper>
    </>
  );
}

export default DashboardPage;