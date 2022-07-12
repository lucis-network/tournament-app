import { Table } from 'antd';
import ButtonClaim from '../button/ButtonClaim';
import s from './history.module.sass'
import {UserHistory, UserLuckyChestHistory} from "../../../../../src/generated/graphql_p2e";
import {Maybe} from "@graphql-tools/utils";
import {ClaimChestPrizeProps} from "../../../../../hooks/p2e/luckyChest/useLuckyChest";
import moment from "moment";

type HistoryTableProps = {
    userHistoryData: Maybe<UserHistory[]> | undefined,
    claimChestPrize: (user_prize_history_uid: string) => void
}

export default function HistoryTable({userHistoryData, claimChestPrize}: HistoryTableProps) {
    const dataSource: any = []
    const mockData = Array(50).fill({
        uid: 1,
        type: 'CSGO',
        tier: 'STANDARD',
        prize_id: '1',
        id: 1,
        prize: {
            title: 'prize 1',
            rarity: 'Common',
        },
        is_claimed: false,
        created_at: 'asdfasdf',
    }) as unknown as UserLuckyChestHistory[]

    userHistoryData && userHistoryData.map((item, index) => {
    // mockData.map((item, index) => {
        dataSource.push({
            count: index + 1,
            created_at: item?.created_at,
            prize: item?.prize,
            user_prize_history_uid: item?.uid,
            is_claimed: item?.is_claimed,
        })
    })

    const columns = [
        {
            title: 'No',
            dataIndex: 'count',
            key: 'count',
            className: s.columnCounter,
        },
        {
            title: 'Time',
            dataIndex: 'created_at',
            key: 'created_at',
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
                      <ButtonClaim isClaimed={data.is_claimed} onClick={() => claimChestPrize(data.user_prize_history_uid.toString())} />
                  </div>
                )
            }
        }
    ]

    return (
        <div className={s.wrapper}>
            <h2>Your history</h2>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
    )
}