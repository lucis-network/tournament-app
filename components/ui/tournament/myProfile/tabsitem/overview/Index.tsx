import s from "./Overview.module.sass"
import {Row, Col, Image, Button, Input} from 'antd';
import CardTeam from "components/ui/common/cardsItem/cardTeam";
import {
  ADD_FAVORITE_GAME,
  useGetFavoriteGame,
  useGetJoinedTournament
} from "../../../../../../hooks/myProfile/useMyProfile";
import MyTournamentList from "../myTournament/MyTournamentList";
import React, {useEffect} from "react";
import AuthStore, {AuthUser} from "../../../../../Auth/AuthStore";
import {useMutation, useQuery} from "@apollo/client";
import {GET_USER_TEAMS} from "../../../../common/tabsItem/myTeamDetail/myTeamService";
import {UserTeam} from "../../../../../../src/generated/graphql";
import {observer} from "mobx-react-lite";
import ConnectWalletStore from "../../../../../Auth/ConnectWalletStore";
import MyProfileStore from "../../../../../../src/store/MyProfileStore";
import AddFavoriteGameModal from "./AddFavoriteGameModal";

export default observer(function MyOverview() {
  const userInfo = AuthStore;

  if (!userInfo.id) return null;

  return <UserOverview userInfo={userInfo} />
})

export function UserOverview({ userInfo }: { userInfo: AuthUser }) {
  const { joinedTournamentData } = useGetJoinedTournament({
    user_id: `${userInfo.id}`
  });
  const { data: getUserTeamsData } = useQuery(GET_USER_TEAMS, {
    variables: {
      user_id: `${userInfo.id}`
    }
  });
  const [addFavoriteGame] = useMutation(ADD_FAVORITE_GAME);
  const { refetch, getFavoriteGameData } = useGetFavoriteGame({
    user_id: `${userInfo.id}`
  });
  const userSocial = [
    {
      name: 'discord',
      link: userInfo.profile?.discord,
      logo: '/assets/footer/dis.svg',
    },
    {
      name: 'facebook',
      link: userInfo.profile?.facebook,
      logo: '/assets/footer/fb.svg',
    },
    {
      name: 'twitch',
      link: userInfo.profile?.twitch,
      logo: '/assets/footer/twitch.svg',
    },
    {
      name: 'twitter',
      link: userInfo.profile?.twitter,
      logo: '/assets/footer/tw.svg',
    },
    {
      name: 'youtube',
      link: userInfo.profile?.youtube,
      logo: '/assets/footer/ytb.svg',
    },
  ].filter(item => item.link);

  const handleTournamentShowMore = (key: string) => {
    MyProfileStore.tabActiveKey = key;
  }

  const handleTeamShowMore = (key: string) => {
    MyProfileStore.tabActiveKey = key;
  }

  const handleDisconnectWallet = () => {
    ConnectWalletStore.resetStates();
  }

  const handleAddFavoriteGame = () => {
    MyProfileStore.chooseGameModalVisible = true;
  }

  const handleCallbackChooseGame = async (data: any) => {
    console.log('data: ', data);
    try {
      const response = await addFavoriteGame({
        variables: {
          input: {
            game_uid: data,
          }
        },
      });
      console.log('handleCallbackChooseGame: ', response);
    } catch (error) {
      console.log('error addFavoriteGame: ', error);
    }

    // TournamentStore.game_uid = data.uid;
    // setMessageErrorChoosegame("");
  }

  useEffect(() => {
    console.log('getUserTeamsData?.getMyTeam: ', getUserTeamsData?.getAllTeam)
  })


  return (
    <>
      <Row className={s.wrapper}>
        <Col span={18} className={s.container_left}>
          <h1>Joined tournament</h1>
          <div className={s.player_tournament}>
            {joinedTournamentData?.getJoinedTournament && (joinedTournamentData?.getJoinedTournament.length > 0) ? (
              <>
                <div>
                  <MyTournamentList data={joinedTournamentData.getJoinedTournament} type="joined" />
                </div>
                <Button onClick={() => handleTournamentShowMore('4')} className={s.btnMore}>Show more</Button>
              </>
            ) : (<div>Haven&apos;t participated in any tournament yet.</div>)}
          </div>
          <h1>Favorite game</h1>
          <div className={s.favorite_game}>
            {userInfo?.favorite_game && userInfo?.favorite_game.map(item => (
              <div key={item.id} className={s.content_favorite_game}>
                <div className={s.img_game}>
                  <Image src={`${item.game.logo}`} preview={false} alt="" />
                </div>
                <p>{item.game.logo}</p>
              </div>
            ))}
            <div className={s.add_favorite_game} onClick={handleAddFavoriteGame}>
              <p>Add favorite game</p>
            </div>
          </div>
        </Col>

        {/* content right */}
        <Col  span={6} className={s.container_right}>
          <div className={s.biography}>
            <p>Biography</p>
            <div className={s.des}>
              {userInfo.profile?.biography ?? 'No biography'}
            </div>
          </div>
          <div className={s.social}>
            <p>Social</p>
            <div className={s.group_ic}>
              {userSocial.length > 0 ? userSocial.map(item => (
                <div key={item.name} className={s.ic_item}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image src={item.logo} preview={false} />
                  </a>
                </div>
              )) : <div>No social network</div>}
            </div>
          </div>
          <div className={s.team}>
            <p>Team</p>
            <div style={{ margin: '20px 0px', textAlign: 'right' }}>
              {getUserTeamsData?.getAllTeam && (
                <>
                  {
                    getUserTeamsData.getAllTeam.slice(0, 3).map((team: UserTeam) => (
                      <CardTeam key={team.team_uid} team={team} />
                    ))
                  }
                  <Button onClick={() => handleTeamShowMore('2')} type="link" className={s.btnLink}>More</Button>
                </>
              )}
            </div>
          </div>
          {ConnectWalletStore.address && (
            <div className={s.address}>
              <p>Address</p>
              <Input type="text" value={ConnectWalletStore.address} disabled />
              <Button onClick={handleDisconnectWallet} style={{ width: "100%" }} className="mt-3">Disconnect</Button>
            </div>
          )}
        </Col>
      </Row>
      <AddFavoriteGameModal handCallbackAddGame={handleCallbackChooseGame} />
    </>
)}