import React from "react";
import { StarFilled, CloseOutlined } from "@ant-design/icons";
import { TeamType } from "../tabsItem/myTeamDetail/hooks/useControlTeam";

interface UserCardType {
  user: TeamType;
  isLeader?: boolean;
  enableDelete?: boolean;
  className?: string;
  onRemove?: () => void;
}

export const UserCard: React.FC<UserCardType> = ({
  user,
  isLeader = false,
  enableDelete = false,
  className,
  onRemove,
}) => {
  return (
    <div
      className={`flex border justify-between items-center bg-white mb-4 p-2 ${className}`}
    >
      <div className="flex items-center align-middle">
        <div className="rounded-[30px] w-[30px] overflow-hidden h-full bg-white border border-nav">
          <img src={user?.avatar} alt="" width={30} height={30} />
        </div>
        <h3 className="mb-0 ml-2">{user?.display_name}</h3>
      </div>
      {isLeader ? (
        <StarFilled style={{ color: "black", fontSize: 18 }} />
      ) : enableDelete ? (
        <button className="outline-none" onClick={onRemove}>
          <CloseOutlined style={{ color: "black", fontSize: 18 }} />
        </button>
      ) : null}
    </div>
  );
};
