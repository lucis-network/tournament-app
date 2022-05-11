import s from "./TournamentDetail.module.sass";
import { Button, Col, Row, Tabs } from "antd";
import Banner from "components/ui/tournament/detail/Banner";
import { useTournamentDetail } from "hooks/tournament/useTournamentDetail";
import Router, { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { isClient } from "utils/DOM";
import Brackets from "components/ui/tournament/detail/tabsitem/brackets";
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
import { isClientDevMode } from "../../../utils/Env";

const { TabPane } = Tabs;
const ItemButton = ["Subcribe", "Donate", "Invite or Share"];

const TournamentDetail = (props: { tournamentId: string }) => {
	const [isPopupDonate, setIsPopupDonate] = useState(false);
	const [isPopupShare, setIsPopupShare] = useState(false);

	const { tournamentId } = props;

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
		tournament_uid: tournamentId,
	});

	if (loading) {
		return null;
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
		game,
		name,
		cover,
		thumbnail,
		totalPrizePool,
		currency,
		user,
		regions,
		additionPrize,
		cache_tournament,
	} = dataTournamentDetail;

	return (
		<>
			<div className={s.wrapper}>
				<Banner cover={cover} />

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
							<img src={thumbnail} alt="" />
						</div>
						<h2>{game.name}</h2>
					</Col>

					<Col span={16} className={s.content_center}>
						<h1>{`${name}`}</h1>
						<Row>
							<Col span={6} className={s.free_entry}>
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

							<Col span={10} className={s.tournament_by}>
								<div>
									<p>
										Tournament by{" "}
										{user?.profile?.avatar ? (
											<img src={user?.profile?.avatar} alt="" width={50} />
										) : (
											<img src="/assets/avatar.jpg" alt="" width={50} />
										)}{" "}
										{user?.profile?.display_name}{" "}
									</p>
								</div>
								<div className={s.text}>
									<p>Team size</p>
									<span>
										{team_size ?? "-"}v{team_size ?? "-"}
									</span>
								</div>
							</Col>
							<Col span={6} className={s.lucis_offical}>
								<p></p>
								<div className={s.text}>
									<p>Max participants</p>
									<span>{participants}</span>
								</div>
							</Col>
							<Col span={2} className={s.lucis_offical}>
								<p></p>
								<div className={s.text}>
									<p>Region</p>
									<span>{regions}</span>
								</div>
							</Col>
							{/* <div>
                <Col span={8}>
                  <p className={s.title}>Free entry</p>
                </Col>
                <Col span={8}>
                  <p className={s.title}>Free entry</p>
                </Col>
              </div> */}
						</Row>
					</Col>
					<Col span={2}></Col>
				</Row>

				{/* ==== registration phase ====  */}
				<div className={`lucis-container`}>
					<RegistrationPhase
						tournament={dataTournamentDetail}
						tournamentId={tournamentId as string}
						joinTournament={joinTournament}
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
              <Brackets
                dataBracket={dataBracket}
                loadingBracket={loadingBracket}
              />
            </TabPane>
            <TabPane tab={`Participants (${cache_tournament?.team_participated}/${team_size})`} key="4">
              <TableParticipant
                dataParticipants={dataParticipants}
                loading={loadingParticipant}
                tournamentId={tournamentId as string}
                currency={currency}
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
                currency={currency}
              />
            </TabPane>
          </Tabs>
        </div>

        <div className={s.communityC}>

        </div>

				{/* ===== Modal ===== */}
				{/* <PopupDonate
          closeModal={() => closeModal("Donate")}
          status={isPopupDonate}
          tournamentId={tournamentId as string}
          currency={currency}
          thumbnail={thumbnail}
        /> */}

				<PopupDonate
					closeModal={() => closeModal("Donate")}
					status={isPopupDonate}
					tournamentId={tournamentId}
					currency={currency}
					types={"TOURNAMENT"}
					name={name}
					thumbnail={thumbnail}
				/>
				<PopupShare
					closeModal={() => closeModal("Invite or Share")}
					status={isPopupShare}
				/>

				<ConnectWalletModal />
				<ClaimResultModal totalPrizePool={totalPrizePool} currency={currency} />
			</div>
		</>
	);
};

export default function TournamentDetailSafe() {
	const router = useRouter();
	const { id } = router.query;

	if (!id) {
		if (isClientDevMode) {
			console.warn("{TournamentDetail} Hey tournamentId is NULL");
		}
	}

	return id ? <TournamentDetail tournamentId={id as string} /> : null;
}
