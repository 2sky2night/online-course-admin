import type { ProColumns } from "@ant-design/pro-components";
import { FormattedMessage, history } from "@umijs/max";
import { Button, Space } from "antd";

import { Action, CreateTime, Image, Role, UpdateTime, VideoPermission } from "@/components";
import { Roles } from "@/enums";
import type { VideoItem } from "@/types";

type Render = () => ProColumns<VideoItem>[];

/**
 * 表单的配置项
 */
export const colunmsRender: Render = () => [
  {
    dataIndex: "video_id",
    title: "id",
    search: false,
    width: "80px",
  },
  {
    dataIndex: "video_name",
    valueType: "text",
    title: <FormattedMessage id="pages.video.base.manage.name" defaultMessage="标题" />,
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
    title: <FormattedMessage id="pages.video.base.manage.duration" defaultMessage="时长" />,
  },
  {
    dataIndex: "video_cover",
    valueType: "image",
    title: <FormattedMessage id="pages.video.base.manage.video_cover" defaultMessage="封面" />,
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
  {
    valueType: "option",
    title: <Action />,
    render(_, { video_id, publisher: { account_id } }) {
      return (
        <Space>
          <Button size="small" onClick={() => history.push("/video/base/info/" + video_id)}>
            <FormattedMessage id="global.info" defaultMessage="查看" />
          </Button>
          <VideoPermission
            creatorId={account_id}
            toAdmin
            Component={() => (
              <Space>
                <Role
                  roles={[Roles.TEACHER]}
                  Component={() => (
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => history.push("/video/base/edit/" + video_id)}
                    >
                      <FormattedMessage id="global.edit" defaultMessage="编辑" />
                    </Button>
                  )}
                />
                <Button size="small" danger type="primary">
                  <FormattedMessage id="global.delete" defaultMessage="删除" />
                </Button>
              </Space>
            )}
          />
        </Space>
      );
    },
  },
];
