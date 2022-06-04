
import { ethers } from "ethers";
import EthersService from "./Ethers";

export class P2EContract extends EthersService {
    constructor(web3Provider: ethers.providers.Web3Provider) {
        super(web3Provider);
    }



}