import { ethers } from "ethers";
import TokenErc20Abi from "./abi/TokenErc20Abi.json";
import Erc721Abi from "./abi/Erc721Abi.json";
import LPrize from "./abi/LPrize.json";
import LDonate from "./abi/LDonate.json";
import { makeError } from "../../utils/Error";
import BigNumber from "bignumber.js";
/*
Usage:
import EthersService from 'service/blockchain/Ethers'
import { nonReactive as ConnectWalletStore_NonReactiveData } from "components/Auth/ConnectWalletStore";

if (!ConnectWalletStore_NonReactiveData.web3Provider) {
  throw makeError("Need to connect your wallet first");
}

const ethersService = new EthersService(ConnectWalletStore_NonReactiveData.web3Provider);
const address = await ethersService.getMyAddress();

 */

type ResultTranferFT = {
  txHash: string;
  blockNumber?: number;
  error: null;
};

export default class EtherContract {
  static ErrorCode = {
    NotInitialized: "NotInitialized",
  };

  private _web3Provider?: ethers.providers.Web3Provider;

  constructor(web3Provider: ethers.providers.Web3Provider) {
    this.web3Provider = web3Provider;
  }

  get web3Provider(): ethers.providers.Web3Provider | undefined {
    return this._web3Provider;
  }

  set web3Provider(value: ethers.providers.Web3Provider | undefined) {
    this._web3Provider = value;
  }

  protected getSigner(): ethers.providers.JsonRpcSigner {
    if (!this._web3Provider) {
      throw makeError(
        EtherContract.ErrorCode.NotInitialized,
        "Contract._web3Provider was not set"
      );
    }

    return this._web3Provider.getSigner();
  }

  private getContractWithSignerErc20(contractAddress: string): ethers.Contract {
    return new ethers.Contract(
      contractAddress,
      TokenErc20Abi.abi,
      this.getSigner()
    );
  }

  private getContractWithSignerErc721(
    contractAddress: string
  ): ethers.Contract {
    return new ethers.Contract(contractAddress, Erc721Abi, this.getSigner());
  }

  async signMessage(
    message: string,
  ): Promise<string> {
    const signer = this.getSigner();

    return await signer.signMessage(message);
  }

  getAddressFromSignature(message: string, signature: string): string {
    return ethers.utils.verifyMessage(message, signature);

  }

  async getBalanceOf(
    address: string,
    erc20ContractAddress: string
  ): Promise<number> {
    const contract = await this.getContractWithSignerErc20(
      erc20ContractAddress
    );
    return contract.balanceOf(address);
  }

  /**
   * If connect with ETH will get BUSD
   * BSC get BNB
   * Poligon get Matic
   * ...
   */
  async getNativeBalance(address: string) {
    const r = await this._web3Provider?.getBalance(address);
    // const balance = ethers.utils.formatEther(r)

    let balance;
    if (r) {
      balance = ethers.utils.formatEther(r);
    }

    return balance;
  }

  async getMyAddress() {
    return this.getSigner().getAddress();
  }

  /**
   * Check allowance for the process of:
   * erc20 contract give permission for the address/contract to spend money from
   *
   * @param address NFT boxes, event boxes, the spender
   * @param erc20Address The currency that address spend
   * @return number|null amount in Wei
   */
  async getMyAllowanceOf(
    address: string,
    erc20Address: string
  ): Promise<number | null> {
    const myAddress = await this.getMyAddress();
    const contract = await this.getContractWithSignerErc20(erc20Address);

    const res = await contract.allowance(myAddress, address).catch((e: any) => {
      console.error("{getAllowance} catch e: ", e);
      return null;
    });

    return res === null ? res : ethers.utils.formatEther(res);
  }

  /**
   * erc20 contract give permission for the address/contract to spend money from
   *
   * @param address NFT boxes, event boxes, the spender
   * @param erc20Address The currency that address spend
   */
  async requestApproval(
    address: string,
    erc20Address: string
  ): Promise<boolean> {
    const contract = await this.getContractWithSignerErc20(erc20Address);
    return contract
      .approve(address, ethers.constants.MaxUint256)
      .then((r: any) => {
        console.log("{EtherContract.requestApproval} r: ", r);
        if (r.hash) {
          console.log("{EtherContract.requestApproval} r.hash", r.hash);
          return true;
        } else {
          return true;
        }
      });
  }

  async transferNft(
    toAddress: string,
    nftBoxContractAddress: string,
    nftTokenId: number
  ): Promise<any | false> {
    try {
      // const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
      // const boxContract = new ethers.Contract(
      //   nftBoxContractAddress,
      //   erc721ABI,
      //   ethersProvider
      // )
      // const boxContractSigner = boxContract.connect(ethersProvider.getSigner())
      // const [myAddress] = await window.ethereum.request({
      //   method: 'eth_requestAccounts',
      // })

      const myAddress = await this.getMyAddress();
      const boxContractSigner = this.getContractWithSignerErc721(
        nftBoxContractAddress
      );

      const transaction = await boxContractSigner.transferFrom(
        myAddress,
        toAddress,
        nftTokenId
      );
      return transaction.wait();
    } catch (error) {
      console.log("{EtherContract.transferNft} error: ", error);
      return false;
    }
  }
  fmt = {
    decimalSeparator: ",",
    groupSeparator: ".",
    groupSize: 3,
    secondaryGroupSize: 2,
  };

  private getContractWithLPrize(contractAddress: string): ethers.Contract {
    console.log("contractAddress: ", contractAddress);
    return new ethers.Contract(contractAddress, LPrize.abi, this.getSigner());
  }

  private getContractWithLDonation(contractAddress: string): ethers.Contract {
    console.log("contractAddress: ", contractAddress);
    return new ethers.Contract(contractAddress, LDonate.abi, this.getSigner());
  }

  async transferFT(
    toAddress: string,
    tokenAddress: string,
    amount: number
  ): Promise<ResultTranferFT> {
    const result: ResultTranferFT = {
      txHash: "",
      error: null,
    };
    try {
      const contract = await this.getContractWithSignerErc20(tokenAddress);
      const decimal = await contract.decimals();

      const totalAmount = new BigNumber(amount)
        .multipliedBy(Math.pow(10, decimal))
        .toFormat({ groupSeparator: "" });

      const transaction = await contract.transfer(toAddress, totalAmount);
      const txHash = transaction.hash;
      result.blockNumber = transaction.blockNumber;
      result.txHash = txHash;
    } catch (error) {
      console.log("{EtherContract.transferNft} error: ", error);

      //@ts-ignore
      result.error = error;
    }
    return result;
  }

  // async approveToken(tokenAddress: string, spender: string, amount: number) {
  //   const contract = this.getContractWithSignerErc20(tokenAddress);
  //   //const decimal = contract.decimals();

  //   const totalAmount = new BigNumber(5 * 2)
  //     .multipliedBy(Math.pow(10, 18))
  //     .toFormat({ groupSeparator: "" });

  //   const bool = await contract.approve(spender, totalAmount);
  //   console.log("bool", bool);
  //   return bool;
  // }

  async initTournament(
    userId: string,
    tournamentUid: string,
    amount: number,
    paymentToken: string,
    contractAddress: string
  ): Promise<ResultTranferFT> {
    const result: ResultTranferFT = {
      txHash: "",
      error: null,
    };
    try {
      const contract = await this.getContractWithLPrize(contractAddress);

      const totalAmount = new BigNumber(amount)
        .multipliedBy(Math.pow(10, 18))
        .toFormat({ groupSeparator: "" });

      const transaction = await contract.initTournament(
        userId,
        tournamentUid,
        totalAmount,
        paymentToken
      );

      // const waitResult = await transaction.wait();
      // console.log("waitResult_initTournament : ", waitResult);
      // console.log("transaction:", transaction);

      const txHash = transaction.hash;
      // result.blockNumber = transaction.blockNumber;

      result.txHash = txHash;
    } catch (error) {
      console.log("{EtherContract.initTournament} error: ", error);

      //@ts-ignore
      result.error = error;
    }
    return result;
  }

  async donate(
    tournamentUid: string,
    userId: string,
    teamUid: string,
    refereeUid: string,
    amount: number,
    paymentToken: string,
    contractAddress: string,
    types?: string
  ): Promise<ResultTranferFT> {
    const result: ResultTranferFT = {
      txHash: "",
      error: null,
    };
    try {
      const contract = this.getContractWithLDonation(contractAddress);

      const totalAmount = new BigNumber(amount)
        .multipliedBy(Math.pow(10, 18))
        .toFormat({ groupSeparator: "" });

      let transaction;
      if (types === "PLAYER") {
        transaction = await contract.donateUser(
          tournamentUid,
          userId,
          totalAmount,
          paymentToken
        );
      }

      if (types === "TEAM") {
        transaction = await contract.donateTeam(
          tournamentUid,
          teamUid,
          totalAmount,
          paymentToken
        );
      }

      if (types === "TOURNAMENT") {
        transaction = await contract.donateTournament(
          tournamentUid,
          totalAmount,
          paymentToken
        );
      }

      if (types === "REFEREE") {
        transaction = await contract.donateUser(
          tournamentUid,
          refereeUid,
          totalAmount,
          paymentToken
        );
      }
      // await transaction.wait();
      // console.log("transaction:", transaction);

      const txHash = transaction.hash;
      result.txHash = txHash;
      // result.blockNumber = transaction.blockNumber;
    } catch (error) {
      console.log("{EtherContract.donate} error: ", error);

      //@ts-ignore
      result.error = error;
    }
    return result;
  }

  async becomeSponsor(
    userId: string,
    tournamentUid: string,
    amount: number,
    paymentToken: string,
    contractAddress: string
  ): Promise<ResultTranferFT> {
    const result: ResultTranferFT = {
      txHash: "",
      error: null,
    };
    try {
      const contract = await this.getContractWithLPrize(contractAddress);

      const totalAmount = new BigNumber(amount)
        .multipliedBy(Math.pow(10, 18))
        .toFormat({ groupSeparator: "" });

      const transaction = await contract.becomeSponsor(
        userId,
        tournamentUid,
        totalAmount,
        paymentToken
      );
      // await transaction.wait();
      // console.log("transaction:", transaction);

      const txHash = transaction.hash;
      result.txHash = txHash;
      // result.blockNumber = transaction.blockNumber;
    } catch (error) {
      console.log("{EtherContract.becomeSponsor} error: ", error);

      //@ts-ignore
      result.error = error;
    }
    return result;
  }
}
