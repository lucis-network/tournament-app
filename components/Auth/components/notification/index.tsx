import { Badge, Popover } from "antd";
import InfiniteList from "./InfiniteNoti";
import { observer } from "mobx-react";
import {useGetNotification, useSubscribtionNotification} from "hooks/notification/useNotification";
import { useEffect, useState } from "react";
import s from "./Notification.module.sass";
import { useWindowSize } from "hooks/useWindowSize";
import AuthStore from "../../AuthStore";
import {Notification as NotificationType} from "src/generated/graphql";
import {isEmpty} from "lodash";

const Notification = () => {
  const [width] = useWindowSize()
  const { id } = AuthStore

  const {
    getNotificationError,
    getNotificationLoading,
    getNotificationData,
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

  const handleClick = () => {
    // fetchNotification()
    //   .then(data => {
    //     setNotiList(data.data.getNotification.reverse())
    //   })
    //   .catch((err) => console.log(err));
    // setIsSeen(true);
  };

  useEffect(() => {
    // console.log('getNotificationData: ', getNotificationData)
    let isSubscribed = true
    if (!isEmpty(getNotificationData)) {
      if (isSubscribed) {
        setNotiList(getNotificationData.reverse())
      }
    }
    return () => {
      isSubscribed = false
    }
  }, [getNotificationData])

  useEffect(() => {
    console.log('notificationSubscriptionData: ', notificationSubscriptionData)
    let isSubscribed = true
    if (!isEmpty(notificationSubscriptionData)) {
      if (isSubscribed) {
        // setNotiList(notificationSubscriptionData.reverse())
      }
    }
    return () => {
      isSubscribed = false
    }
  }, [notificationSubscriptionData])

  return (
    <div className={s.notification}>
      <Popover
        // placement={width < 1024 ? "bottom" : "bottomRight"}
        // trigger={width < 1024 ? "click" : "hover"}
        placement="bottom"
        content={<InfiniteList {...notificationList} />}
        trigger="click"
      >
        <Badge count={isSeen ? 0 : countNoti} size="small">
          <img
            className={s.notificationIcon}
            src="/assets/notification-icon.svg"
            alt=""
            onClick={handleClick}
          />
        </Badge>
      </Popover>
    </div>
  );
};

export default observer(Notification);
