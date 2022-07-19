import s from "./Marquee.module.sass";
import { useEffect, useState } from "react";
import { useGetSpotlightAnnouncement } from "hooks/tournament/useTournamentDetail";
import moment from "moment";
import { isEmpty } from "lodash";
import TextyAnim from "rc-texty";
import "rc-texty/assets/index.css";

type Props = {
  tournamentId: string;
};

const TournamentDetailMarquee = (props: Props) => {
  const { tournamentId } = props;

  const { loading, error, data, refetch } = useGetSpotlightAnnouncement({
    // Change to tournamentUid after
    tournament_uid: tournamentId,
    skip: isEmpty(tournamentId),
  });

  const [titleSpotlight, setTitleSpotlight] = useState("");
  const [arr, setArr] = useState(0);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (data) {
      const length = data.length;
      interval = setInterval(() => {
        if (arr == 0) {
          setTitleSpotlight(data[0]?.content);
          setTimer(data[0]?.time);
        } else {
          const title = data[arr]?.content;
          if (title) {
            setTitleSpotlight(title);
            setTimer(data[arr]?.time);
          }
        }
        setArr((prve) => prve + 1);
        if (arr == length) {
          setTitleSpotlight(data[0]?.content);
          setTimer(data[0]?.time);
          setArr(1);
        }
        setShow(true);
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [arr, data]);

  useEffect(() => {
    setShow(false);
  }, [titleSpotlight]);

  return (
    <div className={`${s.marquee_section}`}>
      {timer ? (
        <div className={s.marquee}>
          <img src="/assets/Banner/ic_loudspeaker.png" alt="" />
          <div className={s.time}>
            <div className={s.line}></div>
            {moment(timer).format("MMMM Do h:mm:ss")}{" "}
          </div>
          {/* <FadeIn>
            <div className={`${s.marquee_title}`}>{titleSpotlight}</div>
          </FadeIn> */}
          {/* <FadeIn visible={show}>
            <div className={`${s.marquee_title}`}>{titleSpotlight}</div>
          </FadeIn> */}
          <div className={s.text}>
            {show && (
              <TextyAnim delay={0} interval={12}>
                {titleSpotlight}
              </TextyAnim>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TournamentDetailMarquee;
