import React, {useCallback, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Col, Modal, Row, Popover} from "antd";
import {useRouter} from "next/router";

import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData,
} from "../../../Auth/ConnectWalletStore";
import AuthStore from "../../../Auth/AuthStore";
import AuthBoxStore from "../../../Auth/components/AuthBoxStore";

import AuthService from "../../../Auth/AuthService";
import {
  chainProfilesIndexed,
  getAppNetworkFriendlyName,
} from "utils/blockchain/ChainConfig";
import {
  ChainNetwork,
  ChainNetworkAvatar,
  getChainNetworkFromChainId,
  getCurrencyFromChainId,
} from "utils/blockchain/BlockChain";
import {trim_middle} from "utils/String";

import s from "./MenuMobile.module.sass";
import {useWindowSize} from "hooks/useWindowSize";
import ConnectWalletModal from "../../../Auth/components/ConnectWalletModal";
import {AppEmitter} from "../../../../services/emitter";
import {connectWalletHelper} from "../../../Auth/ConnectWalletHelper";
import {useQuery} from "@apollo/client";
import {GET_STATISTICS} from "../../../../hooks/p2e/useP2E";
import MissionService from "../../../service/p2e/MissionService";
import {format} from "../../../../utils/Number";

type Props = {
  balance: {lucis_point: number, lucis_token: number}
};

export default observer(function User(props: Props) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const {address, network: connected_network} = ConnectWalletStore;
  const {name, facebook_id, google_id, profile} = AuthStore;
  const chainId = ConnectWalletStore?.network?.chainId;

  const currency = chainId && getCurrencyFromChainId(chainId);
  const changeWallet = () => {
    AuthBoxStore.connectModalVisible = true;

  };

  // const onLogOut = useCallback(async () => {
  //   const authService = new AuthService();
  //   authService.logout();
  //
  //   if (facebook_id != "" && facebook_id != undefined) {
  //     (window as any).FB?.logout();
  //   }
  //
  //   if (google_id) {
  //     const auth2 = (window as any).gapi?.auth2.getAuthInstance();
  //
  //     if (auth2 != null) {
  //       auth2.signOut().then(auth2.disconnect());
  //     }
  //   }
  //
  //   AppEmitter.emit("onWalletDisconnect");
  //
  // }, []);

  let chainNetIcoUrl = "";
  if (connected_network) {
    const n: ChainNetwork | undefined = getChainNetworkFromChainId(
      connected_network.chainId
    );
    if (n) {
      chainNetIcoUrl = ChainNetworkAvatar[n];
    }
  }
  // console.log('{User} chainNetIcoUrl: ', chainNetIcoUrl);

  const onClickProfile = () => {
    router.push("/profile");
    setIsVisible(false);
  };

  const handleVisibleChange = (visible: any) => {
    setIsVisible(visible);
  };


  const showModal = () => {
    AuthBoxStore.connectModalVisible = true;
  };

  const onDisconnectWallet = useCallback(async () => {

    connectWalletHelper.cacheConnectionSetting(undefined, undefined);

    const provider = ConnectWalletStore_NonReactiveData.provider;
    const web3Modal = ConnectWalletStore_NonReactiveData.web3Modal!;

    // remove provider cache in browser
    await web3Modal?.clearCachedProvider();

    // disconnect wallet:
    // this is not for metamask, it's for sth else?
    if (provider?.disconnect && typeof provider.disconnect === "function") {
      await provider.disconnect();
    } else {
      console.warn("{disconnectWallet} cannot trigger provider.disconnect()");
    }

    setTimeout(() => {
      ConnectWalletStore.resetStates();
      ConnectWalletStore_NonReactiveData.resetStates();
      // AuthStore.resetStates();
    }, 200);
  }, []);
  return (
    <div>
      <div className={s.profileMobileUser}>
        <div className={s.avatar}>
          <img
            src={profile?.avatar ? profile?.avatar : "/assets/avatar.jpg"}
            alt=""
          />
        </div>
        <div className={s.profileMobileInfo}>
          <div className={s.profileMobileName}>
            {profile?.display_name}
          </div>
          <div className={s.profileMobileBalance}>
            <div className={s.rewardItem}>
              <img src="/assets/P2E/lucis-point.svg" alt=""/>
              <span className={s.lucisPoint}>{format(props.balance?.lucis_point) ?? 0}</span>
            </div>
            <div className={s.rewardItem}>
              <img src="/assets/P2E/lucis-token.svg" alt=""/>
              <span style={{color: "#16DADF"}}>{format(props.balance?.lucis_token, 2) ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
      {address ?
        <div className={s.profileMobileWallet}>
          <div className={s.address}>{address}</div>
          <div className={s.headerButton}>
            <span onClick={onDisconnectWallet}>Disconnect</span>
          </div>
        </div>
        :
        <div className={s.profileMobileWallet}>
          <div className={s.headerButton}>
            <span onClick={showModal}>Connect wallet</span>
          </div>
        </div>
      }
      <ConnectWalletModal/>
    </div>
  );
});
