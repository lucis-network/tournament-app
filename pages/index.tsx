import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import BannerPage from 'components/ui/tournament/home/banner'
import TabHome from 'components/ui/tournament/home/tabs'
import PlayerHome from 'components/ui/tournament/home/player/Index'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <DocHead />

      <main style={{minHeight: "100vh"}}>
        <BannerPage />
        <TabHome />
        <PlayerHome />
      </main>
      
      <Footer />
    </div>
  )
}

export default Home
