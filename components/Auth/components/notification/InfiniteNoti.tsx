import { List } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
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

type Props = {
  notificationData: Notification[];
  getNotificationLoading: boolean;
  fetchNotification?: (options?: (MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined)) => Promise<any>;
  notificationSubscription?: any;
};

const InfiniteList = (
  {
    notificationData,
    getNotificationLoading,
    fetchNotification,
    notificationSubscription,
  }: Props
) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className={s.infinite}>
      <div className={s.infiniteContainer} id="list">
        {getNotificationLoading ?
          <SpinLoading /> :
          <List
            dataSource={notificationData}
            renderItem={(item: Notification, idx: number) => {
              return (
                <List.Item key={item?.id}>
                  <div className={s.notificationItem}>
                    <img
                      // className="w-[30px] h-[30px]"
                      src={item?.image ?? ""}
                      alt=""
                    />
                    <div>
                      <p className="font-[600] m-0">{item?.title}</p>
                      <p>{item?.content}</p>
                    </div>
                    <p className={s.notificationTime}>
                      {moment(item?.created_at).fromNow()}
                    </p>
                  </div>
                </List.Item>
              );
            }}
          />}
      </div>
    </div>
  );
};

export default InfiniteList;
