import { Button, Col, Row } from "antd";
import { useState } from "react";
import { fomatNumber } from "utils/Number"
import { TournamentGql } from "src/generated/graphql";
import s from "./CardHome.module.sass";

type Props = {
  datas?: TournamentGql[];
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
      <Row className={s.block_card} gutter={[15, 15]}>
        {
          datas?.slice(0, isLoadMore).map((item: any) => {
            return (
              <Col lg={6} className={s.wrapper} key={item?.uid}>
                <div className={s.card_item}>
                  <div className={s.container_card}>
                    <div className={s.im_game}>
                      <div className={s.info}>
                        <div className={s.number}>
                          <img src="/assets/home/ic_member.svg" alt="" />
                          <span><span style={{ color: '#0BEBD6' }}>{item?.cache_tournament?.team_participated}</span>/{item?.participants}</span>
                        </div>
                        <p>Single Elimination</p>
                        <div className={s.number}>
                          <img src="/assets/home/ic_control.svg" alt="" />
                          <span style={{ color: '#0BEBD6' }}>{item?.team_size}V{item?.team_size}</span>
                        </div>
                      </div>
                      <img
                        style={{ padding: 2 }}
                        src={item?.thumbnail}
                        alt=""
                      />
                    </div>
                    <div className={s.heading}>
                      <div className={s.im_logo_game}>
                        <img src={item?.game?.logo} alt="" />
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
                            <a href="#">{item?.user?.profile?.display_name}</a>
                          </div>
                        </div>
                        <div className={s.prize_pool}>
                          <img src="/assets/home/ic_dola.svg" alt="" />
                          <span>{item?.join_fee <= 0 ? "FREE": item?.join_fee}</span>
                        </div>
                      </div>

                      <div className={s.ntf}>
                        <div>
                          <div className={s.ic_ntf}>
                            <img src={item?.currency?.icon} alt="" />
                          </div>
                          <span>{fomatNumber(item?.totalPrizePool)} {item?.currency?.symbol}</span>
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
