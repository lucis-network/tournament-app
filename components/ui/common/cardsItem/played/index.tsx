import s from "./played.module.sass"
import {Tournament} from "../../../tournament/myProfile/tabsitem/myTournament";
import {Button, Image} from "antd";
import Link from "next/link";

type CardPlayedProps = {
  tournament: Tournament,
  canEdit: boolean,
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export default function CardPlayed({ tournament, canEdit = false }: CardPlayedProps) {
  const tempDate = new Date(tournament?.start_at);
  const startAt = `${tempDate.getDate()} ${months[tempDate.getMonth()]} ${tempDate.getHours()}:${tempDate.getMinutes()}`;
  console.log(tournament)
  return (
    <div className={s.container_card}>
      <div className={s.card_avt}>
        <Image
          src={tournament?.thumbnail}
          preview={false}
        />
      </div>
      <div className={s.start_time}>
        <p>Start</p>
        <p>{startAt}</p>
      </div>
      <div className={s.daily}>{tournament?.name}</div>
      <div className={s.member}>{`${tournament?.team_participated}/${tournament?.participants}`}</div>
      <div className={s.status}>{tournament?.tournament_status}</div>
      {canEdit && (
        <div>
          <Button>
            <Link href="/tournament/create">Edit</Link>
          </Button>
        </div>
      )}

    </div>
  )
}