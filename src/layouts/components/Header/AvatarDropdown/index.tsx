import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useModel } from "@umijs/max";
import type { MenuInfo } from "rc-menu/lib/interface";
import React, { useCallback } from "react";

import HeaderDropdown from "../HeaderDropdown";

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  return <span className="anticon">Mark</span>;
};

// 下拉菜单的逻辑部分
export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const { initialState, setInitialState } = useModel("@@initialState");

  const onMenuClick = useCallback((event: MenuInfo) => {}, [setInitialState]);

  const menuItems = [
    ...(menu
      ? [
          {
            key: "center",
            icon: <UserOutlined />,
            label: "个人中心",
          },
          {
            key: "settings",
            icon: <SettingOutlined />,
            label: "个人设置",
          },
          {
            type: "divider" as const,
          },
        ]
      : []),
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
