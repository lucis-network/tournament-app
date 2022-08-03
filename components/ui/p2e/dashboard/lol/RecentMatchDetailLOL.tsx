import { Col, Row } from "antd";
import AuthGameStore from "components/Auth/AuthGameStore";
import MissionService from "components/service/p2e/MissionService";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { LolMatchStatisticGql } from "src/generated/graphql_p2e";
import { MAP_LOL } from "utils/Enum";
import s from "../dashboard.module.sass";

export const RecentMatchDetailLOL = () => {
  const router = useRouter();

  const [statistic, setStatistic] = React.useState<LolMatchStatisticGql>();
  React.useEffect(() => {
    if (router.query?.id) {
      queryData(router.query.id as string);
    }
  }, [router.query]);

  const queryData = async (player_match_id: string) => {
    const res = await MissionService.getLOLMatchStatistic(player_match_id);
    setStatistic(res?.data?.getLolMatchStatistic);
  }

  const data = statistic;
  const faceitAccount = AuthGameStore;
  const lucisPointEarned = {
    kill: data?.player_statistic?.kill ?? 0,
    assists: data?.player_statistic?.assist ?? 0,
    creep: data?.player_statistic?.["minion_kill"] ?? 0,
    gold: data?.player_statistic?.["gold_earned"] ?? 0,
    damage: data?.player_statistic?.damage_dealt ?? 0,
    tank: data?.player_statistic?.damage_taken ?? 0,
    doubleKill: data?.player_statistic?.double_kill ?? 0,
    tripleKill: data?.player_statistic?.triple_kill ?? 0,
    quadraKill: data?.player_statistic?.quadra_kill ?? 0,
    pentalKill: data?.player_statistic?.pental_kill ?? 0,
    eyesKilled: data?.player_statistic?.wards_killed ?? 0,
    eyesPlaced: data?.player_statistic?.wards_placed ?? 0,
  };


  const totalEarned = Number(lucisPointEarned.kill)
    + Number(lucisPointEarned.assists)
    + Number(lucisPointEarned.creep)
    + Number(lucisPointEarned.gold)
    + Number(lucisPointEarned.damage)
    + Number(lucisPointEarned.tank)
    + Number(lucisPointEarned.doubleKill)
    + Number(lucisPointEarned.tripleKill)
    + Number(lucisPointEarned.quadraKill)
    + Number(lucisPointEarned.pentalKill)
    + Number(lucisPointEarned.eyesKilled)
    + Number(lucisPointEarned.eyesPlaced)

  const cardList = [
    {
      name: "Victory",
      img: "/assets/P2E/lol/detail/win.png",
      lucisPoint: data?.player_statistic?.win ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_win ?? false
    },
    {
      name: "Creep`s fear",
      img: "/assets/P2E/lol/detail/Screapt.png",
      lucisPoint: data?.player_statistic?.most_minion_kill ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_minion_killed ?? false
    },

    {
      name: "The Killer",
      img: "/assets/P2E/lol/detail/zed.png",
      lucisPoint: data?.player_statistic?.most_kill ?? "-",
      lucisToken: "-",
      isCompleted: data?.player_statistic?.most_kill ?? false
    },


    {
      name: "Lord of Damage",
      img: "/assets/P2E/lol/detail/damage.png",
      lucisPoint: data?.player_statistic?.most_damage_dealt ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_damage_dealt ?? false
    },

    {
      name: "Bounty Hunter",
      img: "/assets/P2E/lol/detail/gold.png",
      lucisPoint: data?.player_statistic?.most_gold_earned ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_gold_earned ?? false
    },

    {
      name: "The Supporter",
      img: "/assets/P2E/lol/detail/yuumi.png",
      lucisPoint: data?.player_statistic?.most_assist ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_assist ?? false
    },

    {
      name: "Wards Destroyer",
      img: "/assets/P2E/lol/detail/eyes-break.png",
      lucisPoint: data?.player_statistic?.most_wards_killed ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_eye_killed ?? false
    },

    {
      name: "The Vision",
      img: "/assets/P2E/lol/detail/eye-plug.svg",
      lucisPoint: data?.player_statistic?.most_wards_placed ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_eye_placed ?? false
    },
    {
      name: "King of Resistant",
      img: "/assets/P2E/lol/detail/tank.png",
      lucisPoint: data?.player_statistic?.most_damage_taken ?? "-",
      lucisToken: "-",
      isCompleted: data?.is_most_damage_taken ?? false
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

  const mapSummonerRift = "/assets/P2E/lol/detail/sr.png";
  const mapAram = "/assets/P2E/detail/lol/aram.png"
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
                      <Col xs={12} sm={8} md={6} xl={6} key={`${item.name}-${index}`} className={s.achievementItem}>
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
                    background: `linear-gradient(0deg, rgba(45, 52, 70, 0.8), rgba(45, 52, 70, 0.8)), url("${data?.match?.type === "Aram" ? mapAram : mapSummonerRift}")`
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
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/kill.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Kill
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.rewardItem}>
                            <span>{"-"}</span>
                            <img src="/assets/P2E/lucis-token.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.rewardItem}>
                            <span className={s.lucisPoint}>+ {lucisPointEarned.kill ?? "-"}</span>
                            <img src="/assets/P2E/lucis-point.svg" alt="" />
                          </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/support.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Assists
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.rewardItem}>
                            <span className={s.lucisPoint}>+ {lucisPointEarned.assists ?? "-"}</span>
                            <img src="/assets/P2E/lucis-point.svg" alt="" />
                          </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/creep-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Creep
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.creep ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/gold-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Gold
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.gold ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/damage-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Damage
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.damage ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>

                      <Row className={s.row}>
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/tank-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Tank
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.tank ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/detail/double-kill-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Double kill
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.doubleKill ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/detail/triple-kill-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Triple kill
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.tripleKill ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/detail/quadra-kill-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Quadra kill
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.quadraKill ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>

                      <Row className={s.row}>
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/detail/penta-kill-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Pental kill
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.pentalKill ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/detail/wards-placed-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Wards placed
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.eyesPlaced ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.row}>
                        <Col span={3}>
                          <div className={s.parameterItem}>
                            <img src="/assets/P2E/lol/detail/wards-destroyed-icon.svg" alt="" />
                          </div>
                        </Col>
                        <Col span={7}>
                          <div className={s.parameterItemText}>
                            Wards destroyed
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>+ {lucisPointEarned.eyesKilled ?? "-"}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <div style={{ borderBottom: "1px solid #556281" }} />
                      <Row className={s.rowTotal}>
                        <Col span={10}>
                          <div className={s.parameterItem}>
                            Total Stats
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span className={s.lucisPoint}>{`+${totalEarned}`}</span>
                          <img src="/assets/P2E/lucis-point.svg" alt="" />
                        </div>
                        </Col>
                      </Row>
                      <Row className={s.rowTotal}>
                        <Col span={10}>
                          <div className={s.parameterItem}>
                            Total Achievement
                          </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
                          <span>{"-"}</span>
                          <img src="/assets/P2E/lucis-token.svg" alt="" />
                        </div>
                        </Col>
                        <Col span={7}><div className={s.rewardItem}>
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
                    <Col span={10}>
                      <div className={s.parameterItem} style={{ color: "#00F9FF", fontFamily: "Revx Neue Demo" }}>
                        Grand Total
                      </div>
                    </Col>
                    <Col span={7}><div className={s.rewardItem}>
                      <span>{"-"}</span>
                      <img src="/assets/P2E/lucis-token.svg" alt="" />
                    </div>
                    </Col>
                    <Col span={7}><div className={s.rewardItem}>
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

