import { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Modal, Row, Popover } from "antd";
import { useRouter } from "next/router";

import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData,
} from "../ConnectWalletStore";
import AuthStore from "../AuthStore";
import AuthBoxStore from "./AuthBoxStore";

import AuthService from "../AuthService";
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
import { trim_middle } from "utils/String";

import s from "./User.module.sass";
import { AppEmitter } from "../../../services/emitter";
import { useWindowSize } from "hooks/useWindowSize";
import ConnectWalletModal from "./ConnectWalletModal";

type Props = {};

export default observer(function User(props: Props) {
  const router = useRouter();
  const [width] = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);

  const { address, network: connected_network } = ConnectWalletStore;

  const { name, balance, facebook_id, google_id, profile } = AuthStore;
  const chainId = ConnectWalletStore?.network?.chainId;
  const currency = chainId && getCurrencyFromChainId(chainId);

  const changeWallet = () => {
    AuthBoxStore.connectModalVisible = true;
  };

  const disconnectWallet = useCallback(async () => {
    const authService = new AuthService();
    authService.logout();

    if (facebook_id != "" && facebook_id != undefined) {
      (window as any).FB?.logout();
    }

    if (google_id) {
      const auth2 = (window as any).gapi?.auth2.getAuthInstance();

      if (auth2 != null) {
        auth2.signOut().then(auth2.disconnect());
      }
    }

    AppEmitter.emit("onWalletDisconnect");

  }, []);

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

  const profileModal = (
    <Row
      className={s.profileModal}
      style={address ? { width: 400 } : { width: 350 }}
    >
      <Col
        span={address ? 9 : 15}
        className={s.avatarC}
        style={
          address ? { justifyContent: "flex-start" } : { justifyContent: "end" }
        }
      >
        <div className={`${s.avatar} ${s.avBig}`}>
          <img
            src={profile?.avatar ? profile?.avatar : "/assets/avatar.jpg"}
            alt=""
          />
        </div>
        <p>
          {
            //@ts-ignore
            name && name?.length >= 24
              ? name.slice(0, 24) + "..."
              : profile?.display_name && profile?.display_name?.length >= 24
              ? profile?.display_name.slice(0, 24) + "..."
              : name ?? profile?.display_name
          }
        </p>
      </Col>
      <Col
        span={address ? 15 : 9}
        style={{ borderLeft: "1px solid #fff", paddingLeft: "20px" }}
      >
        <p className={s.addr}>
          {address ? trim_middle(address ?? "", 7, 8) : ""}
        </p>
        {/* <p className={s.chainBtn}>
          <img src={chainNetIcoUrl} alt="" />
          <i>{getAppNetworkFriendlyName(connected_network)}</i>
        </p> */}
        {/* <p className={`${s.balance} text-14px md:text-18px`}>
          Balance: {profile?.me.balance ? profile.me.balance : "0"} BNB
          Balance: {Number(balance).toFixed(2)} {currency}
        </p> */}

        <div
          className={s.btns}
          style={address ? { marginTop: 30 } : { marginTop: 60 }}
        >
          <Button type="link" onClick={onClickProfile}>
            My Profile
          </Button>
          <Button type="link" onClick={disconnectWallet}>
            Log out
          </Button>
          {/* <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={disconnectWallet}
          ></GoogleLogout> */}
        </div>
      </Col>
    </Row>
  );

  const showModal = () => {
    AuthBoxStore.connectModalVisible = true;
  };

  return (
    <div className={s.container}>
      {
        <Button onClick={showModal} className={s.chainBtn}>
          {chainNetIcoUrl ? "" : <>Connect Wallet</>}
        </Button>
      }

      <Popover
        placement="bottomRight"
        content={profileModal}
        // trigger="hover"
        trigger={width < 1024 ? "click" : "hover"}
        visible={isVisible}
        onVisibleChange={handleVisibleChange}
      >
        <div className={s.avatar}>
          <img
            src={profile?.avatar ? profile?.avatar : "/assets/avatar.jpg"}
            alt=""
          />
          {/* <span>{name}</span> */}
        </div>
      </Popover>
      <ConnectWalletModal />
    </div>
  );
});
