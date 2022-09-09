import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import BannerPage from 'components/ui/tournament/home/banner'
import TabHome from 'components/ui/tournament/home/tabs'
import PlayerHome from "components/ui/tournament/home/player"
import type { NextPage } from 'next'
import s from "./ArenaHome.module.sass"
import CreateTournament from 'components/ui/tournament/home/createYourTournament'
import { useRankingSeason } from "../../hooks/ranking/useTopRanking";
import { StatusSeason } from "../../src/generated/graphql_p2e";
import TopSponsors from "../../components/ui/tournament/home/topSponsors";

const TournamentHome: NextPage = () => {
  const {dataRankingSeason} = useRankingSeason();
  const seasonId = dataRankingSeason?.getRankingSeasons?.filter(season => season.status === StatusSeason.Active)[0]?.uid
  return (
    <div>
      <DocHead />
      <main className={s.arenaHomeWrapper}>
        <BannerPage />
        <TabHome />
        <CreateTournament />
        <PlayerHome seasonId={seasonId} />
        <TopSponsors />
      </main>
      <Footer />
    </div>
  )
}

export default TournamentHome
