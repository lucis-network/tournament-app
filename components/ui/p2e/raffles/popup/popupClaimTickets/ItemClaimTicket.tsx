import {Button, message, Modal} from "antd";
import s from "./index.module.sass";
import {UserWonTicketGql} from "../../../../../../src/generated/graphql_p2e";
import {useMutation} from "@apollo/client";
import {CLAIM_RAFFLE_TICKETS} from "../../../../../../hooks/p2e/useRaffleDetail";
import {handleGraphqlErrors} from "../../../../../../utils/apollo_client";
import { useState } from "react";

type Props = {
  item?: UserWonTicketGql;
  raffleUid?: string;
};

const ItemClaimTicket = (props: Props) => {
  const { item, raffleUid } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [claimRaffleTicket] = useMutation(CLAIM_RAFFLE_TICKETS, {
    context: {
      endpoint: 'p2e'
    }
  })

  const handleClaim = async () => {
    setIsLoading(true);
    try {
      await claimRaffleTicket({
        variables: {
          raffle_uid : raffleUid,
          ticket_number: item?.ticket_number,
        },
        onCompleted: (data) => {
          message.success("Claim success!");
          setIsLoading(false);
          setIsDisable(true);
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

  return (
    <div className={s.item}>
      <span className={s.itemTickets}>#{item?.ticket_number}</span>
      {isDisable || item?.is_claimed as boolean ?
        <img src="/assets/P2E/raffles/checked.svg"/> :
        <Button loading={isLoading} disabled={isDisable || item?.is_claimed as boolean} className={s.itemBtn}
                onClick={() => handleClaim()}>Claim</Button>
      }
    </div>
  );
};

export default ItemClaimTicket;
