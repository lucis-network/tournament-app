import React from 'react'
import s from "./p2e.module.sass";
import { Button, Col, Modal, Row } from "antd";
import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData,
} from "components/Auth/ConnectWalletStore";
import { P2EContract } from "../../../services/blockchain/P2EContract";
interface IProps {
  onClose: () => void;
}

const NFTCategories = (props: IProps) => {
  const [ethersService, setEthersService] = React.useState<P2EContract>();
  const [userAddress, setUserAddress] = React.useState<string | undefined>();
  const fakeImage = "https://preview.redd.it/kogugm77coc81.png?auto=webp&s=062e8eccfce89615995e44020ddad042a7238a06";
  const noImage = "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"

  React.useEffect(() => {
    // connect blockchain service
    if (ConnectWalletStore_NonReactiveData.web3Provider) {
      const ethersService = new P2EContract(
        ConnectWalletStore_NonReactiveData.web3Provider
      );

      setEthersService(ethersService);
    }

    // get user address
    if (ConnectWalletStore.address) {
      setUserAddress(ConnectWalletStore.address);
    }
  }, [])
  return (
    <Modal visible={true} title="Choose NFT" onCancel={() => props.onClose()} width={1000} footer={[]}>
      <div className={s.nftCategories}>
        <h2>Your wallet ({!userAddress ? "NaN" : userAddress})</h2>
        <div className={s.tier}>
          <div className={s.tierTitle}>
            <p>Tier 6</p>
          </div>
          <Row gutter={24}>
            <Col span={6}>
              <div className={s.card}>
                <div
                  style={{
                    backgroundImage: `url("${fakeImage}")`,
                    height: 200,
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    marginBottom: 10
                  }}
                >
                </div>
                <Button type="primary">Select</Button>
              </div>
            </Col>
            <Col span={6}>
              <div className={s.card}>
                <div
                  style={{
                    backgroundImage: `url("${fakeImage}")`,
                    height: 200,
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    marginBottom: 10
                  }}
                >
                </div>
                <Button type="primary">Select</Button>
              </div>
            </Col>
          </Row>
        </div >
        <div className={s.tier}>
          <div className={s.tierTitle}>
            <p>Tier 5</p>
          </div>
          <Row gutter={24}>
            <Col span={6}>
              <div className={s.card}>
                <div
                  style={{
                    backgroundImage: `url("${fakeImage}")`,
                    height: 200,
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    marginBottom: 10
                  }}
                >
                </div>
                <Button type="primary">Select</Button>
              </div>
            </Col>
          </Row>
        </div >
      </div>
    </Modal>
  )
}

export default NFTCategories