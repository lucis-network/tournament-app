import React from "react";
import { MyTeamType } from "components/ui/common/tabsItem/myTeamDetail/hooks/useControlTeam";
import s from "./TeamModal.module.sass";
import { Tooltip } from "antd";

interface TeamSelectProps {
  team: MyTeamType;
  isValidMemberLength: boolean;
  isValidMemberConnectedGame: boolean;
  onSelect: () => void;
}

const TeamSelect: React.FC<TeamSelectProps> = ({ team, isValidMemberLength,isValidMemberConnectedGame, onSelect }) => {
  const validMember = team.team?.filter(item => item.is_valid === true);
  const invalidMember = team.team?.filter(item => item.is_valid === false);
  return (
    <div className="p-4 mb-4 border bg-card relative flex flex-col rounded-8px">
      <div>
        <img
          className="object-cover mr-2 mb-1"
          src={team?.team_avatar ? team?.team_avatar : "/assets/avatar.jpg"}
          alt=""
          width={30}
          height={30}
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
              />
            </div>
            <h3 className="mb-0 ml-2 text-white text-[14px]">
              {user?.display_name}
            </h3>
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
              />
            </div>
            <h3 className="mb-0 ml-2 text-white text-[14px]">
              {user?.display_name}
            </h3>
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
