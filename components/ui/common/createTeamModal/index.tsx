import React from "react";
import { Modal, Input } from "antd";
import s from "./CreateTeam.module.sass";
import { PlusOutlined } from "@ant-design/icons";
import { UserCard } from "../userCard";
import GradientButton from "../button/GradientButton";
import UploadAvatar from "../upload/UploadAvatar";
import { MyTeamType } from "../tabsItem/myTeamDetail/hooks/useControlTeam";

interface CreateTeamModalType {
  isEdit: boolean;
  draftData?: MyTeamType;
  showModal: boolean;
  onChangeAvatar: (childData: string, value: string) => void;
  onChangeTeamName: (e: React.FormEvent<HTMLInputElement>) => void;
  onAddOpen: (team_uid: string, isSaveDraft?: boolean) => void;
  onSave: (id?: string) => void;
  onCancel: () => void;
}

const CreateTeamModal: React.FC<CreateTeamModalType> = ({
  isEdit,
  draftData,
  showModal,
  onChangeTeamName,
  onChangeAvatar,
  onAddOpen,
  onSave,
  onCancel,
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
        <div className="flex align-middle items-center mb-4">
          <span className="min-w-[140px]">Team name</span>
          <Input
            className="!rounded-8px"
            value={draftData?.team_name}
            onChange={onChangeTeamName}
          />
        </div>
        <div className="flex align-middle items-start mb-4">
          <span className="min-w-[140px]">Team avatar</span>
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
        </div>
        <h3 className="text-white mb-4">Team members</h3>
        {draftData?.team?.map((team) => (
          <UserCard key={team.user_id} user={team} className="w-[70%]" />
        ))}
        <button
          className={s.button_add}
          onClick={() => onAddOpen(draftData?.team_uid!, true)}
        >
          <PlusOutlined className="mr-2" />
          Add new member
        </button>

        <GradientButton
          small={true}
          className="text-white flex align-middle items-center mx-auto mt-12"
          type={1}
          onClick={() => onSave(draftData?.team_uid)}
        >
          {isEdit ? "Update team" : "Create team"}
        </GradientButton>
      </div>
    </Modal>
  );
};

export default CreateTeamModal;
