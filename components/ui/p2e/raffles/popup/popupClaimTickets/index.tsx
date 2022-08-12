import {Button, Modal } from "antd";
import s from "./index.module.sass";
import {RaffleDetail, UserWonTicketGql} from "../../../../../../src/generated/graphql_p2e";

import ItemClaimTicket from "./ItemClaimTicket";
import React, {useState} from "react";
import PopupContactRaffles from "../popupContact";

type Props = {
  closePopupClaimTicket: () => void;
  status: boolean;
  dataMyWonTickets?: UserWonTicketGql[];
  raffleUid?: string;
  dataRaffleDetail?: RaffleDetail;
};

const PopupClaimTicket = (props: Props) => {
  const { status, closePopupClaimTicket, dataMyWonTickets, raffleUid, dataRaffleDetail } = props;
  const [isPopupContactVisible, setIsPopupContactVisible] = useState<boolean>(false);

  const closePopupContact = () => {
    setIsPopupContactVisible(false);
  }

  const openPopupContactRaffes = () => {
    setIsPopupContactVisible(true)
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
          <img className={s.logo} src="/assets/Raffles/LucisLogo.svg"/>
          <p className={s.titleSuccess}>CONGRATULATIONS</p>
        </div>
        <div className={s.tickets}>
          {
            dataMyWonTickets ? dataMyWonTickets.map((item, index) => {
              return(
                <div key={`${item.uid}${index}`}>
                  <ItemClaimTicket dataRaffleDetail={dataRaffleDetail} item={item} raffleUid={raffleUid} openPopupContactRaffes={openPopupContactRaffes} ></ItemClaimTicket>
                </div>
              )
            })
              : ""
          }
        </div>
        {
          dataRaffleDetail && !dataRaffleDetail?.prize_category?.currency_type &&
            <div className={s.myInventory}>
                <p>
                    Note: Your prize will be archived after claim
                </p>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <div><a href="/profile?page=inventory" target="_blank" rel="noopener noreferrer">View my inventory</a></div>
            </div>
        }
      </div>
      {isPopupContactVisible &&
          <PopupContactRaffles status={isPopupContactVisible} closePopupContact={closePopupContact} contactURL="https://discord.gg/7SdtYpGENT" description="Congratulations on your lucky win from Lucis. It is not sent to you right away, please contact Lucis Support for instructions on receiving the prize." />
      }
    </Modal>
  );
};

export default PopupClaimTicket;
