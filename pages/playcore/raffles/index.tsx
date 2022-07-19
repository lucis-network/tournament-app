import P2EWrapper from "components/ui/p2e/p2eWrapper";
import React from "react"
import Raffles from "../../../components/ui/p2e/raffles";
import s from "../../../components/ui/p2e/raffles/Raffles.module.sass"

const RafflesPage = () => {
  return (
    <P2EWrapper mainClassname={s.rafflesBg}>
      <Raffles/>
    </P2EWrapper>
  );
}

export default RafflesPage;