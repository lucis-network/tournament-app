import React, {useCallback, useEffect, useState} from "react";
import s from "../index.module.sass";
import {Input, message, Select, Spin} from "antd";
import debounce from "lodash/debounce";
import BoxItem from "./BoxItem";
import AuthStore, {AuthUser} from "../../../../../../Auth/AuthStore";
import {useMyCoupon} from "hooks/myProfile/useCoupon";
import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData
} from "../../../../../../Auth/ConnectWalletStore";
import {P2EOnChainService} from "../../../../../../../services/blockchain/P2EOnChainService";
import {BoxAddress, LucisNFT, NFTManager} from "../../../../../../../utils/Enum";
import {NftService} from "../../../../../../../services/blockchain/NftService";
import {BigNumber} from "ethers";
import CouponItem from "../tabCoupons/couponItem";
import NftItem from "./NftItem";
import {useMutation} from "@apollo/client";
import {SEND_PENDING_TRANSACTION_OPEN_BOX} from "../../../../../../../hooks/useNft";
import {KButton} from "../../../../../common/button";
import {observer} from "mobx-react-lite";
import AuthBoxStore from "../../../../../../Auth/components/AuthBoxStore";
import {AppEmitter} from "../../../../../../../services/emitter";
import MissionService from "../../../../../../service/p2e/MissionService";
import {LoadingOutlined} from "@ant-design/icons";
import {Nft, Status} from "../../../../../../../src/generated/graphql_p2e";

type Props = {
  isOwner?: boolean;
  userInfo: AuthUser;
};
const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;
const {Option} = Select;

const NftTabInventory = (props: Props) => {
  const {isOwner, userInfo} = props;
  const [searchName, setSearchName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [amountBox, setAmountBox] = useState<number | undefined>(undefined);
  const [tokenIdList, setTokenIdList] = useState<number[]>([]);
  const [tipLoading, setTipLoading] = useState<string>("Loading ...");
  const [nftPreview, setNftPreview] = useState<Nft | null>(null);
  const isConnectedWallet = !!ConnectWalletStore.address;
  const [sendTransactionOpenedBox] = useMutation(SEND_PENDING_TRANSACTION_OPEN_BOX, {
    context: {
      endpoint: "p2e"
    }
  })
  const onSearch = (e: any) => {
    delayedSearch(e.target.value);
  };

  const delayedSearch = useCallback(
    debounce((value: string) => {
      setSearchName(value);
    }, 600),
    []
  );

  useEffect(() => {
    const listener = AppEmitter.addListener("nftResponse", (res: any) => {
      const status = res?.data?.status;
      const nft = res.data?.data;

      if (status === Status.Success) {
        setNftPreview(() => nft);
        setAmountBox(amount => amount! - 1);
        setTokenIdList(l => [...l, nft.token_id])
      } else if (status === Status.Failed) {
        setNftPreview(null);
        setLoading(false);
        message.error("open box failed, Please try again!");
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
    if (!ConnectWalletStore_NonReactiveData.web3Provider) {
      console.log("You need connect your wallet to continue!");
      setLoading(false);
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

      setTokenIdList(nfts);

      setAmountBox(BigNumber.from(boxex).toNumber())
      //console.log("box: ", boxex)
      setLoading(false);
      //console.log(nfts);
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

        {nftPreview ? <div className={s.nftPreview}>
          <img className={s.nftPreviewImage} src={nftPreview.image_md} alt=""/>
          <KButton
            title="Ok"
            width="150px"
            height={"40px"}
            // disabled={item?.quantity <= 0}
            onClick={() => {
              setLoading(false);
              setNftPreview(null);
            }}
          />
        </div> : <Spin indicator={antIcon} size={"large"} tip={tipLoading}/>}
      </div>}
      <div className={s.groupSearch}>
        <div>
          {/*<img src="/assets/home/ic_member.svg" alt="" />*/}
          <Input
            placeholder="Search"
            onChange={onSearch}
            className={`${s.searchText}`}
          />
        </div>
        <KButton
          title="Reload"
          width="80px"
          // disabled={item?.quantity <= 0}
          onClick={() => getNFTs()}
        />
      </div>

      <div className={s.listItemsInventory}>
        <div className={s.item}>
          <BoxItem
            amount={amountBox}
            openBox={() => openBox()}
          />
        </div>
      </div>
      <div className={s.connectWallet}>
        {!isConnectedWallet && <KButton onClick={() => showModal()} title={"Connect wallet"} fontSize={"16px"} width="200px" height={"60px"}/>}
      </div>
      <div className={s.cross}></div>
      <div className={s.listItemsInventory}>
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
      {/*{!dataMyInventoryCoupons && <div className={s.emptyItem}>No items</div>}*/}
    </>
  );
};

export default observer(NftTabInventory);
