import {Currency, Prize} from "../../../../../../src/generated/graphql";
import {Image, Table} from "antd";
import s from "./DonationHistory.module.sass";
import Link from "next/link";
import {LinkOutlined} from "@ant-design/icons";
import {fomatNumber} from "../../../../../../utils/Number";

type DonationHistoryProps = {
  dataDonation: Prize[];
  loadingDonation: any;
  currency?: Currency;
  tournament: any;
};

export default function DonationHistory(props: DonationHistoryProps) {
  const { dataDonation, loadingDonation, currency, tournament } = props;
  if (loadingDonation) {
    return <></>;
  }
  const { totalDonation } = tournament;
  const columns = [
    {
      title: 'No',
      key: 'no',
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: 'Donors',
      dataIndex: ['donor_avatar', 'donor_display_name'],
      render: (text: string, row: any) => <span>{row.donor_avatar && <Image className={s.avatar} src={`${row.donor_avatar}`} preview={false} alt={`${row.donor_display_name}`} />}{row.donor_display_name}</span>
    },
    {
      title: 'Receiver',
      dataIndex: ['receiver_avatar', 'receiver_display_name'],
      render: (text: string, row: any) => <span>{row.receiver_avatar && <Image className={s.avatar} src={`${row.receiver_avatar}`} preview={false} alt={`${row.receiver_display_name}`} />}{row.receiver_display_name}</span>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text: string) => {
        const firstLetter = text[0];
        const otherLetters = text.substring(1).toLowerCase();
        return <span>{firstLetter + otherLetters}</span>
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text: string) => <span>{text} {currency?.symbol}</span>
    },
    {
      title: 'TxID',
      dataIndex: 'tx_hash',
      render: (hash: string) => <span>{hash && <Link href={`https://testnet.bscscan.com/tx/${hash}`} passHref><a><LinkOutlined /></a></Link>}</span>
    },
    {
      title: 'Time',
      dataIndex: 'time',
      render: (time: string) => {
        const date = new Date(time)
        const year = date.getFullYear();
        const month = ('00' + +(date.getMonth() + 1)).slice(-2);
        const day = ('00' + date.getDate()).slice(-2);
        const hours = ('00' + date.getHours()).slice(-2);
        const minutes = ('00' + date.getMinutes()).slice(-2);
        const seconds = ('00' + date.getSeconds()).slice(-2);

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
      }
    },
  ]

  return (
    <div className={s.donationWrapper}>
      <h3 className="text-right">Total donation: {fomatNumber(totalDonation)} {currency?.symbol}</h3>
      <Table
        dataSource={dataDonation}
        columns={columns}
        bordered
        className={s.container_table}
      />
    </div>
  )
}