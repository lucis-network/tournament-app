import React from "react"
import s from "/components/ui/ranking/Ranking.module.sass"
import {NextPage} from "next";
import DocHead from "../../components/DocHead";
import Footer from "../../components/ui/footer/Footer";
import BannerRanking from "../../components/ui/ranking/banner";

const RankingPage: NextPage = () => {
  return (
    <div>
      <DocHead />
      <main style={{minHeight: "100vh"}} className={s.rankingWrapper}>
        <BannerRanking />
      </main>
      <Footer />
    </div>
  );
}

export default RankingPage;