import { Modal } from "antd";
import s from "./index.module.sass";
import {UserWonTicketGql} from "../../../../../../src/generated/graphql_p2e";

import ItemClaimTicket from "./ItemClaimTicket";

type Props = {
  closePopupClaimTicket: () => void;
  status: boolean;
  dataMyWonTickets?: UserWonTicketGql[];
  raffleUid?: string;
};

const PopupClaimTicket = (props: Props) => {
  const { status, closePopupClaimTicket, dataMyWonTickets, raffleUid } = props;

  return (
    <Modal
      visible={status}
      centered
      className={s.content_modal}
      footer={null}
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
