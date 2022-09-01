import { makeAutoObservable } from "mobx";
import { isClientDevMode } from "utils/Env";
import {UserTicketGql} from "../generated/graphql_p2e";


class RafflesStore {

  private _dataWinTicket?: Array<UserTicketGql | undefined> = [];
  private _dataWinTicketLastUpdated?: number;

  constructor() {
    makeAutoObservable(this);
  }

  get dataWinTicket(): Array<UserTicketGql | undefined> {
    //@ts-ignore
    return this._dataWinTicket;
  }

  set dataWinTicket(value: Array<UserTicketGql | undefined>) {
    this._dataWinTicket = value;
    this._dataWinTicketLastUpdated = Date.now();
  }

  get dataWinTicketLastUpdated(): number | undefined {
    return this._dataWinTicketLastUpdated;
  }
}

const s = new RafflesStore();
export default s;

if (isClientDevMode) {
  // @ts-ignore
  window.tmp__RafflesStore = s;
}
