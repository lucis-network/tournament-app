import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import BannerPage from 'components/ui/tournament/home/banner'
import TabHome from 'components/ui/tournament/home/tabs'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <DocHead />

      <main style={{minHeight: "100vh"}}>
        <BannerPage />
        <TabHome />
      </main>
      
      <Footer />
    </div>
  )
}

export default Home
