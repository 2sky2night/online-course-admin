import type { ProColumns } from "@ant-design/pro-components";
import { FormattedMessage, history } from "@umijs/max";
import { Button } from "antd";

import { Avatar, CreateTime, Image, UpdateTime } from "@/components";
import type { VideoCollection } from "@/types";

type Render = (extraList?: ProColumns<VideoCollection>[]) => ProColumns<VideoCollection>[];

/**
 * 表单的配置项
 */
export const colunmsRender: Render = (extraList = []) => [
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
  ...extraList,
];
