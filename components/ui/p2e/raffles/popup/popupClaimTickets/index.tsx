import {Button, message, Modal} from "antd";
import s from "./index.module.sass";
import {UserWonTicketGql} from "../../../../../../src/generated/graphql_p2e";
import {useMutation} from "@apollo/client";
import {CLAIM_RAFFLE_TICKETS} from "../../../../../../hooks/p2e/useRaffleDetail";
import {handleGraphqlErrors} from "../../../../../../utils/apollo_client";
import ItemClaimTicket from "./ItemClaimTicket";

type Props = {
  closePopupClaimTicket: () => void;
  status: boolean;
  dataMyWonTickets?: UserWonTicketGql[];
  raffleUid?: string;
};

const PopupClaimTicket = (props: Props) => {
  const { status, closePopupClaimTicket, dataMyWonTickets, raffleUid } = props;
  const [claimRaffleTicket] = useMutation(CLAIM_RAFFLE_TICKETS, {
    context: {
      endpoint: 'p2e'
    }
  })

  const handleClaim = async (item: UserWonTicketGql) => {
    console.log(item);
    try {
      await claimRaffleTicket({
        variables: {
          raffle_uid : raffleUid,
          ticket_number: item.ticket_number,
        },
        onCompleted: (data) => {
          message.success("Claim success!");
        }
      })
    } catch (error: any) {
      handleGraphqlErrors(error, (code) => {
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
    <Modal
      visible={status}
      centered
      className={s.content_modal}
      footer={null}
      //title="Success"
      onCancel={closePopupClaimTicket}
    >
      <div>
        <div className={s.title}>
          <p className={s.titleSuccess}>CONGRATULATIONS</p>
          <p className={s.titleTicket}>Your won raffles</p>
        </div>
        <div className={s.tickets}>
          {
            dataMyWonTickets ? dataMyWonTickets.map((item, index) => {
              return(
                // <div className={s.item} key={`${item.uid}${index}`}>
                //   <span className={s.itemTickets}>#{item.ticket_number}</span>
                //   <Button className={s.itemBtn} onClick={() => handleClaim(item)}>Claim</Button>
                // </div>
                <div key={`${item.uid}${index}`}>
                  <ItemClaimTicket item={item} raffleUid={raffleUid}></ItemClaimTicket>
                </div>
              )
            })
              : ""
          }
        </div>
        {/*<div className={s.buttonClaim}>*/}
        {/*  <Button>Claim</Button>*/}
        {/*</div>*/}
      </div>

    </Modal>
  );
};

export default PopupClaimTicket;
