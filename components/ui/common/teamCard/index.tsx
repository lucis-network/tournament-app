import React from "react";
import {
  TeamOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { UserCard } from "../userCard";
import s from "./TeamCard.module.sass";
import { MyTeamType } from "../tabsItem/myTeamDetail/hooks/useControlTeam";

interface TeamCardType {
  teamList?: MyTeamType[];
  onEdit: (isEdit: boolean, team?: any) => void;
  onOpenRemove: (
    team_uid: string,
    user_id: string,
    status: "remove" | "delete" | "leave",
    isSaveDraft?: boolean
  ) => void;
  onOpenAdd: (team_uid: string) => void;
}

const { Item } = Menu;

const TeamCard: React.FC<TeamCardType> = ({
  teamList = [],
  onEdit,
  onOpenAdd,
  onOpenRemove,
}): any => {
  const menu = (team: MyTeamType, isOwner: boolean) =>
    isOwner ? (
      <Menu>
        <Item key="edit" onClick={() => onEdit(true, team)}>
          Edit
        </Item>
        <Item
          key="delete"
          onClick={() => onOpenRemove(team.team_uid, "", "delete")}
        >
          Delete
        </Item>
      </Menu>
    ) : (
      <Menu>
        <Item
          key="leave"
          onClick={() => onOpenRemove(team.team_uid, "", "leave")}
        >
          Leave team
        </Item>
      </Menu>
    );

  return teamList
    ? teamList?.map((team) => {
        const isOwner = !!team.participant;
        return (
          <div
            key={team.team_uid}
            className={`p-4 border ${isOwner ? "bg-card" : ""}`}
          >
            <div className="flex align-top items-start mb-2">
              <div className="rounded-[30px] w-[44px] h-[44px] overflow-hidden bg-white">
                <img
                  className="object-cover h-full w-full"
                  src={team.team_avatar}
                  alt=""
                />
              </div>
              <div className="w-[80%] ml-2">
                <div className="flex justify-between w-full align-middle items-center">
                  <h3 className="text-18px m-0 text-white">{team.team_name}</h3>
                  <Dropdown overlay={menu(team, isOwner)} trigger={["click"]}>
                    <EllipsisOutlined style={{ fontSize: 24 }} />
                  </Dropdown>
                </div>
                <span className="flex align-middle items-center">
                  {team?.participant || 0}
                  <TeamOutlined className="ml-1 text-16px" />
                </span>
              </div>
            </div>
            <h3 className="text-white">Member</h3>
            {team?.team?.map((user) => (
              <UserCard
                key={user.user_id}
                user={user}
                enableDelete={isOwner}
                onOpenRemove={() =>
                  onOpenRemove(team.team_uid, user.user_id, "remove")
                }
              />
            ))}
            {isOwner && (
              <div className="text-center">
                <button
                  className={s.button_add}
                  onClick={() => onOpenAdd(team.team_uid)}
                >
                  <PlusOutlined className="mr-2" />
                  Add
                </button>
              </div>
            )}
          </div>
        );
      })
    : null;
};

export default TeamCard;
