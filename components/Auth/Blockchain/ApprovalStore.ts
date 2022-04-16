import { IClientMeta } from "@walletconnect/types";
import { ethers } from "ethers";
import { Network } from "@ethersproject/networks";
import { makeAutoObservable } from "mobx";
import Web3Modal from "web3modal";

import { to_hex_str } from "utils/String";
import { isClient } from "../../../utils/DOM";
import {
  ChainNetwork,
  GQL_Currency,
} from "../../../utils/blockchain/BlockChain";

type ApproveModalState = {
  visible?: boolean;
  symbol?: any;
};

type IApprovalStore = {
  modal?: ApproveModalState;

  busd_allowance?: number;
};

export const ETHER_MIN_ALLOWANCE = 1e12;
class ApprovalStore implements IApprovalStore {
  modal: ApproveModalState = {
    visible: false,
    symbol: undefined,
  };

  // ------ currencies ---------
  busd_allowance = 0;
  allowance: { [key: string]: number } = {};

  get isCurrencyEnabled_BUSD(): boolean {
    return this.busd_allowance >= ETHER_MIN_ALLOWANCE;
  }

  isCurrencyEnabled(c: GQL_Currency): boolean {
    switch (c) {
      case GQL_Currency.BUSD:
        return this.isCurrencyEnabled_BUSD;
      case GQL_Currency.USDT:
        //Todo: implement support it
        return this.allowance[c] >= ETHER_MIN_ALLOWANCE;
      case GQL_Currency.undefined:
        return true;
      default:
        throw new Error("{isCurrencyEnabled} Did not handle: " + c);
    }
  }

  setCurrencyEnabled(c: GQL_Currency) {
    switch (c) {
      case GQL_Currency.BUSD:
        this.busd_allowance = ETHER_MIN_ALLOWANCE;
      case GQL_Currency.undefined:
        break;
      default:
        throw new Error("{isCurrencyEnabled} Did not handle: " + c);
    }
  }

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Use this will trigger component re-render only once with observer()
   */
  setState(s: IApprovalStore) {
    s.busd_allowance !== undefined && (this.busd_allowance = s.busd_allowance);
    s.modal !== undefined && (this.modal = s.modal!);
  }

  setModalState(s: ApproveModalState) {
    s.visible !== undefined && (this.modal.visible = s.visible);
    s.symbol !== undefined && (this.modal.symbol = s.symbol);
  }
}

const s = new ApprovalStore();
if (isClient) {
  // @ts-ignore
  window.tmp__ApprovalStore = s;
}

// default is reactive data
export default s;
