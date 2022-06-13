import s from "./CardPlayer.module.sass";
import GradientLinkButton from "components/ui/common/button/GradientButton";
import PopupDonate from "components/ui/tournament/detail/popup/popupDonate";
import { Button } from "antd";
import { useState } from "react";
import { GTopEarning } from "src/generated/graphql";
import { currency } from "utils/Number";
import Link from "next/link";
import { slugify } from "utils/String";

type Props = {
  data: GTopEarning[];
  loading?: any;
};

export default function CardPlayer(props: Props) {
  const { data, loading } = props;
  const [isPopUp, setIsPopUp] = useState(false);
  const [newData, setNewData] = useState({});

  if (loading) {
    return <></>;
  }
  const showPopUpDonate = (e: any) => {
    setNewData(e);
    setIsPopUp(true);
  };
  const click = () => {
    setIsPopUp(false);
  };
  const hanldeLike = (id: any) => {};
  return (
    <>
      {data?.map((e: any, i: number) => {
        const positionPlayer =
          i === 0 ? `im_top1.png` : i === 1 ? "im_top2.png" : "im_top3.png";
        return (
          <div
            className={`${s.content_card} ${
              i === 0 ? s.top1 : i === 1 ? s.top2 : s.top3
            }`}
            key={i}
          >
            <div className={s.im_top_player}>
              <img src={`/assets/home/${positionPlayer}`} alt="" />
            </div>
            <div className={s.content_player}>
              <div className={s.avt}>
                <Link href={`/profile/${slugify(e?.user_name)}`} passHref>
                  <a className={s.link_profile_player}>
                    <img
                      src={
                        e?.avatar ? `${e.avatar}` : `/assets/home/avt_null.jpg`
                      }
                      alt=""
                    />
                  </a>
                </Link>
                {/* <div className={s.ic_like} onClick={() => hanldeLike(e.id)}>
                  <img src="/assets/home/ic_unlike.svg" alt="" />
                </div> */}
              </div>
              <p style={{ textAlign: "center" }}>{e.display_name || "_ _"}</p>
              <div className={s.total_earning}>
                {`$${currency(e.total_earning, 2)}`}
              </div>
              {/* <div className={s.btn}>
                <Button
                  className={s.content_btn}
                  onClick={() => showPopUpDonate(e)}
                >
                  DONATE
                </Button>
              </div> */}
            </div>
            {/* <PopupDonate
              status={isPopUp}
              types={"TOPPLAYER"}
              closeModal={click}
              datas={newData}
            /> */}
          </div>
        );
      })}
    </>
  );
}
