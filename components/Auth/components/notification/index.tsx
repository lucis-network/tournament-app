import {Badge, notification, Popover} from "antd";
import InfiniteList from "./InfiniteNoti";
import { observer } from "mobx-react";
import {useGetNotification, useSubscribtionNotification} from "hooks/notification/useNotification";
import React, { useEffect, useState } from "react";
import s from "./Notification.module.sass";
import { useWindowSize } from "hooks/useWindowSize";
import AuthStore from "../../AuthStore";
import {Notification as NotificationType} from "src/generated/graphql";
import {isEmpty} from "lodash";
import moment from "moment";

const Notification = () => {
  const [width] = useWindowSize()
  const { id } = AuthStore
  const [visible, setVisible] = useState(false);
  const {
    getNotificationError,
    getNotificationLoading,
    getNotificationData,
    refetchNotification
  } = useGetNotification()
  const {notificationSubscriptionData} = useSubscribtionNotification({
    user_id: id
  })
  const [isSeen, setIsSeen] = useState(false)
  const [countNoti, setCountNoti] = useState(0)
  const [notiList, setNotiList] = useState<NotificationType[]>([])
  const notificationList = {
    notificationData: notiList,
    getNotificationLoading,
    // notificationSubscription,
    // fetchNotification,
  };
  const handleVisibleChange = (newVisible: boolean) => {
    if (newVisible) {
      refetchNotification()
        .then(data => {
          setNotiList(data.data.getNotification.reverse())
        })
        .catch((err) => console.log(err));
      setIsSeen(true);
    }
    setVisible(newVisible);
  }
  useEffect(() => {
    // console.log('getNotificationData: ', getNotificationData)
    let isSubscribed = true
    if (!isEmpty(getNotificationData)) {
      if (isSubscribed) {
        setNotiList(getNotificationData.reverse())
        // setCountNoti(getNotificationData.filter((item) => !item?.is_seen).length)
      }
    }
    return () => {
      isSubscribed = false
    }
  }, [getNotificationData])

  useEffect(() => {
    // console.log('notificationSubscriptionData: ', notificationSubscriptionData)
    let isSubscribed = true
    if (!isEmpty(notificationSubscriptionData)) {
      if (isSubscribed) {
        // setNotiList(notificationSubscriptionData.reverse())
        notification.open({
          message: notificationSubscriptionData.title,
          description: (
            <div className={s.notificationItem}>
              <img
                // className="w-[30px] h-[30px]"
                src={notificationSubscriptionData?.image ?? ""}
                alt=""
              />
              <div>
                <p>{notificationSubscriptionData?.content}</p>
              </div>
            </div>
          ),
          placement: "bottomRight",
        });
      }
    }
    return () => {
      isSubscribed = false
    }
  }, [notificationSubscriptionData])

  useEffect(() => {
    setVisible(false);
  }, [width])


  return (
    <div className={s.notification}>
      <Popover
        // placement={width < 1024 ? "bottom" : "bottomRight"}
        // trigger={width < 1024 ? "click" : "hover"}
        placement="bottom"
        content={<InfiniteList {...notificationList} />}
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
