import React from 'react'
import s from "./daily/Daily.module.sass";
import { Button, Col, Row } from "antd";
import NFTCategories from './NFTCategories';


interface IProps {
}

const OnUsingNFTs = (props: IProps) => {
  const [openNFTCategories, setOpenNFTCategories] = React.useState<boolean>(false);

  const fakeImage = "https://preview.redd.it/kogugm77coc81.png?auto=webp&s=062e8eccfce89615995e44020ddad042a7238a06";
  const noImage = "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  return (
    <div className={s.onUsingNFTs}>
      {openNFTCategories && <NFTCategories onClose={() => setOpenNFTCategories(false)} />}
      <h2>On using NFTs</h2>
      <Row gutter={16}>
        <Col span={6}>
          <div className={s.card}>
            <div
              style={{
                backgroundImage: `url("${fakeImage}")`,
                height: 250,
                width: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                marginBottom: 10
              }}
            >
            </div>
            <Button type="primary">Change</Button>
          </div>
        </Col>
        <Col span={6}>
          <div className={s.card}>
            <div
              style={{
                backgroundImage: `url("${fakeImage}")`,
                height: 250,
                width: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                marginBottom: 10
              }}
            >
            </div>
            <Button type="primary">Change</Button>
          </div>
        </Col>
        <Col span={6}>
          <div className={s.card}>
            <div
              style={{
                backgroundImage: `url("${noImage}")`,
                height: 250,
                width: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                marginBottom: 10,
                position: "relative",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div className={s.buttonWrapper}>
                <Button type="primary" onClick={() => setOpenNFTCategories(true)}>Equip</Button>
              </div>
            </div>

          </div>
        </Col>

        <Col span={6}>
          <div className={s.card}>
            <div
              style={{
                backgroundImage: `url("${noImage}")`,
                height: 250,
                width: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                marginBottom: 10,
                position: "relative",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div className={s.buttonWrapper}>
                <Button type="primary">Equip</Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ fontSize: 20 }}>
            L???p NFTs v?? ?????i NFTs cao c???p h??n ????? nh???n ???????c nhi???u ph???n th?????ng h??n B???n s??? nh???n ???????c ph???n th?????ng t????ng ???ng l??...
          </div>
        </Col>
      </Row>
    </div >
  )
}

export default OnUsingNFTs