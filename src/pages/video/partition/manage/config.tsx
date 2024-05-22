import type { ProColumns } from "@ant-design/pro-components";
import { FormattedMessage, history } from "@umijs/max";
import { Button, message,Popconfirm } from "antd";

import { Action, Avatar, CreateTime, UpdateTime } from "@/components";
import { videoPartitionControllerDeletePartition as deletePartition } from "@/services/go_study_server/videoPartition";
import type { VideoPartitionItem } from "@/types";

type Render = (isTeacher: boolean) => ProColumns<VideoPartitionItem>[];

/**
 * 表单的配置项
 */
export const colunmsRender: Render = (isTeacher) => {
  const list: ProColumns<VideoPartitionItem>[] = [
    {
      dataIndex: "partition_id",
      title: "id",
      search: false,
      width: "80px",
      render: (_, { partition_id }) => {
        return (
          <Button
            type="link"
            onClick={() => {
              history.push("/video/partition/info/" + partition_id);
            }}
          >
            {partition_id}
          </Button>
        );
      },
    },
    {
      dataIndex: "partition_name",
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
      render: (_, entity, __, action) => {
        return (
          <>
            <Popconfirm
              title="提示"
              description="确认要删除?"
              onConfirm={async () => {
                await deletePartition({ pid: entity.partition_id });
                message.success(
                  <FormattedMessage id="global.action.ok" defaultMessage="操作成功" />,
                );
                action?.reload();
              }}
            >
              <Button style={{ marginLeft: "5px" }} size="small" type="primary" danger>
                <FormattedMessage id="global.delete" defaultMessage="删除" />
              </Button>
            </Popconfirm>
          </>
        );
      },
    });
  }
  return list;
};
