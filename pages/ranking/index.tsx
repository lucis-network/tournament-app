import React, {useEffect, useState} from "react"
import s from "/components/ui/ranking/Ranking.module.sass"
import {NextPage} from "next";
import DocHead from "../../components/DocHead";
import Footer from "../../components/ui/footer/Footer";
import BannerRanking from "../../components/ui/ranking/banner";
import RankingTabs from "../../components/ui/ranking/rankingTabs";
import {useRankingSeason} from "../../hooks/ranking/useTopRanking";
import {StatusSeason} from "../../src/generated/graphql_p2e";
import {SelectSeason} from "../../components/ui/ranking/SelectSeason";

const RankingPage: NextPage = () => {
  const {dataRankingSeason} = useRankingSeason()
  const [seasonId, setSeasonId] = useState("");
  const [endIn, setEndIn] = useState(0);
  const activeSeason = dataRankingSeason?.getRankingSeasons?.find(season => season.status === StatusSeason.Active)
  const activeSeasonId = activeSeason?.uid
  // const endDate = activeSeason?.toDate;

  useEffect(() => {
    setSeasonId(activeSeasonId!);
    // setEndIn(new Date(endDate).getTime());
  }, [activeSeason])

  useEffect(() => {
    const endDate = dataRankingSeason?.getRankingSeasons?.find(season => season.uid === seasonId)?.toDate;
    setEndIn(new Date(endDate).getTime());
  }, [seasonId])
  return (
    <div>
      <DocHead
        title="LUCIS RANKING - More skills, more rewards for playing your games with Lucis"
        description={"A very competitive environment for Lucis users, gamers, game clubs, and guild games that lets them actively enjoy the game and platform with very big prizes."}
        thumb={"/assets/P2E/seo/ranking.png"}
      />
      <main style={{minHeight: "100vh"}} className={s.rankingWrapper}>
        <BannerRanking seasonId={seasonId}/>
        <RankingTabs
          endIn={endIn}
          seasonId={seasonId}
          seasonList={dataRankingSeason?.getRankingSeasons}
          activeSeasonId={activeSeasonId!}
          setSeasonId={setSeasonId}/>
      </main>
      <Footer/>
    </div>
  );
}

export default RankingPage;