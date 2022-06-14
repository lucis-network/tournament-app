import React from 'react'
import s from "./p2e.module.sass";
import { Button, Col, Row } from "antd";
import NFTCategories from './NFTCategories';


interface IProps {
}

const OnUsingNFTs = (props: IProps) => {
  const [openNFTCategories, setOpenNFTCategories] = React.useState<boolean>(false);

  const fakeImage = "https://preview.redd.it/kogugm77coc81.png?auto=webp&s=062e8eccfce89615995e44020ddad042a7238a06";
  const noImage = "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  return (
    <div className={s.nftCategories}>
      {openNFTCategories && <NFTCategories onClose={() => setOpenNFTCategories(false)} />}
      <h2>Your NFTs Card</h2>
      <p>Equip your NFTs to earn Lucis token and more prizes for NFTs gamers
        You will receive the corresponding bonus:</p>
      <Row gutter={16}>
        <Col span={6}>
          <div className={s.cardWrap}>
            <div className={s.card}>
              <img src="/assets/P2E/nfts/card1.png" alt="card1" />
              <div className={s.coin}>
                <div className={s.lucisPoint}>
                  <img src="/assets/P2E/lucis-point.png" alt="" />
                  +15%
                </div>
                <div className={s.lucisToken}>
                  <img src="/assets/P2E/lucis-token.png" alt="" />
                  +15%
                </div>
              </div>
            </div>
          </div>
          <div className={s.buttonWrapper}>
            <Button type="primary" onClick={() => setOpenNFTCategories(true)}>Equip</Button>
          </div>
        </Col>

      </Row>
      <Row>
        <Col span={24}>
          <div style={{ fontSize: 20 }}>
          </div>
        </Col>
      </Row>
    </div >
  )
}

export default OnUsingNFTs