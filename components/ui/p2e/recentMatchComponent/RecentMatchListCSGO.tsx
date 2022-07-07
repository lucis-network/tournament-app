import { Col, Row } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { CsgoPlayerMatch } from "src/generated/graphql_p2e";
import { Game, MAP_CSGO } from "utils/Enum";
import { dateToHoursFormat } from "utils/Time";
import SpinLoading from "../../common/Spin";
import s from './recentMatch.module.sass'


interface IProps {
  recentMatches: CsgoPlayerMatch[];
  loading: boolean;
  isHistory?: boolean;
  title?: string;
  hasButtonBack?: boolean;
}
export const RecentMatchListCSGO = React.memo((props: IProps) => {
  const router = useRouter();
  const [recentMatchesFiltered, setRecentMatchesFiltered] = useState<{ [endAt: string]: CsgoPlayerMatch[] }>({})

  useEffect(() => {
    filterDayRecentMatch();
  }, [props.recentMatches])



  const lucisPointRewardToday = (matches: CsgoPlayerMatch[]): number => {
    let total = 0;
    matches?.forEach((match) => {
      total += match.lucis_point;
    })
    return total
  }

  console.log(props.loading)

  const filterDayRecentMatch = () => {
    let filteredList: { [endAt: string]: CsgoPlayerMatch[] } = {};
    props?.recentMatches
      ?.forEach((item: CsgoPlayerMatch) => {
        const endAtString = moment(new Date(item?.match?.end_at)).format("YYYY/MM/DD")
        if (!filteredList[endAtString]) {
          filteredList[endAtString] = [item];
        } else {
          filteredList[endAtString].push(item);
        }
      });

    setRecentMatchesFiltered(filteredList);
  }

  return (
    <>

      {
        Object.entries(recentMatchesFiltered).length === 0 ? (
          <>
            <Row className={s.recentMatchTitle}>
              <Col xs={24} sm={12}>
                <h2>
                  {props.hasButtonBack && <img style={{ marginRight: 16, cursor: "pointer" }} src="/assets/P2E/back-icon.svg" alt="" onClick={() => router.back()} />}
                  {props.title ? props.title : "Recent matches"}
                </h2>
              </Col>
              <Col xs={24} sm={12} className={s.recentMatchRewardGeneral}>
                <div style={{ marginRight: 16 }}>
                  Today :
                </div>
                <div className={s.rewardItem} style={{ marginRight: 8 }}>
                  <span className={s.lucisPoint}>{0} / ∞</span>
                  <img src="/assets/P2E/lucis-point.svg" alt="" />
                </div>
                <div className={s.rewardItem}>
                  <span>-- / 300</span>
                  <img src="/assets/P2E/lucis-token.svg" alt="" />
                </div>
              </Col>
            </Row>
            <div className={s.blankState}>
              {props.loading ? <SpinLoading /> : (
                props.isHistory ? "No matches found."
                  :
                  "No matches found. Please play a match to start earning LUCIS point."
              )
              }
            </div>
          </>
        ) : Object.entries(recentMatchesFiltered).map((item, index) => {
          return (
            <div key={item[0]}>
              <Row className={s.recentMatchTitle}>
                {index === 0 && <Col xs={24} sm={12} >
                  <h2>
                    {props.hasButtonBack && <img style={{ marginRight: 16, cursor: "pointer" }} src="/assets/P2E/back-icon.svg" alt="" onClick={() => router.back()} />}
                    {props.title ? props.title : "Recent matches"}
                  </h2>
                </Col>}
                <Col xs={24} sm={index === 0 ? 12 : 24} className={s.recentMatchRewardGeneral}>
                  <div style={{ marginRight: 16 }}>
                    {item[0]} :
                  </div>
                  <div className={s.rewardItem} style={{ marginRight: 8 }}>
                    <span className={s.lucisPoint}>{lucisPointRewardToday(item[1])} / ∞</span>
                    <img src="/assets/P2E/lucis-point.svg" alt="" />
                  </div>
                  <div className={s.rewardItem}>
                    <span>-- / 300</span>
                    <img src="/assets/P2E/lucis-token.svg" alt="" />
                  </div>
                </Col>
              </Row>
              <div className={s.recentMatchList}>
                <Row gutter={[{ xs: 8, md: 0 }, { xs: 8, md: 0 }]}>
                  {
                    item[1]?.map((item, index, array) => {
                      const mapName = item?.match?.map as any as string;
                      return (
                        <Col
                          xs={24}
                          className={s.recentMatchItem}
                          key={`${item?.match_uid}-${index}`}
                          onClick={() => router.push(`/p2e/dashboard/history/${item?.id}`)}
                          style={{
                            borderTopLeftRadius: index === 0 ? "4px" : "0px",
                            borderTopRightRadius: index === 0 ? "4px" : "0px",
                            borderBottomLeftRadius: index === array.length - 1 ? "4px" : "0px",
                            borderBottomRightRadius: index === array.length - 1 ? "4px" : "0px",
                            background:
                              index % 2 === 0
                                ? `linear-gradient(90deg, rgba(47, 54, 75, 0) 0%, #2F364B 21.88%), url("${item?.map_img}")`
                                : `linear-gradient(90deg, rgba(46, 53, 74, 0) 0%, #232939 21.88%), url("${item?.map_img}")`
                          }}
                        >
                          <Row>
                            <Col md={{ span: 4, order: 1 }} xs={4}>
                              <div className={s.recentMatchResult}>
                                {item?.is_win ?
                                  <span style={{ color: "#00F9FF" }}>WIN</span>
                                  : <span style={{ color: "#CC846E" }}>LOSE</span>}
                                <div className={s.mapName}>{MAP_CSGO[mapName]}</div>
                                <div className={s.endTime}>{dateToHoursFormat(new Date(item?.match?.end_at))}</div>
                              </div>
                            </Col>
                            <Col md={{ span: 10, order: 2 }} xs={20}>
                              <Row>
                                <Col span={8}>
                                  <div className={s.scoreMatch}>
                                    {item?.is_win ?
                                      <span style={{ color: "#00F9FF" }}>{item?.match?.score?.replace("/", "-")}</span>
                                      : <span style={{ color: "#CC846E" }}>{item?.match?.score?.replace("/", "-")}</span>}
                                  </div>
                                </Col>
                                <Col span={4}>
                                  <div className={s.recentMatchContentItem}>
                                    <img src="/assets/P2E/csgo/kill.svg" alt="" />
                                    <span className={s.textContentItem}>{item?.player_statistic?.Kills}</span>
                                  </div>
                                </Col>
                                <Col span={4}>
                                  <div className={s.recentMatchContentItem}>
                                    <img src="/assets/P2E/csgo/death.svg" alt="" />
                                    <span className={s.textContentItem}>{item?.player_statistic?.Deaths}</span>
                                  </div>
                                </Col>
                                <Col span={4}>
                                  <div className={s.recentMatchContentItem}>
                                    <img src="/assets/P2E/csgo/support.svg" alt="" />
                                    <span className={s.textContentItem}>{item?.player_statistic?.Assists}</span>
                                  </div>
                                </Col>
                                <Col span={4}>
                                  <div className={s.recentMatchContentItem} style={{ border: 0 }}>
                                    <img src="/assets/P2E/csgo/headshot.svg" alt="" />
                                    <span className={s.textContentItem}>{item?.player_statistic?.["Headshots"]}</span>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                            <Col md={{ span: 4, order: 3 }} xs={{ span: 12, order: 4 }}>
                              <div className={s.recentMatchTime}>
                                {moment(item?.match?.end_at).fromNow()}
                              </div>
                            </Col>
                            <Col md={{ span: 6, order: 4 }} xs={{ span: 12, order: 3 }}>
                              <Row className={s.recentMatchReward}>
                                <Col span={12} className={s.rewardItem} style={{ paddingRight: 20 }}>
                                  <span className={s.lucisPoint}>+{item?.lucis_point ?? "0"}</span>
                                  <img src="/assets/P2E/lucis-point.svg" alt="" />
                                </Col>
                                <Col span={12} className={s.rewardItem}>
                                  <span>{"-"}</span>
                                  <img src="/assets/P2E/lucis-token.svg" alt="" />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      )
                    })
                  }
                </Row>
              </div>
            </div>

          )
        })}

    </>

  );
});

RecentMatchListCSGO.displayName = "RecentMatchListCSGO"