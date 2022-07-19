import LuckyChest from "components/ui/p2e/lucky";
import P2eWrapper from "components/ui/p2e/p2eWrapper";
import React from "react"
import s from "../../../components/ui/p2e/lucky/LuckyChest.module.sass"

const LuckyChestPage = () => {
  return (
    <>
      <P2eWrapper mainClassname={s.luckyChestBg} wrapperChildrenClassname={s.luckyChestContentWrapper}>
        <LuckyChest />
      </P2eWrapper>
    </>
  );
}

export default LuckyChestPage;