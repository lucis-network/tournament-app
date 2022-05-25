import { observer } from "mobx-react-lite";
import { Button, Image, message, Modal } from "antd";
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
import useTournament from "../hooks/useTournament";
import CountdownTimer from "components/ui/common/CountDown";
import { CalendarOutlined } from "@ant-design/icons";
import AuthStore from "components/Auth/AuthStore";
import SpinLoading from "components/ui/common/Spin";
import { isEmpty } from "lodash";

type Props = {
	isJoin: boolean;
	tournament: any;
	tournamentId?: string;
	joinTournament: any;
	dataBracket: any;
	refetch: any;
	refreshParticipant: () => Promise<ApolloQueryResult<any>>;
	tournament_status: string;
	isCheckin: boolean;
};

type Reward = {
	amount: number;
	rank: number;
	reward_type: string;
	symbol: string;
	is_claim: boolean;
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

	const { isJoin, isCheckin, tournamentId, dataBracket, refetch, refreshParticipant } = props;

	const isFullParticipant = cache_tournament?.team_participated >= participants;

	const { show, step, handleOpenModal, handleCloseModal, stepConfiguration } =
		useTeamModal(props);

	const timeDefault = moment(brackets?.[0].start_at).valueOf();
	const timeCheckin = moment(brackets?.[0].start_at)
		.subtract(15, "minutes")
		.valueOf();
	const timeRegistration = moment(brackets?.[0].start_at)
		.subtract(1, "hour")
		.valueOf();

	const claimTokenDonation = async () => {
		TournamentStore.claimDonationModalVisible = true;
	};

	const { data } = useClaimReward({
		tournament_uid: tournamentId ? tournamentId : "",
		skip: isEmpty(tournamentId)
	});

	const {
		openModal: openTournamentModal,
		status,
		loadingCheckin,
		handleCloseTourModal,
		handleOpenLeaveTournament,
		handleLeaveTournament,
		handleCheckinTournament,
	} = useTournament(tournamentId || "");

	const [dataPrize, setDataPrize] = useState<Reward>();
	const [dataSystemPrize, setDataSystemPrize] = useState<Reward>();
	const [dataDonation, setDataDonation] = useState<Reward[]>();
	const [totalFromDonation, setTotalFromDonation] = useState(0);

	useEffect(() => {
		let arr: Array<Reward> = [];
		console.log("console", data)
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
			is_claim: false
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
							refetch();
							TournamentStore.claimResultModalVisible = true;
						}
					},
					(error) => {
						message.warning("You have received this prize.");
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
								refetch();
								TournamentStore.claimResultModalVisible = true;
							}
						},
						(error) => {
							message.warning("You have received this prize.");
						}
					);
			}
		}
	};

	const closeModal = () => {
		setIsPopupDonate(false);
	};

	const openModal = () => {
		if (!AuthStore.isLoggedIn) {
			message.info("Please sign in first");
			return;
		}

		setIsPopupDonate(true);
	};

	return (
		<>
			<div className={s.registrationPhase}>
				<div className={s.startTime}>
					<Image
						src="/assets/TournamentDetail/iconCalendar.svg"
						preview={false}
						alt=""
					/>
					<p className="mb-0">
						<span className="font-bold">Start time: </span>
						{moment(brackets?.[0].start_at).format("YYYY/MM/DD HH:mm")}
					</p>
				</div>
				<div className={s.registrationPhaseMetadata}>
					<div className={s.item}>
						<div className={s.itemImg}>
							<Image
								src="/assets/TournamentDetail/goldCup.svg"
								alt=""
								preview={false}
							/>
						</div>
						<div className={s.itemText}>
							<h3>
								{fomatNumber(totalPrizePool)} {currency.symbol}
							</h3>
							<p>Prize pool</p>
						</div>
						<div className={`${s.additionalInfo} ${s.additionalPrize}`}>
							{additionPrize ? (
								additionPrize > 0 ? (
									<div>
										<h4>Additional prizes:</h4>
										<p>
											<Image
												src="/assets/TournamentDetail/goldCupSmall.svg"
												preview={false}
												alt=""
											/>
											{fomatNumber(Number.parseFloat(additionPrize))} LUCIS
											token
										</p>
									</div>
								) : (
									""
								)
							) : (
								""
							)}
						</div>
					</div>
					<div className={s.item}>
						<div className={s.itemImg}>
							<Image
								src="/assets/TournamentDetail/diamondBox.png"
								alt=""
								preview={false}
							/>
						</div>
						<div className={s.itemText}>
							<h3>
								{fomatNumber(totalDonation)} {currency.symbol}
							</h3>
							<p>Total donation</p>
						</div>
						<div className={s.additionalInfo}>
							{tournament_status !== "CLOSED" && (
								<button onClick={openModal}>
									<Image
										src="/assets/TournamentDetail/signInCircle.svg"
										preview={false}
										alt=""
									/>
									<span className="ml-2">Donate</span>
								</button>
							)}
						</div>
					</div>
					<div className={s.item}>
						<div className={s.itemImg}>
							<Image
								src="/assets/TournamentDetail/participants.svg"
								alt=""
								preview={false}
							/>
						</div>
						<div className={s.itemText}>
							<h3>
								{cache_tournament?.team_participated
									? cache_tournament?.team_participated
									: 0}
								/{participants}
							</h3>
							<p>Participants</p>
						</div>
						<div className={s.additionalInfo}>
							{(() => {
								switch (tournament_status) {
									case "REGISTRATION":
										return (
											<div className={s.joinWrap}>
												{isJoin ? (
													<Button
														onClick={handleOpenLeaveTournament}
														className="btn-cyan"
													>
														Unjoin tournament
													</Button>
												) : (
													<Button
														onClick={handleOpenModal}
														disabled={isFullParticipant}
														className="btn-cyan"
													>
														<Image
															src="/assets/TournamentDetail/iconPlay.svg"
															preview={false}
															alt=""
														/>
														Join tournament
													</Button>
												)}
											</div>
										);
									case "CHECKIN":
										return (
											<div className={s.joinWrap}>
												{isJoin ? !isCheckin ? (
													<Button
														className="btn-cyan"
														onClick={handleCheckinTournament}
													>
														{loadingCheckin ? (
															<SpinLoading className="pt-0" size={24} />
														) : (
															"Check-in"
														)}
													</Button>
												) : (
													<Button disabled className="btn-cyan">
														Checked
													</Button>
												) : null}
											</div>
										);
									case "CLOSED":
										// console.log("dataPrize", dataPrize);
										// console.log("dataSystemPrize", dataSystemPrize);
										return (
											// todo closeds
											<div>
												<div className={s.joinWrap}>
													{(dataPrize?.amount && dataPrize?.amount > 0) ||
													(dataSystemPrize?.amount &&
														dataSystemPrize?.amount > 0) ? (
														<p>YOUR REWARDS</p>
													) : (
														""
													)}
													<div className={s.rewards}>
														<div>
															{(dataPrize?.amount && dataPrize?.amount > 0) ||
																(dataSystemPrize?.amount &&
																	dataSystemPrize?.amount > 0) ||
																(totalFromDonation > 0 && <div>Prize</div>)}
															<div>
																{dataPrize?.amount ? (
																	dataPrize?.amount > 0 ? (
																		<>
																			{fomatNumber(
																				dataPrize?.amount
																					? dataPrize?.amount
																					: 0
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
																				onClick={() =>
																					claimToken("PrizeSystem")
																				}
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
															<div>
																{totalFromDonation ? (
																	totalFromDonation > 0 ? (
																		<>
																			<p>From Donation</p>
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
													{/* {(dataPrize?.amount && dataPrize?.amount > 0) ||
													(dataSystemPrize?.amount &&
														dataSystemPrize?.amount > 0) ? (
														<Button>Share my victory</Button>
													) : (
														""
													)} */}
												</div>
											</div>
										);
									default:
										return null;
								}
							})()}
							{(() => {
								switch (tournament_status) {
									case "REGISTRATION":
										return (
											<div className={s.countdownWrap}>
												<p className="mb-0">
													Registration phase will ends in:{" "}
													<CountdownTimer targetDate={timeRegistration} />
												</p>
											</div>
										);
									case "CHECKIN":
										return (
											<div className={s.countdownWrap}>
												<p className="mb-0 mr-4">
													Check-in phase will ends in:
												</p>
												<CountdownTimer targetDate={timeCheckin} />
											</div>
										);
									case "PREPARE":
										return (
											<div className={s.countdownWrap}>
												<p className="mb-0 mr-4">Tournament will starts in:</p>
												<CountdownTimer targetDate={timeDefault} />
											</div>
										);
									case "RUNNING":
										return null;
									default:
										return null;
								}
							})()}
						</div>
					</div>
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
				refetch={refetch}
			/>
			<Modal
				title={
					<h3 className="text-16px text-white">
						{status === "unjoin"
							? "Are you sure to unjoin this tournament?"
							: ""}
					</h3>
				}
				centered
				visible={openTournamentModal}
				wrapClassName={s.mdl}
				okText="Confirm"
				bodyStyle={{ display: "none" }}
				onOk={handleLeaveTournament}
				onCancel={handleCloseTourModal}
			/>
		</>
	);
});
