import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import BannerPage from 'components/ui/tournament/pages/banner'
import CardTournament from 'components/ui/tournament/pages/blockCard'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <DocHead />

      <main style={{minHeight: "100vh"}}>
        <BannerPage />
        <CardTournament />
      </main>
      
      <Footer />
    </div>
  )
}

export default Home
