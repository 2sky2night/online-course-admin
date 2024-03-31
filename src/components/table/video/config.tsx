import type { ProColumns } from "@ant-design/pro-components";
import { FormattedMessage, history } from "@umijs/max";
import { Button } from "antd";

import { CreateTime, Image, UpdateTime } from "@/components";
import type { VideoItem } from "@/types";

type Render = (extraList?: ProColumns<VideoItem>[]) => ProColumns<VideoItem>[];

/**
 * 表单的配置项
 */
export const colunmsRender: Render = (extraList = []) => [
  {
    dataIndex: "video_id",
    title: "id",
    search: false,
    width: "80px",
    render: (_, { video_id }) => {
      return (
        <Button
          type="link"
          onClick={() => {
            history.push("/video/base/info/" + video_id);
          }}
        >
          {video_id}
        </Button>
      );
    },
  },
  {
    dataIndex: "video_name",
    valueType: "text",
    title: <FormattedMessage id="global.title" defaultMessage="标题" />,
  },
  {
    dataIndex: "description",
    valueType: "text",
    ellipsis: true,
    width: "100px",
    title: <FormattedMessage id="pages.video.base.manage.desciption" defaultMessage="简介" />,
  },
  {
    dataIndex: "duration",
    valueType: "text",
    title: <FormattedMessage id="global.duration" defaultMessage="时长" />,
  },
  {
    dataIndex: "video_cover",
    valueType: "image",
    title: <FormattedMessage id="global.cover" defaultMessage="封面" />,
    render(_, { video_cover }) {
      return <Image src={video_cover} antdProps={{ width: 100 }}></Image>;
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
  ...extraList,
];
