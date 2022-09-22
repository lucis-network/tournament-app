import { Button, Col } from "antd";
import { memo, useState } from "react";
import {Image} from "antd";
import {format} from "utils/Number";
import {Bracket, TournamentGql } from "src/generated/graphql";
import s from "./CardHome.module.sass";
import { slugify } from "../../../../../utils/String";
import { BracketType } from "utils/Enum";
import moment from "moment";
import { useRouter } from "next/router";

type Props = {
  datas?: TournamentGql[];
  loading: boolean;
  type: string;
};
function CardHome(props: Props) {
  const [isLoadMore, setIsLoadMore] = useState(8);
  const { datas, loading, type } = props;
  const router = useRouter()
  if (loading || !datas) {
    return <></>;
  }

  const handleLoadMore = () => {
    setIsLoadMore((prev) => prev + 8);
  };

  const openTabDetail = (item: TournamentGql) => {
    router.push(`/arena/${item.uid}/${slugify(item.name)}`)
  }

  return (
    <div>
      <div className={s.listItems} >
        {datas?.slice(0, isLoadMore).map((item) => {
          return (
            <Col className={s.wrapper} key={item?.uid} onClick={() => openTabDetail(item)}>
              {item ? <TournamentCard data={item} typeTab={type} /> : null}
            </Col>
          );
        })}
      </div>
      {isLoadMore > datas?.length ? (
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

function TournamentCard(props: { data: TournamentGql; typeTab?: string }) {
  const { data: item } = props;

  const elimination = (item:Bracket) => {
    return BracketType.find(
      (bracket) => bracket.value === item?.type
    )?.label;
  }

  return (
    <>
      {[item].length > 0 ? (
        <>
          {
            //@ts-ignore
            item ? (
              <a href={`/arena/${item.uid}/${slugify(item.name)}`} target="_blank" rel="noopener noreferrer">
                <div className={s.item} >
                  <div className={s.itemImg}>
                    <div className={s.itemDescImg}>
                      <div className={s.itemDescImgL}>
                        <img src="/assets/home/ic_participant.svg" alt=""/>
                        <span>
                          { item.cache_tournament?.team_participated === undefined || null
                            ? 0
                            : item.cache_tournament?.team_participated }
                          /{item?.participants}
                        </span>
                      </div>
                      <div className={s.itemDescImgGameMode}>
                        <span>{item?.brackets && item?.brackets[0] && elimination(item?.brackets[0])}</span>
                      </div>
                      <div className={s.itemDescImgLR}>
                        <img src="/assets/home/ic_teamsize.svg" alt=""/>
                        <span>{item?.team_size} vs {item?.team_size}</span>
                      </div>
                    </div>
                    <div className={s.thumbnail}>
                      <img
                        src={item?.cover}
                        //src="/assets/homepage/test_arena.png"
                        alt=""/>
                    </div>
                  </div>
                  <div className={s.itemDesc}>
                    <div className={s.itemFreeEntry}>
                      {/*<p>{item?.game?.name}</p>*/}
                      <img src="/assets/logoGame/csgo.png" alt=""></img>
                      <p>Free entry</p>
                    </div>
                    <div className={s.itemAva}>
                      <Image src={item?.user?.profile?.avatar ? item?.user?.profile?.avatar : "/assets/home/avt_null.jpg"} alt=""
                             fallback="/assets/home/avt_null.jpg"/>
                    </div>
                    <div className={s.itemCreator}>
                      <p>Creator</p>
                      <h2>{item?.user?.profile?.display_name}</h2>
                    </div>
                  </div>
                  <div className={s.itemTitle}>
                    <p>{item?.name}</p>
                  </div>
                  <div className={s.itemGroupCT}>
                    <div className={s.itemCurrency}>{
                      format(Number(item?.totalPrizePool), 2, {zero_trim: true})
                    }{" "}
                      {item.currency.symbol}</div>
                    <div className={s.itemTime}>
                      <img src="/assets/home/ic_date.svg" alt=""/>
                      <span>{moment(item.brackets?.[0].start_at).format(
                        "MMM Do, hh:mm"
                      )}</span>
                    </div>
                  </div>
                </div>
              </a>
            ) : null
          }
        </>
      ) : (
        // <BlankState title='hello' />
        ''
      )}
    </>
  );
}
