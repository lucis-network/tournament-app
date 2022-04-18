import DocHead from 'components/DocHead'
import Footer from 'components/Footer/Footer'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <DocHead />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Lucis Social Flatform</a>
        </h1>
      </main>
      
      <Footer />
    </div>
  )
}

export default Home
