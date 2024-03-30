import { useModel } from "@umijs/max";
import type { FC } from "react";

import { Roles } from "@/enums";

interface Props {
  /**
   * 视频发布者的id
   */
  pubsherId: number;
  /**
   * 给管理员&超管开放权限?
   */
  toAdmin: boolean;
  /**
   * 满足条件渲染的组件
   */
  Component: FC;
}

/**
 * 视频的控制权限，有权限会渲染
 */
export function VideoPermission({ pubsherId, toAdmin, Component }: Props) {
  const state = useModel("@@initialState", (v) => v.initialState);
  if (
    state?.account?.account_id === pubsherId || // 是视频发布者？
    (toAdmin && // 给管理员开放了？
      (state?.account?.role?.role_name === Roles.ADMIN || // 当前用户是管理员就渲染
        state?.account?.role?.role_name === Roles.SUPER_ADMIN)) // 当前用户是超管就渲染
  ) {
    return <Component />;
  }
  return null; // TODO jsx组件不能返回undefined
}
