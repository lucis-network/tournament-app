import React from "react";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { TeamType } from "../tabsItem/myTeamDetail/hooks/useControlTeam";
import s from "./MemberBox.module.sass";

interface MemberBoxProps {
  member: TeamType;
  onAdd: (member: TeamType) => void;
}

const MemberBox: React.FC<MemberBoxProps> = ({ member, onAdd }) => {
  return (
    <div className="border p-2 mt-2">
      <div className="flex align-middle items-center mb-2">
        <div className="rounded-[30px] overflow-hidden h-full bg-white">
          <img src={member.avatar ? member.avatar : "/assets/avatar.jpg" } alt="" width={50} height={50} />
        </div>
        <div className="w-full ml-2">
          <h3 className="text-18px m-0 text-white">{member.display_name}</h3>
          <p className="mb-0 text-[12px]">Username: @{member.user_name}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button className={s.button_add} onClick={() => {}}>
          <UserOutlined className="mr-2" />

          <a
            target="_blank"
            href={`/profile/${member.user_name}`}
            rel="noopener noreferrer"
			      style={{color: "white"}}
          >
            Profile
          </a>
        </button>
        <button className={s.button_add} onClick={() => onAdd(member)}>
          <UserAddOutlined className="mr-2" />
          Add
        </button>
      </div>
    </div>
  );
};

export default MemberBox;
