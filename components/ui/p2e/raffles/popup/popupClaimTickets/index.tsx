import {Button, Modal } from "antd";
import s from "./index.module.sass";
import {UserWonTicketGql} from "../../../../../../src/generated/graphql_p2e";

import ItemClaimTicket from "./ItemClaimTicket";
import {useState} from "react";
import PopupContactRaffles from "../popupContact";

type Props = {
  closePopupClaimTicket: () => void;
  status: boolean;
  dataMyWonTickets?: UserWonTicketGql[];
  raffleUid?: string;
};

const PopupClaimTicket = (props: Props) => {
  const { status, closePopupClaimTicket, dataMyWonTickets, raffleUid } = props;
  const [isPopupContactVisible, setIsPopupContactVisible] = useState<boolean>(false);

  const closePopupContact = () => {
    setIsPopupContactVisible(false);
  }

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
        <div className={s.buttonClaim}>
          <Button onClick={() => setIsPopupContactVisible(true)}>Claim</Button>
        </div>
      </div>
      {isPopupContactVisible &&
          <PopupContactRaffles status={isPopupContactVisible} closePopupContact={closePopupContact}></PopupContactRaffles>
      }
    </Modal>
  );
};

export default PopupClaimTicket;
