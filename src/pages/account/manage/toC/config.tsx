import type { ProColumns } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";
import { Button, message } from "antd";

import { Action, Avatar, CreateTime, UpdateTime } from "@/components";
import type { User } from "@/types";

type Render = () => ProColumns<User>[];

/**
 * 表单的配置项
 */
export const colunmsRender: Render = () => [
  {
    dataIndex: "user_id",
    title: "id",
    search: false,
  },
  {
    dataIndex: "user_name",
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
    dataIndex: "register_type",
    title: <FormattedMessage id="global.registerType" defaultMessage="注册类型" />,
    render: (_, { register_type }) => {
      return <span>{register_type.register_platform}</span>;
    },
  },
  {
    dataIndex: "platform_id",
    title: <FormattedMessage id="global.platformId" defaultMessage="平台id" />,
    search: false,
    ellipsis: true,
    width: "150px",
  },
  {
    dataIndex: "age",
    title: <FormattedMessage id="global.age" defaultMessage="年龄" />,
    render: (_, { age }) => {
      return age ? <span>{age}</span> : <span>-</span>;
    },
  },
  {
    dataIndex: "gender",
    title: <FormattedMessage id="global.gender" defaultMessage="性别" />,
    render: (_, { gender }) => {
      const v = gender as null | boolean;
      if (v === null) {
        return <span>-</span>;
      } else {
        return (
          <span>
            {v ? (
              <FormattedMessage id="global.age.man" defaultMessage="男" />
            ) : (
              <FormattedMessage id="global.age.woman" defaultMessage="女" />
            )}
          </span>
        );
      }
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
