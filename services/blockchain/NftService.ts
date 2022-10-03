import {BigNumber, ethers} from "ethers";
import EthersService from "./Ethers";
import LucisNFT from "./abi/LucisNFT.json";
import BoxAbi from "./abi/BoxAbi.json";

export class NftService extends EthersService {

  private _boxAddress: string;
  private _nftAddress: string;
  private _boxId: number;
  // private lucisBoxAddress: string;
  constructor(web3Provider: ethers.providers.Web3Provider, boxAddress: string = "", nftAddress: string = "", boxId: number = 1) {
    super(web3Provider);
    this._boxAddress = boxAddress;
    this._nftAddress = nftAddress;
    this._boxId = boxId;

  }

  async getNFTsByOwner<T>(owner: string): Promise<Array<number>> {
    const contract = this.getLucisNFTContract();

    const balanceNFTOfOwner = await contract.balanceOf(owner);
    const result: Array<number> = [];
    for (let i = 0; i < balanceNFTOfOwner; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(owner, i);

      result.push(BigNumber.from(tokenId).toNumber());
    }

    return result;
  }

  async getBoxBalanceByOwner<T>(owner: string): Promise<Array<{ tokenId: string, detail: T }>> {
    const contract = this.getLucisBoxContract();

    return await contract.balanceOf(owner, this._boxId);
  }

  async openBox(): Promise<any> {
    const contract = this.getLucisBoxContract();

    return await contract.summonItem();
  }

  private getLucisNFTContract(): ethers.Contract {
    return new ethers.Contract(this._nftAddress, LucisNFT.abi, this.getSigner());
  }
  private getLucisBoxContract(): ethers.Contract {
    return new ethers.Contract(this._boxAddress, BoxAbi, this.getSigner());
  }



}