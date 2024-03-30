﻿/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    // 登录
    path: "/login",
    component: "./login",
    name: "login", // 适配国际化，省略menu.前缀
    layout: false,
    wrappers: ["@/wrappers/no-login"], // 登录后不能进入的页面
  },
  {
    // 申请注册
    path: "/apply-register",
    component: "./apply-register",
    name: "applyRegister",
    layout: false,
    wrappers: ["@/wrappers/no-login"], // 登录后不能进入的页面
  },
  {
    path: "/",
    // 子项往上提，仍旧展示,
    flatMenu: true,
    access: "isLogin", // 默认系统页登录了都能访问
    routes: [
      {
        // 系统首页
        path: "/",
        component: "./home",
        name: "home",
      },
      {
        // 账户
        path: "/account",
        name: "account",
        routes: [
          {
            // 申请注册
            path: "apply",
            name: "apply", // 定义一个menu.account.apply即可
            access: "isSuperAdmin", // 超级管理员可见
            routes: [
              {
                // 申请管理
                path: "manage",
                component: "./account/apply/manage",
                name: "manage", // 定义一个menu.account.apply.manage即可
              },
              {
                // 申请日志
                path: "log",
                component: "./account/apply/log",
                name: "log",
              },
            ],
          },
        ],
      },
      {
        // 视频
        path: "/video",
        name: "video",
        routes: [
          {
            // 视频
            path: "base",
            name: "base",
            routes: [
              {
                // 视频管理
                path: "manage",
                component: "./video/base/manage",
                name: "manage",
              },
              {
                // 视频详情
                path: "info/:video_id",
                component: "./home",
                name: "info",
                // 隐藏自己和子菜单
                hideInMenu: true,
              },
              {
                // 视频创建
                path: "create",
                component: "./home",
                name: "create",
                // 隐藏自己和子菜单
                hideInMenu: true,
                access: "isTeacher", // 老师可见
              },
              {
                // 视频编辑
                path: "edit/:video_id",
                component: "./home",
                name: "edit",
                hideInMenu: true,
                access: "isTeacher", // 老师可见
              },
              {
                // 视频上传
                path: "upload",
                component: "./home",
                name: "upload",
                access: "isTeacher", // 老师可见
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    layout: false,
    component: "./error/403",
    name: "exception.notPermission",
  },
  {
    path: "/500",
    layout: false,
    component: "./error/500",
    name: "exception.serverError",
  },
  {
    path: "/404",
    layout: false,
    component: "./error/404",
    name: "exception.notFind",
  },
  {
    path: "*",
    redirect: "/404",
  },
];
