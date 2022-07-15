import s from "./Player.module.sass";
import CardPlayer from "../cardPlayer";
import { Button } from "antd";
import useTopPlayer from "../hooks/useTopPlayer";
type Props = {};

export default function PlayerHome() {
  const { dataTopPlayer, loading } = useTopPlayer();
  return (
    <div className={s.wrapper_player}>
      <div className="lucis-container" style={{ width: "100%" }}>
        <h1>BEST PLAYER OF LUCIS NETWORK</h1>
        <div className={s.block_card}>
          <CardPlayer data={dataTopPlayer} loading={loading} />
        </div>
        {/* <div className={s.btn_see_all}>
          <Button type="primary">SEE ALL</Button>
        </div> */}
      </div>
    </div>
  );
}
