import { Col, Row } from "antd";
import AuthGameStore from "components/Auth/AuthGameStore";
import { useGetPlatformAccount, useGetStatisticMatch } from "hooks/p2e/useP2E";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { MAP_CSGO } from "utils/Enum";
import s from "../dashboard.module.sass";

export const RecentMatchDetailLOL = () => {
  const router = useRouter();

  const [playerMatchId, setPlayerMatchId] = React.useState<number>(-1);
  const [isLoadData, setIsLoadData] = React.useState<boolean>(false);
  const { getStatisticMatchData } = useGetStatisticMatch(playerMatchId, !isLoadData);

  React.useEffect(() => {
    if (router.query?.id) {
      setPlayerMatchId(Number(router.query.id));
      setIsLoadData(true);
    }
  }, [router.query]);


  const data = getStatisticMatchData?.getCsgoMatchStatistic;
  const faceitAccount = AuthGameStore;
  const lucisPointEarned = {
    kill: data ? Number(data?.match_earning?.kill) * Number(data?.player_statistic?.Kills) : null,
    assists: data ? Number(data?.match_earning?.assist) * Number(data?.player_statistic?.Assists) : null,
    headshot: data ? Number(data?.match_earning?.headshot) * Number(data?.player_statistic?.Headshots) : null,
    mvps: data ? Number(data?.match_earning?.mvp) * Number(data?.player_statistic?.MVPs) : null,
    tripleKill: data ? Number(data?.match_earning?.triple_kill) * Number(data?.player_statistic?.["Triple Kills"]) : null,
    quadraKill: data ? Number(data?.match_earning?.quadra_kill) * Number(data?.player_statistic?.["Quadro Kills"]) : null,
    pentalKill: data ? Number(data?.match_earning?.pental_kill) * Number(data?.player_statistic?.["Penta Kills"]) : null,
    winStreak: data ? Math.max(Number(data?.current_win_streak) - 1, 0) : null
  };


  const totalEarned = Number(lucisPointEarned.kill)
    + Number(lucisPointEarned.assists)
    + Number(lucisPointEarned.headshot)
    + Number(lucisPointEarned.mvps)
    + Number(lucisPointEarned.tripleKill)
    + Number(lucisPointEarned.quadraKill)
    + Number(lucisPointEarned.pentalKill)
    + Number(lucisPointEarned.winStreak)

  const cardList = [
    {
      name: "Double Kill",
      img: "/assets/P2E/lol/detail/doublekill.svg",
      lucisPoint: data?.match_earning?.win ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_win ?? false
    },

    {
      name: "Triple Kill",
      img: "/assets/P2E/lol/detail/triplekill.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "Quadra Kill",
      img: "/assets/P2E/lol/detail/quadrakill.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "Penta Kill",
      img: "/assets/P2E/lol/detail/pentakill.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "Aces",
      img: "/assets/P2E/lol/detail/aces.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "Creep Aces",
      img: "/assets/P2E/lol/detail/creep-aces.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "MVP",
      img: "/assets/P2E/lol/detail/mvp.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "Tank Aces",
      img: "/assets/P2E/lol/detail/tank-aces.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "Damage Aces",
      img: "/assets/P2E/lol/detail/dame-aces.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "Gold Aces",
      img: "/assets/P2E/lol/detail/gold-aces.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "Kill Aces",
      img: "/assets/P2E/lol/detail/kill-aces.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "Assist Aces",
      img: "/assets/P2E/lol/detail/assist-aces.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "Break Eyes",
      img: "/assets/P2E/lol/detail/break-eyes.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },

    {
      name: "Eyes Plug",
      img: "/assets/P2E/lol/detail/eye-plug.svg",
      lucisPoint: data?.match_earning?.most_kill,
      lucisToken: "-",
      isCompleted: data?.most_kill ?? false
    },


  ];

  const lucisPointBonus = () => {
    let point = 0;
    cardList.forEach((item, index) => {
      if (item.isCompleted) {
        point += Number(item.lucisPoint);
      }
    });

    return point ?? "-";
  }
  return (
    <div className="lucis-container-2">
      <div className={s.dailyContainer}>
        <Row gutter={[{ lg: 52, xs: 16, md: 16 }, { xs: 16, md: 16, sm: 16 }]}>
          <Col lg={{ span: 16, order: 1 }} xs={{ span: 24, order: 2 }}>
            <div className={s.achievementListCard}>
              <Row className={s.achievementHeader}>
                <Col sm={12} xs={24}>
                  <h2>
                    <img src="/assets/P2E/back-icon.svg" alt="" onClick={() => router.back()} />
                    Achievement
                  </h2>
                </Col>
                <Col sm={12} xs={24} className={s.lucisBonus}>
                  <span style={{ color: "#00F9FF" }}>Lucis bonus: </span>
                  <div className={s.rewardItem} style={{ marginLeft: 16, marginRight: 16 }}>
                    <span>{"-"}</span>
                    <img src="/assets/P2E/lucis-token.svg" alt="" />
                  </div>
                  <div className={s.rewardItem}>
                    <span className={s.lucisPoint}>+{lucisPointBonus()}</span>
                    <img src="/assets/P2E/lucis-point.svg" alt="" />
                  </div>
                </Col>
              </Row>
              <div className={s.achievementBody}>
                <div className={s.listCard}>
                  <Row gutter={[{ xs: 16, sm: 16, md: 16, lg: 47 }, 40]}>
                    {cardList.map((item, index) => (
                      <Col xs={12} sm={8} md={6} xl={6} key={`${item.name}-${index}`}>
                        <div className={s.wrapperCard}>
                          <img
                            className={s.card}
                            src={item.img}
                          />
                          <div className={s.cardTitle}>
                            {item.name}
                          </div>
                          <div className={s.cardBackgroundTitle}>
                          </div>
                          <div className={s.cardContent}>
                            <div className={s.rewardItem}>
                              <span>{item.lucisToken ?? "-"}</span>
                              <img src="/assets/P2E/lucis-token.svg" alt="" />
                            </div>
                            <div className={s.rewardItem}>
                              <span className={s.lucisPoint}>{item.lucisPoint ?? "-"}</span>
                              <img src="/assets/P2E/lucis-point.svg" alt="" />
                            </div>
                          </div>
                          {!item.isCompleted &&
                            <div className={s.fillCard}>
                            </div>
                          }
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={{ span: 8, order: 2 }} xs={{ span: 24, order: 1 }}>
            <div className={s.sidebarRight}>
              <div className={s.informationDetail}>
                <div className={s.mapBackground}
                  style={{
                    background: `linear-gradient(0deg, rgba(45, 52, 70, 0.8), rgba(45, 52, 70, 0.8)), url("${data?.map?.img_lg}")`
                  }}
                >
                  <h3 className={s.mapName}>{MAP_CSGO[data?.map?.name as string] ?? data?.map?.name ?? "-----"}</h3>
                  {data?.is_win ?
                    <h2 className={s.scoreMatch}>{data?.score?.replace("/", "-")}</h2>
                    : <h2 className={s.scoreMatch} style={{ color: "rgb(204, 132, 110)" }}>{data?.score?.replace("/", "-") ?? "-- / --"}</h2>}
                  <div className={s.endAt}>{moment(data?.end_at).fromNow()}</div>
                </div>
                <div className={s.matchDetail}>
                  <div className={s.accountInfo}>
                    <div className={s.platformInfo}>
                      <img className={s.platformUserAvatar} src={faceitAccount?.faceit_avatar ? faceitAccount?.faceit_avatar : "/assets/avatar.jpg"} />
                      <div className={s.platformUserName}>{faceitAccount?.faceit_nick_name}</div>
                    </div>
                    {data?.is_win ? <h2>WIN</h2> : <h2 style={{ color: "rgb(204, 132, 110)" }}>LOST</h2>}
                  </div>
                  <div className={s.playerParameters}>
                    <div className={s.parameterHeader}>
                      <div className={s.headerLeft}>Your stats</div>
                      <div className={s.headerRight}>Lucis bonus: --%</div>
                    </div>
                    <div className={s.parameterBody}>
                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/csgo/kill.svg" alt="" />
                            <span>{data?.player_statistic?.Kills ?? "-"}</span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className={s.parameterItemText}>
                            Kill
                          </div>
                        </Col>
                        <Col span={6}>
                          <div className={s.rewardItem}>
                            <span>{"-"}</span>
                            <img src="/assets/P2E/lucis-token.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={6}>
                          <div className={s.rewardItem}>
                            <span className={s.lucisPoint}>+ {lucisPointEarned.kill ?? "-"}</span>
                            <img src="/assets/P2E/lucis-point.svg" alt="" />
                          </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/csgo/support.svg" alt="" />
                            <span>{data?.player_statistic?.Assists ?? "-"}</span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className={s.parameterItemText}>
                            Assists
                          </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={6}>
                          <div className={s.rewardItem}>
                            <span className={s.lucisPoint}>+ {lucisPointEarned.assists ?? "-"}</span>
                            <img src="/assets/P2E/lucis-point.svg" alt="" />
                          </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/csgo/headshot.svg" alt="" />
                            <span>{data?.player_statistic?.Headshots ?? "-"}</span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className={s.parameterItemText}>
                            Creep
                          </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.headshot ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/csgo/star.svg" alt="" />
                            <span>{data?.player_statistic?.MVPs ?? "-"}</span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className={s.parameterItemText}>
                            Gold
                          </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.mvps ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/csgo/triple-kill.svg" alt="" />
                            <span>{data?.player_statistic?.["Triple Kills"] ?? "-"}</span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className={s.parameterItemText}>
                            Damage
                          </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.tripleKill ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>

                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/csgo/quadra-kill.svg" alt="" />
                            <span>{data?.player_statistic?.["Quadro Kills"] ?? "-"}</span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className={s.parameterItemText}>
                            Tank
                          </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.quadraKill ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <div style={{ borderBottom: "1px solid #556281" }} />
                      <Row className={s.rowTotal}>
                        <Col span={12}>
                          <div className={s.parameterItem}>
                            Total Stats
                          </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>{`+${totalEarned}`}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.rowTotal}>
                        <Col span={12}>
                          <div className={s.parameterItem}>
                            Total Achievement
                          </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>{`+${lucisPointBonus()}`}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>

                    </div>
                  </div>
                </div>
                <div className={s.grandTotal}>
                  <Row className={s.rowTotal}>
                    <Col span={12}>
                      <div className={s.parameterItem} style={{ color: "#00F9FF", fontFamily: "Revx Neue Demo" }}>
                        Grand Total
                      </div>
                    </Col>
                    <Col span={6}><div className={s.rewardItem}>
                      <span>{"-"}</span>
                      <img src="/assets/P2E/lucis-token.svg" alt="" />
                    </div>
                    </Col>
                    <Col span={6}><div className={s.rewardItem}>
                      <span className={s.lucisPoint}>{`+${data?.point}`}</span>
                      <img src="/assets/P2E/lucis-point.svg" alt="" />
                    </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
