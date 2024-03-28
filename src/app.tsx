import { LinkOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import type { Settings as LayoutSettings } from "@ant-design/pro-components";
import { history, Link, Navigate, RunTimeLayoutConfig, SelectLang } from "@umijs/max";

import defaultSettings from "../config/defaultSettings";
import { NoLoginWhitelist } from "./constants";
import { AvatarDropdown } from "./layouts/components/Header/AvatarDropdown";
import { Theme } from "./layouts/components/Header/RightContent";
import { errorConfig } from "./requestErrorConfig";
import { accountControllerGetInfoByToken as getAccountInfo } from "./services/go_study_server/account";
import { InitialState } from "./types";
import { Account } from "./types/account";
import { Token } from "./utils";

const isDev = process.env.NODE_ENV === "development";

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  let account: null | Account = null;
  const token = Token.getToken();
  if (token === null) {
    if (NoLoginWhitelist.includes(history.location.pathname) === false) {
      // 未登录用户访问了非白名单路径，返回登录页，避免直接403
      history.replace("/login");
    }
  } else {
    // 登录用户
    try {
      const { data } = await getAccountInfo();
      account = data as Account; // 获取用户数据成功，保存在全局
    } catch {
      // 获取失败，无任何操作，处理交给errorHandler
    }
  }
  return {
    account,
    config: {
      isDark: false,
    },
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const changeState = (exec: (oldData: InitialState) => InitialState) => {
    const result = exec(initialState as InitialState);
    setInitialState(result);
  };
  return {
    actionsRender: () => [
      <Theme key="theme" changeState={changeState}></Theme>,
      <SelectLang key="SelectLang" />,
    ],
    avatarProps: {
      src: initialState?.account?.avatar,
      title: initialState?.account?.account_name,
      icon: <UserOutlined />,
      render: (_, c) => {
        return <AvatarDropdown>{c}</AvatarDropdown>;
      },
    },
    footerRender: false,
    onPageChange: () => {
      console.log("APP - onPageChange");
    },
    bgLayoutImgList: [
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr",
        left: 85,
        bottom: 100,
        height: "303px",
      },
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr",
        bottom: -68,
        right: -45,
        height: "303px",
      },
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr",
        bottom: 0,
        left: 0,
        width: "331px",
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: false,
    navTheme: initialState?.config.isDark ? "realDark" : "light",
    unAccessible: <Navigate to="/403" />, // 无权限拦截到403页面
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
