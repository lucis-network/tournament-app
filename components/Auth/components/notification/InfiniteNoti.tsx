import {Col, List, Row, Spin} from "antd";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Notification} from "src/generated/graphql";
import s from "./Notification.module.sass";
import {isEmpty} from "lodash";
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables
} from "@apollo/client";
import SpinLoading from "../../../ui/common/Spin";
import {useRouter} from "next/router";

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
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingMarkAllAsRead, setLoadingMarkAllAsRead] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(notificationData);
  }, [notificationData]);

  const onLoadMore = async () => {
    setLoadingMore(true);
    await loadMoreData()
    setLoadingMore(false);
  }

  const onMarkAllNotificationAsSeen = async () => {
    if (unseenNotificationCount == 0) {
      return;
    }
    setLoadingMarkAllAsRead(true);
    try {
      await markAllNotificationAsSeen();
      setNotifications(notifications.map(item => ({...item, is_seen: true})));
    } catch (e) {

    }
    setLoadingMarkAllAsRead(false);
  }

  return (
    <div className={s.infinite}>
      <div className={s.infiniteContainer} id="list">
        <List split={false}>
          <List.Item>
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
                    />
                  </Col>
                  <Col span={20} className={s.notificationItemContent}>
                    <p className={`font-[600] m-0 ${s.notiContentTitle}`}>{item?.title}
                    </p>
                    <p className={` m-0 ${s.notiContentDescription}`}>{item?.content}</p>
                    <p className={s.notificationItemTime}>
                      {moment(item?.created_at).fromNow()}
                    </p>
                  </Col>
                </Row>
              </List.Item>

            );
          })}
          <List.Item>
            <div className={s.loadMore} onClick={() => onLoadMore()}>Load more {loadingMore &&
                <span className="ml-2"><Spin size="small"/></span>}</div>
          </List.Item>
        </List>
      </div>
    </div>
  );
};

export default InfiniteList;
