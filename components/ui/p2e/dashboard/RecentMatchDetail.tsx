import { Col, Row } from "antd";
import ButtonWrapper from "components/common/button/Button";
import { useGetPlatformAccount, useGetStatisticMatch } from "hooks/p2e/useP2E";
import { useRouter } from "next/router";
import React from "react";
import { MAP_CSGO } from "utils/Enum";
import s from "./dashboard.module.sass";


export const RecentMatchDetail = () => {
  const router = useRouter();

  const [playerMatchId, setPlayerMatchId] = React.useState<number>(-1);
  const [isLoadData, setIsLoadData] = React.useState<boolean>(false);
  const { getStatisticMatchLoading, getStatisticMatchData } = useGetStatisticMatch(playerMatchId, !isLoadData);
  const { getPlatformAccountData } = useGetPlatformAccount();
  React.useEffect(() => {
    if (router.query?.id) {
      setPlayerMatchId(Number(router.query.id));
      setIsLoadData(true);
    }
  }, [router.query]);


  const data = getStatisticMatchData?.getMatchStatistic;
  const faceitAccount = getPlatformAccountData?.getPlatformAccount?.[0];
  const lucisPointEarned = {
    kill: Number(data?.map_earning?.kill) * Number(data?.player_statistic?.Kills),
    assists: Number(data?.map_earning?.assist) * Number(data?.player_statistic?.Assists),
    headshot: Number(data?.map_earning?.headshot) * Number(data?.player_statistic?.Headshots),
    mvps: Number(data?.map_earning?.mvp) * Number(data?.player_statistic?.MVPs)
  };

  const totalEarned = lucisPointEarned.kill + lucisPointEarned.assists + lucisPointEarned.headshot + lucisPointEarned.mvps;

  const cardList = [
    {
      name: "Win streak",
      img: "/assets/P2E/csgo/achievement/win-streak.png",
      lucisPoint: "-",
      lucisToken: "-",
      isCompleted: true
    },

    {
      name: "Win",
      img: "/assets/P2E/csgo/achievement/win.png",
      lucisPoint: data?.map_earning?.win ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_win ?? false
    },

    {
      name: "Triple kill",
      img: "/assets/P2E/csgo/achievement/triple-kill.png",
      lucisPoint: Number(data?.map_earning?.triple_kill) * Number(data?.player_statistic?.["Triple Kills"]) ?? "-",
      lucisToken: "-",
      isCompleted: Number(data?.player_statistic?.["Triple Kills"]) > 0 ?? false
    },
    {
      name: "Quadra kill",
      img: "/assets/P2E/csgo/achievement/quadra-kill.png",
      lucisPoint: Number(data?.map_earning?.quadra_kill) * Number(data?.player_statistic?.["Quadro Kills"]) ?? "-",
      lucisToken: "-",
      isCompleted: Number(data?.player_statistic?.["Quadro Kills"]) > 0 ?? false
    },
    {
      name: "Penta kill",
      img: "/assets/P2E/csgo/achievement/penta-kill.png",
      lucisPoint: Number(data?.map_earning?.pental_kill) * Number(data?.player_statistic?.["Penta Kills"]) ?? "-",
      lucisToken: "-",
      isCompleted: Number(data?.player_statistic?.["Penta Kills"]) > 0 ?? false
    },

    {
      name: "Assassin",
      img: "/assets/P2E/csgo/achievement/assassin.png",
      lucisPoint: "-",
      lucisToken: "-",
      isCompleted: false
    },

    {
      name: "Supporter",
      img: "/assets/P2E/csgo/achievement/supporter.png",
      lucisPoint: Number(data?.map_earning?.most_support) ?? "-",
      lucisToken: "-",
      isCompleted: data?.most_support ?? false
    },

    {
      name: "Survivor",
      img: "/assets/P2E/csgo/achievement/survivor.png",
      lucisPoint: Number(data?.map_earning?.least_died) ?? "-",
      lucisToken: "-",
      isCompleted: data?.least_died ?? false
    },

    {
      name: "Headshoter",
      img: "/assets/P2E/csgo/achievement/headshoter.png",
      lucisPoint: Number(data?.map_earning?.most_headshot) ?? "-",
      lucisToken: "-",
      isCompleted: data?.most_headshot ?? false
    },

    {
      name: "K/D ratio top 1",
      img: "/assets/P2E/csgo/achievement/k-d.png",
      lucisPoint: Number(data?.map_earning?.highest_kda) ?? "-",
      lucisToken: "-",
      isCompleted: data?.highest_kda ?? false
    },

    {
      name: "K/R ratio top 1",
      img: "/assets/P2E/csgo/achievement/k-r.png",
      lucisPoint: "-",
      lucisToken: "-",
      isCompleted: false
    },


  ]
  return (
    <div className="lucis-container-2">
      <div className={s.dailyContainer}>
        <Row gutter={70}>
          <Col span={16}>
            <div className={s.achievementListCard}>
              <div className={s.achievementHeader}>
                <h2>
                  <img src="/assets/P2E/back-icon.svg" alt="" onClick={() => router.back()} />
                  Achievement
                </h2>
                <div className={s.lucisBonus}>
                  <span style={{ color: "#00F9FF" }}>Lucis bonus: </span>
                  <div className={s.rewardItem} style={{ marginLeft: 16, marginRight: 16 }}>
                    <span>{"-"}</span>
                    <img src="/assets/P2E/lucis-token.svg" alt="" />
                  </div>
                  <div className={s.rewardItem}>
                    <span className={s.lucisPoint}>{"-"}</span>
                    <img src="/assets/P2E/lucis-point.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className={s.achievementBody}>
                <div className={s.listCard}>
                  <Row gutter={[40, 40]}>
                    {cardList.map((item, index) => (
                      <Col span={6} key={`${item.name}-${index}`}>
                        <div
                          className={s.card}
                          style={{
                            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("${item.img}")`
                          }}
                        >
                          <div className={s.cardTitle}>
                            {item.name}
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
          <Col span={8}>
            <div className={s.sidebarRight}>
              {!getStatisticMatchLoading && (
                <div className={s.informationDetail}>
                  <h2 className={s.detailTitle}>Stats</h2>
                  <div className={s.mapBackground}
                    style={{
                      background: `linear-gradient(0deg, rgba(45, 52, 70, 0.8), rgba(45, 52, 70, 0.8)), url("${data?.map?.img_lg}")`
                    }}
                  >
                    <h3 className={s.mapName}>{MAP_CSGO[data?.map?.name as string] ?? data?.map?.name}</h3>
                    {data?.is_win ?
                      <h2 className={s.scoreMatch}>{data?.score?.replace("/", "-")}</h2>
                      : <h2 className={s.scoreMatch} style={{ color: "rgb(204, 132, 110)" }}>{data?.score?.replace("/", "-")}</h2>}
                    <div className={s.endAt}></div>
                  </div>
                  <div className={s.matchDetail}>
                    <div className={s.accountInfo}>
                      <div className={s.platformInfo}>
                        <img className={s.platformUserAvatar} src={faceitAccount?.avatar ? faceitAccount?.avatar : "/assets/avatar.jpg"} />
                        <div className={s.platformUserName}>{faceitAccount?.nick_name}</div>
                      </div>
                      {data?.is_win ? <h2>WIN</h2> : <h2 style={{ color: "rgb(204, 132, 110)" }}>LOST</h2>}
                    </div>
                    <div className={s.playerParameters}>
                      <div className={s.parameterHeader}>
                        <div className={s.headerLeft}>Your stats</div>
                        <div className={s.headerRight}>Lucis bonus: 30%</div>
                      </div>
                      <div className={s.parameterBody}>
                        <Row className={s.row}>
                          <Col span={6}>
                            <div className={s.parameterItem}>
                              <img src="/assets/P2E/csgo/kill-icon.png" alt="" />
                              <span>{data?.player_statistic?.Kills ?? "-"}</span>
                            </div>
                          </Col>
                          <Col span={6}>
                            <div className={s.parameterItem}>
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
                          <Col span={6}>
                            <div className={s.parameterItem}>
                              <img src="/assets/P2E/csgo/assist-icon.png" alt="" />
                              <span>{data?.player_statistic?.Assists ?? "-"}</span>
                            </div>
                          </Col>
                          <Col span={6}>
                            <div className={s.parameterItem}>
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
                          <Col span={6}>
                            <div className={s.parameterItem}>
                              <img src="/assets/P2E/csgo/death-icon.png" alt="" />
                              <span>{data?.player_statistic?.Headshots ?? "-"}</span>
                            </div>
                          </Col>
                          <Col span={6}>
                            <div className={s.parameterItem}>
                              Headshot
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
                          <Col span={6}>
                            <div className={s.parameterItem}>
                              <img src="/assets/P2E/csgo/mvp-icon.png" alt="" />
                              <span>{data?.player_statistic?.MVPs ?? "-"}</span>
                            </div>
                          </Col>
                          <Col span={6}>
                            <div className={s.parameterItem}>
                              MVPs
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
                        <Row className={s.rowTotal}>
                          <Col span={6}>
                            <div className={s.parameterItem}>
                              Total
                            </div>
                          </Col>
                          <Col span={6}>
                          </Col>
                          <Col span={6}><div className={s.rewardItem}>
                            <span>{"-"}</span>
                            <img src="/assets/P2E/lucis-token.svg" alt="" />
                          </div>
                          </Col>
                          <Col span={6}><div className={s.rewardItem}>
                            <span className={s.lucisPoint}>+ {totalEarned}</span>
                            <img src="/assets/P2E/lucis-point.svg" alt="" />
                          </div>
                          </Col>
                        </Row>

                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

