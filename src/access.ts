import { Roles } from "./enums";
import { InitialState } from "./types";
/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access({ account }: InitialState) {
  if (account === null) {
    return {
      isSuperAdmin: false,
      isAdmin: false,
      isTeacher: false,
      isLogin: false,
    };
  } else {
    const {
      role: { role_name },
    } = account;
    return {
      isSuperAdmin: role_name === Roles.SUPER_ADMIN, // 超管
      isAdmin: role_name === Roles.ADMIN, // 管理员
      isTeacher: role_name === Roles.TEACHER, // 老师
      isLogin: true,
    };
  }
}
