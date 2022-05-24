import { Currency, DonateHistory } from "../../../../../../src/generated/graphql";
import { Image, Table } from "antd";
import s from "./DonationHistory.module.sass";
import Link from "next/link";
import { LinkOutlined } from "@ant-design/icons";
import { currency as formatCurrency } from "../../../../../../utils/Number";
import {isEmpty} from "lodash";

type DonationHistoryProps = {
  dataDonation: DonateHistory[];
  loadingDonation: any;
  currency?: Currency;
};

export default function DonationHistory(props: DonationHistoryProps) {
  const { dataDonation, loadingDonation, currency } = props;
  if (loadingDonation || isEmpty(dataDonation)) {
    return <></>;
  }
  let totalDonation = 0
  dataDonation.map(item => {
    if (item.amount as number >= 0) {
      totalDonation += item.amount as number
    }
  })

  const columns = [
    {
      title: "No",
      key: "no",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Donors",
      dataIndex: ["donor_avatar", "donor_display_name"],
      render: (text: string, row: any) => (
        <div className="text-left">
          {row.donor_avatar && (
            <Image
              className={s.avatar}
              src={`${row.donor_avatar}`}
              preview={false}
              alt={`${row.donor_display_name}`}
            />
          )}
          {row.donor_display_name}
        </div>
      ),
    },
    {
      title: "Receiver",
      dataIndex: ["receiver_avatar", "receiver_display_name"],
      render: (text: string, row: any) => (
        <div className="text-left">
          {row.receiver_avatar && (
            <Image
              className={s.avatar}
              src={`${row.receiver_avatar}`}
              preview={false}
              alt={`${row.receiver_display_name}`}
            />
          )}
          {row.receiver_display_name}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text: string) => {
        const firstLetter = text[0];
        const otherLetters = text.substring(1).toLowerCase();
        return <span>{firstLetter + otherLetters}</span>;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount: number) => (
        <span>
          {formatCurrency(amount)} {currency?.symbol}
        </span>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (message: string) => (
        <>
          {message}
        </>
      ),
    },
    {
      title: "TxID",
      dataIndex: "tx_hash",
      render: (hash: string) => (
        <span>
          {hash && (
            <Link href={`https://testnet.bscscan.com/tx/${hash}`} passHref>
              <a target="_blank">
                <LinkOutlined />
              </a>
            </Link>
          )}
        </span>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (time: string) => {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = ("00" + +(date.getMonth() + 1)).slice(-2);
        const day = ("00" + date.getDate()).slice(-2);
        const hours = ("00" + date.getHours()).slice(-2);
        const minutes = ("00" + date.getMinutes()).slice(-2);
        const seconds = ("00" + date.getSeconds()).slice(-2);

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
      },
    },
  ];

  return (
    <div className={s.wrapper}>
      <div className={s.donationWrapper}>
        <h3>
          Total donation: {formatCurrency(totalDonation)} {currency?.symbol}
        </h3>
        <Table
          dataSource={dataDonation}
          columns={columns}
          bordered
          className={s.container_table}
          rowKey={(record) => `${record.tx_hash}`}
        />
      </div>
    </div>
  );
}
