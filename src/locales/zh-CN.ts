import component from "./zh-CN/component";
import global from "./zh-CN/global";
import globalHeader from "./zh-CN/globalHeader";
import layout from "./zh-CN/layout";
import menu from "./zh-CN/menu";
import pages from "./zh-CN/pages";
import pwa from "./zh-CN/pwa";
import settingDrawer from "./zh-CN/settingDrawer";
import settings from "./zh-CN/settings";

export default {
  appName: "微课视频网站",
  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...global,
  ...layout,
};
