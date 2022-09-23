import React, {useCallback, useEffect, useState} from "react";
import s from "../index.module.sass";
import {Input, Select} from "antd";
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

type Props = {
  isOwner?: boolean;
  userInfo: AuthUser;
};

const {Option} = Select;

const NftTabInventory = (props: Props) => {
  const {isOwner, userInfo} = props;
  const [searchName, setSearchName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [amountBox, setAmountBox] = useState<number | undefined>(undefined);
  const [tokenIdList, setTokenIdList] = useState<number[]>([]);
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
    getNFTs()
  }, [])

  const getNFTs = async () => {
    if (!ConnectWalletStore_NonReactiveData.web3Provider) {
      console.log("You need connect your wallet to continue!");
      setLoading(false);
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

  const openBox = async () => {
    if (!ConnectWalletStore_NonReactiveData.web3Provider) {
      console.log("You need connect your wallet to continue!");
      setLoading(false);
    } else {
      const service = new NftService(
        ConnectWalletStore_NonReactiveData.web3Provider,
        BoxAddress,
        LucisNFT
      )


      const txHash = await service.openBox();
      // console.log(txHash.hash);
      await sendTransactionOpenedBox({
        variables: {
          tx_hash: txHash.hash
        }
      });
    }
  }

  return (
    <>
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
            // isOwner={isOwner}
            // refetch={refetchMyInventoryCoupon}
            openBox={() => openBox()}
          />
        </div>
      </div>

      <div className={s.listItemsInventory}>
        {tokenIdList &&
          tokenIdList.map((item, index) => (
            <>
              <div className={s.item} key={`${index}${item}`}>
                <NftItem
                  tokenId={item}
                  isOwner={isOwner}
                />
              </div>
            </>
          ))}
      </div>
      {/*{!dataMyInventoryCoupons && <div className={s.emptyItem}>No items</div>}*/}
    </>
  );
};

export default NftTabInventory;
