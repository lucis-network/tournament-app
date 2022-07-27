import React from "react"
import s from "/components/ui/ranking/Ranking.module.sass"
import {NextPage} from "next";
import DocHead from "../../components/DocHead";
import Footer from "../../components/ui/footer/Footer";
import BannerRanking from "../../components/ui/ranking/banner";
import RankingTabs from "../../components/ui/ranking/rankingTabs";

const RankingPage: NextPage = () => {
  return (
    <div>
      <DocHead title="Lucis Ranking" />
      <main style={{minHeight: "100vh"}} className={s.rankingWrapper}>
        <BannerRanking />
        <RankingTabs />
      </main>
      <Footer />
    </div>
  );
}

export default RankingPage;