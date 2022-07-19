import P2EWrapper from "components/ui/p2e/p2eWrapper";
import React from "react"
import s from "../../../components/ui/p2e/raffles/Raffles.module.sass"
import RafflesDetail from "../../../components/ui/p2e/raffles/detail";

const RafflesDetailPage = () => {
  return (
    <P2EWrapper mainClassname={s.rafflesBg}>
      <RafflesDetail/>
    </P2EWrapper>
  );
}

export default RafflesDetailPage;