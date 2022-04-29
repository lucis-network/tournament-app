import { useState } from "react";
import { observer } from "mobx-react-lite";
import { SponsorSlotType } from 'src/store/TournamentStore';
import { Button } from "antd";
import s from "./index.module.sass";
import CircleImage from "components/ui/common/images/CircleImage";
import SponsorDetail from "./SponsorDetail";

type SponsorSlotProps = {
  slot?: SponsorSlotType;
  showName?: boolean;
  tier?: string;
  onUpdate: (slotData: SponsorSlotType, index: number) => void;
  index: number;
  minAmount?: number;
}

export default observer(
  function SponsorSlot(props: SponsorSlotProps) {
    const { slot, showName, tier, onUpdate, index, minAmount } = props
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
            >
              Edit
            </Button>
          </div>
          {showName && <div className={s.sponsorName}>{slot?.name || 'Sponsor name'}</div>}
        </div>
        {isEdit && (
          <SponsorDetail
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            tier={tier}
            slot={slot}
            onUpdate={onUpdate}
            index={index}
            minAmount={minAmount}
          />
        )}
      </>
    )
  }
)
