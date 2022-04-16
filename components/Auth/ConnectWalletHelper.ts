import { providers } from "ethers";

import { ensureTargetChain, initWeb3 } from "./Web3Modal";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "./ConnectWalletStore";
import { ChainNetwork, Wallet } from "../../utils/blockchain/BlockChain";
import { makeError } from "utils/Error";

export enum ConnectWalletError {
  MetamaskNotInstalled = "MetamaskNotInstalled",
  UserRejected = "UserRejected",
  AddNetworkProfileNotSupported = "AddNetworkProfileNotSupported",
  SwitchChainNotSupported = "SwitchChainNotSupported",
  ChainNotSupportedByWallet = "ChainNotSupportedByWallet",
  TestNetChainNotSupportedByWallet = "TestNetChainNotSupportedByWallet",
}

/**
 * copied from wallet connect
 */
export const Web3ProviderErrorCodes = {
  rpc: {
    invalidInput: -32e3,
    resourceNotFound: -32001,
    resourceUnavailable: -32002,
    transactionRejected: -32003,
    methodNotSupported: -32004,
    limitExceeded: -32005,
    parse: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internal: -32603,
  },
  provider: {
    userRejectedRequest: 4001,
    unauthorized: 4100,
    unsupportedMethod: 4200,
    disconnected: 4900,
    chainDisconnected: 4901,
  },
};

export type ConnectWalletOption = {
  onWalletEvent_AccountsChanged: (accounts: string[]) => void;
  onWalletEvent_ChainChanged: (_hexChainId: string) => void;
  onWalletEvent_Disconnect: (error: { code: number; message: string }) => void;
};

class ConnectWalletHelper {
  // The data was store at ConnectWalletStore with reactive

  public onWalletEvent_AccountsChanged = (accounts: string[]) => {};
  public onWalletEvent_ChainChanged = (_hexChainId: string) => {};
  public onWalletEvent_Disconnect = (error: {
    code: number;
    message: string;
  }) => {};

  constructor() {}

  /**
   * Try to init the sdk to make user connect to his wallet
   *
   * Test cases PC:
   * - [x] browser dont have metamask
   * - [x] Click open metamask
   * - [x] Click connect while we have a metamask pending request already
   * - [x] user rejected to connect on metamask
   * - [x] Dont have profile => prompt to add profile
   * - [x] wrong chain => prompt to switch chain
   * - [x] connect & disconnect while metamask is connected
   * - [x] auto reconnect
   * - [x] connect & disconnect while metamask is not connected => should re-connect metamask again
   * - [x] user click disconnect on metamask while connected on the site => user need to re-connect metamask + re-verify
   * - [x] user change account on metamask => should do nothing, because they still have a connection ONLINE on our site
   * - [x] metamask install but has not setup yet, no account => Metamask will handle this
   * - [ ] Send tx while choosing a different account on metamask, not the connected one
   * - [ ] Send tx while metamask account connection was terminate on metamask
   * - [ ] Disconnect the old provider if new connection was success
   *
   * For WC pc & mobile:
   * - [x] WC support for Trust
   * - [ ] WC support for Metamask
   * - [ ] user rejected to connect on wc
   * - [ ] auto reconnect
   *
   * Additional for Mobile:
   *
   */
  async connectWallet(
    wallet: Wallet,
    network: ChainNetwork,
    option: ConnectWalletOption
  ): Promise<any> {
    switch (wallet) {
      case Wallet.metamask:
        return this.connectMetamask(network, option);
      case Wallet.wc:
        return this.connectWalletConnect(network, option);
      case Wallet.bsc:
        return this.connectBinanceWallet(network, option);
      default:
        return new Promise<any>((resolve, reject) => {
          reject("initFor: Unhandled wallet: " + wallet);
          return;
        });
    }
  }

  public web3_ensureActiveTargetChain(
    wallet: Wallet,
    network: ChainNetwork
  ): Promise<boolean> {
    switch (wallet) {
      case Wallet.metamask:
        const chainId = this.getConfiguredChainId(network);
        return ensureTargetChain(chainId);

      case Wallet.wc:
        const chainId1 = this.getConfiguredChainId(network);
        return ensureTargetChain(chainId1);
      // return new Promise<boolean>((resolve, reject) => {
      //   resolve(true);
      // });

      default:
        return new Promise<boolean>((resolve, reject) => {
          reject(
            this.makeError(
              ConnectWalletError.SwitchChainNotSupported,
              ConnectWalletError.SwitchChainNotSupported
            )
          );
          return;
        });
    }
  }

  public disconnectWallet(wallet: Wallet, network: ChainNetwork) {
    switch (wallet) {
      case Wallet.metamask:
        return this.disconnectMetamask(network);
      case Wallet.wc:
        return this.disconnectWalletConnect(network);
      case Wallet.bsc:
        return this.disconnectBinanceWallet(network);
      default:
        return new Promise<any>((resolve, reject) => {
          reject("disconnectWallet: Unhandled wallet: " + wallet);
          return;
        });
    }
  }

  /**
   * connect* funtion must fire this event on success
   */
  onConnectSuccess() {
    // Set AuthStore
  }

  /**
   * connect* funtion must fire this event on failed
   */
  onConnectFailed() {}

  //
  // private initNear() {
  //
  // }

  private makeError(code: string | number, msg: string): Error {
    return makeError(code, msg);
  }

  private connectEthVariant(
    provider_id: string,
    network: ChainNetwork,
    option: ConnectWalletOption
  ) {
    return new Promise<any>((resolve, reject) => {
      //const requiredChainId = this.getConfiguredChainId(network);
      const requiredChainId = 97;
      //const requiredChainId = process.env.NEXT_PUBLIC_CHAIN_ID__BSC
      /**
       * See the: components/Auth/Web3Modal.ts::_getProviderOptions
       */
      // console.log('{} provider_id == "walletconnect" && requiredChainId: ', provider_id, requiredChainId);
      // if (provider_id == "walletconnect" && requiredChainId == 97) {
      //   reject(this.makeError(ConnectWalletError.TestNetChainNotSupportedByWallet, ConnectWalletError.TestNetChainNotSupportedByWallet))
      //   return;
      // }

      const web3Modal = initWeb3(requiredChainId)!; // this was ensured to run only on client
      web3Modal
        .connectTo(provider_id)
        .then((provider) => {
          const web3Provider = new providers.Web3Provider(provider, "any");

          // unregister old listener
          if (provider.removeListener) {
            provider.removeListener(
              "accountsChanged",
              this.onWalletEvent_AccountsChanged
            );
            provider.removeListener(
              "chainChanged",
              this.onWalletEvent_ChainChanged
            );
            provider.removeListener(
              "disconnect",
              this.onWalletEvent_Disconnect
            );
          }

          // new provider
          ConnectWalletStore_NonReactiveData.provider = provider;
          ConnectWalletStore_NonReactiveData.web3Provider = web3Provider;
          ConnectWalletStore_NonReactiveData.web3Modal = web3Modal;

          // add new listener
          if (provider?.on) {
            this.onWalletEvent_AccountsChanged =
              option.onWalletEvent_AccountsChanged;
            this.onWalletEvent_ChainChanged = option.onWalletEvent_ChainChanged;
            this.onWalletEvent_Disconnect = option.onWalletEvent_Disconnect;
            provider.on("accountsChanged", this.onWalletEvent_AccountsChanged);
            provider.on("chainChanged", this.onWalletEvent_ChainChanged);
            provider.on("disconnect", this.onWalletEvent_Disconnect);
          }

          resolve(provider);
        })
        .catch((e) => {
          console.log("connect_err: ", e);
          // console.log('{ConnectWalletHelper.connectTo} e: ', e);
          /**
           * NOTE: Web3Modal does not retain the error.code from metamask
           * It's all consider "User Rejected" error
           */
          if (e.message === "User Rejected") {
            reject(
              this.makeError(
                ConnectWalletError.UserRejected,
                `Rejected with error code: ${Web3ProviderErrorCodes.provider.userRejectedRequest}`
              )
            );
            return;
          }
        });
    });
  }

  private connectMetamask(network: ChainNetwork, option: ConnectWalletOption) {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    if (!isMetamask) {
      throw this.makeError(
        ConnectWalletError.MetamaskNotInstalled,
        ConnectWalletError.MetamaskNotInstalled
      );
    }

    return this.connectEthVariant("injected", network, option);
  }

  private connectC98Wallet(
    network: ChainNetwork,
    option: ConnectWalletOption
  ) {}

  private connectWalletConnect(
    network: ChainNetwork,
    option: ConnectWalletOption
  ) {
    return this.connectEthVariant("walletconnect", network, option);
  }

  private connectBinanceWallet(
    network: ChainNetwork,
    option: ConnectWalletOption
  ) {
    return new Promise<any>((resolve, reject) => {
      reject("TODO");
      return;
    });
  }

  private disconnectMetamask(network: ChainNetwork) {
    return new Promise<any>((resolve, reject) => {
      reject("TODO");
      return;
    });
  }

  private disconnectWalletConnect(network: ChainNetwork) {
    return new Promise<any>((resolve, reject) => {
      reject("TODO");
      return;
    });
  }

  private disconnectBinanceWallet(network: ChainNetwork) {
    return new Promise<any>((resolve, reject) => {
      reject("TODO");
      return;
    });
  }

  private getConfiguredChainId(network: ChainNetwork): number {
    let requiredChainId: number;
    switch (network) {
      case ChainNetwork.eth:
        requiredChainId = parseInt("" + process.env.NEXT_PUBLIC_CHAIN_ID__ETH);
        break;
      case ChainNetwork.polygon:
        requiredChainId = parseInt(
          "" + process.env.NEXT_PUBLIC_CHAIN_ID__POLYGON
        );
        break;
      case ChainNetwork.bsc:
        requiredChainId = parseInt("" + process.env.NEXT_PUBLIC_CHAIN_ID__BSC);
        // console.log('{ConnectWalletHelper.getConfiguredChainId} process.env.NEXT_PUBLIC_CHAIN_ID__BSC: ', process.env.NEXT_PUBLIC_CHAIN_ID__BSC, requiredChainId);
        break;
      default:
        // @ts-ignore
        throw new Error(
          `requiredChainId was not handled for network ${network}, please add new case`
        );
    }

    if (!requiredChainId) {
      throw new Error(
        `requiredChainId was not configured for network ${network}, please check .env`
      );
    }

    return requiredChainId;
  }

  cacheConnectionSetting(wallet?: Wallet, network?: ChainNetwork) {
    localStorage.setItem("wallet_connect", JSON.stringify([wallet, network]));
  }

  fetchConnectionSetting(): [Wallet?, ChainNetwork?] {
    const a_str = localStorage.getItem("wallet_connect");
    if (!a_str) {
      return [undefined, undefined];
    }

    try {
      const a = JSON.parse(a_str);
      const w: Wallet = a[0] as Wallet;
      const n: ChainNetwork = a[1] as ChainNetwork;

      return [w, n];
    } catch (e) {
      return [undefined, undefined];
    }
  }
}

export const connectWalletHelper = new ConnectWalletHelper();
