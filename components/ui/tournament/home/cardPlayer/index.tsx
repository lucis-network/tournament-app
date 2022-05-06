import s from "./CardPlayer.module.sass";
import GradientLinkButton from "components/ui/common/button/GradientButton";
import PopupDonate from "components/ui/tournament/detail/popup/popupDonate";
import { Button } from "antd";
import { useState } from "react";

type Props = {
  data: any;
};

export default function CardPlayer(props: Props) {
  const { data } = props;
  const [isPopUp, setIsPopUp] = useState(false);
  const [newData, setNewData] = useState({});

  const showPopUpDonate = (e: any) => {
    setNewData(e);
    setIsPopUp(true);
  };
  const click = () => {
    setIsPopUp(false);
  };
  return (
    <>
      {data.map((e: any) => {
        const positionPlayer =
          e.position === 1
            ? `im_top1.png`
            : e.position === 2
            ? "im_top2.png"
            : "im_top3.png";
        const styleCard =
          e.position === 1
            ? { marginTop: -120 }
            : e.position === 2
            ? {
                transform: "scale(0.8)",
                order: -1,
                filter: "drop-shadow(0px 2px 40px rgba(255, 255, 255, 0.3))",
              }
            : {
                transform: "scale(0.6)",
                marginTop: 80,
                boxShadow: "inset 0px 6.44px 25.77px rgba(255, 255, 255, 0.4)",
                marginLeft: -10,
              };
        return (
          <div className={`${s.content_card} ${e.position === 1 ? s.top1: e.position === 2? s.top2: s.top3}`} key={e.id}>
            <div className={s.im_top_player}>
              <img src={`/assets/home/${positionPlayer}`} alt="" />
            </div>
            <div className={s.content_player}>
              <div className={s.avt}>
                <img src="" alt="" />
              </div>
              <p>{e.name}</p>
              <div className={s.btn}>
                <Button
                  className={s.content_btn}
                  onClick={() => showPopUpDonate(e)}
                >
                  DONATE
                </Button>
              </div>
            </div>
            <PopupDonate status={isPopUp} closeModal={click} datas={newData} />
          </div>
        );
      })}
    </>
  );
}
