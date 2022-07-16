import {SponsorSlot, SponsorTransaction} from "src/generated/graphql";
import s from "../../../../../styles/tournament/sponsor/index.module.sass";

type TournamentDetailSponsorSlotProps = {
  tier: SponsorSlot;
  slot: SponsorTransaction;
  index?: number;
  checkBanner?: boolean;
  checkBlankLogo?: boolean;
};

export default function TournamentDetailSponsorSlot(
  props: TournamentDetailSponsorSlotProps
) {
  const {tier, slot, index, checkBanner, checkBlankLogo} = props;
  const {show_name} = tier;
  const {name: sponsorName, logo: sponsorLogo, home_page} = slot;

  if (!checkBlankLogo && index === 0 && !checkBanner) {
    return (
      <>
        <div>
          <img
            src={"/assets/home/logo.png"}
            className={s.sponsorLogo}
          ></img>
        </div>
      </>
    )
  }

  return (
    <>
      <div
        className={`${s.sponsorSlot} ${
          !sponsorLogo ? `${s.sponsorSlotHidden}` : ""
        }`}
      >
        <div className={s.sponsorLogoWrap}>
          <a
            href={home_page ? home_page : "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={sponsorLogo || "/assets/home/logo.png"}
              className={s.sponsorLogo}
            ></img>
          </a>
        </div>
        {/* {(show_name && (sponsorName && (sponsorName.length > 0))) && <div className={s.sponsorName}>{sponsorName}</div>} */}
      </div>
    </>
  );
}
