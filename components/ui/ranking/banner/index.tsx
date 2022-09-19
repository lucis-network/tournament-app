import s from "/components/ui/ranking/Ranking.module.sass"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {AcceptedMonths, useRankingSeason, useTopRanking} from "../../../../hooks/ranking/useTopRanking";
import {UserProfile} from "../../../../src/generated/graphql";
import {UserRanking} from "../../../../src/generated/graphql_p2e";
import {useEffect} from "react";

type SwiperSlideContentProps = {
  title: string,
  type: string,
  image: string,
  data?: UserRanking,
  comingSoon?: boolean,
}

const SwiperSlideContent = ({title, type, image, data, comingSoon}: SwiperSlideContentProps) => {
  const userName = data?.profile?.user_name
  const displayName = data?.profile?.display_name
  const avatar = data?.profile?.avatar
  const rank = data?.rank

  return (
    <div className={`${s.rankingFlag} ${type} ${comingSoon ? 'comingSoon' : ''}`}>
      <img src={image} alt="" className={s.flag} />
      <div className={s.rankingAvatar}>
        {(!comingSoon) && (
          <img src={avatar ? avatar : '/assets/MyProfile/default_avatar.png'} alt="" onError={(e) => {
            e.currentTarget.src = '/assets/MyProfile/default_avatar.png'
          }} />
        )}
      </div>
      <div className={s.rankingInfo}>
        <div className={s.rankingTitle}>{title}</div>
        {displayName && (
          <div className={s.rankingUserDisplayName}>{displayName}</div>
        )}
        {userName && (
          <div className={s.rankingUsername}>@{data?.profile?.user_name}</div>
        )}
        {(!comingSoon && (rank && (rank < 3))) && (
          <div className={s.rankingMedal}>
            <img src={`${rank === 1 ? '/assets/Ranking/medalGold.svg' : '/assets/Ranking/medalSilver.svg'}`} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

const now = new Date()
export const currentMonth = now.getMonth() + 1 as AcceptedMonths
export const currentYear = now.getFullYear()

type BannerRankingProps = {
  seasonId: string,
}

const BannerRanking = ({seasonId}: BannerRankingProps) => {
  const {dataTopRanking} = useTopRanking({
    seasonId: seasonId,
  })

  const raffleTopRank = dataTopRanking?.getTopRanking?.raffle
  const playcoreTopRank = dataTopRanking?.getTopRanking?.playcore
  const tournamentTopRank = dataTopRanking?.getTopRanking?.tournament

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
          <SwiperSlide>
            <SwiperSlideContent
              // title="Total nfts"
              title="Coming soon"
              image="/assets/Ranking/flagNFTs.png"
              type="nfts"
              comingSoon
            />
          </SwiperSlide>
          <SwiperSlide>
            <SwiperSlideContent
              title="Total earnings"
              image="/assets/Ranking/flagArena.png"
              type="arena"
              data={tournamentTopRank!}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SwiperSlideContent
              title="Total rewards"
              image="/assets/Ranking/flagPlaycore.png"
              type="playcore"
              data={playcoreTopRank!}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SwiperSlideContent
              title="Total rewards"
              image="/assets/Ranking/flagRaffles.png"
              type="raffles"
              data={raffleTopRank!}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SwiperSlideContent
              // title="Total earnings"
              title="Coming soon"
              image="/assets/Ranking/flagScholarship.png"
              type="scholarship"
              comingSoon
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}

export default BannerRanking