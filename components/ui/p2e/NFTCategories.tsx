import React from 'react'
import s from "./p2e.module.sass";
import { Button, Col, message, Modal, Row } from "antd";
import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData,
} from "components/Auth/ConnectWalletStore";
import { P2EOnChainService } from "../../../services/blockchain/P2EOnChainService";
import { LucisNFT, NFTManager } from 'utils/Enum';
import SpinLoading from '../common/Spin';
import ConfirmApprovePopup from '../common/ApproveConfirmPopup';
interface IProps {
  onClose: () => void;
}

const NFTCategories = (props: IProps) => {
  const [openApprove, setOpenApprove] = React.useState<boolean>(false);
  const [isApprovedForAll, setIsApproveForAll] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [loadingEquipHandle, setLoadingEquipHandle] = React.useState<string>("");
  const [nftsList, setNftsList] = React.useState<Array<any>>([]);
  const [userAddress, setUserAddress] = React.useState<string | undefined>();
  const fakeImage = "https://preview.redd.it/kogugm77coc81.png?auto=webp&s=062e8eccfce89615995e44020ddad042a7238a06";
  const noImage = "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"

  React.useEffect(() => {

    getNFTs();
    // get user address
    if (ConnectWalletStore.address) {
      setUserAddress(ConnectWalletStore.address);
    }
  }, []);

  const getNFTs = async () => {
    if (!ConnectWalletStore_NonReactiveData.web3Provider) {
      console.log("You need connect your wallet to continue!");
      setLoading(false);
    } else {
      const service = new P2EOnChainService(
        ConnectWalletStore_NonReactiveData.web3Provider,
        LucisNFT,
        NFTManager
      )

      const promise = await Promise.all([
        service.getNFTsByOwner(ConnectWalletStore.address as string),
        service.isApprovedForAll()
      ]);
      const nfts = promise[0];
      const isApproveForContract = promise[1];
      console.log("approve: ", isApproveForContract)
      setIsApproveForAll(isApproveForContract);
      setNftsList(nfts);
      setLoading(false);
      console.log(nfts);
    }
  }

  const onOkeApprovePopup = (state: boolean) => {
    if (state === false) {
      setOpenApprove(false);
      message.error("Approve is not success");
    } else {
      setOpenApprove(false);
      message.success("NFTs Approved");
    }
  }


  const equipNFT = async (tokenId: string) => {
    if (!ConnectWalletStore_NonReactiveData.web3Provider) {
      console.log("You need connect your wallet to continue!");
    } else {
      const service = new P2EOnChainService(
        ConnectWalletStore_NonReactiveData.web3Provider,
        LucisNFT,
        NFTManager
      )
      setLoadingEquipHandle(tokenId);
      const isEquip = await service.equipNFT(tokenId);

      if (isEquip) {
        message.success("Equip successfully");
        setNftsList(nftsList.filter(item => item.tokenId !== tokenId));
        setLoadingEquipHandle("");
      } else {
        message.error("equip failed");
        setLoadingEquipHandle("");

      }
    }
  }

  return (
    <Modal visible={true} title="Choose NFT" onCancel={() => props.onClose()} width={1000} footer={[]}>
      {openApprove && <ConfirmApprovePopup onClose={() => setOpenApprove(false)} onOk={(state: boolean) => onOkeApprovePopup(state)} />}
      <div className={s.nftCategories}>
        <h2>Your wallet ({!userAddress ? "NaN" : userAddress})</h2>
        {loading ? <SpinLoading /> : (
          <div className={s.tier}>
            <div className={s.tierTitle}>
              <p>Tier 6</p>
            </div>
            <Row gutter={24} >
              {nftsList.map((item, index) => {
                return (

                  <Col span={6} key={item.tokenId + index}>
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
                      {
                        !isApprovedForAll ? <Button
                          type="primary"
                          onClick={() => setOpenApprove(true)}
                        >
                          Approve
                        </Button> : <Button
                          type="primary"
                          onClick={() => equipNFT(item.tokenId)}
                          loading={loadingEquipHandle === item.tokenId}
                        >
                          Select
                        </Button>
                      }

                    </div>
                  </Col>
                )
              })
              }
            </Row>
          </div>
        )}


      </div>
    </Modal>
  )
}

export default NFTCategories