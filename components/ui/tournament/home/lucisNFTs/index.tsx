import {useRef} from "react"
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import homepage from '../Homepage.module.sass'
import lucisNFTs from './LucisNFTs.module.sass'
import 'swiper/css'

const LucisNFTs = () => {
  const navPrevRef = useRef(null)
  const navNextRef = useRef(null)

  return (
    <section className={`${homepage.section} ${lucisNFTs.sectionFavoriteGames}`}>
      <div className={`lucis-container-2 ${homepage.sectionTitleWrap}`}>
        <div>
          <h2 className={homepage.sectionTitle}>LUCIS NFTS</h2>
          <p className={homepage.sectionDesc}>Want to earn real money from playing your games?</p>
        </div>
      </div>
      <div className={lucisNFTs.sliderWrap}>
        <div className="lucis-container-2">
          <Swiper
            centeredSlides
            slidesPerView="auto"
            initialSlide={1}
            className={lucisNFTs.nftSwiper}
            loop
            modules={[Navigation]}
            navigation={{
              prevEl: navPrevRef.current,
              nextEl: navNextRef.current,
            }}
            breakpoints={{
              320: {
                spaceBetween: 8
              },
              1600: {
                spaceBetween: 24
              },
            }}
          >
            <SwiperSlide>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftBuffallo.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Tarusboss NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftSnake.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Pythonite NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftCat.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Meowy NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftChicken.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Roosteron NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftDog.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Inuka NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftDragon.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Dragod NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftGoat.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Megacapra NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftHorse.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Equusbot NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftMonkey.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Kongzilla NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftMouse.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Robomice NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftPig.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Scrofasus NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
              <div className={lucisNFTs.nftItem}>
                <img src="/assets/homepage/lucisNFTs/nftTiger.jpg" alt=""/>
                <div className={lucisNFTs.nftInfo}>
                  <h3 className={lucisNFTs.nftName}>Tigerion NFT</h3>
                  <p className={lucisNFTs.nftValue}>7,800 USD</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className={`${lucisNFTs.swiperNavWrap}`}>
            <button className={`${lucisNFTs.sliderNav} prev`} ref={navPrevRef}>
              <img src="/assets/homepage/lucisNFTs/sliderNavLeft.svg" alt="" />
            </button>
            <button className={`${lucisNFTs.sliderNav} next`} ref={navNextRef}>
              <img src="/assets/homepage/lucisNFTs/sliderNavRight.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <button className={`${homepage.btnCommon} ${lucisNFTs.btnCommon}`} onClick={() => window.open("https://launchpad.lucis.network/")}>OWN LUCIS NFTS</button>
    </section>
  )
}

export default LucisNFTs