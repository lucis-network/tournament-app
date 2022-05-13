import s from "./played.module.sass"
import {Button, Image} from "antd";
import Link from "next/link";
import {TTournament} from "../../../../../src/generated/graphql";

type CardPlayedProps = {
  tournament?: TTournament,
  type?: string,
  canEdit?: boolean,
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function CardPlayed({ tournament, type, canEdit = false }: CardPlayedProps) {
  const tempDate = new Date(tournament?.start_at);
  const startAt = `${tempDate.getDate()} ${months[tempDate.getMonth()]} ${tempDate.getHours()}:${tempDate.getMinutes()}`;
  console.log('check tournament',tournament);
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
      {(canEdit && type === 'owned') && (
        <div>
          <Button>
            <Link href={`/tournament/${tournament?.uid}/edit`}>Edit</Link>
          </Button>
        </div>
      )}
      {(canEdit && type === 'joined') && (
        <div>
          <span className={s.claimStatus}>{tournament?.is_claim}</span>
        </div>
      )}
    </div>
  )
}