import React from 'react'
import s from "./p2e.module.sass";
import { Button, Col, Row } from "antd";
import NFTCategories from './NFTCategories';
import ButtonWrapper from 'components/common/button/Button';


interface IProps {
}

const NFTList = (props: IProps) => {
  const [openNFTCategories, setOpenNFTCategories] = React.useState<boolean>(false);
  return (
    <>
      {/* {openNFTCategories && <NFTCategories onClose={() => setOpenNFTCategories(false)} />} */}
      <div className={s.nftCategories}>
        {/* <div className={s.subTitle}>Equip your NFTs to earn Lucis token and more prizes for NFTs gamers <br />
          You will receive the corresponding bonus:</div> */}
        <div style={{ marginTop: 12 }} className={s.cardList}>
          <div className={s.cardItem}>
            <div className={s.cardWrap}>
              <div className={s.card}>
                <img className={s.nftImage} src="/assets/P2E/nfts/card1.png" alt="card1" />
                <div className={s.coin}>
                  <div className={s.rewardItem}>
                    <img src="/assets/P2E/lucis-point.svg" alt="" />
                    <span className={s.lucisPoint}>+15%</span>
                  </div>
                  <div className={s.rewardItem}>
                    <img src="/assets/P2E/lucis-token.svg" alt="" />
                    <span>+15%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.buttonWrapper}>
              <ButtonWrapper type="primary" onClick={() => null}>Change</ButtonWrapper>
            </div>
          </div>
          <div className={s.cardItem}>
            <div className={s.cardWrap}>
              <div className={s.card}>
                <img className={s.nftImage} src="/assets/P2E/nfts/card2.png" alt="card2 " />
                <div className={s.coin}>
                  <div className={s.rewardItem}>
                    <img src="/assets/P2E/lucis-point.svg" alt="" />
                    <span className={s.lucisPoint}>+15%</span>
                  </div>
                  <div className={s.rewardItem}>
                    <img src="/assets/P2E/lucis-token.svg" alt="" />
                    <span>+15%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.buttonWrapper}>
              <ButtonWrapper type="primary" onClick={() => null}>Change</ButtonWrapper>
            </div>
          </div>
          <div className={s.cardItem}>
            <div className={s.cardWrap}>
              <div className={s.card}>
                <img className={s.nftImage} src="/assets/P2E/nfts/card3.png" alt="card3" />
                <div className={s.coin}>
                  <div className={s.rewardItem}>
                    <img src="/assets/P2E/lucis-point.svg" alt="" />
                    <span className={s.lucisPoint}>+15%</span>
                  </div>
                  <div className={s.rewardItem}>
                    <img src="/assets/P2E/lucis-token.svg" alt="" />
                    <span>+15%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.buttonWrapper}>
              <ButtonWrapper type="primary" onClick={() => null}>Change</ButtonWrapper>
            </div>
          </div>
          <div className={s.cardItem}>
            <div className={s.cardWrap}>
              <div className={s.card}>
                <img className={s.nftImage} src="/assets/P2E/nfts/face-down.png" alt="face-down.png" />
                <div className={s.coin}>
                  <div className={s.rewardItem}>
                    <img src="/assets/P2E/lucis-point.svg" alt="" />
                    <span className={s.lucisPoint}>+15%</span>
                  </div>
                  <div className={s.rewardItem}>
                    <img src="/assets/P2E/lucis-token.svg" alt="" />
                    <span>+15%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.buttonWrapper}>
              <ButtonWrapper type="primary" onClick={() => null}>Equip</ButtonWrapper>
            </div>
          </div>
        </div>
        <div className={s.comingSoon}>
          <h2>Coming soon</h2>
          <div className={s.comingSoonSubTitle}>your nfts card</div>
          <p>Equip your NFTs to earn Lucis token and more prizes for NFTs gamers <br />
            You will receive the corresponding bonus</p>
        </div>
      </div>
    </>
  )
}

export default NFTList