import CircleImage from "components/ui/common/images/CircleImage";
import { SponsorSlot, SponsorTransaction } from "src/generated/graphql";
import s from "../../../../../styles/tournament/sponsor/index.module.sass";

type TournamentDetailSponsorSlotProps = {
  tier: SponsorSlot,
  slot: SponsorTransaction,
}

export default function TournamentDetailSponsorSlot(props: TournamentDetailSponsorSlotProps) {
  const { tier, slot } = props;
  const { show_name } = tier;
  const { name: sponsorName, logo: sponsorLogo } = slot;

  return (
    <div className={s.sponsorSlot}>
      <div className={s.sponsorLogoWrap}>
        <CircleImage
          src={sponsorLogo || '/assets/avatar.jpg'}
          className={s.sponsorLogo}
        />
      </div>
      {show_name && <div className={s.sponsorName}>{(sponsorName && (sponsorName.length > 0)) ? sponsorName : 'Sponsor name'}</div>}
    </div>
  )
}