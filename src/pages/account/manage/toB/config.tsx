import type { ProColumns } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";
import { Button, message } from "antd";

import { Action, Avatar, CreateTime, RoleMessage, UpdateTime } from "@/components";
import { Roles } from "@/enums";
import type { Account } from "@/types";

type Render = () => ProColumns<Account>[];

/**
 * 表单的配置项
 */
export const colunmsRender: Render = () => [
  {
    dataIndex: "account_id",
    title: "id",
    search: false,
  },
  {
    dataIndex: "account_name",
    title: <FormattedMessage id="global.username" defaultMessage="名称" />,
    valueType: "text",
  },
  {
    dataIndex: "sadsad",
    title: <FormattedMessage id="global.avatar" defaultMessage="头像" />,
    render: (_, { avatar }) => {
      return <Avatar src={avatar} />;
    },
    search: false,
  },
  {
    dataIndex: "email",
    valueType: "text",
    title: <FormattedMessage id="global.email" defaultMessage="邮箱" />,
  },
  {
    dataIndex: "ddd",
    title: <FormattedMessage id="global.role" defaultMessage="角色" />,
    render: (_, { role }) => {
      return <RoleMessage value={role.role_name as Roles} />;
    },
  },
  {
    dataIndex: "created_time",
    valueType: "dateTime",
    title: <CreateTime />,
  },
  {
    dataIndex: "updated_time",
    valueType: "dateTime",
    title: <UpdateTime />,
  },
  {
    valueType: "option",
    title: <Action />,
    render: () => {
      return [
        <Button
          key="1"
          size="small"
          danger
          type="primary"
          onClick={() => message.info("二次确认删除")}
        >
          <FormattedMessage id="global.delete" defaultMessage="删除" />
        </Button>,
      ];
    },
  },
];
