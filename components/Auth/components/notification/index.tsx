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
import {AppEmitter} from "../../../../services/emitter";

const Notification = () => {
  const [width] = useWindowSize()
  const {id} = AuthStore
  const [visible, setVisible] = useState(false);
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



  const notificationList = {
    notificationData: notiList,
    unseenNotificationCount: countNoti
    // noatificationSubscription,
    // fetchNotification,
  };
  const handleVisibleChange = (newVisible: boolean) => {
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
    setCountNoti(Math.max(0, countNoti - 1));
  }


  useEffect(() => {
    setVisible(false);
  }, [width])

  useEffect(() => {
    const listener1 = AppEmitter.addListener("updateNotification", (res: any) => {
      setCountNoti(Number(res.countNotification));
      setNotiList((oldState) =>[res.data, ...oldState]);
    });
    const listener2 = AppEmitter.addListener("seenNotification", (res: any) => {
      setCountNoti((oldState) => oldState - 1);
      setNotiList((oldState) =>oldState.map(item => ({...item, is_seen: item.id === res.data.id ? true : item.is_seen})));
    });
    return () => {
      listener1.remove();
      listener2.remove();
    };
  }, [])
  return (
    <div className={s.notification}>
      <Popover
        getPopupContainer={trigger => trigger.parentElement!}
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
