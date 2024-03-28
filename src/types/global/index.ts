import type { Settings as LayoutSettings } from "@ant-design/pro-components";

import { Account } from "../account";

/**
 * 全局model数据
 */
export interface InitialState {
  account: null | Account;
  config: {
    isDark: boolean;
  };
  settings?: Partial<LayoutSettings>;
}

/**
 * 业务错误响应
 */
export interface ResponseError {
  code: number;
  msg: string;
  timestamp: number;
  path: string;
  method: string;
}

/**
 * 业务成功的响应
 */
export interface Response<T = any> {
  code: number;
  data: T;
  msg: string;
}

/**
 * 分页请求参数
 */
export interface PageParams {
  /**
   * 偏移量
   */
  offset: number;
  /**
   * 长度
   */
  limit: number;
  /**
   * 根据时间降序
   */
  desc: boolean;
}

/**
 * 分页请求参数（可选）
 */
export type PageParamsP = Partial<PageParams>;
