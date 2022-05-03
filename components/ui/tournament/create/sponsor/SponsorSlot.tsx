import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "antd";
import s from "./index.module.sass";
import CircleImage from "components/ui/common/images/CircleImage";
import SponsorDetail from "./SponsorDetail";
import { SponsorSlot, SponsorTierStore } from "./SponsorStore";

type SponsorSlotProps = {
  slot: SponsorSlot;
  show_name?: boolean;
  tier: SponsorTierStore;
  min_deposit?: number;
  show_ads?: boolean;
  tier_ids: string[];
  minAmountInit: number;
}

export default observer(
  function SponsorSlot(props: SponsorSlotProps) {
    const {
      slot,
      show_name,
      tier,
      min_deposit,
      show_ads,
      tier_ids,
      minAmountInit,
    } = props
    const [isEdit, setIsEdit] = useState(false)

    return (
      <>
        <div className={s.sponsorSlot}>
          <div className={s.sponsorLogoWrap}>
            <CircleImage
              src={slot.logo ?? "/assets/avatar.jpg"}
              className={s.sponsorLogo}
            />
            <Button
              className={s.sponsorEdit}
              onClick={() => setIsEdit(true)}
            >
              Edit
            </Button>
          </div>
          {show_name && <div className={s.sponsorName}>{(slot.name && (slot.name.length > 0)) ? slot.name : 'Sponsor name'}</div>}
        </div>

        {isEdit && (
          <SponsorDetail
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            show_ads={show_ads}
            tier={tier}
            min_deposit={min_deposit}
            slot={slot}
            tier_ids={tier_ids}
            minAmountInit={minAmountInit}
          />
        )}
      </>
    )
  }
)
