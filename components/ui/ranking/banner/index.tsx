import s from "/components/ui/ranking/Ranking.module.sass"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {useTopRanking} from "../../../../hooks/ranking/useTopRanking";
import {UserProfile} from "../../../../src/generated/graphql";
import {UserRanking} from "../../../../src/generated/graphql_p2e";

type StatelessSwiperSlideProps = {
  title: string,
  type: string,
  image: string,
  data?: UserRanking,
}

const StatelessSwiperSlide = ({title, type, image, data}: StatelessSwiperSlideProps) => {
  return (
    <SwiperSlide>
      <div className={`${s.rankingFlag} ${type}`}>
        <img src={image} alt="" className={s.flag} />
        <div className={s.rankingAvatar}>
          <img src="/assets/Ranking/tempAvatar.jpg" alt=""/>
        </div>
        <div className={s.rankingInfo}>
          <div className={s.rankingTitle}>{title}</div>
          <div className={s.rankingUserDisplayName}>{data?.profile?.display_name}</div>
          <div className={s.rankingUsername}>{data?.profile?.user_name}</div>
          <div className={s.rankingMedal}>
            <img src="/assets/Ranking/medalGold.svg" alt=""/>
          </div>
        </div>
      </div>
    </SwiperSlide>
  )
}

const BannerRanking = () => {
  const {getTopRankingError, getTopRankingLoading, dataTopRanking} = useTopRanking({
    month: 7,
    year: 2022,
  })

  const {raffle, playcore, tournament} = dataTopRanking?.getTopRanking

  console.log('[BannerRanking] dataTopRanking.getTopRanking: ', dataTopRanking?.getTopRanking);
  
  return (
    <section className={s.sectionBanner}>
      <div className="lucis-container-2">
        <Swiper
          centeredSlides
          initialSlide={2}
          breakpoints={{
            320: {
              slidesPerView: 'auto',
              spaceBetween: 5
            },
            992: {
              slidesPerView: 5,
              allowTouchMove: false,
              spaceBetween: 0
            }
          }}
        >
          <StatelessSwiperSlide
            title="Total nfts"
            image="/assets/Ranking/flagNFTs.png"
            type="nfts"
          />
          <SwiperSlide>
            <div className={`${s.rankingFlag} nfts`}>
              <img src="/assets/Ranking/flagNFTs.png" alt="" className={s.flag} />
              <div className={s.rankingAvatar}>
                <img src="/assets/Ranking/tempAvatar.jpg" alt=""/>
              </div>
              <div className={s.rankingInfo}>
                <div className={s.rankingTitle}>Total nfts</div>
                <div className={s.rankingUserDisplayName}>Mèo đi here</div>
                <div className={s.rankingUsername}>chaupa</div>
                <div className={s.rankingMedal}>
                  <img src="/assets/Ranking/medalSilver.svg" alt=""/>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${s.rankingFlag} arena`}>
              <img src="/assets/Ranking/flagArena.png" alt="" className={s.flag} />
              <div className={s.rankingAvatar}>
                <img src="/assets/Ranking/tempAvatar.jpg" alt=""/>
              </div>
              <div className={s.rankingInfo}>
                <div className={s.rankingTitle}>Total earnings</div>
                <div className={s.rankingUserDisplayName}>Mèo đi here</div>
                <div className={s.rankingUsername}>chaupa</div>
                <div className={s.rankingMedal}>
                  <img src="/assets/Ranking/medalSilver.svg" alt=""/>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${s.rankingFlag} playcore`}>
              <img src="/assets/Ranking/flagPlaycore.png" alt="" className={s.flag} />
              <div className={s.rankingAvatar}>
                <img src="/assets/Ranking/tempAvatar.jpg" alt=""/>
              </div>
              <div className={s.rankingInfo}>
                <div className={s.rankingTitle}>Missions</div>
                <div className={s.rankingUserDisplayName}>Mèo đi here</div>
                <div className={s.rankingUsername}>chaupa</div>
                <div className={s.rankingMedal}>
                  <img src="/assets/Ranking/medalSilver.svg" alt=""/>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${s.rankingFlag} raffles`}>
              <img src="/assets/Ranking/flagRaffles.png" alt="" className={s.flag} />
              <div className={s.rankingAvatar}>
                <img src="/assets/Ranking/tempAvatar.jpg" alt=""/>
              </div>
              <div className={s.rankingInfo}>
                <div className={s.rankingTitle}>Total rewards</div>
                <div className={s.rankingUserDisplayName}>Mèo đi here</div>
                <div className={s.rankingUsername}>chaupa</div>
                <div className={s.rankingMedal}>
                  <img src="/assets/Ranking/medalSilver.svg" alt=""/>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${s.rankingFlag} scholarship`}>
              <img src="/assets/Ranking/flagScholarship.png" alt="" className={s.flag} />
              <div className={s.rankingAvatar}>
                <img src="/assets/Ranking/tempAvatar.jpg" alt=""/>
              </div>
              <div className={s.rankingInfo}>
                <div className={s.rankingTitle}>Total earnings</div>
                <div className={s.rankingUserDisplayName}>Mèo đi here</div>
                <div className={s.rankingUsername}>chaupa</div>
                <div className={s.rankingMedal}>
                  <img src="/assets/Ranking/medalSilver.svg" alt=""/>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}

export default BannerRanking