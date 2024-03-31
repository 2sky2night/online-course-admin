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

/**
 * 格式化数字，若是个位数，则补齐0为两位数
 */
export function formatValue(value: number) {
  return value > 9 ? value : `0${value}`;
}

/**
 * 格式化时间文本 如 00:10 hh：ss
 * @param value 单位 秒
 */
export function formatTime(value: number) {
  const sed = Math.floor(value % 60);
  const min = Math.floor(value / 60);
  return `${formatValue(min)}:${formatValue(sed)}`;
}
