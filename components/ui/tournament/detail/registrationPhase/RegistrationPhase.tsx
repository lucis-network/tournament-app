import { observer } from "mobx-react-lite";
import { Button } from "antd";
import TournamentStore, { SponsorTierType } from "src/store/TournamentStore";
import s from "./index.module.sass";
import moment from "moment";
import ChooseTeamModal from "../popup/chooseTeamModal";
import useTeamModal from "../hooks/useTeamModal";
import { MyTeamType } from "components/ui/common/tabsItem/myTeamDetail/hooks/useControlTeam";

type Props = {
	participants: number;
	brackets: any;
	sponsorSlot: SponsorTierType[];
	pool_size: number;
	currency: any;
	tournament: any;
};

export default observer(function RegistrationPhase(props: Props) {
	const { participants, brackets } = props;
	const { show, step, handleOpenModal, handleCloseModal, stepConfiguration } =
		useTeamModal(props);

	const claimTokenDonation = async () => {
		TournamentStore.claimDonationModalVisible = true;
	};

	const claimToken = async () => {
		TournamentStore.claimResultModalVisible = true;
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
							<span>22300 USDT</span>
							<span>Prize pool</span>
						</div>
					</div>
					<div className={s.items}>
						<img src="/assets/avatar.jpg" alt="" width={50} />
						<span>22300 USDT</span>
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
					<div className={s.join}>
						<Button onClick={handleOpenModal}>Join tournament</Button>
						<p>Registration ends in 5H 45M 30S</p>
					</div>
					{/* ===== donation ===== */}
					<div className={s.join}>
						<p>YOUR REWARDS</p>
						<div className={s.rewards}>
							<div>
								<div>Prize</div>
								<p>1234 USDT</p>
								<Button onClick={claimToken}>Claim</Button>
								<p>1234 LUCIS</p>
								<Button onClick={claimToken}>Claim</Button>
							</div>
							<div>
								<p>From Donation</p>
								<p>1234 USDT</p>
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
				onCancel={handleCloseModal}
			/>
		</>
	);
});
