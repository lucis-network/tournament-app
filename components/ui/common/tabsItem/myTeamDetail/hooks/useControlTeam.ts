import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { GET_MY_TEAM } from "../myTeamService";

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

const teams: MyTeamType[] = [
  {
    team_uid: "team-0",
    team_name: "Lord team",
    team_avatar: "/profile/im_user.png",
    participant: 1,
    team: [
      {
        user_id: "1",
        display_name: "Master",
        avatar: "/profile/im_user.png",
        is_leader: true,
      },
      {
        user_id: "2",
        display_name: "Member 1",
        avatar: "/profile/im_user.png",
      },
      {
        user_id: "3",
        display_name: "Member 2",
        avatar: "/profile/im_user.png",
      },
    ],
  },
  {
    team_uid: "team-1",
    team_name: "Heaven team",
    team_avatar: "/profile/im_user.png",
    participant: 1,
    team: [
      {
        user_id: "1",
        display_name: "Master",
        avatar: "/profile/im_user.png",
        is_leader: true,
      },
      {
        user_id: "2",
        display_name: "Member 1",
        avatar: "/profile/im_user.png",
      },
      {
        user_id: "3",
        display_name: "Member 2",
        avatar: "/profile/im_user.png",
      },
    ],
  },
  {
    team_uid: "team-2",
    team_name: "Liquid - Team",
    team_avatar: "/profile/im_user.png",
    participant: 0,
    team: [
      {
        user_id: "1",
        display_name: "Master",
        avatar: "/profile/im_user.png",
        is_leader: true,
      },
      {
        user_id: "2",
        display_name: "Member 1",
        avatar: "/profile/im_user.png",
      },
      {
        user_id: "3",
        display_name: "Member 2",
        avatar: "/profile/im_user.png",
      },
      {
        user_id: "4",
        display_name: "Member 3",
        avatar: "/profile/im_user.png",
      },
    ],
  },
  {
    team_uid: "team-3",
    team_name: "Assistant Team",
    team_avatar: "/profile/im_user.png",
    participant: 0,
    team: [
      {
        user_id: "1",
        display_name: "Master",
        avatar: "/profile/im_user.png",
        is_leader: true,
      },
      {
        user_id: "2",
        display_name: "Member 1",
        avatar: "/profile/im_user.png",
      },
      {
        user_id: "3",
        display_name: "Member 2",
        avatar: "/profile/im_user.png",
      },
    ],
  },
  {
    team_uid: "team-4",
    team_name: "Super Team",
    team_avatar: "/profile/im_user.png",
    participant: 0,
    team: [
      {
        user_id: "1",
        display_name: "Master",
        avatar: "/profile/im_user.png",
        is_leader: true,
      },
      {
        user_id: "2",
        display_name: "Member 1",
        avatar: "/profile/im_user.png",
      },
    ],
  },
  {
    team_uid: "team-5",
    team_name: "Adidas Team",
    team_avatar: "/profile/im_user.png",
    participant: 0,
    team: [
      {
        user_id: "1",
        display_name: "Master",
        avatar: "/profile/im_user.png",
        is_leader: true,
      },
      {
        user_id: "2",
        display_name: "Member 1",
        avatar: "/profile/im_user.png",
      },
    ],
  },
];

const mockMember: TeamType[] = [
  {
    user_id: "1123",
    display_name: "Vip pro",
    avatar: "/profile/im_user.png",
  },
  {
    user_id: "3122",
    display_name: "Noob",
    avatar: "/profile/im_user.png",
  },
  {
    user_id: "1308",
    display_name: "Call my name",
    avatar: "/profile/im_user.png",
  },
  {
    user_id: "91823",
    display_name: "Crazy guy",
    avatar: "/profile/im_user.png",
  },
  {
    user_id: "7661",
    display_name: "Idiot",
    avatar: "/profile/im_user.png",
  },
  {
    user_id: "234",
    display_name: "Tony",
    avatar: "/profile/im_user.png",
  },
  {
    user_id: "122",
    display_name: "John",
    avatar: "/profile/im_user.png",
  },
  {
    user_id: "2111",
    display_name: "Lucas",
    avatar: "/profile/im_user.png",
  },
];

const UseControlTeam = () => {
  const [teamList, setTeamList] = useState<MyTeamType[]>(teams);
  const [memberList, setMemberList] = useState<TeamType[]>(mockMember);
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

  const excludeField = ["avatar"];
  // Open when have api to query team
  // const { data, loading, error } = useQuery(GET_MY_TEAM);

  const handleLeave = (team_uid: string) => {
    const filterTeam = teamList.filter(
      (team: any) => team.team_uid !== team_uid
    );

    setTeamList(filterTeam);
  };

  const handleRemove = () => {
    const updatedData = teamList.map((team) =>
      team.team_uid === teamId
        ? {
            ...team,
            team: team.team?.filter((member) => member.user_id !== memberId),
          }
        : team
    );

    if (isSaveDraft) {
      setDraftData({
        ...draftData!,
        team: draftData?.team?.filter((member) => member.user_id !== memberId),
      });
      setOpenCreateTeam(true);
    } else {
      setTeamList(updatedData);
    }
    setOpenRemove(false);
  };

  const handleOpenRemove = (
    team_uid: string,
    user_id: string,
    isSaveDraft?: boolean
  ) => {
    setMemberId(user_id);
    setTeamId(team_uid);
    setOpenRemove(true);
    isSaveDraft ? setIsSaveDraft(true) : setIsSaveDraft(false);
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    const lowerCaseValue = searchValue.toString().toLowerCase();

    const filterTeamBySearch = teams.filter((team) =>
      team?.team_name.toString().toLowerCase().includes(lowerCaseValue)
    );

    setSearchValue(searchValue);
    setTeamList(searchValue ? filterTeamBySearch : teams);
  };

  const handleSearchMember = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    const lowerCaseValue = searchValue.toString().toLowerCase();

    const filterMemberBySearch = mockMember.filter((user) =>
      Object.keys(user).some((key: string) =>
        excludeField.includes(key)
          ? false
          : user[key].toString().toLowerCase().includes(lowerCaseValue)
      )
    );

    setSearchMemberValue(searchValue);
    setMemberList(searchValue ? filterMemberBySearch : mockMember);
  };

  const handleCreateEditTeam = useCallback(
    (isEdit: boolean, team?: MyTeamType) => {
      team ? setDraftData(team) : setDraftData(undefined);
      setIsEdit(isEdit);
      setOpenCreateTeam(true);
    },
    []
  );

  const handleChangeAvatar = (childData: string, value: string) => {
    setDraftData({
      ...draftData,
      team_avatar: childData,
    } as MyTeamType);
  };

  const handleChangeTeamName = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setDraftData({ ...draftData, team_name: value } as MyTeamType);
  };

  const handleSaveTeam = (id?: string) => {
    const updatedData = teamList.map((team) =>
      team.team_uid === id ? { ...team, ...draftData } : team
    ) as MyTeamType[];

    id
      ? setTeamList(updatedData)
      : setTeamList([...teamList, { ...draftData!, participant: 1 }]);

    setOpenCreateTeam(false);
  };

  const handleAddMember = (member: TeamType) => {
    const updatedData = teamList.map((team) =>
      team.team_uid === teamId
        ? { ...team, team: team.team ? [...team?.team, member] : [member] }
        : team
    );
    if (isSaveDraft) {
      setDraftData({
        ...draftData!,
        team: draftData?.team ? [...draftData?.team, member] : [member],
      });
      setOpenCreateTeam(true);
    } else {
      setTeamList(updatedData);
    }
    setOpenAdd(false);
  };

  const handleOpenAddMember = (team_uid: string, isSaveDraft?: boolean) => {
    setTeamId(team_uid);
    setOpenAdd(true);
    setOpenCreateTeam(false);
    isSaveDraft ? setIsSaveDraft(true) : setIsSaveDraft(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return {
    isEdit,
    searchValue,
    searchMemberValue,
    teamList,
    memberList,
    draftData,
    openAdd,
    openCreateTem,
    openRemove,
    setOpenCreateTeam,
    setOpenRemove,
    handleCreateEditTeam,
    handleLeave,
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
  };
};

export default UseControlTeam;
