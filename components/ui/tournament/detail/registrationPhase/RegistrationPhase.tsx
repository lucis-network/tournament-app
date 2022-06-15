import { observer } from "mobx-react-lite";
import { Button, Col, Image, message, Modal, Row, Tooltip } from "antd";
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
import {
  useClaimReward,
  useUpdateParticipant,
  useUpdateTotalDonation,
  useUpdateTotalPrizePool,
} from "hooks/tournament/useTournamentDetail";
import ClaimDonationModal from "../popup/claimDonationModal/ClaimDonationModal";
import TournamentService from "components/service/tournament/TournamentService";
import { ApolloQueryResult, useLazyQuery } from "@apollo/client";
import useTournament from "../hooks/useTournament";
import CountdownTimer from "components/ui/common/CountDown";
import { CalendarOutlined } from "@ant-design/icons";
import AuthStore from "components/Auth/AuthStore";
import SpinLoading from "components/ui/common/Spin";
import { isEmpty } from "lodash";
import ClaimResultModal from "../popup/claimResultModal/ClaimResultModal";
import AuthService from "components/Auth/AuthService";
import { to_hex_str } from "utils/String";
import { getLocalAuthInfo } from "components/Auth/AuthLocal";
import { GET_MY_TEAM } from "components/ui/common/tabsItem/myTeamDetail/myTeamService";

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
  } = props.tournament;

  const {
    isJoin,
    isCheckin,
    tournamentId,
    dataBracket,
    refetch,
    refreshParticipant,
  } = props;
  const user = getLocalAuthInfo();

  const [searchTeam, { refetch: refetchGetMyTeam }] = useLazyQuery(
    GET_MY_TEAM,
    {
      variables: {
        user_id: user?.profile?.user_id,
      },
    }
  );

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

  const { dataUpdateTotalDonation } = useUpdateTotalDonation({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  const { dataUpdateTotalPrizePool } = useUpdateTotalPrizePool({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  const { dataUpdateParticipant } = useUpdateParticipant({
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  const [dataPrize, setDataPrize] = useState<Reward>();
  const [dataSystemPrize, setDataSystemPrize] = useState<Reward>();
  const [dataDonation, setDataDonation] = useState<Reward[]>();
  const [totalFromDonation, setTotalFromDonation] = useState(0);
  const [loadingClaimPrizePool, setLoadingClaimPrizePool] = useState(false);
  const [loadingClaimPrizeSystem, setLoadingClaimPrizePoolSystem] =
    useState(false);

  const [checkClaimPoolSize, setCheckClaimPoolSize] = useState(false);

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
              TournamentStore.claimResultModalVisible = true;
              setLoadingClaimPrizePool(false);
            }
          },
          (error) => {
            message.warning("You have received this prize.", 10);
            setLoadingClaimPrizePool(false);
          }
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
              TournamentStore.claimResultModalVisible = true;
              setLoadingClaimPrizePoolSystem(false);
            }
          },
          (error) => {
            message.warning("You have received this prize.", 10);
            setLoadingClaimPrizePoolSystem(false);
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

  useEffect(() => {
    if (TournamentStore.checkBacktoTournament) {
      handleOpenModal();
      refetchGetMyTeam();
      TournamentStore.checkBacktoTournament = false;

      //@ts-ignore
      document.getElementById("registrationPhase").scrollIntoView();
    }
  }, [TournamentStore.checkBacktoTournament == true]);
  return (
    <>
      <div className={s.registrationPhase} id="registrationPhase">
        {/* <div className={s.startTime}>
          <Image
            src="/assets/TournamentDetail/iconCalendar.svg"
            preview={false}
            alt=""
          />
          <p className="mb-0">
            <span className="font-bold">Start time: </span>
            {moment(brackets?.[0].start_at).format("YYYY/MM/DD HH:mm")}
          </p>
        </div> */}
        <div className={s.registrationPhaseMetadata}>
          <div className={s.item}>
            <div className={s.itemImg}>
              <Image
                src="/assets/TournamentDetail/goldCup.png"
                alt=""
                preview={false}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <div className={s.itemText}>
                  <h3>
                    {dataUpdateTotalPrizePool
                      ? fomatNumber(dataUpdateTotalPrizePool?.total_prize_pool)
                      : fomatNumber(totalPrizePool)}{" "}
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
                          {fomatNumber(Number.parseFloat(additionPrize))} LUCIS
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
                  ? fomatNumber(dataUpdateTotalDonation?.total_donation)
                  : fomatNumber(totalDonation)}{" "}
                {currency.symbol}
              </h3>
              <p>TOTAL DONATION</p>
            </div>
            <div className={s.additionalInfo}>
              {tournament_status !== "CLOSED" && (
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
            {tournament_status !== "CLOSED" && (
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
            {tournament_status === "CLOSED" && (
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
                          <button onClick={handleOpenLeaveTournament}>
                            Unjoin tournament
                          </button>
                        ) : (
                          <button
                            onClick={handleOpenModal}
                            disabled={isFullParticipant}
                          >
                            Join tournament
                          </button>
                        )}
                      </div>
                    );
                  case "CHECKIN":
                    return (
                      <div className={s.joinWrap}>
                        {isJoin ? (
                          !isCheckin ? (
                            <button onClick={handleCheckinTournament}>
                              {loadingCheckin ? (
                                <SpinLoading className="pt-0" size={24} />
                              ) : (
                                "Check-in"
                              )}
                            </button>
                          ) : (
                            <button disabled>Checked</button>
                          )
                        ) : null}
                      </div>
                    );
                  case "CLOSED":
                    return (
                      // todo closeds
                      <div className="pt-5">
                        <div className={s.claimWrap}>
                          {/* {(dataPrize?.amount && dataPrize?.amount > 0) ||
                          (dataSystemPrize?.amount &&
                            dataSystemPrize?.amount > 0) ? (
                            <p>YOUR REWARDS</p>
                          ) : (
                            ""
                          )} */}
                          <div className={`${s.rewards} pt-5 `}>
                            {(dataPrize?.amount && dataPrize?.amount > 0) ||
                              (dataSystemPrize?.amount &&
                                dataSystemPrize?.amount > 0) ||
                              (totalFromDonation > 0 && <div>Prize</div>)}
                            <div className="mb-2">
                              {dataPrize?.amount ? (
                                dataPrize?.amount > 0 ? (
                                  <div className={s.rewardsPrize}>
                                    <p>Prize</p>
                                    <div className={s.rewardsClaimPrize}>
                                      <h3>
                                        {fomatNumber(
                                          dataPrize?.amount
                                            ? dataPrize?.amount
                                            : 0
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
                                        title="abc"
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
                            <div className="mb-6">
                              {dataSystemPrize?.amount ? (
                                dataSystemPrize?.amount > 0 ? (
                                  <div className={s.rewardsClaimPrize}>
                                    <h3>
                                      {fomatNumber(
                                        dataSystemPrize?.amount
                                          ? dataSystemPrize?.amount
                                          : 0
                                      )}{" "}
                                      <span className={s.rewardsClaimSymbol}>
                                        {dataSystemPrize?.symbol}
                                      </span>
                                    </h3>
                                    <Button
                                      onClick={() => claimToken("PrizeSystem")}
                                      className={`${s.btnClaim}`}
                                      disabled={dataSystemPrize?.is_claim}
                                      loading={loadingClaimPrizeSystem}
                                    >
                                      Claim
                                    </Button>
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
                                      <p>From Donation</p>
                                      <div className={s.rewardsClaimPrize}>
                                        <h3>
                                          {fomatNumber(totalFromDonation)}{" "}
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
                            Registration phase will ends in{" "}
                          </span>
                          <CountdownTimer targetDate={timeRegistration} />
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
                        <CountdownTimer targetDate={timeCheckin} />
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
        totalFromDonation={totalFromDonation}
        currency={currency}
        name={name as string}
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
