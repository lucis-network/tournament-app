import {Col, List, Row, Spin} from "antd";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Notification} from "src/generated/graphql";
import s from "./Notification.module.sass";
import {isEmpty} from "lodash";
import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables
} from "@apollo/client";
import SpinLoading from "../../../ui/common/Spin";
import {useRouter} from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  notificationData: Notification[];
  unseenNotificationCount: number;
  loadMoreData: () => Promise<void>;
  markAllNotificationAsSeen: () => Promise<void>;
  seenNotification: (id: string) => Promise<void>;
};

const InfiniteList = (
  {
    notificationData,
    loadMoreData,
    unseenNotificationCount,
    markAllNotificationAsSeen,
    seenNotification
  }: Props
) => {
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [loadingMarkAllAsRead, setLoadingMarkAllAsRead] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (notifications.length === notificationData.length) {
      setHasMore(false);
    }
    setNotifications([...notificationData]);
  }, [notificationData]);

  const onLoadMore = async () => {
    await loadMoreData()
  }

  const onMarkAllNotificationAsSeen = async () => {
    if (unseenNotificationCount == 0) {
      return;
    }
    setLoadingMarkAllAsRead(true);
    try {
      await markAllNotificationAsSeen();
      // setNotifications(notifications.map(item => ({...item, is_seen: true})));
    } catch (e) {

    }
    setLoadingMarkAllAsRead(false);
  }
  return (
    <div className={s.infinite}>
      <InfiniteScroll
        className={s.infiniteContainer}
        hasMore={hasMore}
        next={onLoadMore}
        height={560}
        dataLength={notifications.length}
        loader={
            notifications.length > 5 ? <div className={s.loadMore}>
              Load more
              <span className="ml-2"><Spin size="small"/></span>
            </div> : null
        }
        endMessage={
          notifications.length === 0 ?
            <div className={s.loadMore}>
              You don&apos;t have any notifications
            </div> :
            <div className={s.loadMore}>
              Yay! You have seen it all
            </div>
        }
      >
        <List split={false}>
          <List.Item className={s.sticky}>
            <div className={s.topOption}>
              <div className={s.title}>Notifications</div>
              <div className={`${s.option} ${unseenNotificationCount == 0 ? s.notificationSeenAll : ""}`}
                   onClick={() => onMarkAllNotificationAsSeen()}>
                Mark all as read {loadingMarkAllAsRead &&
                <span className="ml-2"><Spin size="small"/></span>}</div>
            </div>
          </List.Item>
          {notifications.map((item: Notification, idx: number) => {
            return (
              <List.Item key={idx} onClick={async () => {
                if (!item.is_seen) {
                  await seenNotification(item.id);
                }
                if (item?.link) router.push(item?.link)
              }}>
                <Row className={`${s.notificationItem} ${!item.is_seen ? s.notificationItemUnseen : ""}`}>
                  <Col span={4} className={s.notificationItemImage}>
                    <img
                      // className="w-[30px] h-[30px]"
                      src={item?.image ?? ""}
                      alt=""
                      onError={(e) => e.currentTarget.src = "/assets/P2E/raffles/defaultAvatar.jpg"}
                    />
                  </Col>
                  <Col span={20} className={s.notificationItemContent}>
                    <p className={`font-[600] m-0 ${s.notiContentTitle}`}>{item?.title}
                    </p>
                    <p className={` m-0 ${s.notiContentDescription}`}
                       dangerouslySetInnerHTML={{__html: item?.content!}}/>
                    <p className={s.notificationItemTime}>
                      {moment(item?.created_at).fromNow()}
                    </p>
                  </Col>
                </Row>
              </List.Item>

            );
          })}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteList;
