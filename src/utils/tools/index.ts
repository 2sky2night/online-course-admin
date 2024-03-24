import { message } from "antd";
/**
 * 全局错误消息提示
 * @param t 自己封装的国际化插件
 * @param type
 */
export function globalErrorMsg(
  t: (id: string, dv?: string) => string,
  type: "warning" | "error" = "warning",
) {
  message[type](t("global.error", "系统错误，请稍后重试!"));
}
