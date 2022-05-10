import { Button, Col, Row } from "antd";
import { useState } from "react";
import { fomatNumber } from "utils/Number"
import { TournamentGql } from "src/generated/graphql";
import s from "./CardHome.module.sass";

type Props = {
  datas?: any;
  loading: boolean;
};
export default function CardHome(props: Props) {
  const [isLoadMore, setIsLoadMore] = useState(8)
  const { datas, loading } = props;

  if (loading) {
    return <></>
  }
  const handleLoadMore = () => {
    setIsLoadMore(prev => prev + 8)
  }
  return (
    <>
      <Row className={s.block_card} gutter={15}>
        {
          datas?.slice(0, isLoadMore).map((item: any) => {
            return (
              <Col xs={24} md={12} lg={6} className={s.wrapper} key={item?.uid}>
                <div className={s.card_item}>
                  <div className={s.container_card}>
                    <div className={s.im_game}>
                      <div className={s.info}>
                        <div className={s.number}>
                          <img src="/assets/home/ic_member.svg" alt="" />
                          <span><span style={{ color: '#0BEBD6' }}>17</span>/32</span>
                        </div>
                        <p>Single Elimination</p>
                        <div className={s.number}>
                          <img src="/assets/home/ic_control.svg" alt="" />
                          <span style={{ color: '#0BEBD6' }}>4V4</span>
                        </div>
                      </div>
                      <img
                        style={{ padding: 2, width: "100%" }}
                        src="assets/home/im_game.png"
                        alt=""
                      />
                    </div>
                    <div className={s.heading}>
                      <div className={s.im_logo_game}>
                        <img src="assets/home/im_logo_game.png" alt="" />
                      </div>
                      <h2>
                        {item?.name.length > 42
                          ? item?.name.substring(0, 42) + "..."
                          : item?.name}
                      </h2>
                      <div className={s.hosted_by}>
                        <div className={s.hosted_by_detail}>
                          HOSTED BY
                          <div className={s.user}>
                            <div className={s.avt}>
                              <img src={item?.user?.profile?.avatar || "/assets/MyProfile/defaultAvatar.png"} alt="" />
                            </div>
                            <a href="#">Hulk Group</a>
                          </div>
                        </div>
                        <div className={s.prize_pool}>
                          <img src="/assets/home/ic_dola.svg" alt="" />
                          <span>FREE</span>
                        </div>
                      </div>

                      <div className={s.ntf}>
                        <div>
                          <div className={s.ic_ntf}>
                            <img src="/assets/home/ic_nft.png" alt="" />
                          </div>
                          <span>10.000 USDT</span>
                        </div>
                        <span className={s.time}>April 30th 07:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            )
          })
        }

      </ Row>
      {
        <div className={s.btn_load}>
          <Button onClick={handleLoadMore}>More</Button>
        </div>
      }
    </>
  );
}
