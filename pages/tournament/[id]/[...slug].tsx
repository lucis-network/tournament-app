import s from "./TournamentDetail.module.sass";
import { Col, Row, Spin, Tabs, message, Image } from "antd";
import Banner from "components/ui/tournament/detail/Banner";
import {
  useSponsors,
  useTournamentDetail,
} from "hooks/tournament/useTournamentDetail";
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
import Link from "next/link";
import LoginModal from "components/Auth/Login/LoginModal";
import AuthStore from "components/Auth/AuthStore";
import { getLocalAuthInfo } from "components/Auth/AuthLocal";
import { isEmpty } from "lodash";

const { TabPane } = Tabs;

const TournamentDetail = (props: { tournamentId: string; asPath: string }) => {
  const [isPopupDonate, setIsPopupDonate] = useState(false);
  const [isPopupShare, setIsPopupShare] = useState(false);
  const { tournamentId, asPath } = props;
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [dataRankSponsors, setDataRankSponsors] = useState([]);

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
    skip: isEmpty(tournamentId)
  });

  const { dataSponsors, refetchSponsor } = useSponsors({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  useEffect(() => {
    let obj: any = [];
    if (dataSponsors) {
      dataSponsors.getSponsorSlot?.forEach((item) => {
        let object = {
          name: "",
          data: {},
        };
        object.name = item?.name ? item?.name : "";

        if (item?.sponsor_transactions) {
          item?.sponsor_transactions?.forEach((itm) => {
            object.data = itm;
            obj.push(object);
          });
        }
      });
    }
    setDataRankSponsors(obj);
  }, [dataSponsors]);

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

  const userLocal = getLocalAuthInfo();

  const handSubscribe = () => {
    if (!AuthStore.isLoggedIn) {
      message.info("Please sign in first");
      return;
    }

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
    if (!AuthStore.isLoggedIn) {
      message.info("Please sign in first");
      return;
    }

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
        <section className={s.tournamentInfo}>
          <div className={`lucis-container-2`}>
            <div className={s.group_button}>
              {userLocal?.id === user?.id &&
                tournament_status === "FINISH" &&
                !isCheckConfirmResult && (
                  <a
                    className="text-16px btn-blur"
                    onClick={handleOpenConfirmResult}
                  >
                    Confirm tournament result
                  </a>
                )}
              <div className={s.gradientBtnWrap}>
                {dataIsubscribeToTournament?.IsSubscribeToTournament && (
                  <Spin spinning={isLoadingSub}>
                    <button key={"Subscribe"} onClick={handUnsubscribe}>
                      <Image
                        src="/assets/TournamentDetail/signInCircle.svg"
                        preview={false}
                        alt=""
                      />
                      <span className="ml-2">Subscribed</span>
                    </button>
                  </Spin>
                )}
                {!dataIsubscribeToTournament?.IsSubscribeToTournament && (
                  <Spin spinning={isLoadingSub}>
                    <button key={"Subscribe"} onClick={handSubscribe}>
                      <Image
                        src="/assets/TournamentDetail/signInCircle.svg"
                        preview={false}
                        alt=""
                      />
                      <span className="ml-2">Subscribe</span>
                    </button>
                  </Spin>
                )}

                {tournament_status !== "CLOSED" && (
                  <button
                    key={"Donate"}
                    onClick={() => {
                      if (!AuthStore.isLoggedIn) {
                        message.info("Please sign in first");
                        return;
                      }
                      openModal("Donate");
                    }}
                  >
                    <Image
                      src="/assets/TournamentDetail/signInCircle.svg"
                      preview={false}
                      alt=""
                    />
                    <span className="ml-2">Donate</span>
                  </button>
                )}

                <button
                  key={"InviteorShare"}
                  onClick={() => openModal("Invite or Share")}
                >
                  <Image
                    src="/assets/TournamentDetail/signInCircle.svg"
                    preview={false}
                    alt=""
                  />
                  <span className="ml-2">Invite or Share</span>
                </button>
              </div>
            </div>
            <div className={s.infoWrap}>
              <div className={s.tournamentThumbnail}>
                <Image src={thumbnail} alt="" preview={false} />
              </div>
              <div className={s.tournamentMetadataWrap}>
                <h1 className={s.tournamentTitle}>{`${name}`}</h1>
                <Row>
                  {/* metadata */}
                  <Col
                    xs={{ span: 24 }}
                    xl={{ span: 15 }}
                    className={s.tournamentMetadata}
                  >
                    <Row className={s.tournamentTagWrap}>
                      <Col xs={{ span: 24 }}>
                        <div>
                          <div className={s.tournamentTag}>
                            <Image
                              src="/assets/TournamentDetail/iconMoney.svg"
                              preview={false}
                              alt=""
                            />{" "}
                            Free entry
                          </div>
                          <div className={s.tournamentTag}>
                            <Image
                              src="/assets/TournamentDetail/iconMapMark.svg"
                              preview={false}
                              alt=""
                            />{" "}
                            {region}
                          </div>
                          <Link href="#" passHref>
                            <a className={s.joinDiscord}>
                              Join our Discord server{" "}
                              <Image
                                src="/assets/TournamentDetail/discordLogo.svg"
                                alt=""
                                preview={false}
                              />
                            </a>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={{ sm: 20, lg: 30 }}>
                      <Col xs={{ span: 24 }} sm={{ span: 9 }}>
                        <h4 className={s.metadataTitle}>Bracket type</h4>
                        <div className={s.metadataValue}>
                          {dataBracket?.type === "SINGLE"
                            ? "Single elimination"
                            : dataBracket?.type === "DOUBLE"
                            ? "Double elimination"
                            : ""}
                        </div>
                      </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                        <h4 className={s.metadataTitle}>Max participants</h4>
                        <div className={s.metadataValue}>{participants}</div>
                      </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 7 }}>
                        <h4 className={s.metadataTitle}>Team size</h4>
                        <div className={s.metadataValue}>
                          {team_size ?? "-"}v{team_size ?? "-"}
                        </div>
                      </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 9 }}>
                        <div className={s.gameInfo}>
                          <Image
                            src={game?.logo}
                            className={s.gameLogo}
                            preview={false}
                            alt=""
                          />
                          <div className={s.gameName}>{game?.name}</div>
                        </div>
                      </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 15 }}>
                        <Link
                          href={
                            user?.profile?.user_name
                              ? `/profile/${user?.profile?.user_name}`
                              : "#"
                          }
                          passHref
                        >
                          <a className={s.userInfo}>
                            {user?.profile?.avatar ? (
                              <Image
                                src={user?.profile?.avatar}
                                className={s.userAvatar}
                                alt=""
                                preview={false}
                              />
                            ) : (
                              <Image
                                src="/assets/avatar.jpg"
                                className={s.userAvatar}
                                alt=""
                                preview={false}
                              />
                            )}
                            <div className={s.userName}>
                              {user?.profile?.display_name}
                            </div>
                          </a>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                  {/* generous sponsors */}
                  <Col
                    xs={{ span: 24 }}
                    xl={{ span: 9 }}
                    className={s.generousSponsorsWrap}
                  >
                    <h3 className={s.generousSponsorsTitle}>
                      Our generous sponsors
                    </h3>
                    <div className={s.generousSponsorsList}>
                      {dataRankSponsors &&
                        dataRankSponsors.map((item: any, index: number) => {
                          return (
                            <div
                              className={`${s.generousSponsor} ${
                                item?.name === "Diamond" ? s.vip : ""
                              }`}
                              key={index}
                            >
                              <div className={s.generousSponsorAvatar}>
                                {item?.data?.logo ? (
                                  <Image
                                    src={item?.data?.logo}
                                    preview={false}
                                    alt=""
                                  />
                                ) : (
                                  <Image
                                    src={
                                      "/assets/TournamentDetail/sponsorAvatar.png"
                                    }
                                    preview={false}
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className={s.generousSponsorName}>
                                {item?.data?.name}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </section>
        <div className={`lucis-container-2 ${s.bgCharacters}`}>
          <div className={s.container900}>
            {/* ==== registration phase ====  */}
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
            {/* ===== sponsor ===== */}
            <TournamentDetailSponsor
              tournamentId={tournamentId as string}
              tournament_status={tournament_status as string}
            />
            {/* ===== end sponsor ===== */}
          </div>
        </div>
        {/* ===== tabs ===== */}
        <div className={`lucis-container-2 ${s.container_Tabs}`}>
          <Tabs defaultActiveKey="1" className={s.block_tabs}>
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
              tab={`Participants (${
                cache_tournament?.team_participated
                  ? cache_tournament?.team_participated
                  : 0
              }/${participants})`}
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
                    refetch={refetch}
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
                refetch={refetch}
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
          refetch={refetch}
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
      <LoginModal />
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
