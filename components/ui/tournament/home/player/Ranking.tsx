import { Table } from "antd";
import Link from "next/link";
import s from "./Ranking.module.sass";
import { useArenaRanking } from "../../../../../hooks/ranking/useRanking";
import { useEffect, useState } from "react";
import { UserRanking } from "../../../../../src/generated/graphql_p2e";
import AuthStore from "../../../../Auth/AuthStore";

const columns = [
  {
    title: 'No',
    dataIndex: 'rank',
    className: s.columnRank,
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
    render: (totalEarning: number) => {
      return totalEarning > 0 && (
        <div className={`${s.userEarning} ${s.userValue}`}>{totalEarning} BUSD</div>
      )
    }
  },
  {
    title: 'Your Reward',
    dataIndex: ['reward', 'rank'],
    className: s.columnReward,
    render: (_text: string, data: any) => {
      return (
        <div className={s.userReward}>
          <div className={s.rewardPoint}>
            9000 <img src="/assets/P2E/lucis-point.svg" alt=""/>
          </div>
          <div className={s.rewardToken}>
            9000 <img src="/assets/P2E/lucis-token.svg" alt=""/>
          </div>
          {data.rank == 1
            ? <img className={s.rewardChest} src="/assets/home/chest-1.png" alt="" />
            : <img className={s.rewardChest} src="/assets/home/chest-n.png" alt="" />}
        </div>
      )
    }
  },
];

type Props = {
  seasonId: string
}

const Ranking = ({ seasonId }: Props) => {
  const [rankingData, setRankingData] = useState<UserRanking[]>([])
  const {getArenaRankingLoading, dataArenaRanking} = useArenaRanking({
    seasonId
  })

  const userId = AuthStore.id
  //const [userRankingData, setUserRankingData] = useState<UserRanking>()
  //const {dataArenaUserRanking} = userId
  //  ? useArenaUserRanking({
  //      seasonId,
  //      userId
  //    })
  //  : {} as any

  const arenaRanking = dataArenaRanking?.getTournamentRanking
  useEffect(() => {
    if (arenaRanking) {
      setRankingData(arenaRanking)
    } else {
      setRankingData([])
    }
  }, [dataArenaRanking?.getTournamentRanking])

  //const arenaUserRanking = dataArenaUserRanking?.getUserRanking;
  //useEffect(() => {
  //  if (arenaUserRanking) {
  //    setUserRankingData(arenaUserRanking)
  //  }
  //}, [dataArenaUserRanking?.getUserRanking])

  return (
    <> 
      <div className={s.rankingTableWrapper}>
        <div className={s.rankingTableResponsive}>
          <Table columns={columns} dataSource={rankingData} pagination={false} rowKey="id" loading={getArenaRankingLoading} />
        </div>
      </div>
    </>
  )
}

export default Ranking;
