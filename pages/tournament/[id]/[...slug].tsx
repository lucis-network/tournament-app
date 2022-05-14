import s from "./TournamentDetail.module.sass";
import { Col, Row, Spin, Tabs, message } from "antd";
import Banner from "components/ui/tournament/detail/Banner";
import { useTournamentDetail } from "hooks/tournament/useTournamentDetail";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import ConnectWalletModal from "components/Auth/components/ConnectWalletModal";
import ClaimResultModal from "components/ui/tournament/detail/popup/claimResultModal/ClaimResultModal";
import { isClientDevMode } from "../../../utils/Env";
import TournamentService from "components/service/tournament/TournamentService";
import DonationHistory from "../../../components/ui/tournament/detail/tabsitem/donationHistory";

import ListRanks from "components/ui/tournament/detail/tabsitem/listranks";
import TournamentDetailMarquee from "../../../components/ui/tournament/detail/marquee";
import PopupConfirm from "components/ui/tournament/detail/popup/PopupConfirm";

const { TabPane } = Tabs;

const TournamentDetail = (props: { tournamentId: string; asPath: string }) => {
  const [isPopupDonate, setIsPopupDonate] = useState(false);
  const [isPopupShare, setIsPopupShare] = useState(false);
  const { tournamentId, asPath } = props;
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const {
    dataTournamentDetail,
    dataParticipants,
    dataRefereesDetail,
    dataPrizing,
    dataBracket,
    dataIsJoin: isJoin,
    dataIsCheckin: isCheckin,
    dataDonation,
    dataListRank,
    isCheckConfirmResult,
    dataIsubscribeToTournament,

    loading,
    loadingParticipant,
    loadingReferees,
    loadingPrizing,
    loadingBracket,
    loadingDonation,
    loadingListRank,

    joinTournament,
    refreshParticipant,
    refetch,

    refetchSubTournament,
    refetchConfirmResult,
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

  const handleOpenConfirmResult = () => {
    setShowConfirm(true);
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
    region,
    additionPrize,
    cache_tournament,
    tournament_status,
    referees,
  } = dataTournamentDetail ?? {};

  const handSubscribe = () => {
    setIsLoadingSub(true);
    const tournamentService = new TournamentService();
    const sub = tournamentService
      .subscribeToTournament(tournamentId)
      .then((res) => {
        refetchSubTournament();
        setIsLoadingSub(false);
      });
  };

  const handUnsubscribe = () => {
    setIsLoadingSub(true);
    const tournamentService = new TournamentService();
    const sub = tournamentService
      .unsubscribeToTournament(tournamentId)
      .then((res) => {
        refetchSubTournament();
        setIsLoadingSub(false);
      });
  };

  return (
    <>
      <div className={s.wrapper}>
        <Banner cover={cover} />
        <TournamentDetailMarquee />
        <div className={`lucis-container ${s.group_button}`}>
          {/* {unsubscribe && (
            <button key={"Subscribe"} onClick={handSubscribe}>
              Subscribed
            </button>
          )}
          {subscribe && (
            <button key={"Subscribe"} onClick={handUnsubscribe}>
              Subscribe
            </button>
          )} */}
          <div>
            {tournament_status === "FINISH" && !isCheckConfirmResult && (
              <a
                className="text-16px border text-white py-1 px-4"
                onClick={handleOpenConfirmResult}
              >
                Confirm tournament result
              </a>
            )}
          </div>
          <div className="flex items-center gap-4">
            {dataIsubscribeToTournament?.IsSubscribeToTournament && (
              <Spin spinning={isLoadingSub}>
                <button key={"Subscribe"} onClick={handUnsubscribe}>
                  Subscribed
                </button>
              </Spin>
            )}
            {!dataIsubscribeToTournament?.IsSubscribeToTournament && (
              <Spin spinning={isLoadingSub}>
                <button key={"Subscribe"} onClick={handSubscribe}>
                  Subscribe
                </button>
              </Spin>
            )}

            {tournament_status !== "CLOSED" && (
              <button key={"Donate"} onClick={() => openModal("Donate")}>
                Donate
              </button>
            )}

            <button
              key={"InviteorShare"}
              onClick={() => openModal("Invite or Share")}
            >
              Invite or Share
            </button>
          </div>
        </div>

        <Row className={`lucis-container`}>
          <Col span={6} className={s.content_top}>
            <div className={s.img_game}>
              <img src={thumbnail} alt="" />
            </div>
            <h2>{game?.name}</h2>
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
                      ? "Single elimination"
                      : dataBracket?.type === "DOUBLE"
                      ? "Double elimination"
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
                  <span>{region}</span>
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
        <div className={s.bgCharacters}>
          {/* ==== registration phase ====  */}
          <div className={`lucis-container`}>
            <RegistrationPhase
              isJoin={isJoin}
              isCheckin={isCheckin}
              tournament={dataTournamentDetail}
              tournamentId={tournamentId as string}
              joinTournament={joinTournament}
              dataBracket={dataBracket}
              refetch={refetch}
              refreshParticipant={refreshParticipant}
              tournament_status={tournament_status as string}
            />
          </div>
          {/* ===== sponsor ===== */}
          <div className="lucis-container">
            <TournamentDetailSponsor
              tournamentId={tournamentId as string}
              tournament_status={tournament_status as string}
            />
          </div>
          {/* ===== end sponsor ===== */}
        </div>
        {/* ===== tabs ===== */}
        <div className={`lucis-container ${s.container_Tabs}`}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Overview" key="1">
              <Overview desc={desc as string} />
            </TabPane>
            <TabPane tab="Rules" key="2">
              <Rules rules={rules as string} />
            </TabPane>
            <TabPane tab="Bracket" key="3">
              <Brackets
                dataBracket={dataBracket}
                loadingBracket={loadingBracket}
                refereeIds={referees ? referees.split(",") : []}
              />
            </TabPane>
            <TabPane
              tab={`Participants (${cache_tournament?.team_participated}/${participants})`}
              key="4"
            >
              <>
                {tournament_status !== "CLOSED" && (
                  <TableParticipant
                    dataParticipants={dataParticipants}
                    loading={loadingParticipant}
                    tournamentId={tournamentId as string}
                    currency={currency}
                    tournament_status={tournament_status as string}
                  />
                )}
                {tournament_status === "CLOSED" && (
                  <ListRanks
                    dataListRank={dataListRank}
                    loading={loadingListRank}
                    tournamentId={tournamentId as string}
                    currency={currency}
                  />
                )}
              </>
            </TabPane>
            <TabPane tab="Referees" key="5">
              <Referees
                dataRefereesDetail={dataRefereesDetail}
                loadingReferees={loadingReferees}
                tournamentId={tournamentId as string}
                currency={currency}
                tournament_status={tournament_status as string}
              />
            </TabPane>
            <TabPane tab="Prizing" key="6">
              <Prizing
                dataPrizing={dataPrizing}
                loadingPrizing={loadingPrizing}
                currency={currency}
              />
            </TabPane>
            <TabPane tab="Donation history" key="7">
              <DonationHistory
                dataDonation={dataDonation}
                loadingDonation={loadingDonation}
                currency={currency}
                tournament={dataTournamentDetail}
              />
            </TabPane>
          </Tabs>
        </div>

        <div className={s.communityC}></div>
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
          asPath={asPath}
        />

        <ConnectWalletModal />
        <ClaimResultModal
          totalPrizePool={totalPrizePool as number}
          currency={currency}
          name={name as string}
        />

        <PopupConfirm
          show={showConfirm}
          onCancel={() => setShowConfirm(false)}
          tournamentId={tournamentId as string}
          refetchConfirmResult={refetchConfirmResult}
        />
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

  return id ? (
    <TournamentDetail tournamentId={id as string} asPath={router.asPath} />
  ) : null;
}
