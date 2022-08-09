import LuckyChest from "components/ui/p2e/lucky";
import P2eWrapper from "components/ui/p2e/p2eWrapper";
import React from "react"
import s from "../../../components/ui/p2e/lucky/LuckyChest.module.sass"
import DocHeadPlaycore from "../../../components/DocHeadPlaycore";

const LuckyChestPage = () => {
  return (
    <>
      <P2eWrapper mainClassname={s.luckyChestBg} wrapperChildrenClassname={s.luckyChestContentWrapper}>
        <DocHeadPlaycore
          title="LUCKY CHEST - PlayCore | Play your Game | Earn your Fame | Win Crypto"
          description={"Join Lucky Chest to win NFTs, Steam Cards, Crypto, and other valuable prizes."}
          thumb={"/assets/P2E/ceo/lucky-chest.png"}
        />
        <LuckyChest />
      </P2eWrapper>
    </>
  );
}

export default LuckyChestPage;