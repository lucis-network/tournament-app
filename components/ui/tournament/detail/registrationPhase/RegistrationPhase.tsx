import { observer } from "mobx-react-lite";
import { Button, message } from "antd";
import TournamentStore, { SponsorTierType } from "src/store/TournamentStore";
import s from "./index.module.sass";
import moment from "moment";
import ChooseTeamModal from "../popup/chooseTeamModal";
import useTeamModal from "../hooks/useTeamModal";
import { fomatNumber } from "utils/Number";
import AuthBoxStore from "components/Auth/components/AuthBoxStore";
import ConnectWalletStore from "components/Auth/ConnectWalletStore";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "components/Auth/ConnectWalletStore";
import EthersService from "../../../../../services/blockchain/Ethers";
import PopupDonate from "../popup/popupDonate";
import { SetStateAction, useEffect, useState } from "react";
import { useClaimReward } from "hooks/tournament/useTournamentDetail";
import ClaimDonationModal from "../popup/claimDonationModal/ClaimDonationModal";

type Props = {
  tournament: any;
  tournamentId?: string;
  joinTournament: any;
  dataBracket: any;
};

type Reward = {
  amount: number;
  rank: number;
  reward_type: string;
  symbol: string;
};
export default observer(function RegistrationPhase(props: Props) {
  const [isPopupDonate, setIsPopupDonate] = useState(false);
  const {
    participants,
    brackets,
    currency,
    totalDonation,
    totalPrizePool,
    name,
    thumbnail,
    tournament_status,
    additionPrize,
    cache_tournament,
  } = props.tournament;

  const { tournamentId, dataBracket } = props;

  const { show, step, handleOpenModal, handleCloseModal, stepConfiguration } =
    useTeamModal(props);

  const claimTokenDonation = async () => {
    TournamentStore.claimDonationModalVisible = true;
  };

  const { data } = useClaimReward({
    tournament_uid: tournamentId ? tournamentId : "",
  });

  const [dataPrize, setDataPrize] = useState<Reward>();
  const [dataSystemPrize, setDataSystemPrize] = useState<Reward>();
  const [dataDonation, setDataDonation] = useState<Reward[]>();
  const [totalFromDonation, setTotalFromDonation] = useState(0);

  useEffect(() => {
    let arr: Array<Reward> = [];
    data?.forEach((item: any) => {
      if (item.reward_type === "PRIZE") setDataPrize(item);
      else if (item.reward_type === "SYTEMPRIZE") setDataSystemPrize(item);
      else arr.push(item);
    });
    setDataDonation(arr);
    calculatorDonation(arr);
  }, [data]);

  const calculatorDonation = (arr: any) => {
    let total = 0;
    arr?.forEach((item: any) => {
      total += item.amount;
    });
    setTotalFromDonation(total);

    let obj: Reward = {
      amount: total,
      reward_type: "Total",
      rank: 0,
      symbol: currency?.symbol,
    };
    arr.push(obj);
  };

  const claimToken = async () => {
    // if (!ConnectWalletStore.address) {
    //   AuthBoxStore.connectModalVisible = true;
    // } else {
    //   let result = await claim();
    //   if (!result?.error) {
    //     TournamentStore.claimResultModalVisible = true;
    //   } else {
    //     //@ts-ignore
    //     message.error(result?.error?.message);
    //   }
    // }
  };

  const claim = async () => {
    if (ConnectWalletStore_NonReactiveData.web3Provider) {
      //throw makeError("Need to connect your wallet first");
      const ethersService = new EthersService(
        ConnectWalletStore_NonReactiveData.web3Provider
      );

      // const txHash = await ethersService.initTournament(
      //   1,
      //   "0x4bE02BFe61a7ABDd31F8fE5e51a03ABd7028d450",
      //   "0xb3097df87251D445504FA36e7E1A25079c3B49a7"
      // );
      // return txHash;
    }
  };

  const closeModal = () => {
    setIsPopupDonate(false);
  };

  const openModal = () => {
    setIsPopupDonate(true);
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.time}>
          Start time: {moment(dataBracket?.start_at).format("YYYY/MM/DD HH:MM")}
        </div>
        <div className={s.container}>
          <div className={s.prizes}>
            <div className={s.items}>
              <img src="/assets/avatar.jpg" alt="" width={50} />
              <span>
                {fomatNumber(totalPrizePool)} {currency.symbol}
              </span>
              <span>Prize pool</span>
            </div>
          </div>
          <div className={s.items}>
            <img src="/assets/avatar.jpg" alt="" width={50} />
            <span>
              {fomatNumber(totalDonation)} {currency.symbol}
            </span>
            <span>Total donation</span>
            <Button onClick={openModal}>Donate</Button>
          </div>
          <div className={s.items}>
            <img src="/assets/avatar.jpg" alt="" width={50} />
            <span>
              {cache_tournament?.team_participated}/{participants}
            </span>
            <span>Participants</span>
            <p></p>
          </div>
        </div>
        <div className={s.footer}>
          <div className={s.prizes}>
            <span>Additional prizes</span>
            {additionPrize ? (
              <span>
                {fomatNumber(Number.parseFloat(additionPrize))} LUCIS token
              </span>
            ) : (
              ""
            )}
          </div>
          {(() => {
            switch (tournament_status) {
              case "REGISTRATION":
                return (
                  <>
                    <div className={s.join}>
                      <Button onClick={handleOpenModal}>Join tournament</Button>
                      <p>Check-in ends in 5H 45M 30S</p>
                    </div>
                  </>
                );
              case "CHECKIN":
                return (
                  <>
                    <div className={s.join}>
                      <Button onClick={handleOpenModal}>Check-in</Button>
                      <p>Check-in ends in 5H 45M 30S</p>
                    </div>
                  </>
                );
              case "PREPARE":
                return (
                  <>
                    <>
                      <div className={s.join}>
                        <p>Tournament in 5H 45M 30S</p>
                      </div>
                    </>
                  </>
                );
              case "RUNNING":
                return <></>;
              case "CLOSED":
                return (
                  <>
                    <div className={s.join}>
                      <p>YOUR REWARDS</p>
                      <div className={s.rewards}>
                        <div>
                          <div>Prize</div>
                          <div>
                            {dataPrize?.amount ? (
                              dataPrize?.amount > 0 ? (
                                <>
                                  {fomatNumber(
                                    dataPrize?.amount ? dataPrize?.amount : 0
                                  )}{" "}
                                  {dataPrize?.symbol}
                                  <br />
                                  <Button onClick={claimToken}>Claim</Button>
                                </>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </div>
                          <div>
                            {dataSystemPrize?.amount ? (
                              dataSystemPrize?.amount > 0 ? (
                                <>
                                  {fomatNumber(
                                    dataSystemPrize?.amount
                                      ? dataSystemPrize?.amount
                                      : 0
                                  )}{" "}
                                  {dataSystemPrize?.symbol}
                                  <br />
                                  <Button onClick={claimToken}>Claim</Button>
                                </>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div>
                          <p>From Donation</p>
                          <div>
                            {totalFromDonation ? (
                              totalFromDonation > 0 ? (
                                <>
                                  {fomatNumber(totalFromDonation)}{" "}
                                  {dataPrize?.symbol}
                                  <br />
                                  <Button onClick={claimTokenDonation}>
                                    Claim
                                  </Button>
                                </>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <Button>Share my victory</Button>
                    </div>
                  </>
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>

      <ClaimDonationModal
        tournamentId={tournamentId as string}
        dataDonation={dataDonation}
      />

      <ChooseTeamModal
        step={step}
        show={show}
        stepConfiguration={stepConfiguration}
        onCancel={handleCloseModal}
      />

      <PopupDonate
        closeModal={() => closeModal()}
        status={isPopupDonate}
        tournamentId={tournamentId}
        currency={currency}
        types={"TOURNAMENT"}
        name={name}
        thumbnail={thumbnail}
      />
    </>
  );
});
