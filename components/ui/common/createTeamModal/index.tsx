import React from "react";
import { Modal, Input, Button } from "antd";
import s from "./CreateTeam.module.sass";
import { PlusOutlined } from "@ant-design/icons";
import { UserCard } from "../userCard";
import UploadAvatar from "../upload/UploadAvatar";
import { MyTeamType } from "../tabsItem/myTeamDetail/hooks/useControlTeam";
import { isEmpty } from "lodash";
import TournamentStore from "src/store/TournamentStore";

interface CreateTeamModalType {
  url: string;
  inputKey: string;
  reset: boolean;
  error: Record<string, string>;
  isEdit: boolean;
  draftData?: MyTeamType;
  showModal: boolean;
  onChangeAvatar: (e: any) => void;
  onChangeTeamName: (e: React.FormEvent<HTMLInputElement>) => void;
  onAddOpen: (team_uid: string, isSaveDraft?: boolean) => void;
  onOpenRemove: (
    team_uid: string,
    user_id: number,
    status: "remove" | "delete" | "leave",
    isSaveDraft?: boolean
  ) => void;
  onSave: (id?: string) => void;
  onCancel: () => void;
}

const CreateTeamModal: React.FC<CreateTeamModalType> = ({
  url,
  reset,
  inputKey,
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
      centered
      title={
        <h3 className="text-18px text-white">
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
          <span className="min-w-[120px]">Team name</span>
          <div>
            <Input
              className="!rounded-8px"
              value={draftData?.team_name}
              placeholder="Enter name"
              onChange={onChangeTeamName}
            />
            {!isEmpty(error["team_name"]) && (
              <p className="text-[12px] text-emerald-2 mt-1">
                {error["team_name"]}
              </p>
            )}
          </div>
        </div>
        <div className={`${s.teamAvatar} flex align-middle items-start mb-4`}>
          <div className="min-w-[120px]">Team avatar</div>
          <div className={s.chooseTeamAvatar}>
            <UploadAvatar
              url={url}
              reset={reset}
              inputKey={inputKey}
              handleFileInput={onChangeAvatar}
              heigh="200"
              width="200"
              className={`${s.uploadAvatar} flex align-middle items-center justify-between`}
              innerImageClass={s.avatar_team}
              inputClass="w-[210px]"
              description="Recommended size: 200x200"
            />
            {!isEmpty(error["team_avatar"]) && (
              <p className="text-[12px] text-emerald-2 mt-1">
                {error["team_avatar"]}
              </p>
            )}
          </div>
        </div>
        <h3 className="text-white mb-4">Team members</h3>
        {draftData?.team?.map((team, i) => (
          <UserCard
            key={i}
            user={team}
            className="w-[70%]"
            enableDelete={true}
            onOpenRemove={() =>
              onOpenRemove(draftData.team_uid, team.user_id, "remove", true)
            }
          />
        ))}
        {!isEmpty(error["team"]) && (
          <p className="text-[12px] text-emerald-2 mt-1">{error["team"]}</p>
        )}
        <button
          className={s.button_add}
          onClick={() => onAddOpen(draftData?.team_uid!, true)}
        >
          <PlusOutlined className="mr-2" />
          Add new member
        </button>

        <Button
          className={s.button_create}
          onClick={() => {
            TournamentStore.loadingCeateTeam = true;
            onSave(draftData?.team_uid);
          }}
          disabled={
            !!error["team_name"] || !!error["team_avatar"] || !!error["team"]
          }
          loading={TournamentStore.loadingCeateTeam}
        >
          {isEdit ? "Update team" : "Create team"}
        </Button>
        {/* <button
          className={s.button_create}
          onClick={() => {
            TournamentStore.loadingCeateTeam = true;
            onSave(draftData?.team_uid);
          }}
          disabled={
            !!error["team_name"] || !!error["team_avatar"] || !!error["team"]
          }
		  
        >
          {isEdit ? "Update team" : "Create team"}
        </button> */}
      </div>
    </Modal>
  );
};

export default CreateTeamModal;
