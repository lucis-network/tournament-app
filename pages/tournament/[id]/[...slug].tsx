import s from "./TournamentDetail.module.sass";
import { Col, Row, Spin, Tabs, message, Image } from "antd";
import Banner from "components/ui/tournament/detail/Banner";
import {
  useSponsors,
  useTournamentDetail,
} from "hooks/tournament/useTournamentDetail";
import { Router, useRouter } from "next/router";
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
import ConnectWalletModal from "components/Auth/components/ConnectWalletModal";
import { isClientDevMode } from "../../../utils/Env";
import TournamentService from "components/service/tournament/TournamentService";
import DonationHistory from "../../../components/ui/tournament/detail/tabsitem/donationHistory";
import ListRanks from "components/ui/tournament/detail/tabsitem/listranks";
import PopupConfirm from "components/ui/tournament/detail/popup/PopupConfirm";
import Link from "next/link";
import LoginModal from "components/Auth/Login/LoginModal";
import AuthStore from "components/Auth/AuthStore";
import { getLocalAuthInfo } from "components/Auth/AuthLocal";
import { isEmpty } from "lodash";
import TournamentDetailMarquee from "../../../components/ui/tournament/detail/marquee";
import DocHead from "../../../components/DocHead";
import moment from "moment";
import TournamentDetailSponsor from "components/ui/tournament/detail/sponsor/TournamentDetailSponsor";
import useTeamModal from "components/ui/tournament/detail/hooks/useTeamModal";
import PopupNotifyProfile from "components/ui/tournament/detail/popup/popupNotifyProfile";

const { TabPane } = Tabs;

const tabList = [
  "Overview",
  "Rules",
  "Brackets",
  "Participants",
  "Referees",
  "Prizing",
  "Donation history",
];

const TournamentDetail = (props: { tournamentId: string; asPath: string }) => {
  const [isPopupDonate, setIsPopupDonate] = useState(false);
  const [isPopupNotifyProfile, setIsPopupNotifyProfile] = useState(false);
  const [isPopupShare, setIsPopupShare] = useState(false);
  const { tournamentId, asPath } = props;
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Overview");
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
    dataIsubscribeToTournament,
    dataSubscriber,
    isCheckConfirmResult,

    loading,
    loadingParticipant,
    loadingReferees,
    loadingPrizing,
    loadingBracket,
    loadingDonation,

    joinTournament,
    refreshParticipant,
    refetch,

    refetchSubTournament,
    refetchConfirmResult,
    refetchBracket,
    refetchDataSubscriber,
  } = useTournamentDetail({
    // Change to tournamentUid after
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  const { dataSponsors, refetchSponsor } = useSponsors({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  useEffect(() => {
    let obj: any = [];
    if (dataSponsors) {
      dataSponsors.getSponsorSlot?.forEach((item) => {
        if (item?.sponsor_transactions) {
          item?.sponsor_transactions?.forEach((itm) => {
            //Object.assign(object.data, itm);
            let object = {
              name: item?.name ? item?.name : "",
              data: itm,
            };
            obj.push(object);
          });
        }
      });
    }
    if (obj?.length > 2) {
      let ob = obj.slice(0, 3);
      setDataRankSponsors(ob);
    } else {
      setDataRankSponsors(obj);
    }
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
    if (!AuthStore.isLoggedIn) {
      message.info("Please sign in first");
      return;
    }

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
    turns,
    discord,
  } = dataTournamentDetail ?? {};

  const userLocal = getLocalAuthInfo();

  const handSubscribe = () => {
    if (!AuthStore.isLoggedIn) {
      message.info("Please sign in first");
      return;
    }

    if (!AuthStore.isHasMail) {
      setIsPopupNotifyProfile(true);
      return;
    }

    setIsLoadingSub(true);
    const tournamentService = new TournamentService();
    setTimeout(() => {
      const sub = tournamentService
        .subscribeToTournament(tournamentId)
        .then((res) => {
          refetchSubTournament();
          setIsLoadingSub(false);
          refetchDataSubscriber();
        });
    }, 800);
  };

  const handUnsubscribe = () => {
    if (!AuthStore.isLoggedIn) {
      message.info("Please sign in first");
      return;
    }

    if (!AuthStore.isHasMail) {
      setIsPopupNotifyProfile(true);
      return;
    }
    
    setIsLoadingSub(true);
    const tournamentService = new TournamentService();

    setTimeout(() => {
      const sub = tournamentService
        .unsubscribeToTournament(tournamentId)
        .then((res) => {
          refetchSubTournament();
          setIsLoadingSub(false);
          refetchDataSubscriber();
        });
    }, 800);
  };

  const onCancelPopupNotifyProfile = () => {
    setIsPopupNotifyProfile(false);
  }
  const handleActiveTab = (item: string) => {
    setActiveTab(item);
  };

  return (
    <>
      <DocHead title={name} />
      <div className={`${s.wrapper}`}>
        <Banner
          cover={cover}
          className={s.bannerTourDetailWrap}
          bannerClassName={s.bannerTourDetail}
        />
        <div>
          <TournamentDetailSponsor
            tournamentId={tournamentId as string}
            tournament_status={tournament_status as string}
            refetchTounament={refetch}
            currency={currency}
            type={"banner"}
          />
        </div>
        <TournamentDetailMarquee tournamentId={tournamentId as string} />
        <section className={s.tournamentInfo}>
          <div className={`${s.containnerTournamentDetail} lucis-container-2`}>
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
            </div>
            <div className={s.infoWrap}>
              <div className={s.tournamentThumbnail}>
                <Image src={thumbnail} alt="" preview={false} />
              </div>
              <div className={s.tournamentMetadataWrap}>
                <h1 className={s.tournamentTitle}>
                  {name.length > 120 ? name.slice(0, 120) + "..." : name}
                </h1>
                {name.length <= 35 && (
                  <>
                    <br /> <br />
                  </>
                )}
                <div className={s.tournamentStartTime}>
                  <Image
                    src="/assets/TournamentDetail/iconClock.svg"
                    preview={false}
                    alt=""
                  />
                  <span>
                    Start time:{" "}
                    {moment(dataTournamentDetail?.brackets[0]?.start_at).format(
                      "YYYY/MM/DD HH:mm"
                    )}
                  </span>
                </div>
                <Row className={s.tournamentMetadataRow}>
                  {/* metadata */}
                  <Col
                    xs={{ span: 24 }}
                    xl={{ span: 24 }}
                    className={s.tournamentMetadata}
                  >
                    <Row className={s.tournamentTagWrap}>
                      <Col style={{ width: "100%" }}>
                        <Row className={s.contentTopWrap}>
                          <Col
                            className={s.btb_free_entry}
                            style={{ display: "flex" }}
                          >
                            <div className={s.tournamentTag}>
                              <Image
                                src="/assets/TournamentDetail/iconDollarCoin.svg"
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
                          </Col>
                          <Col className={s.gradientBtnWrap}>
                            <Row style={{ width: "100%" }}>
                              <Col className={s.btn_join_discord}>
                                {discord && (
                                  <Link
                                    href={
                                      discord ? discord : `https://discord.com/`
                                    }
                                    passHref
                                  >
                                    <a
                                      className={s.joinDiscord}
                                      target="_blank"
                                    >
                                      <Image
                                        src="/assets/TournamentDetail/ic_dis.svg"
                                        alt=""
                                        preview={false}
                                      />
                                      Join our Discord server{" "}
                                    </a>
                                  </Link>
                                )}
                              </Col>
                              <Col className={s.btn_subscribe}>
                                {!dataIsubscribeToTournament?.IsSubscribeToTournament && (
                                  <Spin spinning={isLoadingSub}>
                                    <button
                                      className={s.btn_detail}
                                      key={"Subscribe"}
                                      onClick={handSubscribe}
                                    >
                                      <Image
                                        src="/assets/TournamentDetail/ic_sub.svg"
                                        preview={false}
                                        alt=""
                                      />
                                      <span className="ml-2">
                                        Subscribe (
                                        {/* {
                                        dataTournamentDetail
                                          ?.tournament_subscribes?.length
                                      } */}
                                        {dataSubscriber})
                                      </span>
                                    </button>
                                  </Spin>
                                )}
                                <Col className={s.btn_subscribed}>
                                  {dataIsubscribeToTournament?.IsSubscribeToTournament && (
                                    <Spin spinning={isLoadingSub}>
                                      <button
                                        key={"Subscribe"}
                                        onClick={handUnsubscribe}
                                      >
                                        <Image
                                          src="/assets/Campaign/Banner/svg/subcribed.svg"
                                          preview={false}
                                          alt=""
                                        />
                                        <span className="ml-2">
                                          Subscribed (
                                          {/* {
                                      dataTournamentDetail
                                        ?.tournament_subscribes?.length
                                    } */}
                                          {dataSubscriber})
                                        </span>
                                      </button>
                                    </Spin>
                                  )}
                                </Col>
                              </Col>
                              <Col className={s.btn_share}>
                                <button
                                  key={"InviteorShare"}
                                  className={`${s.btn_detail} ${s.btn_detail_share}`}
                                  onClick={() => openModal("Invite or Share")}
                                >
                                  <Image
                                    src="/assets/TournamentDetail/ic_share.svg"
                                    preview={false}
                                    alt=""
                                  />
                                  <span className="ml-2">Share</span>
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row
                      gutter={{ sm: 20, lg: 30 }}
                      className={s.content_bottom}
                    >
                      <Row style={{ width: "100%" }}>
                        <Col
                          className={`${s.metadataBlock} ${s.col_item} ${s.bracket}`}
                        >
                          <h4 className={s.metadataTitle}>Bracket type</h4>
                          <div className={s.metadataValue}>
                            {dataBracket?.type === "SINGLE"
                              ? "Single elimination"
                              : dataBracket?.type === "DOUBLE"
                              ? "Double elimination"
                              : ""}
                          </div>
                        </Col>
                        <Col
                          className={`${s.metadataBlock} ${s.col_item} ${s.col_team} ${s.team_size}`}
                        >
                          <h4 className={s.metadataTitle}>Team size</h4>
                          <div className={s.metadataValue}>
                            {team_size ?? "-"}v{team_size ?? "-"}
                          </div>
                        </Col>
                        <Col
                          className={`${s.metadataBlock} ${s.alignRightMb} ${s.col_item} ${s.participants}`}
                        >
                          <h4 className={s.metadataTitle}>Max participants</h4>
                          <div className={s.metadataValue}>{participants}</div>
                        </Col>
                        <Col
                          className={`${s.alignRightMb} ${s.bo} ${s.col_item}`}
                        >
                          <h4 className={s.metadataTitle}></h4>
                          <div className={s.metadataValue}>BO{turns}</div>
                        </Col>
                      </Row>

                      <Col className={s.gameInfoBlock}>
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
                      <Col
                        xs={{ span: 12 }}
                        sm={{ span: 8 }}
                        className={s.userInfoBlock}
                      >
                        <Link
                          href={
                            user?.profile?.user_name
                              ? `/profile/${user?.profile?.user_name}`
                              : "#"
                          }
                          passHref
                        >
                          <a
                            className={`${s.userInfo} ${s.alignRightMb}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                  {/* <Col
                    xs={{ span: 24 }}
                    xl={{ span: 9 }}
                    className={s.generousSponsorsWrap}
                    style={{display: "none"}}
                  >
                    {dataRankSponsors.length > 0 && (
                      <>
                        <h3 className={s.generousSponsorsTitle}>
                          Our generous sponsors
                        </h3>
                        <div className={s.generousSponsorsList}>
                          {dataRankSponsors.map((item: any, index: number) => {
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
                      </>
                    )}
                  </Col> */}
                </Row>
              </div>
            </div>
          </div>
        </section>
        <div className={`lucis-container-2 ${s.bgCharacters}`}>
          <div>
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
            {/* <TournamentDetailSponsor
              tournamentId={tournamentId as string}
              tournament_status={tournament_status as string}
              refetchTounament={refetch}
              currency={currency}
            /> */}
            {/* ===== end sponsor ===== */}
          </div>
        </div>
        <div>
          <TournamentDetailSponsor
            tournamentId={tournamentId as string}
            tournament_status={tournament_status as string}
            refetchTounament={refetch}
            currency={currency}
            refetchSponsor={refetchSponsor}
          />
        </div>
        {/* ===== tabs ===== */}
        <div className={`lucis-container-2 ${s.container_Tabs}`}>
          {/* <Tabs
            defaultActiveKey="1"
            className={s.block_tabs}
            tabPosition="top"
          >
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
                refetchBracket={refetchBracket}
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
              />
            </TabPane>
          </Tabs> */}

          <div className={s.block_tabs}>
            {tabList.map((item: string) => {
              return (
                <div
                  className={s.tab_item}
                  style={item === activeTab ? { opacity: 1 } : { opacity: 0.5 }}
                  key={item}
                  onClick={() => handleActiveTab(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>

          <div className={s.content_tab}>
            {(() => {
              switch (activeTab) {
                case "Overview":
                  return <Overview desc={desc as string} />;
                case "Rules":
                  return <Rules rules={rules as string} />;
                case "Brackets":
                  return (
                    <Brackets
                      dataBracket={dataBracket}
                      loadingBracket={loadingBracket}
                      refereeIds={referees ? referees.split(",") : []}
                      refetchBracket={refetchBracket}
                    />
                  );
                case "Participants":
                  return (
                    <>
                      {tournament_status !== "CLOSED" && (
                        <TableParticipant
                          dataParticipants={dataParticipants}
                          loading={loadingParticipant}
                          tournamentId={tournamentId as string}
                          currency={currency}
                          tournament_status={tournament_status as string}
                          refetch={refetch}
                          dataBracket={dataBracket}
                        />
                      )}
                      {tournament_status === "CLOSED" && (
                        <ListRanks
                          tournamentId={tournamentId as string}
                          currency={currency}
                        />
                      )}
                    </>
                  );
                case "Referees":
                  return (
                    <Referees
                      dataRefereesDetail={dataRefereesDetail}
                      loadingReferees={loadingReferees}
                      tournamentId={tournamentId as string}
                      currency={currency}
                      tournament_status={tournament_status as string}
                      refetch={refetch}
                    />
                  );
                case "Prizing":
                  return (
                    <Prizing
                      dataPrizing={dataPrizing}
                      loadingPrizing={loadingPrizing}
                      currency={currency}
                    />
                  );
                case "Donation history":
                  return (
                    <DonationHistory
                      dataDonation={dataDonation}
                      loadingDonation={loadingDonation}
                      currency={currency}
                    />
                  );
                default:
                  break;
              }
            })()}
          </div>
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

        <PopupConfirm
          show={showConfirm}
          onCancel={() => setShowConfirm(false)}
          tournamentId={tournamentId as string}
          refetchConfirmResult={refetchConfirmResult}
          tournament_status={tournament_status}
          refetchTounament={refetch}
        />

        <PopupNotifyProfile status={isPopupNotifyProfile} onCancel={onCancelPopupNotifyProfile}></PopupNotifyProfile>
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
