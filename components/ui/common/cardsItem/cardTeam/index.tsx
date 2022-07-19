import s from "./Team.module.sass"
import {UserTeam} from "../../../../../src/generated/graphql";
import {Image} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

type CardTeamProps = {
  team?: UserTeam,
}

export default function CardTeam({ team }: CardTeamProps) {
  return(
    <div className={s.content_team}>
      <div className={s.img_team}>
        <Image src={`${team?.team_avatar ?? ''}`} preview={false} />
      </div>
      <div className={s.name_team}>{team?.team_name}</div>
      <div className={s.member}>
        <FontAwesomeIcon icon={faUserFriends}/>
        <span>{team?.participant}</span>
      </div>
    </div>
  )
}