import {observer} from "mobx-react-lite";
import {Button, Col, Image, message, Modal, Row, Tooltip} from "antd";
import TournamentStore from "src/store/TournamentStore";
import s from "./index.module.sass";
import moment from "moment";
import ChooseTeamModal from "../popup/chooseTeamModal";
import useTeamModal from "../hooks/useTeamModal";
import {format} from "utils/Number";
import AuthBoxStore from "components/Auth/components/AuthBoxStore";
import ConnectWalletStore from "components/Auth/ConnectWalletStore";
import PopupDonate from "../popup/popupDonate";
import React, {useEffect, useState} from "react";
import {
  useClaimReward,
  useUpdateParticipant,
  useUpdateTotalDonation,
  useUpdateTotalPrizePool,
} from "hooks/tournament/useTournamentDetail";
import ClaimDonationModal from "../popup/claimDonationModal/ClaimDonationModal";
import TournamentService from "components/service/tournament/TournamentService";
import {ApolloError, ApolloQueryResult, useLazyQuery, useQuery} from "@apollo/client";
import useTournament from "../hooks/useTournament";
import CountdownTimer from "components/ui/common/CountDown";
import AuthStore from "components/Auth/AuthStore";
import SpinLoading from "components/ui/common/Spin";
import {isEmpty} from "lodash";
import ClaimResultModal from "../popup/claimResultModal/ClaimResultModal";
import {getLocalAuthInfo, setLocalAuthGameInfo} from "components/Auth/AuthLocal";
import {GET_MY_TEAM, IS_CONNECTED_GAME} from "components/ui/common/tabsItem/myTeamDetail/myTeamService";
import {handleGraphqlErrors} from "utils/apollo_client";
import {Game, OverviewSection} from "../../../../../utils/Enum";
import {ConnectLOLPopup} from "../../../p2e/overview/ConnectLOLPopup";
import AuthGameStore, {AuthGameUser, AuthLMSSGameUser} from "../../../../Auth/AuthGameStore";
import {isDevMode} from "../../../../../utils/Env";
import {fetchJsFromCDN} from "../../../../../utils/DOM";
import {useRouter} from "next/router";

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
  refereeIds: string[];
  is_auto_checkin?: boolean;
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

export type ClaimPrizeSystem = {
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
    require_connect_game,
    game_uid
  } = props.tournament;

  const {isJoin, isCheckin, tournamentId, refetch, refereeIds, is_auto_checkin} = props;
  const router = useRouter();
  const user = getLocalAuthInfo();

  const [searchTeam, {refetch: refetchGetMyTeam}] = useLazyQuery(
    GET_MY_TEAM,
    {
      variables: {
        user_id: user?.profile?.user_id,
        tournament_uid: tournamentId
      },
    }
  );

  const {data: isConnectedGameQuery} = useQuery(
    IS_CONNECTED_GAME,
    {
      variables: {
        user_id: parseFloat(user?.profile?.user_id as unknown as string),
        tournament_uid: tournamentId
      },
    }
  );

  const isFullParticipant = cache_tournament?.team_participated >= participants;

  const {show, step, handleOpenModal, handleCloseModal, stepConfiguration} =
    useTeamModal(props);

  const timeDefault = moment(brackets?.[0].start_at).valueOf();
  let timeRegistration = moment(brackets?.[0].start_at)
    .subtract(75, "minutes")
    .valueOf();

  if (is_auto_checkin) {
    timeRegistration = moment(brackets?.[0].start_at)
      .subtract(45, "minutes")
      .valueOf();
  }
  const timeCheckin = moment(brackets?.[0].start_at)
    .subtract(45, "minutes")
    .valueOf();
  const timeEditBracket = moment(brackets?.[0].start_at)
    .subtract(15, "minutes")
    .valueOf();

  const claimTokenDonation = async () => {
    TournamentStore.claimDonationModalVisible = true;
  };

  const {data, refetch: refetchClaimReward} = useClaimReward({
    tournament_uid: tournamentId ? tournamentId : "",
    skip: isEmpty(tournamentId),
  });

  const {
    openModal: openTournamentModal,
    status,
    loadingCheckin,
    loadingUnjoin,
    handleCloseTourModal,
    handleOpenLeaveTournament,
    handleLeaveTournament,
    handleCheckinTournament,
  } = useTournament(tournamentId || "");

  const {dataUpdateTotalDonation} = useUpdateTotalDonation({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  const {dataUpdateTotalPrizePool} = useUpdateTotalPrizePool({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  const {dataUpdateParticipant} = useUpdateParticipant({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  const [faceitLogin, setFaceitLogin] = useState({
    login: () => { }
  })
  const [openConnectLOLPopup, setOpenConnectLOLPopup] = useState<boolean>(false);
  const [dataPrize, setDataPrize] = useState<Reward>();
  const [dataSystemPrize, setDataSystemPrize] = useState<Reward>();
  const [dataDonation, setDataDonation] = useState<Reward[]>();
  const [totalFromDonation, setTotalFromDonation] = useState(0);
  const [loadingClaimPrizePool, setLoadingClaimPrizePool] = useState(false);
  const [loadingClaimPrizeSystem, setLoadingClaimPrizePoolSystem] =
    useState(false);

  const [checkClaimPoolSize, setCheckClaimPoolSize] = useState(false);
  const [checkClaim, setCheckClaim] = useState(false);
  const [claimStatus, setClaimStatus] = useState(false);
  const [isCheckUserReferee, setIsCheckUserReferee] = useState(false);

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

  useEffect(() => {
    if (user?.id) {
      if (refereeIds.includes(user.id.toString())) {
        setIsCheckUserReferee(true);
      }
    }
  }, [refereeIds]);

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
      is_claim: false,
    };
    arr.push(obj);
  };

  const claimToken = async (value: string) => {
    if (!ConnectWalletStore.address) {
      AuthBoxStore.connectModalVisible = true;
    } else {
      if (value === "PrizePool") {
        setLoadingClaimPrizePool(true);
        const claim: ClaimPrizePool = {
          tournament_uid: tournamentId,
          address: ConnectWalletStore.address,
        };

        let tournamentService = new TournamentService();
        const response = tournamentService.claimPrizePool(claim).then(
          (res) => {
            if (res) {
              refetch();
              setCheckClaimPoolSize(true);
              setClaimStatus(true);
              setLoadingClaimPrizePool(false);
              refetchClaimReward();
            }
          },
          (error: ApolloError) =>
            handleGraphqlErrors(error, (code, messageErr) => {
              if (code === "INTERNAL_SERVER_ERROR") {
                message.error(
                  "An unexpected error has occurred, please contact Lucis for more details",
                  10
                );
              } else {
                message.warning("You have received this prize.", 10);
              }
              setLoadingClaimPrizePool(false);
            })
        );
      }

      if (value === "PrizeSystem") {
        setLoadingClaimPrizePoolSystem(true);
        const claim: ClaimPrizeSystem = {
          tournament_uid: tournamentId,
          address: ConnectWalletStore.address,
        };

        let tournamentService = new TournamentService();
        const response = tournamentService.claimPrizeSystem(claim).then(
          (res) => {
            if (res) {
              refetch();
              setCheckClaimPoolSize(false);
              setClaimStatus(true);
              setLoadingClaimPrizePoolSystem(false);
              refetchClaimReward();
            }
          },
          (error: ApolloError) =>
            handleGraphqlErrors(error, (code, messageErr) => {
              if (code === "INTERNAL_SERVER_ERROR") {
                message.error(
                  "An unexpected error has occurred, please contact Lucis for more details",
                  10
                );
              } else {
                message.warning("You have received this prize.", 10);
              }
              setLoadingClaimPrizePoolSystem(false);
            })
        );
      }
    }
  };

  const closeModal = () => {
    setIsPopupDonate(false);
  };

  const handleCancelClaim = () => {
    setClaimStatus(false);
  };

  const openModal = () => {
    if (!AuthStore.isLoggedIn) {
      message.info("Please sign in first");
      return;
    }

    setIsPopupDonate(true);
  };

  useEffect(() => {
    if (TournamentStore.checkBacktoTournament) {
      handleOpenModal();
      //refetchGetMyTeam();
      TournamentStore.checkBacktoTournament = false;

      //@ts-ignore
      document.getElementById("registrationPhase").scrollIntoView();
    }
  }, [TournamentStore.checkBacktoTournament == true]);

  useEffect(() => {
    refetchGetMyTeam();
  }, []);

  useEffect(() => {
    if (
      (dataPrize?.amount == 0 &&
        dataSystemPrize?.amount == 0 &&
        totalFromDonation == 0) ||
      isEmpty(data)
    ) {
      setCheckClaim(true);
    } else {
      setCheckClaim(false);
    }
  }, [dataPrize, dataSystemPrize, totalFromDonation, data]);

  const handleConnectGame = () => {
    router.push("/");

    sessionStorage.setItem("overviewSection", OverviewSection.CONNECT_GAME.toString());
    sessionStorage.setItem("redirectUrl", router.asPath);
  }
  return (
    <>
      <div className={s.registrationPhase} id="registrationPhase">
        <div className={s.registrationPhaseMetadata}>
          <div className={s.item}>
            <div className={s.itemImg}>
              <Image
                src="/assets/TournamentDetail/goldCup.png"
                alt=""
                preview={false}
              />
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
              <div>
                <div className={s.itemText}>
                  <h3>
                    {dataUpdateTotalPrizePool
                      ? format(dataUpdateTotalPrizePool?.total_prize_pool, 2, {zero_trim: true})
                      : format(totalPrizePool, 2, {zero_trim: true})}{" "}
                    {currency.symbol}
                  </h3>
                  <p>PRIZE POOL</p>
                </div>
                <div className={`${s.additionalInfo} ${s.additionalPrize}`}>
                  {additionPrize ? (
                    additionPrize > 0 ? (
                      <>
                        <h4>Additional prizes:</h4>
                        <p>
                          <Image
                            src="/assets/TournamentDetail/goldCupSmall.svg"
                            preview={false}
                            alt=""
                          />
                          {format(Number.parseFloat(additionPrize), 2, {zero_trim: true})} LUCIS
                          token
                        </p>
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
          </div>
          <div className={s.item}>
            <div className={s.itemImg}>
              <Image
                src="/assets/TournamentDetail/diamondBoxs.png"
                alt=""
                preview={false}
              />
            </div>
            <div className={s.itemText}>
              <h3>
                {dataUpdateTotalDonation
                  ? format(dataUpdateTotalDonation?.total_donation, 2, {zero_trim: true})
                  : format(totalDonation, 2, {zero_trim: true})}{" "}
                {currency.symbol}
              </h3>
              <p>TOTAL DONATION</p>
            </div>
            <div className={s.additionalInfo}>
              {tournament_status != "CLOSED" && (
                <button onClick={openModal}>
                  <Image
                    src="/assets/TournamentDetail/iconDonate.svg"
                    preview={false}
                    alt=""
                  />
                  <span className="ml-2">Donate</span>
                </button>
              )}
            </div>
          </div>

          <div className={s.item}>
            {(tournament_status !== "CLOSED" ||
              (tournament_status === "CLOSED" && checkClaim)) && (
              <>
                <span className={s.itemTitle}>PARTICIPANTS</span>
                <div className={s.itemImg}>
                  <Image
                    src="/assets/TournamentDetail/participant.svg"
                    alt=""
                    preview={false}
                  />
                </div>
                <div className={s.itemText}>
                  <span>
                    {dataUpdateParticipant
                      ? dataUpdateParticipant?.participant
                      : cache_tournament?.team_participated
                        ? cache_tournament?.team_participated
                        : 0}
                    /{participants}
                  </span>
                </div>
              </>
            )}
            {tournament_status === "CLOSED" && !checkClaim && (
              <>
                <div className={s.itemClosed}>
                  <div className={s.itemImgClosed}>
                    <Image
                      src="/assets/TournamentDetail/participant.svg"
                      alt=""
                      preview={false}
                    />{" "}
                    <span className={s.itemTitle}>PARTICIPANTS</span>
                    <span className={s.itemParticipantClosed}>
                      {dataUpdateParticipant
                        ? dataUpdateParticipant?.participant
                        : cache_tournament?.team_participated
                          ? cache_tournament?.team_participated
                          : 0}
                      /{participants}
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className={s.additionalInfo}>
              {(() => {
                switch (tournament_status) {
                  case "REGISTRATION":
                    return (
                      <div className={s.joinWrap}>
                        {isJoin ? (
                          <Button onClick={handleOpenLeaveTournament}>
                            Unjoin tournament
                          </Button>
                        ) : (
                          (require_connect_game && !isConnectedGameQuery?.isConnectGame) ?
                            <Button
                              onClick={handleConnectGame}
                            >
                              Connect game
                            </Button>
                            :
                            <Button
                              onClick={handleOpenModal}
                              disabled={isFullParticipant}
                            >
                              Join tournament
                            </Button>
                        )}
                      </div>
                    );
                  case "CHECKIN":
                    return (
                      <div className={s.joinWrap}>
                        {isJoin ? (
                          !isCheckin ? (
                            <Button onClick={handleCheckinTournament}>
                              {loadingCheckin ? (
                                <SpinLoading className="pt-0" size={24}/>
                              ) : (
                                "Check-in"
                              )}
                            </Button>
                          ) : (
                            <Button disabled>Checked</Button>
                          )
                        ) : null}
                      </div>
                    );
                  case "CLOSED":
                    return (
                      // todo closeds
                      <div>
                        <div className={s.claimWrap}>
                          {(dataPrize?.amount && dataPrize?.amount > 0) ||
                          (dataSystemPrize?.amount &&
                            dataSystemPrize?.amount > 0) ? (
                            <p className={s.claimWrapTitle}>YOUR REWARDS</p>
                          ) : (
                            ""
                          )}
                          <div className={`${s.rewards}`}>
                            {/* {(dataPrize?.amount && dataPrize?.amount > 0) ||
                              (dataSystemPrize?.amount &&
                                dataSystemPrize?.amount > 0) ||
                              (totalFromDonation > 0 && <div className={s.rewardsTitle}>Prize</div>)} */}
                            <div>
                              {dataPrize?.amount ? (
                                dataPrize?.amount > 0 ? (
                                  <div className={s.rewardsPrize}>
                                    <p className={s.rewardsPrizeTitle}>Prize</p>
                                    <div className={s.rewardsClaimPrize}>
                                      <h3>
                                        {format(
                                          dataPrize?.amount
                                            ? dataPrize?.amount
                                            : 0, 2, {zero_trim: true}
                                        )}{" "}
                                        <span className={s.rewardsClaimSymbol}>
                                          {dataPrize?.symbol}
                                        </span>
                                      </h3>
                                      <Button
                                        onClick={() => claimToken("PrizePool")}
                                        className={`${s.btnClaim}`}
                                        disabled={dataPrize?.is_claim}
                                        loading={loadingClaimPrizePool}
                                      >
                                        <Tooltip title="Lucis will take 5% reward as fee">
                                          Claim
                                        </Tooltip>
                                      </Button>
                                    </div>
                                  </div>
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
                                  <div className={s.rewardsPrize}>
                                    <div className={s.rewardsClaimPrize}>
                                      <h3>
                                        {format(
                                          dataSystemPrize?.amount
                                            ? dataSystemPrize?.amount
                                            : 0, 2, {zero_trim: true}
                                        )}{" "}
                                        <span className={s.rewardsClaimSymbol}>
                                          {dataSystemPrize?.symbol}
                                        </span>
                                      </h3>

                                      <Button
                                        onClick={() =>
                                          claimToken("PrizeSystem")
                                        }
                                        className={`${s.btnClaim}`}
                                        disabled={dataSystemPrize?.is_claim}
                                        loading={loadingClaimPrizeSystem}
                                      >
                                        <Tooltip title="Lucis will take 5% reward as fee">
                                          Claim
                                        </Tooltip>
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </div>

                            <div>
                              <div>
                                {totalFromDonation ? (
                                  totalFromDonation > 0 ? (
                                    <div className={s.rewardsPrize}>
                                      <p className={s.rewardsPrizeTitle}>
                                        {isCheckUserReferee ? "Reward for referee" : "From Donation"}
                                      </p>
                                      <div className={s.rewardsClaimPrize}>
                                        <h3>
                                          {format(totalFromDonation, 2, {zero_trim: true})}{" "}
                                          <span
                                            className={s.rewardsClaimSymbol}
                                          >
                                            {currency?.symbol}
                                          </span>
                                        </h3>
                                        <Button
                                          onClick={claimTokenDonation}
                                          className={`${s.btnClaim}`}
                                        >
                                          Claim
                                        </Button>
                                      </div>
                                    </div>
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
														<Button className={`${s.btnClaim} btn-cyan`}>Share my victory</Button>
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
                          <span className={s.countdownRegistration}>
                            Registration phase will end in{" "}
                          </span>
                          <span className={s.countdownRegistrationTimer}>
                            <CountdownTimer targetDate={timeRegistration} refetch={refetch}/>
                          </span>
                        </p>
                      </div>
                    );
                  case "CHECKIN":
                    return (
                      <div className={s.countdownWrap}>
                        <p className="mb-0 mr-4">
                          <span className={s.countdownRegistration}>
                            Check-in phase will ends in{" "}
                          </span>
                        </p>
                        <CountdownTimer targetDate={timeCheckin} refetch={refetch}/>
                      </div>
                    );
                  case "EDIT_BRACKET":
                    return (
                      <div className={s.countdownWrap}>
                        <p className="mb-0 mr-4">
                          <span className={s.countdownRegistration}>
                            Arrange bracket phase will ends in{" "}
                          </span>
                        </p>
                        <CountdownTimer targetDate={timeEditBracket} refetch={refetch}/>
                      </div>
                    );
                  case "PREPARE":
                    return (
                      <div className={s.countdownWrap}>
                        <p className="mb-0 mr-4">
                          <span className={s.countdownRegistration}>
                            Tournament will starts in{" "}
                          </span>
                        </p>
                        <CountdownTimer targetDate={timeDefault} refetch={refetch}/>
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
        totalFromDonation={totalFromDonation}
        currency={currency}
        name={name as string}
        isCheckUserReferee={isCheckUserReferee}
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

      <ClaimResultModal
        totalPrizePool={
          checkClaimPoolSize
            ? (dataPrize?.amount as number)
            : (dataSystemPrize?.amount as number)
        }
        currency={
          checkClaimPoolSize ? dataPrize?.symbol : dataSystemPrize?.symbol
        }
        name={name as string}
        status={claimStatus}
        onCancel={handleCancelClaim}
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
        //bodyStyle={{ display: "none" }}
        footer={null}
        onOk={handleLeaveTournament}
        onCancel={handleCloseTourModal}
      >
        <Row className={s.btn}>
          <Col>
            <Button className="mr-10px" onClick={handleCloseTourModal}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={handleLeaveTournament}
              loading={loadingUnjoin}
            >
              Confirm
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
});
