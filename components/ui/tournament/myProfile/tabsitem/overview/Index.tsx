import s from "./Overview.module.sass";
import { Row, Col, Image, Button, Input, Popconfirm, message } from "antd";
import CardTeam from "components/ui/common/cardsItem/cardTeam";
import {
  ADD_FAVORITE_GAME,
  useDeleteFavoriteGame,
  useGetFavoriteGame,
  useGetJoinedTournament,
  useGetTotalEarning,
} from "../../../../../../hooks/myProfile/useMyProfile";
import MyTournamentList from "../myTournament/MyTournamentList";
import React, { useEffect, useState } from "react";
import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { GET_USER_TEAMS } from "../../../../common/tabsItem/myTeamDetail/myTeamService";
import { UserTeam } from "../../../../../../src/generated/graphql";
import { observer } from "mobx-react-lite";
import ConnectWalletStore from "../../../../../Auth/ConnectWalletStore";
import MyProfileStore from "../../../../../../src/store/MyProfileStore";
import AddFavoriteGameModal from "./AddFavoriteGameModal";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { isEmpty } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { AuthUser } from "../../../../../Auth/AuthStore";

type MyOverviewProps = {
  isOwner?: boolean;
  userInfo: AuthUser;
  getUserProfileRefetch?: () => Promise<ApolloQueryResult<any>>;
};

export default observer(function MyOverview({
  isOwner,
  userInfo,
  getUserProfileRefetch,
}: MyOverviewProps) {
  const [gameToDelete, setGameToDelete] = useState<string>("");
  const router = useRouter();
  const user_name = router.query.username;
  const { joinedTournamentData } = useGetJoinedTournament({
    user_id: `${userInfo?.id}`,
    skip: isEmpty(userInfo?.id),
  });
  const { data: getUserTeamsData } = useQuery(GET_USER_TEAMS, {
    variables: {
      user_id: `${userInfo?.id}`,
    },
    skip: isEmpty(userInfo?.id),
  });
  const [addFavoriteGame] = useMutation(ADD_FAVORITE_GAME);
  const { deleteFavoriteGame } = useDeleteFavoriteGame({
    game_uid: gameToDelete,
  });
  const { refetch: refetchFavoriteGameData, getFavoriteGameData } =
    useGetFavoriteGame({
      user_id: `${userInfo?.id}`,
      skip: isEmpty(userInfo?.id),
    });
  const { getTotalEarningData } = useGetTotalEarning({
    user_id: `${userInfo?.id}`,
    skip: isEmpty(userInfo?.id),
  });
  const [favoriteGameIDs, setFavoriteGameIDs] = useState<string[]>([]);

  const handleTournamentShowMore = () => {
    router.push(`/profile${!isOwner ? `/${user_name}` : ''}?page=tournaments`)
  };

  const handleTeamShowMore = () => {
    router.push(`/profile${!isOwner ? `/${user_name}` : ''}?page=teams`)
  };

  const handleDisconnectWallet = () => {
    ConnectWalletStore.resetStates();
  };

  const handleAddFavoriteGame = () => {
    MyProfileStore.chooseGameModalVisible = true;
  };

  const handleDeleteGame = (game_uid: string) => {
    setGameToDelete(game_uid);
  };

  const handleCallbackChooseGame = (data: any) => {
    addFavoriteGame({
      variables: {
        input: {
          game_uid: data,
        },
      },
    })
      .then((result) => {
        refetchFavoriteGameData();
      })
      .catch((error) => {
        message.error("Error adding favorite game.");
      });
  };

  const userSocial = [
    {
      name: "discord",
      link: userInfo?.profile?.discord,
      logo: "/assets/MyProfile/ic_discord.svg",
    },
    {
      name: "facebook",
      link: userInfo?.profile?.facebook,
      logo: "/assets/MyProfile/ic_fb.svg",
    },
    {
      name: "twitch",
      link: userInfo?.profile?.twitch,
      logo: "/assets/MyProfile/ic_twitchIcon.svg",
    },
    {
      name: "twitter",
      link: userInfo?.profile?.twitter,
      logo: "/assets/MyProfile/ic_tw.svg",
    },
    {
      name: "youtube",
      link: userInfo?.profile?.youtube,
      logo: "/assets/MyProfile/ic_ytb.svg",
    },
  ];

  useEffect(() => {
    let isSubscribed = true;
    if (gameToDelete.length > 0) {
      deleteFavoriteGame()
        .then((result) => {
          if (isSubscribed) {
            refetchFavoriteGameData();
          }
        })
        .catch((error) => {
          message.error("Error deleting favorite game.");
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [gameToDelete]);

  useEffect(() => {
    let isSubscribed = true;
    if (getFavoriteGameData?.getFavoriteGame) {
      if (isSubscribed) {
        setFavoriteGameIDs(() => {
          return getFavoriteGameData.getFavoriteGame.map(
            (item) => item.game.uid
          );
        });
      }
    }
    return () => {
      isSubscribed = false;
    };
  }, [getFavoriteGameData]);

  return (
    <>
      <Row className={s.wrapper} style={{paddingBottom: 120}}>
        <Col className={s.container_left}>
          <h2>
            <FontAwesomeIcon icon={faPlay} />
            <span>Joined tournament</span>
          </h2>
          <div className={s.player_tournament}>
            {joinedTournamentData?.getJoinedTournament &&
            joinedTournamentData?.getJoinedTournament.length > 0 ? (
              <>
                <div>
                  <MyTournamentList
                    data={joinedTournamentData.getJoinedTournament}
                    type="joined"
                    maxItems={3}
                  />
                </div>
                <Button
                  onClick={handleTournamentShowMore}
                  className={s.btnMore}
                >
                  Show more
                </Button>
              </>
            ) : (
              <div>Haven&apos;t participated in any tournament yet.</div>
            )}
          </div>
          <h2>
            <FontAwesomeIcon icon={faHandHoldingHeart} />
            <span>Favorite game</span>
          </h2>
          <div className={s.favorite_game}>
            {getFavoriteGameData &&
              getFavoriteGameData.getFavoriteGame.map((item) => (
                <div key={item.id} className={s.content_favorite_game}>
                  <div className={s.img_game}>
                    <Image src={`${item.game.logo}`} preview={false} alt="" />
                  </div>
                  <p>{item.game.name}</p>
                  {isOwner && (
                    <Popconfirm
                      title="Are you sure to delete this game?"
                      onConfirm={() => handleDeleteGame(item.game.uid)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button className={s.deleteFavoriteGameBtn}>
                        <DeleteOutlined />
                      </button>
                    </Popconfirm>
                  )}
                </div>
              ))}
            {isOwner && (
              <div
                className={s.add_favorite_game}
                onClick={handleAddFavoriteGame}
              >
                <PlusCircleOutlined />
                <p className="mb-0 ml-2">Add favorite game</p>
              </div>
            )}
          </div>
        </Col>

        {/* content right */}
        <Col className={s.container_right}>
          <div className="mb-5">
            <Button>
              Total earnings ${getTotalEarningData?.getTotalEarning}
            </Button>
          </div>
          <div>
            <div className={s.biography}>
              <p>Biography</p>
              <div className={s.des}>
                {userInfo?.profile?.biography ?? "No biography"}
              </div>
            </div>
            <div className={s.social}>
              <p>Social</p>
              <div className={s.group_ic}>
                {userSocial.length > 0 ? (
                  userSocial.map((item) => (
                    <div
                      key={item.name}
                      className={`${s.ic_item}${
                        isEmpty(item.link) ? " " + s.social_disabled : ""
                      }`}
                    >
                      <Link href={`${item.link ?? "#"}`} passHref>
                        <a target="_blank">
                          <Image src={item.logo} preview={false} />
                        </a>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>No social network</div>
                )}
              </div>
            </div>
            <div className={s.team}>
              <p>Team</p>
              <div style={{ margin: "0 0 20px 0", textAlign: "right" }}>
                {getUserTeamsData?.getAllTeam.length > 0 ? (
                  <>
                    {getUserTeamsData.getAllTeam
                      .slice(0, 3)
                      .map((team: UserTeam) => (
                        <CardTeam key={team.team_uid} team={team} />
                      ))}
                    <Button
                      onClick={handleTeamShowMore}
                      type="link"
                      className={s.btnLink}
                    >
                      More
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    No Teams
                    <br />
                    {userInfo?.profile?.user_name} isn&apos;t part of any teams
                    yet.
                  </div>
                )}
              </div>
            </div>
          </div>
          {isOwner && ConnectWalletStore.address && (
            <div className={s.address}>
              <p>Address</p>
              <Input type="text" value={ConnectWalletStore.address} className={s.walletAddress} disabled />
              <Button
                onClick={handleDisconnectWallet}
                style={{ width: "100%" }}
                className="mt-3"
              >
                Disconnect
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <AddFavoriteGameModal
        handleCallbackAddGame={handleCallbackChooseGame}
        favoriteGameIDs={favoriteGameIDs}
      />
    </>
  );
});
