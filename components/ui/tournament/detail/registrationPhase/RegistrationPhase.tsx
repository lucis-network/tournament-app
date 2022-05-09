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
import { BUSD } from "utils/Enum";
import EthersService from "../../../../../services/blockchain/Ethers";

type Props = {
  participants: number;
  brackets: any;
  sponsorSlot: SponsorTierType[];
  pool_size: number;
  currency: any;
  totalDonation?: any;
  totalPrizePool?: any;
};

export default observer(function RegistrationPhase(props: Props) {
  const {
    participants,
    brackets,
    currency,
    totalDonation,
    totalPrizePool,
  } = props;
  const { show, step, handleOpenModal, stepConfiguration } =
    useTeamModal(props);

  const claimTokenDonation = async () => {
    TournamentStore.claimDonationModalVisible = true;
  };

  const claimToken = async () => {
    if (!ConnectWalletStore.address) {
      AuthBoxStore.connectModalVisible = true;
    } else {
      let result = await claim();
      if (!result?.error) {
        TournamentStore.claimResultModalVisible = true;
      } else {
        //@ts-ignore
        message.error(result?.error?.message);
      }
    }
  };

  const claim = async () => {
    if (ConnectWalletStore_NonReactiveData.web3Provider) {
      //throw makeError("Need to connect your wallet first");
      const ethersService = new EthersService(
        ConnectWalletStore_NonReactiveData.web3Provider
      );

      const txHash = await ethersService.transferFT(
        "0x948d6D28D396Eae2F8c3459b092a85268B1bD96B",
        BUSD,
        1
      );
      return txHash;
    }
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.time}>
          Start time: {moment(brackets?.start_at).format("YYYY/MM/DD HH:MM")}
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
            <Button>Donation</Button>
          </div>
          <div className={s.items}>
            <img src="/assets/avatar.jpg" alt="" width={50} />
            <span>
              {participants}/{participants}
            </span>
            <span>Particiants</span>
            <p></p>
          </div>
        </div>
        <div className={s.footer}>
          <div className={s.prizes}>
            <span>Addtional prizes: </span>
            <span>Thetan NFTs: HeroX, Guitar</span>
            <span>1000 USDT token</span>
          </div>
          {/* <div className={s.join}>
            <Button onClick={handleOpenModal}>Join tournament</Button>
            <p>Registration ends in 5H 45M 30S</p>
          </div> */}
          {/* ===== donation ===== */}
          <div className={s.join}>
            <p>YOUR REWARDS</p>
            <div className={s.rewards}>
              <div>
                <div>Prize</div>
                <p>
                  {fomatNumber(totalPrizePool)} {currency.symbol}
                </p>
                <Button onClick={claimToken}>Claim</Button>
                <p>{fomatNumber(totalPrizePool)} LUCIS</p>
                <Button onClick={claimToken}>Claim</Button>
              </div>
              <div>
                <p>From Donation</p>
                <p>
                  {fomatNumber(totalDonation)} {currency.symbol}
                </p>
                <Button onClick={claimTokenDonation}>Claim</Button>
              </div>
            </div>
            <Button>Share my victory</Button>
          </div>
        </div>
      </div>

      <ChooseTeamModal
        step={step}
        show={show}
        stepConfiguration={stepConfiguration}
      />
    </>
  );
});
