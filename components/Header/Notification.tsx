import { Badge, Popover } from "antd";
import AuthStore from "../Auth/AuthStore";
import InfiniteList from "./InfiniteNoti";
import { observer } from "mobx-react";
import useNotification from "hooks/useNotification";
import { useMemo } from "react";
import s from "./Header.module.sass";

type iconProps = {
  height: string;
  color: string;
};
const NotificationIcon = ({ height, color }: iconProps): any => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={height}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      color={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
};

const Notification = () => {
  const { id } = AuthStore;

  const { notificationData } = useNotification({ user_id: 32 });
  const temp = useMemo(() => {
    // console.log(notificationData);
    // return notificationData;
  }, [notificationData]);

  // console.log(temp);

  return (
    <>
      {AuthStore.isLoggedIn ? (
        <Popover placement="bottom" content={<InfiniteList />} trigger="click">
          <Badge>
            {/* <NotificationIcon height={"h-[28px] w-[28px]"} color={"white"} /> */}
            <img
              className={s.notification}
              src="/assets/notification-icon.svg"
              alt=""
            />
          </Badge>
        </Popover>
      ) : (
        ""
      )}
    </>
  );
};

export default observer(Notification);
