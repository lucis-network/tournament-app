import s from "./Player.module.sass";
import CardPlayer from "../cardPlayer";
import { Button } from "antd";
type Props = {};

const listData = [
  { id: 1, position: 1, name: "Rosa Ji" },
  { id: 2, position: 2, name: "Rosa Ji" },
  { id: 3, position: 3, name: "Rosa Ji" },
];

export default function PlayerHome() {
  return (
    <div className={s.wrapper_player}>
      <div className="lucis-container" style={{ width: "100%" }}>
        <h1>BEST PLAYER OF LUCIS NETWORK</h1>
        <div className={s.block_card}>
          <CardPlayer data={listData} />
        </div>
        {/* <div className={s.btn_see_all}>
          <Button type="primary">SEE ALL</Button>
        </div> */}
      </div>
    </div>
  );
}
