import {useEffect, useState} from "react";
import {message as antMessage, Pagination, Table} from 'antd';
import ButtonClaim from '../button/ButtonClaim';
import s from './history.module.sass'
import {LuckyChestTier, LuckyChestType} from "../../../../../src/generated/graphql_p2e";
import {
    useClaimChestPrize,
    useGetLuckyChestUserInfo
} from "../../../../../hooks/p2e/luckyChest/useLuckyChest";
import moment from "moment";
import {handleGraphqlErrors} from "../../../../../utils/apollo_client";
import {AppEmitter} from "../../../../../services/emitter";

const historyLimit = 10

export default function HistoryTable() {
    const [historyData, setHistoryData] = useState<any[]>([])
    const [claimingChestPrize, setClaimingChestPrize] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(0)
    const {
        getLuckyChestUserInfoLoading,
        getLuckyChestUserInfoError,
        refetchGetLuckyChestUserInfo,
        dataLuckyChestUserInfo
    } = useGetLuckyChestUserInfo({
        type: LuckyChestType.Csgo,
        tier: LuckyChestTier.Standard,
        page: currentPage,
        limit: historyLimit,
    })
    const {claimChestPrize} = useClaimChestPrize()

    const userHistory = dataLuckyChestUserInfo?.history
    const historyCount = dataLuckyChestUserInfo?.history_count
    // const mockData = Array(5).fill({
    //   uid: 1,
    //   type: 'CSGO',
    //   tier: 'STANDARD',
    //   prize_id: '1',
    //   id: 1,
    //   prize: {
    //     title: 'prize 1',
    //     rarity: 'Common',
    //   },
    //   is_claimed: false,
    //   updated_at: 'asdfasdf',
    // }) as unknown as UserLuckyChestHistory[]

    useEffect(() => {
        const l = AppEmitter.addListener('refresh_history', refetchGetLuckyChestUserInfo)

        return () => {
            l.remove()
        }
    }, [])

    useEffect(() => {
        let isSubscribed = true
        const dataSource: any = []

        userHistory && userHistory.map((item, index) => {
            dataSource.push({
                code: item?.code,
                created_at: item?.created_at,
                prize: item?.prize,
                user_prize_history_uid: item?.uid,
                is_claimed: item?.is_claimed,
            })
            if (isSubscribed) setHistoryData(dataSource)
        })

        return () => {
            isSubscribed = false
        }
    }, [userHistory])

    useEffect(() => {
        let isSubscribed = true
        const a = Math.ceil(20 / 6)
        if (isSubscribed && historyCount) setPageCount(a)

        return () => {
            isSubscribed = false
        }
    }, [historyCount])

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            className: s.columnCounter,
        },
        {
            title: 'Time',
            dataIndex: 'created_at',
            key: 'updated_at',
            className: s.columnTime,
            render: (text: string) => moment(text).format('YYYY/MM/DD - hh:mm:ss')
        },
        {
            title: 'Reward',
            dataIndex: ['prize', 'user_prize_history_uid', 'is_claimed'],
            key: 'title',
            className: s.columnReward,
            render: (text: string, data: any) => {
                return (
                  <div className={s.prizeWrap}>
                      <div className={`${s.prize} ${data.prize.rarity}`}>
                          {data.prize.title}
                      </div>
                      <ButtonClaim isClaimed={data.is_claimed || claimingChestPrize}
                                   onClick={() => handleClaimChestPrize(data.user_prize_history_uid.toString())}/>
                  </div>
                )
            }
        }
    ]

    const handleClaimChestPrize = (user_prize_history_uid: string) => {
        if (!user_prize_history_uid) return

        setClaimingChestPrize(true)
        claimChestPrize({
            user_prize_history_uid: user_prize_history_uid,
            onError: (error) => handleGraphqlErrors(error, (code, message) => {
                if (code !== 'UnAuth') {
                    switch (code) {
                      // chaupa todo claimChestPrize error messages
                        case '':
                            antMessage.error('An unknown error has occurred. Please try again later.')
                            break
                        default:
                            antMessage.error('An unknown error has occurred. Please try again later.')
                            break
                    }
                }
            }),
            onCompleted: (data) => {
                if (data?.data?.claimChestPrize && data?.data?.claimChestPrize !== null) {
                    refetchGetLuckyChestUserInfo()
                    antMessage.success('Success!')
                }
            }
        }).finally(() => setClaimingChestPrize(false))
    }

    return (
      <div className={s.wrapper}>
          <h2>Your history</h2>
          <Table dataSource={historyData} columns={columns} pagination={false} loading={getLuckyChestUserInfoLoading} />
          <div className={s.paginationWrap}>
              <Pagination className={s.historyPagination} size="small" total={pageCount} current={currentPage} pageSize={historyLimit} onChange={(page) => setCurrentPage(page)} />
          </div>
      </div>
    )
}