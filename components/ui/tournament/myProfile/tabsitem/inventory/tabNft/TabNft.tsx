import React, {useCallback, useEffect, useState} from "react";
import s from "../index.module.sass";
import {Input, message, Select, Spin} from "antd";
import BoxItem from "./BoxItem";
import AuthStore, {AuthUser} from "../../../../../../Auth/AuthStore";
import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData
} from "../../../../../../Auth/ConnectWalletStore";
import {BoxAddress, LucisNFT, NFTManager} from "../../../../../../../utils/Enum";
import {NftService} from "../../../../../../../services/blockchain/NftService";
import {BigNumber} from "ethers";
import NftItem from "./NftItem";
import {useMutation} from "@apollo/client";
import {SEND_PENDING_TRANSACTION_OPEN_BOX} from "../../../../../../../hooks/useNft";
import {KButton} from "../../../../../common/button";
import {observer} from "mobx-react-lite";
import AuthBoxStore from "../../../../../../Auth/components/AuthBoxStore";
import {AppEmitter} from "../../../../../../../services/emitter";
import {LoadingOutlined} from "@ant-design/icons";
import {Nft, Status} from "../../../../../../../src/generated/graphql_p2e";

type Props = {
  isOwner?: boolean;
  userInfo: AuthUser;
};
const antIcon = <LoadingOutlined style={{fontSize: 32}} spin/>;
const {Option} = Select;

const NftTabInventory = (props: Props) => {
  const {isOwner, userInfo} = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFetchNft, setLoadingFetchNft] = useState<boolean>(false);
  const [amountBox, setAmountBox] = useState<number | undefined>(undefined);
  const [tokenIdList, setTokenIdList] = useState<number[]>([]);
  const [tipLoading, setTipLoading] = useState<string>("Loading ...");
  const [nftPreview, setNftPreview] = useState<Nft | null>(null);

  ///////////////////////////////////////////
  // load image
  const [loadedNftPreview, setLoadedNftPreview] = React.useState(false);
  const [showBtnClosePreview, setShowBtnClosePreview] = useState(false);

  //////////////////////////////////////////

  const isConnectedWallet = !!ConnectWalletStore.address;
  const [sendTransactionOpenedBox] = useMutation(SEND_PENDING_TRANSACTION_OPEN_BOX, {
    context: {
      endpoint: "p2e"
    }
  })

  useEffect(() => {
    if (loading) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  }, [loading])
  useEffect(() => {
    const listener = AppEmitter.addListener("nftResponse", (res: any) => {
      const status = res?.data?.status;
      const nft = res.data?.data;

      if (status === Status.Success) {
        setNftPreview(() => nft);
        setAmountBox(amount => amount! - 1);
        setTimeout(() => {
          setTokenIdList(l => [nft.token_id, ...l])
        }, 2200)
      } else if (status === Status.Failed) {
        setNftPreview(null);
        setLoadedNftPreview(false);
        setLoading(false);
        message.error("Open box failed, please try again!");
      }

      setTipLoading("Loading ...");

    });
    return () => {
      listener.remove();
    };
  }, [])

  useEffect(() => {
    if (isConnectedWallet) {
      getNFTs().then();
    } else {
      setAmountBox(0);
      setTokenIdList([]);
    }

  }, [isConnectedWallet])

  const getNFTs = async () => {
    setLoadingFetchNft(true);
    if (!ConnectWalletStore_NonReactiveData.web3Provider) {
      console.log("You need connect your wallet to continue!");
      setLoading(false);
      setLoadingFetchNft(false);
      message.error("Please connect wallet to continue!");

    } else {
      const service = new NftService(
        ConnectWalletStore_NonReactiveData.web3Provider,
        BoxAddress,
        LucisNFT
      )

      const promise = await Promise.all([
        service.getNFTsByOwner(ConnectWalletStore.address as string),
        service.getBoxBalanceByOwner(ConnectWalletStore.address as string)
      ]);
      const nfts = promise[0];
      const boxex = promise[1];

      setTokenIdList(nfts.sort((a, b) => b - a));

      setAmountBox(BigNumber.from(boxex).toNumber())

      setLoading(false);
      setLoadingFetchNft(false);
    }
  }

  const showModal = () => {
    AuthBoxStore.connectModalVisible = true;
  };
  const openBox = async () => {
    setLoading(true);
    if (!ConnectWalletStore_NonReactiveData.web3Provider) {
      console.log("You need connect your wallet to continue!");
      setLoading(false);
    } else {
      const service = new NftService(
        ConnectWalletStore_NonReactiveData.web3Provider,
        BoxAddress,
        LucisNFT
      )

      try {
        const txHash = await service.openBox();
        // console.log(txHash.hash);
        await sendTransactionOpenedBox({
          variables: {
            tx_hash: txHash.hash
          }
        });
        setTipLoading("Transaction is executing ...");
      } catch (e: any) {
        if (e.code === 4001) {
          message.error("You denied transaction signature.");
        } else {
          message.error("Something was wrong! Please contact admin to supported.");

        }
        setLoading(false);
      }

    }
  }
  return (
    <>
      {loading && <div className={s.backdrop}>
        <div style={loadedNftPreview ? {} : {display: "none"}} className={s.nftPreview}>
          <img
              className={s.nftPreviewImage}
              src={nftPreview?.image_md}
              alt=""
              onLoad={() => {
                setLoadedNftPreview(true);
                setTimeout(() => {
                  setShowBtnClosePreview(true);
                }, 2200)
              }}
          />
          {showBtnClosePreview && <KButton
            title="Ok"
            width="150px"
            height={"40px"}
            // disabled={item?.quantity <= 0}
            onClick={() => {
              setLoading(false);
              setNftPreview(null);
              setLoadedNftPreview(false);
            }}
          />}
        </div>
        {!loadedNftPreview && <Spin indicator={antIcon} size={"large"} tip={tipLoading}/>}
      </div>}
      <div>
        <div className={s.nftInventory}>
          <div className={s.item}>
            <BoxItem
              amount={amountBox}
              openBox={() => openBox()}
            />
          </div>
        </div>
        <div className={s.connectWallet}>
          {!isConnectedWallet &&
              <KButton onClick={() => showModal()} title={"Connect wallet"} fontSize={"15px"} width="140px"
                       height={"40px"}/>}
        </div>
        {isConnectedWallet  && tokenIdList?.length > 0 && <div className={s.cross}></div> }
        <div className={s.nftInventory}>
          {loadingFetchNft &&
              <div className="flex justify-center w-full">
                  <Spin indicator={antIcon} size={"large"} tip={"Loading ..."}/>
              </div>
              }
          {tokenIdList &&
            tokenIdList.map((item, index) => (
              <div className={s.item} key={`${index}${item}`}>
                <NftItem
                  tokenId={item}
                  isOwner={isOwner}
                />
              </div>
            ))}
        </div>
      </div>
      {/*{!dataMyInventoryCoupons && <div className={s.emptyItem}>No items</div>}*/}
    </>
  );
};

export default observer(NftTabInventory);
