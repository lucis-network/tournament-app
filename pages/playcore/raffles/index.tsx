import P2EWrapper from "components/ui/p2e/p2eWrapper";
import React from "react"
import Raffles from "../../../components/ui/p2e/raffles";
import s from "../../../components/ui/p2e/raffles/Raffles.module.sass"
import DocHeadPlaycore from "../../../components/DocHeadPlaycore";

const RafflesPage = () => {
  return (
    <P2EWrapper mainClassname={s.rafflesBg}>
      <DocHeadPlaycore
        title="RAFFLES - PlayCore | Play your Game | Earn your Fame | Win Crypto"
        description={"Join Lucis Raffle to turn your achievements and earnings into valuable rewards."}
        thumb={"/assets/P2E/seo/raffles.png"}
      />
      <Raffles/>
    </P2EWrapper>
  );
}

export default RafflesPage;