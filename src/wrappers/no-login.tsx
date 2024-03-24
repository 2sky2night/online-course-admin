import { Navigate, Outlet } from "@umijs/max";
import { useAccess } from "@umijs/max";
/**
 * 已经登录的用户不能进入登录、申请注册页
 */
export default function NoLogin() {
  const { isLogin } = useAccess();
  if (isLogin) {
    // 登录了
    return <Navigate to="/" />;
  } else {
    // 未登录
    return <Outlet />;
  }
}
