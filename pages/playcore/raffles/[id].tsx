import P2EWrapper from "components/ui/p2e/p2eWrapper";
import React from "react"
import s from "../../../components/ui/p2e/raffles/Raffles.module.sass"
import RafflesDetail from "../../../components/ui/p2e/raffles/detail";
import DocHeadPlaycore from "../../../components/DocHeadPlaycore";
import {useGetRaffleDetail} from "../../../hooks/p2e/raffles/useRaffleDetail";
import apoloClient from "../../../utils/apollo_client";
import {gql} from "@apollo/client";


const RafflesDetailPage = () => {
  return (
    <P2EWrapper mainClassname={s.rafflesBg}>
      <DocHeadPlaycore
        title="RAFFLES - PlayCore | Play your Game | Earn your Fame | Win Crypto"
        description={"Join Lucis Raffle to turn your achievements and earnings into valuable rewards."}
        thumb={"/assets/P2E/seo/raffles-detail.png"}
      />
      <RafflesDetail/>
    </P2EWrapper>
  );
}

export default RafflesDetailPage;