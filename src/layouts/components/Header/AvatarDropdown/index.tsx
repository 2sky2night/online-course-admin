import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { FormattedMessage, history, useModel } from "@umijs/max";
import { Modal } from "antd";
import type { MenuInfo } from "rc-menu/lib/interface";
import React, { useCallback, useState } from "react";

import { InitialState } from "@/types";
import { Token } from "@/utils";

import HeaderDropdown from "../HeaderDropdown";

export type GlobalHeaderRightProps = {
  children?: React.ReactNode;
};

// 下拉菜单的逻辑部分
export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ children }) => {
  const { setInitialState } = useModel("@@initialState");
  // 退出登录的模态框
  const [visiable, setVisiable] = useState(false);
  // 菜单项
  const menuItems = [
    {
      key: "center",
      icon: <UserOutlined />,
      label: <FormattedMessage id="layout.dropdown.menu.center" defaultMessage="个人中心" />,
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <FormattedMessage id="layout.dropdown.menu.logout" defaultMessage="退出登录" />,
    },
  ];
  // 点击菜单的回调
  const onMenuClick = useCallback(
    ({ key }: MenuInfo) => {
      if (key === "center") {
        console.log("center");
      } else if (key === "logout") {
        setVisiable(true);
      }
    },
    [setInitialState],
  );
  // 点击确认登出的回调
  const handleLogout = () => {
    Token.removeToken();
    setInitialState((v) => {
      return {
        ...v,
        account: null,
      } as InitialState;
    }).then(() => {
      setTimeout(() => {
        history.replace("/login");
      });
    });
  };

  return (
    <>
      <Modal
        title={<FormattedMessage id="global.tips" defaultMessage="提示" />}
        open={visiable}
        onOk={handleLogout}
        okText={<FormattedMessage id="global.confirm" defaultMessage="确认" />}
        cancelText={<FormattedMessage id="global.cancel" defaultMessage="取消" />}
      >
        <FormattedMessage id="layout.logooutModal.text" defaultMessage="确认登出?" />
      </Modal>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        {children}
      </HeaderDropdown>
    </>
  );
};
