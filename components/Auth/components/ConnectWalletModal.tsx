import { Button, message, Modal } from "antd";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { Network } from "@ethersproject/networks";

import {
  ChainNetwork,
  getChainNetworkFromChainId,
  NetworkSupportedWallets,
  Wallet,
} from "utils/blockchain/BlockChain";
import s from "./ConnectWallet.module.sass";
import { trim_middle } from "utils/String";
import { getAppNetworkFriendlyName } from "utils/blockchain/ChainConfig";
import { observer } from "mobx-react-lite";
import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData,
} from "../ConnectWalletStore";
import AuthStore from "../AuthStore";
import {
  ConnectWalletError,
  connectWalletHelper,
  ConnectWalletOption,
} from "../ConnectWalletHelper";
import AuthService, { AuthError } from "../AuthService";
import AuthBoxStore from "./AuthBoxStore";
import { AppEmitter } from "../../../services/emitter";
import EthersService from "services/blockchain/Ethers";
import { isMobile } from "web3modal";

type Props = {};
export default observer(function ConnectWalletModal(props: Props) {
  const DEBUG = false;
  DEBUG && console.log("{ConnectWalletModal} render: ");

  // // init
  // - choose chain
  // - choose wallet
  // - open modal connect
  // + connected: login -> success -> cache chain + wallet. If login faild then notify and clear
  // + cancel: clear cache

  // // connected
  // - check change account
  // + not change then keep session
  // + change -> reconnect

  // // State
  // connected
  // selected (chain + wallet)

  const {
    address,
    network: connected_network,
    chainNetwork: connectedChain,
    wallet: connectedWallet,
  } = ConnectWalletStore;

  const { isLoggedIn: logged_in_with_lucis, loading: authing } = AuthStore;
  const [network, setNetwork] = useState<ChainNetwork | undefined>(
    //connectedChain
    ChainNetwork.bsc
  );
  const [wallet, setWallet] = useState<Wallet | undefined>(connectedWallet);

  const isModalVisible = AuthBoxStore.connectModalVisible,
    setIsModalVisible = (v: boolean) => (AuthBoxStore.connectModalVisible = v);

  const activeWallet = useMemo(() => {
    if (!connectedChain || connectedChain != network) {
      // normal state
      return wallet;
    }
    // alway show connected wallet
    return connectedWallet;
  }, [network, connectedChain, wallet, connectedWallet]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAccountsChanged = (accounts: string[]) => {
    // console.log("{handleAccountsChanged} accounts: ", accounts);
    if (!AuthStore.isLoggedIn) {
      return;
    }
    if (accounts.length === 0) {
      // disconnect all account
      disconnectWallet();
      return;
    }
    const currentAccount = accounts[0];
    // console.log("{handleAccountsChanged} address: ", address);
    if (currentAccount !== address) {
      ConnectWalletStore.address = currentAccount;
      //loginWithLucis(currentAccount, false);
      // changeWallet(activeWallet!);
    }
  };
  const handleChainChanged = async (_hexChainId: string) => {
    const _chainId = parseInt(_hexChainId);
    console.log("{handleChainChanged} _hexChainId: ", _chainId);

    /**
     * If user change the chain, we don't need to do anything
     * TODO: Just ensure target chain is active before sending the request => Check if we need to ensure, or metamask will do it?
     */
    let newChainNetwork = getChainNetworkFromChainId(_chainId);
    let newNetwork =
      await ConnectWalletStore_NonReactiveData.web3Provider?.getNetwork();
    if (!newNetwork) {
      return;
    }
    setNetwork(newChainNetwork);
    ConnectWalletStore.setState({
      network: newNetwork,
      address: address,
      chainNetwork: newChainNetwork,
      wallet: wallet,
    });
    // ConnectWalletStore.chainNetwork = newChainNetwork;
    // ConnectWalletStore.network = newNetwork;
    // changeWallet(activeWallet!, newChainNetwork);
  };
  const handleDisconnect = (error: { code: number; message: string }) => {
    console.log("{handleDisconnect} error: ", error.code, error.message);
    // disconnect()

    /**
     * Disconnect in case of:
     * - Metamask switch chain (disconnect current chain & active new chain): 1013 MetaMask: Disconnected from chain
     * - Metamask disconnected by user
     *
     * We might need to:
     * - log user out
     * - disconnect the wallet
     *
     * But it's impossible because we should not log user out if they switch chain.
     *
     * They switch chain on metamask,
     * but they still keep connection by prev chain on our site, it's ok!!
     */
  };

  // const loginWithLucis = useCallback(
  //   async (address, showSuccessMessage = true) => {
  //     /**
  //      * Web3 User need to link their wallet with Lucis system
  //      */
  //     if (!address) {
  //       message.error(
  //         <span>
  //           Wallet not connected properly, please connect wallet again
  //         </span>,
  //         3
  //       );
  //       return;
  //     }

  //     try {
  //       AuthStore.loading = true;
  //       const authService = new AuthService();
  //       const r = await authService.login(address!, 0);

  //       if (!ConnectWalletStore_NonReactiveData.web3Provider) {
  //         throw message.error("Need to connect your wallet first");
  //       }

  //       const ethersService = new EthersService(
  //         ConnectWalletStore_NonReactiveData.web3Provider
  //       );
  //       const balance = await ethersService.getNativeBalance(address);
  //       AuthStore.balance = balance;
  //       //@ts-ignore
  //       // window.tmp = ConnectWalletStore_NonReactiveData;
  //       // const balance = await provider.getBalance(address);
  //       // console.log(balance);

  //       AuthStore.loading = false;
  //       DEBUG && console.log("{loginWithLucis.} r: ", r);

  //       switch (r.error) {
  //         case null:
  //           // Success
  //           // Already set the auth token to the AuthStore in AuthService
  //           showSuccessMessage &&
  //             message.success(
  //               <span>Successfully connect and verify your wallet</span>,
  //               5
  //             );
  //           AuthBoxStore.verified = true;
  //           setTimeout(() => {
  //             setIsModalVisible(false);
  //           }, 2000);
  //           break;

  //         case AuthError.UserDeniedMsgSignature:
  //           message.error(<span>User denied</span>, 5);
  //           break;

  //         default:
  //           message.error(
  //             <span>
  //               Cannot verify your address due to unhandled error.
  //               <br />
  //               It's might be the improper wallet connection
  //             </span>,
  //             5
  //           );
  //           disconnectWallet();
  //       }
  //     } catch (err: any) {
  //       console.log("err:", err);
  //       AuthStore.loading = false;
  //       // message.error(`<span>${err.toString()}</span>`, 5);

  //       message.error(
  //         <span>
  //           Cannot verify your address due to unhandled error.
  //           <br />
  //           It's might be the improper wallet connection
  //         </span>,
  //         5
  //       );
  //     }
  //   },
  //   []
  // );

  // const loginWithLucisCb = useCallback(
  //   async (showSuccessMessage = true) => {
  //     return loginWithLucis(address, showSuccessMessage);
  //   },
  //   [address]
  // );

  const changeWallet = useCallback(
    async (w: Wallet, network?: ChainNetwork) => {
      /**
       * This will try to popup the wallet, then make a connection to your wallet
       * If success, it will set auth info to AuthStore
       */
      if (!network) {
        console.error("{changeWallet} ERROR: network is null. Please reload the page");
        return;
      }

      // let hasVerify = address && logged_in_with_lucis;
      // if (connectedChain === network && hasVerify) {
      //   console.error(
      //     "{changeWallet} ERROR: can't reconnect without disconnect"
      //   );
      //   return;
      // }
      // check connect metamask mobile when use wallet connect

      if (isMobile()) {
        w = Wallet.wc;
      }

      // TODO: Handle mobile
      const opt: ConnectWalletOption = {
        onWalletEvent_AccountsChanged: handleAccountsChanged,
        onWalletEvent_ChainChanged: handleChainChanged,
        onWalletEvent_Disconnect: handleDisconnect,
      };
      connectWalletHelper
        .connectWallet(w, network!, opt)
        .then(async (provider) => {
          // add profile and switch the network
          const ensureActiveNetworkResult =
            await connectWalletHelper.web3_ensureActiveTargetChain(w, network);
          DEBUG &&
            console.log(
              "ensureActiveNetworkResult: ",
              ensureActiveNetworkResult
            );

          return provider;
        })
        .then(async (provider) =>
          handleConnectThen(provider, w, () => {
            DEBUG && console.log("{handleConnectThen} setWallet:  : ", w);

            setWallet(w);
            connectWalletHelper.cacheConnectionSetting(w, network);

            if (!ConnectWalletStore.address) {
              DEBUG && console.log("{} Address is null => SKIP login: ");
              return null;
            } else {
              /**
               * This is memoization, so if address changed, loginWithLucis is another function
               */
              console.log("ConnectWalletStore", ConnectWalletStore);
              //alert("ConnectWall successs");
              setIsModalVisible(false);
              //return loginWithLucis(ConnectWalletStore.address, false);
            }
          })
        )
        .catch((e) => handleConnectCatch(e));
    },
    [connectedChain, address, logged_in_with_lucis, DEBUG]
  );

  const reUpdateWalletIfNeeded = (
    w: Wallet | undefined,
    n: ChainNetwork | undefined
  ) => {
    if (w && n && (w != wallet || n != network)) {
      setWallet(w);
      setNetwork(n);
    }
  };

  useEffect(() => {
    /**
     * Restore selected network / wallet if user has selected
     */
    if (isModalVisible && !!connectedChain) {
      setNetwork(connectedChain);
      setWallet(connectedWallet);
      return;
    }
    if (isModalVisible && address && !connected_network) {
      reUpdateWalletIfNeeded(...connectWalletHelper.fetchConnectionSetting());
    }
  }, [isModalVisible, address, connected_network, connectedWallet]);

  useEffect(() => {
    /**
     * ------- Try to restore
     * TODO: This effect was run 2 time, plz check, this must be run once
     */
    DEBUG && console.log("{useEffect} restore wallet connection: ");

    // const web3Modal = ConnectWalletStore_NonReactiveData.web3Modal;
    // console.log('{re-store} web3Modal.cachedProvider: ', web3Modal?.cachedProvider);

    // if (web3Modal) {
    //   if (web3Modal.cachedProvider) {
    const [w, network] = connectWalletHelper.fetchConnectionSetting();
    DEBUG && console.log("{Restore} w, network: ", w, network);

    if (!w || !network) {
      return;
    }

    // connect to cache provider
    const opt: ConnectWalletOption = {
      onWalletEvent_AccountsChanged: handleAccountsChanged,
      onWalletEvent_ChainChanged: handleChainChanged,
      onWalletEvent_Disconnect: handleDisconnect,
    };
    connectWalletHelper
      .connectWallet(w, network!, opt)
      .then(async (provider) => {
        // add profile and switch the network
        const ensureActiveNetworkResult =
          await connectWalletHelper.web3_ensureActiveTargetChain(w, network);
        // console.log('{Restore} ensureActiveNetworkResult: ', ensureActiveNetworkResult);

        return provider;
      })
      .then(async (provider) =>
        handleConnectThen(provider, w, () => {
          DEBUG && console.log("{handleConnectThen} wallet:  : ", w);
          setWallet(w);
          connectWalletHelper.cacheConnectionSetting(w, network);

          /**
           * Use ConnectWalletStore.address instead of address
           * Because address need to be added to useEffect dependency
           * Causing useEffect be re-triggered when address changed => Unwanted behavior
           */
          if (!ConnectWalletStore.address) {
            DEBUG && console.log("{} Address is null => SKIP login: ");
            return null;
          } else {
            /**
             * This is memoization, so if address changed, loginWithLucis is another function
             */
            //return loginWithLucis(ConnectWalletStore.address, false);
          }
        })
      )
      .catch((e) => handleConnectCatch(e));
    //}
    //}
  }, []);

  const handleConnectThen = async (
    provider: any,
    _wallet: Wallet,
    onSuccess = () => { }
  ) => {
    // console.log('{changeWallet} Wallet Connected: provider: ', provider);

    if (!ConnectWalletStore_NonReactiveData.web3Provider) {
      message.error(<span>Unexpected error happen (code: 6002)</span>, 8);
      return;
    }

    const web3Provider = ConnectWalletStore_NonReactiveData.web3Provider;
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    const connected_network = await web3Provider.getNetwork();
    /**
     * In case of user connected to BSC network before
     * Then user choose ETH network => Cancel to switch to network => Still on BSC
     * => Need to alias the UI back to BSC
     */
    const n: ChainNetwork | undefined = getChainNetworkFromChainId(
      connected_network.chainId
    );
    DEBUG && console.log("{handleConnectThen} network: ", n);
    if (n && n !== network) {
      setNetwork(n);
    }

    // Save to store
    // ConnectWalletStore.network = connected_network;
    // ConnectWalletStore.address = address;
    ConnectWalletStore.setState({
      network: connected_network,
      address: address,
      chainNetwork: n,
      wallet: _wallet,
    });
    DEBUG &&
      console.log("{ConnectWalletStore.handleConnectThen} address: ", address);

    // If connect failed then => set wallet to null
    // If connect success then => set wallet to connected wallet
    const success = !!address;
    if (success) {
      onSuccess();
    }

    // finally close the modal if success verified
  };

  const handleConnectCatch = async (e: any) => {
    console.error("{handleConnectCatch} e: ", e.code, e.message);
    switch (e.code) {
      case ConnectWalletError.MetamaskNotInstalled:
        message.error(
          <span>
            [PC] Metamask extension is not installed. <br />
            Please install it from{" "}
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
            >
              metamask.io
            </a>
          </span>,
          8
        );
        break;
      case ConnectWalletError.UserRejected:

        message.error(
          <span>
            You have rejected to do this action.
            <br />
            Or there is already a same pending request on your wallet.
          </span>,
          5
        );
        break;
      case ConnectWalletError.ChainNotSupportedByWallet:
        message.error(
          <span>This wallet does not support the selected network</span>,
          5
        );
        break;
      case ConnectWalletError.TestNetChainNotSupportedByWallet:
        message.error(
          <span>
            This wallet does not support the testnet of the selected network
          </span>,
          5
        );
        break;
      case ConnectWalletError.SwitchChainNotSupported:
        console.error("{handleConnectCatch} SwitchChainNotSupported e: ", e);
        break;
      default:
        console.error("{handleConnectCatch} Above error was not handled");
        break;
    }
  };

  const changeNetwork = useCallback(
    async (n: ChainNetwork) => {
      // check different before update is not required because react will do it
      // But if not check: we still get 1 more redundant render
      if (network !== n) {
        // change state
        setNetwork(n);
        setWallet(undefined); // reset collect wallet

        // show list of suitable wallet for this network
        // Let UI do this
      }
    },
    [network]
  );

  const disconnectWallet = useCallback(async () => {
    // reset UI
    setNetwork(undefined);
    setWallet(undefined);
    connectWalletHelper.cacheConnectionSetting(undefined, undefined);

    const provider = ConnectWalletStore_NonReactiveData.provider;
    const web3Modal = ConnectWalletStore_NonReactiveData.web3Modal!;

    DEBUG &&
      console.log(
        "{disconnectWallet} provider: ",
        provider,
        provider.isMetaMask
      );
    DEBUG &&
      console.log(
        "{disconnectWallet} cachedProvider: ",
        web3Modal,
        web3Modal?.cachedProvider
      );

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
      AuthStore.resetStates();
      // AuthStore.resetStates();
    }, 200);
  }, [DEBUG]);

  useEffect(() => {
    /**
     * When user click disconnect button on their profile
     */
    const listener = AppEmitter.addListener(
      "onWalletDisconnect",
      disconnectWallet
    );
    return () => {
      listener.remove();
    };
  }, [disconnectWallet]);

  useEffect(() => {
    /**
     * Sometime we need to show modal in somewhere else
     */
    const listener = AppEmitter.addListener("showConnectWalletModal", () => {
      AuthBoxStore.connectModalVisible = true;
    });
    return () => {
      listener.remove();
    };
  }, []);

  //const supported_wallets = !network ? [] : NetworkSupportedWallets[network];
  const supported_wallets = NetworkSupportedWallets['bsc'];

  // @ts-ignored
  const predefined_wallets: Record<Wallet, ReactElement | null> = {
    [Wallet.metamask]: (
      <div
        key="metamask"
        onClick={() => changeWallet(Wallet.metamask, network)}
        className={`${s.item} ${activeWallet === Wallet.metamask ? s.active : ""
          }`}
      >
        <img src="/assets/crypto/ico-wallet-metamask.png" alt="" />
        <p>Metamask</p>
      </div>
    ),
    [Wallet.wc]: (
      <div
        key="wc"
        onClick={() => changeWallet(Wallet.wc, network)}
        className={`${s.item} ${activeWallet === Wallet.wc ? s.active : ""}`}
      >
        <img src="/assets/crypto/ico-wallet-wc.png" alt="" />
        <p>Wallet Connect</p>
      </div>
    ),
    [Wallet.bsc]: (
      <div
        key="bsc"
        // onClick={() => changeWallet(Wallet.bsc)}
        className={`${s.item} ${s.disable} ${activeWallet === Wallet.bsc ? s.active : ""
          }`}
      >
        <img src="/assets/crypto/ico-wallet-bsc.webp" alt="" />
        <p>Binance Wallet</p>
      </div>
    ),
    [Wallet.near]: null,

    // NOTE: Remember to defined the wallet here if it exist in NetworkSupportedWallets
  };

  return (
    <Modal
      // title="Connect wallet"
      title={<span className="font-[600]">Connect wallet</span>}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      wrapClassName={s.mdl}
    >
      <div className={s.items}>
        {supported_wallets.map((i) => predefined_wallets[i])}
      </div>
    </Modal>
  );
});
