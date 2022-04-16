import { toDict } from 'utils/Array'
import { Network } from "@ethersproject/networks";
import { ChainNetwork } from "./BlockChain";

// https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
const INFURA_KEY = '9aa3d95b3bc440fa88ea12eaa4456161'

export interface IAssetData {
  symbol: string
  name: string
  decimals: string
  contractAddress: string
  balance?: string
}

export interface IChainData {
  name: string
  short_name: string
  chain: string
  network: string
  chain_id: number
  network_id: number
  rpc_url: string
  native_currency: IAssetData
  blockExplorerUrls?: string[]
  iconUrls?: string[]
}

export const BSC_MainNet: IChainData = {
  name: 'BSC MainNet',
  short_name: 'bsc',
  chain: 'smartchain',
  network: 'mainnet',
  chain_id: 56,
  network_id: 56,
  rpc_url: 'https://bsc-dataseed.binance.org/',
  blockExplorerUrls: ['https://bscscan.com'],
  native_currency: {
    symbol: 'BNB',
    name: 'BNB',
    decimals: '18',
    contractAddress: '',
    balance: '',
  },
}

export const BSC_TestNet: IChainData = {
  name: 'BSC TestNet',
  short_name: 'bsc_testnet',
  chain: 'smartchain',
  network: 'testnet',
  chain_id: 97,
  network_id: 97,
  rpc_url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  blockExplorerUrls: ['https://testnet.bscscan.com'],
  native_currency: {
    symbol: 'BNB',
    name: 'BNB',
    decimals: '18',
    contractAddress: '',
    balance: '',
  },
}

const chainProfiles: IChainData[] = [
  {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chain_id: 1,
    network_id: 1,
    rpc_url: 'https://mainnet.infura.io/v3/' + INFURA_KEY,
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Ropsten',
    short_name: 'rop',
    chain: 'ETH',
    network: 'ropsten',
    chain_id: 3,
    network_id: 3,
    rpc_url: 'https://ropsten.infura.io/v3/' + INFURA_KEY,
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Rinkeby',
    short_name: 'rin',
    chain: 'ETH',
    network: 'rinkeby',
    chain_id: 4,
    network_id: 4,
    rpc_url: 'https://rinkeby.infura.io/v3/' + INFURA_KEY,
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Görli',
    short_name: 'gor',
    chain: 'ETH',
    network: 'goerli',
    chain_id: 5,
    network_id: 5,
    rpc_url: 'https://goerli.infura.io/v3/' + INFURA_KEY,
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Kovan',
    short_name: 'kov',
    chain: 'ETH',
    network: 'kovan',
    chain_id: 42,
    network_id: 42,
    rpc_url: 'https://kovan.infura.io/v3/' + INFURA_KEY,
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Classic Mainnet',
    short_name: 'etc',
    chain: 'ETC',
    network: 'mainnet',
    chain_id: 61,
    network_id: 1,
    rpc_url: 'https://ethereumclassic.network',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  BSC_MainNet,
  BSC_TestNet,
  {
    name: 'Polygon',
    short_name: 'pol',
    chain: 'MATIC',
    network: 'mainnet',
    chain_id: 137,
    network_id: 137,
    rpc_url: 'https://polygon-rpc.com',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
]

export default chainProfiles

export const chainProfilesIndexed: Record<number, IChainData> = toDict(
  chainProfiles,
  'chain_id'
)

interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}

export function convertIChainData2ChainParameter(
  c: IChainData
): AddEthereumChainParameter {
  return {
    chainId: '0x' + c.chain_id.toString(16), // A 0x-prefixed hexadecimal string
    chainName: c.name,
    nativeCurrency: {
      name: c.native_currency.name,
      symbol: c.native_currency.symbol, // 2-6 characters long
      decimals: parseInt(c.native_currency.decimals),
    },
    rpcUrls: [c.rpc_url],
    blockExplorerUrls: c.blockExplorerUrls,
    iconUrls: c.iconUrls, // Currently ignored.
  }
}


export function getChainDataFromNetwork(network: Network): IChainData | undefined {
  try {
    return chainProfilesIndexed[network.chainId]
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export function getAppNetworkFriendlyName(network?: Network): string {
  if (network) {
    const app_network = getChainDataFromNetwork(network);
    if (app_network) {
      return app_network.name;
    }
  }

  return '';
}

/**
 * List of supported chain_id of web3 is in CHAIN_DATA_LIST in file:
 * node_modules/web3modal/dist/index.js
 */
export const CHAIN_DATA_LIST = {
  1: {chainId: 1, chain: "ETH", network: "mainnet", networkId: 1},
  2: {chainId: 2, chain: "EXP", network: "expanse", networkId: 1},
  3: {chainId: 3, chain: "ETH", network: "ropsten", networkId: 3},
  4: {chainId: 4, chain: "ETH", network: "rinkeby", networkId: 4},
  5: {chainId: 5, chain: "ETH", network: "goerli", networkId: 5},
  6: {chainId: 6, chain: "ETC", network: "kotti", networkId: 6},
  8: {chainId: 8, chain: "UBQ", network: "ubiq", networkId: 88},
  9: {chainId: 9, chain: "UBQ", network: "ubiq-testnet", networkId: 2},
  10: {chainId: 10, chain: "ETH", network: "optimism", networkId: 10},
  11: {chainId: 11, chain: "META", network: "metadium", networkId: 11},
  12: {chainId: 12, chain: "META", network: "metadium-testnet", networkId: 12},
  18: {chainId: 18, chain: "TST", network: "thundercore-testnet", networkId: 18},
  22: {chainId: 22, chain: "LYX", network: "lukso-l14-testnet", networkId: 22},
  23: {chainId: 23, chain: "LYX", network: "lukso-l15-testnet", networkId: 23},
  30: {chainId: 30, chain: "RSK", network: "rsk", networkId: 30},
  31: {chainId: 31, chain: "RSK", network: "rsk-testnet", networkId: 31},
  42: {chainId: 42, chain: "ETH", network: "kovan", networkId: 42},
  56: {chainId: 56, chain: "BSC", network: "binance", networkId: 56},
  60: {chainId: 60, chain: "GO", network: "gochain", networkId: 60},
  61: {chainId: 61, chain: "ETC", network: "etc", networkId: 1},
  62: {chainId: 62, chain: "ETC", network: "etc-morden", networkId: 2},
  63: {chainId: 63, chain: "ETC", network: "etc-testnet", networkId: 7},
  64: {chainId: 64, chain: "ELLA", network: "ellaism", networkId: 64},
  69: {chainId: 69, chain: "ETH", network: "optimism-kovan", networkId: 69},
  76: {chainId: 76, chain: "MIX", network: "mix", networkId: 76},
  77: {chainId: 77, chain: "POA", network: "poa-sokol", networkId: 77},
  88: {chainId: 88, chain: "TOMO", network: "tomochain", networkId: 88},
  97: {chainId: 97, chain: "BSC", network: "binance-testnet", networkId: 97},
  99: {chainId: 99, chain: "POA", network: "poa-core", networkId: 99},
  100: {chainId: 100, chain: "XDAI", network: "xdai", networkId: 100},
  101: {chainId: 101, chain: "ETI", network: "etherinc", networkId: 1},
  108: {chainId: 108, chain: "TT", network: "thundercore", networkId: 108},
  162: {chainId: 162, chain: "PHT", network: "sirius", networkId: 162},
  163: {chainId: 163, chain: "PHT", network: "lightstreams", networkId: 163},
  211: {chainId: 211, chain: "FTN", network: "freight", networkId: 0},
  250: {chainId: 250, chain: "FTM", network: "fantom", networkId: 250},
  269: {chainId: 269, chain: "HPB", network: "hpb", networkId: 100},
  385: {chainId: 385, chain: "CRO", network: "lisinski", networkId: 385},
  820: {chainId: 820, chain: "CLO", network: "callisto", networkId: 1},
  821: {chainId: 821, chain: "CLO", network: "callisto-testnet", networkId: 2},
  137: {chainId: 137, chain: "MATIC", network: "matic", networkId: 137},
  42161: {chainId: 42161, chain: "ETH", network: "arbitrum", networkId: 42161},
  42220: {chainId: 42220, chain: "CELO", network: "celo", networkId: 42220},
  44787: {chainId: 44787, chain: "CELO", network: "celo-alfajores", networkId: 44787},
  62320: {chainId: 62320, chain: "CELO", network: "celo-baklava", networkId: 62320},
  80001: {chainId: 80001, chain: "MUMBAI", network: "mumbai", networkId: 80001},
  43113: {chainId: 43113, chain: "AVAX", network: "avalanche-fuji-testnet", networkId: 43113},
  43114: {chainId: 43114, chain: "AVAX", network: "avalanche-fuji-mainnet", networkId: 43114},
  246529: {chainId: 246529, chain: "ARTIS sigma1", network: "artis-s1", networkId: 246529},
  246785: {chainId: 246785, chain: "ARTIS tau1", network: "artis-t1", networkId: 246785},
  1007: {chainId: 1007, chain: "NewChain TestNet", network: "newchain-testnet", networkId: 1007},
  1012: {chainId: 1012, chain: "NewChain MainNet", network: "newchain-mainnet", networkId: 1012},
  421611: {chainId: 421611, chain: "ETH", network: "arbitrum-rinkeby", networkId: 421611}
}