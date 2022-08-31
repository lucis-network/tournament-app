import s from "./Player.module.sass";
import PlayerCard from "./PlayerCard";
import Ranking from "./Ranking";
import { Button } from "antd";
import useTopPlayer from "../hooks/useTopPlayer";

type Props = {
  seasonId: string;
};

export default function PlayerHome({ seasonId }: Props) {
  const { dataTopPlayer, loading } = useTopPlayer();
  return (
    <div className={s.wrapper_player}>
      <div className="lucis-container" style={{ width: "100%" }}>
        <h1>BEST PLAYER OF LUCIS NETWORK</h1>
        <div className={s.block_card}>
          <PlayerCard data={dataTopPlayer} loading={loading} />
        </div>
        <div>
          <Ranking seasonId={seasonId} />
        </div>
        {/* <div className={s.btn_see_all}>
          <Button type="primary">SEE ALL</Button>
        </div> */}
      </div>
    </div>
  );
}
