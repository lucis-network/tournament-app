import { Button, Col, Row } from "antd";
import { memo, useEffect, useState } from "react";
import Link from "next/link";

import { currency } from "utils/Number";
import { TournamentGql } from "src/generated/graphql";
import s from "./CardHome.module.sass";
import { slugify } from "../../../../../utils/String";
import { BracketType } from "utils/Enum";
import moment from "moment";
import { useRouter } from "next/router";
import { useWindowSize } from "hooks/useWindowSize";
import BlankState from "components/ui/tournament/home/blankState";

type Props = {
  datas?: TournamentGql[];
  loading: boolean;
  type: string;
};
function CardHome(props: Props) {
  const [isLoadMore, setIsLoadMore] = useState(8);
  const [width] = useWindowSize();
  const { datas, loading, type } = props;

  if (loading || !datas) {
    return <></>;
  }

  const handleLoadMore = () => {
    setIsLoadMore((prev) => prev + 8);
  };
  console.log("datas", datas);
  return (
    <div className="tournaments-c">
      <Row
        className={s.block_card}
        style={datas?.length <= 0 ? { flexDirection: "column" } : {}}
        gutter={width > 1600 ? 20 : 25}
      >
        {datas?.length > 0 ? (
          datas?.slice(0, isLoadMore).map((item) => {
            return (
              <Col xs={24} md={12} lg={6} className={s.wrapper} key={item?.uid}>
                {<TournamentCard data={item} typeTab={type} />}
              </Col>
            );
          })
        ) : (
          <TournamentCard typeTab={type} />
        )}
      </Row>
      {isLoadMore > datas?.length || isLoadMore < 8 ? (
        ""
      ) : (
        <div className={s.btn_load}>
          <Button onClick={handleLoadMore}>More</Button>
        </div>
      )}
    </div>
  );
}
export default memo(CardHome);

function TournamentCard(props: { data?: TournamentGql; typeTab?: string }) {
  const { data: item, typeTab } = props;
  const router = useRouter();

  const elimination = BracketType.find(
    (bracket) => bracket.value === item?.brackets?.[0].type
  )?.label;

  return (
    <>
      {
        //@ts-ignore
        item ? (
          <div className={s.card_item}>
            <div className={s.container_card}>
              <div className={s.im_game}>
                <div className={s.info}>
                  <div className={s.number}>
                    <img src="/assets/home/ic_member.svg" alt="" />
                    <span>
                      <span style={{ color: "#0BEBD6" }}>
                        {item.cache_tournament?.team_participated ===
                          undefined || null
                          ? 0
                          : item.cache_tournament?.team_participated}
                      </span>
                      /{item?.participants}
                    </span>
                  </div>
                  <p>{elimination}</p>
                  <div className={s.number}>
                    <img src="/assets/home/ic_control.svg" alt="" />
                    <span style={{ color: "#0BEBD6" }}>
                      {item.team_size}V{item.team_size}
                    </span>
                  </div>
                </div>
                <Link href={`/tournament/${item.uid}/${slugify(item.name)}`}>
                  <a
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                    className={s.thumbnail}
                  ></a>
                </Link>
              </div>
              <div className={s.heading}>
                <div className={s.im_logo_game}>
                  <img src={item.game.logo as string} alt="" />
                  <span className={s.time}>
                    {moment(item.brackets?.[0].start_at).format("MMM Do HH:mm")}
                  </span>
                </div>
                <h2>
                  <div className={s.title}>
                    <Link
                      href={`/tournament/${item.uid}/${slugify(item.name)}`}
                    >
                      <a>
                        {item?.name.length > 40
                          ? item.name.slice(0, 40) + "..."
                          : item.name}
                      </a>
                    </Link>
                  </div>
                </h2>
                <div className={s.hosted_by}>
                  <div className={s.hosted_by_detail}>
                    <span>HOSTED BY</span>
                    <div className={s.user}>
                      <div className={s.avt}>
                        <img
                          src={
                            item.user?.profile?.avatar ||
                            "/assets/MyProfile/defaultAvatar.png"
                          }
                          alt=""
                        />
                      </div>
                      <Link
                        href={`/profile/${slugify(
                          item.user?.profile?.user_name
                        )}`}
                      >
                        {item.user?.profile?.display_name}
                      </Link>
                    </div>
                  </div>
                  <div className={s.prize_pool}>
                    <img src="/assets/home/ic_dola.svg" alt="" />
                    <span>FREE ENTRY</span>
                  </div>
                </div>
                <div className={s.ntf}>
                  <div>
                    <div className={s.ic_ntf}>
                      <img src={item.currency.icon as string} alt="" />
                    </div>
                    <span>
                      {
                        //@ts-ignore
                        currency(item?.totalPrizePool)
                      }{" "}
                      {item.currency.symbol}
                    </span>
                  </div>
                  {typeTab === "UPCOMING" && (
                    <Button type="primary" className={s.btn_join_now}>
                      <Link
                        href={`/tournament/${item.uid}/${slugify(item.name)}`}
                      >
                        <a>JOIN NOW</a>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={s.card_item} style={{ padding: "0px 12px" }}>
            <BlankState title={typeTab} />
          </div>
        )
      }
    </>
  );
}
