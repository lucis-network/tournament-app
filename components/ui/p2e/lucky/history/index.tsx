import {useEffect, useState} from "react";
import {message, message as antMessage, Modal, Pagination, Table} from 'antd';
import ButtonClaim from '../button/ButtonClaim';
import s from './history.module.sass'
import {ClaimChestPrizeErrorCode, LuckyChestTier, LuckyChestType} from "../../../../../src/generated/graphql_p2e";
import {
  useClaimChestPrize,
  useGetLuckyChestUserInfo
} from "../../../../../hooks/p2e/luckyChest/useLuckyChest";
import moment from "moment";
import {handleGraphqlErrors} from "../../../../../utils/apollo_client";
import {AppEmitter} from "../../../../../services/emitter";
import PopupContactRaffles from "../../raffles/popup/popupContact";
import PrizePopover from "../prize/popover";

const historyLimit = 10

export default function HistoryTable() {
  const [historyData, setHistoryData] = useState<any[]>([])
  const [claimingChestPrize, setClaimingChestPrize] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(0)
  const [prizeCode, setPrizeCode] = useState<string>('')
  const [isModalContactVisible, setModalContactVisible] = useState<boolean>(false)
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
    if (isSubscribed && historyCount) {
      const totalPage = Math.ceil(historyCount / historyLimit)
      setPageCount(totalPage)
    }

    return () => {
      isSubscribed = false
    }
  }, [historyCount])
  console.log('[HistoryTable] historyCount, historyLimit, currentPage, pageCount: ', historyCount, historyLimit, currentPage, pageCount);
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
      dataIndex: ['prize', 'user_prize_history_uid', 'is_claimed', 'code'],
      key: 'title',
      className: s.columnReward,
      render: (text: string, data: any) => {
        return (
            <div className={s.prizeWrap}>
              <div className={`${s.prize} ${data.prize.rarity}`}>
                <PrizePopover
                  image={data.prize.img}
                  title={data.prize.title}
                  description={data.prize.description}
                  rarity={data.prize.rarity}
                >
                  <div className={s.prizeImg}>
                    <img src={data.prize.img ? (data.prize.img) : '/assets/P2E/lucky-chest/defaultPrizeImage.png'} alt=""/>
                  </div>
                </PrizePopover>
                {data.prize.title}
              </div>
              <ButtonClaim
                isClaimed={data.is_claimed || (claimingChestPrize === data.user_prize_history_uid)}
                onClick={() => handleClaimChestPrize(data.user_prize_history_uid.toString(), data.code)}
              />
            </div>
        )
      }
    }
  ]

  const handleClaimChestPrize = (user_prize_history_uid: string, code: string) => {
    if (!user_prize_history_uid) return
    setPrizeCode(code)
    setClaimingChestPrize(user_prize_history_uid)
    claimChestPrize({
      user_prize_history_uid: user_prize_history_uid,
      onError: (error) => handleGraphqlErrors(error, (code, message) => {
        if (code !== 'UnAuth') {
          switch (code) {
            // chaupa todo claimChestPrize error messages
            case ClaimChestPrizeErrorCode.UserHistoryNotFound:
              antMessage.error('An unknown error has occurred. Please try again later.')
              break
            case ClaimChestPrizeErrorCode.UserHasClaimed:
              antMessage.error('An unknown error has occurred. Please try again later.')
              break
            default:
              antMessage.error('An unknown error has occurred. Please try again later.')
              break
          }
        }
      }),
      onCompleted: (data) => {
        const claimChestPrizeData = data?.data?.claimChestPrize
        if (claimChestPrizeData) {
          if (claimChestPrizeData?.required_contact) {
            setModalContactVisible(true)
          } else {
            antMessage.success('Success!')
            refetchGetLuckyChestUserInfo()
          }
        }
      }
    }).finally(() => setClaimingChestPrize(''))
  }

  const handleCloseModalContact = () => {
    setModalContactVisible(false)
  }

  const handlePrizeCodeClick = () => {
    navigator.clipboard.writeText(prizeCode)
    message.success('Copied!')
  }

  return (
    <>
      <div className={s.wrapper}>
        <h2>Your history</h2>
        <Table
          dataSource={historyData}
          // dataSource={[]}
          columns={columns}
          pagination={false}
          loading={getLuckyChestUserInfoLoading}
          locale={{
            emptyText: `You haven't opened the chest yet.`
          }}
        />
        <div className={s.paginationWrap}>
          <Pagination className={s.historyPagination} size="small" total={pageCount} current={currentPage} pageSize={historyLimit} onChange={(page) => setCurrentPage(page)} />
        </div>
      </div>
      <PopupContactRaffles
        contactURL="https://discord.gg/7SdtYpGENT"
        closePopupContact={handleCloseModalContact}
        status={isModalContactVisible}
        description={<div>
          Congratulations on your lucky win from <br />
          Your code prize is <b style={{ color: '#00F9FF', cursor: 'pointer' }} onClick={handlePrizeCodeClick}>{prizeCode}</b>. Please contact and send the code to Lucis Support to receive the prize.
        </div>}
      />
    </>
  )
}