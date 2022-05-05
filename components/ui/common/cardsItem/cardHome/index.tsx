import { Col, Row } from "antd";
import s from "./CardHome.module.sass";

type Props = {
  datas?: any;
};
export default function CardHome(props: Props) {
  const { datas } = props;

  return (
    <Row className={s.wrapper} gutter={[16, 100]}>
      {datas.map((item: any) => (
        <Col span={5} className={s.card_item} key={item?.id}>
          <div className={s.container_card}>
            <div className={s.im_game}>
              <div className={s.info}>
                <div className={s.number}>
                  <img src="/assets/home/ic_member.svg" alt="" />
                  <span>17/32</span>
                </div>
                <p>Single Elimination</p>
                <div className={s.number}>
                  <img src="/assets/home/ic_control.svg" alt="" />
                  <span>4v4</span>
                </div>
              </div>
              <img src="/assets/home/im_game.png" alt="" />
            </div>
            <div className={s.heading}>
              <img src="/assets/home/im_logo_game.png" alt="" />
              <h2>
                {item?.title.length > 42
                  ? item?.title.substring(0, 42) + "..."
                  : item?.title}
              </h2>
              <div className={s.hosted_by}>
                <div className={s.hosted_by_detail}>
                  HOSTED BY
                  <div className={s.user}>
                    <img src="/assets/home/im_avt.png" alt="" />
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
                  <img src="/assets/home/ic_nft.png" alt="" />
                  <span>10,000 USDT</span>
                </div>
                <span className={s.time}>April 30th 07:00</span>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}
