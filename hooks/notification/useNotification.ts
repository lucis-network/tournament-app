import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { notification } from "antd";
import {isEmpty} from "lodash";

type UseSubscribtionNotificationProps = {
  user_id: number | undefined;
};

export const useGetNotification = (page: number, limit: number) => {
  const {
    loading: getNotificationLoading,
    error: getNotificationError,
    data,
    refetch: refetchNotification
  } = useQuery(
    GET_NOTIFICATION,
    {
      fetchPolicy: "no-cache",
      variables: {
        page: page,
        limit: limit
      }
    }
  );

  return {
    getNotificationLoading,
    getNotificationError,
    refetchNotification,
    getNotificationData: data?.getNotification,
  };
};

// export const useSubscriptionNotification = ({ user_id }: UseSubscribtionNotificationProps) => {
//   const {
//     data: notificationSubscriptionData
//   } = useSubscription(PUSH_NOTIFICATION, {
//     variables: {
//       user_id: parseFloat(user_id + '')
//     },
//
//     context: {
//       endpoint: "p2e"
//     }
//     // skip: isEmpty(user_id)
//   });
//
//   const {
//     data: notificationSubscriptionDataArena
//   } = useSubscription(PUSH_NOTIFICATION_ARENA, {
//     variables: {
//       user_id: parseFloat(user_id + '')
//     },
//
//     // skip: isEmpty(user_id)
//   });

//   return {
//     notificationSubscriptionData: notificationSubscriptionData?.pushNotification,
//     notificationSubscriptionDataArena: notificationSubscriptionDataArena?.pushNotification
//   }
// }




// const PUSH_NOTIFICATION = gql`
//     subscription ($user_id: Float!){
//         pushNotification(user_id: $user_id) {
//             user_id
//             title
//             image
//             is_seen
//             content,
//         }
//     }
// `;
//
// const PUSH_NOTIFICATION_ARENA = gql`
//     subscription ($user_id: Float!){
//         pushNotification(user_id: $user_id) {
//             user_id
//             title
//             image
//             is_seen
//             content,
//         }
//     }
// `;

export const MARK_ALL_NOTIFICATION_AS_SEEN = gql`
    mutation {
        markAllNotisAsSeen
    }
`;

export const SEEN_NOTIFICATION = gql`
    mutation($id: Float!) {
        seenNotification(id: $id)
    }
`;


const GET_NOTIFICATION = gql`
  query($page: Int!, $limit: Int!) {
    getNotification(page: $page, limit: $limit) {
        notifications {
            id
            user_id
            is_seen
            title
            image
            content
            created_at
            link
        },
        unseen_count
    }
  }
`;