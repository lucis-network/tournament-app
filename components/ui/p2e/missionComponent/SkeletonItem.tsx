import { Skeleton } from "antd";
import React from "react";
import s from "./mission.module.sass";

export const SkeletonItem = () => {
  return (
    <div className={s.missionSkeleton}>
      <Skeleton avatar={{ shape: "square", size: "large" }} active paragraph={{ rows: 1 }} />
    </div>
  )
}   