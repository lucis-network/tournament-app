import s from "./Player.module.sass";
import PlayerCard from "./PlayerCard";
import Ranking from "./Ranking";
import useTopPlayer from "../hooks/useTopPlayer";

type Props = {
  seasonId: string;
};

export default function PlayerHome({ seasonId }: Props) {
  const { dataTopPlayer, loading } = useTopPlayer();
  return (
    <div className={`lucis-container-2 ${s.wrapper_player}`}>
      <h1>BEST PLAYER OF LUCIS NETWORK</h1>
      <div className={s.block_card}>
        <PlayerCard data={dataTopPlayer} loading={loading} />
      </div>
      <div className={s.ranking}>
        <Ranking seasonId={seasonId} />
      </div>
    </div>
  );
}
