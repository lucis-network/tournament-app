import { Col, Row } from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import React from "react";
import { GMatch } from "src/generated/graphql_p2e";
import { MAP_CSGO } from "utils/Enum";
import SpinLoading from "../common/Spin";
import s from './p2e.module.sass'


interface IProps {
  recentMatches: GMatch;
  loading: boolean;
}
export const RecentMatchList = (props: IProps) => {
  console.log(props.recentMatches)
  return (
    <div className={s.recentMatchList}>
      <div className={s.recentMatchHeaderList}>
        <Row>
          <Col span={4}>
            <div className={s.recentMatchHeaderItem}>
              <h2>Map</h2>
            </div>
          </Col>
          <Col span={10}>
            <Row>
              <Col span={8}>

              </Col>
              <Col span={4}>
                <div className={s.recentMatchHeaderItem}>
                  <h2>K</h2>
                </div>
              </Col>
              <Col span={4}>
                <div className={s.recentMatchHeaderItem}>
                  <h2>D</h2>
                </div>
              </Col>
              <Col span={4}>
                <div className={s.recentMatchHeaderItem}>
                  <h2>A</h2>
                </div>
              </Col>
              <Col span={4}>
                <div className={s.recentMatchHeaderItem}>
                  <h2>K/R</h2>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={4}>
          </Col>
          <Col span={6}>

          </Col>
        </Row>
      </div>
      {props.loading ? <SpinLoading /> : (
        !isEmpty(props.recentMatches?.matches) && props.recentMatches?.matches?.map((item, index) => {
          const mapName = item?.match?.map as any as string;
          return (
            <div
              className={s.recentMatchItem}
              key={`${item?.match_uid}-${index}`}
              style={{
                background:
                  index % 2 === 0
                    ? `linear-gradient(90deg, rgba(47, 54, 75, 0) 0%, #2F364B 21.88%), url("${item?.map_img}")`
                    : `linear-gradient(90deg, rgba(46, 53, 74, 0) 0%, #232939 21.88%), url("${item?.map_img}")`
              }}
            >
              <Row>
                <Col span={4}>
                  <div className={s.recentMatchResult}>
                    {item?.is_win ?
                      <span style={{ color: "#00F9FF" }}>VICTORY</span>
                      : <span style={{ color: "#CC846E" }}>DEFEAT</span>}
                    <div>{MAP_CSGO[mapName]}</div>
                    <div>{new Date(item?.match?.end_at).toLocaleTimeString()}</div>
                  </div>
                </Col>
                <Col span={10}>
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
                        <img src="/assets/P2E/csgo/kill-icon.png" alt="" />
                        <div>{item?.player_statistic?.Kills}</div>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className={s.recentMatchContentItem}>
                        <img src="/assets/P2E/csgo/death-icon.png" alt="" />
                        <span>{item?.player_statistic?.Deaths}</span>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className={s.recentMatchContentItem}>
                        <img src="/assets/P2E/csgo/assist-icon.png" alt="" />
                        <span>{item?.player_statistic?.Assists}</span>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className={s.recentMatchContentItem} style={{ border: 0 }}>
                        <img src="/assets/P2E/csgo/kill-icon.png" alt="" />
                        <span>{item?.player_statistic?.["K/R Ratio"]}</span>
                      </div>
                    </Col>
                  </Row>

                </Col>
                <Col span={4}>
                  <div className={s.recentMatchTime}>
                    {moment(item?.match?.end_at).fromNow()}
                  </div>
                </Col>
                <Col span={6}>
                  <div className={s.recentMatchReward}>
                    <div className={s.recentMatchRewardItem}>
                      <span>+ {item?.lucis_point ?? "0"}</span>
                      <img src="/assets/P2E/lucis-point.png" alt="" width="40" height="40" />
                    </div>
                    <div className={s.recentMatchRewardItem}>
                      {"-"}
                      <img src="/assets/P2E/lucis-token.png" alt="" width="40" height="40" />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )
        })
      )}
    </div>
  );
}