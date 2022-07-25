import React, {useEffect, useState} from "react";
import s from "./index.module.sass";
import {message, Table} from "antd";
import {useGetReferHistory} from "../../../../../../hooks/p2e/useP2E";
import {ReferFriendGql} from "../../../../../../src/generated/graphql_p2e";
import {isClient} from "../../../../../../utils/DOM";
import AuthStore from "../../../../../Auth/AuthStore";

type Props = {
};

const ReferHistory = (props: Props) => {
  const {dataReferHistory, loading, refetchDataReferHistory} = useGetReferHistory();
  const [linkRef, setLinkRef] = useState('');
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    let linkUrlRef = window.location.origin;
    if (AuthStore.code) {
      linkUrlRef = `${window.location.origin}/?ref=${AuthStore.code}&utm_source=playcore-dashboard&utm_medium=r-menu&utm_campaign=lucis-refer-friend`
    }
    setLinkRef(linkUrlRef);

  }, [AuthStore?.code, linkRef])

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (_: any, data: ReferFriendGql, index: number) => {
        return (
          <div className={s.prizeWrap}>
            {index+1}
          </div>
        )
      }
    },
    {
      title: 'Invited',
      dataIndex: 'invited',
      key: 'invited',
      render: (_: any, data: ReferFriendGql) => {
        return (
          <div className={s.prizeWrap}>
            {data?.user?.profile?.display_name}
          </div>
        )
      }
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (_: any, data: ReferFriendGql) => {
        return (
          <div className={s.prizeWrap}>
            {data?.user?.code}
          </div>
        )
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_: any, data: ReferFriendGql) => {
        return (
          <div className={s.prizeWrap}>
            {data?.user?.email}
          </div>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: ['status'],
      key: 'status',
      render: (_: any, data: ReferFriendGql) => {
        return (
          <div className={s.prizeWrap}>
            {data?.status === "JoinSystem" &&
                <>
                    Signed in
                </>
            }
            {data?.status === "ConnectGame" &&
                <>
                    Connected Game
                </>
            }
            {data?.status === "EarningPoint" &&
                <>
                    Completed
                </>
            }
          </div>
        )
      }
    },
    {
      title: 'Reward',
      dataIndex: ['reward'],
      key: 'reward',
      render: (_: any, data: ReferFriendGql) => {
        return (
          <div className={s.prizeWrap}>
            <div className={s.rewardItem}>
              <span className={s.lucisPoint}>+50</span>
              <img src="/assets/P2E/lucis-point.svg" alt="" />
            </div>
          </div>
        )
      }
    }
  ]

  const handleCopy = () => {
    if (linkRef) {
      if (isClient) {
        setIsCopy(true);
        message.success("Copied to clipboard");
        navigator.clipboard.writeText(linkRef);
      }
    }
  };

  return (
    <div className={s.wrapper}>
      <h2>Invite friend to get reward:</h2>
      <div className={s.contentDesc}>
        <p>1. Get your friend to sign up with the link above.</p>
        <p>2. They will have to connect game and play at least one match.</p>
        <p>3. You both will get rewarded with 50 Lucis points.</p>
      </div>

      <div className={`${s.info} sm:mt-2 lg:mt-5 `}>
        <div
          className={`${s.name} flex font-[400] text-[14px] sm:text-[16px] md:text-[18px]`}
        >
          <input
            readOnly
            value={linkRef}
            className={s.inputUrl}
          ></input>
          <button style={{marginLeft: "16px"}} disabled={isCopy} onClick={handleCopy}>
            <img width={26} src={"/assets/P2E/overview/content-copy.svg"} alt="" />
          </button>
        </div>
      </div>

      <h2>Refer history</h2>
      <Table
        dataSource={dataReferHistory}
        columns={columns}
        pagination={false}
        locale={{
          emptyText: `You haven't any refer yet.`
        }}
      />
    </div>
  );
};

export default ReferHistory;
