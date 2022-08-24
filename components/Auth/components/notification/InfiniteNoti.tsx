import {Col, List, Row} from "antd";
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
import {useRouter} from "next/router";

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
  const router = useRouter();
  return (
    <div className={s.infinite}>
      <div className={s.infiniteContainer} id="list">
        {getNotificationLoading ?
          <SpinLoading /> :
          <List
            dataSource={notificationData}
            renderItem={(item: Notification, idx: number) => {
              return (
                <List.Item key={item?.id} onClick={() => { if (item?.link) router.push(item?.link)}}>
                  <Row className={s.notificationItem} gutter={8}>
                    <Col span={4} className={s.notificationItemImage}>
                      <img
                        // className="w-[30px] h-[30px]"
                        src={item?.image ?? ""}
                        alt=""
                      />
                    </Col>
                    <Col span={20}>
                      <p className="font-[600] m-0">{item?.title}</p>
                      <p className="m-0">{item?.content}</p>
                      <p className={s.notificationItemTime}>
                        {moment(item?.created_at).fromNow()}
                      </p>
                    </Col>
                  </Row>
                </List.Item>
              );
            }}
          />}
      </div>
    </div>
  );
};

export default InfiniteList;
