import React from "react"
import s from "/components/ui/ranking/Ranking.module.sass"
import {NextPage} from "next";
import DocHead from "../../components/DocHead";
import Footer from "../../components/ui/footer/Footer";
import BannerRanking from "../../components/ui/ranking/banner";
import RankingTabs from "../../components/ui/ranking/rankingTabs";
import {useRankingSeason} from "../../hooks/ranking/useTopRanking";
import {StatusSeason} from "../../src/generated/graphql_p2e";

const RankingPage: NextPage = () => {
  const {dataRankingSeason} = useRankingSeason()
  const seasonId = dataRankingSeason?.getRankingSeasons?.filter(season => season.status === StatusSeason.Active)[0]?.uid

  return (
    <div>
      <DocHead
        title="LUCIS RANKING - More skills, more rewards for playing your games with Lucis"
        description={"A very competitive environment for Lucis users, gamers, game clubs, and guild games that lets them actively enjoy the game and platform with very big prizes."}
        thumb={"/assets/P2E/seo/ranking.png"}
      />
      <main style={{minHeight: "100vh"}} className={s.rankingWrapper}>
        <BannerRanking seasonId={seasonId} />
        <RankingTabs seasonId={seasonId} />
      </main>
      <Footer />
    </div>
  );
}

export default RankingPage;