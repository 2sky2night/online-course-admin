import { useModel } from "@umijs/max";
import type { FC } from "react";

import { Roles } from "@/enums";

interface Props {
  /**
   * 满足其中一个角色就渲染（系统中一个用户只有一个角色）
   */
  roles: Roles[];
  /**
   * 要渲染的组件
   */
  Component: FC;
}
/**
 * 根据当前用户的权限条件渲染
 */
export default function Role({ roles, Component }: Props) {
  const state = useModel("@@initialState", (v) => v.initialState);
  if (state?.account?.role) {
    const {
      role: { role_name },
    } = state.account;
    return roles.includes(role_name as Roles) ? <Component /> : null;
  }
  return null; // TODO jsx组件不能返回undefined
}
