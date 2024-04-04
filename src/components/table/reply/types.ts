import type { ProColumns, ProTableProps } from "@ant-design/pro-components";

import type { VideoReplyItem } from "@/types";

export interface Props<T> {
  /**
   * 请求函数，会在刷新、初始化、页码、页长度更新时执行
   * @param pageSize 页长度
   * @param page 页码
   * @returns
   */
  request: (pageSize: number, page: number) => Promise<{ data: { list: T; total: number } }>;
  /**
   * 扩展列
   */
  extraColumsList?: ProColumns<VideoReplyItem>[];
  /**
   * 穿透props(优先级最高，可自定义)
   */
  tableProps?: ProTableProps<T, any>;
}
