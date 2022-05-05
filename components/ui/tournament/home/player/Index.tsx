import s from "./Player.module.sass"
import CardPlayer from "../cardPlayer"
type Props = {}

export default function PlayerHome() {
  return(
    <div className={s.wrapper_player}>
      <div className='lucis-container'>
        <h1>PLAYER OF THE MONTH</h1>
        <div className={s.block_card}>
          <CardPlayer />
          <CardPlayer />
          <CardPlayer />
        </div>
      </div>
    </div>
  )
}