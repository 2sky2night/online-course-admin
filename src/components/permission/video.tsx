import { useModel } from "@umijs/max";
import type { FC } from "react";

import { Roles } from "@/enums";

interface Props {
  /**
   * 创建者的id
   */
  creatorId: number;
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
 * 视频相关的控制权限，有权限会渲染
 */
export function VideoPermission({ creatorId, toAdmin, Component }: Props) {
  const state = useModel("@@initialState", (v) => v.initialState);
  if (
    state?.account?.account_id === creatorId || // 是创建者？
    (toAdmin && // 给管理员开放了？
      (state?.account?.role?.role_name === Roles.ADMIN || // 当前用户是管理员就渲染
        state?.account?.role?.role_name === Roles.SUPER_ADMIN)) // 当前用户是超管就渲染
  ) {
    return <Component />;
  }
  return null; // TODO jsx组件不能返回undefined
}
