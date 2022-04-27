import s from "./played.module.sass"

export default function CardPlayed() {
  return (
    <div className={s.container_card}>
      <div className={s.card_avt}>avt</div>
      <div className={s.start_time}>
        <p>Start</p>
        <p>10 Apr 20:20</p>
      </div>
      <div className={s.daily}>eSports 4 Everyone - DAILY TOURNAMENT - 17 Fed M</div>
      <div className={s.member}>32/32</div>
      <div className={s.status}>Upcoming</div>
    </div>
  )
}