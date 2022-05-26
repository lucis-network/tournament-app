import React from "react";
import s from "./played.module.sass"
import {Button, Image} from "antd";
import Link from "next/link";
import {TTournament} from "../../../../../src/generated/graphql";
import {slugify} from "../../../../../utils/String";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';

type CardPlayedProps = {
  tournament?: TTournament,
  type?: string,
  isOwner?: boolean,
  isHidden?: boolean,
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function CardPlayed({tournament, type, isOwner, isHidden}: CardPlayedProps) {
  const tempDate = new Date(tournament?.start_at);
  const startAt = `${tempDate.getDate()} ${months[tempDate.getMonth()]} ${tempDate.getHours()}:${tempDate.getMinutes()}`;
  const handleClaimBtnClick = (event: React.SyntheticEvent) => {
    event.preventDefault()
  }

  return (
    <Link
      href={tournament?.tournament_status === 'REVIEWING' ? '#' : `/tournament/${tournament?.uid}/${slugify(tournament?.name)}`}
      passHref>
      <a style={{
        display: isHidden ? 'none' : 'block',
        pointerEvents: tournament?.tournament_status === 'REVIEWING' ? 'none' : 'auto'
      }}>
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
          <div className={s.member}>
            <div>
              <FontAwesomeIcon icon={faUserFriends}/>
            </div>
            <div>
              {`${tournament?.team_participated}/${tournament?.participants}`}
            </div>
          </div>
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
              <Button
                className={s.claimStatus}
                onClick={handleClaimBtnClick}
              >
                {tournament?.is_claim}
              </Button>
            </div>
          )}
        </div>
      </a>
    </Link>
  )
}