import React from "react";
import { Modal, Input } from "antd";
import s from "./CreateTeam.module.sass";
import { PlusOutlined } from "@ant-design/icons";
import { UserCard } from "../userCard";
import GradientButton from "../button/GradientButton";
import UploadAvatar from "../upload/UploadAvatar";
import { MyTeamType } from "../tabsItem/myTeamDetail/hooks/useControlTeam";
import { isEmpty } from "lodash";

interface CreateTeamModalType {
  error: Record<string, string>;
  isEdit: boolean;
  draftData?: MyTeamType;
  showModal: boolean;
  onChangeAvatar: (childData: string, value: string) => void;
  onChangeTeamName: (e: React.FormEvent<HTMLInputElement>) => void;
  onAddOpen: (team_uid: string, isSaveDraft?: boolean) => void;
  onOpenRemove: (
    team_uid: string,
    user_id: string,
    status: "remove" | "delete" | "leave",
    isSaveDraft?: boolean
  ) => void;
  onSave: (id?: string) => void;
  onCancel: () => void;
}

const CreateTeamModal: React.FC<CreateTeamModalType> = ({
  error,
  isEdit,
  draftData,
  showModal,
  onChangeTeamName,
  onChangeAvatar,
  onAddOpen,
  onSave,
  onCancel,
  onOpenRemove,
}) => {
  return (
    <Modal
      title={
        <h3 className="text-16px text-white">
          {isEdit ? "Edit team" : "Create a new team"}
        </h3>
      }
      visible={showModal}
      wrapClassName={s.mdl}
      okText="Confirm"
      onCancel={onCancel}
      footer={null}
    >
      <div>
        <div className="flex align-middle items-start mb-4">
          <span className="min-w-[140px]">Team name</span>
          <div>
            <Input
              className="!rounded-8px"
              value={draftData?.team_name}
              placeholder="Enter name"
              onChange={onChangeTeamName}
              onError={(e) => console.log(e)}
            />
            {!isEmpty(error["team_name"]) && (
              <p className="text-[12px] text-emerald-2 mt-1">
                {error["team_name"]}
              </p>
            )}
          </div>
        </div>
        <div className="flex align-middle items-start mb-4">
          <span className="min-w-[140px]">Team avatar</span>
          <div>
            <UploadAvatar
              parentCallback={onChangeAvatar}
              heigh="200"
              width="200"
              value="cover"
              className="flex align-middle items-center justify-between"
              innerImageClass={s.avatar_team}
              inputClass="w-[260px]"
              description="(200x200px, 2MB)"
            />
            {!isEmpty(error["team_avatar"]) && (
              <p className="text-[12px] text-emerald-2 mt-1">
                {error["team_avatar"]}
              </p>
            )}
          </div>
        </div>
        <h3 className="text-white mb-4">Team members</h3>
        {draftData?.team?.map((team) => (
          <UserCard
            key={team.user_id}
            user={team}
            className="w-[70%]"
            enableDelete={true}
            onOpenRemove={() =>
              onOpenRemove(draftData.team_uid, team.user_id, "remove", true)
            }
          />
        ))}
        <button
          className={s.button_add}
          onClick={() => onAddOpen(draftData?.team_uid!, true)}
        >
          <PlusOutlined className="mr-2" />
          Add new member
        </button>

        <button
          className={s.button_create}
          onClick={() => onSave(draftData?.team_uid)}
          disabled={!!error["team_name"] || !!error["team_avatar"]}
        >
          {isEdit ? "Update team" : "Create team"}
        </button>
      </div>
    </Modal>
  );
};

export default CreateTeamModal;
