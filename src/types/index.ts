import type { Settings as LayoutSettings } from "@ant-design/pro-components";

import { Account } from "./account";

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
