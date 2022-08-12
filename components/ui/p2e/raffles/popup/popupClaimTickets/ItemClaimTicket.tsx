import {Button, message, Modal} from "antd";
import s from "./index.module.sass";
import {CurrrencyType, RaffleDetail, UserWonTicketGql} from "../../../../../../src/generated/graphql_p2e";
import {useMutation} from "@apollo/client";
import {CLAIM_RAFFLE_TICKETS} from "../../../../../../hooks/p2e/useRaffleDetail";
import {handleGraphqlErrors} from "../../../../../../utils/apollo_client";
import { useState } from "react";

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

  const handleClaim = async () => {
    setIsLoading(true);

    if(dataRaffleDetail?.prize_category?.currency_type === CurrrencyType.Decentralized) {
      await signMetamask();
    }

    try {
      await claimRaffleTicket({
        variables: {
          raffle_uid : raffleUid,
          ticket_number: item?.ticket_number,
        },
        onCompleted: (data) => {
          setIsLoading(false);
          setIsDisable(true);

          if(data?.claimRaffle?.required_contact) {
            openPopupContactRaffes();
          }
          else {
            message.success("Claim success!");
          }
        }
      })
    } catch (error: any) {
      handleGraphqlErrors(error, (code) => {
        setIsLoading(false);
        switch (code) {
          case "HAS_CLAIMED":
            message.error("You had claim this ticket!");
            return;
          default:
            message.error("Something was wrong! Please contact to Lucis network!");
            return;
        }
      })
    }
  }

  const signMetamask = async () => {

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
