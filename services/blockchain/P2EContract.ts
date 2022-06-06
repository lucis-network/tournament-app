
import { ethers } from "ethers";
import EthersService from "./Ethers";
import Erc721EnumerableAbi from "./abi/Erc721Abi.json";
export class P2EContract extends EthersService {
  constructor(web3Provider: ethers.providers.Web3Provider) {
    super(web3Provider);
  }

  async getNFTsByOwner(owner: string) {

  }
  private getContractWithSignerErc721Enumerable(
    contractAddress: string
  ): ethers.Contract {
    return new ethers.Contract(contractAddress, Erc721EnumerableAbi, this.getSigner());
  }

  async requestApproveNFTForAll(
    address: string,
    nftAddress: string
  ): Promise<boolean> {
    const contract = this.getContractWithSignerErc721Enumerable(nftAddress);
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

  async depositNFT(tokenId: string, nftContract: string) {
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