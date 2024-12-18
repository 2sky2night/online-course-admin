import type { ProColumns } from "@ant-design/pro-components";
import { FormattedMessage, history } from "@umijs/max";
import { Button, message, Popconfirm } from "antd";

import { Action, Avatar, CreateTime, Image, UpdateTime, VideoPermission } from "@/components";
import { videoCollectionControllerDeleteCollection as deleteCollection } from "@/services/go_study_server/videoCollection";
import type { VideoCollection } from "@/types";

type Render = (handleOpen: (collection: VideoCollection) => void) => ProColumns<VideoCollection>[];

/**
 * 表单的配置项
 */
export const colunmsRender: Render = (handleOpen) => [
  {
    dataIndex: "collection_id",
    title: "id",
    valueType: "index",
    search: false,
    render: (_, { collection_id }) => {
      return (
        <Button
          type="link"
          onClick={() => {
            history.push("/video/collection/info/" + collection_id);
          }}
        >
          {collection_id}
        </Button>
      );
    },
  },
  {
    dataIndex: "collection_name",
    valueType: "text",
    title: <FormattedMessage id="global.collection.name" defaultMessage="合集名" />,
  },
  {
    dataIndex: "description",
    valueType: "text",
    ellipsis: true,
    width: "150px",
    title: <FormattedMessage id="global.description" defaultMessage="描述" />,
  },
  {
    dataIndex: "collection_cover",
    valueType: "image",
    title: <FormattedMessage id="global.cover" defaultMessage="封面" />,
    render(_, { collection_cover }) {
      return collection_cover ? (
        <Image src={collection_cover} antdProps={{ width: 100 }}></Image>
      ) : (
        "-"
      );
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
    dataIndex: "sdsad",
    title: <FormattedMessage id="global.creator" defaultMessage="创建人" />,
    render: (_, { creator }) => {
      return <Avatar src={creator.avatar} username={creator.account_name} />;
    },
  },
  {
    valueType: "option",
    title: <Action />,
    render(_, entity, __, action) {
      return (
        <>
          <VideoPermission
            creatorId={entity.creator.account_id}
            toAdmin={false}
            Component={() => {
              return (
                <Button
                  style={{ marginRight: "5px" }}
                  size="small"
                  type="primary"
                  onClick={() => handleOpen(entity)}
                >
                  <FormattedMessage id="global.edit" defaultMessage="编辑" />
                </Button>
              );
            }}
          />
          <VideoPermission
            creatorId={entity.creator.account_id}
            toAdmin
            Component={() => {
              return (
                <Popconfirm
                  title="提示"
                  description="确认要删除?"
                  onConfirm={async () => {
                    await deleteCollection({ cid: entity.collection_id });
                    message.success(
                      <FormattedMessage id="global.action.ok" defaultMessage="操作成功" />,
                    );
                    action?.reload();
                  }}
                >
                  <Button size="small" type="primary" danger>
                    <FormattedMessage id="global.delete" defaultMessage="删除" />
                  </Button>
                </Popconfirm>
              );
            }}
          />
        </>
      );
    },
  },
];
