import { useState } from "react";
import { observer } from "mobx-react-lite";
import { SponsorSlotType } from 'src/store/TournamentStore';
import { Button } from "antd";
import s from "./index.module.sass";
import CircleImage from "components/ui/common/images/CircleImage";
import SponsorDetail from "./SponsorDetail";

type SponsorItemProps = {
  slot?: SponsorSlotType;
  showName?: boolean;
  tier?: string;
}

export default observer(
  function SponsorSlot(props: SponsorItemProps) {
    const { slot, showName, tier } = props
    const [isEdit, setIsEdit] = useState(false)

    return (
      <>
        <div className={s.sponsorSlot}>
          <div className={s.sponsorLogoWrap}>
            <CircleImage
              src={"/assets/avatar.jpg"}
              className={s.sponsorLogo}
            />
            <Button
              className={s.sponsorEdit}
              onClick={() => setIsEdit(true)}
            >Edit</Button>
          </div>
          {showName && <div className={s.sponsorName}>Sponsor name</div>}
        </div>
        <SponsorDetail
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          tier={tier}
        />
      </>
    )
  }
)
