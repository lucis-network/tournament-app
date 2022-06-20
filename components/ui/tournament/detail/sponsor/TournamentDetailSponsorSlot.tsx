import CircleImage from "components/ui/common/images/CircleImage";
import { SponsorSlot, SponsorTransaction } from "src/generated/graphql";
import s from "../../../../../styles/tournament/sponsor/index.module.sass";

type TournamentDetailSponsorSlotProps = {
  tier: SponsorSlot;
  slot: SponsorTransaction;
  index?: number;
  checkBanner?: boolean;
};

export default function TournamentDetailSponsorSlot(
  props: TournamentDetailSponsorSlotProps
) {
  const { tier, slot, index, checkBanner } = props;
  const { show_name } = tier;
  const { name: sponsorName, logo: sponsorLogo, home_page } = slot;

  return (
    <>
      {checkBanner === false ? (
        <>
          {index === 0 ? (
            <div>
              <img
                src={"/assets/home/logo.png"}
                className={s.sponsorLogo}
              ></img>
            </div>
          ) : (
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
                      src={sponsorLogo || "/assets/avatar.jpg"}
                      className={s.sponsorLogo}
                    ></img>
                  </a>
                </div>
                {/* {(show_name && (sponsorName && (sponsorName.length > 0))) && <div className={s.sponsorName}>{sponsorName}</div>} */}
              </div>
            </>
          )}
        </>
      ) : (
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
                  src={sponsorLogo || "/assets/avatar.jpg"}
                  className={s.sponsorLogo}
                ></img>
              </a>
            </div>
            {/* {(show_name && (sponsorName && (sponsorName.length > 0))) && <div className={s.sponsorName}>{sponsorName}</div>} */}
          </div>
        </>
      )}
    </>
  );
}
