import s from "./Team.module.sass"

export default function CardTeam() {
  return(
    <div className={s.content_team}>
      <div className={s.img_team}>

      </div>
      <div className={s.name_team}>The best team</div>
      <div className={s.member}>3</div>
    </div>
  )
}