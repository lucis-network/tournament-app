import s from "./PlayerCard.module.sass";
import { GTopEarning } from "src/generated/graphql";
import Link from "next/link";
import { slugify } from "utils/String";

type Props = {
  data: GTopEarning[];
  loading?: any;
};

export default function CardPlayer(props: Props) {
  const { data, loading } = props;

  if (loading) {
    return <></>;
  }

  return (
    <div className={s.top}>
      <div className={s.top_players}>
        {data?.map((e: any, i: number) => {
          const topMedal =
            i === 0 ? `top1_medal.png` : i === 1 ? "top2_medal.png" : "top3_medal.png";
          const topNumber =
            i === 0 ? "top1.png" : i === 1 ? "top2.png" : "top3.png"
          
          return (
            <div
              className={`${s.top_player} ${i === 0 ? s.player_top1 : i === 1 ? s.player_top2 : s.player_top3}`}
              key={i}
            >
              <img src={`/assets/home/${topNumber}`} alt="" />

              <Link href={`/profile/${slugify(e?.user_name)}`} passHref>
                <a className={s.player_name}>
                  {e.display_name ?? "_ _"}
                </a>
              </Link>

              <p className={`${s.top_mission} ${i === 0 ? s.top_mission_top1 : ''}`}>
                1500 mission
              </p>

              <p className={`${s.top_reward} ${i !== 0 ? s.top_reward_fix : ''}`}>
                <span className={s.reward_point}>
                  +1000 <img className={s.reward_point_icon} src="/assets/P2E/lucis-point.svg" alt=""/>
                </span>
                <span className={s.reward_token}>
                  +1000 <img className={s.reward_token_icon} src="/assets/P2E/lucis-token.svg" alt=""/>
                </span>
              </p>
              
              <img className={s.top_medal} src={`/assets/home/${topMedal}`} alt="" />

            </div>
          );
        })}
      </div>
      <img className={s.top_platform} src="assets/home/top_platform.png" alt="" />
    </div>
  );
}

