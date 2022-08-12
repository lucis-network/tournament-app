import {useEffect, useState} from "react";
import {message, message as antMessage, Pagination, Table} from 'antd';
import ButtonClaim from '../button/ButtonClaim';
import s from './history.module.sass'
import {ClaimChestPrizeErrorCode, LuckyChestTier} from "../../../../../src/generated/graphql_p2e";
import {
  useClaimChestPrize,
  useGetLuckyChestUserInfo
} from "../../../../../hooks/p2e/luckyChest/useLuckyChest";
import moment from "moment";
import {handleGraphqlErrors} from "../../../../../utils/apollo_client";
import {AppEmitter} from "../../../../../services/emitter";
import PopupContactRaffles from "../../raffles/popup/popupContact";
import PrizePopover from "../prize/popover";
import {GAMES} from "../index";
import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData
} from "../../../../Auth/ConnectWalletStore";
import AuthBoxStore from "../../../../Auth/components/AuthBoxStore";
import {observer} from "mobx-react-lite";
import Link from "next/link"
import EtherContract from "../../../../../services/blockchain/Ethers";
import {ColumnsType} from "antd/es/table";

type HistoryTableProps = {
  currentGame: number,
}

const historyLimit = 10

export default observer(function HistoryTable({currentGame}: HistoryTableProps) {
  const [historyData, setHistoryData] = useState<any[]>([])
  const [claimingChestPrize, setClaimingChestPrize] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalHistory, setTotalHistory] = useState<number>(0)
  const [prizeCode, setPrizeCode] = useState<string>('')
  const [isModalContactVisible, setModalContactVisible] = useState<boolean>(false);
  const [loadingList, setLoadingList] = useState<number[]>([]);
  const {
    getLuckyChestUserInfoLoading,
    getLuckyChestUserInfoError,
    refetchGetLuckyChestUserInfo,
    dataLuckyChestUserInfo
  } = useGetLuckyChestUserInfo({
    game_platform_id: currentGame ? currentGame : GAMES.GARENALOL,
    tier: LuckyChestTier.Standard,
    page: currentPage,
    limit: historyLimit,
  })
  const {claimChestPrize} = useClaimChestPrize()
  const {address} = ConnectWalletStore;
  // console.log(dataLuckyChestUserInfo)
  const userHistory = dataLuckyChestUserInfo?.history
  const historyCount = dataLuckyChestUserInfo?.history_count

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
      setTotalHistory(historyCount)
    }

    return () => {
      isSubscribed = false
    }
  }, [historyCount])

  const columns: ColumnsType<any> = [
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
      render: (text: string) => moment(text).format('YYYY/MM/DD - HH:mm:ss')
    },
    {
      title: 'Reward',
      dataIndex: ['prize', 'user_prize_history_uid', 'is_claimed', 'code'],
      key: 'title',
      className: s.columnReward,
      render: (text: string, data: any, index) => {
        return (
            <div className={s.prizeWrap}>
              <div className={`${s.prize} ${data.prize.rarity}`}>
                <PrizePopover
                  image={data.prize.img}
                  title={data.prize.title}
                  description={data.prize.desc}
                  rarity={data.prize.rarity}
                >
                  <div className={s.prizeImg}>
                    <img src={data.prize.img ? (data.prize.img) : '/assets/P2E/lucky-chest/defaultPrizeImage.png'} alt=""/>
                  </div>
                </PrizePopover>
                {data.prize.title}
              </div>
              <ButtonClaim
                isClaimed={data.is_claimed}
                onClick={() => handleClaimChestPrize(index, data.prize?.category.currency_uid, data.prize?.category?.currency_type, data.user_prize_history_uid.toString(), data.code)}
                disabled={data.is_claimed || (claimingChestPrize === data.user_prize_history_uid)}
                buttonText={!data.prize?.category?.currency_type ? "Archived" : null}
                loading={loadingList.findIndex(item => item === index) > -1}
              />
            </div>
        )
      }
    }
  ]

  const handleClaimChestPrize = async (index: number, currency_uid: string | null, currency_type: string, user_prize_history_uid: string, code: string) => {

    if (currency_uid && !address) {
      AuthBoxStore.connectModalVisible = true;
      return;
    }

    if (currency_type === "DECENTRALIZED") {
      const ether = new EtherContract(ConnectWalletStore_NonReactiveData.web3Provider as any);
      const message = "Sign to claim your reward!";
      try {
        const signature = await ether.signMessage(message);
        // const addressFromSignature = ether.getAddressFromSignature(message, signature);
      } catch (e) {
        antMessage.error("User denied");
        return;
      }

    }
    if (!user_prize_history_uid) return
    setPrizeCode(code)
    setClaimingChestPrize(user_prize_history_uid)
    setLoadingList([...loadingList, index]);
    claimChestPrize({
      user_prize_history_uid: user_prize_history_uid,
      address: address,
      onError: (error) => handleGraphqlErrors(error, (code, message) => {
        const newLoadingList = loadingList.filter(item => item !== index);
        setLoadingList(newLoadingList);
        if (code !== 'UnAuth') {
          switch (code) {
            case ClaimChestPrizeErrorCode.UserHistoryNotFound:
              antMessage.error('Invalid prize code. Please contact Lucis Support for more details.')
              break
            case ClaimChestPrizeErrorCode.UserHasClaimed:
              antMessage.error('You have claimed this prize.')
              break
            default:
              antMessage.error('An unknown error has occurred. Please try again later.')
              break
          }
        }
      }),
      onCompleted: (data) => {
        const newLoadingList = loadingList.filter(item => item !== index);
        setLoadingList(newLoadingList);
        const claimChestPrizeData = data?.data?.claimChestPrize
        if (claimChestPrizeData) {
          antMessage.success('Success!')
          refetchGetLuckyChestUserInfo()
          AppEmitter.emit("updateBalance")
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
        <div className={s.historyHeader}>
          <h2>Your history</h2>
          <div>
            <Link href={"/profile?page=inventory"} passHref>
              <a>
                View user inventory
              </a>
            </Link>
          </div>
        </div>

        <Table
          dataSource={historyData}
          // dataSource={[]}
          columns={columns}
          pagination={false}
          loading={getLuckyChestUserInfoLoading}
          locale={{
            emptyText: `You haven't opened any chests yet.`
          }}
        />
        <div className={s.paginationWrap}>
          <Pagination
            className={s.historyPagination}
            size="small"
            total={totalHistory}
            current={currentPage}
            pageSize={historyLimit}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>
      <PopupContactRaffles
        contactURL="https://discord.gg/7SdtYpGENT"
        closePopupContact={handleCloseModalContact}
        status={isModalContactVisible}
        description={<div>
          Congratulations on your lucky win from Lucis.<br />Your prize code is <b style={{ color: '#00F9FF', cursor: 'pointer' }} onClick={handlePrizeCodeClick}>{prizeCode}</b>. Please contact and send the code to Lucis Supporter to receive the prize.
        </div>}
      />
    </>
  )
});