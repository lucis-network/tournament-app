import CircleImage from "components/ui/common/images/CircleImage";
import { SponsorSlot, SponsorTransaction } from "src/generated/graphql";
import s from "../../../../../styles/tournament/sponsor/index.module.sass";

type TournamentDetailSponsorSlotProps = {
  tier: SponsorSlot;
  slot: SponsorTransaction;
  index?: number;
};

export default function TournamentDetailSponsorSlot(
  props: TournamentDetailSponsorSlotProps
) {
  const { tier, slot, index } = props;
  const { show_name } = tier;
  const { name: sponsorName, logo: sponsorLogo, home_page } = slot;

  return (
    <div className={s.sponsorSlot}>
      <div className={s.sponsorLogoWrap}>
        {/* <CircleImage
          src={sponsorLogo || '/assets/avatar.jpg'}
          className={s.sponsorLogo}
        /> */}
        <a
          href={home_page ? home_page : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {index !== 0 && (
            <img
              src={sponsorLogo || "/assets/avatar.jpg"}
              className={s.sponsorLogo}
            ></img>
          )}
          {index === 0 && (
            <img
              src={"/assets/home/logo.png"}
              className={s.sponsorLogo}
            ></img>
          )}
        </a>
      </div>
      {/* {(show_name && (sponsorName && (sponsorName.length > 0))) && <div className={s.sponsorName}>{sponsorName}</div>} */}
    </div>
  );
}
