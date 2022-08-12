import { RecentMatchDetail } from "components/ui/p2e/dashboard/RecentMatchDetail";
import P2EWrapper from "components/ui/p2e/p2eWrapper";
import React from "react"
import DocHeadPlaycore from "../../../../components/DocHeadPlaycore";


const RecentMatchDetailPage = () => {
  return (
    <>
      <P2EWrapper>
        <DocHeadPlaycore
          title={"[MATCH DETAILS] - More skills | More rewards"}
          description={"Join Lucis PlayCore Now!! Every matches will be recorded and you will be rewarded from it."}
          thumb={"/assets/P2E/seo/match-detail-csgo.png"}
        />
        <RecentMatchDetail />
      </P2EWrapper>
    </>
  );
}

export default RecentMatchDetailPage;