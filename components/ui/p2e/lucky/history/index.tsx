import { Table } from 'antd';
import ButtonClaim from '../button/ButtonClaim';
import s from './history.module.sass'
export default function HistoryTable() {
    const dataSource = [
        {
            key: '1',
            name: '1',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: '2',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'No',
            dataIndex: 'name',
            key: 'name',
            width: '5%'
        },
        {
            title: 'Time',
            dataIndex: 'age',
            key: 'age',
            width: '20%'
        },
        {
            title: 'Reward',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '',
            render: () => {
                return(
                    <><ButtonClaim /></>
                )
            },
            width: '10%'
        },
    ];
    return (
        <div className={s.wrapper}>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}