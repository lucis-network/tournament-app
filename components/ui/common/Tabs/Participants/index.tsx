import s from "./Participants.module.sass"
import ButtonDonate from '../../button/ButtonDonate/index'

import { Table } from 'antd';


export default function TableParticipant() {
  
  const dataSource = [
    {
      key: '1', 
      name: 'Viet Nam',
      age: 32,
      address: '10 Downing Street',
      position: 'rank',
      member: [
        {id: 1, name: 'NonCaiTay', room_master: true},
        {id: 2, name: 'BestTop'},
        {id: 3, name: 'BestSp'},
      ]
    },
    {
      key: '2', 
      name: 'Cai Nit',
      age: 32,
      address: '10 Downing Street',
      position: 'rank',
      member: [
        {id: 1, name: 'Mid~pro', room_master: true},
        {id: 2, name: 'Mid~pro'},
        {id: 3, name: 'Mid~pro'},
      ]
    },
    {
      key: '3', 
      name: 'Cai Nit',
      age: 32,
      address: '10 Downing Street',
      position: 'rank',
      member: [
        {id: 1, name: 'Mid~pro', room_master: true},
        {id: 2, name: 'Mid~pro'},
        {id: 3, name: 'Mid~pro'},
      ]
    },
  ];
  
  const columns = [
    {
      title: '',
      dataIndex: 'key',
      key: 'key',
      width: '5%'
    },
    {
      title: 'Participant',
      dataIndex: 'name',
      key: 'name',
      width: '50%'
    },
    {
      title: 'Ingame',
      dataIndex: 'address',
      key: 'address',
      width: '20%'
    },
    {
      title: '',
      dataIndex: 'position',
      key: 'position',
      width: '10%'
    },
    {
      title: '',
      width: '15%',
      render: (_:any, item: object) => <ButtonDonate nameTeam={item} />,
    },
  ];
  return(
    <div>
      <Table dataSource={dataSource} columns={columns} className={s.container_table} />
    </div>
    )
}