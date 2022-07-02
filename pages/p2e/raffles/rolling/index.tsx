import P2EWrapper from "components/ui/p2e/p2eWrapper";
import React from "react";
// @ts-ignore
import s from "../../../../components/ui/p2e/raffles/Raffles.module.sass"
import RollingRaffles from "../../../../components/ui/p2e/raffles/rolling";

const RollingRafflesPage = () => {
  return (
    <P2EWrapper mainClassname={s.rafflesBg}>
      <RollingRaffles />
    </P2EWrapper>
  );
}

export default RollingRafflesPage;