import {Button, message as antMessage, message, Modal} from "antd";
import s from "./index.module.sass";
import {CurrrencyType, RaffleDetail, UserWonTicketGql} from "../../../../../../src/generated/graphql_p2e";
import {useMutation} from "@apollo/client";
import {CLAIM_RAFFLE_TICKETS} from "../../../../../../hooks/p2e/useRaffleDetail";
import {handleGraphqlErrors} from "../../../../../../utils/apollo_client";
import { useState } from "react";
import EtherContract from "../../../../../../services/blockchain/Ethers";
import ConnectWalletStore, {nonReactive as ConnectWalletStore_NonReactiveData} from "../../../../../Auth/ConnectWalletStore";
import AuthBoxStore from "../../../../../Auth/components/AuthBoxStore";

type Props = {
  item?: UserWonTicketGql;
  raffleUid?: string;
  openPopupContactRaffes: () => void;
  dataRaffleDetail?: RaffleDetail;
};

const ItemClaimTicket = (props: Props) => {
  const { item, raffleUid, openPopupContactRaffes, dataRaffleDetail } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [claimRaffleTicket] = useMutation(CLAIM_RAFFLE_TICKETS, {
    context: {
      endpoint: 'p2e'
    }
  })
  const {address} = ConnectWalletStore;

  const handleClaim = async () => {
    try {
      let address;
      if(dataRaffleDetail?.prize_category?.currency_type === CurrrencyType.Decentralized) {
        if (!ConnectWalletStore.address) {
          AuthBoxStore.connectModalVisible = true;
          return;
        }
        address = ConnectWalletStore.address;

        const bool = await signMetamask();
        if(!bool) return;
      }
      setIsLoading(true);
      const res = await claimRaffleTicket({
        variables: {
          raffle_uid : raffleUid,
          ticket_number: item?.ticket_number,
          address: address,
        },
        onCompleted: (data) => {
          setIsLoading(false);
          setIsDisable(true);
          message.success("Claim success!");
        }
      })
    } catch (error: any) {
      handleGraphqlErrors(error, (code) => {
        setIsLoading(false);
        switch (code) {
          case "HAS_CLAIMED":
            message.error("You had claim this ticket!");
            return;
          case "INSUFFICIENT_FUNDS":
            message.error("Something went wrong. Please contact Lucis for support and detailed information.");
            return;
          default:
            message.error("Something went wrong. Please contact Lucis for support and detailed information.");
            return;
        }
      })
    }
  }

  const signMetamask = async () => {
    const ether = new EtherContract(ConnectWalletStore_NonReactiveData.web3Provider as any);
    const message = "Sign to claim your reward!";
    try {
      const signature = await ether.signMessage(message);
      return true;
      // const addressFromSignature = ether.getAddressFromSignature(message, signature);
    } catch (e) {
      antMessage.error("User denied");
      return false;
    }
  }

  return (
    <div className={s.item}>
      {isDisable || item?.is_claimed as boolean ?
        <>
          <span className={`${s.itemTickets} ${s.itemTicketsClaimed}`}>#{item?.ticket_number}</span>
          <div className={s.imgChecked}>
            <img  src="/assets/Raffles/checked.svg" alt=""/>
          </div>
        </>
         :
        <>
          <span className={s.itemTickets}>#{item?.ticket_number}</span>
          <Button loading={isLoading} disabled={isDisable || item?.is_claimed as boolean} className={s.itemBtn}
                  onClick={() => handleClaim()}>Claim</Button>
        </>
      }
    </div>
  );
};

export default ItemClaimTicket;
