import { Col, Row } from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import React from "react";
import { GMatch } from "src/generated/graphql_p2e";
import SpinLoading from "../common/Spin";
import s from './p2e.module.sass'


interface IProps {
  recentMatches: GMatch;
  loading: boolean;
}
export const RecentMatchList = (props: IProps) => {
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
                      <span style={{ color: "#00F9FF" }}>Victory</span>
                      : <span style={{ color: "#CC846E" }}>Defeat</span>}
                    <div>--</div>
                    <div>--</div>
                  </div>
                </Col>
                <Col span={10}>
                  <Row>
                    <Col span={8}>
                      <div className={s.scoreMatch}>
                        {item?.match?.score?.replace("/", "-")}
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className={s.recentMatchContentItem}>
                        <h2>-</h2>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className={s.recentMatchContentItem}>
                        <h2>-</h2>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className={s.recentMatchContentItem}>
                        <h2>-</h2>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className={s.recentMatchContentItem}>
                        <h2>-</h2>
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
                    <div>
                      <span>+ {item?.lucis_point ?? "0"}</span>
                      <img src="/assets/P2E/lucis-point.png" alt="" width="30" height="30" />
                    </div>
                    <div>
                      {"-"}
                      <img src="/assets/P2E/lucis-token.png" alt="" width="30" height="30" />
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