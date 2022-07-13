import { Col, Row } from "antd";
import AuthGameStore from "components/Auth/AuthGameStore";
import { useGetLOLStatisticMatch, useGetPlatformAccount, useGetStatisticMatch } from "hooks/p2e/useP2E";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { MAP_CSGO, MAP_LOL } from "utils/Enum";
import s from "../dashboard.module.sass";

export const RecentMatchDetailLOL = () => {
  const router = useRouter();

  const [playerMatchId, setPlayerMatchId] = React.useState<string>("");
  const [isLoadData, setIsLoadData] = React.useState<boolean>(false);
  const { getStatisticMatchData } = useGetLOLStatisticMatch(playerMatchId, !isLoadData);

  React.useEffect(() => {
    if (router.query?.id) {
      setPlayerMatchId(router.query.id as string);
      setIsLoadData(true);
    }
  }, [router.query]);


  const data = getStatisticMatchData?.getLolMatchStatistic;
  const faceitAccount = AuthGameStore;
  const lucisPointEarned = {
    win: data?.player_statistic?.win ?? null,
    kill: data?.player_statistic?.kill ?? null,
    assists: data?.player_statistic?.assist ?? null,
    creep: data?.player_statistic?.["minion_kill"] ?? null,
    gold: data?.player_statistic?.["gold_earned"] ?? null,
    damage: data?.player_statistic?.damage_dealt ?? null,
    tank: data?.player_statistic?.damage_taken ?? null,
    eyesKilled: data?.player_statistic?.wards_killed ?? null,
    eyesPlaced: data?.player_statistic?.wards_placed ?? null,
  };


  const totalEarned = Number(lucisPointEarned.kill)
    + Number(lucisPointEarned.assists)
    + Number(lucisPointEarned.creep)
    + Number(lucisPointEarned.gold)
    + Number(lucisPointEarned.damage)
    + Number(lucisPointEarned.tank)
    + Number(lucisPointEarned.win)
    + Number(lucisPointEarned.eyesKilled)
    + Number(lucisPointEarned.eyesPlaced)

  const cardList = [
    {
      name: "Double Kill",
      img: "/assets/P2E/lol/detail/doublekill.svg",
      lucisPoint: data?.player_statistic?.double_kill ?? "-",
      lucisToken: "-",
      isCompleted: data?.player_statistic?.double_kill ?? false
    },

    {
      name: "Triple Kill",
      img: "/assets/P2E/lol/detail/triplekill.svg",
      lucisPoint: data?.player_statistic?.triple_kill ?? "-",
      lucisToken: "-",
      isCompleted: data?.player_statistic?.triple_kill ?? false
    },

    {
      name: "Quadra Kill",
      img: "/assets/P2E/lol/detail/quadrakill.svg",
      lucisPoint: data?.player_statistic?.quadra_kill ?? "-",
      lucisToken: "-",
      isCompleted: data?.player_statistic?.quadra_kill ?? false
    },

    {
      name: "Penta Kill",
      img: "/assets/P2E/lol/detail/pentakill.svg",
      lucisPoint: data?.player_statistic?.penta_kill ?? "-",
      lucisToken: "-",
      isCompleted: data?.player_statistic?.penta_kill ?? false
    },

    {
      name: "Aces",
      img: "/assets/P2E/lol/detail/aces.svg",
      lucisPoint: "-",
      lucisToken: "-",
      isCompleted: false
    },

    {
      name: "Creep Aces",
      img: "/assets/P2E/lol/detail/creep-aces.svg",
      lucisPoint: data?.player_statistic?.most_minion_kill ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_minion_killed ?? false
    },

    {
      name: "MVP",
      img: "/assets/P2E/lol/detail/mvp.svg",
      lucisPoint: data?.player_statistic?.mvp ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_mvp ?? false
    },

    {
      name: "Tank Aces",
      img: "/assets/P2E/lol/detail/tank-aces.svg",
      lucisPoint: data?.player_statistic?.most_damage_taken ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_damage_taken ?? false
    },

    {
      name: "Damage Aces",
      img: "/assets/P2E/lol/detail/dame-aces.svg",
      lucisPoint: data?.player_statistic?.most_damage_dealt ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_damage_dealt ?? false
    },

    {
      name: "Gold Aces",
      img: "/assets/P2E/lol/detail/gold-aces.svg",
      lucisPoint: data?.player_statistic?.most_gold_earned ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_gold_earned ?? false
    },

    {
      name: "Kill Aces",
      img: "/assets/P2E/lol/detail/kill-aces.svg",
      lucisPoint: data?.player_statistic?.most_kill ?? "-",
      lucisToken: "-",
      isCompleted: data?.player_statistic?.most_kill ?? false
    },

    {
      name: "Assist Aces",
      img: "/assets/P2E/lol/detail/assist-aces.svg",
      lucisPoint: data?.player_statistic?.most_assist ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_assist ?? false
    },

    {
      name: "Break Eyes",
      img: "/assets/P2E/lol/detail/break-eyes.svg",
      lucisPoint: data?.player_statistic?.most_wards_killed ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_eye_killed ?? false
    },

    {
      name: "Eyes Plug",
      img: "/assets/P2E/lol/detail/eye-plug.svg",
      lucisPoint: data?.player_statistic?.most_wards_placed ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_eye_placed ?? false
    },


  ];

  const lucisPointBonus = () => {
    let point = 0;
    cardList.forEach((item, index) => {
      if (item.isCompleted && !isNaN(Number(item.lucisPoint))) {
        point += Number(item.lucisPoint);
      }
    });

    return point ?? "-";
  }

  const mapSummonerRift = "https://i.ytimg.com/vi/88Nh8irxfA8/maxresdefault.jpg";
  const mapAram = "https://media.altchar.com/prod/images/940_530/gm-d281cccf-f6aa-41df-801b-d0250df7b6e5-aram.jpg"
  const prefixAvatar = "https://lmssplus.com/static_image/img/profileicon/";
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
                    background: `linear-gradient(0deg, rgba(45, 52, 70, 0.8), rgba(45, 52, 70, 0.8)), url("${data?.match?.type === "NormalDraft" ? mapSummonerRift : mapAram}")`
                  }}
                >
                  <h3 className={s.mapName}>{MAP_LOL[data?.match?.type as string] ?? data?.match?.type ?? "-----"}</h3>
                  {data?.is_win ?
                    <h2 className={s.scoreMatch}>{data?.match?.score?.replace("/", "-")}</h2>
                    : <h2 className={s.scoreMatch} style={{ color: "rgb(204, 132, 110)" }}>{data?.match?.score?.replace("/", "-") ?? "-- / --"}</h2>}
                  <div className={s.endAt}>{moment(data?.match?.end_at).fromNow()}</div>
                </div>
                <div className={s.matchDetail}>
                  <div className={s.accountInfo}>
                    <div className={s.platformInfo}>
                      <img className={s.platformUserAvatar} src={faceitAccount?.lmss_avatar ? `${prefixAvatar}${faceitAccount?.lmss_avatar}` : "/assets/avatar.jpg"} />
                      <div className={s.platformUserName}>{faceitAccount?.lmss_nick_name}</div>
                    </div>
                    {data?.is_win ? <h2>VICTORY</h2> : <h2 style={{ color: "rgb(204, 132, 110)" }}>DEFEAT</h2>}
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
                            <img src="/assets/P2E/lol/damage-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className={s.parameterItemText}>
                            Win
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
                            <span className={s.lucisPoint}>+ {lucisPointEarned.win ?? "-"}</span>
                            <img src="/assets/P2E/lucis-point.svg" alt="" />
                          </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/kill.svg" alt="" />
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
                            <img src="/assets/P2E/lol/support.svg" alt="" />
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
                            <img src="/assets/P2E/lol/creep-icon.svg" alt="" />
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
                          <span className={s.lucisPoint}>+ {lucisPointEarned.creep ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/gold-icon.svg" alt="" />
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
                          <span className={s.lucisPoint}>+ {lucisPointEarned.gold ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/damage-icon.svg" alt="" />
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
                          <span className={s.lucisPoint}>+ {lucisPointEarned.damage ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>

                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/tank-icon.svg" alt="" />
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
                          <span className={s.lucisPoint}>+ {lucisPointEarned.tank ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/tank-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className={s.parameterItemText}>
                            Eyes killed
                          </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.eyesKilled ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={4}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/tank-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className={s.parameterItemText}>
                            Eyes placed
                          </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={6}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.eyesPlaced ?? "-"}</span>
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
                          <span className={s.lucisPoint}>{`+${lucisPointBonus() ?? "-"}`}</span>
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
                      <span className={s.lucisPoint}>{`+${data?.point ?? "-"}`}</span>
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

