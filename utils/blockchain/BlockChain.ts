import { chainProfilesIndexed, IChainData } from "./ChainConfig";
import { ChainSymbol } from "../../src/generated/graphql";

/**
 * Those blockchain config must be the same on the server / database
 */

export enum ChainBranch {
  web3 = "web3", // eth, bsc, polygon, ...
  near = "near",
  polkadot = "polkadot",
  solana = "solana",
  // substrate?
  // octopus?
}

// NOTE: Clone of ChainSymbol on graphql.tsx
export enum ChainNetwork {
  eth = "eth",
  bsc = "bsc",
  polygon = "polygon",
  avax = "avax",
  flow = "flow",
  near = "near",
  polkadot = "polkadot",
  solana = "solana",
}

export function symbol2Network(chainSymbol: ChainSymbol): ChainNetwork {
  return ChainNetwork[chainSymbol.toLowerCase() as keyof typeof ChainNetwork];
}

export const NetworkBranch = {
  [ChainNetwork.eth]: ChainBranch.web3,
  [ChainNetwork.bsc]: ChainBranch.web3,
  [ChainNetwork.polygon]: ChainBranch.web3,
  [ChainNetwork.avax]: ChainBranch.web3,
  [ChainNetwork.flow]: ChainBranch.web3,
  [ChainNetwork.near]: ChainBranch.near,
  [ChainNetwork.polkadot]: ChainBranch.polkadot,
  [ChainNetwork.solana]: ChainBranch.solana,
};

export type GraphqlChainSymbol = ChainNetwork;

export enum Wallet {
  metamask = "metamask",
  bsc = "bsc", // binance wallet chrome extension
  c98 = "c98", //
  wc = "wc", // wallet connect

  near = "near",
  polkadot_js = "polkadot_js",
  solet = "solet",
}

export const NetworkSupportedWallets: Record<ChainNetwork | string, Wallet[]> =
  {
    null: [],

    [ChainNetwork.eth]: [Wallet.metamask, Wallet.wc, Wallet.bsc],
    [ChainNetwork.bsc]: [Wallet.metamask, Wallet.wc, Wallet.bsc],
    [ChainNetwork.polygon]: [Wallet.metamask, Wallet.wc],
    [ChainNetwork.avax]: [],
    [ChainNetwork.flow]: [],

    [ChainNetwork.near]: [Wallet.near],
    [ChainNetwork.polkadot]: [Wallet.polkadot_js],
    [ChainNetwork.solana]: [Wallet.solet],
  };

export const ChainNetworkAvatar: Record<string, string> = {
  undefined: "/assets/crypto/ico-question-mark.png",
  [ChainNetwork.eth]: "/assets/crypto/ico-chain-eth.svg",
  [ChainNetwork.bsc]: "/assets/crypto/ico-chain-bsc.png",
  [ChainNetwork.polygon]: "/assets/crypto/ico-chain-polygon.png",
  [ChainNetwork.near]: "/assets/crypto/ico-chain-near.svg",
  [ChainNetwork.flow]: "/assets/crypto/ico-chain-flow.png",
  [ChainNetwork.avax]: "/assets/crypto/ico-chain-avax.svg",
};

export enum GQL_Currency {
  undefined = "undefined",
  NEAR = "NEAR",
  BUSD = "BUSD",
  USDT = "USDT",
}

export function to_GQL_Currency(symbol: string): GQL_Currency {
  return symbol as GQL_Currency;
}

export const CurrencyAvatar: Record<string, string> = {
  // symbol: url
  undefined: "/assets/crypto/ico-chain-near.svg",
  [GQL_Currency.NEAR]: "/assets/crypto/ico-chain-near.svg",
  [GQL_Currency.BUSD]: "/assets/Box/image125.png",
};

export function getChainNetworkFromChainData(
  c: IChainData
): ChainNetwork | undefined {
  return getChainNetworkFromChainId(c.chain_id);
}

export function getChainNetworkFromChainId(
  chain_id: string | number
): ChainNetwork | undefined {
  const map: Record<string | number, ChainNetwork> = {
    "1": ChainNetwork.eth,
    "3": ChainNetwork.eth,
    "4": ChainNetwork.eth,
    "56": ChainNetwork.bsc,
    "97": ChainNetwork.bsc,
    "137": ChainNetwork.polygon,
  };
  const a = map[chain_id];
  if (a === undefined) {
    console.warn(
      `getChainNetworkFromChainId: Not defined for chain: ${chain_id}`
    );
  }
  return a ?? undefined;
}

export function getCurrencyFromChainId(chainId: number) {
  return chainProfilesIndexed[chainId].native_currency.name;
}
