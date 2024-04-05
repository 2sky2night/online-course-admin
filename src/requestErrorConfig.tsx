import { history, RequestConfig } from "@umijs/max";
import { FormattedMessage } from "@umijs/max";
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
      const { response, code } = error as AxiosError<ResponseError>;
      if (response?.data) {
        if (response.status === 401) {
          // 401 token无效
          Token.removeToken();
          window.location.assign("/login"); // 刷新页面并跳转到login页
        } else if (response.status === 404) {
          history.replace("/404"); // 资源不存在，跳转到404页
        } else if (response.status === 403) {
          history.replace("/403"); // 无权限调用接口(页面鉴权漏了，还可以从全局跳转)，跳转到403页
        }
        message.error(response.data.msg);
      } else {
        if (code === "ERR_CANCELED") return; // 用户自己取消请求不弹出提示消息
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
