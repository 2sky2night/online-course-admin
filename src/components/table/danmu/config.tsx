import type { ProColumns } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";

import { Avatar, CreateTime, UpdateTime } from "@/components";
import type { VideoDanmuItem } from "@/types";

type Columns = ProColumns<VideoDanmuItem>[];

type Render = (extraColumsList: Columns) => Columns;

export const colunmsRender: Render = (extraColumsList) => {
  const list: Columns = [
    {
      dataIndex: "danmu_id",
      title: "id",
      search: false,
      width: "80px",
    },
    {
      dataIndex: "content",
      valueType: "text",
      ellipsis: true,
      width: "100px",
      title: <FormattedMessage id="global.content" defaultMessage="内容" />,
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
      dataIndex: "sadsadsad",
      title: <FormattedMessage id="global.creator" defaultMessage="创建人" />,
      render: (_, { user }) => {
        return <Avatar src={user.avatar} username={user.user_name} />;
      },
    },
    ...extraColumsList,
  ];

  return list;
};
