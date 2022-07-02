import s from './Raffles.module.sass'
import {Image, Input} from "antd";
import Link from "next/link";

const Raffles = () => {
  return (
    <div className={s.rafflesWrapper}>
      <section className={s.sectionRecentWinners}>
        <div className="lucis-container-2">
          <h2 className={s.sectionTitle}>Recent Winners</h2>
          <div className={s.recentWinnersList}>
            <div className={s.recentWinnersItem}>
              <div className={s.recentWinnerThumbnail}>
                <Image src="/assets/P2E/raffles/recentWinner1.jpg" preview={false} alt="" />
              </div>
              <div className={s.recentWinnerInfo}>
                <div className={s.winner}>
                  <div className={s.winnerAvatar}>
                    <Image src="/assets/P2E/raffles/winnerAvatar.png" preview={false} alt="" />
                  </div>
                  <div className={s.winnerUsername}>@ThiVan</div>
                </div>
                <div className={s.winnerValued}>Valued at €20</div>
              </div>
            </div>
            <div className={s.recentWinnersItem}>
              <div className={s.recentWinnerThumbnail}>
                <Image src="/assets/P2E/raffles/recentWinner1.jpg" preview={false} alt="" />
              </div>
              <div className={s.recentWinnerInfo}>
                <div className={s.winner}>
                  <div className={s.winnerAvatar}>
                    <Image src="/assets/P2E/raffles/winnerAvatar.png" preview={false} alt="" />
                  </div>
                  <div className={s.winnerUsername}>@ThiVan</div>
                </div>
                <div className={s.winnerValued}>Valued at €20</div>
              </div>
            </div>
            <div className={s.recentWinnersItem}>
              <div className={s.recentWinnerThumbnail}>
                <Image src="/assets/P2E/raffles/recentWinner1.jpg" preview={false} alt="" />
              </div>
              <div className={s.recentWinnerInfo}>
                <div className={s.winner}>
                  <div className={s.winnerAvatar}>
                    <Image src="/assets/P2E/raffles/winnerAvatar.png" preview={false} alt="" />
                  </div>
                  <div className={s.winnerUsername}>@ThiVan</div>
                </div>
                <div className={s.winnerValued}>Valued at €20</div>
              </div>
            </div>
            <div className={s.recentWinnersItem}>
              <div className={s.recentWinnerThumbnail}>
                <Image src="/assets/P2E/raffles/recentWinner1.jpg" preview={false} alt="" />
              </div>
              <div className={s.recentWinnerInfo}>
                <div className={s.winner}>
                  <div className={s.winnerAvatar}>
                    <Image src="/assets/P2E/raffles/winnerAvatar.png" preview={false} alt="" />
                  </div>
                  <div className={s.winnerUsername}>@ThiVan</div>
                </div>
                <div className={s.winnerValued}>Valued at €20</div>
              </div>
            </div>
          </div>
          <button className={s.btnViewAll}>View all</button>
        </div>
      </section>
      <section className={s.sectionFeaturedRaffle}>
        <div className="lucis-container-2">
          <div className={s.titleFlex}>
            <h2 className={s.sectionTitle}>Raffles in July</h2>
            <div className={s.raffleCountdown}>
              <Image src="/assets/P2E/raffles/iconCalendar.svg" preview={false} alt="" />
              <span className={s.raffleCountdownText}>End in 7 days</span>
            </div>
          </div>
          <div className={s.featuredRaffle}>
            <div className={s.featuredRaffleThumbnail}>
              <Image src="/assets/P2E/raffles/featuredRaffle.jpg" preview={false} alt="" />
            </div>
            <div className={s.featuredRaffleInfo}>
              <Link href={"#"} passHref>
                <a className={s.btnViewRaffle}>
                  <span>View Raffle</span>
                </a>
              </Link>
              <div className={s.featuredRaffleTitleWrap}>
                <h3>€40 steam gift card</h3>
                <p>Valued at €40</p>
              </div>
              <div className={s.featuredRafflePriceWrap}>
                <div className={s.rafflePrice}>
                  <div className={s.rafflePriceText}>1000</div>
                  <Image src="/assets/P2E/raffles/iconLucisPoint.svg" preview={false} alt="" />
                </div>
                <div className={s.raffleCountdown}>
                  <Image src="/assets/P2E/raffles/iconCalendar.svg" preview={false} alt="" />
                  <span className={s.raffleCountdownText}>End in 7 days</span>
                </div>
                <div className={s.featuredRaffleTagWrap}>
                  <div className={`${s.raffleTag}`}>NFTs only</div>
                  <div className={`${s.raffleTag} disabled`}>VN only</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={s.sectionRafflesSponsor}>
        <div className="lucis-container-2">
          <h2 className={s.sectionTitle}>Sponsor</h2>
          <div className={s.rafflesSponsorList}>
            <div className={s.raffleSponsorItem}>
              <Image src="/assets/P2E/raffles/logoLOL.png" preview={false} alt="" />
            </div>
            <div className={s.raffleSponsorItem}>
              <Image src="/assets/P2E/raffles/logoLogitech.svg" preview={false} alt="" />
            </div>
            <div className={s.raffleSponsorItem}>
              <Image src="/assets/P2E/raffles/logoRazer.svg" preview={false} alt="" />
            </div>
            <div className={s.raffleSponsorItem}>
              <Image src="/assets/P2E/raffles/logoCSGO.svg" preview={false} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className={s.sectionRaffles}>
        <div className="lucis-container-2">
          <div className={s.raffleTitleWrap}>
            <h2 className={s.sectionTitle}>Raffles</h2>
            <div className={s.raffleSearch}>
              <Input placeholder="Name of raffle" />
              <Image src="/assets/P2E/raffles/iconSearch.svg" preview={false} alt="" />
            </div>
          </div>
          <div className={s.rafflesList}>
            <div className={s.rafflesItem}>
              <div className={s.raffleThumbnail}>
                <Image src="/assets/P2E/raffles/raffle1.jpg" preview={false} alt="" />
              </div>
              <div className={s.raffleInfo}>
                <div className={s.raffleTagWrap}>
                  <div className={s.raffleTag}>NFTs only</div>
                  <div className={`${s.raffleTag} disabled`}>VN only</div>
                </div>
                <h3 className={s.raffleTitle}>€20 steam gift card</h3>
                <div className={s.rafflePriceWrap}>
                  <div className={s.raffleValued}>Valued at €20</div>
                  <div className={s.rafflePrice}>
                    <div className={s.rafflePriceText}>1000</div>
                    <Image src="/assets/P2E/raffles/iconLucisPoint.svg" preview={false} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={s.rafflesItem}>
              <div className={s.raffleThumbnail}>
                <Image src="/assets/P2E/raffles/raffle1.jpg" preview={false} alt="" />
              </div>
              <div className={s.raffleInfo}>
                <div className={s.raffleTagWrap}>
                  <div className={s.raffleTag}>NFTs only</div>
                  <div className={`${s.raffleTag} disabled`}>VN only</div>
                </div>
                <h3 className={s.raffleTitle}>€20 steam gift card</h3>
                <div className={s.rafflePriceWrap}>
                  <div className={s.raffleValued}>Valued at €20</div>
                  <div className={s.rafflePrice}>
                    <div className={s.rafflePriceText}>1000</div>
                    <Image src="/assets/P2E/raffles/iconLucisPoint.svg" preview={false} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={s.rafflesItem}>
              <div className={s.raffleThumbnail}>
                <Image src="/assets/P2E/raffles/raffle1.jpg" preview={false} alt="" />
              </div>
              <div className={s.raffleInfo}>
                <div className={s.raffleTagWrap}>
                  <div className={s.raffleTag}>NFTs only</div>
                  <div className={`${s.raffleTag} disabled`}>VN only</div>
                </div>
                <h3 className={s.raffleTitle}>€20 steam gift card</h3>
                <div className={s.rafflePriceWrap}>
                  <div className={s.raffleValued}>Valued at €20</div>
                  <div className={s.rafflePrice}>
                    <div className={s.rafflePriceText}>1000</div>
                    <Image src="/assets/P2E/raffles/iconLucisPoint.svg" preview={false} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={s.rafflesItem}>
              <div className={s.raffleThumbnail}>
                <Image src="/assets/P2E/raffles/raffle1.jpg" preview={false} alt="" />
              </div>
              <div className={s.raffleInfo}>
                <div className={s.raffleTagWrap}>
                  <div className={s.raffleTag}>NFTs only</div>
                  <div className={`${s.raffleTag} disabled`}>VN only</div>
                </div>
                <h3 className={s.raffleTitle}>€20 steam gift card</h3>
                <div className={s.rafflePriceWrap}>
                  <div className={s.raffleValued}>Valued at €20</div>
                  <div className={s.rafflePrice}>
                    <div className={s.rafflePriceText}>1000</div>
                    <Image src="/assets/P2E/raffles/iconLucisPoint.svg" preview={false} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={s.rafflesItem}>
              <div className={s.raffleThumbnail}>
                <Image src="/assets/P2E/raffles/raffle1.jpg" preview={false} alt="" />
              </div>
              <div className={s.raffleInfo}>
                <div className={s.raffleTagWrap}>
                  <div className={s.raffleTag}>NFTs only</div>
                  <div className={`${s.raffleTag} disabled`}>VN only</div>
                </div>
                <h3 className={s.raffleTitle}>€20 steam gift card</h3>
                <div className={s.rafflePriceWrap}>
                  <div className={s.raffleValued}>Valued at €20</div>
                  <div className={s.rafflePrice}>
                    <div className={s.rafflePriceText}>1000</div>
                    <Image src="/assets/P2E/raffles/iconLucisPoint.svg" preview={false} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${s.rafflesItem} comingSoon`}>
              NEW RAFFLES<br />COMING SOON
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Raffles