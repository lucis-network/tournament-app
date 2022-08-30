import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import BannerPage from 'components/ui/tournament/home/banner'
import TabHome from 'components/ui/tournament/home/tabs'
import PlayerHome from "components/ui/tournament/home/player"
import type { NextPage } from 'next'
import s from "./ArenaHome.module.sass"
import CreateTournament from 'components/ui/tournament/home/createYourTournament'

const TournamentHome: NextPage = () => {
  return (
    <div>
      <DocHead />
      <main style={{minHeight: "100vh"}} className={s.arenaHomeWrapper}>
        <BannerPage />
        <TabHome />
        <CreateTournament />
        <PlayerHome />
      </main>
      <Footer />
    </div>
  )
}

export default TournamentHome
