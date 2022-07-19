import Web3Modal, { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
//import { IClientMeta } from "@walletconnect/types";

import { isClient } from "../../utils/DOM";
import { makeError } from "utils/Error";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "./ConnectWalletStore";
import {
  chainProfilesIndexed,
  convertIChainData2ChainParameter,
} from "utils/blockchain/ChainConfig";

export enum Web3Error {
  noProvider = "noProvider",
}

/**
 * Support ETH mainnet, rinkedby, BSC, BSC testnet, Polygon
 */
export function initWeb3(chainIdNumeric: number): Web3Modal | undefined {
  if (!isClient) {
    return undefined;
  }

  const providerOptions = _getProviderOptions(chainIdNumeric);
  return new Web3Modal({
    cacheProvider: true,
    // network: 'binance',
    providerOptions,
  });
}

export async function ensureTargetChain(chain_id: number): Promise<boolean> {
  console.log("ensureTargetChain chain_id:", chain_id);
  const provider = ConnectWalletStore_NonReactiveData.provider;
  if (!provider) {
    throw makeError(
      Web3Error.noProvider,
      "No provider found, please connect wallet first"
    );
  }

  const chainIdHex = "0x" + chain_id.toString(16);
  console.log("ensureTargetChain chainIdHex:", chainIdHex);
  // Metamask chainId is heximal
  if (provider.chainId === chainIdHex) {
    return true;
  }
  // Trust wallet chainId is decimal
  if (provider.chainId === chain_id) {
    return true;
  }
  console.log("ensureTargetChain provider:", provider);
  console.log("provider.isMetaMask:", provider.isMetaMask);
  if (provider.isMetaMask) {
    return _switchNetwork(provider, chain_id);
  } else {
    return _switchNetwork(provider, chain_id);
    // TODO: support other web3 wallet that's compatible with wallet_switchEthereumChain: Okex, blockto, ...
    // on the Ethereum/BSC/Polygon/Avalanche injected at window.ethereum, follows eip-3326.
  }

  return false;
}

// function _getWalletMeta(provider: any): IClientMeta | undefined {
//   let walletMeta: IClientMeta;
//   if (provider.isMetaMask) {
//     walletMeta = provider.walletMeta;
//   } else if (provider.isWalletConnect) {
//     walletMeta = provider.walletMeta;
//   } else {
//     console.log("{ensureTargetChainActive} Wallet is not supported => SKIP");
//     return undefined;
//   }

//   return walletMeta;
// }

/**
 *
 * @param provider provider from Web3Modal
 * @param chain_id
 */
async function _switchNetwork(
  provider: any,
  chain_id: number
): Promise<boolean> {
  const chainIdHex = "0x" + chain_id.toString(16);
  // const walletMeta = _getWalletMeta(provider)

  /**
   * window.ethereum is for web3 injected like metamask only
   * IF you wanna support multiple wallet (including mobile wallet),
   * you need to use a universal abstract provider from web3provider
   */
  try {
    const r = await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });
    return true;
  } catch (switchError) {
    // @ts-ignore
    if (switchError.code === 4902) {
      const network = chainProfilesIndexed[chain_id];
      const networkConfig = convertIChainData2ChainParameter(network);
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [networkConfig],
        });
        return true;
      } catch (addError) {
        console.log(
          "{ensureTargetChainActive} wallet_addEthereumChain ERROR: ",
          addError
        );
        return false;
      }
    } else {
      return false;
    }
  }
}

function _getProviderOptions(chainIdNumeric: number) {
  const providerOptions: IProviderOptions = {
    binancechainwallet: {
      package: true,
    },

    // Auto recognize your injected wallet: Metamask
    // injected: {},

    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: chainProfilesIndexed[1].rpc_url, // ETH mainnet
          4: chainProfilesIndexed[4].rpc_url, // ETH rinkeby
          56: chainProfilesIndexed[56].rpc_url, // BSC mainnet
          97: chainProfilesIndexed[97].rpc_url, // BSC testnet
          137: chainProfilesIndexed[137].rpc_url, // Polygon
        },

        // Select BSC work on Trust wallet but dont work on metamask
        // https://github.com/Web3Modal/web3modal/blob/72596699b97d231dfaa5ef04110b61b8dc77d57d/src/providers/connectors/walletconnect.ts#L30
        // https://github.com/Web3Modal/web3modal/blob/72596699b97d231dfaa5ef04110b61b8dc77d57d/src/helpers/utils.ts#L198
        // web3modal has not support BSC testnet yet (because Trust wallet not support it).
        // So to support chain 97: // directly add network to this file to tmp test: node_modules/web3modal/dist/index.js
        network: _chainId2Network(chainIdNumeric),

        // This will turn on only some wallet for mobile
        qrcodeModalOptions: {
          mobileLinks: [
            "metamask", // TODO: Enable metamask if it's work, currently it's have connection bugs
            "trust",
            "huobi",
            "coin98",
            "rainbow",
            "argent",
            "imtoken",
            "pillar",
            "bitpay",
            "safepal",
            "coinomi",
            "kyberswap",

            // "kyberswap",
            // "orange",
            // "krystal",
          ],
        },
      },
    },
  };

  return providerOptions;
}

/**
 * List of supported chain_id of web3 is in CHAIN_DATA_LIST in file:
 * node_modules/web3modal/dist/index.js
 */
function _chainId2Network(chainId: number): string {
  switch (chainId) {
    case 1:
      return "mainnet";
    case 3:
      return "ropsten";
    case 4:
      return "rinkeby";
    case 56:
      return "binance";
    case 97:
      return "binance-testnet";
    case 137:
      return "matic";
    default:
      throw new Error(
        "Web3Modal.js__chainId2network: Not supported chain id: " + chainId
      );
  }
}
