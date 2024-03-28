import type { RequestConfig } from "@umijs/max";
import { FormattedMessage } from "@umijs/max";
import { history } from "@umijs/max";
import { message } from "antd";

import type { ResponseError } from "@/types";
import type { AxiosError, AxiosResponse, RequestOptions } from "@@/plugin-request/request";

import { Token } from "./utils";

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      // 无用?
      const errorResult = res as ResponseError;
      console.log("errorThrower");
      return Promise.reject(errorResult);
    },
    errorHandler(error) {
      // TODO 完成请求错误处理 404、403处理
      const { response } = error as AxiosError<ResponseError>;
      if (response?.data) {
        if (response.status === 401) {
          // 401 token无效
          Token.removeToken();
          history.replace("/login");
        }
        message.error(response.data.msg);
      } else {
        message.error(
          <FormattedMessage id="global.error" defaultMessage="系统错误，请稍后重试!" />,
        );
      }
    },
  },
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      const token = Token.getToken();
      if (token !== null) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return { ...config };
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    (response: AxiosResponse) => {
      // 响应成功的回调
      return response; // 不要返回response.data 因为编译时(config/config.ts中的request配置项)已经配置了request解析了
    },
  ],
};
