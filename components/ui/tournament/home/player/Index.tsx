import s from "./Player.module.sass";
import CardPlayer from "../cardPlayer";
import { Button } from "antd";
type Props = {};

const listData = [
  { id: 1, position: 1, name: "Top1" },
  { id: 2, position: 2, name: "Top2" },
  { id: 3, position: 3, name: "Top3" },
];

export default function PlayerHome() {
  return (
    <div className={s.wrapper_player}>
      <div className="lucis-container" style={{ width: "100%" }}>
        <h1>PLAYER OF THE MONTH</h1>
        <div className={s.block_card}>
          <CardPlayer data={listData} />
        </div>
        <div className={s.btn_see_all}>
          <Button type="primary">See All</Button>
        </div>
      </div>
    </div>
  );
}
