
import { ethers } from "ethers";
import EthersService from "./Ethers";
import LucisNFT from "./abi/LucisNFT.json";
import NFTManager from "./abi/NFTManager.json";
export class P2EOnChainService extends EthersService {

  private lucisAddress: string;
  private nftManagerAddress: string;
  constructor(web3Provider: ethers.providers.Web3Provider, _lucisAddress: string, _nftManagerAddress: string) {
    super(web3Provider);
    this.lucisAddress = _lucisAddress;
    this.nftManagerAddress = _nftManagerAddress;

  }

  async getNFTsByOwner<T>(owner: string): Promise<Array<{ tokenId: string, detail: T }>> {
    const contract = this.getLucisNFTContract();

    const balanceNFTOfOwner = await contract.balanceOf(owner);
    const result: Array<{ tokenId: string, detail: T }> = [];
    for (let i = 0; i < balanceNFTOfOwner; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(owner, i);

      const nftDetail = await contract.tokenDetail(tokenId);
      result.push({ tokenId: tokenId.toString(), detail: nftDetail });
    }

    return result;
  }
  private getLucisNFTContract(): ethers.Contract {
    return new ethers.Contract(this.lucisAddress, LucisNFT.abi, this.getSigner());
  }

  private getNFTManagerContract(): ethers.Contract {
    return new ethers.Contract(this.nftManagerAddress, NFTManager.abi, this.getSigner());
  }

  async requestApproveNFTForAll(address: string): Promise<boolean> {
    const contract = this.getLucisNFTContract();
    return contract
      .setApprovalForAll(address, true)
      .then((r: any) => {
        console.log("{EtherContract.setApprovalForAll} r: ", r);
        if (r.hash) {
          console.log("{EtherContract.setApprovalForAll} r.hash", r.hash);
          return true;
        } else {
          return true;
        }
      })
      .catch((error: any) => {
        console.error(error);
        return false;
      });
  }

  async isApprovedForAll(): Promise<boolean> {
    try {
      const contract = this.getLucisNFTContract();
      const myAddress = await this.getMyAddress();
      const approved = await contract.isApprovedForAll(myAddress, this.nftManagerAddress);
      return approved;
    }
    catch (error: any) {
      console.error(error);
      return false;
    };
  }

  async equipNFT(tokenId: string): Promise<boolean> {
    try {
      const nftManager = this.getNFTManagerContract();

      const transaction = await nftManager.equipNFT(tokenId);
      return transaction.wait();
    } catch (error) {
      console.log("{NFTManager.equipNFT} error: ", error);
      return false;
    }
  }
  async changeNFT(preTokenId: string, nextTokenId: string, nftContract: string) {
    // try {

    //   const myAddress = await this.getMyAddress();
    //   const manageNFTContract = this.getContractWithSignerErc721Enumerable(
    //     nftContract
    //   );

    //   const transaction = await manageNFTContract.transferFrom(
    //     myAddress,
    //     toAddress,
    //     nftTokenId
    //   );
    //   return transaction.wait();
    // } catch (error) {
    //   console.log("{EtherContract.transferNft} error: ", error);
    //   return false;
    // }
  }

  async withdrawNFT(tokenId: string, nftContract: string) {
    // try {

    //   const myAddress = await this.getMyAddress();
    //   const manageNFTContract = this.getContractWithSignerErc721Enumerable(
    //     nftContract
    //   );

    //   const transaction = await manageNFTContract.transferFrom(
    //     myAddress,
    //     toAddress,
    //     nftTokenId
    //   );
    //   return transaction.wait();
    // } catch (error) {
    //   console.log("{EtherContract.transferNft} error: ", error);
    //   return false;
    // }
  }

}