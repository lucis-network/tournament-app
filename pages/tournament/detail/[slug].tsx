import s from "./TournamentDetail.module.sass";
import { Button, Col, Row, Tabs } from "antd";
import Banner from "components/ui/tournament/detail/Banner";
import { useTournamentDetail } from "hooks/tournament/useTournamentDetail";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { isClient } from "utils/DOM";
import Bracket from "components/ui/tournament/detail/tabsitem/brackets";
import Overview from "components/ui/tournament/detail/tabsitem/overview/Index";
import Rules from "components/ui/tournament/detail/tabsitem/rules/Index";
import TableParticipant from "components/ui/tournament/detail/tabsitem/participants";
import Referees from "components/ui/tournament/detail/tabsitem/referees";
import Prizing from "components/ui/tournament/detail/tabsitem/prizing";
import PopupDonate from "components/ui/tournament/detail/popup/popupDonate";
import PopupShare from "components/ui/tournament/detail/popup/popupShare";
import RegistrationPhase from "components/ui/tournament/detail/registrationPhase/RegistrationPhase";
import TournamentDetailSponsor from "components/ui/tournament/detail/sponsor/TournamentDetailSponsor";
import ClaimDonationModal from "components/ui/tournament/detail/popup/claimDonationModal/ClaimDonationModal";
import ConnectWalletModal from "components/Auth/components/ConnectWalletModal";
import ClaimResultModal from "components/ui/tournament/detail/popup/claimResultModal/ClaimResultModal";

const { TabPane } = Tabs;
const ItemButton = ["Subcribe", "Donate", "Invite or Share"];

const TournamentDetail = () => {
	// ====== Use to get tournament_uid
	// const router = useRouter();
	// const tournamentUid = useMemo(() => {
	//   const { slug } = router.query;
	//   if (slug) {
	//     return slug[0];
	//   }
	//   if (isClient) {
	//     const paths = router.asPath.split("/").filter((item) => item !== "");
	//     if (paths.length > 1) {
	//       return paths[1];
	//     }
	//   }
	//   return "";
	// }, [router]);
	const [isPopupDonate, setIsPopupDonate] = useState(false);
	const [isPopupShare, setIsPopupShare] = useState(false);

	const {
		dataTournamentDetail,
		dataParticipants,
		dataRefereesDetail,
		dataPrizing,
		dataBracket,

		loading,
		loadingParticipant,
		loadingReferees,
		loadingPrizing,
		loadingBracket,

		joinTournament,
	} = useTournamentDetail({
		// Change to tournamentUid after
		tournament_uid: "cl2rdu56s18150jrswgoh73lb",
	});

	if (loading) {
		return "";
	}

	const openModal = (item: string) => {
		if (item === "Donate") {
			setIsPopupDonate(true);
		} else if (item === "Invite or Share") {
			setIsPopupShare(true);
		}
	};

	const closeModal = (item: string) => {
		if (item === "Donate") {
			setIsPopupDonate(false);
		} else if (item === "Invite or Share") {
			setIsPopupShare(false);
		}
	};
	const {
		team_size,
		desc,
		rules,
		participants,
		user,
		game,
		name,
		sponsorSlot,
		pool_size,
		currency,
	} = dataTournamentDetail;

	// console.log(dataBracket);
	// useEffect(() => {
	//   if (dataTournamentDetail)
	//     console.log("dataTournamentDetail", dataTournamentDetail);
	// }, [dataTournamentDetail]);

	return (
		<div className={s.wrapper}>
			<Banner />

			<div className={`lucis-container ${s.group_button}`}>
				{ItemButton.map((item) => (
					// <Button type="primary" key={item}>
					//   {item}
					// </Button>
					<button key={item} onClick={() => openModal(item)}>
						{item}
					</button>
				))}
			</div>

			<Row className={`lucis-container`}>
				<Col span={6} className={s.content_top}>
					<div className={s.img_game}>
						<img src="" alt="" />
					</div>
					<h2>{game.name}</h2>
				</Col>

				<Col span={16} className={s.content_center}>
					<h1>{`${game.name} + ${name}`}</h1>
					<Row>
						<Col span={8} className={s.free_entry}>
							<p className={s.title}>Free entry</p>
							<div className={s.text}>
								<p>Bracket type</p>
								<span>
									{dataBracket?.type === "SINGLE"
										? "Single eliminnation"
										: dataBracket?.type === "DOUBLE"
										? "Double eliminnation"
										: ""}
								</span>
							</div>
						</Col>

						<Col span={8} className={s.tournament_by}>
							<p>Tournament by</p>
							<div className={s.text}>
								<p>Team size</p>
								<span>
									{team_size ?? "-"} vs {team_size ?? "-"}
								</span>
							</div>
						</Col>
						<Col span={8} className={s.lucis_offical}>
							<p>Lucis Offical</p>
							<div className={s.text}>
								<p>Max participants</p>
								<span>{participants}</span>
							</div>
						</Col>
					</Row>
				</Col>
				<Col span={2}>content right</Col>
			</Row>

			{/* ==== registration phase ====  */}
			<div className={`lucis-container`}>
				<RegistrationPhase
					joinTournament={joinTournament}
					tournament={dataTournamentDetail}
					participants={participants}
					brackets={dataBracket}
					sponsorSlot={sponsorSlot}
					pool_size={pool_size}
					currency={currency}
				/>
			</div>
			{/* ===== sponsor ===== */}
			<div className="lucis-container">
				<TournamentDetailSponsor />
			</div>
			{/* ===== end sponsor ===== */}

			{/* ===== tabs ===== */}
			<div className={`lucis-container ${s.container_Tabs}`}>
				<Tabs defaultActiveKey="1">
					<TabPane tab="Overview" key="1">
						<Overview desc={desc} />
					</TabPane>
					<TabPane tab="Rules" key="2">
						<Rules rules={rules} />
					</TabPane>
					<TabPane tab="Bracket" key="3">
						<Bracket
							dataBracket={dataBracket}
							loadingBracket={loadingBracket}
						/>
					</TabPane>
					<TabPane tab={`Participants (${team_size}/${team_size})`} key="4">
						<TableParticipant
							dataParticipants={dataParticipants}
							loading={loadingParticipant}
						/>
					</TabPane>
					<TabPane tab="Referees" key="5">
						<Referees
							dataRefereesDetail={dataRefereesDetail}
							loadingReferees={loadingReferees}
						/>
					</TabPane>
					<TabPane tab="Prizing" key="6">
						<Prizing
							dataPrizing={dataPrizing}
							loadingPrizing={loadingPrizing}
						/>
					</TabPane>
				</Tabs>
			</div>

			{/* ===== Modal ===== */}
			<PopupDonate
				closeModal={() => closeModal("Donate")}
				status={isPopupDonate}
				// datas={dataReferees}
			/>

			<PopupShare
				closeModal={() => closeModal("Invite or Share")}
				status={isPopupShare}
			/>

			<ClaimDonationModal />
			<ConnectWalletModal />
			<ClaimResultModal />
		</div>
	);
};

export function getStaticPaths() {
	return {
		paths: [
			{
				params: { slug: "1" },
			},
			{
				params: { slug: "2" },
			},
		],
		fallback: false,
	};
}

export function getStaticProps({}) {
	return {
		props: {
			course: {},
		},
	};
}

export default TournamentDetail;
