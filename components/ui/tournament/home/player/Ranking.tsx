import { Table, Image } from "antd";
import Link from "next/link";
import s from "./Ranking.module.sass";
import {GET_USER_RANK_TOURNAMENT, useArenaRanking} from "../../../../../hooks/ranking/useRanking";
import {format} from "utils/Number";
import {useQuery} from "@apollo/client";
import AuthStore from "components/Auth/AuthStore";
import {memo, useEffect} from "react";
import {observer} from "mobx-react-lite";

const columns = [
  {
    title: '',
    dataIndex: 'rank',
    className: s.columnRankTop,
    width: "10%",
    render: (rank: number) => {
      return (
        <></>
      )
    }
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    className: s.columnRank,
    width: "15%",
    render: (rank: number) => {
      return (
        <div className={s.userRank}>
          <div className={`${s.userRankName} ${rank === 1 ? 'top1' : ''}`}>
            {rank <= 3 && (
              <span className={s.rankNameText}>TOP </span>
            )}
            {rank}
          </div>
        </div>
      )
    }
  },
  {
    title: 'Name',
    dataIndex: ['profile', 'rank'],
    className: s.columnName,
    width: "30%",
    render: (_text: string, data: any) => {
      const profile = data?.profile
      const rank = data?.rank
      const userRank = rank === 1 ? 'top1' : rank === 2 ? "top2" : "";

      return (
        <div className={s.userWrap}>
          <div className={`${s.userAvatar} ${userRank}`}>
            <Link href={`/profile/${profile?.user_name}`} passHref>
              <a target="_blank">
                <img src={profile?.avatar ? profile?.avatar : '/assets/MyProfile/default_avatar.png'} alt="" onError={(e) => {
                  e.currentTarget.src = '/assets/MyProfile/default_avatar.png'
                }} />
              </a>
            </Link>
          </div>
          <div className={`${s.userName} ${userRank}`}>
            <Link href={`/profile/${profile?.user_name}`} passHref>
              <a target="_blank">{profile?.display_name}</a>
            </Link>
          </div>
        </div>
      )
    }
  },
  {
    title: 'Total earnings',
    dataIndex: 'total_earning',
    className: s.columnEarning,
    width: "20%",
    render: (totalEarning: number) => {
      return totalEarning > 0 && (
        <div className={`${s.totalEarning}`}>${format(Number(totalEarning), 2, {zero_trim: true})}</div>
      )
    }
  },
  {
    title: 'Rewards',
    dataIndex: ['reward', 'rank'],
    className: s.columnReward,
    width: "25%",
    render: (_text: string, data: any) => {
      return (
        <div className={s.userReward}>
          <div className={s.rewardPoint}>
            -- <img src="/assets/P2E/lucis-point.svg" alt=""/>
          </div>
          <div className={s.rewardToken}>
            -- <img src="/assets/P2E/lucis-token.svg" alt=""/>
          </div>
          {/*{data.rank == 1*/}
          {/*  ? <img className={s.rewardChest} src="/assets/home/chest-1.png" alt="" />*/}
          {/*  : <img className={s.rewardChest} src="/assets/home/chest-n.png" alt="" />}*/}
        </div>
      )
    }
  },
];

type Props = {
  seasonId: string
}

export default observer (function Ranking ({ seasonId }: Props) {
  const {getArenaRankingLoading, dataArenaRanking} = useArenaRanking({})

  const {data, loading, refetch} = useQuery(GET_USER_RANK_TOURNAMENT, {
    variables: {
      user_id: Number(AuthStore.id),
    },
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  useEffect(() => {
    refetch();
  }, [AuthStore.isLoggedIn])

  return (
    <>
      <div className={s.rankingTableWrapper}>
        <div className={s.rankingTableResponsive}>
          <Table columns={columns} dataSource={dataArenaRanking?.getTournamentRanking} pagination={false} rowKey="id" loading={getArenaRankingLoading} />
        </div>
        { data && data?.getUserTournamentRanking?.total_earning > 0 &&
        <div className={s.yourRank}>
          <div className={s.titleYourRank}>
            <span>Your Rank</span>
          </div>
          <div className={s.numYourRank}>
            <div className={s.userRank}>
              <div className={`${s.userRankName}`}>
                {data?.getUserTournamentRanking?.rank}
              </div>
            </div>
          </div>

            <div className={s.nameYourRank}>
              <div className={s.userWrap}>
                <div className={`${s.userAvatar}`}>
                  <Link href={`/profile/${data?.getUserTournamentRanking?.profile?.user_name}`} passHref>
                    <a target="_blank">
                      <Image src={data?.getUserTournamentRanking?.profile?.avatar} alt=""
                             fallback="/assets/P2E/raffles/defaultAvatar.jpg" preview={false}
                      />
                    </a>
                  </Link>
                </div>
                <div className={`${s.userName} ${s.userNameYourRank}`}>
                  <Link href={`/profile/${data?.getUserTournamentRanking?.profile?.user_name}`} passHref>
                    <a target="_blank">{data?.getUserTournamentRanking?.profile?.display_name}</a>
                  </Link>
                </div>
              </div>
            </div>

          <div className={s.earningYourRank}>
            <div className={`${s.totalEarning}`}>${format(data?.getUserTournamentRanking?.total_earning, 2, {zero_trim: true})}</div>
          </div>
          <div className={s.rewardsYourRank}>
            <div className={s.userReward}>
              <div className={s.rewardPoint}>
                -- <img src="/assets/P2E/lucis-point.svg" alt=""/>
              </div>
              <div className={s.rewardToken}>
                -- <img src="/assets/P2E/lucis-token.svg" alt=""/>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    </>
  )
}
)
