import { Table } from 'antd';
import ButtonClaim from '../button/ButtonClaim';
import s from './history.module.sass'
import {UserLuckyChestHistory} from "../../../../../src/generated/graphql_p2e";
import {Maybe} from "@graphql-tools/utils";
import {ClaimChestPrizeProps} from "../../../../../hooks/p2e/luckyChest/useLuckyChest";

type HistoryTableProps = {
    userHistoryData: Maybe<UserLuckyChestHistory[]> | undefined,
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
        updated_at: 'asdfasdf',
    }) as unknown as UserLuckyChestHistory[]

    userHistoryData && userHistoryData.map((item, index) => {
    // mockData.map((item, index) => {
        dataSource.push({
            count: index,
            updated_at: item?.updated_at,
            title: item?.prize?.title,
            prize_id: item?.prize_id,
            is_claimed: item?.is_claimed,
        })
    })

    const columns = [
        {
            title: 'No',
            dataIndex: 'count',
            key: 'count',
            width: '5%'
        },
        {
            title: 'Time',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: '20%'
        },
        {
            title: 'Reward',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '',
            dataIndex: ['prize_id', 'is_claimed'],
            key: 'claim',
            render: (text: string, row: any) => {
                return(
                    <>
                        <ButtonClaim isClaimed={row.is_claimed} onClick={() => claimChestPrize(row.prize_id)} />
                    </>
                )
            },
            width: '10%'
        },
    ];
    return (
        <div className={s.wrapper}>
            <h2>Your history</h2>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}