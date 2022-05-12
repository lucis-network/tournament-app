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
import PopupDonate from "../popup/popupDonate";
import { useEffect, useState } from "react";
import { useClaimReward } from "hooks/tournament/useTournamentDetail";
import ClaimDonationModal from "../popup/claimDonationModal/ClaimDonationModal";
import TournamentService from "components/service/tournament/TournamentService";
import { ApolloQueryResult } from "@apollo/client";
import timeMoment from "moment-timezone";
import useTournament from "../hooks/useTournament";
import { Statistic } from "antd";
import CountdownTimer from "components/ui/common/CountDown";

const { Countdown } = Statistic;

type Props = {
	isJoin: boolean;
	tournament: any;
	tournamentId?: string;
	joinTournament: any;
	dataBracket: any;
	refetch: () => Promise<ApolloQueryResult<any>>;
	refreshParticipant: () => Promise<ApolloQueryResult<any>>;
};

type Reward = {
	amount: number;
	rank: number;
	reward_type: string;
	symbol: string;
};

export type ClaimPrizePool = {
	tournament_uid?: string;
	address?: any;
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

	const { isJoin, tournamentId, dataBracket, refetch } = props;

	const { show, step, handleOpenModal, handleCloseModal, stepConfiguration } =
		useTeamModal(props);

	const timeDefault = moment(brackets?.[0].start_at).valueOf();
	const timeCheckin = moment(brackets?.[0].start_at).add(1, "hour").valueOf();
	const timePrepare = moment(brackets?.[0].start_at)
		.add(15, "minutes")
		.valueOf();

	const claimTokenDonation = async () => {
		TournamentStore.claimDonationModalVisible = true;
	};

	const { data } = useClaimReward({
		tournament_uid: tournamentId ? tournamentId : "",
	});

	const { handleLeaveTournament } = useTournament();

	const [dataPrize, setDataPrize] = useState<Reward>();
	const [dataSystemPrize, setDataSystemPrize] = useState<Reward>();
	const [dataDonation, setDataDonation] = useState<Reward[]>();
	const [totalFromDonation, setTotalFromDonation] = useState(0);

	useEffect(() => {
		getCurrentTime();
	});

	const getCurrentTime = () => {
		// console.log("dataBracket", dataBracket);
		// const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
		// console.log("tzid", tzid);
		// const dateNow = timeMoment().tz(tzid).unix();
		// const timeStart = timeMoment(dataBracket.start_at).tz(tzid).unix();
		// console.log("dateNow", dateNow);
		// console.log("timeStart", timeStart);
		// const time = (timeStart - dateNow) * 1000;
	};

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

	const claimToken = async (value: string) => {
		if (!ConnectWalletStore.address) {
			AuthBoxStore.connectModalVisible = true;
		} else {
			if (value === "PrizePool") {
				const claim: ClaimPrizePool = {
					tournament_uid: tournamentId,
					address: ConnectWalletStore.address,
				};

				let tournamentService = new TournamentService();
				const response = tournamentService.claimPrizePool(claim).then(
					(res) => {
						if (res) {
							TournamentStore.claimResultModalVisible = true;
							refetch();
						}
					},
					(error) => {
						message.warning("You have received prize pool.");
					}
				);
			}

			if (value === "PrizeSystem") {
				let tournamentService = new TournamentService();
				const response = tournamentService
					.claimPrizeSystem(tournamentId as string)
					.then(
						(res) => {
							if (res) {
								TournamentStore.claimResultModalVisible = true;
								refetch();
							}
						},
						(error) => {
							message.warning("You have received prize system.");
						}
					);
			}
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
					{/* Start time: {moment(dataBracket.start_at).format("YYYY/MM/DD HH:MM")} */}
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
						<div className="flex align-middle items-center text-white">
							<p className="mb-0 mr-4">Checkin ends: </p>
							<CountdownTimer targetDate={timeDefault} />
						</div>
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
					{isJoin ? (
						<div className={s.join}>
							<Button onClick={() => handleLeaveTournament("", tournamentId!)}>
								Unjoin tournament
							</Button>
							<div className="flex align-middle items-center text-white">
								<p className="mb-0 mr-4">Checkin ends: </p>
								<CountdownTimer targetDate={timeDefault} />
							</div>
						</div>
					) : (
						(() => {
							switch (tournament_status) {
								case "REGISTRATION":
									return (
										<>
											<div className={s.join}>
												<Button onClick={handleOpenModal}>
													Join tournament
												</Button>
												<div className="flex align-middle items-center text-white">
													<p className="mb-0 mr-4">Checkin ends: </p>
													<CountdownTimer targetDate={timeDefault} />
												</div>
											</div>
										</>
									);
								case "CHECKIN":
									return (
										<>
											<div className={s.join}>
												<Button onClick={handleOpenModal}>Check-in</Button>
												<div className="flex align-middle items-center text-white">
													<p className="mb-0 mr-4">Checkin ends: </p>
													<CountdownTimer targetDate={timeCheckin} />
												</div>
											</div>
										</>
									);
								case "PREPARE":
									return (
										<>
											<>
												<div className={s.join}>
													<div className="flex align-middle items-center text-white">
														<p className="mb-0 mr-4">Checkin ends: </p>
														<CountdownTimer targetDate={timePrepare} />
													</div>
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
																		<Button
																			onClick={() => claimToken("PrizePool")}
																		>
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
																		<Button
																			onClick={() => claimToken("PrizeSystem")}
																		>
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
						})()
					)}
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
