import React from "react";
import { MyTeamType } from "components/ui/common/tabsItem/myTeamDetail/hooks/useControlTeam";
import s from "./TeamModal.module.sass";
import { Tooltip } from "antd";

interface TeamSelectProps {
  team: MyTeamType;
  team_size: number;
  onSelect: () => void;
}

const TeamSelect: React.FC<TeamSelectProps> = ({ team, onSelect, team_size }) => {

  const isValidMemberLength = team.team?.length! >= team_size;
  const validMember = team.team?.filter(item => item.is_valid === true);
  const invalidMember = team.team?.filter(item => item.is_valid === false);
  const isValidMemberConnectedGame = validMember?.length! >= team_size;
  return (
    <div className="p-4 mb-4 border bg-card relative flex flex-col rounded-8px">
      <div className={"mb-2"}>
        <img
          className="object-cover mr-2 mb-1"
          src={team?.team_avatar ? team?.team_avatar : "/assets/avatar.jpg"}
          alt=""
          width={30}
          height={30}
          onError={(e) => e.currentTarget.src="/assets/avatar.jpg"}
        />
        <span>{team.team_name}</span>
      </div>

      <div className={invalidMember?.length! === 0 ? "mb-8" : "mb-2"}>
        <div className="mb-1">Connected game:</div>
        {validMember?.map((user, i) => (
          <div key={i} className="flex items-center align-middle mb-2">

            <div className="rounded-[30px] w-[30px] h-[30px] overflow-hidden ml-4">
              <img
                className="object-cover w-full h-full"
                src={user?.avatar ? user?.avatar : "/assets/avatar.jpg"}
                alt=""
                width={30}
                height={30}
                onError={(e) => e.currentTarget.src="/assets/avatar.jpg"}
              />
            </div>
            <h3 className="mb-0 ml-2 text-white text-[14px]">
              {user?.display_name}
            </h3>
            {
              user.tournament_list?.length! > 0 &&
              <Tooltip title={`This member is joining another tournament!`} className={s.toolTip} >
                <img className={"ml-2 mb-1"} src="/assets/icon-warning.svg" alt=""/>
              </Tooltip>
            }
          </div>
        ))}
      </div>
      {invalidMember?.length! > 0 && <div className="mb-8">
        <div className="mb-1">Not connected game:</div>
        {invalidMember?.map((user, i) => (
          <div key={i} className="flex items-center align-middle mb-2">

            <div className="rounded-[30px] w-[30px] h-[30px] overflow-hidden ml-4">
              <img
                className="object-cover w-full h-full"
                src={user?.avatar ? user?.avatar : "/assets/avatar.jpg"}
                alt=""
                width={30}
                height={30}
                onError={(e) => e.currentTarget.src="/assets/avatar.jpg"}
              />
            </div>
            <h3 className="mb-0 ml-2 text-white text-[14px]">
              {user?.display_name}
            </h3>
            {
              user.tournament_list?.length! > 0 &&
              <Tooltip title={`This member is joining another tournament!`} className={s.toolTip}>
                <img className={"ml-2 mb-1"} src="/assets/icon-warning.svg" alt=""/>
              </Tooltip>
            }
          </div>
        ))}
      </div>}
      {/* <button
        className={s.button_select}
        onClick={onSelect}
        disabled={!isValid}
        title="Hello World!"
      >
        Select team
      </button> */}
      {isValidMemberLength && isValidMemberConnectedGame && (
        <button
          className={s.button_select}
          onClick={onSelect}
          //disabled={!isValid}
        >
          Select team
        </button>
      )}
      {(!isValidMemberLength || !isValidMemberConnectedGame) && (
        <Tooltip
          title={`${!isValidMemberLength ?  "This team doesn't have enough members to join." : "Your member is not connect game!"}`}
          className={s.toolTip}
        >
          <button
            className={s.button_select}
            onClick={onSelect}
            disabled
            //title="This team doesn't have enough members to join"
          >
            Select team
          </button>
        </Tooltip>
      )}
      <div className="absolute -bottom-4 left-0 w-full text-center">
        <span
          className={`rounded-[30px] text-[14px] px-4 ${
            (isValidMemberLength && isValidMemberConnectedGame) ? "bg-emerald-2 " : "bg-[gray]"
          }`}
        >
          {(isValidMemberLength && isValidMemberConnectedGame) ? "Valid" : "Invalid"}
        </span>
      </div>
    </div>
  );
};

export default TeamSelect;
