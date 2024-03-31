import { useLocation, useNavigate } from "@umijs/max";
import type { TabPaneProps, TabsProps as AntdTabsProps } from "antd";
import { Tabs as AntdTabs } from "antd";
import { useEffect, useState } from "react";

export interface TabsProps<Keys> {
  /**
   * tab对应的查询参数key，会在查询参数中体现如: tab=login
   */
  queryParam: string;
  /**
   * tab的值枚举 如 login、register，这样在查询参数中可以体现 ?tab=login，这样才能判断哪些key是合法的
   */
  keys: Keys[];
  /**
   * 默认的key
   */
  defaultKeys: Keys;
  /**
   * 面板配置项
   */
  items: (Omit<Omit<TabPaneProps, "tab">, "key"> & { key: Keys; label: React.ReactNode })[];
  /**
   * antd tabs Props穿透
   */
  tabsProps?: Omit<AntdTabsProps, "items">;
  /**
   * tab栏更新的回调
   */
  onChange?: (key: Keys) => any;
}

/**
 * tab项的配置类型定义
 */
export type TabItem<Keys> = TabsProps<Keys>["items"];

/**
 * 和查询参数绑定的tabs
 * @returns
 */
export default function Tabs<Keys>({
  items,
  queryParam,
  defaultKeys,
  keys,
  tabsProps,
  onChange: handlerChange,
}: TabsProps<Keys>) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<Keys>(defaultKeys);

  const onChange = (key: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete(queryParam); // 删除旧的查询参数
    url.searchParams.set(queryParam, key);
    navigate(`${location.pathname}${url.search}`);
  };

  useEffect(() => {
    // 获取对应的查询参数
    const value = new URL(window.location.href).searchParams.get(queryParam);
    if (value && keys.includes(value as Keys)) {
      // 有参数，更新key，但注意用户输入可能是任意的
      setActiveKey(value as Keys);
      if (handlerChange) {
        handlerChange(value as Keys); // 通知外部组件
      }
    } else {
      // 无参数
      setActiveKey(defaultKeys);
      if (handlerChange) {
        handlerChange(defaultKeys); // 通知外部组件
      }
    }
  }, [location.search]);

  return (
    <AntdTabs
      activeKey={activeKey as string}
      {...tabsProps}
      items={items as AntdTabsProps["items"]}
      onChange={onChange}
    />
  );
}
