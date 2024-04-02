import type { ProColumns } from "@ant-design/pro-components";
import { FormattedMessage, history } from "@umijs/max";
import { Button, message } from "antd";

import { Action, Avatar, CreateTime, UpdateTime } from "@/components";
import type { VideoTagItem } from "@/types";

type Render = (isTeacher: boolean) => ProColumns<VideoTagItem>[];

/**
 * 表单的配置项
 */
export const colunmsRender: Render = (isTeacher) => {
  const list: ProColumns<VideoTagItem>[] = [
    {
      dataIndex: "partition_id",
      title: "id",
      search: false,
      width: "80px",
      render: (_, { tag_id }) => {
        return (
          <Button
            type="link"
            onClick={() => {
              history.push("/video/tag/info/" + tag_id);
            }}
          >
            {tag_id}
          </Button>
        );
      },
    },
    {
      dataIndex: "tag_name",
      valueType: "text",
      title: <FormattedMessage id="global.partition.name" defaultMessage="分区名" />,
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
      dataIndex: "sdsad",
      title: <FormattedMessage id="global.creator" defaultMessage="创建人" />,
      render: (_, { account: { avatar, account_name } }) => {
        return <Avatar src={avatar} username={account_name} />;
      },
    },
  ];

  if (!isTeacher) {
    list.push({
      valueType: "option",
      title: <Action />,
      render: () => {
        return (
          <Button
            size="small"
            type="primary"
            danger
            onClick={() => message.info("弹出模态框二次确认")}
          >
            <FormattedMessage id="global.delete" defaultMessage="删除" />
          </Button>
        );
      },
    });
  }
  return list;
};
