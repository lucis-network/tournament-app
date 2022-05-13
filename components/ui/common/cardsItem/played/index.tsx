import s from "./played.module.sass"
import {Image} from "antd";
import Link from "next/link";
import {TTournament} from "../../../../../src/generated/graphql";
import {slugify} from "../../../../../utils/String";

type CardPlayedProps = {
  tournament?: TTournament,
  type?: string,
  isOwner?: boolean,
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function CardPlayed({ tournament, type, isOwner }: CardPlayedProps) {
  const tempDate = new Date(tournament?.start_at);
  const startAt = `${tempDate.getDate()} ${months[tempDate.getMonth()]} ${tempDate.getHours()}:${tempDate.getMinutes()}`;
  console.log('check tournament',tournament);
  return (
    <Link href={`/tournament/${tournament?.uid}/${slugify(tournament?.name)}`} passHref>
      <a>
        <div className={s.container_card}>
          <div className={s.card_avt}>
            <Image
              src={tournament?.thumbnail}
              preview={false}
              alt={tournament?.name}
            />
          </div>
          <div className={s.start_time}>
            <p>Start</p>
            <p>{startAt}</p>
          </div>
          <div className={s.daily}>{tournament?.name}</div>
          <div className={s.member}>{`${tournament?.team_participated}/${tournament?.participants}`}</div>
          <div className={s.status}>{tournament?.tournament_status}</div>
          {/*{(isOwner && type === 'owned') && (*/}
          {/*  <div>*/}
          {/*    <Button>*/}
          {/*      <Link href={`/tournament/${tournament?.uid}/edit`} passHref>*/}
          {/*        <span>Edit</span>*/}
          {/*      </Link>*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*)}*/}
          {(isOwner && type === 'joined') && (
            <div>
              <span className={s.claimStatus}>{tournament?.is_claim}</span>
            </div>
          )}
        </div>
      </a>
    </Link>
  )
}