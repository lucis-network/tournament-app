import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { notification } from "antd";
import {isEmpty} from "lodash";

type UseSubscribtionNotificationProps = {
  user_id: number | undefined;
};

export const useGetNotification = () => {
  const {
    loading: getNotificationLoading,
    error: getNotificationError,
    data,
    refetch: refetchNotification
  } = useQuery(
    GET_NOTIFICATION,
    {
      fetchPolicy: "no-cache"
    }
  );

  return {
    getNotificationLoading,
    getNotificationError,
    refetchNotification,
    getNotificationData: data?.getNotification,
  };
};

export const useSubscribtionNotification = ({ user_id }: UseSubscribtionNotificationProps) => {
  const {
    loading,
    data: notificationSubscriptionData
  } = useSubscription(PUSH_NOTIFICATION, {
    variables: {
      user_id: parseFloat(user_id + '')
    },
    fetchPolicy: "no-cache",
    // skip: isEmpty(user_id)
  });

  return {
    notificationSubscriptionData: notificationSubscriptionData?.pushNotification
  }
}

const PUSH_NOTIFICATION = gql`
    subscription ($user_id: Float!){
        pushNotification(user_id: $user_id) {
            user_id
            title
            image
            is_seen
            content,
        }
    }
`;

const GET_NOTIFICATION = gql`
  query {
    getNotification {
      id
      user_id
      is_seen
      title
      image
      content
      created_at
    }
  }
`;
