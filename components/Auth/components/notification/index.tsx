import {Badge, notification, Popover} from "antd";
import InfiniteList from "./InfiniteNoti";
import {observer} from "mobx-react";
import {MARK_ALL_NOTIFICATION_AS_SEEN, SEEN_NOTIFICATION, useGetNotification} from "hooks/notification/useNotification";
import React, {useCallback, useEffect, useState} from "react";
import s from "./Notification.module.sass";
import {useWindowSize} from "hooks/useWindowSize";
import AuthStore from "../../AuthStore";
import {Notification as NotificationType} from "src/generated/graphql";
import {RealtimeService} from "../../../service/RealtimeService";
import {useRouter} from "next/router";
import {useMutation} from "@apollo/client";
import {OPEN_CHEST} from "../../../../hooks/p2e/luckyChest/useLuckyChest";

const Notification = () => {
  const [width] = useWindowSize()
  const {id} = AuthStore
  const [oldId, setOldId] = useState(id)
  const [visible, setVisible] = useState(false);
  const [idState, setIdState] = useState(undefined);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const {
    getNotificationData,
    refetchNotification
  } = useGetNotification(page, 10)
  // const {notificationSubscriptionData, notificationSubscriptionDataArena} = useSubscriptionNotification({
  //   user_id: id
  // })

  const [isSeen, setIsSeen] = useState(false)
  const [countNoti, setCountNoti] = useState(0)
  const [notiList, setNotiList] = useState<NotificationType[]>([])

  const loadMoreData = async () => {
    setPage(page + 1);
    try {
      const res = await refetchNotification({
        page: page + 1,
        limit: 10
      })
      // setNotiList([...notiList,...res.data.getNotification.notifications])
    } catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    if (getNotificationData) {
      setNotiList([...notiList, ...getNotificationData?.notifications]);
      setCountNoti(Number(getNotificationData.unseen_count));
    }

  }, [getNotificationData])

  const visibleNotification = () => {
    setVisible(false);
  }

  useEffect(() => {
    if (!visible) {
      window.removeEventListener("scroll", visibleNotification);
    }
  }, [visible])


  const notificationList = {
    notificationData: notiList,
    unseenNotificationCount: countNoti
    // noatificationSubscription,
    // fetchNotification,
  };
  const handleVisibleChange = (newVisible: boolean) => {
    if (newVisible) {
      window.addEventListener("scroll", visibleNotification)
    } else {
      window.removeEventListener("scroll", visibleNotification);
    }
    setVisible(newVisible);
  }
  const [markAllNotisAsSeen] = useMutation(MARK_ALL_NOTIFICATION_AS_SEEN);
  const [seenNotification] = useMutation(SEEN_NOTIFICATION);

  const markAllNotificationAsSeen = async () => {
    await markAllNotisAsSeen();
    setCountNoti(0);
  }

  const onSeenNotification = async (id: string) => {
    setVisible(false);
    await seenNotification({variables: {id: parseFloat(id)}})
    setNotiList(notiList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          is_seen: true
        }
      }
      return item;
    }));
    setCountNoti(countNoti - 1);
  }

  const subscribe = (value: any) => {
    const data = value.data?.pushNotification.new_noti;
    const countNoti = value.data?.pushNotification.unseen_count;

    setNotiList((oldState) => {
      return [data, ...oldState]
    });
    setCountNoti(Number(countNoti))
    notification.open({
      message: data.title,
      onClick: () => router.push(data.link),
      description: (
        <div className={s.notificationItemToast}>
          <img
            // className="w-[30px] h-[30px]"
            src={data?.image ?? ""}
            alt=""
          />
          <div>
            <p>{data?.content}</p>
          </div>
        </div>
      ),
      placement: "bottomRight",
    });
  };


  useEffect(() => {
    if (id) {
      const realTimeService = new RealtimeService(id);
      realTimeService.subscriptionArena().then(res => {
        res.subscribe({
          next(value) {
            subscribe(value);
          }
        })
      });

      realTimeService.subscriptionP2e().then(res => {
        res.subscribe({
          next(value) {
            subscribe(value);
          }
        })
      });
    }
  }, [])

  useEffect(() => {
    setVisible(false);
  }, [width])


  return (
    <div className={s.notification}>
      <Popover
        // placement={width < 1024 ? "bottom" : "bottomRight"}
        // trigger={width < 1024 ? "click" : "hover"}
        placement="bottom"
        content={<InfiniteList
          {...notificationList}
          loadMoreData={() => loadMoreData()}
          markAllNotificationAsSeen={markAllNotificationAsSeen}
          seenNotification={onSeenNotification}
        />}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <Badge count={isSeen ? 0 : countNoti} size="small">
          <img
            className={s.notificationIcon}
            src="/assets/notification-icon.svg"
            alt=""
          />
        </Badge>
      </Popover>
    </div>
  );
};

export default observer(Notification);
