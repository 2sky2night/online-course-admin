import { LinkOutlined } from "@ant-design/icons";
import type { Settings as LayoutSettings } from "@ant-design/pro-components";
import { Link, RunTimeLayoutConfig, SelectLang } from "@umijs/max";

import defaultSettings from "../config/defaultSettings";
import { AvatarDropdown, AvatarName } from "./layouts/components/Header/AvatarDropdown";
import { Question, Theme } from "./layouts/components/Header/RightContent";
import { errorConfig } from "./requestErrorConfig";
import { InitialState } from "./types";

const isDev = process.env.NODE_ENV === "development";

//
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  return {
    user: null,
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
      <Question key="doc" />,
      <SelectLang key="SelectLang" />,
    ],
    avatarProps: {
      src: "https://images.dog.ceo/breeds/dingo/n02115641_13253.jpg",
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown menu>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: "张三",
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
    ...initialState?.settings,
    navTheme: initialState?.config.isDark ? "realDark" : "light",
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
