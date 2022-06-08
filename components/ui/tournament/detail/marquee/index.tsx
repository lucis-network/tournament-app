import s from "./Marquee.module.sass";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import { useGetSpotlightAnnouncement } from "hooks/tournament/useTournamentDetail";
import moment from "moment";
import { isEmpty } from "lodash";
import Texty from "rc-texty";
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
        if (arr >= length) {
          setArr(0);
          setTitleSpotlight(data[0]?.content);
        } else {
          setArr((prve) => prve + 1);
          const title = data[arr]?.content;
          setTitleSpotlight(title);
          setTimer(data[arr]?.time);
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
    <div className={`lucis-container-2 ${s.marquee_section}`}>
      {timer ? (
        <div className={s.marquee}>
          <img src="/assets/Banner/ic_loudspeaker.png" alt="" />
          <div className={s.time}>
            <div></div>
            <div className={s.line}></div>
            {moment(timer).format("MMMM Do h:mm:ss")}
          </div>
          {/* <div className={s.marquee_title}>{titleSpotlight}</div> */}
          {show && <Texty delay={1000}>{titleSpotlight}</Texty>}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TournamentDetailMarquee;
