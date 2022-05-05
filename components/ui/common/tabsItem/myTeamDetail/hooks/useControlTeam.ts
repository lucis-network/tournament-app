import {
  ADD_PLAYER,
  CREATE_TEAM,
  DELETE_PLAYER,
  DELETE_TEAM,
  MY_PROFILE,
  SEARCH_MEMBER,
  SEARCH_TEAM,
} from "./../myTeamService";
import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
export interface TeamType extends Record<any, any> {
  user_id: string;
  display_name: string;
  avatar: string;
  is_leader?: boolean;
}

export interface MyTeamType {
  team_uid: string;
  team_name: string;
  team_avatar: string;
  participant: number;
  team?: TeamType[];
}

const UseControlTeam = () => {
  const [draftData, setDraftData] = useState<MyTeamType>();
  const [teamId, setTeamId] = useState<string>("");
  const [memberId, setMemberId] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchMemberValue, setSearchMemberValue] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openCreateTem, setOpenCreateTeam] = useState<boolean>(false);
  const [openRemove, setOpenRemove] = useState<boolean>(false);
  const [isSaveDraft, setIsSaveDraft] = useState<boolean>(false);
  const [status, setStatus] = useState<"remove" | "delete" | "leave">("remove");
  const [error, setError] = useState<Record<string, string>>({});

  const { data: rawSearchMember, refetch: searchMember } = useQuery(
    SEARCH_MEMBER,
    {
      variables: {
        teamId,
        value: "",
      },
    }
  );

  const { data: rawSearchTeam, refetch: searchTeam } = useQuery(SEARCH_TEAM, {
    variables: {
      name: "",
    },
  });

  const { data: rawProfile } = useQuery(MY_PROFILE);

  const [createTeam] = useMutation(CREATE_TEAM);
  const [deleteTeam] = useMutation(DELETE_TEAM);
  const [addPlayer] = useMutation(ADD_PLAYER);
  const [deletePlayer] = useMutation(DELETE_PLAYER);

  const profile = rawProfile?.me?.profile;

  const convertMemberId = draftData?.team?.reduce(
    (acc, value) => {
      acc.push(value.user_id as never);
      return acc;
    },
    [profile?.user_id] as string[]
  );
  const teamList = rawSearchTeam?.searchTeam as MyTeamType[];
  const memberList = isSaveDraft
    ? (rawSearchMember?.searchMember as TeamType[])?.filter(
        (member) => !convertMemberId?.some((key: any) => key === member.user_id)
      )
    : (rawSearchMember?.searchMember as TeamType[]);

  const handleRemove = () => {
    switch (status) {
      case "remove":
        if (isSaveDraft) {
          setDraftData({
            ...draftData!,
            team: draftData?.team?.filter(
              (member) => member.user_id !== memberId
            ),
          });
        } else {
          deletePlayer({
            variables: {
              teamId,
              memberId,
            },
            onCompleted: () => searchTeam({ name: "" }),
          });
        }
        break;
      case "delete":
      case "leave":
        deleteTeam({
          variables: {
            teamId,
          },
          onCompleted: () => searchTeam({ name: "" }),
        });
      default:
        break;
    }

    setOpenRemove(false);
  };

  const handleCloseRemove = useCallback(() => {
    setOpenRemove(false);
  }, []);

  const handleOpenRemove = (
    team_uid: string,
    user_id: string,
    status: "remove" | "delete" | "leave",
    isSaveDraft?: boolean
  ) => {
    setMemberId(user_id);
    setTeamId(team_uid);
    setStatus(status);

    if (isSaveDraft) {
      setIsSaveDraft(true);
    } else {
      setIsSaveDraft(false);
      setOpenRemove(true);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    setSearchValue(searchValue);
    searchTeam({
      name: searchValue,
    });
  };

  const handleSearchMember = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    setSearchMemberValue(searchValue);
    searchMember({
      teamId,
      value: searchValue,
    });
  };

  const handleCreateEditTeam = useCallback(
    (isEdit: boolean, team?: MyTeamType) => {
      team ? setDraftData(team) : setDraftData(undefined);
      setIsEdit(isEdit);
      setOpenCreateTeam(true);
    },
    []
  );

  const handleCloseCreateEditTeam = useCallback(() => {
    setDraftData(undefined);
    setOpenCreateTeam(false);
  }, []);

  const handleChangeAvatar = (childData: string) => {
    if (childData) {
      setDraftData({
        ...draftData,
        team_avatar: childData,
      } as MyTeamType);
      setError({
        ...error,
        ["team_avatar"]: "",
      });
    } else {
      setError({
        ...error,
        ["team_avatar"]: "File is not valid",
      });
    }
  };

  const handleChangeTeamName = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setDraftData({ ...draftData, team_name: value } as MyTeamType);

    if (value.length <= 0) {
      setError({ ...error, ["team_name"]: "Team name is require" });
    } else if (value.length > 45) {
      setError({
        ...error,
        ["team_name"]: "Team name is to long, maximum in 45 character",
      });
    } else {
      setError({ ...error, ["team_name"]: "" });
    }
  };

  const handleSaveTeam = (id?: string) => {
    if (!draftData?.team_name) {
      setError({ ...error, ["team_name"]: "Team name is require" });
    } else {
      const filterDataMember = draftData?.team?.map((item) => ({
        user_id: +item.user_id,
        is_leader: false,
      }));

      id
        ? ""
        : createTeam({
            variables: {
              input: {
                name: draftData?.team_name,
                avatar: draftData?.team_avatar,
                team_member: [
                  {
                    user_id: +profile?.user_id,
                    is_leader: true,
                  },
                  ...(filterDataMember || []),
                ],
              },
            },
            onCompleted: () => {
              searchTeam({ name: "" });
            },
          });

      setOpenCreateTeam(false);
    }
  };

  const handleAddMember = (member: TeamType) => {
    if (isSaveDraft) {
      setDraftData({
        ...draftData!,
        team: draftData?.team ? [...draftData?.team, member] : [member],
      });
      setOpenCreateTeam(true);
    } else {
      addPlayer({
        variables: {
          input: {
            team_uid: teamId,
            member_id: member.user_id,
          },
        },
        onCompleted: () => searchTeam({ name: "" }),
      });
    }
    setOpenAdd(false);
  };

  const handleOpenAddMember = (team_uid: string, isSaveDraft?: boolean) => {
    searchMember({
      teamId: team_uid,
      value: "",
    });
    setTeamId(team_uid || "");
    setOpenAdd(true);
    setOpenCreateTeam(false);
    isSaveDraft ? setIsSaveDraft(true) : setIsSaveDraft(false);
  };

  const handleCloseAdd = useCallback(() => {
    if (isSaveDraft) setOpenCreateTeam(true);
    setOpenAdd(false);
  }, [isSaveDraft]);

  useEffect(() => {
    isSaveDraft && handleRemove();
  }, [isSaveDraft]);

  return {
    error,
    status,
    isEdit,
    searchValue,
    searchMemberValue,
    teamList,
    memberList,
    draftData,
    openAdd,
    openCreateTem,
    openRemove,
    handleCloseCreateEditTeam,
    handleCreateEditTeam,
    handleRemove,
    handleSearch,
    handleChangeTeamName,
    handleChangeAvatar,
    handleSaveTeam,
    handleSearchMember,
    handleAddMember,
    handleOpenAddMember,
    handleCloseAdd,
    handleOpenRemove,
    handleCloseRemove,
  };
};

export default UseControlTeam;
